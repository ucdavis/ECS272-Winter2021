/*
* @Author: fangzhouli
* @Date:   2021-01-25 16:00:39
* @Last Modified by:   fangzhouli
* @Last Modified time: 2021-02-13 19:29:13
*/
import React from 'react';
import * as d3 from 'd3';
import * as d3Collection from 'd3-collection';

import './pie.css';

export default class Pie extends React.Component {

  componentDidMount() {
    this.drawChart();
  }


  processCsv(csv) {
    const data = {};

    csv.forEach(row => {
      if (row['Type Measure'].trim() === "") {
        return;
      } else if (data.hasOwnProperty(row['Type Measure'].trim())) {
        data[row['Type Measure'].trim()]['total'] += 1;
      } else {
        data[row['Type Measure'].trim()] = { total: 1, letters: {} };
      }
    })

    const measures = Object.keys(data);
    measures.forEach(tm => {
      csv.forEach(row => {
        if (row['Type Measure'].trim() === tm) {
          if (row['Letter'].trim() === "") {
            return;
          } else if (data[tm]['letters'].hasOwnProperty(row['Letter'].trim())) {
            data[tm]['letters'][row['Letter'].trim()] += 1;
          } else {
            data[tm]['letters'][row['Letter'].trim()] = 1;
          }
        }
      })
    })

    function sortObjectPropertiesByValue(obj) {
      const sortable = [];
      const objSorted = {};

      for (let key in obj) {
        sortable.push([key, obj[key]]);
      }
      sortable.sort((a, b) => b[1] - a[1]);
      sortable.forEach(item => objSorted[item[0]] = item[1]);
      return objSorted;
    }

    measures.forEach(tm => {
      let mergedLetters = {};
      let dataLettersSorted = sortObjectPropertiesByValue(data[tm]['letters']);
      let lettersSorted = Object.keys(dataLettersSorted);
      if (lettersSorted.length > 14) {
        let other = 0;
        for (let i = 0; i < lettersSorted.length; i++) {
          if (i < 14) {
            mergedLetters[lettersSorted[i]] = dataLettersSorted[lettersSorted[i]];
          } else {
            other += dataLettersSorted[lettersSorted[i]];
          }
        }
        mergedLetters['Other'] = other;
        data[tm]['letters'] = mergedLetters;
      }
    })

    function sortObjectPropertiesByTotal(obj) {
      const sortable = [];
      const objSorted = {};

      for (let key in obj) {
        sortable.push([key, obj[key]]);
      }
      sortable.sort((a, b) => b[1]['total'] - a[1]['total']);
      sortable.forEach(item => objSorted[item[0]] = item[1]);
      return objSorted;
    }

    // Keep only top 4 measures.
    const dataProcessed = {}
    const dataSorted = sortObjectPropertiesByTotal(data);
    const keysSorted = Object.keys(dataSorted);
    const merged = { total: 0, letters: {} };
    if (keysSorted.length > 5) {
      for (let i = 0; i < keysSorted.length; i++) {
        if (i < 4) {
          dataProcessed[keysSorted[i]] = dataSorted[keysSorted[i]];
        } else {
          merged['total'] += dataSorted[keysSorted[i]]['total']
          Object.keys(dataSorted[keysSorted[i]]['letters']).forEach(key => {
            if (merged['letters'].hasOwnProperty(key)) {
              merged['letters'][key] += dataSorted[keysSorted[i]]['letters'][key]
            } else {
              merged['letters'][key] = dataSorted[keysSorted[i]]['letters'][key]
            }
          })
        }
      }
      dataProcessed['Other'] = merged;
    } else {
      for (let i = 0; i < keysSorted.length; i++) {
        dataProcessed[keysSorted[i]] = dataSorted[keysSorted[i]];
      }
    }
    return dataProcessed;
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

          // const dropDown = div
          //   .append('select')
          //     .attr('id', 'dimList')
          //     .on('change', d => {
          //       change(data, d3.select('#dimList').property('value'))
          //     });

          // const options = dropDown.selectAll('option')
          //   .data(d3Collection.entries(data))
          //   .enter()
          //   .append('option')

          // options
          //   .text(d => {
          //     return d.key;
          //   })
          //   .attr('value', d => {
          //     return d.key;
          //   });

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
              .text('Overview: Measure Types');

          const legend = svg
            .append('text')
              .attr('x', margin + 10)
              .attr('y', margin + 80);
          legend
            .append('tspan')
              .attr('x', margin + 10)
              .text('How to interact:');
          legend
            .append('tspan')
              .attr('x', margin + 10)
              .attr('dy', 20)
              .text('Select a slice to zoom');
          legend
            .append('tspan')
              .attr('x', margin + 10)
              .attr('dy', 20)
              .text('in on measure letters.');
          legend
            .append('tspan')
              .attr('x', margin + 10)
              .attr('dy', 20)
              .text('Click on any measure letter');
          legend
            .append('tspan')
              .attr('x', margin + 10)
              .attr('dy', 20)
              .text('slice to go back.');

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


          const arc = d3.arc()
            .innerRadius(radius * 0.8)
            .outerRadius(radius * 0.4);

          const outerArc = d3.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9);

          const color = [
            d3.scaleLinear()
              .interpolate(d3.interpolateHcl)
              .range(['steelblue', 'blue']),
            d3.scaleLinear()
              .interpolate(d3.interpolateHcl)
              .range(["yellow", "orange"])];

          showMeasures();

          function showLetters(event, d) {
            const dataLetters = d.data.value.letters;

            const pie = d3.pie()
              .sort(null)
              .value(d => d.value)

            const slice = svg.select('.slices').selectAll('path')
              .data(pie(d3Collection.entries(dataLetters)), d => d.data.value)

            const text = svg.select('.labels').selectAll('text')
              .data(pie(d3Collection.entries(dataLetters)), d => d.data.value);

            const polyline = svg.select('.lines').selectAll('polyline')
              .data(pie(d3Collection.entries(dataLetters)), d => d.data.value);

            slice.enter()
              .append('path')
                .attr('class', 'slice')
                .attr('id', d => 'sliceLetter' + d.data.key)
                .attr('fill', (d, i) => color[i % 2](i / 10))
                .attr('d', arc)
                .on('click', (event, d) => {
                  showMeasures();
                })

            svg.select('.slices').selectAll('path')
              .transition().duration(1000)
              .attrTween('d', d => {
                const i = d3.interpolate()
              })

            function arcTween(d) {
              const i = d3.interpolate({startAngle: 0, endAngle: 0}, d);
              return t => {
                d.endAngle = i(t);
                return arc(d);
              }
            }

            function midAngle(d) {
              return d.startAngle + (d.endAngle - d.startAngle) / 2;
            }

            text.enter()
              .append('text')
                .text(d => d.data.key)
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

            slice.exit().remove();
            text.exit().remove();
            polyline.exit().remove();
          }

          function showMeasures() {
            // Start loading pie chart.
            const pie = d3.pie()
              .value(d => d.value.total);

            const slice = svg.select('.slices').selectAll('path')
              .data(pie(d3Collection.entries(data)), d => d.data.value);

            const text = svg.select('.labels').selectAll('text')
              .data(pie(d3Collection.entries(data)), d => d.data.value);

            const polyline = svg.select('.lines').selectAll('polyline')
              .data(pie(d3Collection.entries(data)), d => d.data.value);

            slice.enter()
              .append('path')
                .attr('class', 'slice')
                .attr('id', d => 'sliceMeasure' + d.data.key)
                .attr('d', arc)
                .attr('fill', (d, i) => color[i % 2](i / 10))
                .on('click', (event, d) => {
                  showLetters(event, d);
                })
                .on('mouseover', (event, d) => {
                  d3.select('#sliceMeasure' + d.data.key)
                    .attr('stroke', 'red');
                })
                .on('mouseout', (event, d) => {
                  d3.select('#sliceMeasure' + d.data.key)
                    .attr('stroke', color[d.index % 2](d.index / 10));
                })
                .style('cursor', 'pointer');


            function midAngle(d) {
              return d.startAngle + (d.endAngle - d.startAngle) / 2;
            }

            function mapText(t) {
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
            }

            text.enter()
              .append('text')
                .text(d => mapText(d.data.key))
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

            slice.exit().remove();
            text.exit().remove();
            polyline.exit().remove();
          }
        });
  }

  render() {
    return <div id="#pie"></div>
  }
}
