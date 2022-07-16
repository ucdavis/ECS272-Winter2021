import React, {Component} from 'react';
import * as d3 from "d3";
import { select } from 'd3';

class Top10SongView extends Component{
  constructor(props) {
    super(props);

    this.state = {
      keys: this.props.keys,
      colors: this.props.colors,
      select: 0,
      year: 2019
    }
  }

  componentDidMount(){
    console.log("Top10SongView");

    this.props.set_top_10_song(this);

    this.drawChart();
  }

  changeSelected(index) {
    console.log(index);
    this.state.select = index;
    this.updateChart();
    var feature = this.state.keys[this.state.select];
    document.getElementById("song-subtitle").textContent = feature.charAt(0).toUpperCase() + feature.slice(1);
  }

  changeYear(year) {
    this.state.year = year;
    document.getElementById("song-year").textContent = year;
    this.updateChart();
  }

  drawChart(){
    // Parse the Data
    d3.csv(this.props.data).then((data)=>{
      var keys = this.state.keys;
      var select = this.state.select;
      var i, j;

      for(i=0; i<data.length; i++) {
        for(j=0; j<keys.length; j++) {
          data[i][keys[j]] = parseFloat(data[i][keys[j]]);
        }
      }

      var unsorted_array = [];

      for(i=0; i<data.length; i++) {
        if(parseInt(data[i]["year"]) == 2019)
        {
          unsorted_array.push(data[i]);
        }
      }

      // Reverse
      var top10 = unsorted_array.sort((a,b)=>{return b["popularity"] - a["popularity"]}).slice(0,10);

      console.log(top10);

      // set the dimensions and margins of the graph
      var margin = this.props.size.margin,
      width = this.props.size.width - margin.left - margin.right,
      height = this.props.size.height - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#top-10-song-graph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

      // X axis
      var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(top10.map(function(d) { return d.name; }))
      .padding(0.2);
      
      var x_g = svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      var y = d3.scaleLinear()
      .domain([0, 1])
      .range([ height, 0]);
      svg.append("g")
      .call(d3.axisLeft(y));

      // Bars
      svg.selectAll("mybar")
      .data(top10)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.name); })
        .attr("y", function(d) { return y(d.acousticness); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.acousticness); })
        .attr("fill", this.state.colors[0])
      
      svg.append('text')
        .attr('class', 'axis-label')
        .text(keys[select])
        .attr('font-weight', 500)
        .attr('font-size', "0.8em")
        .attr('transform', 'rotate(-90)')
        .attr('x', -(margin.top * 2 + (height - margin.top - margin.bottom) / 2) - keys[select].length * 2)
        .attr('y', -50); // Relative to the y axis.

      this.setState({
        data: data,
        svg: svg,
        x: x,
        y: y,
        height:height,
        width:width,
        margin: margin,
        x_g: x_g
      });
    });

    
  }

  updateChart() {
    var data = this.state.data;
    var data_by_artist = this.state.data_by_artist;
    var svg = this.state.svg;
    var x = this.state.x;
    var y = this.state.y;
    var keys = this.state.keys;
    var select = this.state.select;
    var colors = this.state.colors;
    var height = this.state.height;
    var width = this.state.width;
    var margin = this.state.margin;
    var x_g = this.state.x_g;

    var unsorted_array = [];
    var i, j;

    for(i=0; i<data.length; i++) {
      if(parseInt(data[i]["year"]) == this.state.year)
      {
        unsorted_array.push(data[i]);
      }
    }

    // Reverse
    var top10 = unsorted_array.sort((a,b)=>{return b["popularity"] - a["popularity"]}).slice(0,10);

    console.log(top10);
    
  
    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(top10.map(function(d) { return d.name; }))
      .padding(0.2);
  
    d3.select('.x-axis').remove();

    this.state.x_g = svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
    svg.selectAll("mybar")
    .data(top10)
      .enter()
      .selectAll("rect")
      .data(top10)
      .transition()
      .duration(1000)
      .attr("x", function(d) { return x(d.name); })
      .attr("y", function(d) { return y(d[keys[select]]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d[keys[select]]); })
      .attr("fill", colors[select]);
    

    svg.selectAll(".axis-label").remove();

    svg.append('text')
      .attr('class', 'axis-label')
      .text(keys[select])
      .attr('font-weight', 500)
      .attr('font-size', "0.8em")
      .attr('transform', 'rotate(-90)')
      .attr('x', -(margin.top * 2 + (height - margin.top - margin.bottom) / 2) - keys[select].length * 2)
      .attr('y', -50); // Relative to the y axis.

  }

  updateChart_old() {
    var data = this.state.data;
    var svg = this.state.svg;
    var x = this.state.x;
    var y = this.state.y;
    var keys = this.state.keys;
    var select = this.state.select;
    var colors = this.state.colors;

    svg.selectAll("*").remove();

    var unsorted_array = [];
    var i, j;

    for(i=0; i<data.length; i++) {
      if(parseInt(data[i]["year"]) == this.state.year)
      {
        unsorted_array.push(data[i]);
      }
    }

    // Reverse
    var top10 = unsorted_array.sort((a,b)=>{return b["popularity"] - a["popularity"]}).slice(0,10);


    // set the dimensions and margins of the graph
    var margin = this.props.size.margin,
    width = this.props.size.width - margin.left - margin.right,
    height = this.props.size.height - margin.top - margin.bottom;


    var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(top10.map(function(d) { return d.name; }))
      .padding(0.2);

    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g")
    .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
    .data(top10)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.name); })
      .attr("y", function(d) { return y(d[keys[select]]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d[keys[select]]); })
      .attr("fill", colors[select])
    
    svg.append('text')
      .attr('class', 'axis-label')
      .text(keys[select])
      .attr('font-weight', 500)
      .attr('font-size', "0.8em")
      .attr('transform', 'rotate(-90)')
      .attr('x', -(margin.top * 2 + (height - margin.top - margin.bottom) / 2) - keys[select].length * 2)
      .attr('y', -50); // Relative to the y axis.

  }

  render(){
    return (
      <div id={this.props.id}>
        <div class="title">Top 10 Songs of&nbsp;<a id="song-year">2019</a></div>
        <div class="subtitle" id="song-subtitle">Acousticness</div>
        <div id="top-10-song-graph"></div>
      </div>
    );
  }
}

export default Top10SongView;