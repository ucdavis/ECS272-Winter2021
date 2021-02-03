import * as d3 from "d3";
import csvPath from '../assets/data/data_by_year.csv';


export async function drawBubbleChart(){

    

    //Read the data
    const data = await d3.csv(csvPath);
    
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;


    // List of groups (here I have one group per column)
    // var allGroup = ["danceability", "energy", "liveness", "acousticness", "valence"]


    // // add the options to the button
    // d3.select("#selectBubbleButton")
    //   .selectAll('myOptions')
    //  	.data(allGroup)
    //   .enter()
    // 	.append('option')
    //   .text(function (d) { return d; }) // text showed in the menu
    //   .attr("value", function (d) { return d; }) // corresponding value returned by the button

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
              .domain([1920, 2020])
              .range([ 0, width ])
        //x2 = d3.scaleLinear()
            //    .domain([1921, 2020])
            //    .range([0, width]);
    
    svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x))
       .call(g =>
        g .select(".tick:last-of-type text")
          .clone()
          .attr("text-anchor", "middle")
          .attr("x", -width / 2)
          .attr("y", margin.bottom - 10)
          //.attr("font-weight", "bold")
          .text("Year")
        );

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0]);
    
    svg.append("g")
        .call(d3.axisLeft(y))
        .call(g =>
            g .select(".tick:last-of-type text")
              .clone()
              .attr("transform", `rotate(-90)`)
              .attr("text-anchor", "middle")
              .attr("x", (600 - margin.top - margin.bottom) / 2)
              .attr("y", 100)
              .attr("font-weight", "bold")
              .text("Danceability")
              .style("color", "white")
          );

    // Add a scale for bubble size
    var z = d3.scaleLinear()
        .domain([0, 100])
        .range([ 1, 50]);


    var tooltip = d3.select("#mydataviz")
                    .append("div")
                    .style("opacity", 0)
                    .attr("id", "tooltip")
                    .style("background-color", "grey")
                    .style("border-radius", "5px")
                    .style("padding", "10px")
                    .style("color", "white")

    
    var showTooltip = function(d) {
                        
                    tooltip
                          .transition()
                          .duration(200)
                    tooltip
                          .style("opacity", 1)
                          .html("Popularity: " + d.popularity)
                        //   .style("left", (d3.mouse(this)[0]+30) + "px")
                        //   .style("top", (d3.mouse(this)[1]+30) + "px")

                      }

    var moveTooltip = function(d) {
                        
                    tooltip
                          //.style("left", (d3.mouse(this)[0]+30) + "px")
                          //.style("top", (d3.mouse(this)[1]+30) + "px")
                      }
    
    var hideTooltip = function(d) {
                
                    tooltip
                          .transition()
                          .duration(200)
                          .style("opacity", 0)
                      }
                    

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
        .on('mouseover', showTooltip)
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip)


        
    //return svg.node();

    // function update(selectedGroup) {

    //     // Create new data with the selection?
    //     var dataFilter = data.map(function(d){return {year: d.year, value:d[selectedGroup]} })
  
    //     // Give these new data to update line
    //     bubbles
    //         .datum(dataFilter)
    //         .transition()
    //         .duration(1000)
    //         .attr("d", d3.dot()
    //                             .cx(function(d) { return x(d.year) })
    //                             .cy(function(d) { return y(d.value) })
    //                             .r(function (d) { return z(d.popularity) })
    //         )
    //         //.attr("stroke", function(d){ return myColor(selectedGroup) })
    //   }

    //   // When the button is changed, run the updateChart function
    // d3.select("#selectButton").on("change", function(d) {
    //     // recover the option that has been chosen
    //     var selectedOption = d3.select(this).property("value")
    //     // run the updateChart function with this selected option
    //     update(selectedOption)
    // })
}