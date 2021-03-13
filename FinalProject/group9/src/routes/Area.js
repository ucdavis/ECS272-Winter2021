import React from 'react';
import AreaChart from './AreaChart';
import azer from '../img/azer.png';
import iraq from '../img/iraq.png';
import isis from '../img/isis.png';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      id: "chart-1"
    }
  }

  render(){
    return (
      <div className="App">
        <h2>Global dispute continues to rise</h2>
        <div id="manual">
          <p id="areachart_label">The cumulative area chart shows the increasing number of global disputes over time. </p>
        </div>

    <div id ="rows">
 
        <div id="container2"></div>   
        <div id="emptybox"></div> 

        <div id="imgs">
        <p>Examples of Global Conflict</p>
        <img
          src={ azer }
          width='400'
          height='180'
          alt='azer'/>

        <img
          src={ iraq }
          width='400'
          height='180'
          alt='iraq'/>

        <img
          src={ isis }
          width='400'
          height='180'
          alt='isis'/>


        </div>
    </div>
        <AreaChart data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>


    );
  }

}

export default App;
