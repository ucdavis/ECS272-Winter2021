import React from 'react';
import Total_alliance_chart from './Total_alliance_chart';
import './Total_alliance.css';

class Total_alliance extends React.Component{
    constructor(props){
      super(props);
      this.state ={
        id: "chart-1"
      }
    }
  
    render(){
      return (
        <div className="App">
            <h2>Global Cooperations</h2>
            <div id="container"> </div>
            <Total_alliance_chart/>
        </div>
      );
    }
  
  }
  
  export default Total_alliance;
  