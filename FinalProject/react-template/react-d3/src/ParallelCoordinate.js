import React from 'react';
import "./ParallelCoordinate.css";


class ParallelCoordinate extends React.Component{
  constructor(props){
    super(props);
    // this.state ={
    //   data: csv
    // };

  }

  render(){
    
    return (
    <div className="pageLayout">
      <h1 className="header">Parallel Coordinate</h1>
      <div className="PCcontainer">
        <div className="PC">

        </div>
      </div>
    </div>
    );

  }

}

export default ParallelCoordinate;
