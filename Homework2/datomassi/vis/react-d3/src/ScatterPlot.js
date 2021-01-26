import React, {Component} from 'react';
import * as d3 from "d3";

class ScatterPlot extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
      // console.log(d3.csv(this.props.data))
      d3.csv(this.props.data)
      .then(data => {
      var allGroup = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness"]
      // dataReady = csv.forEach()
      var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
        return {
          name: grpName,
          values: data.map(function(d) {
            return {time: d.year, value: +d[grpName]};
          })
        };
      });
       var width = 1000;
       var height = 600;
       var margin = {left: 60, right: 20, top: 20, bottom: 60}

      var svg = d3.select("#scatter")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

      // Add X axis --> it is a date format
      var x = d3.scaleLinear()
        .domain([1920,2020])
        .range([ 0, width-100 ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

            // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,1])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

          // Add the lines
    var line = d3.line()
      .x(function(d) { return x(+d.time) })
      .y(function(d) { return y(+d.value) })
    svg.selectAll("myLines")
      .data(dataReady)
      .enter()
      .append("path")
        .attr("class", function(d){ return d.name })
        .attr("d", function(d){ return line(d.values) } )
        .attr("stroke", function(d){ return myColor(d.name) })
        .style("stroke-width", 4)
        .style("fill", "none")

            // Add the points
    svg.selectAll("myDots")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
        .attr("class", function(d){ return d.name })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.time) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("stroke", "white")

        svg
      .selectAll("myLabels")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .attr("class", function(d){ return d.name })
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
          .attr("transform", function(d) { return "translate(" + x(d.value.time) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
          .attr("x", 12) // shift the text a bit more right
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)

            // Add a legend (interactive)
    svg.selectAll("myLegend")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .attr('x', function(d,i){ return 30 + i*110-2*d.name.length})
          .attr('y', function(d,i){ return 0 })
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)
        .on("click", function(d){
          // is the element currently visible ?
          // console.log(d)
          // console.log(d.name)
          // console.log(d3.selectAll("." + d.name));
          let currentOpacity = d3.selectAll("." + d.path[0].innerHTML).style("opacity");
          // console.log("hey " + currentOpacity);
          // // Change the opacity: from 0 to 1 or from 1 to 0
          d3.selectAll("." + d.path[0].innerHTML).transition().style("opacity", currentOpacity == 1 ? 0:1);
        });
 
     });

    }

    render(){
        return <div id={"#" + "hey"}></div>
    }
}

export default ScatterPlot;