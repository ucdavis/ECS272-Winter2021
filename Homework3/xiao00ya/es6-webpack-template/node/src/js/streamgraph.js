import * as d3 from "d3";
// import csvPath from '../assets/data/stream_test.csv';
import streamCsvPath from '../assets/data/crime_history.csv';
import streamCoarseCsvPath from '../assets/data/crime_history_coarse.csv';
import {drawCrimeTimeBarChart} from "./barchart";
import {drawSF} from "./geoGraph"
import sfGeoData from "../assets/data/san-francisco-crime-updated.json";
import index from "../../src/util"

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
            drawCrimeTimeBarChart(i.key,"#bar1");
            var chart_options = document.getElementById("change_chart");
            var opts = chart_options.options.length;
            for (var itr=0; itr<opts; itr++){
                if (chart_options.options[itr].value == "6"){
                    chart_options.options[itr].selected = true;
                    break;
                }
            }

            drawSF(sfGeoData, i.key,"#bar2");
            var map_options = document.getElementById("change_map");
            document.getElementById("myCheck").value = false;
            opts = map_options.options.length;
            for (var itr=0; itr<opts; itr++){
                if (map_options.options[itr].value == "4"){
                    map_options.options[itr].selected = true;
                    break;
                }
            }

            index.global_crime_type = i.key;
            document.getElementById("showLocation").checked = true;
            document.getElementById("myCheck").checked = false;





            // index.global_crime_type = i.key;


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
            d3.select(id).selectAll('.domain').style('fill', 'white');
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
        
    var legend_color = d3.scaleSequential([0, 20658], d3.interpolateBlues);
    svg.append(() => legend({id: id, color:legend_color, title: "Total Crime Counts", width: 260}))
        .attr("transform", "translate(15,15)");

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

function legend({
    id,
    // canvas,
    color,
    title,
    tickSize = 2,
    width = 320,
    height = 40 + tickSize,
    marginTop = 15,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 150,
    ticks = width / 64,
    tickFormat,
    tickValues
  } = {}) {
    // svg = d3.select(id).append("svg:svg", "h2")
    // let svg = d3.select(id).select("svg")
    // select(id).append("svg:svg", "h2")
    let svg = d3.select(id).select("svg").append("svg:svg", "h3");
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("viewBox", [0, 0, width, height])
    //   .style("overflow", "visible")
    //   .style("display", "block");
  
    let tickAdjust = g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
    let x;
  
    // Continuous
    if (color.interpolate) {
      const n = Math.min(color.domain().length, color.range().length);
  
      x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));
  
      svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
    }
  
    // Sequential
    else if (color.interpolator) {
      x = Object.assign(color.copy()
        .interpolator(d3.interpolateRound(marginLeft+140, width+140 - marginRight)), {
          range() {
            return [marginLeft+140, width - marginRight+140];
          }
        });
  
      svg.append("image")
        .attr("x", marginLeft+140)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.interpolator()).toDataURL());
  
      // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
      if (!x.ticks) {
        if (tickValues === undefined) {
          const n = Math.round(ticks + 1);
          tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
        }
        if (typeof tickFormat !== "function") {
          tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
        }
      }
    }
  
    // Threshold
    else if (color.invertExtent) {
      const thresholds = color.thresholds ? color.thresholds() // scaleQuantize
        :
        color.quantiles ? color.quantiles() // scaleQuantile
        :
        color.domain(); // scaleThreshold
  
      const thresholdFormat = tickFormat === undefined ? d => d :
        typeof tickFormat === "string" ? d3.format(tickFormat) :
        tickFormat;
  
      x = d3.scaleLinear()
        .domain([-1, color.range().length - 1])
        .rangeRound([marginLeft, width - marginRight]);
  
      svg.append("g")
        .selectAll("rect")
        .data(color.range())
        .join("rect")
        .attr("x", (d, i) => x(i - 1))
        .attr("y", marginTop)
        .attr("width", (d, i) => x(i) - x(i - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", d => d);
  
      tickValues = d3.range(thresholds.length);
      tickFormat = i => thresholdFormat(thresholds[i], i);
    }
  
    // Ordinal
    else {
      x = d3.scaleBand()
        .domain(color.domain())
        .rangeRound([marginLeft, width - marginRight]);
  
      svg.append("g")
        .selectAll("rect")
        .data(color.domain())
        .join("rect")
        .attr("x", x)
        .attr("y", marginTop)
        .attr("width", Math.max(0, x.bandwidth() - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", color);
  
      tickAdjust = () => {};
    }
  
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues))
      .call(tickAdjust)
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", marginLeft+140)
        .attr("y", marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(title));
  
    return svg.node();
  }
  
  function ramp(color, n = 256) {
    var canvas = document.createElement('canvas');
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }