import React from 'react';
import "./Stat_view.css";
import * as d3 from "d3";
import { index } from 'd3';

import BarChart3 from './BarChart3';


class Stat_view_second extends React.Component{
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



  draw_sk_tetris(){


  }



  render(){
    let url_info = this.get_url_param();
    let start = url_info["start"];
    if(start == "Geo"){
        return (
          <div className="GeoSKYPageLayout">
          <h1 className="header">Bar Chart</h1>
          <div className="SKYcontainer">
            <div className="SKY">
                <div id="tooltip2"></div>
                <BarChart3 width={this.state.width} height={this.state.height} iso={url_info["iso"]}/>
            </div>


          </div>
        </div>

            );
    }else{
        return (
            <div className="PCSKYPageLayout">
              <h1 className="header">Bar Chart</h1>
              <div className="SKYcontainer">
                <div className="SKY">
                  <div id="tooltip2"></div>
                  <BarChart3 width={this.state.width} height={this.state.height} iso={url_info["iso"]}/>
                </div>
              </div>
            </div>
            );        
    }


  }

}

export default Stat_view_second;