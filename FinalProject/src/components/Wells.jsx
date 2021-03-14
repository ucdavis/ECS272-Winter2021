import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import {recurseNumberEventsAtLevel, getNumberEventsAtLevel}  from "./sharedFunctions";
import {liquidFillGaugeDefaultSettings, loadLiquidFillGauge}  from "./liquidFillGauge";
import {getWellsPercentage} from "./getWaterTankPercentageBasedOnMonthAndDay"
import {drawLegend}  from "./drawLegend";

const margin = {
  top: 20,
  right: 50,
  bottom: 80,
  left: 50,
};

const Wells = (props) => {
  // Example: https://github.com/blakechi/ECS272-Winter2021/blob/main/Homework3/pwchi/src/components/BarChart.jsx
    //console.log("props in wells1", props);

  const ref = useRef();
  const width = window.innerWidth;
  const height = (window.innerHeight * 0.75) *0.20; // define here or from props
  const {data2 } = props;
  //console.log("props in Wells ", props);
  const slide = props.data.indexSlideNumber;

  useEffect(() => {
    // d3 drawing function
    if(props.data.indexSlideNumber < 6){
      console.log("indexSlidenUmber is 0 wells");
      d3.select(ref.current).selectAll('svg').remove('*');
    }else{

      if(props.data.indexSlideNumber == 8){

        if(props.data.parentLevel == "root"){
          console.log("in wells Parent level is root")
          var gaugeArray = drawWells(props.data.data, props.data.setDrawPipeBoolFunction, props.data.setCountFunction, props.data.setHeadingFunction, props.data.setValNegativeFunction, props.data.setParentLevelFunction, "root", props.data.setWellSelectedDataFunction, props.data.setTotalSizeAndCurrentInTankSizeFunction, props.data.restartMonthandDayFunction, props.data.indexSlideNumber);


          props.data.setGaugeWellsFunction(gaugeArray);

           setTimeout( () => {
            //Calculate percentage to fill per well
            var newWellPercentages = getWellsPercentage(6, 24, props.data.data, props.data.totalSize, props.data.parentLevel);

            let [eventsAtRoot, childrenRoot] = getNumberEventsAtLevel(props.data.parentLevel, props.data.data.news_details);

            childrenRoot.forEach(function(d,i){
              var str = "#bottomWells" + (i+1);
              d3.select(str).attr("currNumPoints",  newWellPercentages[i]);
              var newPercentage =(newWellPercentages[i]/props.data.totalSize) * 100;
              console.log("newPercentage ", newPercentage)
              gaugeArray[i].update(newPercentage);
            })
          }, 2000);


        }else{
          console.log("in wells Parent level is NOT root  for slide 8", props.data.wellSelectedData)
          var gaugeArray = drawWells(props.data.wellSelectedData, props.data.setDrawPipeBoolFunction, props.data.setCountFunction, props.data.setHeadingFunction, props.data.setValNegativeFunction, props.data.setParentLevelFunction, props.data.parentLevel, props.data.setWellSelectedDataFunction, props.data.setTotalSizeAndCurrentInTankSizeFunction, props.data.restartMonthandDayFunction, props.data.indexSlideNumber);


          props.data.setGaugeWellsFunction(gaugeArray);


            console.log("in wells Parent level is NOT root slide 8");

            var currentSize = props.data.currentInTankSize;

            setTimeout( () => {
               props.data.setValFunction(currentSize);
               props.data.setMonthFunction(6);
               props.data.setDayFunction(30);

              //Calculate percentage to fill per well
              var newWellPercentages = getWellsPercentage(6, 30, props.data.wellSelectedData, props.data.totalSize, props.data.parentLevel);

              let [eventsAtRoot, childrenRoot] = getNumberEventsAtLevel(props.data.parentLevel, props.data.wellSelectedData.news_details);

              childrenRoot.forEach(function(d,i){
                var str = "#bottomWells" + (i+1);
                d3.select(str).attr("currNumPoints",  newWellPercentages[i]);
                var newPercentage =(newWellPercentages[i]/props.data.totalSize) * 100;
                console.log("newPercentage ", newPercentage)
                gaugeArray[i].update(newPercentage);
              })
            }, 10000);

        }
      }else{
        if(props.data.parentLevel == "root"){
          console.log("in wells Parent level is root")
          var gaugeArray = drawWells(props.data.data, props.data.setDrawPipeBoolFunction, props.data.setCountFunction, props.data.setHeadingFunction, props.data.setValNegativeFunction, props.data.setParentLevelFunction, "root", props.data.setWellSelectedDataFunction, props.data.setTotalSizeAndCurrentInTankSizeFunction, props.data.restartMonthandDayFunction, props.data.indexSlideNumber);


          props.data.setGaugeWellsFunction(gaugeArray);
        }else{
          console.log("in wells Parent level is NOT root", props.data.wellSelectedData, "slide number ", props.data.indexSlideNumber)
          var gaugeArray = drawWells(props.data.wellSelectedData, props.data.setDrawPipeBoolFunction, props.data.setCountFunction, props.data.setHeadingFunction, props.data.setValNegativeFunction, props.data.setParentLevelFunction, props.data.parentLevel, props.data.setWellSelectedDataFunction, props.data.setTotalSizeAndCurrentInTankSizeFunction, props.data.restartMonthandDayFunction, props.data.indexSlideNumber);


          props.data.setGaugeWellsFunction(gaugeArray);






        }
      }






    }







  }, [props.data.data, props.data.parentLevel, props.data.indexSlideNumber]); // put dependency in []


  function drawWells(data, drawPipeBoolFunction, setCountFunction, setHeadingFunction, setValNegative, setParentLevelFunction, parentLevel, setWellSelectedDataFunction, setTotalSizeAndCurrentInTankSizeFunction, restartMonthandDayFunction, indexSlideNumber){
    const svg = d3.select(ref.current);
     d3.select(ref.current).selectAll('svg').remove('*');
     d3.select("#colorLegend").remove('*');
    console.log("drawingWells");
    console.log("data in wells2", data.news_details);

    let [eventsAtRoot, childrenRoot] = getNumberEventsAtLevel(parentLevel, data.news_details);
    console.log("eventsAtRoot = ", eventsAtRoot);
    console.log("childrenRoot = ", childrenRoot);

    var windowInnerHeight =  (window.innerHeight * 0.75) *0.20;
    var windowInnerWidth =  window.innerWidth *0.80;

    var skip = ["skip"];
    var eventNames = skip.concat(childrenRoot);

    var waveColors = ["#ffffff", "#fbdbbc", "#f8d8d9", "#daecea", "#b5d8b0", "#fbf3d5", "#e8d9e4", "#ffebed", "#d6c6bd"];
    var textColors = ["#ffffff", "#f5a85c", "#e98183", "#97c8c4", "#75b76c", "#f2d778", "#c299b7", "#ffb8bf", "#b0907d"];
    var waveTextColors = ["#ffffff", "#f8c28c", "#f0adae", "#b9dad7", "#95c78e", "#f6e5a7", "#d5b9cd","#ffd1d6","#c3ab9d"];
    var myColorWave =  d3.scaleOrdinal().domain(eventNames).range(waveColors);
    var myColorWaveText =  d3.scaleOrdinal().domain(eventNames).range(waveTextColors);
    var myColorText =  d3.scaleOrdinal().domain(eventNames).range(textColors);
    var myColor = d3.scaleOrdinal().domain(eventNames)
              .range(d3.schemeTableau10);

    var config1 = liquidFillGaugeDefaultSettings();
        config1.circleColor = "#FF7777";
        config1.textColor = "#FF4444";
        config1.waveTextColor = "#FFAAAA";
        config1.waveColor = "#FFDDDD";
        config1.circleThickness = 0.2;
        config1.waveAnimateTime = 1000;
    var toolbarHeight = document.getElementById("toolBar").getBoundingClientRect();
    var windowInnerHeightPipe =  window.innerHeight * 0.625;

    //Draw a well for each event category
    var gaugeArray = []

    //Draw color legend
    drawLegend(eventsAtRoot, childrenRoot, myColor);

    //console.log(d3.select(ref.current), "hereeeeee");

        for(var i = 0; i < eventsAtRoot; i++){
      d3.select(ref.current)
                .attr("id", "wells")
                .append('svg')
                .attr("id", "bottomWells" + (i+1))
                .attr("tagName", childrenRoot[i])
                .attr("class", "well")
                .attr('width', windowInnerWidth/eventsAtRoot)
                .attr('height', windowInnerHeight)
                .attr("currNumPoints", 0)
                //.attr("transform", "translate(" + (windowInnerWidth/4)*i + "," + 0 + ")");
                .attr("transform", "translate(" + 0 + "," + (windowInnerHeightPipe - toolbarHeight.height) + ")");

            config1.circleColor = myColor(childrenRoot[i]);
            //config1.textColor = myColorText(childrenRoot[i]);
            //config1.waveTextColor = myColorWaveText(childrenRoot[i]);
            config1.textColor = "#000000";
            config1.waveTextColor = "#808080";
            config1.waveColor = myColorWave(childrenRoot[i]);
            //console.log("color = ", myColor(childrenRoot[i]));

            var gauge = loadLiquidFillGauge( "bottomWells" + (i+1), 0, config1, (i+1), drawPipeBoolFunction, setCountFunction, setHeadingFunction, setValNegative, setParentLevelFunction, data, setWellSelectedDataFunction, setTotalSizeAndCurrentInTankSizeFunction, restartMonthandDayFunction, parentLevel, indexSlideNumber);
            gaugeArray.push(gauge);
    }//end for loop

    //console.log("gaugeArray = ", gaugeArray);

    return gaugeArray;


  }//end function

  return (
    <>
      { slide > 5 &&
        <div ref={ref} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        </div>
      }

    </>
  );
};

export default Wells;