function groupBy(objectArray, property) {
	return objectArray.reduce(function (acc, obj) {
		let key = obj[property]
		if (!acc[key]) {
		  acc[key] = []
		}
		acc[key].push(obj)
		return acc
	}, {})
}//end function

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
}//end function

function collectAllArtists(objectArray){
	var res = [];

	Object.entries(objectArray).forEach(function(d,i){
		res.push(d[0]);
	})

	return res;
}//end function

var offsetSpace = 5;
var globalRangeArray = [1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

d3.csv("./data/data_by_year.csv").then(function(data) {
  
  data.forEach(function(d,i){
  	d.valence = +d.valence;
  	d.year = +d.year;
  	d.acousticness = +d.acousticness;
  	d.danceability = +d.danceability;
  	d.energy = +d.energy;
  	d.popularity = +d.popularity;
  	d.duration = +d["duration_ms"] / 1000;
  })


  d3.csv("./data/data.csv").then(function(data2) {

  	data2.forEach(function(d,i){
		d.valence = +d.valence;
		d.year = +d.year;
		d.acousticness = +d.acousticness;
		d.danceability = +d.danceability;
		d.energy = +d.energy;
		d.instrumentalness = +d.instrumentalness;
		d.liveness = +d.liveness;
		d.speechiness = +d.speechiness;
		d.popularity = +d.popularity;
		d.duration = +d["duration_ms"] / 1000;
		d.key = +d.key;

		var newString = d.artists.replace('[', '');
		var newString2 = newString.replace(']', '');
		var newString3 = newString2.replace(/'/g, '');
		var newString4 = newString3.replace(/, /g, ',');
		var newString5 = newString4.replace(/"/g, '');
		var arr = newString5.split(',');
		
		d.artists = arr;
	})


	var yearGroup = groupBy(data2, "year");

	function countGroupBy(arr){
		var ans = [];

		Object.entries(arr).forEach(function(d,i){
			var temp = {
				year: parseInt(d[0]),
				value: d[1].length
			}
			ans.push(temp);
		})
		return ans;
	}


	var yearGroupCount = countGroupBy(yearGroup);
	// console.log("yearGroupCount ", yearGroupCount);



	//For Donut chart
	var sliderValueGroupByArtist = groupByArtists(data2, "artists");
	//console.log(" donut sliderValueGroupByArtist = ", sliderValueGroupByArtist);

	var allArtistName = collectAllArtists(sliderValueGroupByArtist);
	//console.log(" donut allArtistName = ", allArtistName);

	var allArtistNameSort = allArtistName.sort(d3.ascending);
	//console.log(" donut allArtistNameSort = ", allArtistNameSort);

	var width = document.getElementById('test1').clientWidth;
	var height = (document.getElementById('test1').clientHeight);

	width = width - 30;
	height = height/2;

	var artistLabelWidth = document.getElementById('artistLabel').clientWidth;
	width = width - (artistLabelWidth*2);
	var textWidth = [];
	var artistSortShort = [];

	d3.select("#test12").append("svg").append('g')
    .selectAll('.dummyText')     // declare a new CSS class 'dummyText'
    .data(allArtistNameSort)
    .enter()                     // create new element
    .append("text")              // add element to class
    //.attr("opacity", 0.0)      // not really necessary
    .text(function(d) { return d})
    .each(function(d,i) {
        var thisWidth = this.getComputedTextLength()
        textWidth.push(thisWidth);


        if(thisWidth > width){
        	//console.log("Here Greater width", d);
        	var text1 = d3.select(this);
        	//console.log("this text = ", text1);
        	var words = d.split(/\s+/);
        	//console.log("words ", words);
        	var ellipsis = text1.text('').append('tspan').attr('class', 'elip').text('...');
    		//console.log("ellipsis ", ellipsis.text());
    		var ellipsisWidth = ellipsis.node().getComputedTextLength();
    		var numWords = words.length;
    		var tspan = text1.insert('tspan', ':first-child').text(words.join(' '));

    		while(tspan.node().getComputedTextLength() + ellipsisWidth > width && words.length){
    			words.pop();
    			tspan.text(words.join(' '));
    		}

    		//console.log("text final = ", text1.text());
    		artistSortShort.push(text1.text());

        }else{
        	artistSortShort.push(d);
        }

        this.remove() // remove them just after displaying them
    })


    //var defaultOptionName = "Bruno Mars";
    var defaultOptionName = "Ritt Momney";
    var dropDownArtist = d3.select("#selectButton");

    dropDownArtist.selectAll('*').remove();

	 d3.select("#selectButton").attr("width", width)
      .selectAll('myOptions')
     	.data(artistSortShort)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d, i) {
       	return allArtistNameSort[i]; // corresponding value returned by the button
      })
      .property("selected", function(d){ return d === defaultOptionName; })


	d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        //console.log("globalRangeArray ", globalRangeArray);
        drawDonutChart2(data2,selectedOption, globalRangeArray, false);
    })

	drawBarChart(data, yearGroupCount, data2);
	drawRadarChart(data2, globalRangeArray);
	drawDonutChart2(data2, defaultOptionName, globalRangeArray, true);
  })


  function resize(){
  	console.log("in resize function");
  }

  window.onresize= resize;
});