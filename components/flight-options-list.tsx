/* eslint-disable @next/next/no-img-element */
"use client";

import cx from "classnames";
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

export type FlightsOptions = {
  data: {
    isFireFly: boolean;
    airline: Array<{
      code: string;
      name: string;
      smallImage: string;
      baggageFeeUrl: string;
      phoneNumber: string;
      baggageContentAvailable: boolean;
    }>;
    airport: Array<{
      code: string;
      city: string;
      country: string;
      name: string;
      state: any;
      isoCountryCode: string;
    }>;
    listings: Array<{
      __typename: string;
      itemKey: string;
      priceKey: string;
      isFused: boolean;
      isInterline: boolean;
      totalPriceWithDecimal: {
        price: number;
      };
      id: string;
      groupId: any;
      refId: any;
      isSaleEligible: boolean;
      seatsAvailable: number;
      marketingAirlines: Array<{
        code: string;
      }>;
      fareBrands: Array<{
        ancillaries: Array<{
          name: string;
          offerType: string;
        }>;
        name: string;
        isSelected: boolean;
        price: Array<{
          amount: number;
          currencyCode: string;
          type: string;
        }>;
        priceKey: string;
      }>;
      slices: Array<{
        uniqueSliceId: any;
        sliceKey: string;
        sliceRefId: number;
        isOvernight: boolean;
        segments: Array<{
          id: number;
          cabinClass: string;
          uniqueSegId: any;
          departInfo: {
            airport: {
              code: string;
              name: string;
            };
            time: {
              dateTime: string;
            };
          };
          arrivalInfo: {
            airport: {
              code: string;
              name: string;
            };
            time: {
              dateTime: string;
            };
          };
          operatingAirline: string;
          marketingAirline: string;
          equipmentName: string;
          equipment: string;
          duration: number;
          stopQuantity: number;
          flightNumber: string;
          isSubjectToGovtApproval: boolean;
          isOvernight: boolean;
          brand: {
            brandAttributes: Array<{
              inclusion: string;
              type: string;
            }>;
          };
          displayText: {
            operatedByText?: string;
            flightNumber: any;
            displayCabinName: any;
            planeChangeText: any;
            differentAirportText: any;
            layoverText: any;
            equipmentText: string;
          };
          segmentNote: any;
          bkgClass: any;
          brandId: string;
        }>;
        durationInMinutes: string;
        displayText: {
          operatedByText?: string;
        };
        merchandising: Array<string>;
        id: number;
        isSelected: any;
        departing: any;
        arrival: any;
      }>;
      voidWindowInfo?: {
        timeStamp: string;
        tzDesignator: any;
        hoursLeft: string;
      };
      airlines: Array<{
        marketingAirline: any;
        name: string;
        image: string;
      }>;
      allFareBrandAttributes: Array<
        Array<{
          inclusion: string;
          description: string;
          type: string;
        }>
      >;
      allFareBrandNames: Array<string>;
      candidateId: any;
      candidateKey: any;
      merchandising: Array<string>;
      saleSavings: any;
    }>;
    expressDeal: {
      displayableCarriers: Array<any>;
      candidates: Array<any>;
    };
    filterDefaults: {
      minTotalFareWithTaxesAndFees: number;
      maxTotalFareWithTaxesAndFees: number;
      airlines: Array<{
        value: string;
      }>;
      airports: Array<{
        originAirports: Array<{
          value: string;
        }>;
        destinationAirports: Array<{
          value: string;
        }>;
      }>;
      time: Array<{
        sliceRefId: number;
        sliceDurationMax: number;
        sliceDurationMin: number;
        minTakeoffTime: number;
        maxTakeoffTime: number;
        minLandingTime: number;
        maxLandingTime: number;
      }>;
      numOfStops: Array<{
        secondaryLabel: string;
        primaryLabel: string;
        value: string;
      }>;
    };
    listingsMetaData: {
      totalFilteredItineraries: number;
      totalItineraries: number;
      searchSessionKey: string;
      clientSessionId: any;
      requestId: string;
      lowerBound: number;
      searchId: any;
      airlineImagePath: string;
      hasExpressDeal: boolean;
      hasAirCanada: any;
      minimumRetailPrice: number;
      minDurationPrice: any;
      nonStopPrice: number;
      tripType: string;
      minVoidWindowClose: any;
      hasClosedUserGroupDeals: any;
    };
    travelInsurance: any;
    error: any;
    displayableCarriers: Array<any>;
    expressDealsCandidates: Array<any>;
    brandReference: Array<{
      brandId: string;
      tier: any;
      name: string;
      brandAttributes: Array<{
        type: string;
        description: string;
        inclusion: string;
      }>;
    }>;
  };
  meta: {
    currentPage: number;
    limit: number;
    totalRecords: number;
    totalPage: number;
  };
  status: boolean;
  message: string;
};

export type minimalFlightsOptions = {
  id: string;
  itemKey: string;
  priceKey: string;
  price: number;
  airline: {
    name: string;
    logo: string;
  };
  departInfo: {
    airport: {
      code: string;
      name: string;
    };
    time: {
      dateTime: string;
    };
  };
  arrivalInfo: {
    airport: {
      code: string;
      name: string;
    };
    time: {
      dateTime: string;
    };
  };
  duration: number;
  stopQuantity: number;
  flightNumber: string;
};

const SAMPLE = [
  {
    id: "d2036ee39780469ab73da99c7dd2a7a7",
    airline: {
      name: "IndiGo",
      logo: "airLogo_6E.png",
    },
    price: 47.76,
    arrivalInfo: {
      airport: {
        code: "AMD",
        name: "Sardar Vallabhbhai Patel Airport",
      },
      time: {
        dateTime: "2025-01-01T08:35:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T07:20:00",
      },
    },
    duration: 75,
    flightNumber: "6093",
    itemKey: "d2036ee39780469ab73da99c7dd2a7a7",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgqEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "234e510fb9a04c9c80abd959fa4fee82",
    airline: {
      name: "IndiGo",
      logo: "airLogo_6E.png",
    },
    price: 47.76,
    arrivalInfo: {
      airport: {
        code: "AMD",
        name: "Sardar Vallabhbhai Patel Airport",
      },
      time: {
        dateTime: "2025-01-02T00:05:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T22:45:00",
      },
    },
    duration: 80,
    flightNumber: "547",
    itemKey: "234e510fb9a04c9c80abd959fa4fee82",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgJEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "d7640c68d78f4e15a9b7c462aee72359",
    airline: {
      name: "SpiceJet",
      logo: "airLogo_SG.png",
    },
    price: 90.91,
    arrivalInfo: {
      airport: {
        code: "AMD",
        name: "Sardar Vallabhbhai Patel Airport",
      },
      time: {
        dateTime: "2025-01-01T20:55:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T19:35:00",
      },
    },
    duration: 80,
    flightNumber: "2962",
    itemKey: "d7640c68d78f4e15a9b7c462aee72359",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgbEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "a59eaae35e554cc4844ac044f36bd079",
    airline: {
      name: "SpiceJet",
      logo: "airLogo_SG.png",
    },
    price: 119.56,
    arrivalInfo: {
      airport: {
        code: "GOX",
        name: "Mopa Airport",
      },
      time: {
        dateTime: "2025-01-01T13:25:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T12:20:00",
      },
    },
    duration: 65,
    flightNumber: "185",
    itemKey: "a59eaae35e554cc4844ac044f36bd079",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgIEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "c8206ca36a4f4b49a055fd9f707c6a58",
    airline: {
      name: "IndiGo",
      logo: "airLogo_6E.png",
    },
    price: 120.7,
    arrivalInfo: {
      airport: {
        code: "IDR",
        name: "Devi Ahilya Bai Holkar Airport",
      },
      time: {
        dateTime: "2025-01-01T15:05:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T13:55:00",
      },
    },
    duration: 70,
    flightNumber: "6191",
    itemKey: "c8206ca36a4f4b49a055fd9f707c6a58",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAghEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "61cbf4b7e681482aa56f4385adcc25b5",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 122.7,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T03:00:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T00:50:00",
      },
    },
    duration: 130,
    flightNumber: "848",
    itemKey: "61cbf4b7e681482aa56f4385adcc25b5",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgKEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "e409cb9302d740c397d1b55181021c61",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 122.7,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T03:00:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T00:50:00",
      },
    },
    duration: 130,
    flightNumber: "848",
    itemKey: "e409cb9302d740c397d1b55181021c61",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgHEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "6c769db7587842aea22726c8bc5dbacf",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 122.7,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T03:00:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T00:50:00",
      },
    },
    duration: 130,
    flightNumber: "848",
    itemKey: "6c769db7587842aea22726c8bc5dbacf",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgkEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "1cf47b09f96f41268491ca435d4a52c2",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 122.7,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T03:00:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T00:50:00",
      },
    },
    duration: 130,
    flightNumber: "848",
    itemKey: "1cf47b09f96f41268491ca435d4a52c2",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgEEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "80597585d2704f7294dcc3cccf813b6c",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 122.7,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T03:00:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T00:50:00",
      },
    },
    duration: 130,
    flightNumber: "848",
    itemKey: "80597585d2704f7294dcc3cccf813b6c",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgWEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "49005ff9d23548cc85f72859efb753f5",
    airline: {
      name: "IndiGo",
      logo: "airLogo_6E.png",
    },
    price: 123.31,
    arrivalInfo: {
      airport: {
        code: "IDR",
        name: "Devi Ahilya Bai Holkar Airport",
      },
      time: {
        dateTime: "2025-01-01T06:10:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T05:00:00",
      },
    },
    duration: 70,
    flightNumber: "284",
    itemKey: "49005ff9d23548cc85f72859efb753f5",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgeEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "361ceb527c804516b0fe9f5c87e35614",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 124.8,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-02T00:15:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T21:55:00",
      },
    },
    duration: 140,
    flightNumber: "854",
    itemKey: "361ceb527c804516b0fe9f5c87e35614",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgiEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "c78aa38b99074239960cd016ddc7f488",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 124.8,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-02T00:15:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T21:55:00",
      },
    },
    duration: 140,
    flightNumber: "854",
    itemKey: "c78aa38b99074239960cd016ddc7f488",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgzEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "8aa4b0526aae46a0ac18474328c0d3f8",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 124.8,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-02T00:15:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T21:55:00",
      },
    },
    duration: 140,
    flightNumber: "854",
    itemKey: "8aa4b0526aae46a0ac18474328c0d3f8",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgsEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "306cb8280f63401591a3cb824602b5df",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 124.8,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-02T00:15:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T21:55:00",
      },
    },
    duration: 140,
    flightNumber: "854",
    itemKey: "306cb8280f63401591a3cb824602b5df",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgZEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "b10271889beb4717a6c272df0cb2cb3f",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 124.8,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-02T00:15:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T21:55:00",
      },
    },
    duration: 140,
    flightNumber: "854",
    itemKey: "b10271889beb4717a6c272df0cb2cb3f",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgQEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "d4e12fe074b947ca98d2c2998c954702",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 125.8,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T03:00:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T00:50:00",
      },
    },
    duration: 130,
    flightNumber: "848",
    itemKey: "d4e12fe074b947ca98d2c2998c954702",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgmEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "d8b0899f2217409b9ac7ea08edf63efa",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 126.9,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T07:50:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T05:35:00",
      },
    },
    duration: 135,
    flightNumber: "2404",
    itemKey: "d8b0899f2217409b9ac7ea08edf63efa",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgxEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "251cac7cce454ba9ab6bfe743d5aa485",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 126.9,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T07:50:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T05:35:00",
      },
    },
    duration: 135,
    flightNumber: "2404",
    itemKey: "251cac7cce454ba9ab6bfe743d5aa485",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgUEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "25f6a19299764546811d2921b9c20244",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 126.9,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T07:50:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T05:35:00",
      },
    },
    duration: 135,
    flightNumber: "2404",
    itemKey: "25f6a19299764546811d2921b9c20244",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgwEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "185332a68d264d85a79bdcead8130abd",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 127.9,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T10:00:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T07:40:00",
      },
    },
    duration: 140,
    flightNumber: "852",
    itemKey: "185332a68d264d85a79bdcead8130abd",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgREAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "57ba71e32758451b806a457b59ac3f6c",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 127.9,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T10:00:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T07:40:00",
      },
    },
    duration: 140,
    flightNumber: "852",
    itemKey: "57ba71e32758451b806a457b59ac3f6c",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgnEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "559f0b37d6864382a02edfb3e3bf0657",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 127.9,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T10:00:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T07:40:00",
      },
    },
    duration: 140,
    flightNumber: "852",
    itemKey: "559f0b37d6864382a02edfb3e3bf0657",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgMEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "372b9d0810ca4f919d0be6f0e69d5105",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 130,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-02T00:15:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T21:55:00",
      },
    },
    duration: 140,
    flightNumber: "854",
    itemKey: "372b9d0810ca4f919d0be6f0e69d5105",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgyEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "8febda100fe04c60a5710b8925d865e2",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 132.1,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T18:20:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T16:00:00",
      },
    },
    duration: 140,
    flightNumber: "858",
    itemKey: "8febda100fe04c60a5710b8925d865e2",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgCEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "5f097de01d4c41bc80b0b339446bb401",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 132.1,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T19:10:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T16:55:00",
      },
    },
    duration: 135,
    flightNumber: "2998",
    itemKey: "5f097de01d4c41bc80b0b339446bb401",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgLEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "56b9fa210dbf4e609f9ea7d0a20d11d1",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 132.1,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T19:10:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T16:55:00",
      },
    },
    duration: 135,
    flightNumber: "2998",
    itemKey: "56b9fa210dbf4e609f9ea7d0a20d11d1",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgNEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "0adf84b7623e4c50b1019bf812655374",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 132.1,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T18:20:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T16:00:00",
      },
    },
    duration: 140,
    flightNumber: "858",
    itemKey: "0adf84b7623e4c50b1019bf812655374",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgcEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "7275309f5aea4f0ca5dafc8a86947699",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 132.1,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T18:20:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T16:00:00",
      },
    },
    duration: 140,
    flightNumber: "858",
    itemKey: "7275309f5aea4f0ca5dafc8a86947699",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgaEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "1bacef9ae4354daebb74d8495d48186a",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 132.1,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T10:55:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T08:45:00",
      },
    },
    duration: 130,
    flightNumber: "872",
    itemKey: "1bacef9ae4354daebb74d8495d48186a",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgdEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "8792db808fd04d859054a8aeecd3a997",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 132.1,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T10:55:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T08:45:00",
      },
    },
    duration: 130,
    flightNumber: "872",
    itemKey: "8792db808fd04d859054a8aeecd3a997",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgGEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "53dda94f718341fba77209a637701f2f",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 132.1,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T10:55:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T08:45:00",
      },
    },
    duration: 130,
    flightNumber: "872",
    itemKey: "53dda94f718341fba77209a637701f2f",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgOEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "c7322a63456d4552907ec58b961862ad",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 135.3,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T21:00:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T18:45:00",
      },
    },
    duration: 135,
    flightNumber: "850",
    itemKey: "c7322a63456d4552907ec58b961862ad",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgjEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "1be0784efcea4b00919dc8ef809765b6",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 146.8,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-02T00:15:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T21:55:00",
      },
    },
    duration: 140,
    flightNumber: "854",
    itemKey: "1be0784efcea4b00919dc8ef809765b6",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgXEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "a829ddb9bfe94a94908da320d8470070",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 157.3,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T07:50:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T05:35:00",
      },
    },
    duration: 135,
    flightNumber: "2404",
    itemKey: "a829ddb9bfe94a94908da320d8470070",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgPEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "b8e3db50d0394be893a607978d55e194",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 158.4,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T10:00:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T07:40:00",
      },
    },
    duration: 140,
    flightNumber: "852",
    itemKey: "b8e3db50d0394be893a607978d55e194",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgtEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "5896448a3aca426b8414a4a0061387ac",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 159.79,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T03:15:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T01:05:00",
      },
    },
    duration: 130,
    flightNumber: "9819",
    itemKey: "5896448a3aca426b8414a4a0061387ac",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAglEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "c3357c4604104cdd84f690ca059f3755",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 159.79,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T03:15:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T01:05:00",
      },
    },
    duration: 130,
    flightNumber: "9819",
    itemKey: "c3357c4604104cdd84f690ca059f3755",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgTEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "0142c9d1c209460cbb9e394ef99b0f3f",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 159.79,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T02:35:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T00:30:00",
      },
    },
    duration: 125,
    flightNumber: "9821",
    itemKey: "0142c9d1c209460cbb9e394ef99b0f3f",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAguEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "8d87f015fe23417295a8ed234e722dfc",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 159.79,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T02:35:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T00:30:00",
      },
    },
    duration: 125,
    flightNumber: "9821",
    itemKey: "8d87f015fe23417295a8ed234e722dfc",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgVEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "a927233d4dff4ff3b56448ea0a35cc62",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 160.87,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T03:15:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T01:05:00",
      },
    },
    duration: 130,
    flightNumber: "9819",
    itemKey: "a927233d4dff4ff3b56448ea0a35cc62",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgFEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "d28b56d2542a4c1aa3979bb69b183523",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 160.87,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T02:35:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T00:30:00",
      },
    },
    duration: 125,
    flightNumber: "9821",
    itemKey: "d28b56d2542a4c1aa3979bb69b183523",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgfEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "1ddf879d96604f1fb38d39c9bca1a35f",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 162.6,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T10:55:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T08:45:00",
      },
    },
    duration: 130,
    flightNumber: "872",
    itemKey: "1ddf879d96604f1fb38d39c9bca1a35f",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAggEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "1eb933c808c84289a610dba3339c56bc",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 166.7,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T22:40:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T20:30:00",
      },
    },
    duration: 130,
    flightNumber: "874",
    itemKey: "1eb933c808c84289a610dba3339c56bc",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgSEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "a52c6de6dff74444a737822bd0c99bee",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 166.7,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T22:40:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T20:30:00",
      },
    },
    duration: 130,
    flightNumber: "874",
    itemKey: "a52c6de6dff74444a737822bd0c99bee",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgBEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "93c4e73bcf784fdd9891cc278b7acab4",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 183.06,
    arrivalInfo: {
      airport: {
        code: "BLR",
        name: "Kempegowda Airport",
      },
      time: {
        dateTime: "2025-01-01T03:50:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T02:20:00",
      },
    },
    duration: 90,
    flightNumber: "9807",
    itemKey: "93c4e73bcf784fdd9891cc278b7acab4",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgoEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "7683b0bb8b994a80be4d610cdedd787c",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 186.88,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T08:55:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T06:45:00",
      },
    },
    duration: 130,
    flightNumber: "9817",
    itemKey: "7683b0bb8b994a80be4d610cdedd787c",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgpEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "706ffaff535c405ea1a36e756b1f45c6",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 204.9,
    arrivalInfo: {
      airport: {
        code: "BLR",
        name: "Kempegowda Airport",
      },
      time: {
        dateTime: "2025-01-01T08:30:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T07:00:00",
      },
    },
    duration: 90,
    flightNumber: "9805",
    itemKey: "706ffaff535c405ea1a36e756b1f45c6",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgrEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "848e45b5a43d42c4b9263c172554639f",
    airline: {
      name: "Hahn Air Systems",
      logo: "airLogo_H1.png",
    },
    price: 206.4,
    arrivalInfo: {
      airport: {
        code: "AMD",
        name: "Sardar Vallabhbhai Patel Airport",
      },
      time: {
        dateTime: "2025-01-01T20:55:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T19:35:00",
      },
    },
    duration: 80,
    flightNumber: "1703",
    itemKey: "848e45b5a43d42c4b9263c172554639f",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgDEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "7d43e469b39b4be8b74c45091962deea",
    airline: {
      name: "Air India",
      logo: "airLogo_AI.png",
    },
    price: 242.4,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T10:55:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T08:45:00",
      },
    },
    duration: 130,
    flightNumber: "872",
    itemKey: "7d43e469b39b4be8b74c45091962deea",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgYEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
  {
    id: "9cb92f0c30064eebbd09555d5d396666",
    airline: {
      name: "Hahn Air Systems",
      logo: "airLogo_H1.png",
    },
    price: 463.5,
    arrivalInfo: {
      airport: {
        code: "DEL",
        name: "Indira Gandhi Intl Airport",
      },
      time: {
        dateTime: "2025-01-01T17:25:00",
      },
    },
    departInfo: {
      airport: {
        code: "PNQ",
        name: "Pune Airport",
      },
      time: {
        dateTime: "2025-01-01T15:20:00",
      },
    },
    duration: 125,
    flightNumber: "866",
    itemKey: "9cb92f0c30064eebbd09555d5d396666",
    priceKey:
      "CgJ2MRIkN2Y2ZWQ2YmMtMmRjMy00OTQzLWJhN2ItYmIzNzI4ZTEzY2E1GAEiB0NMQVNTSUMqBAgvEAEyBWd1c2U0OjBXT1JLRkxPV19JRF81MzBjYjQzMi05ZGRiLTRhZjctODkyMi0zYzU3OTMwZmRmYjRCDgoKMTczNTM3MzgyORA8",
    stopQuantity: 0,
  },
];

export function FlightsOptionsList({
  result = SAMPLE as minimalFlightsOptions[],
  onChange,
}: {
  result?: minimalFlightsOptions[];
  onChange?: (id: string) => void;
}) {
  const [displayCount, setDisplayCount] = useState(10);

  const displayedResults = result.slice(0, displayCount);
  const hasMore = result.length > displayCount;

  return (
    <div
      className={cx(
        "flex flex-col gap-4 rounded-2xl p-4 skeleton-bg max-w-full"
      )}
    >
      {result && result.length > 0 ? (
        <>
          <RadioGroup className="flex flex-col gap-3" onValueChange={onChange}>
            {displayedResults.map((item) => (
              <Label htmlFor={item.id} key={item.id} className="cursor-pointer">
                <div className="flex items-center justify-between border rounded-lg p-4 hover:bg-slate-50 hover:text-black transition-colors">
                  <RadioGroupItem
                    value={item.id}
                    id={item.id}
                    className="mr-4"
                  />

                  <div className="flex-1 grid grid-cols-[auto_1fr_auto] gap-6 items-center">
                    {/* Airline Info */}
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://s1.pclncdn.com/design-assets/fly/carrier-logos/${item.airline.logo}?opto&auto=webp&height=96}`}
                        width={40}
                        height={40}
                        alt={item.airline.name}
                        className="object-contain"
                      />
                      <div className="overflow-hidden">
                        <p className="font-medium truncate">
                          {item.airline.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          #{item.flightNumber}
                        </p>
                      </div>
                    </div>

                    {/* Flight Details */}
                    <div className="flex items-center justify-between px-4">
                      <div className="text-center">
                        <p className="text-lg font-semibold">
                          {item.departInfo.airport.code}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(
                            item.departInfo.time.dateTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.departInfo.airport.name}
                        </p>
                      </div>

                      <div className="flex flex-col items-center px-4">
                        <div className="text-sm text-gray-500">
                          {item.duration >= 60
                            ? `${Math.floor(item.duration / 60)}h ${
                                item.duration % 60
                              }m`
                            : `${item.duration}m`}
                        </div>
                        <div className="w-32 h-[2px] bg-gray-300 my-2 relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            ✈️
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.stopQuantity === 0
                            ? "Direct"
                            : `${item.stopQuantity} ${
                                item.stopQuantity === 1 ? "stop" : "stops"
                              }`}
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-lg font-semibold">
                          {item.arrivalInfo.airport.code}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(
                            item.arrivalInfo.time.dateTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.arrivalInfo.airport.name}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xl font-bold">
                        $ {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </Label>
            ))}
          </RadioGroup>
          {hasMore && (
            <Button onClick={() => setDisplayCount((prev) => prev + 10)}>
              Show More Flights ({result.length - displayCount} remaining)
            </Button>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">
            No flights found for this route.
          </p>
        </div>
      )}
    </div>
  );
}
