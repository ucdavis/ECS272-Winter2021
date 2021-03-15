import React, {Component} from 'react';
import * as d3 from "d3";

class YearView extends Component{
  constructor(props) {
    super(props);

    this.state = {
      keys: this.props.keys,
      colors: this.props.colors,
      mask: [1,1,1,1,1,1]
    }
  }

  componentDidMount(){
    console.log("YearView");

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

      // var bounds = [];
      // var sums = [];

      // for(var i=0; i<data.length; i++) {
      //   for(var j=0; j<keys.length; j++) {
      //   data[i][keys[j]] = parseFloat(data[i][keys[j]]);
      //   }
      // }

      // for(var i=0; i<data.length; i++) {
      //   data[i]["loudness"] += 65;
      // }

      // for(var i=0; i<keys.length; i++) {
      //   bounds[i] = {key: keys[i], max:data[0][keys[i]], min:data[0][keys[i]]};
      // }

      // for(var i=0; i<data.length; i++) {
      //   for(var j=0; j<keys.length; j++) {
      //     if(bounds[j].max < data[i][keys[j]]) {
      //       bounds[j].max = data[i][keys[j]];
      //     }
      //     if(bounds[j].min > data[i][keys[j]]) {
      //       bounds[j].min = data[i][keys[j]];
      //     }
      //   }
      // }

      // console.log(bounds);

      // for(var i=0; i<data.length; i++) {
      //   for(var j=0; j<keys.length; j++) {
      //     data[i][keys[j]] = (data[i][keys[j]] - bounds[j].min) / (bounds[j].max - bounds[j].min);
      //   }
      // }

      // for(var i=0; i<data.length; i++) {
      //   sums[i] = 0;
      //   for(var j=0; j<keys.length; j++) {
      //     sums[i] += data[i][keys[j]];
      //   }
      // }

      // for(var i=0; i<data.length; i++) {
      //   for(var j=0; j<keys.length; j++) {
      //     data[i][keys[j]] = data[i][keys[j]] / sums[i];
      //   }
      // }

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

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(15));

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([-2, 2])
        .range([ height, 0 ]);
        
      // svg.append("g")
      //   .call(d3.axisLeft(y));

      


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

      // Show the areas
      layers
        .data(stackedData)
        .enter()
        .append("path")
          .style("fill", function(d) { return color(d.key); })
          .attr("d", d3.area()
            .x(function(d, i) { return x(new Date(d.data.year, 1, 1)); })
            .y0(function(d) { return y(d[0]); })
            .y1(function(d) { return y(d[1]); })
            .curve(d3.curveBasis)
          )

      var change_year = this.props.change_year;

      var mouseG = svg.append("g")
        .attr("class", "mouse-over-effects");
  
        mouseG.append("path") // this is the black vertical line to follow mouse
          .attr("class", "mouse-line")
          .style("stroke", "black")
          .style("stroke-width", "1px")
          .style("opacity", "0");

        var text = mouseG.append("text")
          .attr("class", "hint")
          .attr("y", 300)
          .attr("dy", ".5em")
          .style("text-anchor", "end")
          .style("font-weight", 500)
          .style("opacity", "0")
          .text("Click to select this year");

        mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
          .attr('width', width) // can't catch mouse events on a g element
          .attr('height', height)
          .attr('fill', 'none')
          .attr('pointer-events', 'all')
          .on('mouseout', function() { // on mouse out hide line, circles and text
            d3.select(".mouse-line")
              .style("opacity", "0");
            d3.select(".hint")
              .style("opacity", "0");
          })
          .on('mouseover', function() { // on mouse in show line, circles and text
            d3.select(".mouse-line")
              .style("opacity", "1");
            d3.select(".hint")
              .style("opacity", "1");
          })
          .on('mousemove', function(event) { // mouse moving over canvas
            var mouse = d3.pointer(event, this);
            d3.select(".mouse-line")
              .attr("d", function() {
                var d = "M" + mouse[0] + "," + height;
                d += " " + mouse[0] + "," + 0;
                return d;
              });
            d3.select(".hint")
              .attr("x", ()=>{return mouse[0] - 10;})
              .attr("y", ()=>{return mouse[1];})
              .text(()=>{return "Click to Select " + Math.round(mouse[0]/width*100+1920.5)});
          })
          .on('click', function(event) {
            var mouse = d3.pointer(event);
            change_year(Math.round(mouse[0]/width*100+1920.5));
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
        layers: layers
      });
    });

  }

  updateChart() {
    var keys = this.state.keys;
    var colors = this.state.colors;

    var data = this.state.data;

    var processed_data = JSON.parse(JSON.stringify(data));

    for(var i=0; i<data.length; i++) {
      for(var j=0; j<this.state.mask.length; j++) {
        if(this.state.mask[j] == 0) {
          processed_data[i][keys[j]] = 0;
        }
      }
    }
    console.log(this.state.mask);
    console.log(processed_data);

    var svg = this.state.svg;
    var x = this.state.x;
    var y = this.state.y;

    

    var layers = this.state.layers;
      // set the dimensions and margins of the graph
      var margin = this.props.size.margin,
      width = this.props.size.width - margin.left - margin.right,
      height = this.props.size.height - margin.top - margin.bottom;

      
      
      // color palette
      var color = d3.scaleOrdinal()
        .domain(keys)
        .range(colors)

      //stack the data?
      var stackedData = d3.stack()
        .offset(d3.stackOffsetSilhouette)
        .keys(keys)
        (processed_data)

      console.log(stackedData);
      
      svg.selectAll("*").remove();

      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(15));

      // Show the areas
      layers
        .data(stackedData)
        .enter()
        .append("path")
        .merge(layers)
          .style("fill", function(d) { return color(d.key); })
          .attr("d", d3.area()
            .x(function(d, i) { return x(new Date(d.data.year, 1, 1)); })
            .y0(function(d) { return y(d[0]); })
            .y1(function(d) { return y(d[1]); })
            .curve(d3.curveBasis)
          )
          var change_year = this.props.change_year;

          var mouseG = svg.append("g")
            .attr("class", "mouse-over-effects");
      
            mouseG.append("path") // this is the black vertical line to follow mouse
              .attr("class", "mouse-line")
              .style("stroke", "black")
              .style("stroke-width", "1px")
              .style("opacity", "0");
    
            var text = mouseG.append("text")
              .attr("class", "hint")
              .attr("y", 300)
              .attr("dy", ".5em")
              .style("text-anchor", "end")
              .style("font-weight", 500)
              .style("opacity", "0")
              .text("Click to select this year");
    
            mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
              .attr('width', width) // can't catch mouse events on a g element
              .attr('height', height)
              .attr('fill', 'none')
              .attr('pointer-events', 'all')
              .on('mouseout', function() { // on mouse out hide line, circles and text
                d3.select(".mouse-line")
                  .style("opacity", "0");
                d3.select(".hint")
                  .style("opacity", "0");
              })
              .on('mouseover', function() { // on mouse in show line, circles and text
                d3.select(".mouse-line")
                  .style("opacity", "1");
                d3.select(".hint")
                  .style("opacity", "1");
              })
              .on('mousemove', function(event) { // mouse moving over canvas
                var mouse = d3.pointer(event, this);
                d3.select(".mouse-line")
                  .attr("d", function() {
                    var d = "M" + mouse[0] + "," + height;
                    d += " " + mouse[0] + "," + 0;
                    return d;
                  });
                d3.select(".hint")
                  .attr("x", ()=>{return mouse[0] - 10;})
                  .attr("y", ()=>{return mouse[1];})
                  .text(()=>{return "Click to Select " + Math.round(mouse[0]/width*100+1920.5)});
              })
              .on('click', function(event) {
                var mouse = d3.pointer(event);
                change_year(Math.round(mouse[0]/width*100+1920.5));
              });
              svg.append('text')
              .attr('class', 'axis-label')
              .text("Year")
              .attr('font-weight', 500)
              .attr('font-size', "0.8em")
              .attr('x', margin.left / 2 + (width - margin.left - margin.right) / 2)
              .attr('y', 375) // Relative to the x axis.
  }

  render(){
    return (
      <div id={this.props.id}>
        <div class="title">Audio Feature Trends</div>
        <div class="subtitle">Bandwidth of each stream represents the value of each audio feature</div>
        <div id="year-view-content">
          
          <div id="year-view-graph"></div>
          <div id="toggle-panel">
            <div>&nbsp;</div>
            <div class="toggle-btn" id="toggle-acousticness">Acousticness</div>
            <div class="toggle-btn" id="toggle-danceability">Danceability</div>
            <div class="toggle-btn" id="toggle-energy">Energy</div>
            <div class="toggle-btn" id="toggle-instrumentalness">Instrumentalness</div>
            <div class="toggle-btn" id="toggle-liveness">Liveness</div>
            <div class="toggle-btn" id="toggle-valence">Valence</div>
            <div class="toggle-hint">Toggle Feature</div>
          </div>
        </div>
      </div>
    );
  }
}

export default YearView;