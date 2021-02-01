import React, {useRef, useEffect} from 'react';
import {select, geoPath, geoMercator, min, max} from "d3";
import useResizeObserver from "./useResizeObserver";
import GroupBy from "./GroupBy";
import * as d3 from "d3";
/* code adapted from "The Muratorium" d3 react Youtube tutorials v=gGORNzKIXL4 */


/* <Select
          value={property}
          onChange={event => setProperty(event.target.value)} //gives value of event
        >
          <option value="crime_est">Crimeval</option>
          <option value="placeholder">Placeholder</option>
        </Select> */
// updateChart = (e) => {
//     this.setState({id: e.target.value});
//     }


function GeoChart({mapData, pdData}){
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    //console.log(data);


    d3.csv(pdData)
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
    

    //called initially and then for each data update
    useEffect(() => {
        const svg = select(svgRef.current);
        

        //let groupedData = GroupBy(d3.csv(pdData),"Pd District");
        //console.log(groupedData);

        //use dimensions otherwise fallback to boundingClientRect dom element
        const{width, height} = 
            dimensions || wrapperRef.current.getBoundingClientRect();

        const projection = geoMercator().fitSize([width, height], mapData); //project to 2d plane using geoMercator function
        const pathGenerator = geoPath().projection(projection) //path generator that the function returns, transform json to d attribute of path element
    
        svg.selectAll(".district") //select all existing elements with class name neighborhood/district
         .data(mapData.features) //map to Features array in json
         .join("path") //draw a path for every new piece of data
         .attr("class", "district") //attach class name neighborhood to each
         .attr("d", feature => pathGenerator(feature)); //define callback function that receives current feature from features array and pass to path gen and return appropriate d
    
    }, [mapData, pdData, dimensions]); //dependencies

    return (
        //reference wrapperRef for dimensions of div
        <div ref={wrapperRef} style={{ marginBottom: "2rem"}}> 
            <svg ref={svgRef}></svg>
        </div>
    );

}

export default GeoChart;