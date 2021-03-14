import React from 'react';
import "./ParallelCoordinate.css";
import BarChart4 from "./BarChart4";

class ParallelCoordinate extends React.Component{
  constructor(props){
    super(props);
    // this.state ={
    //   data: csv
    // };

  }

  render(){
    
    return (
    <div className="PCpageLayout">
      <h1 className="header">Parallel Coordinate</h1>
      <div className="PCcontainer">
      <a className="google_map_home" href="/geoOverview">Map</a>
        <div className="PC">
          <BarChart4/>
        </div>
      </div>
    </div>
    );

  }

}

export default ParallelCoordinate;
