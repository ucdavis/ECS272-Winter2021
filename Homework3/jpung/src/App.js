import React from 'react';
import data from  './datasets/pokemon_alopez247.csv';
import './App.css';
import Paracoord from './Paracoord';
import Zoomable from './ZoomableBar';
import Transition from './TransBar';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      data: data,
      id: "chart-1",
    }
  }
  
  render(){
    return (
      <div className="App">
        <h2>1st Generation Pokemon Base Stats - Jinyoung Pung</h2>
        <div id="inputs">
          <label for="quantity">Input Pokemon No. to show base stats (between 1 and 151): </label>
          <input type="number" id="quantity" name="quantity" min="1" max="151"></input>
        </div>
        <div id="row_1">
          <div id="paracoord"></div>
          <div id="transBar"></div>
        </div>
        <div id="row_2">
          <div id="zoomableBar"></div>
        </div>
        <Paracoord data={this.state.data} width={this.state.width} height={this.state.height} />
        <Zoomable data={this.state.data} width={this.state.width} height={this.state.height} />
        <Transition data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }

}

export default App;
