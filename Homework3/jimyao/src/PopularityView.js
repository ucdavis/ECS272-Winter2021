import React, {Component} from 'react';
import * as d3 from "d3";

class PopularityView extends Component{

  componentDidMount(){
    console.log("PopularityView");
    this.drawChart();
  }

  drawChart(){
    var years = [];
    for(var i=1921; i<= 2020; i++) {
      years.push(i);
    }

    console.log(years);
    // Parse the Data
    d3.csv(this.props.data).then((data)=>{
      var keys = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness", "tempo", "loudness", "popularity", "valence"];
      var bounds = [];
      var sums = [];

      var filteredData = [];

      for(var i=0; i<data.length; i++) {
        for(var j=0; j<keys.length; j++) {
          data[i][keys[j]] = parseFloat(data[i][keys[j]]);
        }
        if(parseInt(data[i]["year"]) == 2020) {
          filteredData.push(data[i]);
        }
      }

      // set the dimensions and margins of the graph
      var margin = {top: 10, right: 30, bottom: 30, left: 60},
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

        // Add X axis
      var x = d3.scaleLinear()
        .domain([0, 100])
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Add dots
      svg.append('g')
        .selectAll("dot")
        .data(filteredData)
        .enter()
        .append("circle")
          .attr("cx", function (d) { return x(d.popularity); } )
          .attr("cy", function (d) { return y(d.danceability); } )
          .attr("r", 0.8)
          .style("fill", "#69b3a2")
      svg.append('g')
        .selectAll("dot")
        .data(filteredData)
        .enter()
        .append("circle")
          .attr("cx", function (d) { return x(d.popularity); } )
          .attr("cy", function (d) { return y(d.energy); } )
          .attr("r", 0.8)
          .style("fill", "#ff0000")
     });

    


  }

  render(){
    return (
      <div id={"#" + this.props.id}>FUCK YOU!!!</div>
    );
  }
}

export default PopularityView;