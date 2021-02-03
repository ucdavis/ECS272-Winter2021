import React from 'react';
import BarChart from './BarChart';
import data from  './datasets/SF_Historical_Ballot_Measures.csv';
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
        <h2>ECS 272 HW 2</h2>
        <div id="container"> 
        <div id="tooltip"></div>
        </div>
        <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }

}

export default App;
