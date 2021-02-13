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
    const [selectedDistrictCrime, setSelectedDistrictCrime] = useState(null);
    //console.log(data);
    var dateParse = d3.timeParse("%m/%d/%Y %H:%M:%S %p");

    // let temp1 = dateParse('01/29/2017 12:00:00 AM');
    // console.log(temp1);
    // console.log(temp1.getMonth()+1,temp1.getYear()+1900,temp1.getHours());
    

    //called initially and then for each data update
    useEffect(() => {
        const svg = select(svgRef.current);
        var lowColor = '#ccc'
        var highColor = 'red'

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

          var sortedata = GroupBy(filterdata,"district");

          
          var plotdata = Object.values(sortedata).map((row,index) => {
            return {
                District: Object.keys(sortedata)[index],
                TotCrime: row.length
            }
          })
          plotdata.splice(-1,1) // get rid of outlier data point  (last array entry)
          //console.log(plotdata);

          sortedata = Object.keys(sortedata).map((key) => [(key), sortedata[key]]);//convert from object array to array
          sortedata.splice(-1,1) //get rid of outlier data point with no district name attached. returns array from (starting index, ending index)

          // console.log(sortedata)
          // console.log(sortedata[0][0]);
          // console.log(mapData.features);
          // console.log(mapData.features.length);
          // console.log(mapData.features[0].properties.DISTRICT);

          for(var i = 0; i < mapData.features.length; i++){
            var checkDistrict = mapData.features[i].properties.DISTRICT;
            for(var j = 0; j < sortedata.length; j++){
              if(sortedata[j][0] === checkDistrict){
                mapData.features[i].properties['INCIDENTS'] = sortedata[j][1];
                mapData.features[i].properties['TOTALCRIME'] = plotdata[j].TotCrime;
                break; //break after found
              }
            }
            
          }

          console.log(mapData.features);
          //console.log(mapData.features.map (function(e) {  return e.properties.TOTALCRIME;}));


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
                  .attr("y", pointer[1] - 20);
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
            
      });
    }, [mapData, pdData, dimensions, dateParse, selectedDistrict, selectedDistrictCrime]); //dependencies

    return (
        //reference wrapperRef for dimensions of div
        <div ref={wrapperRef} style={{ marginBottom: "2rem"}}> 
            <svg ref={svgRef}></svg>
        </div>
    );

}

export default GeoChart;