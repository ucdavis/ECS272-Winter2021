function drawRadarChart(data, sliderValue){

	 d3.select("#nValue").on("input", function(){
	 	// console.log(" New value year = ", +this.value);
	 	// console.log(" New value year data = ", data);
	 	drawRadarChart(data, +this.value);
	 })


	var yearGroupBy = groupBy(data, "year");

	//console.log("radar chart groupby ", yearGroupBy);

	function getSliderData(yearGroupBy, sliderValue){
		var res = [];

		Object.entries(yearGroupBy).every(function(d,i){
			if(parseInt(d[0]) == sliderValue){
				res = d[1];
				return false;
			}
			return true;
		})

		return res;
	}

	function groupByArtists(objectArray, property) {
	return objectArray.reduce(function (acc, obj) {
		var key = obj[property];

		//console.log("key ", key);

		for(var i = 0; i < key.length; i++){
			if (!acc[key[i]]) {
			  acc[key[i]] = []
			}
			acc[key[i]].push(obj)
			return acc
		}

	}, {})
	}
	

	var sliderValueDataArray = getSliderData(yearGroupBy, sliderValue);

	var sliderValueGroupByArtist = groupByArtists(sliderValueDataArray, "artists");

	// console.log("rs ", Object.entries(yearGroupBy));
	// console.log("res ", sliderValueDataArray);
	 console.log("art ", sliderValueGroupByArtist);

	 function getAvg(obj){
	 	var answ = [];

	 	Object.entries(sliderValueGroupByArtist).forEach(function(d,i){
	 		//console.log("d[1] ==== ", d[1]);
	 		var arrayOfArtist = d[1];
	 		var avg_pop = 0.0;
	 		var acousticness = 0.0;
			var instrumentalness = 0.0;
			var liveness = 0.0;
			var speechiness = 0.0;
			var danceability = 0.0;
			var energy = 0.0;

	 		arrayOfArtist.forEach(function(d1,i1){
	 			//console.log("d1 =  ", d1);
	 			avg_pop = avg_pop + d1.popularity;
	 			acousticness = acousticness +  d1.acousticness;
				instrumentalness = instrumentalness + d1.instrumentalness;
				liveness = liveness + d1.liveness;
				speechiness = speechiness + d1.speechiness;
				danceability = danceability + d1.danceability;
				energy = energy + d1.energy;
	 		})

	 		var temp = {
				artist: d[0],
				acousticness: acousticness/(arrayOfArtist.length),
				instrumentalness: instrumentalness/(arrayOfArtist.length),
				liveness: liveness/(arrayOfArtist.length),
				speechiness: speechiness/(arrayOfArtist.length),
				danceability: danceability/(arrayOfArtist.length),
				energy: energy/(arrayOfArtist.length),
				avg_pop: avg_pop/(arrayOfArtist.length)
			}

			answ.push(temp);
	 	})

	 	return answ;
	 }

	var averages = getAvg(sliderValueGroupByArtist);
	//console.log("averages =", averages);

	var averagesSortByPop = Object.entries(averages).sort(function(a,b){
		//console.log("a = ", a[1].length);
		if(a[1].avg_pop < b[1].avg_pop){
			return 1;
		}else if(b[1].avg_pop < a[1].avg_pop){
			return -1;
		}else{
			return 0;
		}
	})

	//console.log("averagesSortByPop =", averagesSortByPop);


	var avgTopCountArtist1 = averagesSortByPop[0][1];
	var avgTopCountArtist2 = averagesSortByPop[1][1];
	var avgTopCountArtist3 = averagesSortByPop[2][1];
	// console.log("avgTopCountArtist1  ", avgTopCountArtist1);
	// console.log("avgTopCountArtist2  ", avgTopCountArtist2);
	// console.log("avgTopCountArtist3  ", avgTopCountArtist3);
	//console.log("art sort ", answ);


	//Starting Drawing
	console.log("Drawing RadarChart");
	var inputHeight = document.getElementById('yearOption').clientHeight;
	var width = document.getElementById('yearOption').clientWidth;
	var height = (document.getElementById('test1').clientHeight);
	// console.log("Radar chart area width = ", width);
	// console.log("Radar chart area height = ", height);

	// d3.select("#test11").data().enter().forEach(function(d,i){
	// 	console.log("dddd = ", d);
	// })

	//width = width - 30;
	height = height/2 - offsetSpace;

	var fourth_width = width/4 - 10;
	//console.log("Radar chart area fourth_width = ", fourth_width);

	d3.select("#test11").selectAll('svg').remove();

	var radarChartSVG = d3.select("#test11").append("svg")
		.attr("width", width)
		.attr("height", height-inputHeight + 3.6);

	//TODO - inputHeight ot all height/2

	var radialScale = d3.scaleLinear()
		.domain([0,1])
		.range([0,fourth_width]);

	var ticks = [0.2,0.4, 0.6, 0.8, 1];

	//Drawing circles ticks
	ticks.forEach(function(d,i){
		radarChartSVG.append("circle")
		    .attr("cx", fourth_width)
		    .attr("cy", height/2)
		    .attr("fill", "none")
		    .attr("stroke", "gray")
		    .attr("r", radialScale(d));

		radarChartSVG.append("text")
		    .attr("x", fourth_width + 3)
		    .attr("y", height/2 - radialScale(d))
		    .text(d.toString())
	});

	//Drawing Axes
	function angleToCoordinate(angle, value, width, height){
	    var x = Math.cos(angle) * radialScale(value);
	    var y = Math.sin(angle) * radialScale(value);
	    return {"x": width + x, "y": height - y};
	}//end function

	var axesText = ["A", "D", "E", "I","L","S"];
	var axesTextReal = ["acousticness", "danceability", "energy", "instrumentalness","liveness","speechiness"];

	for(var i = 0; i < axesText.length; i++){
		var angle = (Math.PI / 2) + (2 * Math.PI * i / axesText.length);
		var line_coordinate = angleToCoordinate(angle, 1, fourth_width, height/2);

		var val = 1.15;

        var label_coordinate = angleToCoordinate(angle, val, fourth_width, height/2);

        radarChartSVG.append("line")
		    .attr("x1", fourth_width)
		    .attr("y1", height/2)
		    .attr("x2", line_coordinate.x)
		    .attr("y2", line_coordinate.y)
		    .attr("stroke","black");

		radarChartSVG.append("text")
		    .attr("x", label_coordinate.x)
		    .attr("y", label_coordinate.y)
		    .text(axesText[i]);
	}


	//Drawing Data
	var line = d3.line()
		.x(function(d,i){
			return d.x;
		})
		.y(function(d,i){
			return d.y;
		});

	//var colors = ["darkorange", "gray", "navy"];
	var colors = ["red", "green", "navy"];


	function getPathCoordinates(data_point){
		//console.log("data_point = ", data_point);
	    var coordinates = [];
	    var firstCoord = {};
	    for (var i = 0; i < axesText.length; i++){
	        var axes_name = axesTextReal[i];
	        var angle = (Math.PI / 2) + (2 * Math.PI * i / axesText.length);
	        // console.log("axes_name = ", axes_name);
	        // console.log("data_point[axes_name] = ", data_point[axes_name]);
	        // console.log("coords = ", angleToCoordinate(angle, data_point[axes_name], width/2, height/2))
	        coordinates.push(angleToCoordinate(angle, data_point[axes_name], fourth_width, height/2));
	    }
	    coordinates.push(coordinates[0]);
	    return coordinates;
	}

	var previouslyHoveredRegion = "NULL";

	//First Top Artist
	var coordinates = getPathCoordinates(avgTopCountArtist1);
	radarChartSVG.append("path")
	    .datum(coordinates)
	    .attr("d",line)
	    .attr("stroke-width", "2px")
	    .attr("stroke", colors[0])
	    .attr("fill", colors[0])
	    .attr("stroke-opacity", 1)
	    .attr("fill-opacity", 0.5)
	    .on('mouseover', function(event, d){
	    	//console.log("d hovered = ", d);
	    	previouslyHoveredRegion = d3.select(this);
	    	var allRegions = radarChartSVG.selectAll("path");

	    	allRegions.attr("fill-opacity", 0.1);
	    	allRegions.attr("stroke-opacity", 0.3);
	    	previouslyHoveredRegion.attr("fill-opacity", 0.6);
	    	previouslyHoveredRegion.attr("stroke-opacity", 1);

	    })
	    .on('mouseleave', function(d,i){
	    	previouslyHoveredRegion = "NULL";
	    	var allRegions = radarChartSVG.selectAll("path");
	    	allRegions.attr("fill-opacity", 0.5);
	    	allRegions.attr("stroke-opacity", 1);

	    });

	var coordinates = getPathCoordinates(avgTopCountArtist2);
	radarChartSVG.append("path")
	    .datum(coordinates)
	    .attr("d",line)
	    .attr("stroke-width","2px")
	    .attr("stroke", colors[1])
	    .attr("fill", colors[1])
	    .attr("stroke-opacity", 1)
	    .attr("fill-opacity", 0.5)
	    .on('mouseover', function(event, d){
	    	//console.log("d hovered = ", d);
	    	previouslyHoveredRegion = d3.select(this);
	    	var allRegions = radarChartSVG.selectAll("path");

	    	allRegions.attr("fill-opacity", 0.1);
	    	allRegions.attr("stroke-opacity", 0.3);
	    	previouslyHoveredRegion.attr("fill-opacity", 0.6);
	    	previouslyHoveredRegion.attr("stroke-opacity", 1);

	    })
	    .on('mouseleave', function(d,i){
	    	previouslyHoveredRegion = "NULL";
	    	var allRegions = radarChartSVG.selectAll("path");
	    	allRegions.attr("fill-opacity", 0.5);
	    	allRegions.attr("stroke-opacity", 1);

	    });

	var coordinates = getPathCoordinates(avgTopCountArtist3);
	//console.log("coordinates = ", coordinates);
	radarChartSVG.append("path")
	    .datum(coordinates)
	    .attr("d",line)
	    .attr("stroke-width", "2px")
	    .attr("stroke", colors[2])
	    .attr("fill", colors[2])
	    .attr("stroke-opacity", 1)
	    .attr("fill-opacity", 0.5)
	    .on('mouseover', function(event, d){
	    	//console.log("d hovered = ", d);
	    	previouslyHoveredRegion = d3.select(this);
	    	var allRegions = radarChartSVG.selectAll("path");

	    	allRegions.attr("fill-opacity", 0.1);
	    	allRegions.attr("stroke-opacity", 0.3);
	    	previouslyHoveredRegion.attr("fill-opacity", 0.6);
	    	previouslyHoveredRegion.attr("stroke-opacity", 1);

	    })
	    .on('mouseleave', function(d,i){
	    	previouslyHoveredRegion = "NULL";
	    	var allRegions = radarChartSVG.selectAll("path");
	    	allRegions.attr("fill-opacity", 0.5);
	    	allRegions.attr("stroke-opacity", 1);

	    });



	//Draw Radar Chart Legend
	var varLegend = radarChartSVG.append("svg")
		.attr("width", width/2)
		.attr("height", height/2)
		.attr("border", 1)
		.attr("transform", "translate(" + width/2 + ",0)");

	var ystep = 11
	varLegend.append('text').attr("x", "50%").attr("y", ystep+5).text("Average Song Charateristics").style("text-anchor", "middle").style("dominant-baseline", "middle").style("font-weight", "bold");

	varLegend.append('text').attr("x", "5%").attr("y", (ystep+5)*2).text("A: Acousticness").style("dominant-baseline", "middle");
	varLegend.append('text').attr("x", "5%").attr("y", (ystep+5)*3 ).text("D: Danceability").style("dominant-baseline", "middle");
	varLegend.append('text').attr("x", "5%").attr("y", (ystep+5)*4).text("E: Energy").style("dominant-baseline", "middle");
	varLegend.append('text').attr("x", "5%").attr("y", (ystep+5)*5).text("I: Instrumentalness").style("dominant-baseline", "middle");
	varLegend.append('text').attr("x", "5%").attr("y", (ystep+5)*6).text("L: Liveness").style("dominant-baseline", "middle");
	varLegend.append('text').attr("x", "5%").attr("y", (ystep+5)*7).text("S: Speechiness").style("dominant-baseline", "middle");


	//Draw Radar Chart Top 3 Legend
	var top3Name = [avgTopCountArtist1.artist, avgTopCountArtist2.artist, avgTopCountArtist3.artist];

	var boundaryWidth = (width/2) - ((width/2)*0.15);
	//console.log("boundaryWidth == ", boundaryWidth)
	var realTop3Labels = [];

	var top3Legend = radarChartSVG.append("svg")
		.attr("width", width/2)
		.attr("height", height/2)
		.attr("border", 1)
		.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
	top3Legend.append('text').attr("x", "50%").attr("y", ystep+5).text("Top 3 Popular Artists").style("text-anchor", "middle").style("dominant-baseline", "middle").style("font-weight", "bold");
	
	top3Legend.selectAll("fakelabels")
		.data(top3Name)
		.enter()
		.append("text")
		.attr("x", "15%")
		.attr("y", function(d,i){
			return (ystep+5)*(i+2);
		})
		.style("dominant-baseline", "middle")
		.text(function(d,i){
			return d;
		})
		.each(function(d,i){
			var thisWidth = this.getComputedTextLength();
			//console.log("thisWidth ", thisWidth);

			if(thisWidth > boundaryWidth){
				//console.log("Here Greater width", d);

				var text1 = d3.select(this);
				var words = d.split(/\s+/);
				var ellipsis = text1.text('').append('tspan').attr('class', 'elip').text('...');
    			var ellipsisWidth = ellipsis.node().getComputedTextLength();

    			var numWords = words.length;
    			var tspan = text1.insert('tspan', ':first-child').text(words.join(' '));

	    		while(tspan.node().getComputedTextLength() + ellipsisWidth > boundaryWidth && words.length){
	    			words.pop();
	    			tspan.text(words.join(' '));
	    		}

	    		realTop3Labels.push(text1.text());
			}else{
				realTop3Labels.push(d);
			}

			this.remove() // remove them just after displaying them
		});

		top3Legend.selectAll("fakelabels").remove();

		top3Legend.selectAll("labels")
			.data(realTop3Labels)
			.enter()
			.append("text")
			.attr("x", "15%")
			.attr("y", function(d,i){
				return (ystep+5)*(i+2);
			})
			.style("dominant-baseline", "middle")
			.text(function(d,i){
				return d;
			})




	// top3Legend.append('text').attr("x", "15%").attr("y", (ystep+5)*2).text(" " +avgTopCountArtist1.artist).style("dominant-baseline", "middle").style("width", width/2 + "px");

	// top3Legend.append('text').attr("x", "15%").attr("y", (ystep+5)*3).text(" " + avgTopCountArtist2.artist).style("dominant-baseline", "middle").style("width", width/2 + "px");

	// top3Legend.append('text').attr("x", "15%").attr("y", (ystep+5)*4).text(" " +avgTopCountArtist3.artist).style("dominant-baseline", "middle").style("width", width/2 + "px");

	top3Legend.selectAll('rect')
		.data(colors)
		.enter()
		.append('rect')
		.attr("x", "5%")
		.attr("y", function(d,i){
			return (ystep+5)*(i+2)-6;
		})
		.attr("width", 10)
		.attr("height", 10)
		.style("fill", function(d,i){
			return d;
		})


}//end function

