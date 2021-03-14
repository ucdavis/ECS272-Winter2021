import React from "react";
import WaterTank from "./WaterTank";
import Wells from "./Wells";
import Pipes from "./Pipes";
import Droplet from "./Droplets";
import background from "./imgs/newspaper2.png";

const NewsFlow = (props) => {
  //console.log("props in NewsFlow", props);
  console.log("props in NewsFlow2", props.data);
  //console.log("props[0] in NewsFlow2", (props.data)[1]);



  return (

    <  >
      <WaterTank data={props}/>
      <Wells data={props.data} />
      <Pipes month={props.data.month} day={props.data.day} data={props.data.data} setValFunc={props.data.setValFunction} setWellFunc={props.data.setWellIdValFunction} wellsGauge={props.data.wellsGauge} drawPipeBool={props.data.drawPipeBool} parentLevel={props.data.parentLevel} filteredData={props.data.wellSelectedData} indexSlideNumber={props.data.indexSlideNumber}/>

    </>
  );
};

export default NewsFlow;