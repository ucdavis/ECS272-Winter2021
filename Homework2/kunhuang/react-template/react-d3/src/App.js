import React from 'react';
import Sk_BarChart from "./Sk_BarChart";
import Sk_PieChart from "./Sk_PieChart";
import csv from  './datasets/Film_Locations_in_San_Francisco.csv';
import Sk_VoronoiDiagram from './Sk_VoronoiDiagram';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      data: csv
    };

  }

  render(){
    if(this.props.kind === "BarChart"){
      return (
        <div>
          <div id="container"> 
          </div>
          <Sk_BarChart data={this.state.data} width={700} height={200} />
        </div>
      );
    }else if(this.props.kind === "PieChart"){
      return (
        <div>
          <div id="container_pie"> 
          </div>
          <Sk_PieChart data={this.state.data} width={600} height={400} />
        </div>
      );
    }else if(this.props.kind === "VoronoiDiagram"){
      return (
        <div>
          <div id="container_VoronoiDiagram"> 
          </div>
          <Sk_VoronoiDiagram data={this.state.data} width={800} height={800} />
        </div>
      );
    }
    
    return (
      <div></div>
    );

  }

}

export default App;
