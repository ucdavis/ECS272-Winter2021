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
        <h2>Number of Dispute</h2>
        <div id="container2">           </div>    
        <div id="tooltip"></div>
        <div id="imgs">
        <img
          src={ EU }
          width='300'
          height='150'
          alt='testA'/>

<img
          src={ ctf151 }
          width='300'
          height='150'
          alt='testA'/>

<img
          src={ RIMPAC }
          width='300'
          height='150'
          alt='testA'/>


        </div>

        <AreaChart2 data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>


    );
  }

}

export default App;
