import React from 'react';

import * as d3 from 'd3';

import './StreamGraph.css';
import csv from '../../data/processed.csv';
import { colorByRating, colorByGenre } from '../../utils/color';
import {
  loadYearToRatingData,
  loadYearToGenreByRatingData,
  loadElementByGenreData } from '../../utils/load';

export default class StreamGraph extends React.Component {

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    // Constant visualization parameters.
    const width = 1000,
          height = 500,
          margin = {top: 50, right: 150, bottom: 100, left: 50};
    const FILTER_YEAR_MIN = 1990,
          FILTER_YEAR_MAX = 2018;

    // Define visualization elements.
    const svg = d3.select('#container')
      .append('svg')
        .attr('id', 'stream-graph')
        .attr('width', width)
        .attr('height', height);
    const x = d3.scaleLinear()
      .domain([FILTER_YEAR_MIN, FILTER_YEAR_MAX])
      .range([margin.left, width - margin.right]);
    const xInverse = d3.scaleLinear()
      .domain([margin.left, width - margin.right])
      .range([FILTER_YEAR_MIN, FILTER_YEAR_MAX])
      .clamp(true);
    const y = d3.scaleLinear()
      .range([height - margin.bottom, margin.top]);
    const area = d3.area()
      .x(d => x(d.data.year))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]));

    // Visualize basic component of elements.
    svg  // Title.
      .append('text')
        .attr('id', 'title')
        .attr('x', margin.left + 15)
        .attr('y', margin.top)
        .attr('font-size', 18)
        .attr('font-weight', 'bold');
    svg  // Visualize x-axis.
      .append('g')
        .call(d3.axisBottom(x)
          .ticks(FILTER_YEAR_MAX - FILTER_YEAR_MIN + 1)
          .tickFormat(x => x % 2 ? "" : x))
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0,' + (height - margin.bottom) + ')');
    svg  // Initialize y-axis for visualizing during the update.
      .append('g')
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + (margin.left) + ',0)');
    svg  // A vertical line to select a year.
      .append('line')
        .attr('id', 'brush')
        .attr('x1', x(2000))
        .attr('y1', margin.top)
        .attr('x2', x(2000))
        .attr('y2', y(0))
        .attr('stroke', 'black')
        .attr('stroke-width', '5px')
        .attr('cursor', 'pointer')
        .call(
          d3.drag()
            .on('start', function(e) {
            })
            .on('drag', function(e) {
              const xpos = e.x + e.dx;

              d3.select(this)  // Specify the range of dragging.
                .attr('x1', function() {
                  if (xpos < margin.left) {
                    return margin.left;
                  } else if (xpos > width - margin.right) {
                    return width - margin.right;
                  } else {
                    return xpos;
                  }
                })
                .attr('x2', function() {
                  if (xpos < margin.left) {
                    return margin.left;
                  } else if (xpos > width - margin.right) {
                    return width - margin.right;
                  } else {
                    return xpos;
                  }
                });
            })
            .on('end', function (e) {  // Drop the vertical line to the nearest tick.
              const yearSelected = Math.round(xInverse(e.x));
              console.log(e)
              d3.select(this)
                .attr('x1', x(yearSelected))
                .attr('x2', x(yearSelected));
            })
          );

    const heightToolTip = 200,
          widthToolTip = 200,
          marginToolTip = 37;
    const toolTip = svg  // A tool-tip bar plot.
      .append('g')
        .attr('id', 'tool-tip')
        .attr('opacity', 0.0);
    const xToolTip = d3.scaleBand()
      .domain(["Cars", "Dementia", "Demons", "Ecchi", "Game", "Harem",
               "Historical", "Horror", "Josei", "Magic", "Martial Arts",
               "Mecha", "Military", "Music", "Mystery", "Parody", "Police",
               "Psychological", "Samurai", "Shoujo", "Shoujo Ai", "Shounen Ai",
               "Space", "Sports", "Super Power", "Thriller", "Vampire", "Yaoi",
               "Yuri"])
      .range([0, widthToolTip])
      .padding(0.1);
    const yToolTip = d3.scaleLinear()
      .range([heightToolTip, 0]);

    toolTip
      .append('rect')
        .attr('id', 'tool-tip-border')
        .attr('width', widthToolTip + 2 * marginToolTip)
        .attr('height', heightToolTip + 2 * marginToolTip)
        .attr('fill', 'white')
        .attr('stroke', 'black')
        .attr('stroke-width', 1);
    toolTip
      .append('text')
        .attr('id', 'tool-tip-title')
        .attr('font-weight', 'bold')
        .attr('transform', 'translate(-20, -10)')
    toolTip
      .append('g')
        .attr('id', 'tool-tip-x-axis')
        .attr('transform', 'translate(0,' + heightToolTip + ')')
        .call(d3.axisBottom(xToolTip));
    toolTip.select('#tool-tip-x-axis').selectAll('text')
      .attr('text-anchor', 'end')
      .attr('font-size', 6)
      .attr('transform', 'translate(-8, 0)rotate(-50)');
    toolTip
      .append('g')
        .attr('id', 'tool-tip-y-axis');


    // Load data and visualization that depends on the data.
    d3.csv(csv)
      .then(data => {
        // Filter animes that are not between FILTER_YEAR_MIN and FILTER_YEAR_MAX.
        const dataFiltered = [];
        data.forEach(d => {
          if (d['year_from'] >= FILTER_YEAR_MIN & d['year_from'] <= FILTER_YEAR_MAX) {
            dataFiltered.push(d);
          }
        })

        update('rating', loadYearToRatingData(dataFiltered));

        /*
         * Function:
         *   update(mode, data)
         *
         * Description:
         *   Use `mode` to specify the loaded data structure.
         *
         * Input:
         *   mode (String): Either `rating` or `genre`.
         *   data (Object): A data object.
         *
         * Genrates:
         *   (d3.node)
         */
        function update(mode, data) {
          // Initilize variables for the initialization.
          const stackedData = d3.stack()
            .keys(Object.keys(data[0]).slice(1))
            .value((d, key) => d[key].length)
            (data);
          const layers = svg.selectAll('.layers')
            .data(stackedData, d => d.key);
          const legends = svg.selectAll('.legend')
            .data(stackedData, d => d.key);

          // Update the pre-defined visualization variables.
          svg.select('#title')
            .text(function() {
              if (mode === 'rating') {
                return 'Age Restriction Rating'
              } else if (mode === 'genre') {
                return 'Age Restriction Rating: ' + data.key;
              };
            })
          y
            .domain([0, d3.max(data.map(d => {  // Update the domain of y-axis accordingly.
              let keys = Object.keys(d).slice(1);
              let count = 0;

              keys.forEach(k => {
                count += d[k].length;
              })
              return count;
            }))]);
          svg.select('#y-axis')
            .transition()
            .call(d3.axisLeft(y))

          // Construct layers.
          layers.enter()
            .append('path')
              .attr('class', 'layers')
              .attr('fill', d => {
                if (mode === 'rating') {
                  return colorByRating(d['key']);
                } else if (mode === 'genre') {
                  return colorByGenre(d['key']);
                }
              })
              .attr('d', area)
              .on('mouseover', function() {
                svg.selectAll('.layers')
                  .attr('opacity', 0.5);
                d3.select(this)
                  .attr('opacity', 0.8)
                  .attr('stroke', 'black');
              })
              .on('mousemove', function(e, d) {
                svg.select('#brush').lower();

                if (mode === 'genre') {  // Show tool-tip view.
                  const dataElement = loadElementByGenreData(
                    d, Math.round(xInverse(e.offsetX)));
                  const bars = toolTip.selectAll('.bars')
                    .data(dataElement, d => {
                      return d;
                    });

                  // Update visualization based on data.
                  const yToolTipMax = d3.max(dataElement.map(d => {
                    return d.value.length;
                  }));

                  toolTip.raise()
                    .attr('opacity', 1);
                  toolTip.select('#tool-tip-title')
                    .text(d['key'] + " in " + Math.round(xInverse(e.offsetX)));
                  toolTip.select('#tool-tip-y-axis')
                    .transition()
                      .call(
                        d3.axisLeft(
                            yToolTip
                              .domain([0, yToolTipMax]))
                          .ticks(yToolTipMax));

                  // Construct tool-tip bar plot.
                  bars.enter()
                    .append('rect')
                      .attr('class', 'bars')
                      .attr('x', d => xToolTip(d['key']))
                      .transition().duration(500)
                      .attr('y', d => yToolTip(d.value.length))
                      .attr('width', xToolTip.bandwidth())
                      .transition().duration(500)
                      .attr('height', d => {
                        return yToolTip(0) - yToolTip(d.value.length);
                      })
                      .attr('fill', 'steelblue');

                  // Adjust the position of tool-tip based on cursor.
                  toolTip
                    .attr(
                      'transform',
                      'translate(' + (e.offsetX + 50) + ',' + (e.offsetY - heightToolTip) + ')');
                  toolTip.select('#tool-tip-border')
                    .attr(
                      'transform',
                      'translate(' + (-marginToolTip) + ',' + (-marginToolTip) + ')');
                  if (e.offsetX > 500) {  // If cursoe is on the right
                    toolTip         //  side, show tool-tip on the left.
                      .attr(
                        'transform', function(d) {
                          return this.getAttribute('transform') +
                            'translate(' + (-300) + ',0)';
                        })
                  }
                  if (e.offsetY < 250) {  // If cursoe is on the top
                    toolTip         //  side, show tool-tip on the bottom.
                      .attr(
                        'transform', function(d) {
                          return this.getAttribute('transform') +
                            'translate(0,' + (200) + ')';
                        })
                  }

                  bars.exit().remove();
                }
              })
              .on('mouseleave', function() {
                svg.select('#brush').raise();

                svg.selectAll('.layers')
                  .attr('opacity', 0.8)
                  .attr('stroke', 'none');

                if (mode === 'genre') {
                  toolTip.lower()
                    .attr('opacity', 0.0);
                }
              })
              .on('click', function(_, d) {
                if (mode === 'rating') {
                  update('genre', loadYearToGenreByRatingData(d));
                } else if (mode === 'genre') {
                  toolTip.lower()
                    .attr('opacity', 0.0);
                  update('rating', loadYearToRatingData(dataFiltered));
                }
              });

          legends.enter()
            .append('g')
              .attr('class', 'legend');
          legends.enter().selectAll('.legend')
            .append('circle')
              .attr('cx', width - margin.right + 20)
              .attr('cy', d => margin.top + (stackedData.length - 1 - d.index) * 20)
              .attr('r', 3)
              .attr('fill', d => {
                if (mode === 'rating') {
                  return colorByRating(d['key']);
                } else if (mode === 'genre') {
                  return colorByGenre(d['key']);
                }
              });
          legends.enter().selectAll('.legend')
            .append('text')
              .attr('x', width - margin.right + 40)
              .attr('y', d => margin.top + 3 + (stackedData.length - 1 - d.index) * 20)
              .attr('font-size', '12px')
              .text(d => d.key);

          layers.exit().remove();
          legends.exit().remove();

          svg.select('#brush').raise();
        }
      })
  }

  render() {
    return <div></div>;
  }
}
