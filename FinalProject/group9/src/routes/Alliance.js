import React from 'react';
import Alliance_chart from './Alliance_chart';
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
        <div id="manual">
          <p>Explore the relative magnitude of military expenditures between the alliance and disputed countries. Considered military disputes from 1991 to 2014 and effective alliances by 2012</p>
          <p>Click a country to show its information. Blue circles represent alliances and the selected country itself, and red circles represent the countries that had military disputes with the selected one.  The size of each circle shows the relative magnitude of the military expenditure. You can see the names of countries and military expenditures by hovering your mouse on each circle. You can also pan and zoom or click the ocean to reset to the initial state.</p>
        </div>
        <div id="container"> </div>
        <Alliance_chart/>
      </div>
    );
  }

}

export default Alliance;
