import React, {Component} from 'react';
import * as d3 from "d3";

class YearDetailView extends Component{
  constructor(props) {
    super(props);

    this.state = {
      keys: this.props.keys,
      colors: this.props.colors,
      select: 0
    }
  }

  componentDidMount(){
    console.log("YearDetailView");

    for(var i=0; i<this.state.keys.length; i++) {
      document.getElementById("toggle-detail-"+ this.state.keys[i]).style.color = (i==this.state.select) ? this.state.colors[i] : "#dddddd";
    }

    console.log(this.state.keys);
    var changeKeys = (index)=>{
      this.state.select = index;
      for(var i=0; i<this.state.keys.length; i++) {
        document.getElementById("toggle-detail-"+ this.state.keys[i]).style.color = (i==index) ? this.state.colors[i] : "#dddddd";
      }
      this.props.change_selected(index);
      this.updateChart();
    };

    document.getElementById("toggle-detail-acousticness").addEventListener('click', ()=>{changeKeys(0)});
    document.getElementById("toggle-detail-danceability").addEventListener('click', ()=>{changeKeys(1)});
    document.getElementById("toggle-detail-energy").addEventListener('click', ()=>{changeKeys(2)});
    document.getElementById("toggle-detail-instrumentalness").addEventListener('click', ()=>{changeKeys(3)});
    document.getElementById("toggle-detail-liveness").addEventListener('click', ()=>{changeKeys(4)});
    document.getElementById("toggle-detail-valence").addEventListener('click', ()=>{changeKeys(5)});

    this.drawChart();
  }

  drawChart(){
    // Parse the Data
    d3.csv(this.props.data).then((data)=>{
      d3.csv(this.props.data_by_year).then((data_by_year)=>{
      var keys = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness", "tempo", "loudness", "popularity", "valence"];
      var bounds = [];
      var sums = [];

      var filteredData = [];

      for(var i=0; i<data.length; i++) {
        for(var j=0; j<keys.length; j++) {
          data[i][keys[j]] = parseFloat(data[i][keys[j]]);
        }
        // if(parseInt(data[i]["year"]) == 2020) {
        //   filteredData.push(data[i]);
        // }
      }

      for(var i=0; i<data_by_year.length; i++) {
        for(var j=0; j<keys.length; j++) {
          data_by_year[i][keys[j]] = parseFloat(data_by_year[i][keys[j]]);
        }
      }

      // set the dimensions and margins of the graph
      var margin = this.props.size.margin,
      width = this.props.size.width - margin.left - margin.right,
      height = this.props.size.height - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#year-detail-view-graph")
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
        .domain([0, 1])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // define the clipPath
      svg.append("clipPath")       // define a clip path
      .attr("id", "clip") // give the clipPath an ID
      .append("rect")          // shape it as an ellipse
      .attr("x", 0)        // position the left of the rectangle
      .attr("y", 0)  
      .attr("height", height)    // set the height
      .attr("width", width);    // set the width

      //Container for the gradients
      var defs = svg.append("defs");

      //Filter for the outside glow
      var glow_filter = defs.append("filter")
          .attr("id","glow");
      glow_filter.append("feGaussianBlur")
          .attr("stdDeviation","20")
          .attr("result","coloredBlur");
      var feMerge = glow_filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in","coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in","SourceGraphic");

        // create filter with id #drop-shadow
        // height=130% so that the shadow is not clipped
      var shadow_filter = defs.append("filter")
        .attr("id", "drop-shadow")
        .attr("height", "130%");

        // SourceAlpha refers to opacity of graphic that this filter will be applied to
        // convolve that with a Gaussian with standard deviation 3 and store result
        // in blur
        shadow_filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 1)
        .attr("result", "blur");

        // translate output of Gaussian blur to the right and downwards with 2px
        // store result in offsetBlur
        shadow_filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 0)
        .attr("dy", 0)
        .attr("result", "offsetBlur");

        // overlay original SourceGraphic over translated blurred opacity by using
        // feMerge filter. Order of specifying inputs is important!
      var feMerge = shadow_filter.append("feMerge");

      feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
      feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

      var line = d3.line()
        .x(function(d, i) { return x(new Date(d.year, 1, 1)); }) // set the x values for the line generator
        .y(function(d) { return y(d.acousticness); }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX)

      svg.append("path")
        .datum(data_by_year) // 10. Binds data to the line 
        .attr("clip-path", "url(#clip)")
        .attr("class", "line") // Assign a class for styling 
        .attr("fill", "none")
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 1.5)
        .style("filter", "url(#drop-shadow)")
        .attr("d", line);

      // svg.append("path")
      //   .datum(data_by_year)
      //   .attr("fill", "none")
      //   .attr("stroke", "steelblue")
      //   .attr("stroke-width", 1.5)
      //   .attr("d", d3.line()
      //     .x(function(d) { return x(new Date(d.year, 1, 1)) })
      //     .y(function(d) { return y(d.energy) })
      //     )

      var color = d3.scaleLinear()
        .domain([0, 1]) // Points per square pixel.
        .range(["white", "#ed0345"])

      var densityData = d3.contourDensity()
        .x(function(d) { return x(new Date(d.year, 1, 1)); })
        .y(function(d) { return y(d.acousticness); })
        .size([width, height])
        .bandwidth(15)
        (data)



      svg.insert("g", "g")
        .selectAll("path")
        .data(densityData)
        .enter().append("path")
          .attr("clip-path", "url(#clip)")
          .attr("d", d3.geoPath())
          .style("filter", "url(#glow)")
          .attr("fill", function(d) { return color(d.value); })

          svg.append('text')
          .attr('class', 'axis-label')
          .text("Year")
          .attr('font-weight', 500)
          .attr('font-size', "0.8em")
          .attr('x', margin.left / 2 + (width - margin.left - margin.right) / 2)
          .attr('y', 175) // Relative to the x axis.
          
          svg.append('text')
          .attr('class', 'axis-label')
          .text("acousticness")
          .attr('font-weight', 500)
          .attr('font-size', "0.8em")
          .attr('transform', 'rotate(-90)')
          .attr('x', -(margin.top * 2 + (height - margin.top - margin.bottom) / 2) - "acousticness".length * 2)
          .attr('y', -32); // Relative to the y axis.

      this.setState({
        data: data,
        data_by_year: data_by_year,
        svg: svg,
        x: x,
        y: y,
        height:height,
        width:width,
        glow_filter:glow_filter,
        shadow_filter:shadow_filter,
        defs:defs,
        margin: margin
      });
     });
    });
  }

  updateChart() {
    var svg = this.state.svg;
    var x = this.state.x;
    var y = this.state.y;
    var height = this.state.height;
    var width = this.state.width;
    var data = this.state.data;
    var keys = this.state.keys;
    var select = this.state.select;
    var colors = this.state.colors;
    var data_by_year = this.state.data_by_year;
    var margin = this.state.margin;

    svg.selectAll("*").remove();

    //Container for the gradients
    var defs = svg.append("defs");

    //Filter for the outside glow
    var glow_filter = defs.append("filter")
        .attr("id","glow");
    glow_filter.append("feGaussianBlur")
        .attr("stdDeviation","20")
        .attr("result","coloredBlur");
    var feMerge = glow_filter.append("feMerge");
      feMerge.append("feMergeNode")
          .attr("in","coloredBlur");
      feMerge.append("feMergeNode")
          .attr("in","SourceGraphic");

      // create filter with id #drop-shadow
      // height=130% so that the shadow is not clipped
    var shadow_filter = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");

      // SourceAlpha refers to opacity of graphic that this filter will be applied to
      // convolve that with a Gaussian with standard deviation 3 and store result
      // in blur
      shadow_filter.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 1)
      .attr("result", "blur");

      // translate output of Gaussian blur to the right and downwards with 2px
      // store result in offsetBlur
      shadow_filter.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 0)
      .attr("dy", 0)
      .attr("result", "offsetBlur");

      // overlay original SourceGraphic over translated blurred opacity by using
      // feMerge filter. Order of specifying inputs is important!
    var feMerge = shadow_filter.append("feMerge");

    feMerge.append("feMergeNode")
      .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
      .attr("in", "SourceGraphic");

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(15));
    svg.append("g")
      .call(d3.axisLeft(y));

    // define the clipPath
    svg.append("clipPath")       // define a clip path
    .attr("id", "clip") // give the clipPath an ID
    .append("rect")          // shape it as an ellipse
    .attr("x", 0)        // position the left of the rectangle
    .attr("y", 0)  
    .attr("height", height)    // set the height
    .attr("width", width);    // set the width

    var line = d3.line()
    .x(function(d, i) { return x(new Date(d.year, 1, 1)); }) // set the x values for the line generator
    .y(function(d) { return y(d[keys[select]]); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX)

    svg.append("path")
      .datum(data_by_year) // 10. Binds data to the line 
      .attr("clip-path", "url(#clip)")
      .attr("class", "line") // Assign a class for styling 
      .attr("fill", "none")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1.5)
      .style("filter", "url(#drop-shadow)")
      .attr("d", line);

    var color = d3.scaleLinear()
    .domain([0, 1]) // Points per square pixel.
    .range(["white", colors[select]])

    var densityData = d3.contourDensity()
      .x(function(d) { return x(new Date(d.year, 1, 1)); })
      .y(function(d) { return y(d[keys[select]]); })
      .size([width, height])
      .bandwidth(15)
      (data)

    svg.insert("g", "g")
      .selectAll("path")
      .data(densityData)
      .enter().append("path")
        .attr("clip-path", "url(#clip)")
        .attr("d", d3.geoPath())
        .style("filter", "url(#glow)")
        .attr("fill", function(d) { return color(d.value); })
      svg.append('text')
        .attr('class', 'axis-label')
        .text("Year")
        .attr('font-weight', 500)
        .attr('font-size', "0.8em")
        .attr('x', margin.left / 2 + (width - margin.left - margin.right) / 2)
        .attr('y', 175) // Relative to the x axis.
      
        svg.append('text')
        .attr('class', 'axis-label')
        .text(keys[select])
        .attr('font-weight', 500)
        .attr('font-size', "0.8em")
        .attr('transform', 'rotate(-90)')
        .attr('x', -(margin.top * 2 + (height - margin.top - margin.bottom) / 2) - keys[select].length * 2)
        .attr('y', -32); // Relative to the y axis.
  }

  render(){
    return (
      <div id={this.props.id}>
        <div class="title">Trend of Selected Audio Feature</div>
        <div class="subtitle">Line reflects its trend / Background represents sample density</div>
        <div id="year-detail-view-content">
          <div id="year-detail-view-graph"></div>
          <div id="toggle-panel">
            <div class="toggle-btn" id="toggle-detail-acousticness">acousticness</div>
            <div class="toggle-btn" id="toggle-detail-danceability">danceability</div>
            <div class="toggle-btn" id="toggle-detail-energy">energy</div>
            <div class="toggle-btn" id="toggle-detail-instrumentalness">instrumentalness</div>
            <div class="toggle-btn" id="toggle-detail-liveness">liveness</div>
            <div class="toggle-btn" id="toggle-detail-valence">valence</div>
          </div>
        </div>
      </div>
    );
  }
}

export default YearDetailView;