import * as d3 from "d3";
import { nest } from 'd3-collection'
import csvPath from '../assets/data/Spotify_data2.csv';

export async function drawLineFromCsvAsync(){
    const parseDate = d3.timeParse("%Y");
    const dataSet = await d3.csv(csvPath, function(d) {
        return {
            artists: d.artists,
            year: parseDate(d.year),
            popularity: +d.popularity
        };
    })

    const data = nest()
        .key(function(d) { return d.artists; })
        .entries(dataSet);
        
    console.log(data);
    drawLinePlot(data, "#lineviz");

    
    // console.log(data); 
    // data processed in Python
    // drawLinePlot(data, "#lineviz");
}    

function drawLinePlot(data, id) {

    // set the dimensions and margins of the graph
    const margin = {top: 20, right: 30, bottom: 100, left: 60};
    //const parentDiv = document.getElementById(id.substring(1));
    const height = 400 - margin.top - margin.bottom;
    //const width = parentDiv.clientWidth;
    const width = 460 - margin.left - margin.right;

    // var width = 500;
    // var height = 300;
    // var margin = 50;
    var duration = 250;

    var lineOpacity = "0.25";
    var lineOpacityHover = "0.85";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "1.5px";
    var lineStrokeHover = "2.5px";

    var circleOpacity = '0.85';
    var circleOpacityOnLineHover = "0.25"
    var circleRadius = 3;
    var circleRadiusHover = 6;
    
    // format data
    /* var parseDate = d3.timeParse("%Y");
    data.array.forEach(function(d) {
        d.values.forEach(function(d) {
            d.year = parseDate(d.year);
            d.popularity = +d.popularity;
        });
    }); */

    // Add X axis --> it is a date format
    const xScale = d3.scaleTime()
        .domain([d3.min(data.map(year => d3.min(year.values.map(value => value.year))))
            , d3.max(data.map(year => d3.max(year.values.map(value => value.year))))])
        //.domain(data.map(function(d) { return d.year; }))
        .range([ 0, width ]);

    // Add Y axis
    const yScale = d3.scaleLinear() 
        //.domain([0, d3.max(data[0].values, d => d.popularity)])
        .domain([0, d3.max(data.map(artist => d3.max(artist.values.map(value => value.popularity))))])
        //.domain([0, d3.max(data, function(d) { return d.popularity; })])
        .range([ height, 0 ]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // append the svg object to the body of the page
    var svg = d3.select("body")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    // add line into svg
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.popularity));
        //.x(function(d) { return xScale(d.year); })
        //.y(function(d) { return yScale(d.popularity); });

    let lines = svg.append("g")
        .attr("class", "lines");

    lines.selectAll(".line-group")
        .data(data).enter()
        .append("g")
        .attr("class", "line-group")
        .on("mouseover", function(d, i) {
            svg.append("text")
                .attr("class", "title-text")
                .style("fill", color(i))
                .text(i.values[0].artists)
                .attr("text-anchor", "middle")
                .attr("x", (width-margin.left)/2)
                .attr("y", 5);
        })
        .on("mouseout", function(d) {
            svg.select(".title-text").remove();
        })
        .append('path')
        .attr('class', 'line')
        .attr('d', d => line(d.values))
        .style('stroke', (d, i) => color(i))
        .style('opacity', lineOpacity)
        .on("mouseover", function(d) {
            d3.selectAll('.line')
                .style('opacity', otherLinesOpacityHover);
            d3.selectAll('.circle')
                .style('opacity', circleOpacityOnLineHover);
            d3.select(this)
                .style('opacity', lineOpacityHover)
                .style("stroke-width", lineStrokeHover)
                .style("cursor", "pointer");
        })
        .on("mouseout", function(d) {
            d3.selectAll(".line")
				.style('opacity', lineOpacity);
            d3.selectAll('.circle')
				.style('opacity', circleOpacity);
            d3.select(this)
                .style("stroke-width", lineStroke)
                .style("cursor", "none");
        });
        
    lines.selectAll("circle-group")
        .data(data).enter()
        .append("g")
        .style("fill", (d, i) => color(i))
        .selectAll("circle")
        .data(d => d.values).enter()
        .append("g")
        .attr("class", "circle")  
        .on("mouseover", function(e, d) {
            d3.select(this)     
              .style("cursor", "pointer")
              .append("text")
              .attr("class", "text")
              .text(`${d.popularity}`)
              .attr("x", d => xScale(d.year) + 5)
              .attr("y", d => yScale(d.popularity) - 10);
          })
        .on("mouseout", function(d) {
            d3.select(this)
              .style("cursor", "none")  
              .transition()
              .duration(duration)
              .selectAll(".text").remove();
          })
        .append("circle")
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.popularity))
        .attr("r", circleRadius)
        .style('opacity', circleOpacity)
        .on("mouseover", function(d) {
              d3.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadiusHover);
            })
          .on("mouseout", function(d) {
              d3.select(this) 
                .transition()
                .duration(duration)
                .attr("r", circleRadius);  
            });
    
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width /2 )
        .attr("y", 40)
        .attr("transform", 
            "translsate(" + (width/1.9) + "," + (height-margin.top) + ")")
        .style("text-anchor", "middle")
        .attr("fill", "#000")
        .text("Year");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("x", -100)
        .attr("y", -35)
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text("Popularity Levels");


    /* Add Axis into SVG */
    /* const xAxis = d3.axisBottom(x).ticks(5);
    const yAxis = d3.axisLeft(y).ticks(5);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height-margin})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append('text')
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text("Total values"); */
}
