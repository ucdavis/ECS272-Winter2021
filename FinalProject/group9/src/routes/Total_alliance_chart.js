import React, {Component} from 'react';
import ccodes from  '../datasets/COW country codes.csv';
import mil from  '../datasets/Military_expenditure.csv';
import allyDB from '../datasets/alliance_v4.1_by_member.csv';
import * as d3 from "d3";

class Total_alliance_chart extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
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

        // load military expenditure dataset
        d3.csv(mil)
        .then(csv => {             
          // create data by selecting two columns from csv 
          var entire_mil_exp = csv.map(row => {
            return {
              name: String(row['Name']),
              mil: Number(row['2018'])
            }
          })

          // load alliance dataset
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

            // get list of alliances
            var allianceList = new Set()
            allianceDB.forEach(alli => {
              allianceList.add(alli.allyID)
            })

            console.log(allianceList)

            var chartData = {
              name: "Global Cooperations",
              children: []
            }

            // for each alliance
            allianceList.forEach(alli => {
              var associated_countries = []
              // find countries match that alliance
              allianceDB.forEach(country => {
                if(country.allyID == alli){
                  codemap.forEach(cd =>{
                    // translate ccode of each country
                    if(country.ccode == cd.code){
                      // get military expenditure
                      entire_mil_exp.forEach(dat =>{
                        if (dat.name == cd.name) {
                          // add item to buffer
                          associated_countries.push({
                            name: cd.name,
                            value: dat.mil
                          }) 
                        }
                      })
                    }
                  })
                }
              })
              // if each alliance has information of at least two associated countries
              if (associated_countries.length > 1){
                // add item to chart data
                chartData.children.push({name: "", children: associated_countries}) 
              }
            })

            // End of preprocessing
            console.log(chartData)

            // parameters for visualization

            const dimensions = ({
              width: 1500,
              height: 1500,
              margin: 50,
            })

            const format = d3.format(",d")

            const color = d3.scaleLinear()
            .domain([0, 3])
            .range(["hsl(220,90%,90%)", "hsl(230,50%,40%)"])
            .interpolate(d3.interpolateHcl)

            // pack data
            var root = d3.pack()
              .size([dimensions.width, dimensions.height])
              .padding(3)
            (d3.hierarchy(chartData)
              .sum(d => d.value))
              .sort((a, b) => b.value - a.value)

            // start visualize
            var focus = root;
            var view;

            const svg = d3.select("#container")
                .append("svg")
                  .attr("viewBox", `-${dimensions.width / 2} -${dimensions.height / 2} ${dimensions.width} ${dimensions.height}`)
                  .style("display", "block")
                  .style("margin", "0 -14px")
                  .style("background", color(0))
                  .style("cursor", "pointer")
                  .on("click", (event) => zoom(event, root));

            const node = svg.append("g")
              .selectAll("circle")
              .data(root.descendants().slice(1))
              .join("circle")
                .attr("fill", d => d.children ? color(d.depth) : "#000091")
                .attr("pointer-events", d => !d.children ? "none" : null)
                .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
                .on("mouseout", function() { d3.select(this).attr("stroke", null); })
                .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

            const label = svg.append("g")
                .style("font", "20px sans-serif")
                .style("fill", "white")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
              .selectAll("text")
              .data(root.descendants())
              .join("text")
                .style("fill-opacity", d => d.parent === root ? 1 : 0)
                .style("display", d => d.parent === root ? "inline" : "none")
                .text(d => d.data.name);

            zoomTo([root.x, root.y, root.r * 2]);

            function zoomTo(v) {
              const k = dimensions.width / v[2];

              view = v;

              label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
              node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
              node.attr("r", d => d.r * k);
            }

            function zoom(event, d) {
              const focus0 = focus;

              focus = d;

              const transition = svg.transition()
                  .duration(event.altKey ? 7500 : 750)
                  .tween("zoom", d => {
                    const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                    return t => zoomTo(i(t));
                  });

              label
                .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                .transition(transition)
                  .style("fill-opacity", d => d.parent === focus ? 1 : 0)
                  .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                  .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
            }


          })
        })
      })
    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Total_alliance_chart;