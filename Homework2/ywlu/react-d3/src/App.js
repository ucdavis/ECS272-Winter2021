import React from 'react';
import BarChart4 from './BarChart4';
import BarChart3 from './BarChart3';
import BarChart2 from './BarChart2';
import data from  './datasets/globalterrorismdb_0718dist.csv';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      data: data,
      id: "chart-1"
    }
  }

    /**
     * Yinwen Lu
     * 2021/2/2
     * Code may contain segment from template or online references
     */
  render(){

    return (
      <div className="App">
        <h2>Global Terro-activities data visualization</h2>
        <div id="container">

        <div id="tooltip" opacity="0.5"></div>

        </div>
      <p>Select scatter line to display:</p><select id="selectButton"></select>

          <p>Select number of terro-groups to display:</p>
          <button type="button" id = "button1">Top5</button>
          <button type="button" id = "button2">Top10</button>
          <button type="button" id = "button3">Top15</button>

          <BarChart2 data={this.state.data} width={this.state.width} height={this.state.height} />
          <BarChart3 data={this.state.data} width={this.state.width} height={this.state.height} />
          <BarChart4 data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>

    );
  }

}

export default App;
