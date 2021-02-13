import React from 'react';
import BarChart from './BarChart';
import GeoChart from './GeoChart';
import LineChart from './LineChart';
import StackedAreaChart from './StackedAreaChart';
import ParallelCoordChart from './ParallelCoordChart';
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
      //id: "chart-1"
    }
  }

  render(){
    return (
      <div className="App">
        <h2>ECS 272 Assignment 3 - Jeremy Lin</h2>
        <div id="container"> 
        <div id="tooltip"></div>
        </div>
        <div id="map"></div>
        <div class="info">Attempted Choropleth map of crime over each district</div>
        <GeoChart mapData={this.state.worldData} pdData={this.state.pdData}/>
        <div class="info">Line Chart of Crime Incidents in SanFrancisco over each month in 2016</div>
        <LineChart data={this.state.pdData}/>
        <div class="info">Parallel Coord Chart of Crime Incidents in SanFrancisco </div>
        <ParallelCoordChart data={this.state.pdData}/>
        {/* <div class="info">Stacked Area Chart of Crime Incidents in SanFrancisco </div> */}
        {/* <StackedAreaChart data={this.state.pdData}/>  //NOT IMPLEMENTED   */}
        {/* <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />   */}
      </div>
    );
  }

}

export default App;
