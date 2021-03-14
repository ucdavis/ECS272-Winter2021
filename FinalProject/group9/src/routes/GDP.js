import React from 'react';
import GDP_chart from './GDP_chart';
import './GDP.css';

class GDP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "chart-1"
    }
  }

  render() {
    return (
      <div className="App">
        <h2> Military Expenditure and GDP By Year </h2>
        <div id="manual">
          <p>Press 'start' button to play the animation. Press 'stop' to stop at a certain year.</p>
          <p>Double-click or spin the wheel to zoom, then click-and-drag to pan (translate).
             Hover your mouse over a circle for info. ( GDP/ Military Expenditure/ country )</p>
        </div>
        <div id="slider">
          <label for="nyears"> Year = <span id="nyears-value">...</span> </label>
          <input id="nyears" type="range" name="years" min="1960" max="2018"></input>
          <button type="button" id="start">start</button>
          <button type="button" id="stop">stop</button>
        </div>

        <div id="container">
          <div id="tooltip2"></div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <GDP_chart data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }

}

export default GDP;
