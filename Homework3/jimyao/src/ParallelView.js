import React, {Component} from 'react';
import * as d3 from "d3";

class ParallelView extends Component{

  componentDidMount(){
    console.log("DRAW");
    this.drawChart();
  }

  drawChart(){

    // Parse the Data
    d3.csv(this.props.data).then((data)=>{
      // set the dimensions and margins of the graph
      var margin = {top: 30, right: 50, bottom: 10, left: 50},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
      
      // append the svg object to the body of the page
      var svg = d3.select("#container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
      console.log(data);
      // Color scale: give me a specie name, I return a color
      var color = d3.scaleOrdinal()
        .domain(["setosa", "versicolor", "virginica" ])
        .range([ "#440154ff", "#21908dff", "#fde725ff"])

      // Here I set the list of dimension manually to control the order of axis:
      var dimensions = ["Petal_Length", "Petal_Width", "Sepal_Length", "Sepal_Width"]

      var y = {}
      for (var i in dimensions) {
        var name = dimensions[i]
        y[name] = d3.scaleLinear()
          .domain( [0,8])
          .range([height, 0])
      } 
      // Build the X scale -> it find the best position for each Y axis
      var x = d3.scalePoint()
        .range([0, width])
        .padding(1)
        .domain(dimensions);
      
      svg.selectAll("myAxis")
        // For each dimension of the dataset I add a 'g' element:
        .data(dimensions).enter()
        .append("g")
        // I translate this element to its right position on the x axis
        .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
        // And I build the axis with the call function
        .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
        // Add axis title
        .append("text")
          .style("text-anchor", "middle")
          .attr("y", -9)
          .text(function(d) { return d; })
          .style("fill", "black")
    });
  }

  render(){
    return (
      <div id={"#" + this.props.id}>FUCK YOU!!!</div>
    );
  }
}

export default ParallelView;