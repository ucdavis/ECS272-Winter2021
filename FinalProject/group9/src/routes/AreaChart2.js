import React, {Component} from 'react';
import * as d3 from "d3";
import allidb from '../datasets/alli_processed.csv';
import './Area2.css';

class AreaChart2 extends Component{

  componentDidMount(){
    this.drawChart();
}

drawChart(){
  // initilize accumulator
  let accumulator = 0;

    d3.csv(allidb)
    .then(csv => {
    console.log(csv);

    // create data by selecting two columns from csv 
    var data = csv.map(row => {
      return {
        year: Number(row['year']),
        alli:  Number(row['alli']),
        yCumulative : accumulator = accumulator + Number(row['alli'])
      }
    })

     /********************************* 
    * Visualization codes start here
    * ********************************/
   var width = 600;
   var height = 400;
   var margin = {left: 120, right: 20, top: 20, bottom: 60};
   var areaColor = "#CCF1FF";
   var lineColor = "#01BFFF";
   var lineCurve = "curveMonotoneX"  
   //other option for Curve :   curveBasis  

   var svg = d3.select('#container2')
     .append('svg')
       .attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom) 

       d3.select('#emptybox')
       .append('svg')
         .attr('width', 70)
         .attr('height', 400) 

   var view = svg.append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   //scale functions
   var x = d3.scaleLinear()
     .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)])
     .range([0, width]);
     
   var y = d3.scaleLinear()
     .domain([0, d3.max(data, d => d.yCumulative)]).nice()
     .range([height, 0]);

    var line = d3.line()
          .defined(d => !isNaN(d.year))
          .x(d => x(d.year))
          .y(d => y(d.yCumulative))
        .curve(d3[lineCurve]); 

    var area = d3.area()
      .curve(d3[lineCurve]) 
      .x(d => x(d.year))
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
            .attr("stroke-width", 2)
            //.attr("stroke-linejoin", "round")
            //.attr("stroke-linecap", "round")
            .attr("d", line);     
    
   // x axis
   view.append("g")	
     .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(x).ticks(19))
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
       .attr("y", - margin.left+20)
       .attr("dy", "0.71em")
       .attr("text-anchor", "end")
       .text("Number of Alliances");

 });

}

render(){
    return <div id={"#" + this.props.id}></div>
}
}

export default AreaChart2;