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
        <h2>Number of Dispute</h2>
        <div id="container2">           </div>    
        <div id="tooltip"></div>
        <div id="imgs">
        <img
          src={ azer }
          width='300'
          height='200'
          alt='testA'/>

<img
          src={ iraq }
          width='300'
          height='200'
          alt='testA'/>

<img
          src={ isis }
          width='300'
          height='200'
          alt='testA'/>


        </div>

        <AreaChart data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>


    );
  }

}

export default App;
