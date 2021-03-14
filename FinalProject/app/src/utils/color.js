import * as d3 from 'd3';

/*
 * Input: Int between 0 and 19.
 * Output: A color, e.g. `attr('fill', color[0])``
 */
export const colorByRating = d3.scaleOrdinal()
  .domain(['G', 'PG', 'PG-13', 'R'])
  .range(['#c7c7c7',
          '#bcbd22',
          '#dbdb8d',
          '#17becf']);

export const colorByGenre = d3.scaleOrdinal()
  .domain(['Action', 'Adult', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
           'Kids', 'Romance', 'School', 'Sci-Fi', 'Seinen', 'Shounen',
           'Slice of Life', 'Supernatural', 'Other'])
  .range(['#1f77b4',
          '#aec7e8',
          '#ff7f0e',
          '#ffbb78',
          '#2ca02c',
          '#98df8a',
          '#d62728',
          '#ff9896',
          '#9467bd',
          '#c5b0d5',
          '#8c564b',
          '#c49c94',
          '#e377c2',
          '#f7b6d2',
          '#7f7f7f']);
