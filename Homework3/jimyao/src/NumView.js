import React, {Component} from 'react';
import * as d3 from "d3";

class NumView extends Component{

  componentDidMount(){
    console.log("NumView");
    this.drawChart();
  }

  drawChart(){
    var years = [];
    for(var i=1921; i<= 2020; i++) {
      years.push(i);
    }

    console.log(years);
    // Parse the Data
    d3.csv(this.props.data).then((data)=>{
      
    });

    


  }

  render(){
    return (
      <div id={this.props.id}>FUCK YOU!!!</div>
    );
  }
}

export default NumView;