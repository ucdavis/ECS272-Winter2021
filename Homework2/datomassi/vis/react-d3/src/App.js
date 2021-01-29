import React from 'react';
import SpiderPlot from './SpiderPlot';
import ScatterPlot from './ScatterPlot';
import RadialChart from './RadialChart';
import dataGenre from  './datasets/data_by_genres.csv';
import dataYear from './datasets/data_by_year.csv';
import dataArtist from './datasets/data_by_artist.csv';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      dataYear: dataYear,
      dataGenre: dataGenre,
      dataArtist: dataArtist,
      id: "chart-1"
    }
  }

//         <div id="scatter"> <ScatterPlot data={this.state.dataYear} /> </div>
        // <div id="spider"> <SpiderPlot data={this.state.dataGenre} /></div>

  render(){
    return (
      <div className="App">
        <h2>ECS 272 Assignment 3 D3 Template</h2>
        <div id="container"> 

        <div id="tooltip">asdasdssss</div>
        </div>
        <div id="scatter"> <ScatterPlot data={this.state.dataYear} /> </div>
        <div id="wrapper">
        <div id="spider"> <SpiderPlot data={this.state.dataGenre} /></div>
        <div id="radial"> <RadialChart data={this.state.dataArtist} /></div>
        </div>
      </div>   
      );
  }

}

export default App;
