import * as d3 from "d3";
//@ts-ignore
import datapath from "./datasets/Food_Supply_Quantity_kg_Data.csv";
//@ts-ignore
import countryCode from "./datasets/countries.csv";

import { dataCountryToGeologyCountry } from "./utils/country_code_translator";
function processData() {
  return Promise.all( [d3.csv(datapath), d3.csv(countryCode)]).then(([dataCsv, countryCodeCsv]) => {
    const _data = (dataCsv as unknown) as any[];
    for (let entry of _data) {
      entry.Country = dataCountryToGeologyCountry(entry.Country);
      entry.Continent = countryCodeCsv.find((country) => country.CountryName === entry.Country)?.ContinentCode || 'UNKNOWN';
      entry.Alcohol = parseFloat(entry["Alcoholic Beverages"]) || 0;
      entry.Animal =
        (parseFloat(entry["Animal fats"]) || 0) +
        (parseFloat(entry["Animal Products"]) || 0) +
        (parseFloat(entry["Meat"]) || 0) +
        (parseFloat(entry["Offals"]) || 0);
      entry.FishSeafood =
        (parseFloat(entry["Aquatic Product, Other"]) || 0) +
        (parseFloat(entry["Fish, Seafood"]) || 0);
      entry.Cereals = parseFloat(entry["Cereals - Excluding Beer"]) || 0;
      entry.Eggs = parseFloat(entry["Eggs"]) || 0;
      entry.Fruits = parseFloat(entry["Fruits - Excluding Wine"]) || 0;
      entry.Oil =
        (parseFloat(entry["Oilcrops"]) || 0) +
        (parseFloat(entry["Vegetable Oils"]) || 0);

      entry.Vegetables =
        (parseFloat(entry["Vegetables"]) || 0) +
        (parseFloat(entry["Vegetable Products"]) || 0);
      entry.Milk = parseFloat(entry["Milk - Excluding Butter"]) || 0;
      entry.StarchyRoots = parseFloat(entry["Starchy Roots"]) || 0;
      entry.Sugar =
        (parseFloat(entry["Sugar & Sweeteners"]) || 0) +
        (parseFloat(entry["Sugar Crops"]) || 0);
      entry.Nuts = parseFloat(entry["Treenuts"]) || 0;
      entry.Obesity = parseFloat(entry["Obesity"]);
      entry.Confirmed = parseFloat(entry["Confirmed"]);
      entry.Deaths = parseFloat(entry["Deaths"]);
      entry.Recovered = parseFloat(entry["Recovered"]);
      entry.Population = parseInt(entry["Population"]);

      entry.Active = parseFloat(entry["Active"]) || 0;

      entry.Undernourished_txt = entry.Undernourished;

      entry.DeathRate = entry.Deaths/entry.Confirmed * 100;

      entry.Confirmed_abs = Math.floor(entry.Confirmed * entry.Population);

      entry.Undernourished =
        parseFloat(entry.Undernourished) ||
        parseFloat((entry.Undernourished as string).substring(1)) ||
        null;
    }
    return _data.filter(
      (entry) =>
        isNumber(entry.Obesity) &&
        entry.Confirmed &&
        entry.Population &&
        entry.Active &&
        isNumber(entry.Undernourished)
    ) as DataEntry[];
  });
}
function isNumber(n: any) {
  return Number(n) === n;
}

export const data = processData();

export interface DataEntry {
  Country: string;
  Alcohol: number;
  Animal: number;
  Vegetables: number;
  Fruits: number;
  Nuts: number;
  FishSeafood: number;
  Cereals: number;
  Milk: number;
  StarchyRoots: number;
  Sugar: number;
  Eggs: number;
  Oil: number;
  Obesity: number;
  Undernourished: number;
  Undernourished_txt: number;
  Confirmed: number;
  Confirmed_abs: number;
  Deaths: number;
  Recovered: number;
  Active: number;
  Population: number;
  DeathRate: number;
}
