import React from 'react';

import * as d3 from 'd3';

import './StreamGraph.css';
import csv from '../../data/processed.csv';
import csvYearGenre from '../../data/processed_year_genre.csv';
import csvYearRating from '../../data/processed_year_rating.csv';

export default class StreamGraph extends React.Component {

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {

    // Constants.
    const width = 1000,
          height = 500,
          margin = {top: 100, right: 100, bottom: 100, left: 100};
    const FILTER_YEAR_MIN = 1980,
          FILTER_YEAR_MAX = 2018;

    d3.csv(csv)
      .then(data => {

        // Filter animes that are before 1960.
        const dataFiltered = [];
        data.forEach(d => {
          if (d['year_from'] >= FILTER_YEAR_MIN & d['year_from'] <= FILTER_YEAR_MAX) {
            dataFiltered.push(d);
          }
        })

        const svg = d3.select('#container')
          .append('svg')
            .attr('width', width)
            .attr('height', height);
        const x = d3.scaleLinear()
          .domain([FILTER_YEAR_MIN, FILTER_YEAR_MAX])
          .range([margin.left, width - margin.right]);
        const y = d3.scaleLinear()
          .range([height - margin.bottom, margin.top]);
        const color = d3.scaleOrdinal(d3.schemeCategory10);
        const area = d3.area()
          .x(d => x(d.data.year))
          .y0(d => y(d[0]))
          .y1(d => y(d[1]));
        const toolTip = svg
          .append('text')
            .attr('x', margin.left + 10)
            .attr('y', margin.top + 10)
            .attr('opacity', 0)
            .attr('font-size', 17);

        svg
          .append('g')
            .call(d3.axisBottom(x))
            .attr('transform', 'translate(0,' + (height - margin.bottom) + ')');

        svg
          .append('g')
            .attr('id', 'y-axis')
            .attr('transform', 'translate(' + (margin.left) + ',0)');

        updateGraph('rating', loadYearToRatingData(dataFiltered));

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
          const genres = ['Action', 'Adventure', 'Comedy', 'Drama',
            'Slice of Life', 'Fantasy', 'Magic', 'Supernatural', 'Horror',
            'Mystery', 'Psychological', 'Romance', 'Sci-Fi'];
          const elements = [];
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
