import React from 'react';

import * as d3 from 'd3';

import './StreamGraph.css';
import csv from '../../data/processed.csv';
import color from '../../utils/color';

export default class StreamGraph extends React.Component {

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {

    // Constant visualization parameters.
    const width = 1000,
          height = 500,
          margin = {top: 100, right: 100, bottom: 100, left: 100};
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
    const y = d3.scaleLinear()
      .range([height - margin.bottom, margin.top]);
    const area = d3.area()
      .x(d => x(d.data.year))
      .y0(d => y(d[0]))
      .y1(d => y(d[1]));

    // TODO:
    //   Temporary.
    const toolTip = svg
      .append('text')
        .attr('x', margin.left + 10)
        .attr('y', margin.top + 10)
        .attr('opacity', 0)
        .attr('font-size', 17);

    // Visualize basic component of elements.
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
        .attr('id', 'selectYear')
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
              const x = e.x + e.dx;

              d3.select(this)  // Specify the range of dragging.
                .attr('x1', function() {
                  if (x < margin.left) {
                    return margin.left;
                  } else if (x > width - margin.right) {
                    return width - margin.right;
                  } else {
                    return x;
                  }
                })
                .attr('x2', function() {
                  if (x < margin.left) {
                    return margin.left;
                  } else if (x > width - margin.right) {
                    return width - margin.right;
                  } else {
                    return x;
                  }
                });
            })
            .on('end', function (e) {  // Drop the vertical line to the nearest tick.
              const x = d3.scaleLinear()  // TODO: duplicated with x.
                .domain([FILTER_YEAR_MIN, FILTER_YEAR_MAX])
                .range([margin.left, width - margin.right]);
              const xInverse = d3.scaleLinear()
                .domain([margin.left, width - margin.right])
                .range([FILTER_YEAR_MIN, FILTER_YEAR_MAX]);

              const yearSelected = Math.round(xInverse(e.x));

              d3.select(this)
                .attr('x1', x(yearSelected))
                .attr('x2', x(yearSelected));
            })
          );

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

        updateGraph('rating', loadYearToRatingData(dataFiltered));

        /* Use `mode` to specify the loaded data structure.
         */
        function updateGraph(mode, data) {
          const stackedData = d3.stack()
            .keys(Object.keys(data[0]).slice(1))
            .value((d, key) => d[key].length)
            (data);

          d3.max(data.map(d => {
            let keys = Object.keys(d).slice(1);
            let count = 0;

            keys.forEach(k => {
              count += d[k].length;
            })
            return count;
          }))

          const layers = svg.selectAll('.layers')
            .data(stackedData, d => d.key);

          y.domain([0, d3.max(data.map(d => {
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

          layers.enter()
            .append('path')
              .attr('class', 'layers')
              .attr('fill', (d, i) => color(i))
              .attr('d', area)
              .on('mouseover', function() {
                toolTip
                  .attr('opacity', 1);
                d3.selectAll('.layers')
                  .attr('opacity', 0.5);
                d3.select(this)
                  .attr('opacity', 0.8)
                  .attr('stroke', 'black');
              })
              .on('mousemove', function(_, d) {
                toolTip
                  .text(d['key']);
              })
              .on('mouseleave', function() {
                toolTip
                  .attr('opacity', 0);
                d3.selectAll('.layers')
                  .attr('opacity', 0.8)
                  .attr('stroke', 'none');
              })
              .on('click', function(_, d) {
                if (mode === 'rating') {
                  updateGraph('genre', loadYearToGenreByRatingData(d));
                } else if (mode === 'genre') {
                  updateGraph('rating', loadYearToRatingData(dataFiltered));
                }
              });
          layers.exit().remove();
        }

        function loadYearToRatingData(data) {
          const dataYearToRating = [];

          for (let year = FILTER_YEAR_MIN; year <= FILTER_YEAR_MAX; year++) {
            let item = {
              'year': year,
              'G': [],
              'PG': [],
              'PG-13': [],
              'R': []
              // 'R+': [],
              // 'Rx': []
            };
            data.forEach(row => {
              if (row['year_from'] == year) {
                if (['R', 'R+', 'Rx'].includes(row['rating'])) {
                  item['R'].push(row);
                } else {
                  item[row['rating']].push(row);
                }
              }
            });
            dataYearToRating.push(item);
          }
          return dataYearToRating;
        }

        function loadYearToGenreByRatingData(dataByRating) {
          const rating = dataByRating['key'];
          // const genres = ["Action", "Adventure", "Cars", "Comedy", "Dementia",
          //   "Demons", "Drama", "Ecchi", "Fantasy", "Game", "Harem", "Hentai",
          //   "Historical", "Horror", "Josei", "Kids", "Magic", "Martial Arts",
          //   "Mecha", "Military", "Music", "Mystery", "Parody", "Police",
          //   "Psychological", "Romance", "Samurai", "School", "Sci-Fi", "Seinen",
          //   "Shoujo", "Shoujo Ai", "Shounen", "Shounen Ai", "Slice of Life",
          //   "Space", "Sports", "Super Power", "Supernatural", "Thriller",
          //   "Vampire", "Yaoi", "Yuri"];
          const genres = ['Action', 'Adult', 'Adventure', 'Comedy', 'Drama',
                          'Fantasy', 'Kids', 'Romance', 'School', 'Sci-Fi',
                          'Seinen', 'Shounen', 'Slice of Life',
                          'Supernatural', 'Other'];
          // const elements = [];
          const dataYearToGenreByRating = [];

          dataByRating.forEach(d => {
            let item = {
              'year': d.data['year']
            };
            genres.forEach(genre => {
              item[genre] = [];
            });

            genres.forEach(genre => {
              d.data[rating].forEach(dd => {
                if (dd.[genre] == 1) {
                  item[genre].push(dd);
                }
              })
            });
            dataYearToGenreByRating.push(item);
          })
          return dataYearToGenreByRating;
        }
      })
  }

  render() {
    return <div id='#stream-graph'></div>;
  }
}
