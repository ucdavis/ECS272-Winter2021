import * as d3 from "d3";

export function drawYAxis(svgPipes, length){
	console.log("Draw y axis function");
	var margin = length * 0.05;

	var yearData = [];

	var monthNames = ["Apr", "May", "Jun"];
	var monthDays = [30, 31, 30];

	for(var month = 0; month < monthNames.length; month++){

		for(var day = 0; day < monthDays[month]; day++){
			yearData.push(monthNames[month] + "," + (day+1).toString())
		}
	}



	//BAsic YAxis
	var y = d3.scaleBand()
		.domain(yearData)
		.range([margin, length - margin])

	var xValue = 10;

	var slider = svgPipes.append("g")
		.attr("class", "slider")
		.attr("transform", "translate(" + xValue + ","+ 0 + ")")
		.attr("myLength", length);

	slider.append("line")
    .attr("class", "track")
    .attr("x1", xValue)
    .attr("x2", xValue)
    .attr("y1", y.range()[0])
    .attr("y2", y.range()[1])
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")

   // console.log("y ticks ", y.ticks(10))

    slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(" + (xValue/2) + "," + 0 + ")")
    .selectAll("text")
    	.data(yearData)
    	.enter()
    	.append("text")
    	.attr("x", (xValue + 10))
    	.attr("y", function(d,i){
    		return y(d);
    	})
    	.attr("text-anchor", "right")
    	.style("alignment-baseline", "middle")
    	.text(function(d,i){
    		var strSplit = d.split(",");
    		var day = parseInt(strSplit[1]);

    		if(day == 1){
    			return strSplit[0];
    		}else{
    			return d;
    		}
    	})
    	.style("fill", function(d,i){
    		var strSplit = d.split(",");
    		var day = parseInt(strSplit[1]);

    		if(day == 1){
    			return "black";
    		}else{
    			return "none";
    		}

    	})

    var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("cx", xValue)
    .attr("cy", y("Apr,1"))
    .attr("r", 8);

    //updateHandle("Feb,14");

}


export function updateHandle(h){
	var length = d3.select("#svgPipes").select(".slider").attr("myLength")

	var margin = length * 0.05;

	var yearData = [];

	//var monthDays = [31, 28, 31, 30];
	//var monthNames = ["Jan", "Feb", "Mar", "Apr"];
	var monthNames = ["Apr", "May", "Jun"];
	var monthDays = [30, 31, 30];

	for(var month = 0; month < monthNames.length; month++){

		for(var day = 0; day < monthDays[month]; day++){
			yearData.push(monthNames[month] + "," + (day+1).toString())
		}
	}

	//console.log("yearData ", yearData);

	//BAsic YAxis
	var y = d3.scaleBand()
		.domain(yearData)
		.range([margin, length - margin])

	d3.select("#svgPipes").select(".handle").attr("cy", y(h));

}
