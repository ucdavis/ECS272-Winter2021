import React from 'react';
import SpiderPlot from './SpiderPlot';
import ScatterPlot from './ScatterPlot';
import dataGenre from  './datasets/data_by_genres.csv';
import dataYear from './datasets/data_by_year.csv';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      dataYear: dataYear,
      dataGenre: dataGenre,
      id: "chart-1"
    }
  }



  render(){
    return (
      <div className="App">
        <h2>ECS 272 Assignment 3 D3 Template</h2>
        <div id="container"> 
        <div id="tooltip">asdasdssss</div>
        </div>
        <ScatterPlot data={this.state.dataYear} />
        <SpiderPlot data={this.state.dataGenre} />
      </div
 >   );
  }

}

export default App;
