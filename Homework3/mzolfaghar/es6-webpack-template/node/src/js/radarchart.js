//Reference: VisualCinnamon.com: Alangrafu and Nadieh Bremer --> inspired idea

import { RadarChart } from "./radar";
import * as d3 from "d3";

// set the dimensions and margins of the graph
var margin = { top: 50, right: 150, bottom: 50, left: 0 },
  width = Math.min(200, window.innerWidth / 4) - margin.left - margin.right,
  height = Math.min(width, window.innerHeight - margin.top - margin.bottom);


const data = [
  {
    name: "1940",
    axes: [
      { area: "danceability", value: 52 },
      { area: "energy", value: 31 },
      { area: "speechiness", value: 24 },
      { area: "liveness", value: 26 },
      { area: "acousticness", value: 85 },
      { area: "valence", value: 61 },
      { area: "ntempo", value: 32 },
      { area: "instrumentalness", value: 32 },
      { area: "nduration", value: 23 },
      
     
    ],
  },
  {
    name: "1970",
    axes: [
      { area: "danceability", value: 51 },
      { area: "energy", value: 49 },
      { area: "speechiness", value: 5 },
      { area: "liveness", value: 21 },
      { area: "acousticness", value: 46 },
      { area: "valence", value: 57 },
      { area: "tempo", value: 69 },
      { area: "instrumentalness", value: 13 },
      { area: "duration", value: 78 },
    ],
  },
  {
    name: "2000",
    axes: [
      { area: "danceability", value: 59 },
      { area: "energy", value: 62 },
      { area: "speechiness", value: 89 },
      { area: "liveness", value: 2 },
      { area: "acousticness", value: 29 },
      { area: "valence", value: 56 },
      { area: "tempo", value: 77 },
      { area: "instrumentalness", value: 10 },
      { area: "duration", value: 77 },
    ],
  },
  {
    name: "2020",
    axes: [
      { area: "danceability", value: 69 },
      { area: "energy", value: 63 },
      { area: "speechiness", value: 14 },
      { area: "liveness", value: 18 },
      { area: "acousticness", value: 22 },
      { area: "valence", value: 50 },
      { area: "tempo", value: 100 },
      { area: "instrumentalness", value: 16 },
      { area: "duration", value: 33 },
    ],
  },
  
];


var myColor = [
  "#EDC951",
  "#CC333F",
  "#999966",
  "#00A0B0",
  "#E6B333",
  "#3366E6",
];


export async function drawRadarFromCsvAsync() {
    RadarChart("#radar", data, {
      w: 450,
      h: 300,
      margin: margin,
      maxValue: 100,
      minValue: 0, 
      levels: 5,
      roundStrokes: true,
      color: d3.scaleOrdinal().range(myColor),
      format: ".0f",
      legend: { title: "Year", translateX: 80, translateY: 40 },
    });
  
}
