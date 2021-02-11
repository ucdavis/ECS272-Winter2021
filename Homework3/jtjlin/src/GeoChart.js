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


function GeoChart({mapData, pdData}){
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    //console.log(data);
    var dateParse = d3.timeParse("%m/%d/%Y %H:%M:%S %p");

    // let temp1 = dateParse('01/29/2017 12:00:00 AM');
    // console.log(temp1);
    // console.log(temp1.getMonth()+1,temp1.getYear()+1900,temp1.getHours());
    

    //called initially and then for each data update
    useEffect(() => {
        const svg = select(svgRef.current);

        //data filtering
        d3.csv(pdData)
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

          filterdata.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return (new Date(a.cDate) - new Date(b.cDate));
          });
          //console.log(filterdata);

          const sortedata = GroupBy(filterdata,"district");
          //console.log(sortedata);
          //console.log(Object.values(sortedata));

          var plotdata = Object.values(sortedata).map((row,index) => {
              return {
                  District: Object.keys(sortedata)[index],
                  TotCrime: row.length
              }
          })
          plotdata.splice(-1,1); // get rid of last array entry (extra)
          //console.log(plotdata);

          //use dimensions otherwise fallback to boundingClientRect dom element
          const{width, height} = 
            dimensions || wrapperRef.current.getBoundingClientRect();


          /* csv and code snippet from https://web.stanford.edu/class/archive/cs/cs448b/cs448b.1166/cgi-bin/wiki/index.php?title=Assignment_3:_Creating_Interactive_Visualization_Software */
          // // Set up projection that map is using
          // var projection = geoMercator()
          //     .center([-122.433701, 37.767683]) // San Francisco, roughly
          //     .scale(225000)
          //     .translate([width / 2, height / 2]);

          // // This is the mapping between <longitude, latitude> position to <x, y> pixel position on the map
          // // projection([lon, lat]) returns [x, y]
          // // projection.invert([x, y]) returns [lon, lat]

          // // Add svg map at correct size, assumes map is saved in a subdirectory called "data"
          // svg.append("image")
          //   .attr("width", width)
          //   .attr("height", height)
          //   .attr("xlink:href", "datasets/sf-map.svg");
          /********************************************************************************************************************* */

          //console.log(plotdata.map (function(e) {  return e.TotCrime;}));
          const minProp = min(plotdata.map (function(e) {  return e.TotCrime;}));
          const maxProp = max(plotdata.map (function(e) {  return e.TotCrime;}));
          console.log(plotdata)
          console.log(minProp,maxProp);
          const colorScale = d3.scaleLinear()
            .domain([minProp,maxProp])
            .range("#ccc","red")

          const projection = geoMercator().fitSize([width, height], mapData).precision(100); //project to 2d plane using geoMercator function
          const pathGenerator = geoPath().projection(projection) //path generator that the function returns, transform json to d attribute of path element
      
          svg.selectAll(".district") //select all existing elements with class name neighborhood/district
          .data(mapData.features) //map to Features array in json
          .join("path") //draw a path for every new piece of data
          .on("click", feature =>{
              setSelectedDistrict(selectedDistrict === feature ? null : feature); //if selected district is already selected set selected to null.
          })
          .attr("class", "district") //attach class name neighborhood to each
          .transition()
          //.attr("fill", "#ccc")
          .attr("fill",  (d) =>colorScale(d.TotCrime))
          .attr("d", feature => pathGenerator(feature)); //define callback function that receives current feature from features array and pass to path gen and return appropriate d

          //render text element of district name and stats
          svg.selectAll(".label")
            //.data([selectedDistrict])
            .data(plotdata)
            .join("text")
            .attr("class", "label")
            //.text(feature => feature.District.toLocaleString())
            .attr("x", 10)
            .attr("y", 25);

          // // add circles to svg
          // svg.selectAll("circle")
          //  .data([filterdata.xCoord,filterdata.yCoord]).enter //UNDEFINED DATA...
          //  .append("circle")
          //  .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
          //  .attr("cy", function (d) { return projection(d)[1]; })
          //  .attr("r", "8px")
          //  .attr("fill", "red");
            
        });
    }, [mapData, pdData, dimensions, dateParse, selectedDistrict]); //dependencies

    return (
        //reference wrapperRef for dimensions of div
        <div ref={wrapperRef} style={{ marginBottom: "2rem"}}> 
            <svg ref={svgRef}></svg>
        </div>
    );

}

export default GeoChart;