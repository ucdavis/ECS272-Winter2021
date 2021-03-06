import React from 'react';
import Threat_chart from './Threat_chart';
import './Threat.css';

class Threat extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      id: "chart-1"
    }
  }

  render(){
    return (
      <div className="App">
        <h2>Disputes map</h2>
        <div id = "vis">
          <div id="container"> </div>
        </div>
        <Threat_chart/>
      </div>
    );
  }

}

export default Threat;
