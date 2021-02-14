function drawDonutChart2(data, currentArtist, sliderValues, updateDropDown){

	console.log("Drawing Donut Chart2 for artist", currentArtist, "and year values ", sliderValues);

	var yearGroupBy = groupBy(data, "year");

	function getSliderData(yearGroupBy, sliderValues){
		var res2 =[];

		Object.entries(yearGroupBy).forEach(function(d, i){
			var inSliderValues = false;

			sliderValues.every(function(d1,i1){
				if(parseInt(d[0]) == d1){
					inSliderValues = true;
		 			return false;
				}
				return true;
			})

			if(inSliderValues){
				d[1].forEach(function(d1,i1){
					res2.push(d1);
				})
			}

		})

		return res2;
	}//end function

	function groupByArtists(objectArray, property) {
	return objectArray.reduce(function (acc, obj) {
		var key = obj[property];

		for(var i = 0; i < key.length; i++){
			if (!acc[key[i]]) {
			  acc[key[i]] = []
			}
			acc[key[i]].push(obj)
			return acc
		}

	}, {})
	}//end function

	function getArtistArray(arr){
		var artistSortShort = [];
		var temp = []
		Object.keys(arr).forEach(function(d,i){
			temp.push(d);
		})

		var tempSorted = temp.sort(d3.ascending);

		var widthDropDown = document.getElementById('test1').clientWidth;
		widthDropDown = widthDropDown - 30;
		var artistLabelWidth = document.getElementById('artistLabel').clientWidth;
		widthDropDown = widthDropDown - (artistLabelWidth*2);

		d3.select("#test12").append("svg").append('g')
		    .selectAll('.dummyText')     // declare a new CSS class 'dummyText'
		    .data(tempSorted)
		    .enter()                     // create new element
		    .append("text")              // add element to class
		    //.attr("opacity", 0.0)      // not really necessary
		    .text(function(d) { return d})
		    .each(function(d,i) {
		        var thisWidth = this.getComputedTextLength()

		        if(thisWidth > widthDropDown){
		        	var text1 = d3.select(this);
		        	var words = d.split(/\s+/);
		        	var ellipsis = text1.text('').append('tspan').attr('class', 'elip').text('...');
		    		var ellipsisWidth = ellipsis.node().getComputedTextLength();
		    		var numWords = words.length;
		    		var tspan = text1.insert('tspan', ':first-child').text(words.join(' '));

		    		while(tspan.node().getComputedTextLength() + ellipsisWidth > widthDropDown && words.length){
		    			words.pop();
		    			tspan.text(words.join(' '));
		    		}
		    		artistSortShort.push(text1.text());
		        }else{
		        	artistSortShort.push(d);
		        }

		        this.remove() // remove them just after displaying them
		    })

		return [tempSorted, artistSortShort];
	}//end function

	var sliderValueDataArray = getSliderData(yearGroupBy, sliderValues);
	var sliderValueGroupByArtist = groupByArtists(sliderValueDataArray, "artists");

	if(updateDropDown == true){
		var [sortedArtists, sortedShortArtists] = getArtistArray(sliderValueGroupByArtist);
		console.log("Updating DropDownMenu in DOnut Chart")

		var widthDropDown = document.getElementById('test1').clientWidth;
			widthDropDown = widthDropDown - 30;
			var artistLabelWidth = document.getElementById('artistLabel').clientWidth;
			widthDropDown = widthDropDown - (artistLabelWidth*2);

		var dropDownArtist = d3.select("#selectButton");

	    dropDownArtist.selectAll('*').remove();

		d3.select("#selectButton").attr("width", widthDropDown)
	      .selectAll('myOptions')
	     	.data(sortedShortArtists)
	      .enter()
	    	.append('option')
	      .text(function (d) { return d; }) // text showed in the menu
	      .attr("value", function (d, i) {
	       	return sortedArtists[i]; // corresponding value returned by the button
	      })
	      .property("selected", function(d){ return d === currentArtist; });
	    console.log("Finished Updating DropDownMenu in DOnut Chart")
	}//end if

	function getArtistData(arr, artistValue){
		var res = [];

		Object.entries(arr).every(function(d,i){
			if(d[0] == artistValue){
				res = d[1];
				return false;
			}
			return true;
		})

		return res;
	}//end function

	var artistData = getArtistData(sliderValueGroupByArtist,currentArtist);
	var keyGroupBy = groupBy(artistData, "key");

	function createArray(obj){
		var ans = [];
		var sum = 0;

		Object.entries(obj).forEach(function(d,i){
			var temp = {
				key: parseInt(d[0]),
				value: d[1].length
			}
			ans.push(temp);
			sum = sum + d[1].length;
		})
		return [ans, sum];
	}//end function

	var [arrayKeyNum, sumTotal] = createArray(keyGroupBy);

	var colorScale= d3.scaleOrdinal()
		.domain(arrayKeyNum)
		.range(d3.schemeSet3);

	var pie = d3.pie()
		.value(function(d){
			return d.value;
		});

	var dataPie = pie(arrayKeyNum);

	//Tooltip donut
	d3.select("#test12").selectAll(".tooltip").remove();
	var tooltipDonut = d3.select("#test12").append("div").attr("class", "tooltip").attr("id", "tooltipDonut").style("opacity", 0);

	//Drawing Donut Chart
	var width = document.getElementById('test1').clientWidth;
	var height = (document.getElementById('test1').clientHeight);
	var artistLabelHeight = document.getElementById('artistLabel').clientHeight;

	width = width - 30 ;
	height = height/2 - artistLabelHeight;
	var margin = 20;
	var radius = Math.min(width, height) / 2 - margin;

	d3.select("#test12").selectAll('svg').remove();
	var donutChartSVG = d3.select("#test12").append("svg")
		.attr("width", width)
		.attr("height", height)

  	var colorsUsed = [];
  	var keysUsed = [];
  	var keysText = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];

  	//Draw Donut
	var donut = donutChartSVG.selectAll('path')
		.data(dataPie)
		.enter()
		.append('path')
		.attr('d', d3.arc()
			.innerRadius(radius/2) //TODO adjust 50
			.outerRadius(radius)
		)
		.attr("fill", function(d){
			colorsUsed.push(colorScale(d.data.key));
			keysUsed.push(d.data.key);
			return colorScale(d.data.key);
		})
		.attr("stroke", "black")
		.style("stroke-width", "2px")


	donut.attr("transform", "translate(" + (width / 2 - (width/8) - (margin/2)) + "," + height / 2 + ")");
	donut.on("mouseover", function(event,d){
		tooltipDonut.transition().duration(200).style("opacity", 0.9);
	    tooltipDonut
	      .style("left", event.pageX + "px")
	      .style("top", event.pageY  + "px")
	      .html("Key: " + keysText[d.data.key] + "<br>" + "Percentage: " + ((d.data.value / sumTotal) * 100).toFixed(2) + "%" + "<br>"
	      	+ "Count of Songs: " + d.data.value);
	})
	.on("mousemove", function(event, d){ 
		tooltipDonut
			.style("left", event.pageX + "px")
	      .style("top", event.pageY  + "px")
	})
	.on("mouseout", function(d){ 
		tooltipDonut
			.style("opacity", 0);
	})

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

	console.log("Finished Drawing Donut Chart");
}//end function