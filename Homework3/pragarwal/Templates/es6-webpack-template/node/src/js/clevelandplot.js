import * as d3 from "d3";
//import { csv } from "d3";
import csvPath from '../assets/data/TopArtistsTikTok.csv';


export async function drawClevelandPlot(){

    var margin = {top: 20, right: 20, bottom: 30, left: 100},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#clevelandplot")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    const data = await d3.csv(csvPath)


    // Add X axis
    var x = d3.scaleLinear()
        .domain([50, 100])
        .range([ 0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    // Y axis
    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(function(d) { return d.artists; }))
        .padding(1);
    svg.append("g")
        .call(d3.axisLeft(y))

    
    
        // Lines
    svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .transition()
            .duration(5000)
        .attr("x1", function(d) { return x(d.Spotify); })
        .attr("x2", function(d) { return x(d.TikTok); })
        .attr("y1", function(d) { return y(d.artists); })
        .attr("y2", function(d) { return y(d.artists); })
        .attr("stroke", "black")
        .attr("stroke-width", "2px")


    // Circles of variable 1
    svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .transition()
            .duration(2000)
        .attr("cx", function(d) { return x(d.Spotify); })
        .attr("cy", function(d) { return y(d.artists); })
        .attr("r", "5")
        .style("fill", "#1DB954")
        .style("stroke", "black")
        .style("stroke-width", "1.5")
        

    // Circles of variable 2
    svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .transition()
            .duration(2000)
        .attr("cx", function(d) { return x(d.TikTok); })
        .attr("cy", function(d) { return y(d.artists); })
        .attr("r", "8")
        .style("fill", "#EE1D52")
        .style("stroke", "black")
        .style("stroke-width", "3")


    var colors = [ '#1DB954','#EE1D52']
    var attr = ['Spotify', 'TikTok']
        
        
        
        var n = 2;
        var itemWidth =80;
        var itemHeight = 18;
        var width = 500;
    
        //var svg = d3.select("svg");
    
        //var color = d3.scale.category10();
    
        var legendGroup = svg.append("g")
            .attr("transform", "translate("+(width-350)+", -5)");
    
        var legend = legendGroup.selectAll(".legend")
            .data(attr)
            .enter()
            .append("g")
            .attr("transform", function(d,i) { return "translate(" + i%n * itemWidth + "," + Math.floor(i/n) * itemHeight + ")"; })
            .attr("class","legend");
            
        var circles = legend.append('circle')
            .attr("r",6)
            .attr("stroke", "black")
            .attr("stroke-width", "2")
            .attr("fill", function(d,i) { return colors[i]; });
            
        var text = legend.append('text')
            .data(attr)
            .attr("x", 10)
            .attr("y",10)
            .text(function(d, i) { return attr[i]; });




}