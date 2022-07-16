import React, {Component} from 'react';
import ccodes from  '../datasets/COW country codes.csv';
import MIDB from '../datasets/MIDB 5.0.csv';
import mil from  '../datasets/Military_expenditure.csv';
import allyDB from '../datasets/alliance_v4.1_by_member.csv';
import * as d3 from "d3";

class Threat_chart extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
      // load json file for the map
      const topojson_countries = require('../datasets/countries-110m.json');
      
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
                    if (disp.ccode == ccode && disp.styear > 1990){   // filter disputes after 1990
                      sel_disp.push(disp.dispnum)
                    }
                  })

                  // get ccodes of hostile countries
                  var threats = new Set()
                  disputes.forEach(disp =>{
                    if (sel_disp.includes(disp.dispnum) && disp.ccode != ccode){
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

                      // search alliance dataset
                      d3.csv(allyDB)
                      .then(csv =>{
                        // select meaningful columns
                        var allianceDB_raw = csv.map(row => {
                          return {
                            allyID: Number(row['version4id']),
                            ccode: Number(row['ccode']),
                            styear: Number(row['all_st_year']),
                            type: String(row['ss_type']),
                            endyear: Number(row['all_end_year'])
                          }
                        });

                        function filter_effective(array) {
                          var effectives = array.filter(alliance => alliance.endyear == "")
                          var mutual_defense = effectives.filter(alliance => alliance.type == "Type I: Defense Pact" || alliance.type == "Type III: Entente")
                          return mutual_defense;
                          }
                        
                        // filter still effective and about mutual defense alliances
                        var allianceDB_dup = filter_effective(allianceDB_raw);
                        
                        // remove duplicate data
                        var allianceDB = allianceDB_dup.reduce((unique, o) => {
                          if(!unique.some(obj => obj.allyID === o.allyID && obj.ccode === o.ccode)) {
                            unique.push(o);
                          }
                          return unique;
                        },[]);

                        console.log(allianceDB)
                        
                        // get alliances of selected country
                        var sel_alli = [];

                        allianceDB.forEach(alli => {
                          if (alli.ccode == ccode){
                            sel_alli.push(alli.allyID)
                          }
                        })

                        console.log(sel_alli)

                        // get ccode of allied countries
                        var alliances = new Set();
                        allianceDB.forEach(alli => {
                          if (sel_alli.includes(alli.allyID) && alli.ccode != ccode){
                            alliances.add(alli.ccode)
                          }  
                        })

                        console.log(alliances)

                        var alli_list = []
                        // for each allied country
                        alliances.forEach(country =>{
                          // map ccode to name
                          codemap.forEach(cd => {
                            if (country == cd.code){
                              // get name
                              entire_mil_exp.forEach(dat =>{
                                if (dat.name == cd.name) {
                                  // add item to allies
                                  alli_list.push({
                                    threat: 0,
                                    name: cd.name
                                  })  
                                }
                              })
                            }
                          })
                        })  

                        console.log(alli_list)
                        // for each threat country
                        threats.forEach(country =>{                        
                          // map ccode to name
                          codemap.forEach(cd => {
                            if (country == cd.code){
                              // get military expenditure
                              entire_mil_exp.forEach(dat =>{
                                var hostile = true 
                                alli_list.forEach(friendly => {
                                  // don't add friendly countries to threats
                                  if (Object.values(friendly).includes(dat.name)){ 
                                    hostile = false
                                  }
                                })
                                if (dat.name == cd.name && hostile) {
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
                                            
                        // draw background circles
                        svg.append("g")
                            .attr("stroke", "#ccc")
                          .selectAll("circle")
                          .data(root.descendants().filter(d => d.height === 1))
                          .join("circle")
                            .attr("cx", d => d.x)
                            .attr("cy", d => d.y)
                            .attr("r", d => d.r)
                            .attr("fill", d => cc_colors[d.data.children[0].threat+2]);

                        // put packed circles
                        svg.append("g")
                          .selectAll("circle")
                          .data(root.leaves())
                          .join("circle")
                            .attr("cx", d => d.x)
                            .attr("cy", d => d.y)
                            .attr("r", d => d.r)
                            .attr("fill", d => cc_colors[d.data.threat])
                          .append("title")
                            .text(d => `${d.data.name} \n${d.data.value.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                            })}`)         

                        console.log(root.descendants())

                        console.log(chartData)
                      })
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
        
        //remove previous circles
        d3.selectAll("circle").remove();
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

export default Threat_chart;