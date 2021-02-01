import React, {useRef, useEffect} from "react";
import * as d3 from "d3";
import {select, line} from "d3";
import useResizeObserver from "./useResizeObserver";
import GroupBy from "./GroupBy";

/* code adapted from "The Muratorium" d3 react Youtube tutorials v=bPNkdoEqfVY */

function BrushChart({data}){
    const svgRef = useRef(); //reference object hook that can be passed to d3
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    d3.csv(data)
    .then(csv => {
        // create data by selecting two columns from csv 
        var data = csv.map(row => {
            return {
              xCoord: Number(row['X']),
              yCoord: Number(row['Y']),
              district: row['PdDistrict'],
              Category: row['Category'],
              cDate: row['Date']
            }
        })
        let sortedata = GroupBy(data,"district");
        console.log(sortedata);
    })


    useEffect(() => { //hook that gets triggered everytime elements change 
        const svg = select(svgRef.current); //pass svg element to d3
        
        const myLine = line() //where to render each dot on line
         .x((value, index) => index  *50)
         .y(value => value);

        //attach d attribute to each path element, need to wrap data array in [] because want 1 path for whole array
        svg.selectAll("path")
         .data([data])
         .join("path")
         .attr("d", value => myLine(value))
         .attr("fill", "none")
         .attr("stroke", "blue");

        //use dimensions otherwise fallback to boundingClientRect dom element
        const{width, height} = 
            dimensions || wrapperRef.current.getBoundingClientRect();

    }, [data]); //dependencies

    return (
        //reference wrapperRef for dimensions of div, svg-dom element
        <div ref={wrapperRef} style={{ marginBottom: "2rem"}}> 
            <svg ref={svgRef}></svg> 
        </div>
    );

}

export default BrushChart;