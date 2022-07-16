import React, {Component} from 'react';
import * as d3 from "d3";

class SpiderPlot extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
      
      d3.csv( this.props.data)
        .then(csv => {

        var data = csv;
        var allGroup = []
        data.forEach((d) => {
          allGroup.push(d.genres);
        });

        // add the options to the button
      d3.select("#selectButton")
      .selectAll('myOptions')
      .data(allGroup)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }); // corresponding value returned by the button

      var margin = {left: 60, right: 20, top: 20, bottom: 60}
       var width = 400;
       var height = 400; 
       var svg = d3.select('#spider')
                   .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

      let radialScale = d3.scaleLinear()
                           .domain([0,1])
                           .range([0,150]);
      let ticks = [0.2,0.4,0.6,0.8,1];

      ticks.forEach(t =>
        svg.append("circle")
        .attr("cx", 200)
        .attr("cy", 200)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("r", radialScale(t))
      );

        ticks.forEach(t =>
          svg.append("text")
          .attr("x", 205)
          .attr("y", 200 - radialScale(t))
          .text(t.toString())
        );

        function angleToCoordinate(angle, value){
          let x = Math.cos(angle) * radialScale(value);
          let y = Math.sin(angle) * radialScale(value);
          return {"x": 200 + x, "y": 200 - y};
        }

        function angleToCoordinateAxis(angle, value){
          let x = Math.cos(angle) * radialScale(value) / 10;
          let y = Math.sin(angle) * radialScale(value)/ 10;
          return {"x": 200 + x, "y": 200 - y};
        }
       

         var features = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness"];
         for (var i = 0; i < features.length; i++) {
          let ft_name = features[i];
          let angleVal = (Math.PI / 2) + (2 * Math.PI * i / features.length);
          let line_coordinate = angleToCoordinateAxis(angleVal, 10);
          let label_coordinate = angleToCoordinateAxis(angleVal, 10.5);

          //draw axis line
          svg.append("line")
          .attr("x1", 200)
          .attr("y1", 200)
          .attr("x2", line_coordinate.x)
          .attr("y2", line_coordinate.y)
          .attr("stroke","black")
          .attr("fill", "none");

          //draw axis label
          svg.append("text")
          .attr("x", label_coordinate.x)
          .attr("y", label_coordinate.y)
          .text(ft_name);
        }

        let line = svg
        .append('g')
        .append("path")
        .datum(getPathCoordinates(data[0]))
        .attr("d", d3.line()
                .x(d => d.x)
                .y(d => d.y)
        )
        .attr("stroke-width", 3)
        .attr("stroke", "blue")
        .attr("fill", "blue")
        .attr("stroke-opacity", 0.5)
        .attr("opacity", 0.25)
          
          let colors = ["darkorange", "gray", "navy"];

          function getPathCoordinates(data_point){
          let coordinates = [];
          for (var i = 0; i < features.length; i++){
              let ft_name = features[i];
              let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
              coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
          }
          return coordinates;
        }


        // A function that update the chart
        function update(selectedGroup) {
          // Create new data with the selection?
          var dataFilter = data.find((d) => {return d["genres"] === selectedGroup});
           let coordinates = getPathCoordinates(dataFilter);
                      //draw the path element
           line
            .datum(coordinates)
            .transition()
            .duration(1000)
            .attr("d",d3.line()
              .x(d => d.x)
              .y(d => d.y))
            .attr("stroke-width", 3)
            .attr("stroke", "blue")
            .attr("fill", "blue")
            .attr("stroke-opacity", 0.5)
            .attr("opacity", 0.25);
              // .attr("stroke", function(d){ return myColor(selectedGroup) })
        }

        // When the button is changed, run the updateChart function
        d3.select("#selectButton").on("change", function(d) {
            // recover the option that has been chosen
            var selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update(selectedOption)
        });
   
     });

  }
//
    render(){
        return <div>Genre<br/><select id="selectButton"></select><div id={"#hi"}></div></div>
    }
}

export default SpiderPlot;