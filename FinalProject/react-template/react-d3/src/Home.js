import React from 'react';
import "./Home.css";


class Home extends React.Component{
  constructor(props){
    super(props);
    // this.state ={
    //   data: csv
    // };

  }


  render(){
    
    return (
      <div className="pageLayout">
          <div className="leftView" onClick={()=>{
             window.location.replace("/geoOverview");
          }}>
            <header>Geographical context view</header>
          </div>

          <div className="rightView" onClick={()=>{
             window.location.replace("/parallelCoordinate");
          }}>
            <header>Parallel coordinate view</header>
          </div>

      </div>
    );

  }

}

export default Home;