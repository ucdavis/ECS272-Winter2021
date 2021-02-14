import React, {useRef, useEffect, useState} from "react";
import * as d3 from "d3";
import {select, line, curveCardinal, axisBottom, axisLeft} from "d3";
import useResizeObserver from "./useResizeObserver";
import GroupBy from "./GroupBy";

/* code adapted from "The Muratorium" d3 react Youtube tutorials */

/* NOT IMPLEMENTED YET*/


function StackedAreaChart({data}){
    const svgRef = useRef(); //reference object hook that can be passed to d3
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    
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
             .x(d => xScale(d.Month)) //offset by 55 why?
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
             .attr('r',1.5)
             .attr('cy', (d) => yScale(d.cSum)) //since this is a vertical bar chart we start the bottom of the bars at the bottom of the chart
             .attr('cx', (d) => xScale(d.Month)) // bar x position 
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
                     
   
            
        })
    }, [data, dateParse, dimensions]); //dependencies

    return (
        //reference wrapperRef for dimensions of div, svg-dom element
        <div ref={wrapperRef} style={{ marginBottom: "2rem"}}> 
            <svg ref={svgRef}>
                <g className="x-axis" />
                <g className="y-axis" />  
            </svg> 
        </div>
    );

}

export default StackedAreaChart;