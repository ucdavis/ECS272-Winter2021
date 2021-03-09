import React, {Component} from 'react';
import * as d3 from "d3";
import disputedb from '../datasets/MIDB 5.0_sort.csv';
import './Area.css';

class AreaChart extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
      // initilize accumulator
      let accumulator = 0;

        d3.csv(disputedb)
        .then(csv => {
        console.log(csv);
  
        // create data by selecting two columns from csv 
        var data = csv.map(row => {
          return {
            yes: Number(row['styear']),
            no:  Number(row['dispnum']),
            yCumulative : accumulator = accumulator + Number(row['dispnum'])
          }
        })

         /********************************* 
        * Visualization codes start here
        * ********************************/
       var width = 700;
       var height = 400;
       var margin = {left: 90, right: 20, top: 20, bottom: 60};
       var areaColor = "#fff3d6";
       var lineColor = "#fdc032";
       var lineCurve = "curveMonotoneX"  
       //other option for Curve :   curveBasis  

       var svg = d3.select('#container2')
         .append('svg')
           .attr('width', width + margin.left + margin.right)
           .attr('height', height + margin.top + margin.bottom) 
 
       var view = svg.append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
       //scale functions
       var x = d3.scaleLinear()
         .domain([d3.min(data, d => d.yes), d3.max(data, d => d.yes)])
         .range([0, width]);
         
       var y = d3.scaleLinear()
         .domain([0, d3.max(data, d => d.yCumulative)]).nice()
         .range([height, 0]);

        var svg_l = d3.select("#imgs")
         .append("svg")
         .attr("viewBox", [0, 8, 100, 100]); 

  var line = d3.line()
      .defined(d => !isNaN(d.yes))
      .x(d => x(d.yes))
      .y(d => y(d.yCumulative))
      .curve(d3[lineCurve]); 

  var area = d3.area()
    .curve(d3[lineCurve]) 
    .x(d => x(d.yes))
    .y1(d => y(d.yCumulative))
    .y0(d => y(0));

// Draw an area plot
view.append("path")
           .datum(data)
           .attr("fill", areaColor)
           .attr("d", area);

//Draw a line on top of the area plot
view.append("path")
           .datum(data)
           .attr("fill", "none")
           .attr("stroke", lineColor)
           .attr("stroke-width", 1.5)
           //.attr("stroke-linejoin", "round")
           //.attr("stroke-linecap", "round")
           .attr("d", line);

  // Plot a circle marking the final point
  view.append("circle")
    .attr("cx", x(data.length))
    .attr("cy", y(data.yCumulative))
    //.attr('opacity', 0.5)
    .attr("fill", lineColor)
    .attr("r", 6);      
   
       // x axis
       view.append("g")	
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x).ticks(20))
           .append("text")
           .attr("fill", "#000")
           .attr("x", width / 2)
           .attr('y', margin.bottom / 2)
           .attr("dy", "0.71em")
           .attr("text-anchor", "end")
           .text("Year");
 
       // y axis
       view.append("g")
         .call(d3.axisLeft(y).ticks(6))
         .append("text")
           .attr("fill", "#000")
           .attr("transform", "rotate(-90)")
           .attr("x", - height / 2)
           .attr("y", - margin.left)
           .attr("dy", "0.71em")
           .attr("text-anchor", "end")
           .text("Number of Dispute");
 
     });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default AreaChart;