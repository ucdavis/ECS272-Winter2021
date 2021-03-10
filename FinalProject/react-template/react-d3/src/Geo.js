import React from 'react';
import "./Geo.css";
import MapContainer from "./ggmap";

class Geo extends React.Component{
  constructor(props){
    super(props);
    // this.state ={
    //   data: csv
    // };
    
  }


  render(){
    
    return (
    <div className="geoPageLayout">
      <h1 className="header">GeoOvervew</h1>
      <div className="GMcontainer">
        <div className="map">
          <MapContainer/>
        </div>
      </div>
    </div>
    );

  }

}

export default Geo;
