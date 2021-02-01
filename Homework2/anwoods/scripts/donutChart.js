function drawDonutChart(sliderValueGroupByArtist, currentArtist){

	console.log("Drawing Donut Chart");

	function getArtistData(arr, artistValue){
		var res = [];

		Object.entries(arr).every(function(d,i){
			if(i < 10){
				console.log("d[0] = ", d[0]);
			}


			if(d[0] == artistValue){
				res = d[1];
				return false;
			}
			return true;
		})

		return res;
	}

	var artistData = getArtistData(sliderValueGroupByArtist,currentArtist);
	//console.log(" donut artistData = ", artistData);


	var keyGroupBy = groupBy(artistData, "key");
	//console.log(" donut keyartistData = ", keyGroupBy);

	function createArray(obj){
		var ans = [];

		Object.entries(obj).forEach(function(d,i){
			var temp = {
				key: parseInt(d[0]),
				value: d[1].length
			}
			ans.push(temp);
		})
		return ans;
	}

	var arrayKeyNum = createArray(keyGroupBy);
	// console.log(" donut arrayKeyNum = ", arrayKeyNum);
	// console.log(" donut arrayKeyNum = ", arrayKeyNum.keys);

	var colorScale= d3.scaleOrdinal()
		.domain(arrayKeyNum)
		.range(d3.schemeSet3);

	// console.log("first color = ", colorScale(arrayKeyNum[0].key))
	// console.log("second color = ", colorScale(arrayKeyNum[1].key));

	var pie = d3.pie()
		.value(function(d){
			//console.log("d.value ", d.value);
			return d.value;
		});

	var dataPie = pie(arrayKeyNum);
	//console.log("datapie = ", dataPie);

	//Draw DropDownMenu
	//Todo remove?
	// d3.select("#selectButton")
	// 	.selectAll('myOptions')
	// 	.data(allArtistNameSort)
	// 	.enter()



	//Drawing Donut Chart
	var width = document.getElementById('test1').clientWidth;
	var height = (document.getElementById('test1').clientHeight);
	// console.log("total Donut chart area width = ", width);
	// console.log("total Donut chart area height = ", height);

	var artistLabelHeight = document.getElementById('artistLabel').clientHeight;
	var radarHeight = document.getElementById('test11').clientHeight;
	//console.log("total radarHeight = ", radarHeight);

	width = width - 30 ;
	height = height/2 - artistLabelHeight;
	// console.log("Donut chart area width = ", width);
	// console.log("Donut chart area height = ", height);
	var margin = 20;
	var radius = Math.min(width, height) / 2 - margin;
	//console.log("radius", radius*2);

	d3.select("#test12").selectAll('svg').remove();

	var donutChartSVG = d3.select("#test12").append("svg")
		.attr("width", width)
		.attr("height", height)
		// .append("g")
  //   		.attr("transform", "translate(" + width / 4 + "," + height / 2 + ")");
  	var colorsUsed = [];
  	var keysUsed = [];
  	var keysText = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];

	var donut = donutChartSVG.selectAll('path')
		.data(dataPie)
		.enter()
		.append('path')
		.attr('d', d3.arc()
			.innerRadius(radius/2) //TODO adjust 50
			.outerRadius(radius)
		)
		.attr("fill", function(d){
			//console.log("d.data.key ", d.data.key);
			colorsUsed.push(colorScale(d.data.key));
			keysUsed.push(d.data.key);
			return colorScale(d.data.key);
		})
		.attr("stroke", "black")
		.style("stroke-width", "2px")
		//.style("opacity", 0.7);

	donut.attr("transform", "translate(" + (width / 2 - (width/8) - (margin/2)) + "," + height / 2 + ")");

	var colorKeyLegend = donutChartSVG.append("svg")
		.attr("width", width - (radius*2 + margin))
		.attr("height", height)
		.attr("border", 1)
		.attr("transform", "translate(" + (radius*2 + margin) + ",0)");

	var ystep = 11
	colorKeyLegend.append('text').attr("x", "50%").attr("y", ystep+5).text("Key of Songs").style("text-anchor", "middle").style("dominant-baseline", "middle").style("font-weight", "bold");
	var rectOffSet = 12;

	colorKeyLegend.selectAll('rect')
			.data(colorsUsed)
			.enter()
			.append('rect')
			.attr("x", rectOffSet)
			.attr("y", function(d,i){
				return (ystep+5)*(i+2)-6;
			})
			.attr("width", 10)
			.attr("height", 10)
			.style("fill", function(d,i){
				return d;
			})
			// .style("opacity", 0.7)
			.style("stroke", "black")
			.style("stroke-width", "2px");

	colorKeyLegend.selectAll('labels')
			.data(keysUsed)
			.enter()
			.append('text')
			.attr("x", rectOffSet + 10 + 2)
			.attr("y", function(d,i){
				return (ystep+5)*(i+2);
			})
			.text(function(d,i){
				return keysText[d];
			})
			.style("dominant-baseline", "middle");


}