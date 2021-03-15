import React, {Component} from 'react';
import * as d3 from "d3";

 

class BarChart extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
        d3.csv( this.props.data)
        .then(csv => {
            // log csv in browser console
        console.log(csv);
  
        // create data by selecting two columns from csv 
        var data = csv.map(row => {
          return {
            yes: Number(row['Yes Votes']),
            no: Number(row['No Votes'])
          }
        })

         /********************************* 
        * Visualization codes start here
        * ********************************/
       var width = 600;
       var height = 400;
       var margin = {left: 60, right: 20, top: 20, bottom: 60}
 
       var svg = d3.select('#container')
         .append('svg')
           .attr('width', width + margin.left + margin.right)
           .attr('height', height + margin.top + margin.bottom) 
 
       var view = svg.append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
       //scale functions
       var x = d3.scaleLinear()
         .domain([0, d3.max(data, d => d.yes)])
         .range([0, width]);
         
       var y = d3.scaleLinear()
         .domain([0, d3.max(data, d => d.no)])
         .range([height, 0]);
 
       
       // create a scatter plot
       var scatterPlot = view.selectAll('circle')
         .data(data)
         .join('circle')
           .attr('cx', d => x(d.yes))
           .attr('cy', d => y(d.no))
           .attr('data-x', d => d.yes)
           .attr('data-y', d => d.no)
           .attr("r", 8)
           .attr('opacity', 0.5)
           .attr("fill", "green")
       
       var tooltip = document.getElementById('tooltip')
       scatterPlot
         .on('mouseenter', function(d) {
           d3.select(this).style('fill', 'red')
           tooltip.innerHTML = 'Yes Votes = ' + d.target.dataset.x + ', No Votes = ' + d.target.dataset.y
         })
         .on('mouseleave', function(d) {
           d3.select(this).style('fill', 'green')
         })
 
       // x axis
       view.append("g")	
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(x).ticks(6))
           .append("text")
           .attr("fill", "#000")
           .attr("x", width / 2)
           .attr('y', margin.bottom / 2)
           .attr("dy", "0.71em")
           .attr("text-anchor", "end")
           .text("Yes Votes");
 
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
           .text("No Votes");
 
     });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart;