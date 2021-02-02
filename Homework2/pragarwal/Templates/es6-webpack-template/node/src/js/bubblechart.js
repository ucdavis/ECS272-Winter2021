import * as d3 from "d3";
import csvPath from '../assets/data/data_by_year.csv';


export async function drawBubbleChart(){

    

    //Read the data
    const data = await d3.csv(csvPath);
    
    var margin = {top: 40, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // var margin2 = {top: 440, right: 20, bottom: 10, left: 40},
    //     height2 = 200 - margin2.top - margin2.bottom;

    //var parseDate = d3.timeParse("%b %Y");

    // append the svg object to the body of the page
    var svg = d3.select("#mydataviz")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

    
    // Add X axis
    var x = d3.scaleLinear()
              .domain([1921, 2020])
              .range([ 0, width ])
        //x2 = d3.scaleLinear()
            //    .domain([1921, 2020])
            //    .range([0, width]);
    
    svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0]);
    
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add a scale for bubble size
    var z = d3.scaleLinear()
        .domain([0, 100])
        .range([ 1, 40]);


    // var tooltip = d3.select("#bubble")
    //                 .append("div")
    //                 .style("opacity", 0)
    //                 .attr("class", "tooltip")
    //                 .style("background-color", "black")
    //                 .style("border-radius", "5px")
    //                 .style("padding", "10px")
    //                 .style("color", "white")

    
    // var showTooltip = function(d) {
                        
    //                 tooltip
    //                       .transition()
    //                       .duration(200)
    //                 tooltip
    //                       .style("opacity", 1)
    //                       .html("Artists: " + d.artists)
    //                       .style("left", (d3.mouse(this)[0]+30) + "px")
    //                       .style("top", (d3.mouse(this)[1]+30) + "px")
    //                   }

    // var moveTooltip = function(d) {
                        
    //                 tooltip
    //                       .style("left", (d3.mouse(this)[0]+30) + "px")
    //                       .style("top", (d3.mouse(this)[1]+30) + "px")
    //                   }
    
    // var hideTooltip = function(d) {
                
    //                 tooltip
    //                       .transition()
    //                       .duration(200)
    //                       .style("opacity", 0)
    //                   }
                    

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "bubbles")
        .attr("cx", function (d) { return x(d.year); } )
        .attr("cy", function (d) { return y(d.danceability); } )
        .attr("r", function (d) { return z(d.popularity); } )
        //.style("fill", "#c4fa70")
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", '2.5px')
        // .on("mouseover", showTooltip )
        // .on("mousemove", moveTooltip )
        // .on("mouseleave", hideTooltip )
        
    return svg.node();
}