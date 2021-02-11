import React, {useRef, useEffect, useState} from 'react';
import {select} from "d3";
import useResizeObserver from "./useResizeObserver";
import GroupBy from "./GroupBy";
import * as d3 from "d3";

//maybe axis: month day time location

function ParallelCoordChart({data}){

    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    //console.log(data);
    var dateParse = d3.timeParse("%m/%d/%Y %H:%M:%S %p");

    // let temp1 = dateParse('01/29/2017 12:00:00 AM');
    // console.log(temp1);
    // console.log(temp1.getMonth()+1,temp1.getYear()+1900,temp1.getHours());
    

    //called initially and then for each data update
    useEffect(() => {
        const svg = select(svgRef.current);

        //data filtering
        d3.csv(data)
        .then(csv => {
          // create data by selecting two columns from csv 
          var filterdata = csv.map(row => {
              return {
              cDate: dateParse(row['Date']),
              District: row['PdDistrict'],
              Category: row['Category'],
              Resolution: row['Resolution'],
              Month: dateParse(row['Date']).getMonth()+1,
              DayOfWeek: row['DayOfWeek'],
              Time: row['Time']
              }
          })

          //use dimensions otherwise fallback to boundingClientRect dom element
          const{width, height} = 
            dimensions || wrapperRef.current.getBoundingClientRect();

        // set the dimensions and margins of the graph
        //var margin = {top: 30, right: 10, bottom: 10, left: 10};//,
            // width = 960 - margin.left - margin.right,
            // height = 500 - margin.top - margin.bottom;

        

        // var svg = d3.select("body").append("svg")
        //     .attr("width", width + margin.left + margin.right)
        //     .attr("height", height + margin.top + margin.bottom)
        // .append("g")
        //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            //("Category" || "Resolution" || "DayOfWeek" || "Time" || "PdDistrict")
        //hard coded axis values since not all scale linear with number
        var dimensionsN = [
            {
                item: "District",
                scale: d3.scalePoint().range([0,height]),
                type: "string"
            },
            {
                item: "Month",
                scale: d3.scaleLinear().range([height,0]),
                type: "number"
            },
            {
                item: "DayOfWeek",
                scale: d3.scalePoint().range([height,0]),
                type: "string"
            },
            {
                item: "Category",
                scale: d3.scalePoint().range([0,height]),
                type: "string"
            },
            {
                item: "Resolution",
                scale: d3.scalePoint().range([height,0]),
                type: "string"
            },
            // {
            //     item: "Time",
            //     scale: d3.scaleTime(),
            //     type: "string"
            // }
        ];

        var x = d3.scalePoint().domain(dimensionsN.map(function(d) {return d.item;})).range([0, width]);//,
        //     y = {},
        //     dragging = {};

        // var line = d3.line(),
        //     axis = d3.axisLeft(),
        //     background,
        //     foreground;

        var line = d3.line()
            .defined(function(d) { return !isNaN(d[1]); });
        
        var yAxis = d3.axisLeft();
        // Extract the list of dimensions and create a scale for each.
        // x.domain( dimensionsN = Object.keys(filterdata[0]).filter(function(d) {
        //     return d !== "cDate" && (y[d] = d3.scaleBand() //exclude date
        //         .domain(d3.extent(filterdata, function(p) { return +p[d]; }))
        //         .range([height, 0]));
        // }));

        //console.log(dimensionsN);

        // Add grey background lines for context.
        // background = svg.append("g")
        //     .attr("class", "background")
        //     .selectAll("path")
        //     .data(filterdata)
        //     .enter().append("path")
        //     .attr("d", path);

        // // Add blue foreground lines for focus.
        // foreground = svg.append("g")
        //     .attr("class", "foreground")
        //     .selectAll("path")
        //     .data(filterdata)
        //     .enter().append("path")
        //     .attr("d", path);

        // // Add a group element for each dimension.
        // var g = svg.selectAll(".dimension")
        //     .data(dimensionsN)
        //     .enter().append("g")
        //     .attr("class", "dimension")
        //     .attr("transform", function(d) { return "translate(" + x(d.name) + ")"; })
        //     .call(d3.drag()
        //         .subject(function(d) { return {x: x(d)}; })
        //         .on("start", function(d) {
        //         dragging[d] = x(d);
        //         background.attr("visibility", "hidden");
        //         })
        //         .on("drag", function(d) {
        //         dragging[d] = function(event,d) {Math.min(width, Math.max(0, event.x))};
        //         foreground.attr("d", path);
        //         dimensionsN.sort(function(a, b) { return position(a) - position(b); });
        //         x.domain(dimensionsN);
        //         g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
        //         })
        //         .on("end", function(d) {
        //         delete dragging[d];
        //         transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
        //         transition(foreground).attr("d", path);
        //         background
        //             .attr("d", path)
        //             .transition()
        //             .delay(500)
        //             .duration(0)
        //             .attr("visibility", null);
        //         }));

        var dimension = svg.selectAll(".dimension")
            .data(dimensionsN)
            .enter().append("g")
            .attr("class", "gdimension")
            .attr("transform", function(d) { return "translate(" + x(d.item) +    ")"; });
            
        dimensionsN.forEach(function(dimension) {
            dimension.scale.domain(dimension.type === "number"
                ? d3.extent(filterdata, function(d) { return +d[dimension.item]; })
                : filterdata.map(function(d) { return d[dimension.item]; }).sort());
            });

        svg.append("g")
            .attr("class", "background")
            .selectAll("path")
            .data(filterdata)
            .enter().append("path")
            .attr("d", draw);
      
        svg.append("g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(filterdata)
            .enter().append("path")
            .attr("d", draw);

        dimension.append("g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(yAxis.scale(d.scale)); })
            .append("text")
            .attr("class", "title")
            .attr("text-anchor", "middle")
            .attr("y", -9)
            .text(function(d) { return d.item; });

        function draw(d) {
            return line(dimensionsN.map(function(dimension) {
                return [x(dimension.item), dimension.scale(d[dimension.item])];
            }));
        }

        // Add an axis and title.
        // g.append("g")
        //     .attr("class", "axis")
        //     .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
        //     .append("text")
        //     .style("text-anchor", "middle")
        //     .attr("y", -9)
        //     .text(function(d) { return d; });

        // // Add and store a brush for each axis.
        // g.append("g")
        //     .attr("class", "brush")
        //     // .each(function(event, d) {
        //     //     d3.select(this).call(y[d].brush = d3.brushY(y[d]).on("brushstart", brushstart(event)).on("brush", brush));
        //     // })
        //     .selectAll("rect")
        //     .attr("x", -8)
        //     .attr("width", 16);

        // function position(d) {
        //     var v = dragging[d];
        //     return v == null ? x(d) : v;
        //     }
    
        //     function transition(g) {
        //     return g.transition().duration(500);
        //     }
    
        //     // Returns the path for a given data point.
        //     function path(d) {
        //     return line(dimensionsN.map(function(p) { return [position(p), y[p](d[p])]; }));
        //     }
    
        //     function brushstart(event) {
        //        event.sourceEvent.stopPropagation();
        //     }
    
        //     // Handles a brush event, toggling the display of foreground lines.
        //     function brush() {
        //     var actives = dimensionsN.filter(function(p) { return !y[p].brush.empty(); }),
        //         extents = actives.map(function(p) { return y[p].brush.extent(); });
        //     foreground.style("display", function(d) {
        //         return actives.every(function(p, i) {
        //         return extents[i][0] <= d[p] && d[p] <= extents[i][1];
        //         }) ? null : "none";
        //     });
        //     }
        });

        

    }, [data, dimensions, dateParse]); //dependencies

    return (
        //reference wrapperRef for dimensions of div
        <div ref={wrapperRef} style={{ marginBottom: "2rem"}}> 
            <svg ref={svgRef}></svg>
        </div>
    );

}

export default ParallelCoordChart;