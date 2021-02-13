import * as d3 from "d3";
import csvPath from '../assets/data/spotify_data/data_by_year_updated.csv';

import 

export async function drawLineddFromCsvAsync(){
    const data = await d3.csv(csvPath);
    // const data_harvard = await d3.csv(csvPath_harvard);
    // const data_princeton = await d3.csv(csvPath_princeton);
    // const data_carnegie = await d3.csv(csvPath_carnegie);

    drawLineddChart(data, "#linedd"); 

    // console.log(data);
    // console.log(data_harvard);
    // drawLineddChart(data, data_harvard, data_princeton, data_carnegie, "#linedd"); 
    //process data()
    //draw chart ()
    //There will be some delay in console before it prints the array
}

