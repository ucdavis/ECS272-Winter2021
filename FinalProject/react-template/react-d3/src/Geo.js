import React from 'react';
import "./Geo.css";
import Ggmap from "./Ggmap";

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
        <Ggmap/>
    </div>
    );

  }

}

export default Geo;
