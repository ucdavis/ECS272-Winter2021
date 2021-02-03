import React, {useRef, useEffect, useState} from "react";
import * as d3 from "d3";
import {select, line, curveCardinal, axisBottom, axisLeft} from "d3";
import useResizeObserver from "./useResizeObserver";
import GroupBy from "./GroupBy";
import CheckPreviousState from "./CheckPreviousState.js";

/* code adapted from "The Muratorium" d3 react Youtube tutorials */


function BrushChart({data}){
    const svgRef = useRef(); //reference object hook that can be passed to d3
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
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
                Category: row['Category'],
                cDate: dateParse(row['Date']),
                cMonth: dateParse(row['Date']).getMonth()+1
                }
            })
            //console.log(csv);
            const sortedata = GroupBy(filterdata,"cMonth");
            //console.log(sortedata);
            //console.log(Object.values(sortedata));

            const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                        ];

            var plotdata = Object.values(sortedata).map((row, index) => {
                return {
                    Month: Number(index+1),
                    Monthname: monthNames[index],
                    cSum: row.length
                }
            })
            //console.log(plotdata);

            //if have more time add more points - get actual dates

            //use dimensions otherwise fallback to boundingClientRect dom element
            const{width, height} = 
            dimensions || wrapperRef.current.getBoundingClientRect();   

            const svg = select(svgRef.current); //pass svg element to d3

            //setup scales - transforms input value into visual representation
            // const xScale = d3.scaleBand()
            //  .domain(plotdata.map(d => d.Monthname))
            //  .rangeRound([0, width]);

            const xScale = d3.scaleLinear()
             .domain([d3.min(plotdata, d => d.Month),d3.max(plotdata, d => d.Month)])
             .rangeRound([0, width]);

            const yScale = d3.scaleLinear()
             .domain([d3.min(plotdata, d => d.cSum)-100,d3.max(plotdata, d => d.cSum)+100])
             .range([height, 0]);


            var lineGenerator = line() //where to render each dot on line
             .x(d => xScale(d.Month)+55) //offset by 55 why?
             .y(d => yScale(d.cSum))
             .curve(curveCardinal);

            // svg.append("path")
            //  .datum(plotdata) // 10. Binds data to the line 
            //  .attr("fill", "none")
            //  .attr("stroke", "steelblue")
            //  .attr("stroke-width", 1.5)
            //  .attr("stroke-linejoin", "round")
            //  .attr("stroke-linecap", "round")
            //  .attr("d", myLine); // 11. Calls the line generator             

            //attach d attribute to each path element, need to wrap data array in [] because want 1 path for whole array
            svg.selectAll(".myLine") //synch with all data elements
             .data([plotdata])
             //.datum(plotdata)
             .join("path")
             .attr("class", "myLine")
             .attr("stroke", "steelblue")
             .attr("stroke-width", 1.5)
             .attr("stroke-linejoin", "round")
             .attr("stroke-linecap", "round")
             .attr("fill", "none")
             .attr("d", lineGenerator); // call line generator


            svg.selectAll(".myDot") //Selects all defined elements in the DOM and hands off a reference to the next step in the chain.
             .data(plotdata) //connect chart data with DOM <rect/> elements
             .join("circle") // appends a new SVG rect element for each element in our chartdata array.
             .attr("class", "myDot")
             .attr('r', (value, index) => index >= selection[0] && index <= selection[1] ? 4 : 2)
             .attr('fill', (value, index) => index >= selection[0] && index <= selection[1] ? "orange" : "blue")
             .attr('cy', (d) => yScale(d.cSum)) //since this is a vertical bar chart we start the bottom of the bars at the bottom of the chart
             .attr('cx', (d) => xScale(d.Month)+55) // bar x position 
             .attr("fill","blue"); // color of the bar

            // x and y axis
            const xAxis = axisBottom(xScale); // call xaxis function with current svg selection
            svg.select(".x-axis")
            .style("transform", `translateY(750px)`)
            .call(xAxis);

            const yAxis = axisLeft(yScale);
            svg.select(".y-axis")
            .style("transform", "translateX(0px)")
            .call(yAxis);
                     
            //brush along x-axis
            const brush = d3.brushX()
             .extent([[0,0], [width, height]]) // brush can move from top left corner to bottom right corner of svg (whole area)
             .on("start brush end", (event) => {
                 if(event.selection){
                    const indexSelection = event.selection.map(xScale.invert) //selection of the brush in event object from d3 using d3 inverting pixel value back to index
                    setSelection(indexSelection);
                }
                 

             })

             if(previousSelection === selection){ //if previous selection is the same as current one
                svg.select(".brush")
                .call(brush);
                //.call(brush.move, selection.map(xScale)); //starting default position and selection
             }
            
        })
    }, [data, dateParse, dimensions]); //dependencies

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