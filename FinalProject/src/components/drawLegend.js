import * as d3 from "d3";

export function drawLegend(eventNumber, eventNames, colorScale){
	console.log("in draw legend");
	var tankRect = document.getElementById("waterTank").getBoundingClientRect();
	var svgTankRect = document.getElementById("fillgauge1").getBoundingClientRect();

	var realWidth = d3.select("#fillgauge1").style("width");

	var leftOverWidth = parseFloat(realWidth, 10) - tankRect.width;
	console.log("leftOverWidth ", leftOverWidth);
	console.log("svgTankRect  width ", svgTankRect.width)
	console.log("realWidth  width ", parseFloat(realWidth, 10));


	var radius = Math.min(parseInt(d3.select("#fillgauge1").style("width")), parseInt(d3.select("#fillgauge1").style("height")))/2; //Radius Y
	var circleThickness = 0.05 * radius;                  //Thickness of circle border
    var circleFillGap = 0.05 * radius;                      //Gap between border and inner circle
    //var fillCircleMargin = circleThickness + circleFillGap;                 //Margin to fill circle
     var fillCircleMargin = 0;
     var shiftMargin = 0;



	var colorLegend = d3.select("#fillgauge1").append("g").attr("id", "colorLegend")
		.attr("transform", "translate(" + (leftOverWidth/2.0 + tankRect.width + fillCircleMargin ) + "," + 0 + ")");




	var rectBorder = colorLegend.append("rect")
		.attr("id", "rectBorder")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", leftOverWidth/2 - fillCircleMargin)
		.attr("height", svgTankRect.height)
		.style("stroke", "black")
		.style("fill", "none")

	// console.log("eventNumber ", eventNumber);
	// console.log("eventNames ", eventNames);

	var rectBorderRect = document.getElementById("rectBorder").getBoundingClientRect();
	// console.log("rect border ", rectBorderRect.x);
	// console.log("tankRect x", tankRect.x + tankRect.width);

	if(Math.abs(tankRect.x + tankRect.width - rectBorderRect.x ) > 0.01){
		console.log("shift rect");
		fillCircleMargin = circleThickness + circleFillGap
		d3.select("#colorLegend").attr("transform", "translate(" + (leftOverWidth/2.0 + tankRect.width + fillCircleMargin ) + "," + 0 +")");
	}else{
		shiftMargin = circleThickness + circleFillGap;
		d3.select("#rectBorder").attr("width", leftOverWidth/2 - (circleThickness + circleFillGap) )
	}


	var margin = svgTankRect.height * 0.1;
	var circleRadius = ( (svgTankRect.height - margin ) / eventNumber)/2;


	colorLegend.selectAll("circles")
		.data(eventNames)
		.enter()
		.append("circle")
		.attr("cx", circleRadius)
		.attr("cy", function(d,i){
			return circleRadius + (margin/(eventNumber+1))*(i+1) + (i*circleRadius*2);
		})
		.attr("r", circleRadius)
		.style("fill", function(d,i){
			return colorScale(d);
		})
		.style("stroke", "black")

	var computedLength = [];

	colorLegend.selectAll("myLabels")
		.data(eventNames)
		.enter()
		.append("text")
		.attr("id", function(d,i){
			return "label" + i;
		})
		.attr("x", circleRadius * 2 + 2)
		.attr("y", function(d,i){
			return circleRadius + (margin/(eventNumber+1))*(i+1) + (i*circleRadius*2);
		})
		.text(function(d){
			return d;
		})
		.attr("text-anchor", "left")
		.style("alignment-baseline", "middle")
		.each(function(d,i){
			computedLength.push(this.getComputedTextLength());
		});

	// console.log("computedLength ", computedLength);
	// console.log(" current font size ", d3.select("#label0").style("font-size"));

	var rectWidth = leftOverWidth/2 - fillCircleMargin;
	var resize = false;
	var  compareValue = rectWidth - (circleRadius * 2 + 2) - shiftMargin;

	computedLength.forEach(function(d,i){

		if(d >compareValue){
			//console.log("too much for ", eventNames[i]);
			resize = true;
		}

	})

	var counter = 1;

	if(resize == false){
		counter = 0;
	}



	while(counter == 1 ){
		var currentFontSize = parseFloat(d3.select("#label0").style("font-size"), 10);
		//console.log("currentFontSize ", currentFontSize);
		var newFontSize = currentFontSize - 0.5;
		computedLength = [];

		colorLegend.selectAll("text")
			.style("font-size", newFontSize + "px")
			.each(function(d,i){
				computedLength.push(this.getComputedTextLength());
			});

		resize = false;


		computedLength.forEach(function(d,i){
			if(d > compareValue){
				//console.log("too much for ", eventNames[i], " new size ", d, " font-size ", newFontSize);
				resize = true;
			}
		})
		
		if(resize == false){
			//console.log("False resize");
			counter = 0;
		}
		
	}

	d3.select("#fillgauge1").attr("colorLegendDrawn", "true");

}