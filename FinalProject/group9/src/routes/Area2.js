import React from 'react';
import AreaChart2 from './AreaChart2';
import EU from '../img/EU.png';
import ctf151 from '../img/ctf151.png';
import RIMPAC from '../img/RIMPAC.png';


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
        <h2>Growing importance of global alliances</h2>
        <br></br>
        <br></br>
        <div id="manual">
          <p id="areachart_label">The cumulative area chart shows the increasing number of global alliances over time. </p>
        </div>

    <div id ="rows">

        <div id="container2"></div>   
        <div id="emptybox"></div> 

        <div id="imgs">
        <p>Examples of security cooperation</p>
        <img
          src={ ctf151 }
          width='400'
          height='180'
          alt='ctf151'/>

        <img
          src={ EU }
          width='400'
          height='180'
          alt='EU'/>

        <img
          src={ RIMPAC }
          width='400'
          height='180'
          alt='RIMPAC'/>


        </div>
    </div>
        <AreaChart2 data={this.state.data} width={this.state.width} height={this.state.height} />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>


    );
  }

}

export default App;
