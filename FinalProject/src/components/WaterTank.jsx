import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import {halfLiquidFillGaugeDefaultSettings, loadHalfLiquidFillGauge}  from "./halfLiquidFillGauge";
import {drawMediaSources, drawMediaSources2, drawMediaBias, drawMediaBias2}  from "./drawMediaSources";
import {getWaterTankPercentage} from "./getWaterTankPercentageBasedOnMonthAndDay"
import background from "./imgs/newspaper3.png";
import fox from "./imgs/Fox-news-logo.png";
import washington from "./imgs/the-washington-post.png";
import breitbart from "./imgs/breitbart.png";
import cnn from "./imgs/cnn.png";
import ny from "./imgs/nytimes.png";
import abc from "./imgs/abc.png";
import mediaBias from "./imgs/mediaBias.png";
import mediaBias2 from "./imgs/mediaBiasEvent.png";


const margin = {
  top: 20,
  right: 50,
  bottom: 80,
  left: 50,
};

const WaterTank = (props) => {
  // Example: https://github.com/blakechi/ECS272-Winter2021/blob/main/Homework3/pwchi/src/components/BarChart.jsx

  const ref = useRef();
 // const width, height; // define here or from props;
 const width = window.innerWidth;
 const height = (window.innerHeight * 0.75) *0.30;
 //const height2 = window.innerHeight - document.getElementById("toolBar").getBoundingClientRect().height;
 //console.log("Water Tank Props ", props);
 //console.log("Water Tank Props val ", props.data.data);
 var gauge1;
  const slide = props.data.data.indexSlideNumber;



  useEffect(() => {
    // d3 drawing function
    // drawWaterTank(dependency);


    if(props.data.data.indexSlideNumber == 0){
      console.log("INdex slide number is zero ");
      d3.select(ref.current).selectAll('g').remove('*');
      
      var toolbar = document.getElementById("toolBar").getBoundingClientRect();

      d3.select(".containerTotal").style("height", window.innerHeight - toolbar.height + "px")
      .style("width", toolbar.width + "px");


    }else if(props.data.data.indexSlideNumber == 1){
      console.log("INdex slide number is one ");
      d3.select(ref.current).selectAll('g').remove('*');
      
      var toolbar = document.getElementById("toolBar").getBoundingClientRect();

      d3.select(".containerTotal").style("height", window.innerHeight - toolbar.height + "px")
      .style("width", toolbar.width + "px");

      drawMediaSources(fox, washington,breitbart, cnn, ny, abc);



    }else if(props.data.data.indexSlideNumber == 2){
      console.log("INdex slide number is two ");
      d3.select(ref.current).selectAll('g').remove('*');
      
      var toolbar = document.getElementById("toolBar").getBoundingClientRect();

      d3.select(".containerTotal").style("height", window.innerHeight - toolbar.height + "px")
      .style("width", toolbar.width + "px");

      drawMediaSources2(fox, washington,breitbart, cnn, ny, abc);



    }else if(props.data.data.indexSlideNumber == 3){
      console.log("INdex slide number is three ");
      d3.select(ref.current).selectAll('g').remove('*');
      
      var toolbar = document.getElementById("toolBar").getBoundingClientRect();

      d3.select(".containerTotal").style("height", window.innerHeight - toolbar.height + "px")
      .style("width", toolbar.width + "px");

      drawMediaBias(mediaBias);


    }else if(props.data.data.indexSlideNumber == 4){
      console.log("INdex slide number is four ");
      d3.select(ref.current).selectAll('g').remove('*');
      
      var toolbar = document.getElementById("toolBar").getBoundingClientRect();

      d3.select(".containerTotal").style("height", window.innerHeight - toolbar.height + "px")
      .style("width", toolbar.width + "px");

      drawMediaBias2(mediaBias2);


    }else{
      if(props.data.data.count > 0 ){
        console.log("Count greater than 0");
        //console.log("props.data.data.gaugeTank after new draw", props.data.data.gaugeTank);
         updatingTank(props.data.data.gaugeTank, props.data.data.val, props.data.data.riseBoolean)
      }else if(props.data.data.val > -1){
        //console.log("drawing water tank here", props.data.data.val);
        gauge1 = drawWaterTank(props.data.data.val, props.data.data.heading);
        props.data.data.func(gauge1);
        if(props.data.data.indexSlideNumber == 8 && props.data.data.heading == "Covid-19 Articles"){
          console.log("in slide number 8 so update the tank");


          //calculate percentage left over and set values accordingly for water tank
          var updateTo = getWaterTankPercentage(6, 24, 4, 1, props.data.data.data, props.data.data.totalSize)





          setTimeout( () => {
             props.data.data.setValFunction(updateTo)
             props.data.data.setMonthFunction(6);
              props.data.data.setDayFunction(24);
          }, 2000);

        }else if(props.data.data.indexSlideNumber == 8 && props.data.data.heading != "Covid-19 Articles"){
          //draw new annotation
          
          var currentSize = props.data.data.currentInTankSize;
          console.log(" currentSize is now ", currentSize);

          //draw new water tank
          setTimeout( () => {
             props.data.data.setValFunction(currentSize);
             props.data.data.setMonthFunction(6);
              props.data.data.setDayFunction(30);
          }, 2000);


          //draw wells precentage


        }
        //console.log("gauge1 after draw", gauge1);
      }else{
        console.log("Water tank else condition");
      }
    }






    
  }, [props.data.data.val, props.data.data.heading, props.data.data.indexSlideNumber]); // put dependency in []



  function updatingTank(gauge2, val, boolean){
    //var gauge2 = d3.select(ref.current).attr("gaugeFunc");
    console.log("IN updating tank in Water Tank");
    gauge2.update(val, boolean);
  }

  function drawWaterTank(value, heading){
    console.log("Drawing WaterTank");
    d3.select(ref.current).selectAll('g').remove('*');
    //d3.select(ref.current).select('#waterTank').remove('*');
    const svg = d3.select(ref.current)
                  .attr("id", "fillgauge1")
                  .attr("colorLegendDrawn", "false");

    //Configuration of Water Tank
    var config1 = halfLiquidFillGaugeDefaultSettings();
    config1.circleColor = "#178BCA";
    config1.textColor = "#178BCA";
    config1.waveTextColor = "#5cadd9";
    config1.waveColor = "#b9dcef";
    config1.circleThickness = 0.03;
    config1.circleFillGap = 0.02;
    config1.textVertPosition = 0.25;
    config1.waveAnimateTime = 2000; //Slower waves higher number
    config1.textSize = 1;
    config1.waveCount = 3;
    config1.waveHeight = 0.03;

    //console.log("config1 ", config1);

    var gauge1a = loadHalfLiquidFillGauge("fillgauge1", value, config1, heading);

     //console.log("gauge1a ", gauge1a);
     //svg.attr("gaugeFunc", gauge1a);

     //This is how you update the tank value
     // gauge1.update(80);  
     return gauge1a;
  }

  return (
    <div>
      {slide > 4 &&
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" ref={ref}>
        </svg>
      }
      {slide == 0 &&
        <div  className="containerTotal" style={{ backgroundImage: `url(${background})` }} >
          <div className="header" id="titleHeader" >
            <h1>
              Event Selection Bias on Covid-19 News Articles
            </h1>
             <h2>
              By: Amy Woods and Po-Wei Chi
            </h2>
            <h3>
              ECS 272 03/15/2021
            </h3>
          </div>
        </div>
      }
      {slide == 1 &&
        <div  className="containerTotal" >
          <div className="annotationText" >
            <h4 style={{ "text-align": "center" }}>
              Covid-19 and News Media
            </h4>
            <p>
              Since December 2019, the Covid-19 pandemic has killed over 2 million people and has affected even more worldwide. Covid-19 has also affected the news media, becoming a hot topic for most mainstream media outlets. The visualization to the right shows, from April 2020 to end of June 2020, the number of articles related to Covid-19 from the top 6 mainstream media outlets in America: Fox News, New York Times, ABC News, Breitbart, CNN, and Washington Post.
            </p>
          </div>
          <div className="drawingArea" id="divMediaSources">

          </div>
        </div>
      }
      {slide == 2 &&
        <div  className="containerTotal" >
          <div className="annotationText" >
            <h4 style={{ "text-align": "center" }}>
              Covid-19 and News Media
            </h4>
            <p>
              The data shows in total there were 7,256 articles related to Covid-19 from April 2020 to end of June 2020. This is a large amount of text relating to Covid-19, but which topics were actually in the articles at a deeper detail level and why were these topics selected as news?
            </p>
          </div>
          <div className="drawingArea" id="divMediaSources">

          </div>
        </div>
      }
      {slide == 3 &&
        <div  className="containerTotal" >
          <div className="annotationText" >
            <h4 style={{ "text-align": "center" }}>
              Media Bias
            </h4>
            <p>
              This brings us to the phenomenon of media bias in which media coverage exhibits an internal bias that is reflected through the news articles published. The figure to the right shows the news production and consumption process over time. The figure also shows the certain biases that can occur during the process. The biases are located at the bottom of the figure highlighted in green.
            </p>
          </div>
          <div className="drawingArea" id="divMediaSources">
          </div>
        </div>
      }
      {slide == 4 &&
        <div  className="containerTotal" >
          <div className="annotationText" >
            <h4 style={{ "text-align": "center" }}>
              Event Selection Bias
            </h4>
            <p>
              One of the biases in the production process is during the gathering stage. In the gathering stage, facts are selected from all the news events that occurred. This stage however starts with the selection of events in which a bias is introduced called <strong>Event Selection Bias</strong>. This bias results in only a fraction of events to be selected as news stories. Our focus is to see if event selection bias exists in the Covid-19 related articles and to explore what type of events the media sources are talking most about during the pandemic.
            </p>
          </div>
          <div className="drawingArea" id="divMediaSources">
          </div>
        </div>
      }


    </div>
  );
};

export default WaterTank;