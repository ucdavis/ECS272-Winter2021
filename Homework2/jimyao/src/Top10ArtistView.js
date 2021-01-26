import React, {Component} from 'react';
import * as d3 from "d3";

class Top10ArtistView extends Component{
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
    console.log("Top10ArtistView");

    this.props.set_top_10_artist(this);

    this.drawChart();
  }

  changeSelected(index) {
    console.log(index);
    this.state.select = index;
    this.updateChart();
    var feature = this.state.keys[this.state.select];
    document.getElementById("artist-subtitle").textContent = feature.charAt(0).toUpperCase() + feature.slice(1);
  }

  changeYear(year) {
    this.state.year = year;
    document.getElementById("artist-year").textContent = year;
    this.updateChart();
  }



  drawChart(){
    // Parse the Data
    d3.csv(this.props.data).then((data)=>{
      d3.csv(this.props.data_by_artist).then((data_by_artist)=>{
      var keys = this.state.keys;

      var artists_year = [];

      var i, j;

      for(i=0; i<data.length; i++) {
        if(parseInt(data[i]["year"]) == 2019)
        {
          try {
            let artists = JSON.parse(data[i].artists.replace(/'/g,"\""));
            for(j=0;j<artists.length;j++) {
              artists_year.push(artists[j]);
            }
          }
          catch
          {
            
          }
        }
      }

      var filtered_data = [];

      for(i=0; i<data_by_artist.length; i++) {
        if(artists_year.indexOf(data_by_artist[i].artists) != -1)
        {
          filtered_data.push(data_by_artist[i]);
        }
      }

      console.log(filtered_data);

      for(i=0; i<filtered_data.length; i++) {
        for(j=0; j<keys.length; j++) {
          filtered_data[i][keys[j]] = parseFloat(filtered_data[i][keys[j]]);
        }
      }

      var unsorted_array = [];

      console.log(unsorted_array)

      // Reverse
      var top10 = filtered_data.sort((a,b)=>{return b["popularity"] - a["popularity"]}).slice(0,10);

      console.log(top10);

      // set the dimensions and margins of the graph
      var margin = this.props.size.margin,
      width = this.props.size.width - margin.left - margin.right,
      height = this.props.size.height - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#top-10-artist-graph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

      // X axis
      var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(top10.map(function(d) { return d.artists; }))
      .padding(0.2);
      svg.append("g")
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
        .attr("x", function(d) { return x(d.artists); })
        .attr("y", function(d) { return y(d.acousticness); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.acousticness); })
        .attr("fill", "#ed0345")
      this.setState({
        data: data,
        data_by_artist: data_by_artist,
        svg: svg,
        x: x,
        y: y,
        height:height,
        width:width
      });
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

    svg.selectAll("*").remove();
    var artists_year = [];

      var i, j;

      for(i=0; i<data.length; i++) {
        if(parseInt(data[i]["year"]) == this.state.year)
        {
          try {
            let artists = JSON.parse(data[i].artists.replace(/'/g,"\""));
            for(j=0;j<artists.length;j++) {
              artists_year.push(artists[j]);
            }
          }
          catch
          {
            
          }
        }
      }

      var filtered_data = [];

      for(i=0; i<data_by_artist.length; i++) {
        if(artists_year.indexOf(data_by_artist[i].artists) != -1)
        {
          filtered_data.push(data_by_artist[i]);
        }
      }

      var top10 = filtered_data.sort((a,b)=>{return b["popularity"] - a["popularity"]}).slice(0,10);
      // X axis
      var x = d3.scaleBand()
      .range([ 0, width ])
      .domain(top10.map(function(d) { return d.artists; }))
      .padding(0.2);
      svg.append("g")
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
        .attr("x", function(d) { return x(d.artists); })
        .attr("y", function(d) { return y(d[keys[select]]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[keys[select]]); })
        .attr("fill", colors[select])
  };

  render(){
    return (
      <div id={this.props.id}>
        <div class="title">Top 10 Artists of&nbsp;<a id="artist-year">2019</a></div>
        <div class="subtitle" id="artist-subtitle">Acousticness</div>
        <div id="top-10-artist-graph"></div>
      </div>
    );
  }
}

export default Top10ArtistView;