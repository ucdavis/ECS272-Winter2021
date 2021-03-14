import React from "react";

const ToolBar = ({data, homeButton, ...rest}) => {
	//console.log("Toolbar data ", data);
  return( <>
  	<div id="toolBar">
  		<button onClick={homeButton} >Home</button>
  		<button onClick={data} id="PlayButton">Play</button>
  	</div>
  </>);
};
// or
// const ToolBar = (props) => {
//   return <></>;
// };

export default ToolBar;