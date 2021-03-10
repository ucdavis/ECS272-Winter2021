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
        <div id="manual">
          <p>Explore military disputes of specific countries from 1991 to 2014</p>
          <p>Click a country to show its information. The blue circle represents the selected country and the red circles represent the countries that had military disputes with the selected one.  The size of each circle shows the relative magnitude of the military expenditure of each country. You can see the names of countries and military expenditures by hovering your mouse on each circle. You can also pan and zoom or click the ocean to reset to the initial state.</p>
        </div>
        <div id = "vis">
          <div id="container"> </div>
        </div>
        <Threat_chart/>
      </div>
    );
  }

}

export default Threat;
