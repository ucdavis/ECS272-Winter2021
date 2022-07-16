//Reference: https://observablehq.com/@d3/line-chart

import * as d3 from "d3v4";
import linecsv from "../assets/yr.csv";

export const myFunction_line = () => {
  var x = document.getElementById("mySelect_line").value;
  line_render(x);
};

var mapping = {
  1: "valence",
  2: "acousticness",
  3: "danceability",
  5: "energy",
  6: "instrumentalness",
  7: "liveness",
  10: "speechiness",
};
// set the dimensions and margins
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 900 - margin.left - margin.right,
  height = 180 - margin.top - margin.bottom;

var colorArray = [
  "#007bff",
  "#9A66FF",
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

export async function line_render(index) {
  var dd = mapping[index];
  document.getElementById("line_chart_d3").innerHTML = null;

  // append svg object 
  var svg = d3
    .select("#line_chart_d3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.csv(linecsv, function (data) {
    var myColor = d3.scaleOrdinal().range([colorArray[index]]);
    // add X axis
    var x = d3
      .scaleLinear()
      .domain(
        d3.extent(data, function (d) {
          return d.year;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(7));
    svg.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," +
        (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Year");

    // add Y axis
    var y = d3.scaleLinear().domain([0, 1]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y).ticks(5));

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Measure");

    var line = svg
      .append("g")
      .append("path")
      .datum(data.filter((j) => j[dd]))
      .attr(
        "d",
        d3
          .line()
          .x(function (d) {
            return x(d.year);
          })
          .y((j) => y(j[dd]))
      )
      .attr("stroke", function (j) {
        return myColor("valueA");
      })
      .style("stroke-width", 2)
      .style("fill", "none");

  });
}
