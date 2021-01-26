import React, {Component} from 'react';
import * as d3 from "d3";
//https://bl.ocks.org/AntonOrlov/6b42d8676943cc933f48a43a7c7e5b6c
class RadialChart extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
      console.log("hi")
      d3.csv( this.props.data)
        .then(csv => {

        var datas = csv.slice(0,1);
        var keys  = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness"];
        console.log(datas)
        var data = []
        datas.forEach((d) => {
          keys.forEach((k) => {
            data.push({"name": k, "value": d[k]})
          });
        });
        console.log(data)
        var allGroup = []
        data.forEach((d) => {
          allGroup.push(d.artists);
        });

      //   // add the options to the button
      // d3.select("#selectButton")
      // .selectAll('myOptions')
      // .data(allGroup)
      // .enter()
      // .append('option')
      // .text(function (d) { return d; }) // text showed in the menu
      // .attr("value", function (d) { return d; }); // corresponding value returned by the button

      var margin = {left: 60, right: 20, top: 20, bottom: 60}
       var width = 600;
       var height = 600; 
       var chartRadius = height / 2 - 40;
       var svg = d3.select('#radial')
                   .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        const PI = Math.PI,
              arcMinRadius = 10,
              arcPadding = 10,
              labelPadding = -5,
              numTicks = 10;


        const color = d3.scaleOrdinal(d3.schemeCategory10);

        console.log(color)

        let scale = d3.scaleLinear()
                      .domain([0, 1])
                      .range([0, 2 * PI]);
        console.log(scale)

        let ticks = scale.ticks(numTicks).slice(0, -1);

        
        const numArcs = keys.length;
        const arcWidth = (chartRadius - arcMinRadius - numArcs * arcPadding) / numArcs;

        let arc = d3.arc()
                    .innerRadius((d, i) => getInnerRadius(i))
                    .outerRadius((d, i) => getOuterRadius(i))
                    .startAngle(0)
                    .endAngle((d, i) => scale(d));

        let radialAxis = svg.append('g')
                            .attr('class', 'r axis')
                            .selectAll('g')
                            .data(data)
                            .enter().append('g');
         
        radialAxis.append('circle')
                  .attr('r', (d, i) => getOuterRadius(i) + arcPadding)
                  .attr('fill', 'none')
                  .attr('stroke', '#cccccc')
                  .attr('stroke-width', '1px');

        radialAxis.append('text')
                  .attr('x', labelPadding)
                  .attr('y', (d, i) => -getOuterRadius(i) + arcPadding)
                  .attr('text-anchor', 'end')
                  .text(d => d.name);

        let axialAxis = svg.append('g')
                           .attr('class', 'a axis')
                           .selectAll('g')
                           .data(ticks)
                           .enter().append('g')
                           .attr('transform', d => 'rotate(' + (rad2deg(scale(d)) - 90) + ')');

        axialAxis.append('line')
                 .attr('x2', chartRadius)
                 .attr('stroke', '#cccccc')
                  .attr('stroke-width', '1px');

        axialAxis.append('text')
                 .attr('x', chartRadius + 10)
                 .style('text-anchor', d => (scale(d) >= PI && scale(d) < 2 * PI ? 'end' : null))
                 .attr('transform', d => 'rotate(' + (90 - rad2deg(scale(d))) + ',' + (chartRadius + 10) + ',0)')
                 .text(d => d);

          //data arcs
        let arcs = svg.append('g')
                      .attr('class', 'data')
                      .selectAll('path')
                      .data(data)
                      .enter().append('path')
                      .attr('class', 'arc')
                      .style('fill', (d, i) => color(i));

        arcs.transition()
            .delay((d, i) => i * 200)
            .duration(1000)
            .attrTween('d', arcTween);

        // arcs.on('mousemove', showTooltip)
        // arcs.on('mouseout', hideTooltip)

        function arcTween(d, i) {
          let interpolate = d3.interpolate(0, d.value);
          return t => arc(interpolate(t), i);
        }

        // function showTooltip(d) {
        //   tooltip.style('left', (d3.event.pageX + 10) + 'px')
        //     .style('top', (d3.event.pageY - 25) + 'px')
        //     .style('display', 'inline-block')
        //     .html(d.value);
        // }

        // function hideTooltip() {
        //   tooltip.style('display', 'none');
        // }

        function rad2deg(angle) {
          return angle * 180 / PI;
        }

        function getInnerRadius(index) {
          return arcMinRadius + (numArcs - (index + 1)) * (arcWidth + arcPadding);
        }

        function getOuterRadius(index) {
          return getInnerRadius(index) + arcWidth;
        }
     });
  }

    render(){
        return <div><select id="selectButton"></select><div id={"#hi"}></div></div>
    }
}

export default RadialChart;