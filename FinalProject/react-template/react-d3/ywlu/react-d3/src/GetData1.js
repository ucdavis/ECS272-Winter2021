import * as d3 from "d3";
import data from './datasets/owid-covid-data.csv';
import data2 from './datasets/country_vaccinations.csv';
import data3 from './datasets/countries_codes_and_coordinates.csv';

export function getData1() {
    d3.csv(data)
        .then(csv => {

        console.log(csv)
    })

}
