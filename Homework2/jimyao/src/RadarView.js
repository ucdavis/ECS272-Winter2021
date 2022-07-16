import React, {Component} from 'react';
import Radar from 'react-d3-radar';
import * as d3 from "d3";

class RadarView extends Component{
  componentDidMount(){
    console.log("RadarView");
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
      <Radar
        width={500}
        height={500}
        padding={70}
        domainMax={10}
        highlighted={null}
        onHover={(point) => {
          if (point) {
            console.log('hovered over a data point');
          } else {
            console.log('not over anything');
          }
        }}
        data={{
          variables: [
            {key: 'resilience', label: 'Resilience'},
            {key: 'strength', label: 'Strength'},
            {key: 'adaptability', label: 'Adaptability'},
            {key: 'creativity', label: 'Creativity'},
            {key: 'openness', label: 'Open to Change'},
            {key: 'confidence', label: 'Confidence'},
          ],
          sets: [
            {
              key: 'me',
              label: 'My Scores',
              values: {
                resilience: 4,
                strength: 6,
                adaptability: 7,
                creativity: 2,
                openness: 8,
                confidence: 1,
              },
            },
            {
              key: 'everyone',
              label: 'Everyone',
              values: {
                resilience: 10,
                strength: 8,
                adaptability: 6,
                creativity: 4,
                openness: 2,
                confidence: 0,
              },
            },
          ],
        }}
      />
    );
  }
}

export default RadarView;