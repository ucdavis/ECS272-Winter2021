import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const margin = {
  top: 20,
  right: 50,
  bottom: 80,
  left: 50,
};

const Droplet = (props) => {
  // Example: https://github.com/blakechi/ECS272-Winter2021/blob/main/Homework3/pwchi/src/components/BarChart.jsx

  const ref = useRef();
  //const width, height; // define here or from props
  const width = window.innerWidth;
  const height =  0;

  useEffect(() => {
    // d3 drawing function
    // drawPipe(dependency);
    drawDroplets();
  }, []); // put dependency in []


  function drawDroplets(){
    console.log("drawing droplets")
    const svg = d3.select(ref.current);
    var wellsDivHeight =  document.getElementById("wells").clientHeight;
    svg.attr("transform", "translate(" + 0 + "," + (window.innerHeight * 0.625 * -1) + ")");
    svg.attr("viewBox", function(){
      var toolbarHeight = document.getElementById("toolBar").getBoundingClientRect();
      //var newHeight = window.innerHeight * 0.625 - toolbarHeight.height;
      var currentWidth = window.innerWidth;
      var str = "0 0 " + currentWidth + " " + 10;
      console.log("str = ", str);
      return str;
    })
  }

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
    </svg>
  );
};

export default Droplet;