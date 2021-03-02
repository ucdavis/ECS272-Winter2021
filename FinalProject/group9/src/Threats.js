import React, {Component} from 'react';
import ccodes from  './datasets/COW country codes.csv';
import MIDB from './datasets/MIDB 5.0.csv';
import mil from  './datasets/Military_expenditure.csv';
import * as d3 from "d3";

class Threats extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
      // load json file for the map
      const topojson_countries = require('./datasets/countries-110m.json');
      
      const topojson = require("topojson");
      const countries_objects = topojson.feature(topojson_countries, topojson_countries.objects.countries);
      const countries = topojson.feature(topojson_countries, topojson_countries.objects.countries).features;
      const mesh_countries = topojson.mesh(topojson_countries, topojson_countries.objects.countries, function(a, b) { return a !== b; });

      // size of view box
      const dimensions = ({
        width: 600,
        height: 400,
        margin: 50,
      })

      // map color
      const colors = ({
        stroke_color: "white",
        active_color: "#2c4566",
        inactive_color: "#9daabd",
        background_color: "#e4e9f0",
        tooltip_color: "#21334f",
        tooltip_background: "rgba(237, 244, 255, 0.7)"
      })

      // packed circle color
      const cc_colors = ["#004ecc", "#c90000", "#c7c9ff", "#ffa8a8"]  // friendly, hostile, friedly_background, hostile_background

      // size
      const size = ({
        width: 300,
        height: 200
      })

      // Visualize world map
      var svg = d3.select('#container')
        .append('svg')
          .attr("viewBox", [0, 0, dimensions.width, dimensions.height])
          .attr("class", "globe")
          .on("click", reset);

      svg.append("rect")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .attr("fill", colors.background_color);

      var projectionMercator = d3.geoEquirectangular()
                                .translate([dimensions.width / 2, dimensions.height / 2])
                                .rotate([0, 0])
                                .fitSize([dimensions.width, dimensions.height], countries_objects);
                                  // note: use topojson objects (w/ type: FeatureCollection) to fitsize
      
      var geoMercator = d3.geoMercator()
                          .center([0, 0])
                          .fitSize([dimensions.width, dimensions.height], countries);

      var path = d3.geoPath()
                    .projection(projectionMercator);
      
      const zoom = d3.zoom()
                      .scaleExtent([1, 10])
                      .on("zoom", zoomed);
    
      var g = svg.append("g");

      var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
    
      g.selectAll("path")
        .data(countries)
        .enter().append("path")
        .attr("d", path)
        .style("fill", colors.inactive_color)
        .attr("class", "country")
        .on("click", clicked)
        .on('mouseenter', function(event, d) { 
          d3.select(this)
            .transition()
            .delay(100)
            .style("fill", colors.active_color);
          tooltip.html(
              `<div><strong> ${d.properties.name}</strong></div>`)
                .style('visibility', 'visible');
        })
        .on('mouseleave', function(d) { 
          d3.select(this)
            .transition()
            .delay(100)
            .style("fill", colors.inactive_color);
          tooltip.html(``).style('visibility', 'hidden');
        })     
        .on('mousemove', function (event, d) {
              tooltip
                .style('top', event.pageY - 10 + 'px')
                .style('left', event.pageX + 10 + 'px');
        });
      
        g.append("path")
          .data(mesh_countries)
          .attr("class", "mesh")
          .attr('stroke-linejoin', 'round')
          .style("stroke", colors.stroke_color)
          .style("stroke-width", "1px")
          .attr("d", path);
    
      svg.call(zoom);

      function clicked(event, d) {
        const [[x0, y0], [x1, y1]] = path.bounds(d);
        event.stopPropagation();

        //remove previous circles
        d3.selectAll("circle").remove();

        var ccode = 0
        var found = false

        svg.transition().duration(750).call(
          zoom.transform,
          d3.zoomIdentity
            .translate(dimensions.width / 2, dimensions.height / 2)
            .scale(Math.min(3, 0.9 / Math.max((x1 - x0) / dimensions.width, (y1 - y0) / dimensions.height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        );

        /// start preprocessing ///
        // load ccodes data
        d3.csv(ccodes)
          .then(csv => {
            var codemap_dup = csv.map(row => {
              return {
                name: String(row['StateNme']),
                code: String(row['CCode'])
              }
              })
            
            // remove duplicate codes
            var codemap = codemap_dup.reduce((unique, o) => {
              if(!unique.some(obj => obj.name === o.name && obj.code === o.code)) {
                unique.push(o);
              }
              return unique;
            },[]);

            // find ccode of selected
            codemap.forEach(country =>{
              if (country.name === d.properties.name) {
                found = true
                ccode = country.code
              }
            })
            if (found){
              // search dispute dataset
              d3.csv(MIDB)
                .then(csv =>{

                  // select meaningful columns
                  var disputes = csv.map(row => {
                    return {
                      dispnum: Number(row['dispnum']),
                      ccode: Number(row['ccode']),
                      styear: Number(row['styear'])
                    }
                  })

                  // get disputes of the selected country
                  var sel_disp = []                  

                  disputes.forEach(disp => {
                    if (disp.ccode == ccode & disp.styear > 1990){   // filter disputes after 1990
                      sel_disp.push(disp.dispnum)
                    }
                  })

                  // get ccodes of hostile countries
                  var threats = new Set()
                  disputes.forEach(disp =>{
                    if (disp.dispnum in sel_disp){
                      threats.add(disp.ccode)
                    }
                  })

                  // get military expenditure of selected country and threats
                  d3.csv(mil)
                    .then(csv => {             
                      // create data by selecting two columns from csv 
                      var entire_mil_exp = csv.map(row => {
                        return {
                          name: String(row['Name']),
                          mil: Number(row['2018'])
                        }
                      })

                      var formattedData = []
                      // add the selected county itself to formatted data
                      codemap.forEach(cd => {
                        if (ccode == cd.code){
                          // get military expenditure
                          entire_mil_exp.forEach(dat =>{
                            if (dat.name == cd.name) {
                              // add item to chart data
                              formattedData.push({
                                threat: 0,   // not threat, that is, friendly
                                value: dat.mil,
                                name: cd.name
                              })  
                            }
                          })
                        }
                      })

                      // for each threat country
                      threats.forEach(country =>{
                        // map ccode to name
                        codemap.forEach(cd => {
                          if (country == cd.code){
                            // get military expenditure
                            entire_mil_exp.forEach(dat =>{
                              if (dat.name == cd.name) {
                                // add item to formatted data
                                formattedData.push({
                                  threat: 1,
                                  value: dat.mil,
                                  name: cd.name
                                })  
                              }
                            })
                          }
                        })
                      })

                      // convert to chart data format
                      var chartData = ({
                        children: Array.from(
                          d3.group(
                            formattedData,
                            d => d.threat
                          ),
                          ([, children]) => ({children})
                        )
                      })

                      // pack data
                      const root = d3.pack()
                        .size([size.width, size.height])
                        .padding(1)
                      (d3.hierarchy(chartData)
                        .sum(d => d.value))
                      
                      // append viewbox
                      var svg2 = d3.select("#focus")
                        .append("svg")
                        .attr("id", "packed")
                          .attr("viewBox", [0, 0, size.width, size.height])
                      
                      // draw background circles
                      svg2.append("g")
                          .attr("fill", "none")
                          .attr("stroke", "#ccc")
                        .selectAll("circle")
                        .data(root.descendants().filter(d => d.height === 1))
                        .join("circle")
                          .attr("cx", d => d.x)
                          .attr("cy", d => d.y)
                          .attr("r", d => d.r);
                      
                      // put packed circles
                      svg.append("g")
                        .selectAll("circle")
                        .data(root.leaves())
                        .join("circle")
                          .attr("cx", d => d.x)
                          .attr("cy", d => d.y)
                          .attr("r", d => d.r)
                          .attr("fill", d => cc_colors[d.data.threat]);


                      console.log(chartData)
                    })
                })
            } else {
              // print No data
            }
          })
      }
      
      function reset() {
        svg.transition().duration(750).call(
          zoom.transform,
          d3.zoomIdentity,
          d3.zoomTransform(svg.node()).invert([dimensions.width / 2, dimensions.height / 2])
        );
      }
      
      function zoomed(event) {
        const {transform} = event;
        g.attr("transform", transform);
        g.attr("stroke-width", 1 / transform.k);
      }
    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Threats;