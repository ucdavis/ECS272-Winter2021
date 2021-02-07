import React from 'react';
import data from  './datasets/Los_Angeles_International_Airport_Passenger_Traffic_By_Terminal.csv';
import './App.css';
import FocusView from './FocusView';
import ContextView from './ContextView';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      data: data,
      id: "chart-1",
    }
  }
  
  render(){
    return (
      <div className="App">
        <h2>Homework 2 - Jinyoung Pung</h2>
        <div id="ckboxes">
            <input id="ckbox1" type="checkbox" name="terminal" value="Terminal_1"/>
            <label for="ckbox1">Terminal 1</label>
            <input id="ckbox2" type="checkbox" name="terminal" value="Terminal_2"/>
            <label for="ckbox2">Terminal 2</label>
            <input id="ckbox3" type="checkbox" name="terminal" value="Terminal_3"/>
            <label for="ckbox3">Terminal 3</label>
            <input id="ckbox4" type="checkbox" name="terminal" value="Terminal_4"/>
            <label for="ckbox4">Terminal 4</label>
            <input id="ckbox5" type="checkbox" name="terminal" value="Terminal_5"/>
            <label for="ckbox5">Terminal 5</label>
            <input id="ckbox6" type="checkbox" name="terminal" value="Terminal_6"/>
            <label for="ckbox6">Terminal 6</label>
            <input id="ckbox7" type="checkbox" name="terminal" value="Terminal_7"/>
            <label for="ckbox7">Terminal 7</label>
            <input id="ckbox8" type="checkbox" name="terminal" value="Terminal_8"/>
            <label for="ckbox8">Terminal 8</label>
            <input id="ckbox9" type="checkbox" name="terminal" value="Imperial_Terminal"/>
            <label for="ckbox9">Imperial</label>
            <input id="ckbox10" type="checkbox" name="terminal" value="Misc_Terminal"/>
            <label for="ckbox10">Misc.</label>
            <input id="ckbox11" type="checkbox" name="terminal" value="TB_Int_Terminal"/>
            <label for="ckbox11">TB Int.</label>
          </div><br></br>
        <div id="contextView">
          <div id="stkBar"></div>
          <div id="stk_legend"></div>
        </div>
        <h3 id="selectTerminal">Show traffic pattern of specific terminal: </h3>
        <div id="focusView">
          <div id="groupBar"></div>
          <div id="radarChart"></div>
        </div>
        <ContextView data={this.state.data} width={this.state.width} height={this.state.height} />
        <FocusView data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }

}

export default App;
