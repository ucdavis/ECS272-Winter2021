import React from 'react';
import BarChart from './BarChart';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      data: [12, 5, 6, 6, 9, 10],
      width: 700,
      height: 500,
      id: 'root'
    }
  }

  render(){
    return (
      <div className="App">
        <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }

}

export default App;
