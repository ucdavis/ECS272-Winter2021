import * as d3 from "d3";
import csvPath from '../assets/data/data_by_year_stream.csv';


export async function drawStreamGraph(){

    // set the dimensions and margins of the graph
    var margin = {top: 40, right: 20, bottom: 30, left: 30},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#streamgraph")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    const data = await d3.csv(csvPath);

    // List of groups = header of the csv files
    var keys = data.columns.slice(1)

    // Add X axis
    var x = d3.scaleLinear()
                .domain(d3.extent(data, function(d) { return d.year; }))
                .range([ 0, width ]);
    
    svg.append("g")
        .attr("transform", "translate(0," + height*0.8 + ")")
        .call(d3.axisBottom(x)
                .tickSize(-height*2)
                .tickValues([1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]))
        .select(".domain").remove()
    // Customization
    svg.selectAll(".tick line").attr("stroke", "#000000")

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2)
    .attr("y", height-10 )
    .text("Year");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([-1, 1])
    .range([ height, 0 ]);

    // color palette
    var color = d3.scaleOrdinal()
                    .domain(keys)
                    .range(["#79d70f", "#d7efb6", "#e8249a", "#c4fa70", "#cf7500", "#ffffff"]);

    //stack the data?
    var stackedData = d3.stack()
                        .offset(d3.stackOffsetSilhouette)
                        //.order(d3.stackOrderInsideOut)
                        .keys(keys)
                        (data)

    // create a tooltip
    var Tooltip = svg
                    .append("text")
                    .attr("x", 0)
                    .attr("y", 0)
                    .style("opacity", 0)
                    .style("font-size", 17)

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
    Tooltip.style("opacity", 0.5)
    d3.selectAll(".myArea").style("opacity", .2)
    d3.select(this)
    //.style("stroke", "black")
    .style("opacity", 0.8)
    }

    console.log(keys)
    var mousemove = function(d,i) {
                                var grp = keys[i]
                                Tooltip.html(grp)
                                console.log("Grp:   " + grp)
                            }

    var mouseleave = function(d) {
    Tooltip.style("opacity", 0)
    d3.selectAll(".myArea")
        .style("opacity", 0.5)
        .style("stroke", "none")
    }

    // Area generator
    var area = d3.area()
    .x(function(d) { return x(d.data.year); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })

    // Show the areas
    svg
        .selectAll("mylayers")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", "myArea")
        .style("fill", function(d) { return color(d.key); })
        .attr("d", area)
        .style("opacity", 0.5)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

        var colors = ["#79d70f", "#d7efb6", "#e8249a", "#c4fa70", "#cf7500", "#ffffff"]
        var attr = ["acousticness", "danceability", "energy", "liveness", "speechiness", "valence"]
        var padding = 400;
    
        var legend = svg.append('g')
                    .attr('class', 'legend')
                    .attr('transform', 'translate(' + (padding + 12) + ', 0)');
    
                legend.selectAll('rect')
                    .data(attr)
                    .enter()
                    .append('rect')
                    .attr('x', 0)
                    .attr('y', function(d, i){
                        return i * 16;
                    })
                    .attr('width', 10)
                    .attr('height', 10)
                    .attr('fill', function(d, i){
                        return colors[i];
                    });
                
                legend.selectAll('text')
                    .data(attr)
                    .enter()
                    .append('text')
                    .text(function(d){
                        return d;
                    })
                    .attr('x', 16)
                    .attr('y', function(d, i){
                        return i * 16;
                    })
                    .attr('text-anchor', 'start')
                    .attr('alignment-baseline', 'hanging');
      

}