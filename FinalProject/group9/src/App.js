import React from 'react';
import Threats from './Threats';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      id: "chart-1"
    }
  }

  render(){
    return (
      <div className="App">
        <h2>ECS 272 Assignment 3 D3 Template</h2>
        <div id = "vis">
          <div id="container"> </div>
          <div id="focus"></div>
        </div>
        <Threats/>
      </div>
    );
  }

}

export default App;
