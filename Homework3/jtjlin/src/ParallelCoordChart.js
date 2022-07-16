import React, {useRef, useEffect, useState} from 'react';
import {select} from "d3";
import useResizeObserver from "./useResizeObserver";
import GroupBy from "./GroupBy";
import * as d3 from "d3";


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


            filterdata.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return (new Date(a.cDate) - new Date(b.cDate));
            });
            //console.log(filterdata);

            var sortedata = GroupBy(filterdata,"District");
    
          
        //   var plotdata = Object.values(sortedata).map((row,index) => {
        //     return {
        //         District: Object.keys(sortedata)[index],
        //         TotCrime: row.length
        //     }
        //   })
        //   plotdata.splice(-1,1) // get rid of outlier data point  (last array entry)
        //   console.log(plotdata);
    
            sortedata = Object.keys(sortedata).map((key) => [(key), sortedata[key]]);//convert from object array to array
            sortedata.splice(-1,1) //get rid of outlier data point with no district name attached. returns array from (starting index, ending index)
            
            //console.log(sortedata)



            //use dimensions otherwise fallback to boundingClientRect dom element
            const{width, height} = 
            dimensions || wrapperRef.current.getBoundingClientRect();

            // set the dimensions and margins of the graph
            //var margin = {top: 30, right: 10, bottom: 10, left: 10};//,
                // width = 960 - margin.left - margin.right,
                // height = 500 - margin.top - margin.bottom;

        
            var dimensionsN = [
                // {
                //     item: "District",
                //     scale: d3.scalePoint().range([0,height]),
                //     type: "string"
                // },
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
            ];

            var x = d3.scalePoint().domain(dimensionsN.map(function(d) {return d.item;})).range([0, width]),
                dragging = {},
                background,
                foreground;

            var line = d3.line()
                .defined(function(d) { return !isNaN(d[1]); });

            var yAxis = d3.axisLeft();

            dimensionsN.forEach(function(dimension) {
                dimension.scale.domain(dimension.type === "number"
                    ? d3.extent(sortedata[0][1], function(d) { return +d[dimension.item]; })
                    : sortedata[0][1].map(function(d) { return d[dimension.item]; }).sort());
                });

            var dimension = svg.selectAll(".dimension")
                .data(dimensionsN)
                .enter().append("g")
                .attr("class", "gdimension")
                .attr("transform", function(d) { return "translate(" + x(d.item) +    ")"; });

            svg.append("g")
                .attr("class", "foreground")
                .selectAll("path")
                .data(sortedata[0][1])
                .enter().append("path")
                .attr("d", draw);

            function draw(d) {
                return line(dimensionsN.map(function(dimension) {
                    return [x(dimension.item), dimension.scale(d[dimension.item])];
                }));
            }

            //add axis and title
            dimension.append("g")
                .attr("class", "axis")
                .each(function(d) { d3.select(this).call(yAxis.scale(d.scale)); })
                .append("text")
                .attr("class", "title")
                .attr("text-anchor", "middle")
                .attr("y", -9)
                .text(function(d) { return d.item; });

             // //background lines
            // background = svg.append("g")
            //     .attr("class", "background")
            //     .selectAll("path")
            //     .data(sortedata[0][1])
            //     .enter().append("path")
            //     .attr("d", path);

            // //foreground lines
            // foreground = svg.append("g")
            //     .attr("class", "foreground")
            //     .selectAll("path")
            //     .data(sortedata[0][1])
            //     .enter().append("path")
            //     .attr("d", path);

            // var g = svg.selectAll(".dimension")
            //     .data(dimensionsN)
            //     .enter().append("g")
            //         .attr("class", "dimension")
            //         .attr("transform", function(d) { return "translate(" + x(d.item) + ")"; })
            //         .call(d3.drag()
            //             .subject(function(d) {return {x: x(d) };}) //return x value
            //             .on("start", (event, d) => {
            //                 dragging[d] = x(d);
            //                 background.attr("visibility", "hidden");
            //             })
            //             .on("drag", (event, d) => {
            //                 dragging[d] = 
            //                 Math.min(width, Math.max(0, event.x));
            //                 foreground.attr("d", path);
            //                 dimensionsN.sort(function(a, b) {return position(a) - position(b); }); //reorder axis
            //                 x.domain(dimensionsN);
            //                 g.attr("transform", function(d) {return "translate(" + position(d) + ")";})
            //             })
            //             .on("end", (event, d) => {
            //                 delete dragging[d];
            //                 transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
            //                 transition(foreground).attr("d", path);
            //                 background
            //                     .attr("d", path)
            //                     .transition()
            //                     .delay(450)
            //                     .duration(0)
            //                     .attr("visibility", null);
            //             }));

            //add, store brush per axis
            // g.append("g")
            //     .attr("class", "brush")
            //     .each(function(d){
            //         d3.select(this)
            //         .call(d.scale.brush = d3.brush()
            //         .yAxis(d.scale)
            //         //.on("brushstart", brushstart)
            //         .on("brush", brush));
            //     })
            //     .selectAll("rect")
            //         .attr("x", -8)
            //         .attr("width", 16); //dimensions of brush

            // //return path from selected data point
            // function path(d) {
            //     return line(dimensionsN.map(function(dimension) {
            //         return [position(dimension.item), dimension.scale(d[dimension.item])];
            //     }));
            // }

            // function position(d) {
            // var v = dragging[d];
            // return v === "undefined" ? x(d) : v;
            // }

            // function transition(g) {
            //     return g.transition().duration(500);
            // }


            // // function brushstart(){
            // //     d3.event.sourceEvent.stopPropagation();
            // // }
            // // Handles a brush event, toggling the display of foreground lines.
            // function brush() {
            // var actives = dimensionsN.filter(function(p) { return !p.scale.brush.empty(); }),
            //     extents = actives.map(function(p) { return p.scale.brush.extent(); });
            //     foreground.style("display", function(d) {
            //         return actives.every(function(p, i) {
            //         return extents[i][0] <= d[p.item] && d[p.item] <= extents[i][1];
            //         }) ? null : "none";
            //     });
            // }
            
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