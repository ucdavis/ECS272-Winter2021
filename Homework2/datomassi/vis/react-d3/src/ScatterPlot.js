import React, {Component} from 'react';
import * as d3 from "d3";

class ScatterPlot extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
      d3.csv(this.props.data)
      .then(data => {
      var allGroup = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness"]
      var dataReady = allGroup.map( function(grpName) {
        return {
          name: grpName,
          values: data.map(function(d) {
            return {time: d.year, value: +d[grpName]};
          })
        };
      });
       var width = 1000;
       var height = 500;
       var margin = {left: 60, right: 20, top: 20, bottom: 60}

      var svg = d3.select("#scatter")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

          // add the options to the button
      d3.select("#selectButton")
      .selectAll('myOptions')
      .data(allGroup)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }); // corresponding value returned by the button

      var myColor = d3.scaleOrdinal(d3.schemeCategory10)

      // Add X axis --> it is a date format
      var x = d3.scaleLinear()
        .domain([1920,2020])
        .range([ 0, width-100 ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
        svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text("Year");

            // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,1])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

        // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Score");    

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

        d3.select("#sc")
        .selectAll("myButton")
           .data(dataReady)
           .enter()
           .append("button")
           .attr("id", function(d) { console.log(d.name); return d.name; })
           .style("background-color", function(d){ return myColor(d.name) })
           .style("width", "125px")
           .style("height", "25px")
           .style("margin-right", "10px")
           .style("color", "white")
           .style("border-radius", "5px")
           .style("border", "0px")
           .style("box-shadow", "2px 2px #888888")
           .text(function(d){ return d.name })
           .on("click", function(d){
              let currentOpacity = d3.selectAll("." + d.path[0].innerHTML).style("opacity");
              d3.selectAll("." + d.path[0].innerHTML).transition().style("opacity", currentOpacity == 1 ? 0:1);
            });
 
     });

    }

    render(){
        return <div id="sc"></div>
    }
}

export default ScatterPlot;