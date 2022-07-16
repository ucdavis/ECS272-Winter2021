import React from 'react';
import "./Stat_view.css";
import * as d3 from "d3";
import { index } from 'd3';

import BarChart2 from './BarChart2';


class Stat_view extends React.Component{
  constructor(props){
    super(props);

    this.state={
      width:"100%",
      height:"100%"
    }

  }


  get_url_param(){
    let url = new URL(window.location.href);
    return {
        start: url.searchParams.get("start"),
        iso:url.searchParams.get("iso")
    };
  }



  render(){
    let url_info = this.get_url_param();
    let start = url_info["start"];
    if(start == "Geo"){
        return (
          <div className="GeoSKYPageLayout">
          <h1 className="header">Scatter Line</h1>
          <div className="SKYcontainer">
            <div className="SKY">
                <div id="tooltip"></div>
                <BarChart2 width={this.state.width} height={this.state.height} iso={url_info["iso"]}/>
            </div>
            <a className="stat_view_home" href={"/Stat_view_second?start=Geo&iso="+url_info["iso"]}>Next</a>
          </div>
        </div>

            );
    }else{
        return (
            <div className="PCSKYPageLayout">
              <h1 className="header">Scatter Line</h1>
              <a className="stat_view_home" href={"/Stat_view_second?start=Parall&iso="+url_info["iso"]}>Next</a>
              <div className="SKYcontainer">
                <div className="SKY">
                  <div id="tooltip"></div>
                  <BarChart2 width={this.state.width} height={this.state.height} iso={url_info["iso"]}/>
                  </div>
                </div>
            </div>
            );        
    }


  }

}

export default Stat_view;