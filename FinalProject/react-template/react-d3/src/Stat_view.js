import React from 'react';
import "./Stat_view.css";
import * as d3 from "d3";
import { index } from 'd3';


class ImageSKY extends React.Component{
  constructor(props){
    super(props);



  }


  get_url_param(){
    let url = new URL(window.location.href);
    let start = url.searchParams.get("start");
    return {
        start: start
    };
  }



  draw_sk_tetris(){


  }



  render(){
    let start = this.get_url_param()["start"];
    if(start == "Geo"){
        return (
          <div className="GeoSKYPageLayout">
          <h1 className="header">Tetris Sky</h1>
          <div className="SKYcontainer">
            <div className="SKY">
    
            </div>


          </div>
        </div>

            );
    }else{
        return (
            <div className="PCSKYPageLayout">
              <h1 className="header">Tetris Sky</h1>
              <div className="SKYcontainer">
                <div className="SKY">
        
                </div>
              </div>
            </div>
            );        
    }


  }

}

export default ImageSKY;