import * as d3 from "d3";

export function createExpandWell(svgPipes, height, width){
	console.log("In createExpandWell");

	// console.log("svgPipes in createExpandWell ", svgPipes);
	// console.log("height in createExpandWell ", height);
	// console.log("width in createExpandWell ", width);

	var radius = Math.min(parseInt(width), parseInt(height))/2;
	//console.log("radius == ", radius);

	var locationX = parseInt(width)/2 - radius ;
    var locationY = parseInt(height)/2 - radius;
    // console.log("locationX == h ", locationX);
    // console.log("locationY == g", locationY);

    var configCircleFillGap = 0.02;
    var configCircleThickness = 0.05;
    var configWaveHeight = 0.05;
    var configMinValue = 0;
    var configMaxValue = 100;
    var configWaveCount = 1;
    var configWaveOffset = 0;
    var value = 20
    var elementId ="svgPipes";

    //Calculation variables
    var circleThickness = configCircleThickness * radius;
    var circleFillGap = configCircleFillGap * radius;
    var fillCircleMargin = circleThickness + circleFillGap;
    var fillCircleRadius = radius - fillCircleMargin;
    var fillPercent = Math.max(configMinValue, Math.min(configMaxValue, value))/configMaxValue;
    //console.log("fillPercent == ", fillPercent);

    var waveHeightScale = d3.scaleLinear()
	    .range([0,0,0])
	    .domain([0,50,100]);

	var waveHeight = fillCircleRadius*waveHeightScale(fillPercent*100);
	var waveLength = fillCircleRadius*2/configWaveCount;
    var waveClipCount = 1+configWaveCount;
    var waveClipWidth = waveLength*waveClipCount;

    // Data for building the clip wave area.
    var data = [];
    for(var i = 0; i <= 40*waveClipCount; i++){
        data.push({x: i/(40*waveClipCount), y: (i/(40))});
    }

    // Scales for drawing the outer circle.
    var gaugeCircleX = d3.scaleLinear().range([0,2*Math.PI]).domain([0,1]);
    var gaugeCircleY = d3.scaleLinear().range([0,radius]).domain([0,radius]);

    // Scales for controlling the size of the clipping path.
    var waveScaleX = d3.scaleLinear().range([0,waveClipWidth]).domain([0,1]);
    var waveScaleY = d3.scaleLinear().range([0,waveHeight]).domain([0,1]);

    // Scales for controlling the position of the clipping path.
    var waveRiseScale = d3.scaleLinear()
        // The clipping area size is the height of the fill circle + the wave height, so we position the clip wave
        // such that the it will overlap the fill circle at all when at 0%, and will totally cover the fill
        // circle at 100%.
        .range([(fillCircleMargin+fillCircleRadius*2+waveHeight),(fillCircleMargin-waveHeight)])
        .domain([0,1]);
    var waveAnimateScale = d3.scaleLinear()
        .range([0, waveClipWidth-fillCircleRadius*2]) // Push the clip area one full wave then snap back.
        .domain([0,1]);

     // Center the gauge within the parent SVG.
    var gaugeGroup = svgPipes.append("g")
        .attr('transform','translate('+locationX+','+locationY+')')
        .attr("id", "centerWell" + 1)
        .attr("tagNameCurrent", "none")


    //Draw white circle to cover 
    gaugeGroup.append("circle")
    	.attr("id", "backgroundCircle")
		.attr("cx", radius)
		.attr("cy", radius)
		.attr("r", fillCircleRadius+fillCircleMargin)
		.style("fill", "white")
		.style("fill-opacity", 0);

    // Draw the outer circle.
    var gaugeCircleArc = d3.arc()
        .startAngle(gaugeCircleX(0))
        .endAngle(gaugeCircleX(1))
        .outerRadius(gaugeCircleY(radius))
        .innerRadius(gaugeCircleY(radius-circleThickness));
    gaugeGroup.append("path")
        .attr("thickness", circleThickness)
        .attr("id", "outerCircle")
        .attr("d", gaugeCircleArc)
        .style("fill", "red")
        .attr("opacity", 0)
        .attr('transform','translate('+radius+','+radius+')');

	//calculate radius given number of points and diameter of circle
	var goalNum = 16 + 8; // plus have of goal number
	var diameter = radius ;
	var prevSmallDiameter = 0
	var currSmallDiameter = 1;
	var calcNum = goalNum + 1;

	while(calcNum >= goalNum ){
		prevSmallDiameter = prevSmallDiameter + 1
		calcNum = (Math.PI * (Math.pow(diameter,2))) / (Math.pow(2*prevSmallDiameter, 2));
		// console.log(" (Math.PI * (Math.pow(diameter,2))) ", (Math.PI * (Math.pow(diameter,2))));
		// console.log(" (Math.pow(2*prevSmallDiameter, 2) ", (Math.pow(2*prevSmallDiameter, 2)));
		// console.log("calcNum ", calcNum, " for ", prevSmallDiameter);
	}

	// console.log("prevSmallDiameter = ", prevSmallDiameter);

	var ans = (Math.PI * (Math.pow(10,2))) / (Math.pow((2*1),2)) ;
	// console.log("answ ", ans);

	var smallCircleRadius = prevSmallDiameter - 1;


	//Dummy data
	var dataDummy = [{ "name": "A" }, { "name": "B" }, { "name": "C" }, { "name": "D" }, { "name": "E" }, { "name": "F" }, { "name": "G" }, { "name": "H" }, { "name": "I" }, { "name": "J" }, { "name": "K" }, { "name": "L" }, { "name": "M" }, { "name": "N" }, { "name": "O" }, { "name": "P" }]

	//Calc center of semicircle
	var newRadius = ((radius*2)*(fillPercent/2));
	var circleDataRadius = 10

	var node = gaugeGroup.append("g")
		.selectAll("circle")
		.data(dataDummy)
		.enter()
			.append("circle")
			.attr("id", "dataCircle")
			.attr("r", smallCircleRadius)
			.attr("cx", radius)
			.attr("cy", radius)
			.style("fill", "#69b3a2")
			.attr("stroke", "black")
			.style("fill-opacity", 0)
			.style("stroke-opacity", 0)
			//.style("opacity ", 0)

	var simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(radius).y(radius)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(0.5)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.05).radius(smallCircleRadius+1).iterations(1)) // Force that avoids circle overlapping

// Apply these forces to the nodes and update their positions.
// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
simulation
    .nodes(dataDummy)
    .on("tick", function(d){
      node
          .attr("cx", function(d){ return d.x; })
          .attr("cy", function(d){ return d.y; })
    });

}


function recurseGetChildrenAndPercentage(levelName, childrenArr, currName){
	var res = [];

	if(childrenArr == undefined){
		return [];
	}else if(levelName == currName){
		var temp = [];
		for(var j = 0; j < childrenArr.length; j++){
			var subTemp = [];
			subTemp.push(childrenArr[j].event);
			subTemp.push(childrenArr[j].percentage.toString());
			temp.push(subTemp);
		}
		return temp;
	}else{
		for(var i = 0; i < childrenArr.length; i++){
			res = recurseGetChildrenAndPercentage(levelName, childrenArr[i].children, childrenArr[i].event);

			if(res.length != 0){
				break;
			}
		}
	}

	return res;
}


function getChildrenAndPercentage(levelName, data){
	var res = []

	var firstElement = data.tags;
	var eventName = firstElement[0].event;
	// console.log("data getChildrenAndPercentage ", data);
	// console.log("firstElement ", firstElement);
	// console.log("eventName ", eventName);

	res = recurseGetChildrenAndPercentage(levelName, firstElement[0].children, eventName);

	return res;
}


export function showExpandWell(wellName, edgeColor, dataPoints, parentLevel, tagName){
	console.log("in showExpandWell", dataPoints);
	d3.select("#" + wellName).attr("tagNameCurrent", tagName);
	d3.select("#" + wellName).select("#outerCircle").style("fill", edgeColor);
	d3.select("#" + wellName).select("#outerCircle").transition().duration(1000).attr("opacity", 1);
	d3.select("#" + wellName).select("#backgroundCircle").transition().duration(1000).style("fill-opacity", 1);

	d3.select("#" + wellName).select("g").remove('*');
	d3.select("#" + wellName).selectAll("defs").remove('*');
	d3.select("#wells").selectAll(".tooltip").remove('*');


	var tooltip = d3.select("#wells").append('div').attr("class", "tooltip").style("opacity", 0);
	var currIDSelected = null;


	var goalNum = dataPoints.length + (dataPoints.length / 2); // plus have of goal number
	var diameter = d3.select("#" + wellName).select("#backgroundCircle").attr("r") ;
	var prevSmallDiameter = 0
	var calcNum = goalNum + 1;

	if(goalNum > 0){
		while(calcNum >= goalNum ){
			prevSmallDiameter = prevSmallDiameter + 1
			calcNum = (Math.PI * (Math.pow(diameter*0.9,2))) / (Math.pow(2*prevSmallDiameter, 2));
		}
	}
	
	// console.log("prevSmallDiameter = ", prevSmallDiameter);

	var smallCircleRadius = prevSmallDiameter - 1;

	var node = d3.select("#" + wellName).append("g")
		.selectAll("circle")
		.data(dataPoints)
		.enter()
			.append("circle")
			.attr("id", "dataCircle")
			.attr("r", smallCircleRadius)
			.attr("cx", diameter)
			.attr("cy", diameter)
			.attr("dataid", function(d){ return d.id;})
			.style("fill", function(d,i){
				//Get array of percentage and tag name
				var res = getChildrenAndPercentage(parentLevel, d);
				console.log("res = ", res, "parentLevel ", parentLevel);
				var childrenArr = []

				var maxPercent = 0
				if(parentLevel != "root"){
					for(var j = 0; j < res.length; j++){
						maxPercent = maxPercent + parseFloat(res[j][1]);
					}
				}
				console.log("maxPercent ", maxPercent);

				for(var j = 0; j < res.length; j++){
					childrenArr.push(res[j][0]);
				}

				var skip = ["skip"];
    			var eventNames = skip.concat(childrenArr);
    			//console.log("event names here ", eventNames);

    			var myColor = d3.scaleOrdinal().domain(eventNames)
              		.range(d3.schemeTableau10);

              	var sortedRes = res.sort((a,b) => (parseFloat(a[1]) > parseFloat(b[1])) ? 1 : -1);
              	//console.log("sortedRes", sortedRes);

				var orderColors = []
              	for(var j = 0; j < sortedRes.length; j++){
              		orderColors.push(myColor(sortedRes[j][0]));
              		orderColors.push(myColor(sortedRes[j][0]));
              	}
              	var currentPercent = 0;

				var grad = d3.select("#" + wellName).append('defs')
				  .append('linearGradient')
				  .attr('id', 'grad' + i)
				  .attr('x1', '0%')
				  .attr('x2', '0%')
				  .attr('y1', '0%')
				  .attr('y2', '100%');

				var percent = true;
				var index = 0;

				grad.selectAll('stop')
					.data(orderColors)
					.enter()
					.append('stop')
					.style('stop-color', function(d){
						return d;
					})
					.attr('offset', function(d,j){

						if(j == 0){
							return currentPercent + '%';
						}else if(percent == true){

							if(parentLevel != "root"){
								currentPercent = currentPercent + (parseFloat(sortedRes[index][1])/ maxPercent)*100;
							}else{
								currentPercent = currentPercent + (parseFloat(sortedRes[index][1])) * 100;
							}


							//currentPercent = currentPercent + parseFloat(sortedRes[index][1]);
							percent = false;
							index++;
							return currentPercent + '%';
						}else{
							percent = true;
							var val = currentPercent + 0.0000001;
							return val + '%';
						}



						
					})



				return 'url(#grad' + i + ')';
			})
			.attr("stroke", "black")
			.style("stroke-width", "2px")
			.style("fill-opacity", 0)
			.style("stroke-opacity", 0)
			.on("click", function(event,d){
				var currentOpacity = tooltip.style("opacity");
				//console.log("currentOpacity = ", currentOpacity);
				var prevIDselected = currIDSelected;
				var allCircleData = d3.selectAll("#dataCircle");

				var tagString = "";

				var res = getChildrenAndPercentage(parentLevel, d);
				var sortedRes = res.sort((a,b) => (parseFloat(a[1]) > parseFloat(b[1])) ? 1 : -1);
				var maxPercent = 0
				if(parentLevel != "root"){
					for(var j = 0; j < res.length; j++){
						maxPercent = maxPercent + parseFloat(res[j][1]);
					}
				}

				if(parentLevel != "root"){
					for(var j = 0; j < sortedRes.length; j++){
						tagString = tagString + '<br/>' + sortedRes[j][0] + ": " + ((parseFloat(sortedRes[j][1])/ maxPercent)*100).toFixed(2) + "%";
					}

				}else{
					for(var j = 0; j < sortedRes.length; j++){
						tagString = tagString + '<br/>' + sortedRes[j][0] + ": " + ((parseFloat(sortedRes[j][1]))*100).toFixed(2) + "%";
					}
				}


				if(currentOpacity == 0 && prevIDselected == null){
					currIDSelected = d.id;
					tooltip.style("opacity", 1)
							.style("left", (event.pageX + 20) + "px")		
			                .style("top", (event.pageY - 28) + "px");	
					tooltip.html("Headline: " + d.headline + '<br/>' + "Source: " + d.source + '<br/>' + 
						"Time: " + d.time + '<br/>' + "Id: " + d.id  + tagString);

					allCircleData.style("fill-opacity", 0.3).style("stroke-opacity", 0.3);
					d3.select(this).style("fill-opacity", 1).style("stroke-opacity", 1)
				}else if(prevIDselected != d.id){
					//Selected a different circle
					currIDSelected = d.id;
					tooltip.style("opacity", 1)
							.style("left", (event.pageX + 20) + "px")		
			                .style("top", (event.pageY - 28) + "px");	
					tooltip.html("Headline: " + d.headline + '<br/>' + "Source: " + d.source + '<br/>' + 
						"Time: " + d.time + '<br/>' + "Id: " + d.id + tagString);

					allCircleData.style("fill-opacity", 0.3).style("stroke-opacity", 0.3);
					 d3.select(this).style("fill-opacity", 1).style("stroke-opacity", 1)
				}
				else{
					currIDSelected = null;
					tooltip.style("opacity", 0);
					allCircleData.style("fill-opacity", 1).style("stroke-opacity", 1);
				}
				
			})

	var center = 0.4
	if(dataPoints.length < 15){
		center= 0.8
	}

	var simulation = d3.forceSimulation()
    .force("center", d3.forceCenter().x(diameter).y(diameter).strength(center)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(diameter*2)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(.4).radius(smallCircleRadius+1).iterations(15)) // Force that avoids circle overlapping

	// Apply these forces to the nodes and update their positions.
	// Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
	simulation
	    .nodes(dataPoints)
	    .on("tick", function(d){
	      node
	          .attr("cx", function(d){ return d.x; })
	          .attr("cy", function(d){ return d.y; })
	    });

	node.transition(1000).duration(1000).style("fill-opacity", 1)
		.style("stroke-opacity", 1)
		
}