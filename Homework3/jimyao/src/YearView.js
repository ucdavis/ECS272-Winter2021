import React, {Component} from 'react';
import * as d3 from "d3";
import { json } from 'd3';

class YearView extends Component{
  constructor(props) {
    super(props);

    this.state = {
      keys: this.props.keys,
      colors: this.props.colors,
      mask: [1,1,1,1,1,1],
      scale: 100,
      maxScale: 100,
      minScale: 10,
      minYear: 1921,
      maxYear: 2020,
      curMinYear: 1921,
      curMaxYear: 2020,
      curYear: 1960
    }
  }

  componentDidMount(){
    console.log("YearView");

    this.props.set_year_view(this);

    for(var i=0; i<this.state.keys.length; i++) {
      document.getElementById("toggle-"+ this.state.keys[i]).style.color = (this.state.mask[i]) ? this.state.colors[i]: "#dddddd";
    }

    var changeKeys = (index)=>{
      if(this.state.mask[index] == 1) {
        this.state.mask[index] = 0;
      } else {
        this.state.mask[index] = 1;
      }
      for(var i=0; i<this.state.keys.length; i++) {
        document.getElementById("toggle-"+ this.state.keys[i]).style.color = (this.state.mask[i]) ? this.state.colors[i]: "#dddddd";
      }
      
      this.updateChart();
    };

    document.getElementById("toggle-acousticness").addEventListener('click', ()=>{changeKeys(0)});
    document.getElementById("toggle-danceability").addEventListener('click', ()=>{changeKeys(1)});
    document.getElementById("toggle-energy").addEventListener('click', ()=>{changeKeys(2)});
    document.getElementById("toggle-instrumentalness").addEventListener('click', ()=>{changeKeys(3)});
    document.getElementById("toggle-liveness").addEventListener('click', ()=>{changeKeys(4)});
    document.getElementById("toggle-valence").addEventListener('click', ()=>{changeKeys(5)});
    this.drawChart(); 
  }

  drawChart(){
    
    // Parse the Data
    d3.csv(this.props.data_by_year).then((data)=>{
      var keys = [];
      var colors = [];

      for(var i=0; i<this.state.keys.length; i++) {
        if(this.state.mask[i] == 1) {
          keys.push(this.state.keys[i]);
          colors.push(this.state.colors[i]);
        }
      }

      console.log(data);

      // set the dimensions and margins of the graph
      var margin = this.props.size.margin,
      width = this.props.size.width - margin.left - margin.right,
      height = this.props.size.height - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#year-view-graph")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

      // Add X axis
      var x = d3.scaleTime()
        .domain([new Date(1921, 1, 1), new Date(2020, 1, 1)])
        .range([ 0, width ]);



      // Add Y axis
      var y = d3.scaleLinear()
        .domain([-2, 2])
        .range([ height, 0 ]);
        

      // color palette
      var color = d3.scaleOrdinal()
        .domain(keys)
        .range(colors)

      //stack the data?
      var stackedData = d3.stack()
        .offset(d3.stackOffsetSilhouette)
        .keys(keys)
        (data)

      console.log(stackedData);
      
      var layers = svg
      .selectAll("mylayers");

      var path = svg.selectAll("path");

      var area = d3.area()
      .x(function(d, i) { return x(new Date(d.data.year, 1, 1)); })
      .y0(function(d) { return y(d[0]); })
      .y1(function(d) { return y(d[1]); })
      .curve(d3.curveBasis);
    
      svg.append("clipPath")       // define a clip path
      .attr("id", "year-view-clip") // give the clipPath an ID
      .append("rect")          // shape it as an ellipse
      .attr("x", 0)        // position the left of the rectangle
      .attr("y", 0)  
      .attr("height", height)    // set the height
      .attr("width", width);    // set the width

      // Show the areas
      layers
        .data(stackedData)
        .enter()
        .append("path")
          .attr("class", "layer")
          .attr("clip-path", "url(#year-view-clip)")
          .style("fill", function(d) { return color(d.key); })
          .style("cursor", "pointer")
          .attr("d", area);

      var update_hover = this.props.update_hover;

      svg.selectAll(".layer")
      .attr("opacity", 1)
      .on("mouseover", (event, d)=>{
        console.log(event);
        // var i = svg.selectAll(".layer").nodes().indexOf(event.path[0]);
        var i = svg.selectAll(".layer").nodes().indexOf(event.target);
        // svg.selectAll(".layer").transition()
        //   .duration(50)
        //   .attr("opacity", function(d, j) {
        //     return j != i ? 0.7 : 1;
        //   })
        update_hover(i);
      })
      .on("mouseleave", ()=>{
        // svg.selectAll(".layer").transition()
        // .duration(50)
        // .attr("opacity", 1)
        update_hover(-1);
      })
      .on("click", (event)=>{

        // var i = svg.selectAll(".layer").nodes().indexOf(event.path[0]);
        var i = svg.selectAll(".layer").nodes().indexOf(event.target);
        change_key(i);
      });


      var change_year = this.props.change_year;
      var change_scale = this.props.change_scale;
      var update_cur_year = this.props.update_cur_year;
      var change_key = this.props.change_key;
      var get_selected_year_data = this.props.get_selected_year_data;

      var g = svg.append("g");

      g
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(15));

      // var mouseG = svg.append("g")
        svg.append("path") // this is the black vertical line to follow mouse
          .attr("class", "mouse-line")
          .style("stroke", "black")
          .style("stroke-width", "1px")
          .style("opacity", "0");

        var text = svg.append("text")
          .attr("class", "hint")
          .attr("y", 300)
          .attr("dy", ".5em")
          .style("text-anchor", "end")
          .style("font-weight", 500)
          .style("opacity", "0")
          .text("Click to select this year");
        
        d3.select("#year-view-graph")
          .on('mousemove', function(event) { // mouse moving over canvas
            var mouse = d3.pointer(event, this);
            if(mouse[0] < 50 || mouse[0] > 50 + width) {
              d3.select(".mouse-line")
              .style("opacity", "0");
              d3.select(".hint")
              .style("opacity", "0");
            }
            else {
              d3.select(".mouse-line")
              .style("opacity", "1");
              d3.select(".hint")
              .style("opacity", "1");
            }
            mouse[0] -= 50;
            mouse[1] -= 20;
            d3.select(".mouse-line")
              .attr("d", function() {
                var d = "M" + (mouse[0] + 5) + "," + height;
                d += " " + (mouse[0] + 5) + "," + 0;
                return d;
              });
            d3.select(".hint")
              .attr("x", ()=>{return mouse[0] - 10;})
              .attr("y", ()=>{return mouse[1];})
              .text(()=>{return update_cur_year(mouse[0]);});
            
            var selected_year_data = get_selected_year_data(mouse[0]);
            console.log(selected_year_data);
            var btns = document.getElementsByClassName("toggle-btn");
            for(let i=0; i<btns.length; i++) {
              if(btns[i].getElementsByClassName("value")[0] != undefined) {
                btns[i].getElementsByClassName("value")[0].text = parseFloat(selected_year_data[keys[i]]).toFixed(3);
              }
            }

            })

          .on('click', function(event) {
            var mouse = d3.pointer(event);
            mouse[0] -= 50;
            mouse[1] -= 20;
            change_year(mouse[0]);
          })
          .on('wheel', function(event) {
            var mouse = d3.pointer(event);
            mouse[0] -= 50;
            mouse[1] -= 20;
            change_scale(event.deltaY, mouse[0]);
            d3.select(".hint")
              .attr("x", ()=>{return mouse[0] - 10;})
              .attr("y", ()=>{return mouse[1];})
              .text(()=>{return update_cur_year(mouse[0]);});
          });
      
        svg.append('text')
        .attr('class', 'axis-label')
        .text("Year")
        .attr('font-weight', 500)
        .attr('font-size', "0.8em")
        .attr('x', margin.left / 2 + (width - margin.left - margin.right) / 2)
        .attr('y', 375) // Relative to the x axis.

      this.setState({
        data: data,
        svg: svg,
        x: x,
        y: y,
        layers: layers,
        area: area,
        path: path,
        width: width,
        height: height,
        g: g
      });
    });

  }

  updateData(data, keys, mask) {
    for(let i=0; i<data.length; i++) {
      for(let j=0; j<keys.length; j++) {
        if (mask[j] == 0)
        {
          data[i][keys[j]] = 0;
        }
      }
    }
    return data;
  }

  updateChart() {
    var keys = this.state.keys;
    var colors = this.state.colors;
    var data = JSON.parse(JSON.stringify(this.state.data));
    var layers = this.state.layers;
    var area = this.state.area;
    var svg = this.state.svg;
    var path = this.state.path;
    var mask = this.state.mask;

    console.log(data);
    data = this.updateData(data, keys, mask);

    var margin = this.props.size.margin,
    width = this.props.size.width - margin.left - margin.right,
    height = this.props.size.height - margin.top - margin.bottom;

    console.log([this.state.curYear, this.state.scale]);

    if(this.state.curYear - this.state.scale / 2 < this.state.minYear) {
      this.state.curMinYear = this.state.minYear;
      this.state.curMaxYear = this.state.minYear + this.state.scale;
    }
    else if(this.state.curYear + this.state.scale / 2 > this.state.maxYear) {
      this.state.curMaxYear = this.state.maxYear;
      this.state.curMinYear = this.state.maxYear - this.state.scale;
    }
    else {
      this.state.curMaxYear = this.state.curYear + this.state.scale / 2;
      this.state.curMinYear = this.state.curYear - this.state.scale / 2;
    }

    var hover = this.state.hover;

    if(hover != -1) {
      svg.selectAll(".layer")
      .attr("opacity", function(d, j) {
        return j != hover ? 0.7 : 1;
      })
      .attr("stroke", function(d, j) {
        return j != hover ? "none" : "#222222";
      })
      .attr("stroke-width", 1.5);
    } else 
    {
      svg.selectAll(".layer")
      .attr("opacity", 1)
      .attr("stroke", "none");
    }



    var x = d3.scaleTime()
      .domain([new Date(this.state.curMinYear, 1, 1), new Date(this.state.curMaxYear, 1, 1)])
      .range([ 0, width ]);

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([-2, 2])
      .range([ height, 0 ]);

    area = d3.area()
      .x(function(d, i) { return x(new Date(d.data.year, 1, 1)); })
      .y0(function(d) { return y(d[0]); })
      .y1(function(d) { return y(d[1]); })
      .curve(d3.curveBasis);

    var stackedData = d3.stack()
      .offset(d3.stackOffsetSilhouette)
      .keys(keys)
      (data)

    console.log(stackedData);

    svg
    .selectAll("path")
    .data(stackedData)
    .transition()
        .duration(500)
        .attr("d", area)

    this.state.g
    .attr("transform", "translate(0," + height + ")")
      .transition().duration(500)
      .call(d3.axisBottom(x).ticks(10))
  }

  render(){
    return (
      <div id={this.props.id}>
        <div class="title">Audio Feature Trends</div>
        <div class="subtitle">Bandwidth of each stream represents the value of each audio feature</div>
        <div id="year-view-content">
          
          <div id="year-view-graph"></div>
          <div id="toggle-panel">
            <div class="toggle-help-text">Toggle to Hide/Show Feature</div>
            <div class="toggle-help-text">Scroll to Zoom In/Out View</div>
            <div class="toggle-help-text">Click to Select Year and Feature</div>
            <div class="toggle-help">Help</div>
            <div>&nbsp;</div>
            <div class="toggle-btn" id="toggle-acousticness">Acousticness <a class="value">0.0</a></div>
            <div class="toggle-btn" id="toggle-danceability">Danceability <a class="value">0.0</a></div>
            <div class="toggle-btn" id="toggle-energy">Energy <a class="value">0.0</a></div>
            <div class="toggle-btn" id="toggle-instrumentalness">Instrumentalness <a class="value">0.0</a></div>
            <div class="toggle-btn" id="toggle-liveness">Liveness <a class="value">0.0</a></div>
            <div class="toggle-btn" id="toggle-valence">Valence <a class="value">0.0</a></div>
            <div class="toggle-hint">Toggle Feature</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
          </div>
        </div>
      </div>
    );
  }
}

export default YearView;