import React from 'react';
import Threat_chart from './Alliance_chart';
import './Alliance.css';

class Alliance extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      id: "chart-1"
    }
  }

  render(){
    return (
      <div className="App">
        <h2>Alliances vs Threats</h2>
          <div id="container"> </div>
        <Threat_chart/>
      </div>
    );
  }

}

export default Alliance;
