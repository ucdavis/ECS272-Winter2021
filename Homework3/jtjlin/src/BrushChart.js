import React, {useRef, useEffect, useState} from "react";
import * as d3 from "d3";
import {select, line, curveCardinal, axisBottom, axisLeft} from "d3";
import useResizeObserver from "./useResizeObserver";
import GroupBy from "./GroupBy";
import CheckPreviousState from "./CheckPreviousState.js";

/* code adapted from https://observablehq.com/@d3/zoomable-scatterplot?collection=@d3/d3-zoom*/


function BrushChart({data}){
    const svgRef = useRef(); //reference object hook that can be passed to d3
    const wrapperRef = useRef();
    //const dimensions = useResizeObserver(wrapperRef);
    
    const [selection, setSelection] = useState([1,2]) // default selection of brush
    const previousSelection = CheckPreviousState(selection);
    
    var dateParse = d3.timeParse("%m/%d/%Y %H:%M:%S %p");
 
    useEffect(() => { //hook that gets triggered everytime elements change 
        //data filtering
        d3.csv(data)
        .then(csv => {
            // create data by selecting two columns from csv 
            var filterdata = csv.map(row => {
                return {
                xCoord: Number(row['X']),
                yCoord: Number(row['Y']),
                district: row['PdDistrict'],
                //Category: row['Category'],
                //cDate: dateParse(row['Date']),
                //cMonth: dateParse(row['Date']).getMonth()+1
                }
            })

            filterdata = Object.keys(filterdata).map((key) => [filterdata[key]]);//convert from object array to array
            //filterdata.splice(-1,1) //get rid of outlier data point with no district name attached. returns array from (starting index, ending index)
            //console.log(filterdata);
            
            //filterdata = [[0, 0, 1],[50, 50, 2]];
            //console.log(filterdata);

            //use dimensions otherwise fallback to boundingClientRect dom element
            // const{width, height} = 
            // dimensions || wrapperRef.current.getBoundingClientRect(); 
            let height = 750
            let width = 750  

            const svg = select(svgRef.current); //pass svg element to d3

            const zoom = d3.zoom()
                .scaleExtent([0.5, 32])
                .on("zoom", zoomed);
   
            let k = height / width

            let x = d3.scaleLinear()
                .domain([-123, -122])
                .range([0, width])
            let y = d3.scaleLinear()
                .domain([37 * k, 38 * k])
                .range([height, 0])

            let z = d3.scaleOrdinal()
                .domain(filterdata.map(d => d.district))
                .range(d3.schemeCategory10)

            let xAxis = (g, x) => g
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisTop(x).ticks(12))
                .call(g => g.select(".domain").attr("display", "none"))

            let yAxis = (g, y) => g
                .call(d3.axisRight(y).ticks(12 * k))
                .call(g => g.select(".domain").attr("display", "none"))
            
            let grid = (g, x, y) => g
                .attr("stroke", "currentColor")
                .attr("stroke-opacity", 0.1)
                .call(g => g
                  .selectAll(".x")
                  .data(x.ticks(12))
                  .join(
                    enter => enter.append("line").attr("class", "x").attr("y2", height),
                    update => update,
                    exit => exit.remove()
                  )
                    .attr("x1", d => 0.5 + x(d))
                    .attr("x2", d => 0.5 + x(d)))
                .call(g => g
                  .selectAll(".y")
                  .data(y.ticks(12 * k))
                  .join(
                    enter => enter.append("line").attr("class", "y").attr("x2", width),
                    update => update,
                    exit => exit.remove()
                  )
                    .attr("y1", d => 0.5 + y(d))
                    .attr("y2", d => 0.5 + y(d)));

            const gGrid = svg.append("g");

            const gDot = svg.append("g")
                .attr("fill", "none")
                .attr("stroke-linecap", "round");

            //console.log(filterdata);
            gDot.selectAll("path")
                .data(filterdata)
                .join("path")
                .attr("d", d => `M${x(d.xCoord)},${y(d.yCoord)}h0`)
                //.attr("stroke", d => z(d.district));

            const gx = svg.append("g");

            const gy = svg.append("g");

            svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

            function zoomed({transform}) {
                const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
                const zy = transform.rescaleY(y).interpolate(d3.interpolateRound);
                gDot.attr("transform", transform).attr("stroke-width", 5 / transform.k);
                gx.call(xAxis, zx);
                gy.call(yAxis, zy);
                gGrid.call(grid, zx, zy);
            }
     
        })
    }, [data, dateParse]); //dependencies

    return (
        //reference wrapperRef for dimensions of div, svg-dom element
        <div ref={wrapperRef} style={{ marginBottom: "2rem"}}> 
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" /> 
                <g className="brush" />  
            </svg> 
        </div>
    );

}

export default BrushChart;