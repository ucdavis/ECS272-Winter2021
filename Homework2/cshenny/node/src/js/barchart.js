//Reference: https://observablehq.com/@d3/horizontal-bar-chart

import * as d3 from "d3v4";
import varcsv from "../assets/bar.csv";

export async function dawD3barchart() {
  // set the dimensions and margins
  var margin = { top: 0, right: 60, bottom: 0, left: 250 },
    width = 1000 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  var colorArray = [
    "#3182bd",
    "#6baed6",
    "#9ecae1",
    "#c6ddef",
    "#e6550d",
    "#fd8d3c",
    "#fdae6b",
    "#fdd082",
    "#31a354",
    "#74c476",
    "#a1d99b",
    "#c7e9c0",
    "#756bb1",
    "#9e9ac8",
    "#bcbddc",
    "#dadaeb",
    "#7b4173",
    "#a55194",
    "#ce6dbd",
    "#de9ed6",
    "#4D8000",
    "#B33300",
    "#CC80CC",
  ];

  // append svg object
  var bar_svg = d3
    .select("#bar_chart_d3")
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 960 500")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Parse the Data
  d3.csv(varcsv, function (data) {
    // add X axis
    var x = d3.scaleLinear().domain([0, 100]).range([0, width]);
    bar_svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    bar_svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.top + 40) + ")"
      )
      .style("text-anchor", "middle")
      .text("Popularity");

    // add Y axis
    var y = d3
      .scaleBand()
      .range([0, height])
      .domain(
        data.map(function (d) {
          return d.Country;
        })
      )
      .padding(0.5);
    bar_svg.append("g").call(d3.axisLeft(y));

    bar_svg
      .selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", function (d) {
        return y(d.Country);
      })
      .attr("width", function (d) {
        return x(d.Value);
      })
      .attr("height", "10px")
      .style("fill", function (d, i) {
        return d3.color(colorArray[i]);
      });
  });
}
