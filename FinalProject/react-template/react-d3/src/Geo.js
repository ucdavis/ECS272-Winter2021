import React from 'react';
import "./Geo.css";


class Geo extends React.Component{
  constructor(props){
    super(props);
    // this.state ={
    //   data: csv
    // };

  }

  render(){
    
    return (
    <div className="pageLayout">
      <h1 className="header">GeoOvervew</h1>
      <div className="GMcontainer">
        <div className="map">

        </div>
      </div>
    </div>
    );

  }

}

export default Geo;
