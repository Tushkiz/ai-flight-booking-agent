import {
  type Message,
  convertToCoreMessages,
  createDataStreamResponse,
  streamText,
} from "ai";
import { z } from "zod";

import { auth } from "@/app/(auth)/auth";
import { customModel } from "@/lib/ai";
import { models } from "@/lib/ai/models";
import { systemPrompt } from "@/lib/ai/prompts";
import {
  deleteChatById,
  getChatById,
  saveChat,
  saveMessages,
} from "@/lib/db/queries";
import {
  generateUUID,
  getMostRecentUserMessage,
  sanitizeResponseMessages,
} from "@/lib/utils";

import {
  FlightsOptions,
  minimalFlightsOptions,
} from "@/components/flight-options-list";
import { generateTitleFromUserMessage } from "../../actions";

export const maxDuration = 60;

type AllowedTools =
  | "getWeather"
  | "getAirportSuggestions"
  | "searchOneWayFlights"
  | "searchRoundTripFlights"
  | "getFlightDetails"
  | "getFlightUpsells"
  | "confirmBooking";

const flightTools: AllowedTools[] = [
  "getAirportSuggestions",
  "searchOneWayFlights",
  "searchRoundTripFlights",
  "getFlightDetails",
  "getFlightUpsells",
  "confirmBooking",
];

const weatherTools: AllowedTools[] = ["getWeather"];

const allTools: AllowedTools[] = [...flightTools, ...weatherTools];

const rapidApiHeaders = {
  "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
  "X-RapidAPI-Host": process.env.RAPIDAPI_HOST as string,
};

const rapidApiOptions = {
  headers: {
    ...rapidApiHeaders,
  },
};

const rapidApiBaseUrl = process.env.RAPIDAPI_BASE_URL as string;

function truncateFlightDetails(data: FlightsOptions): minimalFlightsOptions[] {
  return data.data.listings.map((listing) => ({
    id: listing.id,
    airline: {
      name: listing.airlines[0].name,
      logo: listing.airlines[0].image,
    },
    price: listing.totalPriceWithDecimal.price,
    arrivalInfo: listing.slices[0].segments[0].arrivalInfo,
    departInfo: listing.slices[0].segments[0].departInfo,
    duration: listing.slices[0].segments[0].duration,
    flightNumber: listing.slices[0].segments[0].flightNumber,
    itemKey: listing.itemKey,
    priceKey: listing.priceKey,
    stopQuantity: listing.slices[0].segments[0].stopQuantity,
  }));
}

export async function POST(request: Request) {
  const {
    id,
    messages,
    modelId,
  }: {
    id: string;
    messages: Array<Message>;
    modelId: string;
  } = await request.json();

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const model = models.find((model) => model.id === modelId);
  let provider: "openai" | "anthropic" | "x" = "openai";

  if (model?.id.startsWith("gpt")) {
    provider = "openai";
  } else if (model?.id.startsWith("claude")) {
    provider = "anthropic";
  } else if (model?.id.startsWith("grok")) {
    provider = "x";
  }

  if (!model) {
    return new Response("Model not found", { status: 404 });
  }

  const coreMessages = convertToCoreMessages(messages);
  const userMessage = getMostRecentUserMessage(coreMessages);

  if (!userMessage) {
    return new Response("No user message found", { status: 400 });
  }

  const chat = await getChatById({ id });

  if (!chat) {
    const title = await generateTitleFromUserMessage({ message: userMessage });
    await saveChat({ id, userId: session.user.id, title });
  }

  const userMessageId = generateUUID();

  await saveMessages({
    messages: [
      { ...userMessage, id: userMessageId, createdAt: new Date(), chatId: id },
    ],
  });

  return createDataStreamResponse({
    execute: (dataStream) => {
      dataStream.writeData({
        type: "user-message-id",
        content: userMessageId,
      });

      const result = streamText({
        model: customModel(model.apiIdentifier, provider),
        maxTokens: 2000,
        system: systemPrompt,
        messages: coreMessages,
        maxSteps: 10,
        experimental_activeTools: allTools,
        tools: {
          getWeather: {
            description: "Get the current weather at a location",
            parameters: z.object({
              latitude: z.number(),
              longitude: z.number(),
            }),
            execute: async ({ latitude, longitude }) => {
              const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
              );

              const weatherData = await response.json();
              return weatherData;
            },
          },
          getAirportSuggestions: {
            description: "Get airport suggestions based on a search query",
            parameters: z.object({
              query: z.string(),
            }),
            execute: async ({ query }) => {
              console.log("🛠️ EXECUTING getAirportSuggestions");
              const response = await fetch(
                `${rapidApiBaseUrl}/flights/auto-complete?query=${encodeURIComponent(
                  query
                )}`,
                rapidApiOptions
              );

              return await response.json();
            },
          },
          searchOneWayFlights: {
            description: "Search for one-way flights between airports",
            parameters: z.object({
              originAirportCode: z.string(),
              destinationAirportCode: z.string(),
              departureDate: z.string(), // Format: YYYY-MM-DD
            }),
            execute: async ({
              originAirportCode,
              destinationAirportCode,
              departureDate,
            }) => {
              console.log("🛠️ EXECUTING searchOneWayFlights");

              const response = await fetch(
                `${rapidApiBaseUrl}/flights/search-one-way?originAirportCode=${originAirportCode}&destinationAirportCode=${destinationAirportCode}&departureDate=${departureDate}`,
                rapidApiOptions
              );
              const result = await response.json();
              return truncateFlightDetails(result).splice(0, 15);
            },
          },
          searchRoundTripFlights: {
            description: "Search for round-trip flights between airports",
            parameters: z.object({
              originAirportCode: z.string(),
              destinationAirportCode: z.string(),
              departureDate: z.string(), // Format: YYYY-MM-DD
              returnDate: z.string(), // Format: YYYY-MM-DD
            }),
            execute: async ({
              originAirportCode,
              destinationAirportCode,
              departureDate,
              returnDate,
            }) => {
              console.log("🛠️ EXECUTING searchRoundTripFlights");

              const response = await fetch(
                `${rapidApiBaseUrl}/flights/search-roundtrip?originAirportCode=${originAirportCode}&destinationAirportCode=${destinationAirportCode}&departureDate=${departureDate}&returnDate=${returnDate}`,
                rapidApiOptions
              );
              const result = await response.json();
              return truncateFlightDetails(result).splice(0, 15);
            },
          },
          getFlightDetails: {
            description: "Get detailed information about a specific flight",
            parameters: z.object({
              itemKey: z.string(),
              priceKey: z.string(),
            }),
            execute: async ({ itemKey, priceKey }) => {
              console.log("🛠️ EXECUTING getFlightDetails");
              const response = await fetch(
                `${rapidApiBaseUrl}/flights/details?itemKey=${itemKey}&priceKey=${priceKey}`,
                rapidApiOptions
              );
              return await response.json();
            },
          },
          getFlightUpsells: {
            description: "Get upsell options for a specific flight",
            parameters: z.object({
              itemKey: z.string(),
              priceKey: z.string(),
            }),
            execute: async ({ itemKey, priceKey }) => {
              console.log("🛠️ EXECUTING getFlightUpsells");
              const response = await fetch(
                `${rapidApiBaseUrl}/flights/upsells?itemKey=${itemKey}&priceKey=${priceKey}`,
                rapidApiOptions
              );
              return await response.json();
            },
          },
          confirmBooking: {
            description: "Confirm a flight booking with passenger details",
            parameters: z.object({
              flightNumber: z.string(),
              flightId: z.string(),
              passengerName: z.string(),
              passengerEmail: z.string(),
              passengerPhone: z.string(),
            }),
            execute: async ({
              flightNumber,
              flightId,
              passengerName,
              passengerEmail,
              passengerPhone,
            }) => {
              console.log("🛠️ EXECUTING confirmBooking");
              const response = await fetch(
                "https://api.npoint.io/da8437240100715f1d41",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    flightNumber,
                    flightId,
                    passengerName,
                    passengerEmail,
                    passengerPhone,
                  }),
                }
              );
              const bookingConfirmation = await response.json();
              return bookingConfirmation;
            },
          },
        },
        onFinish: async ({ response }) => {
          if (session.user?.id) {
            try {
              const responseMessagesWithoutIncompleteToolCalls =
                sanitizeResponseMessages(response.messages);
              if (responseMessagesWithoutIncompleteToolCalls.length === 0) {
                return;
              }
              await saveMessages({
                messages: responseMessagesWithoutIncompleteToolCalls.map(
                  (message) => {
                    const messageId = generateUUID();

                    if (message.role === "assistant") {
                      dataStream.writeMessageAnnotation({
                        messageIdFromServer: messageId,
                      });
                    }

                    return {
                      id: messageId,
                      chatId: id,
                      role: message.role,
                      content: message.content,
                      createdAt: new Date(),
                    };
                  }
                ),
              });
            } catch (error) {
              console.error("Failed to save chat");
            }
          }
        },
        experimental_telemetry: {
          isEnabled: true,
          functionId: "stream-text",
        },
      });

      result.mergeIntoDataStream(dataStream);
    },
  });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById({ id });

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
