"use client";

import cx from "classnames";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface WeatherAtLocation {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
  daily_units: {
    time: string;
    sunrise: string;
    sunset: string;
  };
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
  };
}

export type AirportSuggestions = {
  data: {
    resultCode: number;
    resultMessage: string;
    duration: number;
    serverID: string;
    searchItems: Array<{
      type: string;
      itemName: string;
      id: string;
      displayLine1: string;
      displayLine2: string;
      idWithType: string;
      stateCode: string;
      cityID: string;
      cityCode: string;
      cityName: string;
      countryCode: string;
      country: string;
      provinceName: string;
      entered: string;
      gmtOffset: string;
      timeZoneName: string;
      lat: number;
      lon: number;
      poiCategoryTypeId: number;
      displayName: string;
      rank: number;
      score: number;
      proximity: number;
      subType: string;
      airportCode: any;
      timeZoneID: number;
      fromSavedSearch: boolean;
    }>;
    source: string;
  };
  status: boolean;
  message: string;
};

const SAMPLE = {
  data: {
    resultCode: 0,
    resultMessage: "SUCCESS",
    duration: 5,
    serverID: "www.priceline.com",
    searchItems: [
      {
        type: "AIRPORT",
        itemName: "New York City, NY - All Airports (NYC)",
        id: "NYC",
        displayLine1: "New York City (NYC - All Airports)",
        displayLine2: "New York, United States",
        idWithType: "GDS_CITY-NYC",
        stateCode: "NY",
        cityID: "1365100023",
        cityCode: "NYC",
        cityName: "New York City",
        countryCode: "US",
        country: "US",
        provinceName: "New York",
        entered: "New York",
        gmtOffset: "-4.0",
        timeZoneName: "America/New_York",
        lat: 0.0,
        lon: 0.0,
        poiCategoryTypeId: 0,
        displayName: "New York City, NY - All Airports (NYC)",
        rank: 99.98999,
        score: 4232.229,
        proximity: 0.0,
        subType: "GDS_CITY",
        airportCode: null,
        timeZoneID: 22,
        fromSavedSearch: false,
      },
      {
        type: "AIRPORT",
        itemName: "New York City, NY - LaGuardia Airport (LGA)",
        id: "LGA",
        displayLine1: "New York City (LGA - LaGuardia Airport)",
        displayLine2: "New York, United States",
        idWithType: "AIRPORT-LGA",
        stateCode: "NY",
        cityID: "1365100023",
        cityCode: "NYC",
        cityName: "New York City",
        countryCode: "US",
        country: "US",
        provinceName: "New York",
        entered: "New York",
        gmtOffset: "-4.0",
        timeZoneName: "America/New_York",
        lat: 40.78050025155439,
        lon: -73.8747716814288,
        poiCategoryTypeId: 0,
        displayName: "New York City, NY - LaGuardia Airport (LGA)",
        rank: 99.96463,
        score: 4232.0327,
        proximity: 0.0,
        subType: "AIRPORT",
        airportCode: null,
        timeZoneID: 22,
        fromSavedSearch: false,
      },
      {
        type: "AIRPORT",
        itemName: "Buffalo, NY - Buffalo Niagara Intl Airport (BUF)",
        id: "BUF",
        displayLine1: "Buffalo (BUF - Buffalo Niagara Intl Airport)",
        displayLine2: "New York, United States",
        idWithType: "AIRPORT-BUF",
        stateCode: "NY",
        cityID: "1361100019",
        cityCode: "BUF",
        cityName: "Buffalo",
        countryCode: "US",
        country: "US",
        provinceName: "New York",
        entered: "New York",
        gmtOffset: "-4.0",
        timeZoneName: "America/New_York",
        lat: 42.940379251859056,
        lon: -78.72967226269031,
        poiCategoryTypeId: 0,
        displayName: "Buffalo, NY - Buffalo Niagara Intl Airport (BUF)",
        rank: 99.94659,
        score: 4231.8936,
        proximity: 0.0,
        subType: "AIRPORT",
        airportCode: null,
        timeZoneID: 22,
        fromSavedSearch: false,
      },
      {
        type: "AIRPORT",
        itemName: "Syracuse, NY - Syracuse Hancock Intl Airport (SYR)",
        id: "SYR",
        displayLine1: "Syracuse (SYR - Syracuse Hancock Intl Airport)",
        displayLine2: "New York, United States",
        idWithType: "AIRPORT-SYR",
        stateCode: "NY",
        cityID: "1367300018",
        cityCode: "SYR",
        cityName: "Syracuse",
        countryCode: "US",
        country: "US",
        provinceName: "New York",
        entered: "New York",
        gmtOffset: "-4.0",
        timeZoneName: "America/New_York",
        lat: 43.1091726183046,
        lon: -76.09572798269441,
        poiCategoryTypeId: 0,
        displayName: "Syracuse, NY - Syracuse Hancock Intl Airport (SYR)",
        rank: 99.935005,
        score: 4231.803,
        proximity: 0.0,
        subType: "AIRPORT",
        airportCode: null,
        timeZoneID: 22,
        fromSavedSearch: false,
      },
      {
        type: "AIRPORT",
        itemName: "New York City, NY - John F Kennedy Intl Airport (JFK)",
        id: "JFK",
        displayLine1: "New York City (JFK - John F Kennedy Intl Airport)",
        displayLine2: "New York, United States",
        idWithType: "AIRPORT-JFK",
        stateCode: "NY",
        cityID: "1365100023",
        cityCode: "NYC",
        cityName: "New York City",
        countryCode: "US",
        country: "US",
        provinceName: "New York",
        entered: "New York",
        gmtOffset: "-4.0",
        timeZoneName: "America/New_York",
        lat: 40.639380746613675,
        lon: -73.77204034876185,
        poiCategoryTypeId: 0,
        displayName: "New York City, NY - John F Kennedy Intl Airport (JFK)",
        rank: 99.91886,
        score: 4231.678,
        proximity: 0.0,
        subType: "AIRPORT",
        airportCode: null,
        timeZoneID: 22,
        fromSavedSearch: false,
      },
      {
        type: "AIRPORT",
        itemName: "Newark, NJ - Newark Liberty Intl Airport (EWR)",
        id: "EWR",
        displayLine1: "Newark (EWR - Newark Liberty Intl Airport)",
        displayLine2: "New Jersey, United States",
        idWithType: "AIRPORT-EWR",
        stateCode: "NJ",
        cityID: "1345100019",
        cityCode: "NYC",
        cityName: "Newark",
        countryCode: "US",
        country: "US",
        provinceName: "New Jersey",
        entered: "New York",
        gmtOffset: "-4.0",
        timeZoneName: "America/New_York",
        lat: 40.69054587771886,
        lon: -74.16978765014166,
        poiCategoryTypeId: 0,
        displayName: "Newark, NJ - Newark Liberty Intl Airport (EWR)",
        rank: 99.90462,
        score: 4231.568,
        proximity: 0.0,
        subType: "AIRPORT",
        airportCode: null,
        timeZoneID: 22,
        fromSavedSearch: false,
      },
      {
        type: "AIRPORT",
        itemName: "Newburgh, NY - Stewart Intl Airport (SWF)",
        id: "SWF",
        displayLine1: "Newburgh (SWF - Stewart Intl Airport)",
        displayLine2: "New York, United States",
        idWithType: "AIRPORT-SWF",
        stateCode: "NY",
        cityID: "1365003416",
        cityCode: "NYC",
        cityName: "Newburgh",
        countryCode: "US",
        country: "US",
        provinceName: "New York",
        entered: "New York",
        gmtOffset: "-4.0",
        timeZoneName: "America/New_York",
        lat: 41.50603670752856,
        lon: -74.09730848905761,
        poiCategoryTypeId: 0,
        displayName: "Newburgh, NY - Stewart Intl Airport (SWF)",
        rank: 99.89279,
        score: 4231.4766,
        proximity: 0.0,
        subType: "AIRPORT",
        airportCode: null,
        timeZoneID: 22,
        fromSavedSearch: false,
      },
      {
        type: "AIRPORT",
        itemName: "Rochester, NY - Greater Rochester Intl Airport (ROC)",
        id: "ROC",
        displayLine1: "Rochester (ROC - Greater Rochester Intl Airport)",
        displayLine2: "New York, United States",
        idWithType: "AIRPORT-ROC",
        stateCode: "NY",
        cityID: "1366300018",
        cityCode: "ROC",
        cityName: "Rochester",
        countryCode: "US",
        country: "US",
        provinceName: "New York",
        entered: "New York",
        gmtOffset: "-4.0",
        timeZoneName: "America/New_York",
        lat: 43.12286630960823,
        lon: -77.67428400405934,
        poiCategoryTypeId: 0,
        displayName: "Rochester, NY - Greater Rochester Intl Airport (ROC)",
        rank: 99.863625,
        score: 4231.2505,
        proximity: 0.0,
        subType: "AIRPORT",
        airportCode: null,
        timeZoneID: 22,
        fromSavedSearch: false,
      },
    ],
    source: "SOLR",
  },
  status: true,
  message: "Successful",
};

export function AirportSuggestions({
  result = SAMPLE,
  onChange,
}: {
  result?: AirportSuggestions;
  onChange?: (id: string) => void;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4 rounded-2xl p-4 skeleton-bg max-w-[500px]"
      )}
    >
      {result && result.data.searchItems.length > 0 ? (
        <RadioGroup className="flex flex-col gap-2" onValueChange={onChange}>
          {result.data.searchItems.map((item) => (
            <Label
              htmlFor={item.id}
              key={Math.random()}
              className="cursor-pointer"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem value={item.id} id={item.id} />
                <p>{item.displayLine1}</p>
              </div>
            </Label>
          ))}
        </RadioGroup>
      ) : (
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-sm">
            No airport suggestions found.
          </p>
        </div>
      )}
    </div>
  );
}
