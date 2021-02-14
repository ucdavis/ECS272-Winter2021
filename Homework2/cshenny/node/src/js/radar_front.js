//Reference: VisualCinnamon.com: Alangrafu and Nadieh Bremer --> inspired idea

import { RadarChart } from "./radar";
import * as d3 from "d3v4";

// set the dimensions and margins of the graph
var margin = { top: 50, right: 150, bottom: 50, left: 0 },
  width = Math.min(200, window.innerWidth / 4) - margin.left - margin.right,
  height = Math.min(width, window.innerHeight - margin.top - margin.bottom);

//Data 
var data = [
  {
    name: "1921-1930",
    axes: [
      { area: "valence", value: 56 },
      { area: "acousticness", value: 84 },
      { area: "danceability", value: 57 },
      { area: "energy", value: 26 },
      { area: "instrumentalness", value: 37 },
      { area: "liveness", value: 21 },
      { area: "speechiness", value: 24 },
    ],
  },
  {
    name: "1931-1940",
    axes: [
      { area: "valence", value: 57 },
      { area: "acousticness", value: 85 },
      { area: "danceability", value: 54 },
      { area: "energy", value: 28 },
      { area: "instrumentalness", value: 27 },
      { area: "liveness", value: 23 },
      { area: "speechiness", value: 23 },
    ],
  },
  {
    name: "1941-1950",
    axes: [
      { area: "valence", value: 48 },
      { area: "acousticness", value: 87 },
      { area: "danceability", value: 47 },
      { area: "energy", value: 26 },
      { area: "instrumentalness", value: 35 },
      { area: "liveness", value: 22 },
      { area: "speechiness", value: 14 },
    ],
  },
  {
    name: "1951-1960",
    axes: [
      { area: "valence", value: 48 },
      { area: "acousticness", value: 83 },
      { area: "danceability", value: 47 },
      { area: "energy", value: 29 },
      { area: "instrumentalness", value: 24 },
      { area: "liveness", value: 21 },
      { area: "speechiness", value: 8 },
    ],
  },
  {
    name: "1961-1970",
    axes: [
      { area: "valence", value: 56 },
      { area: "acousticness", value: 59 },
      { area: "danceability", value: 5 },
      { area: "energy", value: 43 },
      { area: "instrumentalness", value: 15 },
      { area: "liveness", value: 21 },
      { area: "speechiness", value: 6 },
    ],
  },
  {
    name: "1971-1980",
    axes: [
      { area: "valence", value: 59 },
      { area: "acousticness", value: 38 },
      { area: "danceability", value: 53 },
      { area: "energy", value: 54 },
      { area: "instrumentalness", value: 12 },
      { area: "liveness", value: 22 },
      { area: "speechiness", value: 6 },
    ],
  },
  {
    name: "1981-1990",
    axes: [
      { area: "valence", value: 56 },
      { area: "acousticness", value: 3 },
      { area: "danceability", value: 54 },
      { area: "energy", value: 59 },
      { area: "instrumentalness", value: 12 },
      { area: "liveness", value: 2 },
      { area: "speechiness", value: 6 },
    ],
  },
  {
    name: "1991-2000",
    axes: [
      { area: "valence", value: 55 },
      { area: "acousticness", value: 3 },
      { area: "danceability", value: 57 },
      { area: "energy", value: 59 },
      { area: "instrumentalness", value: 11 },
      { area: "liveness", value: 2 },
      { area: "speechiness", value: 8 },
    ],
  },
  {
    name: "2001-2010",
    axes: [
      { area: "valence", value: 53 },
      { area: "acousticness", value: 27 },
      { area: "danceability", value: 57 },
      { area: "energy", value: 66 },
      { area: "instrumentalness", value: 8 },
      { area: "liveness", value: 2 },
      { area: "speechiness", value: 9 },
    ],
  },
  {
    name: "2011-2020",
    axes: [
      { area: "valence", value: 45 },
      { area: "acousticness", value: 26 },
      { area: "danceability", value: 61 },
      { area: "energy", value: 62 },
      { area: "instrumentalness", value: 8 },
      { area: "liveness", value: 19 },
      { area: "speechiness", value: 11 },
    ],
  },
];
var colorArray = [
  "#EDC951",
  "#CC333F",
  "#00A0B0",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
];

export const myFunction_radar = () => {
  var x = document.getElementById("mySelect_radar").value;
  radar_render(x);
};

export async function radar_render(index) {
  if (index == "radar_all") {
    RadarChart("#radar_chart_d3", data, {
      w: 450,
      h: 250,
      margin: margin,
      maxValue: 60,
      levels: 6,
      roundStrokes: true,
      color: d3.scaleOrdinal().range(colorArray),
      format: ".0f",
      legend: { title: "Decades", translateX: 100, translateY: 40 },
      unit: "%",
    });
  } else {
    RadarChart("#radar_chart_d3", [data[index]], {
      w: 450,
      h: 250,
      margin: margin,
      maxValue: 60,
      levels: 6,
      roundStrokes: true,
      color: d3.scaleOrdinal().range([colorArray[index]]),
      format: ".0f",
      legend: { title: "Decades", translateX: 100, translateY: 40 },
      unit: "%",
    });
  }
}
