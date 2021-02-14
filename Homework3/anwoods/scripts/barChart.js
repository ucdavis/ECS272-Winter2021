

function drawBarChart(yearData, yearCount, radarData){

	console.log("Drawing BarChart");
	var width = document.getElementById('test2').clientWidth;
	var height = document.getElementById('test2').clientHeight;

	var h1 = document.getElementById('my_barChart').clientHeight;
	// console.log("Bar chart area width = ", width);
	// console.log("Bar chart area height = ", height);
	var margin = { top: 20, right: 30, bottom: 50, left: 60};
	width = width - 30;
	height = height -60;

	width = width - margin.left-margin.right;
	height = height - margin.top - margin.bottom - h1;

	var total_height = height + margin.top + margin.bottom + (h1/2);
	// console.log("total_height 3/4 ", total_height* (3/4));
	// console.log("height = ", height);
	var foucs_height = total_height * (3/4);
	//console.log("foucs_height ", foucs_height);

	var barChartSVG = d3.select("#test2").append("svg")
	    .attr("transform", "translate(" +0 + "," + margin.top + ")")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom + (h1/2))
		.attr("class", "graph-svg-component");

	var focus = barChartSVG.append('g')
		.attr("class", "focus")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var textSizeAxis = 8;
	var textSizeAxisString = textSizeAxis.toString() + "px";
	var tooltipPop = d3.select("#test2").append("div").attr("class", "tooltip").style("opacity", 0);
	var tooltipDur = d3.select("#test2").append("div").attr("class", "tooltip").attr("id", "duration").style("opacity", 0);
	var tooltipCount = d3.select("#test2").append("div").attr("class", "tooltip").attr("id", "count").style("opacity", 0);


	//X Axis
	var xScale = d3.scaleBand()
		.range([ 0, width ])
		.domain(yearData.map(function(d) { return d.year; }))
		.padding(0.2);

	var x0;
	var isSortChecked = false;
	var clickedRangeArray = [];

	var xAxis = focus.append("g")
		.attr("class", "x axis")
	    .attr("transform", "translate(0," + ((height*(3/4)) + (h1/2)) + ")")
	    .call(d3.axisBottom(xScale))
	    .selectAll("text")
		    .attr("transform", "translate(-"+ 12 +",7)rotate(-90)")
		    .style("text-anchor", "end")
		    .style("font-size",textSizeAxisString);

	var xAxisLabel = focus.append("text")
		.attr("transform", "translate(" + (width / 2) + " ," + ((height*(3/4)) + margin.bottom - 10 + (h1/2)) + ")")
        .style("text-anchor", "middle")
        .text("Year Released");

	//CONTEXT -----------------------------------------------------------------------------------
	var bottomFocus = (height*(3/4)) + margin.bottom - 10 + (h1/2) + margin.top;

	var context = barChartSVG.append('g')
		.attr("class", "context")
		.attr("transform", "translate(" + margin.left + "," + (bottomFocus) + ")");


	var height2 = height*(1/4);

	//XAxis
	context.append('g')
		.attr("class", "x axis")
		.attr("transform", "translate(0," + (height2) + ")")
	    .call(d3.axisBottom(xScale).tickValues([]));

	//YScale 2
	var yScale2 = d3.scaleLinear()
	  .range([ height2, 0]);

	yScale2.domain([0, d3.max(yearCount, function(d) { return d.value; }) ]);

	//Bars
	var subBars = context.selectAll('.subBar').data(yearCount);

	subBars.enter().append("rect")
		.attr("class", "subBar")
		.attr("x", function(d,i){
			return xScale(d.year);
		})
		.attr("y", function(d,i){
			return yScale2(d.value);
		})
		.attr("width", xScale.bandwidth())
		.attr("height", function(d,i){
			return ( height2) - yScale2(d.value);
		})
	//END CONTEXT -------------------------------------------------------------------------------

	// Initialize the Y axis
	var yScale = d3.scaleLinear()
	  .range([ (height *(3/4)) + (h1/2), 0]);
	var yAxis = focus.append("g")
	  .attr("class", "myYaxis")

	//0 == count
	//1 == popularity
	//2 == duration
	var yAxisOption = 0;

	//Sorting XAxis
	d3.select("#sort").on("change", sort);

	function sort(){
		//console.log("This.checked ", this.checked);
		focus.selectAll(".bar").style("opacity", 0.5).attr("stroke", "none");
		focus.selectAll(".selectedBar").attr("class", "bar");
		focus.selectAll(".clicked").attr("class", "bar");

		if(this.checked){
			isSortChecked = true;
		}else{
			isSortChecked = false;
		}

		var dataset = null;
		if(yAxisOption == 0){
			console.log("Count order");
			dataset = [];

			for(var ii = 0; ii < yearCount.length; ii++){
				dataset.push(JSON.parse(JSON.stringify(yearCount[ii])));
			}

			x0 = xScale.domain(dataset.sort(this.checked
				? function(a,b) { return b.value - a.value;}
				: function(a,b) { return a.year - b.year;})
				.map(function(d) { return d.year; }))
				.copy();

			focus.selectAll(".bar")
				.sort(function(a,b) {
					return x0(a.year) - x0(b.year);
				})

			context.selectAll(".subBar")
				.sort(function(a,b) {
					return x0(a.year) - x0(b.year);
				})

			var trans1 = focus.transition().duration(2000);
			var trans2 = context.transition().duration(2000);
			delay = function(d, i){
				return i * 200;
			}

			function opacityNormal(){
				//console.log("orginal");
				focus.selectAll(".bar").style("opacity", 1);
			}

			trans1.selectAll(".bar")
				.delay(delay)
			  	.attr("x", function(d) { return x0(d.year); })
			  	.end()
			  	.then(opacityNormal);

			trans1.select(".x.axis")
				.call(d3.axisBottom(x0))
				.selectAll("g")
				.delay(delay)
				.selectAll("text")  
				.attr("transform", "translate(-"+ 12 +",7)rotate(-90)")
			    .style("text-anchor", "end")
			    .style("font-size",textSizeAxisString);

			trans2.selectAll(".subBar")
				.delay(delay)
			  	.attr("x", function(d) { return x0(d.year); });

			trans2.select(".x.axis")
				.call(d3.axisBottom(x0).tickValues([]));
		}else if(yAxisOption == 1){
			console.log("Popularity order");
			dataset = [];

			for(var ii = 0; ii < yearData.length; ii++){
				dataset.push(JSON.parse(JSON.stringify(yearData[ii])));
			}

			x0 = xScale.domain(dataset.sort(this.checked
				? function(a,b) { return b.popularity - a.popularity;}
				: function(a,b) { return a.year - b.year;})
				.map(function(d) { return d.year; }))
				.copy();

			focus.selectAll(".bar")
				.sort(function(a,b) {
					return x0(a.year) - x0(b.year);
				})

			context.selectAll(".subBar")
				.sort(function(a,b) {
					return x0(a.year) - x0(b.year);
				})

			var trans1 = focus.transition().duration(2000);
			var trans2 = context.transition().duration(2000);
			delay = function(d, i){
				return i * 200;
			}

			function opacityNormal(){
				//console.log("orginal");
				focus.selectAll(".bar").style("opacity", 1);
			}

			trans1.selectAll(".bar")
				.delay(delay)
			  	.attr("x", function(d) { return x0(d.year); })
			  	.end()
			  	.then(opacityNormal);

			trans1.select(".x.axis")
				.call(d3.axisBottom(x0))
				.selectAll("g")
				.delay(delay)
				.selectAll("text")  
				.attr("transform", "translate(-"+ 12 +",7)rotate(-90)")
			    .style("text-anchor", "end")
			    .style("font-size",textSizeAxisString);

		    trans2.selectAll(".subBar")
				.delay(delay)
			  	.attr("x", function(d) { return x0(d.year); });

			trans2.select(".x.axis")
				.call(d3.axisBottom(x0).tickValues([]));
		}else{
			console.log("Duration order");
			dataset = [];

			for(var ii = 0; ii < yearData.length; ii++){
				dataset.push(JSON.parse(JSON.stringify(yearData[ii])));
			}

			x0 = xScale.domain(dataset.sort(this.checked
				? function(a,b) { return b.duration - a.duration;}
				: function(a,b) { return a.year - b.year;})
				.map(function(d) { return d.year; }))
				.copy();

			focus.selectAll(".bar")
				.sort(function(a,b) {
					return x0(a.year) - x0(b.year);
				})

			context.selectAll(".subBar")
				.sort(function(a,b) {
					return x0(a.year) - x0(b.year);
				})

			var trans1 = focus.transition().duration(2000);
			var trans2 = context.transition().duration(2000);
			delay = function(d, i){
				return i * 200;
			}

			function opacityNormal(){
				//console.log("orginal");
				focus.selectAll(".bar").style("opacity", 1);
			}

			trans1.selectAll(".bar")
				.delay(delay)
			  	.attr("x", function(d) { return x0(d.year); })
			  	.end()
			  	.then(opacityNormal);

			trans1.select(".x.axis")
				.call(d3.axisBottom(x0))
				.selectAll("g")
				.delay(delay)
				.selectAll("text")  
				.attr("transform", "translate(-"+ 12 +",7)rotate(-90)")
			    .style("text-anchor", "end")
			    .style("font-size",textSizeAxisString);

			trans2.selectAll(".subBar")
				.delay(delay)
			  	.attr("x", function(d) { return x0(d.year); });

			trans2.select(".x.axis")
				.call(d3.axisBottom(x0).tickValues([]));
		}
	}//end sort function

	//Initial chart
	//Y Axis
	yScale.domain([0, d3.max(yearCount, function(d) { return d.value; }) ]);
	yAxis.transition().duration(1000).call(d3.axisLeft(yScale));
	focus.append("text")
		.attr("class", "yAxisText")
		.attr("transform", "rotate(-90)")
		.attr("y", 0 - margin.left)
		.attr("x",0 - ((  (height * (3/4)) + (h1/2)) / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.text("Number of Songs");

	//Bars
	var bars = focus.selectAll("rect")
		.data(yearCount)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d,i){
			return xScale(d.year);
		})
		.attr("y", function(d,i){
			return yScale(d.value);
		})
		.attr("width", xScale.bandwidth())
		.attr("height", function(d,i){
			return ( (height * (3/4)) + (h1/2)) - yScale(d.value);
		})
		.attr("fill", "#69b3a2");
		bars.on("mouseover", function(event,d){
			tooltipDur
				.style("opacity", 0);
			tooltipPop
				.style("opacity", 0);
			var xy = d3.pointer(event, focus.node());
			tooltipCount.transition().duration(200).style("opacity", 0.9);
            tooltipCount
              .style("left", event.pageX - 420 + "px")
              .style("top", event.pageY + "px")
              .html("Year: " + (d.year) + "<br>" + "Count: " + (d.value));
        })
        .on("mousemove", function(event, d){ 
			tooltipCount
				.style("left", event.pageX -420 + "px")
		      .style("top", event.pageY  + "px")
		})
    	.on("mouseout", function(d){ 
    		tooltipCount
				.style("opacity", 0);
    	})
    	.on("click", function(event, d){
    		//If previously clicked or selected
    		if(d3.select(this).classed("selectedBar") || d3.select(this).classed("clicked")){
    			d3.select(this).attr("stroke", "none")
    				.attr("class", "bar");

    			var index = clickedRangeArray.indexOf(d.year);
    			if(index > -1){
    				clickedRangeArray.splice(index,1);
    			}
    		}else{
    			d3.select(this).attr("stroke", "black")
    				.attr("class", "bar clicked")
    			clickedRangeArray.push(d.year);
    		}

    		var final_range_array = []
			focus.selectAll(".selectedBar").data().forEach(function(d,i){
				final_range_array.push(d.year);
			})
			focus.selectAll(".clicked").data().forEach(function(d,i){
				final_range_array.push(d.year);
			})

			if(final_range_array.length > 0){
				var topArtistName = drawRadarChart(radarData, final_range_array);
				drawDonutChart2(radarData, topArtistName, final_range_array, true);
				globalRangeArray = [];
				globalRangeArray.push(...final_range_array);

				d3.select("#detailChartsTextUpdate").transition().duration(1000).style("opacity", 1)
				.transition().delay(1000).duration(2000).style("opacity", 0);
			}
    	});



	function update(newAxis){
		isSortChecked = false;
		focus.selectAll("rect").attr("stroke", "none");
		focus.selectAll(".selectedBar").attr("class", "bar");
		focus.selectAll(".clicked").attr("class", "bar");
		focus.selectAll(".yAxisText").remove();
		document.getElementById('sort').checked=false;

		if(newAxis == "popularity"){
			//Y Axis
			yAxisOption = 1
			yScale.domain([0, d3.max(yearData, function(d) { return d.popularity; }) ]);
  			yAxis.transition().duration(1000).call(d3.axisLeft(yScale));

  			console.log("Updating Bar Chart to Popularity");
  			//X Axis
  			focus.selectAll(".x.axis").remove();
  			xScale.domain(yearData.map(function(d) { return d.year; }));
  			xAxis = focus.append("g")
				.attr("class", "x axis")
			    .attr("transform", "translate(0," + ( (height * (3/4)) + (h1/2)) + ")")
			    .call(d3.axisBottom(xScale))
			    .selectAll("text")
				    .attr("transform", "translate(-"+ 12 +",7)rotate(-90)")
				    .style("text-anchor", "end")
				    .style("font-size",textSizeAxisString);

			//Y Axis Label
  			focus.append("text")
				.attr("class", "yAxisText")
				.attr("transform", "rotate(-90)")
				.attr("y", 0 - margin.left)
				.attr("x",0 - (( (height * (3/4)) + (h1/2)) / 2))
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text("Average Popularity of Songs");

			//Bars
  			var bars = focus.selectAll("rect")
  				.data(yearData)
  				.attr("x", function(d,i){
  					return xScale(d.year);
  				})
  				.attr("y", function(d,i){
  					return yScale(d.popularity);
  				})
  				.attr("width", xScale.bandwidth())
  				.attr("height", function(d,i){
  					return ( (height * (3/4)) + (h1/2)) - yScale(d.popularity);
  				})
  				.attr("fill", "#69b3a2");

  				bars.on("mouseover", function(event,d){
					tooltipDur
						.style("opacity", 0);
					tooltipCount
						.style("opacity", 0);
					var xy = d3.pointer(event, focus.node());
					tooltipPop.transition().duration(200).style("opacity", 0.9);
		            tooltipPop
		              .style("left", event.pageX - 420 + "px")
		              .style("top", event.pageY + "px")
		              .html("Year: " + (d.year) + "<br>" + "Average Popularity: " + (d.popularity).toFixed(2));
		        })
		        .on("mousemove", function(event, d){ 
					tooltipPop
						.style("left", event.pageX -420 + "px")
				      .style("top", event.pageY  + "px")
				})
		    	.on("mouseout", function(d){ 
		    		tooltipPop
						.style("opacity", 0);
		    	})
		    	.on("click", function(event, d){

		    		if(d3.select(this).classed("selectedBar") || d3.select(this).classed("clicked")){
		    			d3.select(this).attr("stroke", "none")
		    				.attr("class", "bar");

		    			var index = clickedRangeArray.indexOf(d.year);
		    			if(index > -1){
		    				clickedRangeArray.splice(index,1);
		    			}
		    		}else{
		    			d3.select(this).attr("stroke", "black")
		    				.attr("class", "bar clicked")
		    			clickedRangeArray.push(d.year);
		    		}

		    		var final_range_array = []
					focus.selectAll(".selectedBar").data().forEach(function(d,i){
						final_range_array.push(d.year);

					})
					focus.selectAll(".clicked").data().forEach(function(d,i){
						final_range_array.push(d.year);
					})

					if(final_range_array.length > 0){
						var topArtistName = drawRadarChart(radarData, final_range_array);
						drawDonutChart2(radarData, topArtistName, final_range_array, true);
						globalRangeArray = [];
						globalRangeArray.push(...final_range_array);

						d3.select("#detailChartsTextUpdate").transition().duration(1000).style("opacity", 1)
						.transition().delay(3000).duration(2000).style("opacity", 0);
					}
		    	});


		    	//UPDATE CONTEXT------------------------------------------------------------------------------

		    	//YScale
		    	yScale2.domain([0, d3.max(yearData, function(d) { return d.popularity; }) ]);

		    	//XAxis
		    	context.selectAll(".x.axis").remove();
		    	context.append('g')
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (height2) + ")")
				    .call(d3.axisBottom(xScale).tickValues([]));

				context.selectAll("rect")
	  				.data(yearData)
	  				.attr("x", function(d,i){
	  					return xScale(d.year);
	  				})
	  				.attr("y", function(d,i){
	  					return yScale2(d.popularity);
	  				})
	  				.attr("width", xScale.bandwidth())
	  				.attr("height", function(d,i){
	  					return( height2) - yScale2(d.popularity);
	  				})

	  			//END UPDATE CONTEXT ---------------------------------------------------------------------------
		}else if(newAxis == "duration"){
			yAxisOption = 2
			yScale.domain([0, d3.max(yearData, function(d) { return d.duration; }) ]);
  			yAxis.transition().duration(1000).call(d3.axisLeft(yScale));
  			focus.append("text")
  				.attr("class", "yAxisText")
				.attr("transform", "rotate(-90)")
				.attr("y", 0 - margin.left)
				.attr("x",0 - (( (height * (3/4)) + (h1/2)) / 2))
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text("Average Duration of Songs in Seconds");

			console.log("Updating Bar Chart to Duration");
			focus.selectAll(".x.axis").remove();
  			xScale.domain(yearData.map(function(d) { return d.year; }));
  			xAxis = focus.append("g")
				.attr("class", "x axis")
			    .attr("transform", "translate(0," + ( (height * (3/4)) + (h1/2)) + ")")
			    .call(d3.axisBottom(xScale))
			    .selectAll("text")
				    .attr("transform", "translate(-"+ 12 +",7)rotate(-90)")
				    .style("text-anchor", "end")
				    .style("font-size",textSizeAxisString);

  			var bars = focus.selectAll("rect")
  				.data(yearData)
  				.attr("x", function(d,i){
  					return xScale(d.year);
  				})
  				.attr("y", function(d,i){
  					return yScale(d.duration);
  				})
  				.attr("width", xScale.bandwidth())
  				.attr("height", function(d,i){
  					return (height * (3/4)) + (h1/2) - yScale(d.duration);
  				})
  				.attr("fill", "#69b3a2");

  				bars.on("mouseover", function(event,d){
  					tooltipPop
						.style("opacity", 0);
					tooltipCount
						.style("opacity", 0);
					var xy = d3.pointer(event, focus.node());
					tooltipDur.transition().duration(200).style("opacity", 0.9);
		            tooltipDur
		              .style("left", event.pageX -420 + "px")
		              .style("top", event.pageY + "px")
		              .html("Year: " + (d.year) + "<br>" + "Average Duration: " + (d.duration).toFixed(2));
		        })
		        .on("mousemove", function(event, d){ 
					tooltipDur
						.style("left", event.pageX -420 + "px")
				      .style("top", event.pageY  + "px")
				})
		    	.on("mouseleave", function(d){ 
		    		tooltipDur
						.style("opacity", 0);
		    	})
		    	.on("click", function(event, d){

		    		if(d3.select(this).classed("selectedBar") || d3.select(this).classed("clicked")){
		    			d3.select(this).attr("stroke", "none")
		    				.attr("class", "bar");
		    			var index = clickedRangeArray.indexOf(d.year);
		    			if(index > -1){
		    				clickedRangeArray.splice(index,1);
		    			}
		    		}else{
		    			d3.select(this).attr("stroke", "black")
		    				.attr("class", "bar clicked")
		    			clickedRangeArray.push(d.year);
		    		}

		    		var final_range_array = []
					focus.selectAll(".selectedBar").data().forEach(function(d,i){
						final_range_array.push(d.year);
					})
					focus.selectAll(".clicked").data().forEach(function(d,i){
						final_range_array.push(d.year);
					})

					if(final_range_array.length > 0){
						var topArtistName = drawRadarChart(radarData, final_range_array);
						drawDonutChart2(radarData, topArtistName, final_range_array, true);
						globalRangeArray = [];
						globalRangeArray.push(...final_range_array);

						d3.select("#detailChartsTextUpdate").transition().duration(1000).style("opacity", 1)
						.transition().delay(1000).duration(2000).style("opacity", 0);
					}
		    	});


		    	//UPDATE CONTEXT------------------------------------------------------------------------------

		    	//YScale
		    	yScale2.domain([0, d3.max(yearData, function(d) { return d.duration; }) ]);

		    	//XAxis
		    	context.selectAll(".x.axis").remove();
		    	context.append('g')
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (height2) + ")")
				    .call(d3.axisBottom(xScale).tickValues([]));

				context.selectAll("rect")
	  				.data(yearData)
	  				.attr("x", function(d,i){
	  					return xScale(d.year);
	  				})
	  				.attr("y", function(d,i){
	  					return yScale2(d.duration);
	  				})
	  				.attr("width", xScale.bandwidth())
	  				.attr("height", function(d,i){
	  					return( height2) - yScale2(d.duration);
	  				})

	  			//END UPDATE CONTEXT ---------------------------------------------------------------------------
		}else if(newAxis == "count"){
			yAxisOption = 0
			yScale.domain([0, d3.max(yearCount, function(d) { return d.value; }) ]);
  			yAxis.transition().duration(1000).call(d3.axisLeft(yScale));
  			focus.append("text")
  				.attr("class", "yAxisText")
				.attr("transform", "rotate(-90)")
				.attr("y", 0 - margin.left)
				.attr("x",0 - (( (height * (3/4)) + (h1/2)) / 2))
				.attr("dy", "1em")
				.style("text-anchor", "middle")
				.text("Number of Songs");

			console.log("Updating Bar Chart to Count");
			focus.selectAll(".x.axis").remove();
  			xScale.domain(yearData.map(function(d) { return d.year; }));
  			console.log(xScale(2019));
  			xAxis = focus.append("g")
				.attr("class", "x axis")
			    .attr("transform", "translate(0," + ( (height * (3/4)) + (h1/2)) + ")")
			    .call(d3.axisBottom(xScale))
			    .selectAll("text")
				    .attr("transform", "translate(-"+ 12 +",7)rotate(-90)")
				    .style("text-anchor", "end")
				    .style("font-size",textSizeAxisString);

  			var bars = focus.selectAll("rect")
  				.data(yearCount)
				.attr("x", function(d,i){
  					return xScale(d.year);
  				})
  				.attr("y", function(d,i){
  					return yScale(d.value);
  				})
  				.attr("width", xScale.bandwidth())
  				.attr("height", function(d,i){
  					return (height * (3/4)) + (h1/2) - yScale(d.value);
  				})
  				.attr("fill", "#69b3a2");
				
				bars.on("mouseover", function(event,d){
  				 	tooltipDur
						.style("opacity", 0);
					tooltipPop
						.style("opacity", 0);
					var xy = d3.pointer(event, focus.node());
					tooltipCount.transition().duration(200).style("opacity", 0.9);
		            tooltipCount
		              .style("left",  event.pageX -420 + "px")
		              .style("top", event.pageY + "px")
		              .html("Year: " + (d.year) + "<br>" + "Count: " + (d.value));
		        })
		        .on("mousemove", function(event, d){ 
					tooltipCount
						.style("left", event.pageX -420 + "px")
				      .style("top", event.pageY  + "px")
				})
		    	.on("mouseout", function(d){ 
		    		tooltipCount
						.style("opacity", 0);
		    	})
		    	.on("click", function(event, d){
		    		if(d3.select(this).classed("selectedBar") || d3.select(this).classed("clicked")){
		    			d3.select(this).attr("stroke", "none")
		    				.attr("class", "bar");

		    			var index = clickedRangeArray.indexOf(d.year);
		    			if(index > -1){
		    				clickedRangeArray.splice(index,1);
		    			}
		    		}else{
		    			d3.select(this).attr("stroke", "black")
		    				.attr("class", "bar clicked")
		    			clickedRangeArray.push(d.year);
		    		}

		    		var final_range_array = []
					focus.selectAll(".selectedBar").data().forEach(function(d,i){
						final_range_array.push(d.year);
					})
					focus.selectAll(".clicked").data().forEach(function(d,i){
						final_range_array.push(d.year);
					})

					if(final_range_array.length > 0){
						var topArtistName = drawRadarChart(radarData, final_range_array);
						drawDonutChart2(radarData, topArtistName, final_range_array, true);
						globalRangeArray = [];
						globalRangeArray.push(...final_range_array);

						d3.select("#detailChartsTextUpdate").transition().duration(1000).style("opacity", 1)
						.transition().delay(1000).duration(2000).style("opacity", 0);
					}
		    	});

   			//UPDATE CONTEXT------------------------------------------------------------------------------

	    	//YScale
	    	yScale2.domain([0, d3.max(yearCount, function(d) { return d.value; }) ]);

	    	//XAxis
	    	context.selectAll(".x.axis").remove();
	    	context.append('g')
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (height2) + ")")
			    .call(d3.axisBottom(xScale).tickValues([]));

			context.selectAll("rect")
  				.data(yearCount)
  				.attr("x", function(d,i){
  					return xScale(d.year);
  				})
  				.attr("y", function(d,i){
  					return yScale2(d.value);
  				})
  				.attr("width", xScale.bandwidth())
  				.attr("height", function(d,i){
  					return( height2) - yScale2(d.value);
  				})

  			//END UPDATE CONTEXT ---------------------------------------------------------------------------
		}
	}//end update


	function changed(){
		var form = document.getElementById("dimensionY")
    	var form_val;
    	for(var i=0; i<form.length; i++){
	        if(form[i].checked){
	          form_val = form[i].value;
	        }
	    }
	    update(form_val);
	}//end function changed 

	//Dimension Y Option
	var dataDim = d3.select("#dimensionY")
	dataDim.on("change", changed);

	var xS = d3.scaleBand().range([0, width]);
    xS.domain(yearData.map(function(d) { return d.year; }));

    function scaleBandInvert(scale) {
	  var domain = scale.domain();
	  var paddingOuter = scale(domain[0]);
	  var eachBand = scale.step();
	  return function (value) {
	    var index = Math.floor(((value - paddingOuter) / eachBand));
	    return domain[Math.max(0,Math.min(index, domain.length-1))];
	  }
	}

	function brushed({selection}){
		// console.log("Brush commenced");
		if(selection){
			var scaler = xS;

			if(isSortChecked){
				scaler = x0;
			}

			var [x00, x11] = selection.map(scaleBandInvert(scaler));

			if(!isSortChecked){
				focus.selectAll("rect").
				attr("stroke", function(d,i){
					//console.log("value d = ", d);
					if(d.year <= x11 &&  d.year >= x00){
						return "black";
					}else if(d3.select(this).classed("clicked")){
						return "black";
					}
					return "none";
				})
				.classed("selectedBar", function(d,i){
					if(d.year <= x11 &&  d.year >= x00){
						return true;
					}
					return false;
				})
			}else{
				var [tx,ty] = selection;

				//make array
				var inverter = scaleBandInvert(scaler);
				var i;
				var rangeArray = [];
				for(i = tx; i <= ty; i++){
					if(!(rangeArray.includes(inverter(i)))){
						rangeArray.push(inverter(i))
					}
				}

				focus.selectAll("rect").
				attr("stroke", function(d,i){
					//console.log("value d = ", d);
					if(rangeArray.includes(d.year)){
						return "black";
					}
					return "none";
				})
				.classed("selectedBar", function(d,i){
					if(rangeArray.includes(d.year)){
						return true;
					}
					return false;
				})
			}
		}else{
			console.log("yet");
		}
	}//end function brushed

	function brushend({selection}){
		if(selection){
			var scaler = xS;

			if(isSortChecked){
				scaler = x0;
			}

			var [x00, x11] = selection.map(scaleBandInvert(scaler));
			//Create an array
			var rangeArray = [];

			if(!isSortChecked){
				var start = x00;
				for(start = x00; start <= x11; start++){
					rangeArray.push(start);
				}
			}else{
				var [tx,ty] = selection;

				//make array
				var inverter = scaleBandInvert(scaler);
				var i;
				rangeArray = [];
				for(i = tx; i <= ty; i++){
					if(!(rangeArray.includes(inverter(i)))){
						rangeArray.push(inverter(i))
					}
				}
			}


			var final_range_array = []
			focus.selectAll(".selectedBar").data().forEach(function(d,i){
				final_range_array.push(d.year);
			})
			focus.selectAll(".clicked").data().forEach(function(d,i){
				final_range_array.push(d.year);
			})

			if(final_range_array.length > 0){
				var topArtistName = drawRadarChart(radarData, final_range_array);
				drawDonutChart2(radarData, topArtistName, final_range_array, true);
				globalRangeArray = [];
				globalRangeArray.push(...final_range_array);

				d3.select("#detailChartsTextUpdate").transition().duration(1000).style("opacity", 1)
				.transition().delay(1000).duration(2000).style("opacity", 0);
			}
		}else{
			focus.selectAll(".selectedBar").
				attr("stroke", "none")
				.attr("class", "bar");

			var final_range_array = []
			focus.selectAll(".clicked").data().forEach(function(d,i){
				final_range_array.push(d.year);
			})

			if(final_range_array.length > 0){
				var topArtistName = drawRadarChart(radarData, final_range_array);
				drawDonutChart2(radarData, topArtistName, final_range_array, true);
				globalRangeArray = [];
				globalRangeArray.push(...final_range_array);

				d3.select("#detailChartsTextUpdate").transition().duration(1000).style("opacity", 1)
				.transition().delay(1000).duration(2000).style("opacity", 0);
			}
		}
	}//end brushedend function


	//Brushing
	 var brush = d3.brushX()
	 .extent([[0,0],[width,height2]])
	 .on("brush", brushed)
	 .on("end", brushend);

	 context.append("g").call(brush);
	 console.log("Finished Drawing BarChart")
}//end drw bar chart