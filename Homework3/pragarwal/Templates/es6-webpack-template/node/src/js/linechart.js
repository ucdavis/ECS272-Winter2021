
import * as d3 from "d3";
import csvPath from '../assets/data/data_by_year.csv';
import {drawStackedBarChartTopArtist} from "./stackedbarcharttopartist"

//https://bl.ocks.org/EfratVil/92f894ac0ba265192411e73f633a3e2f


export async function drawLineChart(){


    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 10, bottom: 100, left: 30},
    margin2 = {top: 230, right: 10, bottom: 30, left: 30},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
    height2 = 300 - margin2.top - margin2.bottom;


    // List of groups (here I have one group per column)
    var allGroup = ["danceability", "energy", "liveness", "acousticness", "valence"]


    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    var myColor = d3.scaleLinear()
                    .domain(allGroup)
                    .range(["#79d70f", "#d7efb6", "#e8249a", "#c4fa70", "#cf7500"]);

        console.log("colorrrrrr:   " + myColor["danceability"]);
    // parse the date / time
    var parseTime = d3.timeParse("%Y");

    // set the ranges
    var x = d3.scaleTime()
                .range([0, width]);
    var y = d3.scaleLinear()
                .range([height, 0]);

    var x2 = d3.scaleTime()
                .range([0, width]);

    var y2 = d3.scaleLinear()
                .range([height2, 0]);



    var line = d3.line()
                        .x(function(d) { return x(d.year); })
                        .y(function(d) { return y(d.danceability); });

    var line2 = d3.line()
                        .x(function(d) { return x2(d.year); })
                        .y(function(d) { return y2(d.danceability); });


    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#linechart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    const data = await d3.csv(csvPath);


    // format the data
    data.forEach(function(d) {
            d.date = parseTime(d.year);
            d.danceability = +d.danceability;
            d.energy = +d.energy;
            d.liveness = +d.liveness;
            d.acousticness = +d.acousticness;
            d.valence = +d.valence;
    });

    
    
    var tooltip = d3.select(".line")
                    .append("div")
                    .style("opacity", 1.0)
                    .attr("class", "tooltip")
                    .style("background-color", "black")
                    // .style("border-radius", "5px")
                    .style("padding", "10px")
                    .style("color", "white")

    
    //var showTooltip = 
    function handleMouseOver(d) {
                        
                    //tooltip
                    d3.select(this)
                          .transition()
                          .duration(200)
                          .style("stroke-width", '4.5px')
                      }

    
    //var hideTooltip = 
    function handleMouseOut(d) {
                
                    d3.select(this)
                          .transition()
                          .duration(100)
                          .style("stroke-width", "4.5px")
                      }
                    
    
    // Scale the range of the data
    x.domain([1920, 2020])
    y.domain([0, 1]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    
    var xAxis = d3.axisBottom(x).tickFormat(d3.format("d")),
    xAxis2 = d3.axisBottom(x2).tickFormat(d3.format("d")),
    yAxis = d3.axisLeft(y);

    var brush = d3.brushX()
                    .extent([[0, 0], [width, height2]])
                    .on("brush end", brushed);
                  
                  
    var zoom = d3.zoom()
                    .scaleExtent([1, 32])
                    .extent([[margin.left, 0], [width - margin.right, height]])
                    .translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]])
                    .on("zoom", zoomed);
                      


    var clip = svg.append("defs").append("svg:clipPath")
                    .attr("id", "clip")
                    .append("svg:rect")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("x", 0)
                    .attr("y", 0); 

    var Line_chart = svg.append("g")
                        .attr("class", "focus")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .attr("clip-path", "url(#clip)");

    var focus = svg.append("g")
                    .attr("class", "focus")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg.append("g")
                        .attr("class", "context")
                        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    

    focus.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "axis axis--y")
        .call(yAxis);

    
    var lineonly = Line_chart.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    var lineonly2 = context.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line2);


    context.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);
  
    context.append("g")
        .attr("class", "brush")
        .call(brush)
        .call(brush.move, x.range());
  
    
    svg.append("rect")
        .attr("class", "zoom")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);
  

    
    function brushed(event) {
            if (event && event.type === "brush") {// ignore brush-by-zoom
            var s = event.selection || x2.range();
            x.domain(s.map(x2.invert, x2));
            Line_chart.select(".line").attr("d", line);
            focus.select(".axis--x").call(xAxis);
            svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                .scale(width / (s[1] - s[0]))
                .translate(-s[0], 0));
            }
          }
          
    function zoomed(event) {
            if (event && event.type === "zoom") { // ignore zoom-by-brush
            var t = event.transform;
            x.domain(t.rescaleX(x2).domain());
            Line_chart.select(".line").attr("d", line);
            focus.select(".axis--x").call(xAxis);
            context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
            }
          }
          

    

    function update(selectedGroup) {

        // Create new data with the selection?
        var dataFilter = data.map(function(d){return {year: d.year, value:d[selectedGroup]} })
  
        // Give these new data to update line
        lineonly
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .style("stroke", function(d) { return myColor(d.selectedGroup) })
            .attr("d", d3.line()
                                .x(function(d) { return x(d.year) })
                                .y(function(d) { return y(d.value) }));

            //console.log("year:   " + year + "   " + "value:    " +    value)   

        lineonly2
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                                .x(function(d) { return x2(d.year) })
                                .y(function(d) { return y2(d.value) }));     
      }

      // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)

        drawStackedBarChartTopArtist(selectedOption);
    })

    // Variable to Hold Total Length
    // var totalLength = line.node().getTotalLength();
    var totalLength = 3000;
    console.log("Totessssss: " +totalLength)

// Set Properties of Dash Array and Dash Offset and initiate Transition
    lineonly
        .attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition() // Call Transition Method
            .duration(15000) // Set Duration timing (ms)
            .ease(d3.easeLinear) // Set Easing option
            .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition


    
    

//Legend

// var colors = ["#03dac5", "#e8249a", "#fb84ce", "#eeff01", "#bb86fc"]
//     var attr = ["danceability", "energy", "liveness", "acousticness", "valence"]
//     var padding = 400;

//     var legend = svg.append('g')
//                 .attr('class', 'legend')
//                 .attr('transform', 'translate(' + (padding + 12) + ', 0)');

//             legend.selectAll('rect')
//                 .data(attr)
//                 .enter()
//                 .append('rect')
//                 .attr('x', 0)
//                 .attr('y', function(d, i){
//                     return i * 16;
//                 })
//                 .attr('width', 10)
//                 .attr('height', 10)
//                 .attr('fill', function(d, i){
//                     return colors[i];
//                 });
            
//             legend.selectAll('text')
//                 .data(attr)
//                 .enter()
//                 .append('text')
//                 .text(function(d){
//                     return d;
//                 })
//                 .attr('x', 16)
//                 .attr('y', function(d, i){
//                     return i * 16;
//                 })
//                 .attr('text-anchor', 'start')
//                 .attr('alignment-baseline', 'hanging');

}
  
