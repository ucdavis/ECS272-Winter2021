import React from 'react';
import DonutChart from './DonutChart.js';
import data from  './datasets/Police_Department_Incidents_-_Previous_Year__2016_.csv';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      data: data,
      id: "chart-1"
    }
  }

  render(){
    return (
      <div className="App">
        <h2>ECS 272 Assignment 3 D3 Template</h2>
        <div id="container"> 
        <div id="tooltip"></div>
        </div>
        <DonutChart data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }

}

export default App;
