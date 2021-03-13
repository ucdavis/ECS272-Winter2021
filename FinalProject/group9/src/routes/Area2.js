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
        <h4>The cumulative area chart shows the increasing number of global alliances over time. </h4>

    <div id ="rows">

        <div id="container2"></div>   
        <div id="emptybox"></div> 

        <div id="imgs">
        <h4>Examples of security cooperation</h4>
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
      </div>


    );
  }

}

export default App;
