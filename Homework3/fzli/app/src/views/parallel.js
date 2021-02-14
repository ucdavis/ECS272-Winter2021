/*
* @Author: fangzhouli
* @Date:   2021-01-30 16:48:51
* @Last Modified by:   fangzhouli
* @Last Modified time: 2021-02-13 19:42:57
*/
import React from 'react';
import * as d3 from 'd3';

export default class Parallel extends React.Component {

  componentDidMount() {
    this.drawChart();
  }

  processCsv(csv) {
    const data = [];

    csv.forEach(row => {
      if (row['Pass or Fail'].trim() !== ''
          && row['Type Measure'].trim() !== '') {
        data.push({
          Year: Number(row['Year']),
          YesVote: Number(row['Yes Votes']),
          NoVote: Number(row['No Votes']),
          Percent: Number(row['Percent']),
          PassOrFail: row['Pass or Fail']
        });
      }
    });

    return data;
  }

  drawChart() {
    d3.csv(this.props.data)
      .then(csv => {
        const width = document.getElementById('container').clientWidth / 2,
              height = document.getElementById('container').getAttribute('height'),
              margin = { top: 200, right: 100, bottom: 100, left: 100 };

        const data = this.processCsv(csv);
        const dimensions = Object.keys(data[0]);
        const line = d3.line();
        const x = d3.scalePoint()
          .range([margin.left, width - margin.right])
          .domain(dimensions);
        const y = {};
        dimensions.forEach(dim => {  // Construct a y-axis for each dimension.
          if (dim !== 'PassOrFail') {  // Linear scale.
            y[dim] = d3.scaleLinear()
              .range([margin.top, height - margin.bottom])
              .domain([d3.min(data.map(row => row[dim])),
                       d3.max(data.map(row => row[dim]))]);
          } else {  // Band scale.
            y[dim] = d3.scalePoint()
              .range([margin.top, height - margin.bottom])
              .domain(
                Array.from(new Set(data.map(row => row[dim].trim()))));
          }
        });

        // Construct the visualization for parallel coordinate chart.
        const svg = d3.select('#advanced')
          .append('svg')
            .attr('width', width)
            .attr('height', height)
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
            .text('Parallel Coordinates');

        const description = svg
          .append('text')
            .attr('x', 250)
            .attr('y', 45)
        description
          .append('tspan')
            .text('How to interact:');
        description
          .append('tspan')
            .attr('x', 250)
            .attr('dy', 20)
            .text("Hover your mouse on 'Year'");
        description
          .append('tspan')
            .attr('x', 250)
            .attr('dy', 20)
            .text("to brush/select the highlighted subgroup.");
        const legend = svg
          .append('g')
            .attr(
              'transform',
              'translate(' + (margin.left) + ',' + (height - margin.bottom + 30) + ')')
            .attr('x', margin.left)
            .attr('y', margin.top)
        legend
          .append('circle')
            .attr('r', 6)
            .style('fill', 'steelblue')
        legend
          .append('circle')
            .attr('cy', 20)
            .attr('r', 6)
            .style('fill', 'orange')
        legend
          .append('text')
            .attr('x', 10)
            .attr('y', 10)
            .text('Pass')
        legend
          .append('text')
            .attr('x', 10)
            .attr('y', 30)
            .text('Fail')

        svg
          .append('g')
            .attr('id', 'yAxes');
        svg
          .append('g')
            .attr('id', 'lines')

        // Visualize y-axes.
        dimensions.forEach(dim => {
          if (dim === 'Year') {
            svg.select('#yAxes')
              .append('g')
                .call(d3.axisLeft(y[dim]).tickFormat(d3.format('d')))
                .attr('class', 'yAxis')
                .attr(
                  'transform',
                  'translate(' + x(dim) + ',0)')
          } else {
            svg.select('#yAxes')
              .append('g')
                .call(d3.axisLeft(y[dim]))
                .attr('class', 'yAxis')
                .attr(
                  'transform',
                  'translate(' + x(dim) + ',0)')
          }
        });
        svg.select('#yAxes').selectAll('.yAxis')
          .data(dimensions)
          .join()
          .append('text')
            .text(d => d)
            .attr('transform', 'translate(0,' + (margin.top - 10) + ')')
            .style('font-size', 12)
            .style('fill', 'black');

        function clusterYears(year) {
          if (year === 1960) return 1965;

          return Math.ceil((Number(year) - 1960) / 5) * 5 + 1960;
        }

        // Visualize lines.
        svg.select('#lines').selectAll('.line')
          .data(data)
          .enter()
          .append('path')
            .attr('class', d => 'line line' + clusterYears(d['Year']))
            .attr('d', path)
            .attr(
              'stroke', d => d['PassOrFail'] === 'P' ? 'steelblue' : 'orange')
            .attr('fill', 'none')
            .style('opacity', 0.5)
            .on('mouseover', highlight)
            .on('mouseleave', unHighlight);

        function highlight(event, d) {
          d3.select('#lines').selectAll('path')
            .transition().duration(200)
            .style('stroke', 'lightgrey')
            .style('opacity', '0.2');
          d3.selectAll('.line' + clusterYears(d['Year']))
            .transition().duration(200)
            .style(
              'stroke',
              d => d['PassOrFail'] === 'P' ? 'steelblue' : 'orange')
            .style('opacity', '1');
        }

        function unHighlight(d) {
          d3.select('#lines').selectAll('path')
            .transition().duration(200).delay(1000)
            .style(
              'stroke',
              d => d['PassOrFail'] === 'P' ? 'steelblue' : 'orange')
            .style("opacity", 0.5)
        }

        function path(d) {
          let coordinates = [];
          dimensions.forEach(dim => {
            coordinates.push([x(dim), y[dim](d[dim])]);
          });
          return line(coordinates);
        }
      });
  }

  render() {
    return <div id='#parallel'></div>
  }
}