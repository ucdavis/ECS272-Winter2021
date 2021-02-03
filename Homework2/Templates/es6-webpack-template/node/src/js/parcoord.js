import * as d3 from "d3";
import { nest } from 'd3-collection'
import csvPath from '../assets/data/data_by_genres2.csv';

export async function drawParFromCsvAsync(){
  //const parseDate = d3.timeParse("%Y");
  const data = await d3.csv(csvPath, function(d) {
      return {
          genres: d.genres,
          acousticness: +d.acousticness,
          popularity: +d.popularity,
          danceability: +d.danceability,
          liveness: +d.liveness  
      };
  })

  /* const data = nest()
      .key(function(d) { return d.artists; })
      .entries(dataSet);
      
  console.log(data);
  drawLinePlot(data, "#lineviz"); */

  // const data = await d3.csv(csvPath)
  console.log(data); 
  // data processed in Python
  drawParCoord(data, "#parviz");
}    

function drawParCoord(data, id) {

// set the dimensions and margins of the graph
var margin = {top: 20, right: 50, bottom: 100, left: 50},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("body")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
//d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function(data) {

  // Color scale: give me a specie name, I return a color
  /* var color = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica" ])
    .range([ "#440154ff", "#21908dff", "#fde725ff"]) */

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // Here I set the list of dimension manually to control the order of axis:
  let dimensions = ["acousticness", "danceability", "liveness"];

  // For each dimension, I build a linear scale. I store all in a y object
  let y = {}
  dimensions.forEach (i =>  {
    y[i] = d3.scaleLinear()
      .domain( [0,1] ) // --> Same axis range for each group
      //.domain( [d3.extent(data, function(d) { return +d[i]; })] )
      .range([height, 0])
  })

  // Build the X scale -> it find the best position for each Y axis
  const x = d3.scalePoint()
    .range([0, width])
    .domain(dimensions);

  // Highlight the genre that is hovered
  var highlight = function(d){

    const selected_genres = d.genres

    // first every group turns grey
    d3.selectAll(".line")
      .transition().duration(200)
      .style("stroke", "lightgrey")
      .style("opacity", "0.2")
    // Second the hovered specie takes its color
    d3.selectAll("." + selected_genres)
      .transition().duration(200)
      .style("stroke", color(selected_genres))
      .style("opacity", "1")
  }

  // Unhighlight
  var doNotHighlight = function(d){
    d3.selectAll(".line")
      .transition().duration(200).delay(1000)
      .style("stroke", function(d){ return( color(d.genres))} )
      .style("opacity", "1")
  }

  // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
  function path(d) {
      return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
  }

  // Draw the lines
  svg
    .selectAll("myPath")
    .data(data)
    .enter()
    .append("path")
      .attr("class", function (d) { return "line " + d.genres } ) // 2 class for each line: 'line' and the group name
      .attr("d",  path)
      .style("fill", "none" )
      .style("stroke", function(d){ return( color(d.genres))} )
      .style("opacity", 0.5)
      .on("mouseover", highlight)
      .on("mouseleave", doNotHighlight )

  // Draw the axis:
  svg.selectAll("myAxis")
    // For each dimension of the dataset I add a 'g' element:
    .data(dimensions).enter()
    .append("g")
    .attr("class", "axis")
    // I translate this element to its right position on the x axis
    .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
    // And I build the axis with the call function
    .each(function(d) { d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d])); })
    // Add axis title
    .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d; })
      .style("fill", "black")

}