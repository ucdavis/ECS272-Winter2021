/*
* @Author: fangzhouli
* @Date:   2021-01-28 18:53:39
* @Last Modified by:   fangzhouli
* @Last Modified time: 2021-02-01 23:06:52
*/

import React from 'react';
import * as d3 from 'd3';
import * as d3Collection from 'd3-collection';

import './bar.css';

export default class Bar extends React.Component {

  componentDidMount() {
    this.drawChart();
  }

  processCsv(csv) {
    const feature = 'Letter'
    const data = {};
    csv.forEach(row => {
      let key = row[feature].trim();
      if (data.hasOwnProperty(key)) {
        data[key] += 1;
      } else {
        data[key] = 1;
      }
    });

    const dataProcessed = [];
    const keys = Object.keys(data);
    keys.forEach(k => {
      dataProcessed.push([k, data[k]])
    });
    return dataProcessed;
  }

  drawChart() {
    d3.csv(this.props.data)
      .then(csv => {
        let numClick = 0;
        const data = this.processCsv(csv);
        const width = document.getElementById('container').clientWidth / 2,
              height = document.getElementById('container')
                .getAttribute('height') / 2,
              margin = { top: 100, bottom: 100, left: 100, right: 100 },
              fontSize = 12;

        const y = d3.scaleLinear()
          .range([height - margin.bottom, margin.top])
          .domain([0, d3.max(d3.map(data, d => d[1]))]);

        const div = d3.select('#basic').select('#barPlot');

        const button = div
          .append('button')
            .text('Sort')
            .on('click', d => {
              sortBars(data);
            })

        const svg = div
          .append('svg')
            .attr('width', width)
            .attr('height', height)

        // Add border and title.
        svg
          .append('rect')
            .attr('x', 25)
            .attr('y', 25)
            .attr('height', height - 25 * 2)
            .attr('width', width - 25 * 2)
            .style('stroke', 'black')
            .style('fill', 'none')
            .style('stroke-width', 1);
        svg
          .append('text')
            .attr('x', 35)
            .attr('y', 45)
            .attr('stroke', 'black')
            .text('Measure Letter Distribution');

        const legend = svg
            .append('text')
              .attr('x', width - margin.right - 120)
              .attr('y', margin.top);
          legend
            .append('tspan')
              .text('Legend:');
          legend
            .append('tspan')
              .attr('x', width - margin.right - 120)
              .attr('y', margin.top + 20)
              .text('Click button to sort.');

        svg
          .append('g')
            .attr('id', 'x-axis');
        svg.select('#x-axis')
          .append('text')
            .attr(
              'transform',
              "translate(" + (width - margin.right / 2) + "," +
                (height - margin.bottom) + ")")
            .attr("text-anchor", "end")
            .attr('font-size', fontSize)
            .text("Letter");
        svg
          .append('g')
            .attr('id', 'y-axis')

        svg.select('#y-axis')
          .append("text")
            .attr(
              "transform",
              "translate(" + (margin.left + 20) + "," + (margin.top - 5) + ")")
            .attr("text-anchor", "end")
            .attr('font-size', fontSize)
            .text("Number")
        svg
          .append('g')
            .attr('id', 'bars')

          // Visualize y-axis.
          svg.select('#y-axis')
            .append("g")
              .call(d3.axisLeft(y).tickFormat(d => d).ticks(10))
              .attr('transform', 'translate(' + margin.left + ',0)')

        sortBars(data);

        function sortBars(dataTmp) {
          const dataOriginal = dataTmp;
          const dataDescended = dataTmp.slice().sort((a, b) => b[1] - a[1]);
          const dataAscended = dataTmp.slice().sort((a, b) => a[1] - b[1]);

          let data = null;
          if (numClick % 3 === 0) {
            data = dataOriginal;
          } else if (numClick % 3 === 1) {
            data = dataDescended;
          } else {
            data = dataAscended;
          }
          const x = d3.scaleBand()
            .range([margin.left, width - margin.right])
            .padding(0.4)
            .domain(d3.map(data, d => d[0]));

          svg.select('#x-axis').select('.axis')
            .remove();

          svg.select('#x-axis')
            .append('g')
              .attr('class', 'axis')
              .call(d3.axisBottom(x))
              .attr('transform', 'translate(0,' + (height - margin.bottom) + ')')
              .selectAll('text')
                .attr('transform', 'translate(-15, 20)rotate(-90)');

          // Visualize bars.
          svg.select('#bars').selectAll('.bar')
            .remove();

          svg.select('#bars').selectAll('.bar')
            .data(data, d => d[1])
            .enter()
            .append('rect')
              .attr("class", "bar")
              .attr("x", function(d) { return x(d[0]); })
              .attr("y", function(d) { return y(d[1]); })
              .attr("width", x.bandwidth())
              .attr("height", function(d) {
                return height - margin.bottom - y(d[1]);
              })
              .attr('fill', 'steelblue');

          numClick += 1;
        }
      });

  }

  render() {
    return <div id="#bar"></div>
  }
}