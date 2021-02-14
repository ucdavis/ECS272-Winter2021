import * as d3 from "d3";
// import csvPath from '../assets/data/stream_test.csv';
import streamCsvPath from '../assets/data/crime_history.csv';
import streamCoarseCsvPath from '../assets/data/crime_history_coarse.csv';
import {drawCrimeTimeBarChart} from "./barchart";
import {drawSF} from "./geoGraph"
import sfGeoData from "../assets/data/san-francisco-crime-updated.json";

export async function drawStreamFromCsvAsync(level, id){
    d3.select(id).select("svg").remove();

    // console.log("The level is: ", level);
    var data;
    if (level === "coarse") {
        console.log("11111The level is: ", level);
        data = await d3.csv(streamCoarseCsvPath, d3.autoType);
        
    }
    else {
        console.log("22222The level is: ", level);
        data = await d3.csv(streamCsvPath, d3.autoType);
        
    } 
    data.y = "Unemployment"
    // var test = Object.assign(data, {y:"Unemployment"});
    // console.log("D3 info!!!: ", d3.version); //6.3.1 version
    console.log("In the drawBarFromCsvAsync, test stream graph: ", data); 
    //process data()
    //draw chart ()
    //There will be some delay in console before it prints the array

    // const height = 0.5* document.documentElement.clientHeight;
    // const width = document.documentElement.clientWidth;
    const height = 0.4 * window.innerHeight;
    const width = window.innerWidth;
    // const margin = ({top: 0, right: 0, bottom: 20, left: 0});
    const margin = { top:0, right: 30, bottom: 20, left: 30 };

    console.log("Column: ", d3.stack().keys(data.columns.slice(1)).offset(d3.stackOffsetWiggle).order(d3.stackOrderInsideOut)(data));
    const series = d3.stack().keys(data.columns.slice(1)).offset(d3.stackOffsetWiggle).order(d3.stackOrderInsideOut)(data);
    console.log("Series: ", series);
    // const x = d3.scaleBand().domain(data.map(d => d.y))
    //     .rangeRound([margin.left, width - margin.right])
    //     .padding(0.1);
    const x = d3.scaleUtc()
        .domain(d3.extent(data, d => d.date))
        .range([margin.left, width - margin.right]);
    
    const y = d3.scaleLinear()
        .domain([d3.min(series, d => d3.min(d, d => d[0])), d3.max(series, d => d3.max(d, d => d[1]))])
        .range([height - margin.bottom, margin.top]);
    
    const color = d3.scaleOrdinal()
        .domain(data.columns.slice(1))
        // .range(d3.schemeCategory10);
        .range(d3.schemeBlues[9]);
    console.log("The domain of color is: ", data.columns.slice(1))
    // const color = d3
    
    
    // const area = d3.area()
    //     .x(d => x(d.data.date))
    //     .y0(d => y(d[0]))
    //     .y1(d => y(d[1]));
    // console.log("area: ", area);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
        // .call(g => g.select(".domain").remove());   

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width-margin.left )
        .attr("height", height)
        .style("background-color", "white");
        // .attr("width", width - margin.left - margin.right)
        // .attr("height", height - margin.top - margin.bottom);

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width-14)
        .attr("y", height-6 )
        .text("Time");
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 10)
        // .attr("dy", "1.5em")
        .attr("x", 70)
        // .attr("transform", "rotate(-90)")
        .text("Counts");
    svg.append("g")
        .selectAll("path")
        .data(series)
        .join("path")
        // .attr("fill", ({key}) => color(key))
        // .attr("fill", "white")
        // .attr("stroke", "#b8b8b8")
        // .attr("d", area)
        .on('click', function(d, i) {
            // d3.select('.status')
            //   .text('You clicked on circle ' + i);
            console.log("!!!!!!Made a selection!");
// test
            drawCrimeTimeBarChart("ROBBERY","#bar1");
            document.getElementById("change_chart").value = '3';

            drawSF(sfGeoData, i.key,"#bar2");
            // document.getElementById("change_chart").value = '3';

            var itr;
            var total = 0;
            for (itr = 0; itr < i.length; itr++) {
                total = total + (i[itr][1]- i[itr][0]);
            } 
            console.log("The color is: "+ String(total));
            // return d3.interpolateBlues(total/20658);
            d3.select(id).selectAll("path").style('fill', 'gray');
            d3.select(this)
            .style('fill', d3.interpolateBlues(total/20658));
            // d3.select(id).selectAll("path").select('domain').style('fill', 'white');
        })
        .attr("d", d3.area().x(function(d, i) { return x(d.data.date); }).y0(function(d) { return y(d[0]); }).y1(function(d) { return y(d[1]); }))
        .attr("fill", function(d) { 
            var i;
            var total = 0;
            for (i = 0; i < d.length; i++) {
                total = total + (d[i][1]- d[i][0]);
            } 
            console.log("The delta is: "+(d[1]-d[0] ));

            return d3.interpolateBlues(total/20658);})
        .append("title")
        .text(({key}) => key);

    svg.append("g")
        .call(xAxis);
    svg.append("g")
        .call(yAxis)
        // .call(g => g.select(".tick:last-of-type text")
        //         .clone()
        //         .attr("transform", `rotate(-90)`)
        //         .attr("text-anchor", "middle")
        //         .attr("x", -(15 - margin.top - margin.bottom) / 2)
        //         .attr("y", -80)
        //         .attr("font-weight", "bold"))

}

