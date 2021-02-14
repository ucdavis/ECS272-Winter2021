import React, {useRef, useEffect, useState} from 'react';
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


function GeoChart({mapData}){
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedDistrictCrime, setSelectedDistrictCrime] = useState(null);
    //console.log(data);


    //called initially and then for each data update
    useEffect(() => {
      //use dimensions otherwise fallback to boundingClientRect dom element
      const{width, height} = 
        dimensions || wrapperRef.current.getBoundingClientRect();

      const svg = select(svgRef.current);

      const minProp = d3.min(mapData.features.map(function (e) {return e.properties.TOTALCRIME;}));
      const maxProp = d3.max(mapData.features.map(function (e) {return e.properties.TOTALCRIME;}));
      
      
      function get_color(v) {
        const r = 255;
        const g = 16;
        const b = 16;
        const a = 3*v/4 + 0.25;
        return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
      }

      //project to 2d plane using geoMercator function
      let projection = d3.geoMercator().fitSize([width, height], mapData).precision(100);
      //path generator that the function returns, transform json to d attribute of path element
      let pathGenerator = d3.geoPath().projection(projection);
      let label = svg.selectAll(".label")
        .data([selectedDistrict])
        .join("text")
        .attr("class", "label")                    
        .style("text-anchor", "middle");
      const map = svg.selectAll(".district") //select all existing elements with class name neighborhood/district
        .data(mapData.features) //map to Features array in json
        .join("path") //draw a path for every new piece of data
        .on("mouseover", feature => {
            //if selected district is already selected set selected to null.
            setSelectedDistrict(feature.target["__data__"].properties.DISTRICT);
            //setSelectedDistrict(selectedDistrict === feature.target["__data__"].properties.DISTRICT);
            setSelectedDistrictCrime(feature.target["__data__"].properties.TOTALCRIME);
            const pointer = d3.pointer(feature, svg.node());
            //render text element of district name and stats
            label.text(selectedDistrict + " District Crimes Reported: " + selectedDistrictCrime)
              .attr("x", pointer[0])
              .attr("y", pointer[1] - 20)
              .transition()
              .delay(1000);
        })
        .on('mouseleave', function (e) {
          if (label)
            label.text('');
        })
        .attr("class", "district") //attach class name neighborhood to each
        //.transition()
        .attr("fill", feature => {
            // colorScale(feature.properties.TOTALCRIME);
            // console.log(feature.properties);
            const v = (feature.properties.TOTALCRIME - minProp) / maxProp;
            const color = get_color(v);
            //console.log(color);
            return color;
        })
        .attr("d", feature => pathGenerator(feature));//define callback function that receives current feature from features array and pass to path gen and return appropriate d
      const zoom = 2;
      let zoom_in = true;
      map.on("click", feature => {
        const pointer = d3.pointer(feature, svg.node());
        //console.log(pointer);

        if (zoom_in) {
            projection = d3.geoMercator().fitSize([width*zoom, height*zoom], mapData).precision(100);
            pathGenerator = d3.geoPath().projection(projection);
            const x = -pointer[0];
            const y = -pointer[1];
            map.attr('transform', 'translate(' + x + ',' + y + ')');
            map.attr("d", feature => pathGenerator(feature));
            zoom_in = false;
        }
        else {
            projection = d3.geoMercator().fitSize([width, height], mapData).precision(100);
            pathGenerator = d3.geoPath().projection(projection);
            map.attr('transform', 'translate(' + 0 + ',' + 0 + ')');
            map.attr("d", feature => pathGenerator(feature));
            zoom_in = true;
        }
      });   
    }, [mapData, dimensions, selectedDistrict, selectedDistrictCrime]); //dependencies

    return (
        //reference wrapperRef for dimensions of div
        <div ref={wrapperRef} style={{ marginBottom: "2rem"}}> 
            <svg ref={svgRef}></svg>
        </div>
    );

}

export default GeoChart;