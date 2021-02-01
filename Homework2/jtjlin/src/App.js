import React from 'react';
import BarChart from './BarChart';
import GeoChart from './GeoChart';
import BrushChart from './BrushChart';
import data from  './datasets/SF_Historical_Ballot_Measures.csv';
import PDdata from './datasets/Police_Department_Incidents_-_Previous_Year__2016_.csv';
import worldmapData from './san-francisco.geo.json'; //'./NorthAmerica.geo.json'; //'./SanFrancisco.Neighborhoods.json';
import './App.css';



class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={ //data that can change. passed down to child components as props
      //data: data,
      pdData: PDdata,
      worldData: worldmapData,
      id: "chart-1"
    }
  }

  render(){
    return (
      <div className="App">
        <h2>ECS 272 Assignment 2 - Jeremy Lin</h2>
        <div id="container"> 
        <div id="tooltip"></div>
        </div>
        {/* <BarChart data={this.state.data} width={this.state.width} height={this.state.height} /> */}
        <div class="info">Hover over a country</div>
        <GeoChart mapData={this.state.worldData} pdData={this.state.pdData}/>
        {/* <BrushChart data={this.state.PDdata}/>       */}
      </div>
    );
  }

}

export default App;
