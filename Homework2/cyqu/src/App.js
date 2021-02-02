import React from 'react';

import TotalVote from './TotalVote';
import data from  './datasets/SF_Historical_Ballot_Measures.csv';
import './App.css';
import Topics from "./Topics";
import ArcDiagram from "./ArcDiagram";

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
        <h2>ECS 272 Assignment 3 CYQU</h2>
        <div id="container"> 
        <div id="tooltip"></div>
        </div>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <TotalVote data={this.state.data} width={this.state.width} height={this.state.height} />

          {/* eslint-disable-next-line react/jsx-no-undef */}

          {/* eslint-disable-next-line react/jsx-no-undef */}

          <Topics data={this.state.data} width={this.state.width} height={this.state.height} />
          <ArcDiagram data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>

    );
  }

}

export default App;
