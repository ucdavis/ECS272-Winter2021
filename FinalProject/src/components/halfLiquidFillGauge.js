import * as d3 from "d3";
/*!
 * @license Open source under BSD 2-clause (http://choosealicense.com/licenses/bsd-2-clause/)
 * Copyright (c) 2015, Curtis Bratton
 * All rights reserved.
 *
 * Liquid Fill Gauge v1.1
 */
export function halfLiquidFillGaugeDefaultSettings(){
    //console.log("in halfLiquidFillGaugeDefaultSettings");
    return {
        minValue: 0, // The gauge minimum value.
        maxValue: 100, // The gauge maximum value.
        circleThickness: 0.05, // The outer circle thickness as a percentage of it's radius.
        circleFillGap: 0.05, // The size of the gap between the outer circle and wave circle as a percentage of the outer circles radius.
        circleColor: "#178BCA", // The color of the outer circle.
        waveHeight: 0.05, // The wave height as a percentage of the radius of the wave circle.
        waveCount: 1, // The number of full waves per width of the wave circle.
        waveRiseTime: 1000, // The amount of time in milliseconds for the wave to rise from 0 to it's final height.
        waveAnimateTime: 18000, // The amount of time in milliseconds for a full wave to enter the wave circle.
        waveRise: true, // Control if the wave should rise from 0 to it's full height, or start at it's full height.
        waveHeightScaling: false, // Controls wave size scaling at low and high fill percentages. When true, wave height reaches it's maximum at 50% fill, and minimum at 0% and 100% fill. This helps to prevent the wave from making the wave circle from appear totally full or empty when near it's minimum or maximum fill.
        waveAnimate: true, // Controls if the wave scrolls or is static.
        waveColor: "#178BCA", // The color of the fill wave.
        waveOffset: 0, // The amount to initially offset the wave. 0 = no offset. 1 = offset of one full wave.
        textVertPosition: .5, // The height at which to display the percentage text withing the wave circle. 0 = bottom, 1 = top.
        textSize: 1, // The relative height of the text to display in the wave circle. 1 = 50%
        valueCountUp: true, // If true, the displayed value counts up from 0 to it's final value upon loading. If false, the final value is displayed.
        displayPercent: true, // If true, a % symbol is displayed after the value.
        textColor: "#045681", // The color of the value text when the wave does not overlap it.
        waveTextColor: "#A4DBf8" // The color of the value text when the wave overlaps it.
    };
}

export function loadHalfLiquidFillGauge(elementId, value, config, fillText) {

   // console.log("IN loadHalfLiquidFillGauge");
    //console.log("window.innerWidth = ", window.innerWidth);
    var windowInnerWidth =  window.innerWidth *0.70;
    var windowInnerHeight =  (window.innerHeight * 0.75) *0.30;

    if(config == null) config = halfLiquidFillGaugeDefaultSettings();

   // console.log("config == ", config);

    var gauge = d3.select("#" + elementId);
    console.log("gauge.style(width) = ", gauge.style("width"));
    var radius = Math.min(parseInt(gauge.style("width")), parseInt(gauge.style("height")))/2; //Radius Y
    //console.log("radius == ", radius);
    var locationX = parseInt(gauge.style("width"))/2 - radius;
    var locationY = parseInt(gauge.style("height"))/2 - (radius + (radius));
    //console.log("locationX == ", locationX);
   //console.log("locationY == ", locationY);
    var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value))/config.maxValue;
    //console.log("fillPercent == ", fillPercent);

    //Text to put in water tank
    //TODO might change as input

    //WaveHeightScale
    //Prevents wave stuck at bottom or top of bowl
    var waveHeightScale;
    if(config.waveHeightScaling){
       //console.log("Wave height scaling is true");
        waveHeightScale = d3.scaleLinear()
            .range([0,config.waveHeight*2,0])
            .domain([0,50,100]);
    } 
    else {
        //console.log("Wave height scaling is false");
        waveHeightScale = d3.scaleLinear()
            .range([config.waveHeight,config.waveHeight])
            .domain([0,100]);
    }

     //var textFinalValue = parseFloat(value).toFixed(2);
    //var textStartValue = config.valueCountUp?config.minValue:textFinalValue;
    //var percentText = config.displayPercent?"%":"";
    var textPixels = (config.textSize*radius/4);                            //Font-Size of text TODO: Dynamic Text Change  
    var circleThickness = config.circleThickness * radius;                  //Thickness of circle border
    var circleFillGap = config.circleFillGap * radius;                      //Gap between border and inner circle
    var fillCircleMargin = circleThickness + circleFillGap;                 //Margin to fill circle
    //console.log("fillCircleMargin ", fillCircleMargin);
    var fillCircleRadius = radius - fillCircleMargin;                       //Radius of fill circle
    //var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);     //Get wave height

    //var waveLength = fillCircleRadius*2/config.waveCount;
    var waveClipCount = 1+config.waveCount;
    //var waveClipWidth = waveLength*waveClipCount;
    var fillInnerCircleRadius = windowInnerWidth/2 - fillCircleMargin*2;

    // Data for building the clip wave area.
    var data = [];
    for(var i = 0; i <= 40*waveClipCount; i++){
        data.push({x: i/(40*waveClipCount), y: (i/(40))});
    }
    //console.log("data ", data);


    // Scale for controlling the position of the text within the gauge.
    var textRiseScaleY = d3.scaleLinear()
        .range([fillCircleMargin+fillCircleRadius*2,(fillCircleMargin+textPixels*0.7)])
        .domain([0,1]);

    // Center the gauge within the parent SVG.
    var gaugeGroup = gauge.append("g").attr("id", "waterTank")
        .attr('transform','translate('+locationX+','+locationY+')');

    //Border water tank elliptical
    gaugeGroup.append('g')
        .append('ellipse')
        .attr("cx", radius)
        .attr("cy", radius)
        .attr("rx", windowInnerWidth/2 - fillCircleMargin)
        .attr("ry", windowInnerHeight - fillCircleMargin)
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", circleThickness + "px");


    // //Drawing text AW
    //console.log("text pixels", textPixels);
    var text1 = gaugeGroup.append('text')
        .text(fillText)
        .attr("text-anchor", "middle")
        .attr("font-size", textPixels + "px")
        .style("fill", config.textColor)
        .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');

    var text3 = gaugeGroup.append('text')
        .attr("id", "dateTankText1")
        .attr("opacity", 0)
        .text("00-00-2020")
        .attr("text-anchor", "middle")
        .attr("font-size", textPixels + "px")
        .style("fill", config.textColor)
        .attr('transform','translate('+radius+','+(textRiseScaleY(config.textVertPosition) + textPixels)+')');

    var text5 = gaugeGroup.append('text')
        .attr("id", "countText1")
        .attr("opacity", 0)
        .text("Count: 0")
        .attr("text-anchor", "middle")
        .attr("font-size", textPixels + "px")
        .style("fill", config.textColor)
        .attr('transform','translate('+radius+','+(textRiseScaleY(config.textVertPosition) + textPixels*2)+')');


    //AW fill inner ellipse ----------------------------------------------------------------------------
    //var fillInnerCircleRadius = windowInnerWidth/2 - fillCircleMargin*2;

    var waveHeight2 = fillCircleRadius*waveHeightScale(fillPercent*100);
    var waveLength2 = fillInnerCircleRadius*2/config.waveCount;
    var waveClipCount2 = 1+config.waveCount;
    var waveClipWidth2 = waveLength2*waveClipCount2;

    var waveScaleX2 = d3.scaleLinear().range([0,waveClipWidth2]).domain([0,1]);
    var waveScaleY2 = d3.scaleLinear().range([0,waveHeight2]).domain([0,1]);

    var clipArea2 = d3.area()
        .x(function(d) { return waveScaleX2(d.x) -(fillInnerCircleRadius/1.18); } )
        .y0(function(d) { return waveScaleY2(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
        .y1(function(d) { return (fillCircleRadius*2 + waveHeight2 ); } );
    var waveGroup2 = gaugeGroup.append("defs")
        .append("clipPath")
        .attr("id", "clipWave2" + elementId);
    var wave2 = waveGroup2.append("path")
        .datum(data)
        .attr("d", clipArea2)
        .attr("T", 0);


    var fillCircleGroup2 = gaugeGroup.append("g")
        .attr("clip-path", "url(#clipWave2" + elementId + ")");
    fillCircleGroup2.append('g')
        .append('ellipse')
        .attr("id", "fillEllipse")
        .attr("cx", radius)
        .attr("cy", radius)
        .attr("rx", windowInnerWidth/2 - fillCircleMargin*2)
        .attr("ry", windowInnerHeight - fillCircleMargin*2)
        .style("fill", config.waveColor)
        // .style("stroke", "black")

    ///AW DONE _________________________________________________________________


    // Text where the wave does overlap.
    var text2 = fillCircleGroup2.append("text")
        .text(fillText)
        .attr("class", "liquidFillGaugeText")
        .attr("text-anchor", "middle")
        .attr("font-size", textPixels + "px")
        .style("fill", config.waveTextColor)
        .attr('transform','translate('+radius+','+textRiseScaleY(config.textVertPosition)+')');

    // Text where the wave does overlap.
    var text4 = fillCircleGroup2.append("text")
        .text("00-00-2020")
        .attr("opacity", 0)
        .attr("id", "dateTankText2")
        .attr("class", "liquidFillGaugeText")
        .attr("text-anchor", "middle")
        .attr("font-size", textPixels + "px")
        .style("fill", config.waveTextColor)
        .attr('transform','translate('+radius+','+(textRiseScaleY(config.textVertPosition) + textPixels)+')');

    var text5 = gaugeGroup.append('text')
        .attr("id", "countText2")
        .attr("opacity", 0)
        .text("Count: 0")
        .attr("text-anchor", "middle")
        .attr("font-size", textPixels + "px")
        .style("fill", config.waveTextColor)
        .attr('transform','translate('+radius+','+(textRiseScaleY(config.textVertPosition) + textPixels*2)+')');


    //AW ---------------------------------------------------------------------------------------------------------
        // Scales for controlling the position of the clipping path.
    var waveRiseScale2 = d3.scaleLinear()
        // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
        // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
        // circle at 100%.
        .range([(fillCircleMargin+fillCircleRadius*2+waveHeight2 + fillCircleRadius),(fillCircleMargin-waveHeight2 + fillCircleRadius)])
        .domain([0,1]);
    var waveAnimateScale2 = d3.scaleLinear()
        .range([0, waveClipWidth2-fillInnerCircleRadius*2]) // Push the clip area one full wave then snap back.
        .domain([0,1]);



     //   Make the wave rise. wave and waveGroup are separate so that horizontal and vertical movement can be controlled independently.
    var waveGroupXPosition2 = fillCircleMargin+fillInnerCircleRadius*2-waveClipWidth2;
    // console.log("waveClipWidth2 ", waveClipWidth2);
    // console.log("waveGroupXPosition2 = ", waveGroupXPosition2);
    //  console.log("waveRiseScale2(0) = ", waveRiseScale2(0));
    //   console.log("waveRiseScale2(0)1 = ", waveRiseScale2(1), "fillPercent ", fillPercent, "fillCircleRadius ", fillCircleRadius, "fillInnerCircleRadius ", fillInnerCircleRadius);
    //wave2.attr('transform','translate('+waveGroupXPosition2+',0)')
    if(config.waveRise){
        waveGroup2.attr('transform','translate('+waveGroupXPosition2+','+waveRiseScale2(0)+')')
            .transition()
            .duration(config.waveRiseTime)
            .attr('transform','translate('+waveGroupXPosition2+','+waveRiseScale2(fillPercent)+')')
            .on("start", function(){ wave2.attr('transform','translate(1,0)'); }); // This transform is necessary to get the clip wave positioned correctly when waveRise=true and waveAnimate=false. The wave will not position correctly without this, but it's not clear why this is actually necessary.
    } else {
        waveGroup2.attr('transform','translate('+waveGroupXPosition2+','+waveRiseScale2(fillPercent)+')');
    }

    if(config.waveAnimate) animateWave();

    function animateWave() {
        wave2.attr('transform','translate('+waveAnimateScale2(wave2.attr('T'))+',0)');
        wave2.transition()
            .duration(config.waveAnimateTime * (1-wave2.attr('T')))
            .ease(d3.easeLinear)
            .attr('transform','translate('+waveAnimateScale2(1)+',0)')
            .attr('T', 1)
            .on('end', function(){
                wave2.attr('T', 0);
                animateWave(config.waveAnimateTime);
            });
    }


    //AW ----------------------------------------------------------------------------------------------------------

    //AW Fix Updater
    function HalfGaugeUpdater(){
        this.update = function(value, boolean){
            //console.log("IN update half gauge with value ", value);
    //         var newFinalValue = parseFloat(value).toFixed(2);
    //         var textRounderUpdater = function(value){ return Math.round(value); };
    //         if(parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))){
    //             textRounderUpdater = function(value){ return parseFloat(value).toFixed(1); };
    //         }
    //         if(parseFloat(newFinalValue) != parseFloat(textRounderUpdater(newFinalValue))){
    //             textRounderUpdater = function(value){ return parseFloat(value).toFixed(2); };
    //         }

    //         var textTween = function(){
    //             var i = d3.interpolate(this.textContent, parseFloat(value).toFixed(2));
    //             return function(t) { this.textContent = textRounderUpdater(i(t)) + percentText; }
    //         };

    //         text1.transition()
    //             .duration(config.waveRiseTime)
    //             .tween("text", textTween);
    //         text2.transition()
    //             .duration(config.waveRiseTime)
    //             .tween("text", textTween);
                    waveHeightScale = d3.scaleLinear()
            .range([0,config.waveHeight*2,0])
            .domain([0,50,100]);

            var fillPercent = Math.max(config.minValue, Math.min(config.maxValue, value))/config.maxValue;
            var waveHeight =  (fillCircleRadius)*waveHeightScale(fillPercent*100);
            var waveRiseScale = d3.scaleLinear()
                // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
                // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
                // circle at 100%.
                .range([(fillCircleMargin+fillCircleRadius*2+waveHeight + + fillCircleRadius),(fillCircleMargin-waveHeight + fillCircleRadius)])
                .domain([0,1]);
            var newHeight = waveRiseScale(fillPercent);
            var waveScaleX = d3.scaleLinear().range([0,waveClipWidth2]).domain([0,1]);
            var waveScaleY = d3.scaleLinear().range([0,waveHeight]).domain([0,1]);

            var newClipArea;

            if(value == 95){
                config.waveHeightScaling = false;
            }else{
                config.waveHeightScaling = true;
            }



            
            if(config.waveHeightScaling){
                //console.log("here 111");
                newClipArea = d3.area()
                    .x(function(d) { return waveScaleX(d.x)  -(fillInnerCircleRadius/1.18); } )
                    .y0(function(d) { return waveScaleY(Math.sin(Math.PI*2*config.waveOffset*-1 + Math.PI*2*(1-config.waveCount) + d.y*2*Math.PI));} )
                    .y1(function(d) { return (fillInnerCircleRadius*2 + waveHeight); } );
            } else {
                //console.log("here 1112");
                newClipArea = clipArea2;
            }

            var newWavePosition = config.waveAnimate?waveAnimateScale2(1):0;
            // console.log("newWavePosition ", newWavePosition);
            // console.log("newHeight ", newHeight);
            //duration(config.waveAnimate?(config.waveAnimateTime * (1-wave2.attr('T'))):(config.waveRiseTime))
            var durationVar = config.waveAnimate?(config.waveAnimateTime * (1-wave2.attr('T'))):(config.waveRiseTime);
            var durationVar2 = config.waveRiseTime;

            if(value != 95 && boolean == false){
                durationVar = 150;
                durationVar2 = 0;
            }



            wave2.transition()
                .duration(0)
                .transition()
                .duration(durationVar)
                .ease(d3.easeLinear)
                .attr('d', newClipArea)
                .attr('transform','translate('+newWavePosition+',0)')
                .attr('T','1')
                .on("end", function(){
                    if(config.waveAnimate){
                        wave2.attr('transform','translate('+waveAnimateScale2(0)+',0)');
                        animateWave(config.waveAnimateTime);
                    }
                });
            //duration(config.waveRiseTime)
            waveGroup2.transition()
                .duration(durationVar2)
                .attr('transform','translate('+waveGroupXPosition2+','+newHeight+')')
        }
    }

    return new HalfGaugeUpdater();
    //return "finish";
}