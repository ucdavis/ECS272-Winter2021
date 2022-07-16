/*
* @Author: fangzhouli
* @Date:   2021-01-25 16:00:39
* @Last Modified by:   fangzhouli
* @Last Modified time: 2021-02-01 23:01:04
*/
import React from 'react';
import * as d3 from 'd3';
import * as d3Collection from 'd3-collection';

import './pie.css';

export default class Pie extends React.Component {

  componentDidMount() {
    this.drawChart();
  }

  sortObjectProperties(obj) {
    const sortable = [];
    const objSorted = {};

    for (let key in obj) {
      sortable.push([key, obj[key]]);
    }
    sortable.sort((a, b) => b[1] - a[1]);
    sortable.forEach(item => objSorted[item[0]] = item[1]);
    return objSorted;
  }

  processCsv(csv) {
    const data = {
      'Type Measure': {},
      'Pass or Fail': {}
    };
    const dimensions = Object.keys(data);

    csv.forEach(row => {
      dimensions.forEach(dim => {
        if (row[dim].trim() === "") {
          return;
        } else if (data[dim].hasOwnProperty(row[dim].trim())) {
          data[dim][row[dim].trim()] += 1;
        } else {
          data[dim][row[dim].trim()] = 1;
        }
      });
    });

    Object.keys(data).forEach(dim => {
      let dataSorted = this.sortObjectProperties(data[dim]);
      let dataProcessed = {}
      let keys = Object.keys(dataSorted);
      if (keys.length > 5) {
        let count = 0;
        for (let i = 0; i < keys.length; i++) {
          if (i < 4) {
            dataProcessed[keys[i]] = dataSorted[keys[i]];
          } else {
            count += dataSorted[keys[i]];
          }
        }
        dataProcessed['Other'] = count;
      } else {
        for (let i = 0; i < keys.length; i++) {
          dataProcessed[keys[i]] = dataSorted[keys[i]];
        }
      }
      data[dim] = dataProcessed;
    });
    return data;
  }

  drawChart() {
    d3.csv(this.props.data)
      .then(
        csv => {
          const data = this.processCsv(csv);

          const width = document.getElementById('container').clientWidth / 2,
                height = document.getElementById('container')
                  .getAttribute('height') / 2,
                margin = 25,
                radius = Math.min(width, height) / 2 - margin;

          const div = d3.select('#piePlot')

          const dropDown = div
            .append('select')
              .attr('id', 'dimList')
              .on('change', d => {
                change(data, d3.select('#dimList').property('value'))
              });

          const options = dropDown.selectAll('option')
            .data(d3Collection.entries(data))
            .enter()
            .append('option')

          options
            .text(d => {
              return d.key;
            })
            .attr('value', d => {
              return d.key;
            });

          const svg = div.append('svg')
              .attr('width', width)
              .attr('height', height)

          const g = svg
            .append('g')
              .attr(
                "transform",
                "translate(" + width / 2 + "," + height / 2 + ")");

          // Start visualizing a pie chart. Reference:
          //   http://bl.ocks.org/dbuezas/9306799.
          svg
            .append('text')
              .attr('x', margin + 10)
              .attr('y', margin + 20)
              .attr('stroke', 'black')
              .text('Overview');
          const legend = svg
            .append('text')
              .attr('x', margin + 10)
              .attr('y', margin + 80);
          legend
            .append('tspan')
              .attr('x', margin + 10)
              .text('Legend:');
          legend
            .append('tspan')
              .attr('x', margin + 10)
              .attr('dy', 20)
              .text('Choose a dimension.');

          svg
            .append('rect')
              .attr('x', margin)
              .attr('y', margin)
              .attr('height', height - margin * 2)
              .attr('width', width - margin * 2)
              .style('stroke', 'black')
              .style('fill', 'none')
              .style('stroke-width', 1);
          svg
            .append('g')
              .attr('id', 'legend')
          g
            .append('g')
            .attr('class', 'slices');
          g
            .append('g')
            .attr('class', 'labels');
          g
            .append('g')
            .attr('class', 'lines');

          const pie = d3.pie()
            .sort(null)
            .value(d => d.value);

          const arc = d3.arc()
            .innerRadius(radius * 0.8)
            .outerRadius(radius * 0.4);

          const outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

          const color = [
            d3.scaleLinear()
              .interpolate(d3.interpolateHcl)
              .range(['#9AF768', '#F27A4D']),
            d3.scaleLinear()
              .interpolate(d3.interpolateHcl)
              .range(["#112231", "#3C769D"])];

          change(data, 'Type Measure');

          function change(dataAll, dim) {
            const data = dataAll[dim];

            let slice = svg.select('.slices').selectAll('path.slice')
              .remove()
              .data(pie(d3Collection.entries(data)), d => d['value']);

            const text = svg.select('.labels').selectAll('text')
              .remove()
              .data(pie(d3Collection.entries(data)), d => d['value']);

            const polyline = svg.select('.lines').selectAll('polyline')
              .remove()
              .data(pie(d3Collection.entries(data)), d => d['value']);

            slice.enter()
              .append('path')
                .attr('d', arc)
                .attr('fill', (d, i) => color[i % 2](i / 10))
                .attr('class', 'slice');

            function midAngle(d) {
              return d.startAngle + (d.endAngle - d.startAngle) / 2;
            }

            function mapText(dim, t) {
              if (dim === 'Type Measure') {
                if (t === 'C') {
                  return 'Charter Amendment';
                } else if (t === 'O') {
                  return "Ordinance";
                } else if (t === 'B') {
                  return "Bond Issue";
                } else if (t === 'P') {
                  return "Policy Declaration";
                } else if (t === 'Other') {
                  return "Other";
                }
              } else if (dim === 'Pass or Fail') {
                if (t === 'P') {
                  return 'Pass';
                } else if (t === 'F') {
                  return 'Fail';
                }
              }
            }

            text.enter()
              .append('text')
                .text(d => mapText(dim, d.data.key))
                .attr('transform', d => {
                  const pos = outerArc.centroid(d);
                  pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
                  return "translate(" + pos + ")";
                })
                .attr('text-anchor', d => {
                  return midAngle(d) < Math.PI ? 'start' : 'end';
                })
                .attr('font-size', 12);

            polyline.enter()
              .append('polyline')
                .attr('points', d => {
                  const pos = outerArc.centroid(d);
                  pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                  return [arc.centroid(d), outerArc.centroid(d), pos];
                });
          }
        });
  }

  render() {
    return <div id="#pie"></div>
  }
}
