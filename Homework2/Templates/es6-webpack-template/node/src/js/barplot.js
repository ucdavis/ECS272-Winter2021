import * as d3 from "d3";
import { svg } from "d3";
import { nest } from 'd3-collection'
import csvPath from '../assets/data/data_by_year.csv';

export async function drawBarFromCsvAsync(){
  /* const parseDate = d3.timeParse("%Y");
  const dataSet = await d3.csv(csvPath, function(d) {
      return {
          artists: d.artists,
          year: parseDate(d.year),
          popularity: +d.popularity
      };
  })

  const data = nest()
      .key(function(d) { return d.artists; })
      .entries(dataSet);
      
  console.log(data);
  drawLinePlot(data, "#lineviz"); */

  const data = await d3.csv(csvPath)
  console.log(data); 
  // data processed in Python
  drawBarPlot(data, "#barviz");
}    

function drawBarPlot(data, id) {
// set the dimensions and margins of the graph
const margin = {top: 50, right: 50, bottom: 100, left: 70},
    width = 2000,
    height = 400;

// append the svg object to the body of the page
var svg = d3.select(id)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.year; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return d.danceability; })])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Bars
svg.selectAll("mybar")
  .data(data)
  .enter()
  .append("rect")
    .attr("x", function(d) { return x(d.year); })
    .attr("y", function(d) { return y(d.danceability); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.danceability); })
    .attr("fill", "#69b3a2")


svg.append("g")
  .attr("class", "x axis")
  .call(x)
  .append("text")
  .attr("x", width /2 )
  .attr("y", height+50)
  .attr("transform", 
  "translsate(" + (width/1.9) + "," + (height-margin.top) + ")")
  .style("text-anchor", "middle")
  .attr("fill", "#000")
  .text("Year");

svg.append("g")
  .attr("class", "y axis")
  .call(y)
  .append("text")
  .attr("x", -270)
  .attr("y", -40)
  .attr("transform", "rotate(-90)")
  .attr("fill", "#000")
  .text("Danceability Level");

}
