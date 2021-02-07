import React, {Component} from 'react';
import * as d3 from "d3";

class Paracoord extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
      d3.csv(this.props.data)
      .then(csv => {      

        // Preprocessing
        var init_data = csv.map(row => {
          return {
            poke_no: Number(row['Number']),
            //name: String(row['Name']),
            //total: Number(row['Total']),
            hp: Number(row['HP']),
            attack: Number(row['Attack']),
            defense: Number(row['Defense']),
            sp_attack: Number(row['Sp_Atk']),
            sp_defense: Number(row['Sp_Def']),
            speed: Number(row['Speed']),
            gen: Number(row['Generation'])
          }
        })

        function filterGen(array) {
          var data = array.filter(pokemon => pokemon.gen == 1);
          data.forEach(element => {delete element.gen;})
          return data;
        }

        var data = filterGen(init_data);

        console.log(data);
        console.log(Object.keys(data[0]));

        var margin = {top: 30, right: 10, bottom: 10, left: 10};
        var width = 600 - margin.left - margin.right;
        var height = 300 - margin.top - margin.bottom;

        var x = d3.scalePoint().range([0, width]).padding(1),
            y = {};

        var line = d3.line();
        var axis = d3.axisLeft(),
            background,
            foreground;
      
        var dimensions = null;
      
        const svg = d3.select("#paracoord")
          .append("svg")
          .attr("class", "viewBox")
          .attr("viewBox", [50, 0, width, height+30]);
                  
        const svg_adjusted = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        // Extract the list of dimensions and create a scale for each.
        x.domain(dimensions = Object.keys(data[0]).filter(function(d) {
          return d != "name" && (y[d] = d3.scaleLinear()
              .domain(d3.extent(data, function(p) { return +p[d]; }))
              .range([height, 0]));
        }));

        // Returns the path for a given data point.
        function path(d) {
          return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
        }

        // Add grey background lines for context.
        background = svg_adjusted.append("g")
            .attr("class", "background")
          .selectAll("path")
            .data(data)
          .enter().append("path")
            .attr('stroke', '#e6e6e6')
            .style('fill', 'none')
            .attr("d", d => path(d));

        // Add blue foreground lines for focus.
        foreground = svg_adjusted.append("g")
            .attr("class", "foreground")
          .selectAll("path")
            .data(data)
          .enter().append("path")
            .attr('stroke', 'SteelBlue')
            .style('fill', 'none')
            .attr("d", d => path(d));


        // Add a group element for each dimension.
        const g = svg_adjusted.selectAll(".dimension")
            .data(dimensions)
          .enter().append("g")
            .attr("class", "dimension")
            .attr("transform", function(d) { return "translate(" + x(d) + ")"; });

        // Add an axis and title.
        g.append("g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
          .append("text")
            .style("text-anchor", "middle")
            .style("color", "#000000")
            .attr("y", -9)
            .attr("class", "labels")
            .text(function(d) { return d; });

        
        // Handles a brush event, toggling the display of foreground lines.
        function brush() {  
          var actives = [];
          svg.selectAll(".brush")
            .filter(function(d) {
                  y[d].brushSelectionValue = d3.brushSelection(this);
                  return d3.brushSelection(this);
            })
            .each(function(d) {
                // Get extents of brush along each active selection axis (the Y axes)
                  actives.push({
                      dimension: d,
                      extent: d3.brushSelection(this).map(y[d].invert)
                  });
            });

          var selected = [];
          // Update foreground to only display selected values
          foreground.style("display", function(d) {
              return actives.every(function(active) {
                  var result = active.extent[1] <= d[active.dimension] && d[active.dimension] <= active.extent[0];
                  if(result)selected.push(d);
                  return result;
              }) ? null : "none";
          });        
        }

        // Add and store a brush for each axis.
        g.append("g")
            .attr("class", "brush")
            .each(function(d) { 
                d3.select(this).call(y[d].brush = d3.brushY()
                  .extent([[-10,0], [10,height]])
                  .on("brush", brush)           
                  .on("end", brush)
                  )
              })
          .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);
            
        // End of main function
     });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Paracoord;