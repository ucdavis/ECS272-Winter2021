import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import {getNumberEventsAtLevel, getLargestTagName}  from "./sharedFunctions";
import {createExpandWell}  from "./expandWell";
import {drawYAxis, updateHandle}  from "./drawYAxis";
import {drawAnnotation1, drawAnnotation2, drawAnnotation3}  from "./drawAnnotations";

const margin = {
  top: 20,
  right: 50,
  bottom: 80,
  left: 50,
};

const Pipe = ({month, day, data, setValFunc, setWellFunc, wellsGauge, drawPipeBool, parentLevel, filteredData, indexSlideNumber, ...rest}) => {
  // Example: https://github.com/blakechi/ECS272-Winter2021/blob/main/Homework3/pwchi/src/components/BarChart.jsx

  const ref = useRef();
  const width = window.innerWidth *0.80;
  const height =  window.innerHeight * 0.625 - 0;
  //console.log("Props in Pipes", indexSlideNumber);

  useEffect(() => {
    // d3 drawing function
    if(indexSlideNumber < 7){
      console.log("indexsliderNumber is 0 pipes");

      var toolbarHeight = document.getElementById("toolBar").getBoundingClientRect();
      var newHeight = window.innerHeight * 0.625 - toolbarHeight.height;
      d3.select(ref.current).selectAll('g').remove('*');
      d3.select(ref.current).selectAll('circle').remove('*');
      const svg = d3.select(ref.current);
      svg.attr("viewBox", function(){
        var toolbarHeight = document.getElementById("toolBar").getBoundingClientRect();
        var newHeight = window.innerHeight * 0.625 - toolbarHeight.height;
        var currentWidth = window.innerWidth;
        var str = "0 0 " + currentWidth + " " + newHeight;
        //console.log("str = ", str);
        return str;
      })

      if(indexSlideNumber == 5){
       var tankHeight = document.getElementById("fillgauge1").getBoundingClientRect();
        d3.select("#wrapper").style("width","100%").style("height", window.innerHeight -toolbarHeight.height - tankHeight.height + "px" );
        d3.select("#caption1").style("width", window.innerWidth *0.50 + "px").style("max-height", window.innerHeight -toolbarHeight.height - tankHeight.height + "px" );
      }else if(indexSlideNumber == 6){
        var tankHeight = document.getElementById("fillgauge1").getBoundingClientRect();
        var wellsHeight = document.getElementById("bottomWells1").getBoundingClientRect();
        d3.select("#wrapper").style("width","100%").style("height", window.innerHeight -toolbarHeight.height - tankHeight.height - wellsHeight.height + "px" ).style("transform", "translate(" + 0 + "px," + (wellsHeight.height *-1) + "px)");
        d3.select("#caption1").style("width", window.innerWidth *0.50 + "px").style("max-height", window.innerHeight -toolbarHeight.height - tankHeight.height  - wellsHeight.height + "px" );

      }


    }else{
      if(parentLevel == "root"){
        console.log("IN pipes with root", month, " day ", day, "draw ", drawPipeBool)

        if(month == 0 && day == 0 && drawPipeBool){
          //console.log("Drawing pipe");
          drawPipe(data, indexSlideNumber, parentLevel);
        }else if(month != 0 && day != 0 && (drawPipeBool == false)){
          console.log("Animating on pipe");
          animateMonthDay(month, day, data, wellsGauge)
        }

      }else{
        console.log("IN pipes with NOT root")

        if(month == 0 && day == 0 && drawPipeBool){
          //console.log("Drawing pipe");
          drawPipe(filteredData, indexSlideNumber, parentLevel);
        }else if(month != 0 && day != 0 && (drawPipeBool == false)){
          console.log("Animating on pipe");
          animateMonthDay(month, day, filteredData, wellsGauge)
        }
      }
    }


  }, [month, day, parentLevel, indexSlideNumber]); // put dependency in []


  function enterAnimation(decreaseNum){
    setValFunc(decreaseNum, 0);
  }

  function getPathId(circleId, myData){
    //console.log("circle selection", d3.select(circleId).attr("currentLargTag"));
    let [eventsAtRoot, childrenRoot] = getNumberEventsAtLevel(parentLevel, myData);

    var indexArr = childrenRoot.indexOf(d3.select(circleId).attr("currentLargTag"));
    //console.log("indexArr ", indexArr)

    return "#path" + (indexArr+1);
  }

  function pathTween(path){
    //console.log("path.node ", path.node().getTotalLength())
    var length = path.node().getTotalLength(); // Get the length of the path
    var r = d3.interpolate(0, length); //Set up interpolation from 0 to the path length
    return function(t){
      var point = path.node().getPointAtLength(r(t)); // Get the next point along the path
      d3.select(this) // Select the circle
        .attr("cx", point.x) // Set the cx
        .attr("cy", point.y) // Set the cy
    }
  }


  function moveAnimation(idParam, myData){
    //console.log("in moveAnimation2 function",idParam);

    var id = "#" + idParam
    var pathId = getPathId(id, myData)
    //console.log("pathId ", pathId);

    d3.select(id)
      .attr("opacity", 1)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .tween("pathTween", function(){return pathTween(d3.select(pathId))})
      .transition()
      .duration(100)
      .attr("opacity", 0);
  }

  function exitAnimation(index, wellsGauge,data){
    //console.log("in exitAnimation2 function", index);
    var str = "#bottomWells" + (index+1);
    var currentNumPointsOfWell = d3.select(str).attr("currNumPoints");
    //console.log("currentNumPointsOfWell", currentNumPointsOfWell);
    var totalSize = data.length;

    var newNumPoints = parseInt(currentNumPointsOfWell) + 1;
    d3.select(str).attr("currNumPoints",  parseInt(currentNumPointsOfWell) + 1);
    //console.log("newNumPoints ", newNumPoints);

    var newPercentage =(newNumPoints/totalSize) * 100;
    //console.log("newPercentage ", newPercentage);

    //Update Well
    wellsGauge[index].update(newPercentage);
  }


  function animateMonthDay(month, day, data, wellsGauge){
    console.log("IN AnimateMonthDay function for ", month, "-", day);
    var indexMonthDayArr = [];
    var bottomWells1Rect = document.getElementById("bottomWells1").getBoundingClientRect();
    var wellsDiameter = Math.min(bottomWells1Rect.height, bottomWells1Rect.width);
    var pipeWidth = wellsDiameter * 0.8;
    var dropletRadius = ((pipeWidth/2)*0.5)/2;
    var midpointWindow = window.innerWidth *0.5;


    //Get data of month day combo
    data.news_details.forEach(function(d,i){
      //console.log("d is ", d);

      //Get Month and Day
      var strSplit = d.time.split("T");
      //console.log("strSplit ", strSplit);
      var strSplit2 = strSplit[0].split("-");
      //console.log("strSplit2 ", strSplit2);
      var currMonth = parseInt(strSplit2[1]);
      var currDay = parseInt(strSplit2[2]);
      //console.log("currMonth ", currMonth, " currDay ", currDay);

      if(currMonth == month && currDay == day){
        indexMonthDayArr.push(d);
      }
    })//end for each

    //console.log("indexMonthDayArr = ", indexMonthDayArr);

    //Set color scheme
    let [eventsAtRoot, childrenRoot] = getNumberEventsAtLevel(parentLevel, data.news_details);
    var skip = ["skip"];
    var eventNames = skip.concat(childrenRoot);
    var myColor = d3.scaleOrdinal().domain(eventNames)
          .range(d3.schemeTableau10);


    //var monthNames = ["Jan", "Feb", "Mar", "Apr"];
    var monthNames = ["Apr", "May", "Jun"];
    updateHandle(monthNames[month- 4] + "," + day);

    //Set date text
    d3.select("#dateTankText1")
      .text(function(){
        var zeroString = "0";
        var monthString;
        var dayString;

        if(month < 10){
          monthString = zeroString + month.toString();
        }else{
          monthString = month.toString();
        }

        if(day < 10){
          dayString = zeroString + day.toString();
        }else{
          dayString = day.toString();
        }

        var res = monthString + "-" + dayString + "-2020";

        return res;
      })
      .attr("opacity", 1)

    d3.select("#dateTankText2")
      .text(function(){
        var zeroString = "0";
        var monthString;
        var dayString;

        if(month < 10){
          monthString = zeroString + month.toString();
        }else{
          monthString = month.toString();
        }

        if(day < 10){
          dayString = zeroString + day.toString();
        }else{
          dayString = day.toString();
        }

        var res = monthString + "-" + dayString + "-2020";

        return res;
      })
      .attr("opacity", 1)

    d3.select("#countText1")
      .text(function(){
        var countString = "Count: "

        return countString + indexMonthDayArr.length;
      })
      .attr("opacity", 1)

    d3.select("#countText2")
      .text(function(){
        var countString = "Count: "

        return countString + indexMonthDayArr.length;
      })
      .attr("opacity", 1)


    //Drawing Dots at starting point
    d3.select(ref.current)
      .selectAll(".dot")
      .data(indexMonthDayArr)
      .join("circle")
        .attr("class", "dot")
        .attr("cx", function(d,i){
          return midpointWindow;
        })
        .attr("cy", function(d,i){
          return dropletRadius;
        })
        .attr("stroke", "black")
        .attr("r", dropletRadius)
        .attr("fill", function(d,i){
          let name = getLargestTagName(parentLevel, d);
          //console.log("name is ", name);

          return myColor(name);
        })
        .attr("currentLargTag", function(d,i){
            return getLargestTagName(parentLevel, d);
        })
        .attr("id", function(d,i){
          return "data" + d.id;
        })
        .attr("opacity", 0)
        .each(function(d,i){
          //console.log(" each d ", d);
          setTimeout( () => {
             enterAnimation(1);
          }, 150 * i);

          var str = "data" + d.id;
          setTimeout( () => {
             moveAnimation(str, data.news_details);
          }, 150 * i);

          //Get largest tag name
          var largestTagName = d3.select(this).attr("currentLargTag");
          var indexTag = childrenRoot.indexOf(largestTagName);

          setTimeout( () => {
             exitAnimation(indexTag, wellsGauge, data.news_details);
          }, 2000 + ((i)*150));
        })



        //TODO: account for month and day change
        var monthDays = [30, 31, 30];
        var  maxDay = monthDays[month-4];
        var maxMonth = 6
        //var maxDay = 2;

        if(day +1 < maxDay+1){
          setTimeout( () => {
             animateMonthDay(month, day + 1, data, wellsGauge)
          }, 2000 + ((indexMonthDayArr.length)*150));
        }else if(day +1 >= maxDay+1 && month + 1 < maxMonth + 1){
           setTimeout( () => {
             animateMonthDay(month + 1, 1, data, wellsGauge)
          }, 2000 + ((indexMonthDayArr.length)*150));
        }else{
          setTimeout( () => {
            d3.select("#dateTankText2")
            .attr("opacity", 0)

            d3.select("#dateTankText1")
            .attr("opacity", 0)

            d3.select("#countText2")
            .attr("opacity", 0)

            d3.select("#countText1")
            .attr("opacity", 0)

            d3.select("#PlayButton").text("Restart")
          }, 2000 + ((indexMonthDayArr.length)*150));
           
        }



  }//end function

  function drawPaths(pipeWidth, currentNumWells, windowInnerHeight, toolbarHeight, bottomWells1Rect, locationX, wellsDiameter, midpointWindow, svgPipes){
    var dropletRadius = ((pipeWidth/2)*0.5)/2;


    for(var index = 0; index <currentNumWells; index++){

      var firstTransition = ((windowInnerHeight - toolbarHeight.height + 0) * 0.1)  + (pipeWidth/4)
      var secondTransition =  bottomWells1Rect.x + (bottomWells1Rect.width*((index+1)-1)) + locationX + wellsDiameter/2
      var thirdTransition = windowInnerHeight  + 0 + dropletRadius;

      var linePoint = [
        {
          x:[midpointWindow, midpointWindow, secondTransition, secondTransition],
          y:[dropletRadius, firstTransition, firstTransition, thirdTransition]
        }
      ]

      var pipePath1 = svgPipes.append('g').attr("id", "pipePath" + (index+1));

      var linePath = d3.line()
        // .curve(d3.curveCardinal)
        .x(function(d,i){return  d[0]})
        .y(function(d){return d[1]}); 

        var lines = pipePath1.selectAll(".lines")
        .data(linePoint.map(function(d) {return d3.zip(d.x, d.y);}))
        .enter().append("g")
        .attr('class', "lines")

          lines.append('path')
        .attr('class', 'pathline')
        .attr('stroke', 'black')
        .attr("opacity", 0)
        .attr("fill", "none")
        .attr("id", function(d,i){ 
          return "path" + (index+1);
        })
        .attr('d', function(d){ 
          //console.log("d mapping = ", d);
          //console.log("d mapping func ", linePath(d));
          return linePath(d)
        })



    }//end for loop
  }//end draw paths function

  function drawFirstStraightPipe(windowInnerHeight, toolbarHeight, midpointWindow, pipeWidth, svgPipes){
   var firstPipeYScale = d3.scaleLinear()
                  .range([(windowInnerHeight - toolbarHeight.height + 0) * 0.1, 0])
                  .domain([0,1]);

    var xFirstPipeL =  midpointWindow - (pipeWidth/4);
    var xFirstPipeR =  midpointWindow  + (pipeWidth * (1/4));

    var firstPipePoints = [
      {
        x:[xFirstPipeL, xFirstPipeL],
        y:[1,0]
      },
      {
        x:[xFirstPipeR, xFirstPipeR],
        y:[1,0]

      }
    ]

    var pipeFirst = svgPipes.append('g').attr("id", "pipeFirst");
    var indexiesFirst = d3.range( firstPipePoints[0].x.length );

    var areaFirst = d3.area()
      .curve(d3.curveCardinal)
      .x0( function(d) { return firstPipePoints[1].x[d] } )
      .x1( function(d) { return firstPipePoints[0].x[d] } )
      .y0( function(d) { return firstPipeYScale(firstPipePoints[1].y[d]) } )
      .y1(  function(d) { return firstPipeYScale(firstPipePoints[1].y[d]) } );

    pipeFirst.append('path')
      .datum(indexiesFirst)
      .attr('class', 'area')
      .attr('fill', '#CDCDCD')
      .attr('d', areaFirst);

    var lineFirst = d3.line()
      .curve(d3.curveCardinal)
      .x(function(d,i){return  d[0]})
      .y(function(d){return firstPipeYScale(d[1])}); 

    var linesFirst = pipeFirst.selectAll(".lines")
      .data(firstPipePoints.map(function(d) {return d3.zip(d.x, d.y);}))
      .enter().append("g")
      .attr('class', "lines")

    linesFirst.append('path')
        .attr('class', 'pathline')
        .attr('stroke', 'black')
        .attr("fill", "none")
        .attr('d', function(d){return lineFirst(d)})
  }//end drawFirstStraightPipe function

  function drawHorizontalPipe(windowInnerHeight, toolbarHeight, wellSvgWidth, wellsDiameter, pipeWidth, currentNumWells, bottomWells1Rect, locationX, svgPipes, midpointWindow){
    var horzPipeYScale = d3.scaleLinear()
                  .range([((windowInnerHeight - toolbarHeight.height + 0) * 0.1)+ (pipeWidth/2), (windowInnerHeight - toolbarHeight.height + 0) * 0.1])
                  .domain([0,1]);

   // var xHorzPipeL = wellSvgWidth*0.8 + ((wellsDiameter - (pipeWidth/2)) / 2)
    //var xHorzPipeR  = ((wellSvgWidth*0.8 *currentNumWells) ) + ((wellsDiameter - (pipeWidth/2)) / 2)*(2*currentNumWells - 1) + pipeWidth/2

    var xHorzPipeL =  bottomWells1Rect.x + locationX + wellsDiameter/2 -(pipeWidth/4)
    var xHorzPipeR  =  (bottomWells1Rect.x) + (bottomWells1Rect.width*(currentNumWells-1)) + locationX + wellsDiameter/2 -(pipeWidth/4) + pipeWidth/2;
    //console.log("xHorzPipeL", xHorzPipeL);
    //console.log("xHorzPipeR", xHorzPipeR);
    console.log(" pipe sub ", horzPipeYScale(0)-horzPipeYScale(1), "widht ", pipeWidth/2);


    var horzPipePoints = [
      {
        x:[xHorzPipeL, xHorzPipeR],
        y:[1,1]
      },
      {
        x:[xHorzPipeL, xHorzPipeR],
        y:[0,0]

      }
    ]

    var pipeHorz = svgPipes.append('g').attr("id", "pipeHorz");
    var indexiesHorz = d3.range( horzPipePoints[0].x.length );

    var areaHorz = d3.area()
      .curve(d3.curveCardinal)
      .x0( function(d) { return horzPipePoints[1].x[d] } )
      .x1( function(d) { return horzPipePoints[0].x[d] } )
      .y0( function(d) { return horzPipeYScale(horzPipePoints[1].y[d]) } )
      .y1(  function(d) { return horzPipeYScale(horzPipePoints[0].y[d]) } );

    pipeHorz.append('path')
      .datum(indexiesHorz)
      .attr('class', 'area')
      .attr('fill', '#CDCDCD')
      .attr('d', areaHorz);

    //Draw lines on top of horizontal pipe
    var xFirstPipeL =  midpointWindow - (pipeWidth/4);
    var xFirstPipeR =  midpointWindow  + (pipeWidth * (1/4));

    var linePoints = [
      {
        x:[xHorzPipeL, xFirstPipeL],
        y:[1,1]
      },
      {
        x:[xFirstPipeR, xHorzPipeR],
        y:[1,1]
      }
    ]

    var lineHorz = d3.line()
      .curve(d3.curveCardinal)
      .x(function(d,i){return  d[0]})
      .y(function(d){return horzPipeYScale(d[1])}); 

    var linesHorz = pipeHorz.selectAll(".lines")
      .data(linePoints.map(function(d) {return d3.zip(d.x, d.y);}))
      .enter().append("g")
      .attr('class', "lines")

    linesHorz.append('path')
        .attr('class', 'pathline')
        .attr('stroke', 'black')
        .attr("fill", "none")
        .attr('d', function(d){return lineHorz(d)})

    //Draw lines on sides of horizontal pipe
    var firstPipeYScale = d3.scaleLinear()
      .range([((windowInnerHeight - toolbarHeight.height + 0) * 0.1)+(pipeWidth/2), ((windowInnerHeight - toolbarHeight.height + 0) * 0.1)*1])
      .domain([0,1]);

    var sidePoints = [
      {
        x:[xHorzPipeL, xHorzPipeL],
        y:[1,0]
      },
      {
        x:[xHorzPipeR, xHorzPipeR],
        y:[1,0]
      }
    ]

    var lineSide = d3.line()
      .curve(d3.curveCardinal)
      .x(function(d,i){return  d[0]})
      .y(function(d){return firstPipeYScale(d[1])}); 

    var linesSide = pipeHorz.selectAll("blah")
      .data(sidePoints.map(function(d) {return d3.zip(d.x, d.y);}))
      .enter().append("g")
      .attr('class', "lines")

    linesSide.append('path')
        .attr('class', 'pathline')
        .attr('stroke', 'black')
        .attr("fill", "none")
        .attr('d', function(d){return lineSide(d)})

    return xHorzPipeL;


  }//end function

  function drawAttachPipes(currentNumWells, windowInnerHeight, toolbarHeight, bottomWells1Rect, locationX, wellsDiameter, pipeWidth, svgPipes){

    var prevRight = null;
    for(var i = 0; i < currentNumWells; i++){
      var yscale = d3.scaleLinear()
                  .range([windowInnerHeight + 0, ((windowInnerHeight   - toolbarHeight.height + 0) * 0.1)+(pipeWidth/2)])
                  .domain([0,1]);

      var x1Left = bottomWells1Rect.x + (bottomWells1Rect.width*((i+1)-1)) + locationX + wellsDiameter/2 -(pipeWidth/4)
      var x1Right = (bottomWells1Rect.x) + (bottomWells1Rect.width*((i+1)-1)) + locationX + wellsDiameter/2 -(pipeWidth/4) + pipeWidth/2
      //console.log("x1Left", x1Left)
      //console.log("x1Right", x1Right)

      var points = [
        {
          x:[x1Left, x1Left],
          y:[1,0]
        },
        {
          x:[x1Right, x1Right],
          y:[1,0]
        }
      ]

      var pipe = svgPipes.append('g').attr("id", "pipe" + (i+1));

      var indexies = d3.range( points[0].x.length );

      var area = d3.area()
        .curve(d3.curveCardinal)
        .x0( function(d) { return points[1].x[d] } )
        .x1( function(d) { return points[0].x[d] } )
        .y0( function(d) { return yscale(points[1].y[d]) } )
        .y1(  function(d) { return yscale(points[1].y[d]) } );

      pipe.append('path')
        .datum(indexies)
        .attr('class', 'area')
        .attr('fill', '#CDCDCD')
        .attr('d', area);

      var line = d3.line()
      .curve(d3.curveCardinal)
      .x(function(d,i){return  d[0]})
      .y(function(d){return yscale(d[1])}); 

      var lines = pipe.selectAll(".lines")
        .data(points.map(function(d) {return d3.zip(d.x, d.y);}))
        .enter().append("g")
        .attr('class', "lines")

      lines.append('path')
        .attr('class', 'pathline')
        .attr('stroke', 'black')
        .attr("fill", "none")
        .attr('d', function(d){return line(d)})


      //Draw on the horz pipe
      if(prevRight != null){
        var horzPoints = [
          {
            x:[prevRight, x1Left],
            y:[1,1]
          }
        ]

        var linesHorz = pipe.selectAll("something")
          .data(horzPoints.map(function(d) {return d3.zip(d.x, d.y);}))
          .enter().append("g")
          .attr('class', "lines")

        linesHorz.append('path')
          .attr('class', 'pathline')
          .attr('stroke', 'black')
          .attr("fill", "none")
          .attr('d', function(d){return line(d)})





      }//end if

      prevRight = (bottomWells1Rect.x) + (bottomWells1Rect.width*((i+1)-1)) + locationX + wellsDiameter/2 -(pipeWidth/4) + pipeWidth/2;

    }

  }//end function

  function drawPipe(myData, slideNumber, parentLevel) {
    console.log("drawing pipe")
    var toolbarHeight = document.getElementById("toolBar").getBoundingClientRect();
    var newHeight = window.innerHeight * 0.625 - toolbarHeight.height;
    d3.select(ref.current).selectAll('g').remove('*');
    d3.select(ref.current).selectAll('circle').remove('*');
    d3.select(ref.current).selectAll('foreignObject').remove('*');
    const svg = d3.select(ref.current);
    svg.attr("viewBox", function(){
      var toolbarHeight = document.getElementById("toolBar").getBoundingClientRect();
      var newHeight = window.innerHeight * 0.625 - toolbarHeight.height;
      var currentWidth = window.innerWidth;
      var str = "0 0 " + currentWidth + " " + newHeight;
      //console.log("str = ", str);
      return str;
    })
    var wellsDivHeight =  document.getElementById("wells").clientHeight;
    svg.attr("transform", "translate(" + 0 + "," + (wellsDivHeight * -1) + ")").attr("id", "svgPipes");
    //...

    var toolbarHeight = document.getElementById("toolBar").getBoundingClientRect();
    var windowInnerHeight = window.innerHeight * 0.625 - toolbarHeight.height;

    var currentNumWells = d3.select("#wells").selectChildren(".well").nodes().length;
    //console.log("currentNumWells = ", currentNumWells);

    var midpointWindow = window.innerWidth *0.5;
    var bottomWells1Rect = document.getElementById("bottomWells1").getBoundingClientRect();
    var wellSvgWidth = bottomWells1Rect.width;
    var wellsDiameter = Math.min(bottomWells1Rect.height, bottomWells1Rect.width);
    var pipeWidth = wellsDiameter * 0.8;
    var locationX = Math.round(parseInt(d3.select("#bottomWells1").style("width"))/2 - wellsDiameter/2);

    var svgPipes = d3.select(ref.current);

    //Draw first straight pipe
    drawFirstStraightPipe(windowInnerHeight, toolbarHeight, midpointWindow, pipeWidth, svgPipes);

    //Horizontal Pipe
    var farthestLeftPoint = drawHorizontalPipe(windowInnerHeight, toolbarHeight, wellSvgWidth, wellsDiameter, pipeWidth, currentNumWells, bottomWells1Rect, locationX, svgPipes, midpointWindow);
   
    //Draw attaching pipes
    drawAttachPipes(currentNumWells, windowInnerHeight, toolbarHeight, bottomWells1Rect, locationX, wellsDiameter, pipeWidth, svgPipes);
    
    //Drawing Pipe paths
    drawPaths(pipeWidth, currentNumWells, windowInnerHeight, toolbarHeight, bottomWells1Rect, locationX, wellsDiameter, midpointWindow, svgPipes);

    //Draw YAxis Scale
    drawYAxis(svgPipes, window.innerHeight * 0.625 - toolbarHeight.height);

    //console.log("svgPipes ", svgPipes);

    createExpandWell(svgPipes, newHeight, window.innerWidth);

    if(slideNumber == 7){
      drawAnnotation1(svgPipes, farthestLeftPoint,  window.innerHeight * 0.625 - toolbarHeight.height);
    }else if(slideNumber == 8){
      if(parentLevel == "root"){
        drawAnnotation2(svgPipes, farthestLeftPoint,  window.innerHeight * 0.625 - toolbarHeight.height);
      }else{
        drawAnnotation3(svgPipes, farthestLeftPoint,  window.innerHeight * 0.625 - toolbarHeight.height);
      }
      
    }
   
  }//end draw function


  return (
    <div id="pipeDiv">
      { indexSlideNumber > 6 &&
        <svg  ref={ref} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        </svg>
      }
      {indexSlideNumber == 5 &&
        <div className="wrapper" id="wrapper">
          <div className="waterTankCaption" id="caption1">
            <p>
              The water tank at the top of the of the screen contains all the Covid-19 related articles from April 2020 to end of June 2020 from the 6 mainstream media outlets discussed before.
            </p>
          </div>
        </div>

      }
      {indexSlideNumber == 6 &&
        <div className="wrapper" id="wrapper">
          <div className="waterTankCaption" id="caption1">
            <p>
              At the bottom of the screen we have multiple wells. Each well represents a event topic category of the data. You can see which topic a well represents by looking in the top right hand corner for the color legend. 
            </p>
          </div>
        </div>

      }


    </div>
  );
};

export default Pipe;