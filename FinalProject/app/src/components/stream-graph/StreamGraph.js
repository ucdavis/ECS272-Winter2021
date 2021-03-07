import React from 'react';

import * as d3 from 'd3';

import './StreamGraph.css';
import csvYearGenre from '../../data/processed_year_genre.csv';
import csvYearRating from '../../data/processed_year_rating.csv';

export default class StreamGraph extends React.Component {

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    d3.csv(csvYearRating)
      .then(data => {
        // Filter animes that are before 1960.
        const dataFiltered = [];
        data.forEach(d => {
          if (d['year'] >= 1980 & d['year'] < 2019) {
            dataFiltered.push(d);
          }
        })
        data = dataFiltered;

        const genres = Object.keys(data[0]).slice(1);

        const width = 1000,
              height = 500,
              margin = {top: 100, right: 100, bottom: 100, left: 100};

        const svg = d3.select('#container')
          .append('svg')
            .attr('width', width)
            .attr('height', height);

        const x = d3.scaleLinear()
          .domain(d3.extent(data.map(x => Number(x['year']))))
          .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
          .domain([0, 1000])
          .range([height - margin.bottom, margin.top]);

        const color = d3.scaleOrdinal()
          .domain([0, genres.length])
          .range(d3.schemeDark2);

        const stackedData = d3.stack()
          .keys(genres)
          (data);

        const area = d3.area()
          .x(d => x(d.data.year))
          .y0(d => y(d[0]))
          .y1(d => y(d[1]));

        svg
          .append('g')
            .call(d3.axisBottom(x))
            .attr('transform', 'translate(0,' + (height - margin.bottom) + ')');

        svg
          .append('g')
            .call(d3.axisLeft(y))
            .attr('transform', 'translate(' + (margin.left) + ',0)');

        svg.selectAll('.layers')
          .data(stackedData)
          .enter()
          .append('path')
            .attr('class', 'layers')
            .attr('fill', (d, i) => color(i))
            .attr('d', area);
      })
  }

  render() {
    return <div id='#stream-graph'></div>;
  }
}
