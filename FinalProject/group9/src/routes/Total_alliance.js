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
            <h2>Global cooperations</h2>
              <div id="manual">
               <p>Explore formal alliances among countries effective by 2012.</p>
               <p>Light-blue colored packing circles represent each alliance, and the blue circles in them represent the associated countries. The size of each blue circle shows the relative magnitude of the military expenditure of that country. You can zoom into a specific alliance for detailed view with a click, and zoom out if you click it again.</p>
              </div>
            <div id="container"> </div>
            <Total_alliance_chart/>
        </div>
      );
    }
  
  }
  
  export default Total_alliance;
  