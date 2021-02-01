

function drawBarChart(yearData, yearCount){

	console.log("Drawing BarChart");
	var width = document.getElementById('test2').clientWidth;
	var height = document.getElementById('test2').clientHeight;
	// console.log("Bar chart area width = ", width);
	// console.log("Bar chart area height = ", height);
	var margin = { top: 20, right: 30, bottom: 50, left: 60};
	// width = width - margin.left-margin.right;
	// height = height - margin.top - margin.bottom;
	width = width - 30;
	height = height -60;



	width = width - margin.left-margin.right;
	height = height - margin.top - margin.bottom;

	var barChartSVG = d3.select("#test2").append("svg")
	    .attr("transform", "translate(" +0 + "," + margin.top + ")")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.attr("class", "graph-svg-component")
		.append('g')
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		// .append('g')
		// 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//.attr("class", "graph-svg-component")

	var textSizeAxis = 7;
	var textSizeAxisString = textSizeAxis.toString() + "px";

	//var tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);;
	var tooltipPop = d3.select("#test2").append("div").attr("class", "tooltip").style("opacity", 0);
var tooltipDur = d3.select("#test2").append("div").attr("class", "tooltip").attr("id", "duration").style("opacity", 0);
var tooltipCount = d3.select("#test2").append("div").attr("class", "tooltip").attr("id", "count").style("opacity", 0);


	//X Axis
	var xScale = d3.scaleBand()
		.range([ 0, width ])
		.domain(yearData.map(function(d) { return d.year; }))
		.padding(0.2);

	var xAxis = barChartSVG.append("g")
	    .attr("transform", "translate(0," + (height) + ")")
	    .call(d3.axisBottom(xScale))
	    .selectAll("text")
		    .attr("transform", "translate(-"+ 10 +",0)rotate(-45)")
		    .style("text-anchor", "end")
		    //.style("font-size",textSizeAxisString);

	var xAxisLabel = barChartSVG.append("text")
		.attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 10) + ")")
        .style("text-anchor", "middle")
        .text("Year Released");


	//TODO TEXT SIZE LATER ADJUST AND REMOVE ADJUST
	var ticksXAxis = d3.selectAll(".tick text");
	ticksXAxis.each(function(_,i){
		//console.log("hey");
		if(i%2 !== 0){

			d3.select(this).remove();
		}
	});

	// Initialize the Y axis
	var yScale = d3.scaleLinear()
	  .range([ height, 0]);
	var yAxis = barChartSVG.append("g")
	  .attr("class", "myYaxis")




	//Initial chart
	yScale.domain([0, d3.max(yearCount, function(d) { return d.value; }) ]);
	yAxis.transition().duration(1000).call(d3.axisLeft(yScale));
	barChartSVG.append("text")
		.attr("class", "yAxisText")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left)
		.attr("x",0 - (height / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.text("Number of Songs");

	//console.log("max pop ",  d3.max(yearData, function(d) { return d.popularity; }));

	var bars = barChartSVG.selectAll("rect")
		.data(yearCount)
		.enter()
		.append("rect")
		.attr("x", function(d,i){
			return xScale(d.year);
		})
		.attr("y", function(d,i){
			return yScale(d.value);
		})
		.attr("width", xScale.bandwidth())
		.attr("height", function(d,i){
			return height - yScale(d.value);
		})
		.attr("fill", "#69b3a2");
		bars.on("mouseover", function(event,d){
			tooltipDur
				.style("opacity", 0);
			tooltipCount
				.style("opacity", 0);
			var xy = d3.pointer(event, barChartSVG.node());
			tooltipPop.transition().duration(200).style("opacity", 0.9);
            tooltipPop
              .style("left", xy[0] + "px")
              .style("top", xy[1] + "px")
              .html("Year: " + (d.year) + "<br>" + "Count: " + (d.value));
        })
    	.on("mouseleave", function(d){ 
    		tooltipPop
				.style("opacity", 0);
    	});

	function update(newAxis){
		//barChartSVG.selectAll("rect").remove();
		barChartSVG.selectAll(".yAxisText").remove();

		if(newAxis == "popularity"){
			yScale.domain([0, d3.max(yearData, function(d) { return d.popularity; }) ]);
  			yAxis.transition().duration(1000).call(d3.axisLeft(yScale));
  			barChartSVG.append("text")
				.attr("class", "yAxisText")
				.attr("transform", "rotate(-90)")
				.attr("y", 0 - margin.left)
				.attr("x",0 - (height / 2))
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text("Average Popularity of Songs");

  			//console.log("max pop ",  d3.max(yearData, function(d) { return d.popularity; }));

  			var bars = barChartSVG.selectAll("rect")
  				.data(yearData)
  				.attr("x", function(d,i){
  					return xScale(d.year);
  				})
  				.attr("y", function(d,i){
  					return yScale(d.popularity);
  				})
  				.attr("width", xScale.bandwidth())
  				.attr("height", function(d,i){
  					return height - yScale(d.popularity);
  				})
  				.attr("fill", "#69b3a2");

  				bars.transition() // <---- Here is the transition
   				.duration(1000); // 2 seconds

  				bars.on("mouseover", function(event,d){
					tooltipDur
						.style("opacity", 0);
					tooltipCount
						.style("opacity", 0);
					var xy = d3.pointer(event, barChartSVG.node());
					tooltipPop.transition().duration(200).style("opacity", 0.9);
		            tooltipPop
		              .style("left", xy[0] + "px")
		              .style("top", xy[1] + "px")
		              .html("Year: " + (d.year) + "<br>" + "Average Popularity: " + (d.popularity));
		        })
		    	.on("mouseleave", function(d){ 
		    		tooltipPop
						.style("opacity", 0);
		    	});

		}else if(newAxis == "duration"){
			yScale.domain([0, d3.max(yearData, function(d) { return d.duration; }) ]);
  			yAxis.transition().duration(1000).call(d3.axisLeft(yScale));
  			barChartSVG.append("text")
  				.attr("class", "yAxisText")
				.attr("transform", "rotate(-90)")
				.attr("y", 0 - margin.left)
				.attr("x",0 - (height / 2))
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text("Average Duration of Songs in Seconds");

  			//console.log("max pop ",  d3.max(yearData, function(d) { return d.popularity; }));

  			var bars = barChartSVG.selectAll("rect")
  				.data(yearData)
  				.attr("x", function(d,i){
  					return xScale(d.year);
  				})
  				.attr("y", function(d,i){
  					return yScale(d.duration);
  				})
  				.attr("width", xScale.bandwidth())
  				.attr("height", function(d,i){
  					return height - yScale(d.duration);
  				})
  				.attr("fill", "#69b3a2");

  				bars.transition() // <---- Here is the transition
   				.duration(1000); // 2 seconds

  				bars.on("mouseover", function(event,d){
  					tooltipPop
						.style("opacity", 0);
					tooltipCount
						.style("opacity", 0);
					var xy = d3.pointer(event, barChartSVG.node());
					tooltipDur.transition().duration(200).style("opacity", 0.9);
		            tooltipDur
		              .style("left", xy[0] + "px")
		              .style("top", xy[1] + "px")
		              .html("Year: " + (d.year) + "<br>" + "Average Duration: " + (d.duration));
		        })
		    	.on("mouseleave", function(d){ 
		    		tooltipDur
						.style("opacity", 0);
		    	});


		}else if(newAxis == "count"){
			yScale.domain([0, d3.max(yearCount, function(d) { return d.value; }) ]);
  			yAxis.transition().duration(1000).call(d3.axisLeft(yScale));
  			barChartSVG.append("text")
  				.attr("class", "yAxisText")
				.attr("transform", "rotate(-90)")
				.attr("y", 0 - margin.left)
				.attr("x",0 - (height / 2))
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text("Number of Songs");

			//console.log("max pop ",  d3.max(yearCount.values(), function(d) { return d.popularity; }));


			//console.log("keys ", yearCount.keys()[0]);


  			var bars = barChartSVG.selectAll("rect")
  				.data(yearCount)
				.attr("x", function(d,i){
  					//console.log("d ", d)
  					return xScale(d.year);
  				})
  				.attr("y", function(d,i){
  					return yScale(d.value);
  				})
  				.attr("width", xScale.bandwidth())
  				.attr("height", function(d,i){
  					return height - yScale(d.value);
  				})
  				.attr("fill", "#69b3a2");
				

				bars.on("mouseover", function(event,d){
  				 	tooltipDur
						.style("opacity", 0);
					tooltipPop
						.style("opacity", 0);
					var xy = d3.pointer(event, barChartSVG.node());
					tooltipCount.transition().duration(200).style("opacity", 0.9);
		            tooltipCount
		              .style("left", xy[0] + "px")
		              .style("top", xy[1] + "px")
		              .html("Year: " + (d.year) + "<br>" + "Count: " + (d.value));
		        })
		    	.on("mouseleave", function(d){ 
		    		tooltipCount
						.style("opacity", 0);
		    	})


		    // bars.transition() // <---- Here is the transition
   			// 	.duration(1000)
   			// 	.transition().attr('pointer-events', 'auto'); // 2 seconds






		}
	}


	function changed(){
		var form = document.getElementById("dimensionY")
    	var form_val;
    	for(var i=0; i<form.length; i++){
	        if(form[i].checked){
	          form_val = form[i].value;
	        }
	    }
	    //console.log("changing to ", form_val);
	    update(form_val);
	}


	//update("popularity");

	var dataDim = d3.select("#dimensionY")
	dataDim.on("change", changed)

}

