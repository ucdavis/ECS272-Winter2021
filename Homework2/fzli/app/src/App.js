/*
* @Author: fangzhouli
* @Date:   2021-01-23 16:11:19
* @Last Modified by:   fangzhouli
* @Last Modified time: 2021-01-31 16:49:44
*/
import React from 'react';

import Pie from './views/pie';
import Bar from './views/bar';
import Parallel from './views/parallel';

import './App.css';
import data from  './datasets/SF_Historical_Ballot_Measures.csv';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
  }

  render() {
    return (
      <div className="App">
        <h2>SF Historical Ballot Measures Dashboard</h2>
        <div id="container" height={800}>
          <div className='column' id='basic'>
            <div id='piePlot'></div>
            <div id='barPlot'></div>
          </div>
          <div className='column' id='advanced'>
            <div id='parallelPlot'></div>
          </div>
          <Pie data={this.state.data} />
          <Bar data={this.state.data} />
          <Parallel data={this.state.data} />
        </div>
      </div>
    );
  }

}
