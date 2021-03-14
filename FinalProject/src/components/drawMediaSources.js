import * as d3 from "d3";

export function drawMediaSources(myImage, washingtonImg, breitbartImg, cnnImg, nyImg, abcImg){
	console.log("in draw media sources");

	var sources = ["Fox News", "New York Times", "ABC News", "Breitbart", "CNN", "Washington Post"];
	var numberArticles = [1918, 1224,1142,1056,1056,860];
	var maxNumArticles = 1918;
	var percent = [numberArticles[0]/maxNumArticles, numberArticles[1]/maxNumArticles, numberArticles[2]/maxNumArticles, numberArticles[3]/maxNumArticles, numberArticles[4]/maxNumArticles, numberArticles[5]/maxNumArticles];

	d3.select("#divMediaSources").style("width", "75%").style("height", "100%");

	var divMediaSources = document.getElementById("divMediaSources").getBoundingClientRect();

	// console.log("height is ", divMediaSources.height);
	// console.log("width is", divMediaSources.width);
	       //  "ABC News": 1142,
        // "Breitbart": 1056,
        // "CNN": 1056,
        // "FoxNews": 1918,
        // "New York Times": 1224,
        // "Washington Post": 860

	var thirdWidth = divMediaSources.width / 3;
	var halfHeight = divMediaSources.height / 2;
	var radius = Math.min(thirdWidth * 0.8, halfHeight * 0.8)/2;

	var svg = d3.select("#divMediaSources").append("svg").attr("id", "svgMediaSources")
	.attr("width", divMediaSources.width)
	.attr("height", divMediaSources.height);

	
	var media = svg.append("g")
		.selectAll("rect")
		.data(sources)
		.enter();

	media.append("rect")
		.attr("x", function(d,i){
			if(i == 0 || i == 3){
				return 0;
			}else if(i == 1 || i == 4){
				return thirdWidth;
			}else{
				return thirdWidth *2;
			}
		})
		.attr("y", function(d,i){
			if(i < 3){
				return 0;
			}else{
				return halfHeight;
			}
		})
		.attr("width", thirdWidth)
		.attr("height", halfHeight)
		.attr('stroke', 'none')
  		.attr('fill', 'none');

  	media.append("text")
  		.text( function(d){
  			return d;
  		})
  		.attr("y", function(d,i){
  			// console.log("font size" , d3.select(this).style("font-size"))
  			if(i < 3){
  				return parseFloat(d3.select(this).style("font-size"));
  			}else{
  				//console.log("half height + ", halfHeight + parseFloat(d3.select(this).style("font-size")))
  				return halfHeight + parseFloat(d3.select(this).style("font-size"));
  			}
  		})
  		.attr("x", function(d,i){
  			if( i == 0 || i == 3){
  				return thirdWidth/2;
  			}else if( i == 1 || i == 4){
  				return divMediaSources.width/2;
  			}else{
  				return divMediaSources.width * (5/6);
  			}
  		})
  		.attr("text-anchor", "middle");



  	media.append("circle")
  		.attr("cx", function(d,i){
  			if(i == 0 || i == 3){
				return thirdWidth/2;
			}else if(i == 1 || i == 4){
				return divMediaSources.width/2;
			}else{
				return divMediaSources.width * (5/6);
			}
  		})
  		.attr("cy", function(d,i){
  			if( i < 3){
				return halfHeight/2;
			}else{
				return halfHeight + halfHeight/2;
			}
  		})
  		.attr("r", function(d,i){
  			console.log(" num is ", (radius*numberArticles[i])/maxNumArticles);
  			return (radius*numberArticles[i])/maxNumArticles;
  		})
  		.style("fill", "#D3D3D3")
  		.style("stroke", "black");

  	svg.append("image")
  		.attr("xlink:href", myImage)
  		.attr("x", thirdWidth/2 -((radius*0.8)/2))
  		.attr("y", halfHeight/2 - radius*0.8)
  		.attr("width", radius *0.8)
    	.attr("height", radius*0.8);

    svg.append("image")
  		.attr("xlink:href", nyImg)
  		.attr("x", function(d,i){
  			//divMediaSources.width/2 -((radius*0.8)/2)
  			return divMediaSources.width/2 -((((radius*numberArticles[1])/maxNumArticles)*0.8)/2)
  		})
  		.attr("y", function(d,i){
  			return halfHeight/2 - (((radius*numberArticles[1])/maxNumArticles)*0.8);
  		})
  		.attr("width", function(d,i){
  			//((radius*numberArticles[i])/maxNumArticles)*0.8
  			return ((radius*numberArticles[1])/maxNumArticles)*0.8;
  		})
    	.attr("height", function(d,i){
  			return ((radius*numberArticles[1])/maxNumArticles)*0.8;
  		});

    svg.append("image")
  		.attr("xlink:href", abcImg)
  		.attr("x", divMediaSources.width * (5/6) -((((radius*numberArticles[2])/maxNumArticles)*0.8)/2))
  		.attr("y", halfHeight/2 - (((radius*numberArticles[2])/maxNumArticles)*0.8))
  		.attr("width", ((radius*numberArticles[2])/maxNumArticles)*0.8)
    	.attr("height", ((radius*numberArticles[2])/maxNumArticles)*0.8);

    svg.append("image")
  		.attr("xlink:href", breitbartImg)
  		.attr("x", thirdWidth/2  - (((radius*numberArticles[3])/maxNumArticles)*0.8)/2)
  		.attr("y", halfHeight + halfHeight/2 - ((radius*numberArticles[3])/maxNumArticles)*0.8)
  		.attr("width", ((radius*numberArticles[3])/maxNumArticles)*0.8)
    	.attr("height",((radius*numberArticles[3])/maxNumArticles)*0.8);

    svg.append("image")
  		.attr("xlink:href", cnnImg)
  		.attr("x", divMediaSources.width/2  -((((radius*numberArticles[4])/maxNumArticles)*0.8)/2))
  		.attr("y", halfHeight + halfHeight/2 - ((radius*numberArticles[4])/maxNumArticles)*0.8)
  		.attr("width", ((radius*numberArticles[4])/maxNumArticles)*0.8)
    	.attr("height", ((radius*numberArticles[4])/maxNumArticles)*0.8);

    svg.append("image")
  		.attr("xlink:href", washingtonImg)
  		.attr("x", divMediaSources.width * (5/6)  -((((radius*numberArticles[5])/maxNumArticles)*0.8)/2))
  		.attr("y", halfHeight + halfHeight/2 - ((radius*numberArticles[5])/maxNumArticles)*0.8)
  		.attr("width", ((radius*numberArticles[5])/maxNumArticles)*0.8)
    	.attr("height", ((radius*numberArticles[5])/maxNumArticles)*0.8);

   	var textPixels = (radius/4);


   	media.append("text")
   		.text(function(d,i){
   			return numberArticles[i] + " Articles";
   		})
   		.attr("x", function(d,i){
   			if( i == 0 || i == 3){
  				return thirdWidth/2;
  			}else if( i == 1 || i == 4){
  				return divMediaSources.width/2;
  			}else{
  				return divMediaSources.width * (5/6);
  			}
   		})
   		.attr("y", function(d,i){
   			if(i < 3){
   				return halfHeight/2  + (((radius*numberArticles[i])/maxNumArticles)/4);
   			}else{
   				return halfHeight + halfHeight/2 + (((radius*numberArticles[i])/maxNumArticles)/4) ;
   			}
   		})
   		.attr("text-anchor", "middle")
   		.style("font-size",function(d,i){
   			var res = (((radius*numberArticles[i])/maxNumArticles)/4)

   			return res + "px";
   		});

}

export function drawMediaSources2(myImage, washingtonImg, breitbartImg, cnnImg, nyImg, abcImg){
	var sources = ["FoxNews", "NewYorkTimes", "ABCNews", "Breitbart", "CNN", "WashingtonPost"];
	//var sources = ["FoxNews", "WashingtonPost", "Breitbart", "CNN", "NewYorkTimes", "ABCNews"];

	d3.select("#divMediaSources").style("width", "75%").style("height", "100%");

	var divMediaSources = document.getElementById("divMediaSources").getBoundingClientRect();


	var tenthHeight = divMediaSources.height *0.1;
	var thirdWidth = divMediaSources.width / 3;
	var radius = Math.min(thirdWidth, tenthHeight)/2;

	var svg = d3.select("#divMediaSources").append("svg").attr("id", "svgMediaSources")
	.attr("width", divMediaSources.width)
	.attr("height", divMediaSources.height);

	var media = svg.append("g")
		.selectAll("dots")
		.data(sources)
		.enter();

	media.append("circle")
		.attr("id", function(d,i){
			return "circle" + d;
		} )
		.attr("cx", function(d,i){
  			if(i == 0 || i == 3){
				return thirdWidth/2;
			}else if(i == 1 || i == 4){
				return divMediaSources.width/2;
			}else{
				return divMediaSources.width * (5/6);
			}
  		})
  		.attr("cy", function(d,i){
  			if( i < 3){
				return radius;
			}else{
				return (divMediaSources.height - tenthHeight) + radius;
			}
  		})
  		.attr("r", radius)
  		.style("fill", "#D3D3D3")
  		.style("stroke", "black");

  	svg.append("image")
  		.attr("id", "imgFox")
  		.attr("xlink:href", myImage)
  		.attr("x", thirdWidth/2 -((radius*0.9)/2))
  		.attr("y", radius/2)
  		.attr("width", radius *0.9)
    	.attr("height", radius*0.9);

    svg.append("image")
    	.attr("id", "imgNY")
  		.attr("xlink:href", nyImg)
  		.attr("x", divMediaSources.width/2 -((radius*0.9)/2))
  		.attr("y", radius/2)
  		.attr("width", radius *0.9)
    	.attr("height", radius*0.9);

    svg.append("image")
    	.attr("id", "imgABC")
  		.attr("xlink:href", abcImg)
  		.attr("x", divMediaSources.width * (5/6) -((radius*0.9)/2))
  		.attr("y", radius/2)
  		.attr("width", radius *0.9)
    	.attr("height", radius*0.9);

    svg.append("image")
    	.attr("id", "imgBreitbart")
  		.attr("xlink:href", breitbartImg)
  		.attr("x", thirdWidth/2  -((radius*0.9)/2))
  		.attr("y", (divMediaSources.height - tenthHeight) + radius/2)
  		.attr("width", radius *0.9)
    	.attr("height", radius*0.9);

    svg.append("image")
    	.attr("id", "imgCNN")
  		.attr("xlink:href", cnnImg)
  		.attr("x", divMediaSources.width/2  -((radius*0.9)/2))
  		.attr("y", (divMediaSources.height - tenthHeight) + radius/2)
  		.attr("width", radius *0.9)
    	.attr("height", radius*0.9);

    svg.append("image")
    	.attr("id", "imgWashington")
  		.attr("xlink:href", washingtonImg)
  		.attr("x", divMediaSources.width * (5/6)  -((radius*0.9)/2))
  		.attr("y", (divMediaSources.height - tenthHeight) + radius/2)
  		.attr("width", radius *0.9)
    	.attr("height", radius*0.9);

    var largestRadius = Math.min(divMediaSources.width, divMediaSources.height*0.8)/2;
    var radiusStep = (largestRadius - radius) /6;

    svg.append("circle")
    	.attr("id", "mainCircle")
    	.attr("cx", divMediaSources.width/2 )
    	.attr("cy", divMediaSources.height/2)
    	.attr("r", radius)
    	.style("fill", "#b9dcef")
  		.style("stroke", "black")
  		.attr("complete", false); 

  	var textPixels = (radius/5);

  	svg.append("text")
  		.attr("id", "mainText")
  		.text( function(d){
  			return "Covid-19 Articles";
  		})
  		.attr("y", function(d,i){
  			return divMediaSources.height/2  - textPixels;
  		})
  		.attr("x", function(d,i){
  			return divMediaSources.width/2;
  		})
  		.attr("text-anchor", "middle")
   		.style("font-size", textPixels + "px");

   	svg.append("text")
  		.attr("id", "countText")
  		.attr("count", 0)
  		.text( function(d){
  			return "Count: " + 0;
  		})
  		.attr("y", function(d,i){
  			return divMediaSources.height/2  + textPixels;
  		})
  		.attr("x", function(d,i){
  			return divMediaSources.width/2;
  		})
  		.attr("text-anchor", "middle")
   		.style("font-size", textPixels + "px");


//var numberArticles = [4829, 4431,3599,3577,2806,2377];
	var numberArticles = [1918, 1224,1142,1056,1056,860];


  	setTimeout( () => {
    	d3.select("#circleFoxNews")
	  		.transition()
	  		.duration(1000)
	  		.attr("cx", divMediaSources.width/2)
	  		.attr("cy", divMediaSources.height/2)

    	d3.select("#imgFox")
	  		.transition()
	  		.duration(1000)
	  		.attr("x", divMediaSources.width/2 -((radius)/2))
	  		.attr("y", divMediaSources.height/2 -((radius)/2))
    }, 1000);

    setTimeout( () => {
    	var prevRadius = d3.select("#mainCircle").attr("r");
    	d3.select("#mainCircle")
	  		.transition()
	  		.duration(1000)
	  		.attr("r", radius + radiusStep)

	  	d3.select("#mainText")
	  		.transition()
	  		.duration(1000)
	  		.style("font-size",  (radius + radiusStep)/5 + "px")
	  		.attr("y", divMediaSources.height/2 - ((radius + radiusStep)/5));

	  	var textRounder = function(value){ return Math.round(value); };

	  	var textTween = function(){
	  		//console.log("here ", d3.select(this).attr("count"));
            var i = d3.interpolate(d3.select(this).attr("count"), numberArticles[0]);
            return function(t) { this.textContent = "Count: " + textRounder(i(t)); }
            //return 30;
        };
        d3.select("#countText").transition()
            .duration(1000)
            .tween("text", textTween)
            .style("font-size",  (radius + radiusStep)/5 + "px")
            .attr("y", divMediaSources.height/2 + ((radius + radiusStep)/5))
			.attr("count",  numberArticles[0]);

    }, 1500);

    setTimeout( () => {
    	d3.select("#circleNewYorkTimes")
	  		.transition()
	  		.duration(1000)
	  		.attr("cx", divMediaSources.width/2)
	  		.attr("cy", divMediaSources.height/2)

    	d3.select("#imgNY")
	  		.transition()
	  		.duration(1000)
	  		.attr("x", divMediaSources.width/2 -((radius)/2))
	  		.attr("y", divMediaSources.height/2 -((radius)/2))
    }, 2000);

    setTimeout( () => {
    	var prevRadius = d3.select("#mainCircle").attr("r");
    	d3.select("#mainCircle")
	  		.transition()
	  		.duration(1000)
	  		.attr("r", radius + (radiusStep*2))

	  	d3.select("#mainText")
	  		.transition()
	  		.duration(1000)
	  		.style("font-size",  (radius + (radiusStep*2))/5 + "px")
	  		.attr("y", divMediaSources.height/2 - ((radius + (radiusStep*2))/5));

	  	var textRounder = function(value){ return Math.round(value); };

	  	var textTween = function(){
	  		//console.log("here ", d3.select(this).attr("count"));
            var i = d3.interpolate(d3.select(this).attr("count"), numberArticles[0] + numberArticles[1]);
            return function(t) { this.textContent = "Count: " + textRounder(i(t)); }
            //return 30;
        };
        d3.select("#countText").transition()
            .duration(1000)
            .tween("text", textTween)
            .style("font-size",  (radius + (radiusStep*2))/5 + "px")
            .attr("y", divMediaSources.height/2 + ((radius + (radiusStep*2))/5))
			.attr("count",  numberArticles[0] + numberArticles[1]);
    }, 2500);

    setTimeout( () => {
    	d3.select("#circleABCNews")
	  		.transition()
	  		.duration(1000)
	  		.attr("cx", divMediaSources.width/2)
	  		.attr("cy", divMediaSources.height/2)

    	d3.select("#imgABC")
	  		.transition()
	  		.duration(1000)
	  		.attr("x", divMediaSources.width/2 -((radius)/2))
	  		.attr("y", divMediaSources.height/2 -((radius)/2))
    }, 3000);

    setTimeout( () => {
    	var prevRadius = d3.select("#mainCircle").attr("r");
    	d3.select("#mainCircle")
	  		.transition()
	  		.duration(1000)
	  		.attr("r", radius + (radiusStep*3))

	  	d3.select("#mainText")
	  		.transition()
	  		.duration(1000)
	  		.style("font-size",  (radius + (radiusStep*3))/5 + "px")
	  		.attr("y", divMediaSources.height/2 - ((radius + (radiusStep*3))/5));

	  	var textRounder = function(value){ return Math.round(value); };

	  	var textTween = function(){
	  		//console.log("here ", d3.select(this).attr("count"));
            var i = d3.interpolate(d3.select(this).attr("count"), numberArticles[0] + numberArticles[1] + numberArticles[2]);
            return function(t) { this.textContent = "Count: " + textRounder(i(t)); }
            //return 30;
        };
        d3.select("#countText").transition()
            .duration(1000)
            .tween("text", textTween)
            .style("font-size",  (radius + (radiusStep*3))/5 + "px")
            .attr("y", divMediaSources.height/2 + ((radius + (radiusStep*3))/5))
			.attr("count",  numberArticles[0] + numberArticles[1] + numberArticles[2]);
    }, 3500);


    setTimeout( () => {
    	d3.select("#circleBreitbart")
	  		.transition()
	  		.duration(1000)
	  		.attr("cx", divMediaSources.width/2)
	  		.attr("cy", divMediaSources.height/2)

    	d3.select("#imgBreitbart")
	  		.transition()
	  		.duration(1000)
	  		.attr("x", divMediaSources.width/2 -((radius)/2))
	  		.attr("y", divMediaSources.height/2 -((radius)/2))
    }, 4000);

    setTimeout( () => {
    	var prevRadius = d3.select("#mainCircle").attr("r");
    	d3.select("#mainCircle")
	  		.transition()
	  		.duration(1000)
	  		.attr("r", radius + (radiusStep*4))

	  	d3.select("#mainText")
	  		.transition()
	  		.duration(1000)
	  		.style("font-size",  (radius + (radiusStep*4))/5 + "px")
	  		.attr("y", divMediaSources.height/2 - ((radius + (radiusStep*4))/5));	 

	  	var textRounder = function(value){ return Math.round(value); };

	  	var textTween = function(){
	  		//console.log("here ", d3.select(this).attr("count"));
            var i = d3.interpolate(d3.select(this).attr("count"), numberArticles[0] + numberArticles[1] + numberArticles[2] + numberArticles[3]);
            return function(t) { this.textContent = "Count: " + textRounder(i(t)); }
            //return 30;
        };
        d3.select("#countText").transition()
            .duration(1000)
            .tween("text", textTween)
            .style("font-size",  (radius + (radiusStep*4))/5 + "px")
            .attr("y", divMediaSources.height/2 + ((radius + (radiusStep*4))/5))
			.attr("count",  numberArticles[0] + numberArticles[1] + numberArticles[2] + numberArticles[3]); 		
    }, 4500);


    setTimeout( () => {
    	d3.select("#circleCNN")
	  		.transition()
	  		.duration(1000)
	  		.attr("cx", divMediaSources.width/2)
	  		.attr("cy", divMediaSources.height/2)

    	d3.select("#imgCNN")
	  		.transition()
	  		.duration(1000)
	  		.attr("x", divMediaSources.width/2 -((radius)/2))
	  		.attr("y", divMediaSources.height/2 -((radius)/2))
    }, 5000);

    setTimeout( () => {
    	var prevRadius = d3.select("#mainCircle").attr("r");
    	d3.select("#mainCircle")
	  		.transition()
	  		.duration(1000)
	  		.attr("r", radius + (radiusStep*5))

	  	d3.select("#mainText")
	  		.transition()
	  		.duration(1000)
	  		.style("font-size",  (radius + (radiusStep*5))/5 + "px")
	  		.attr("y", divMediaSources.height/2 - ((radius + (radiusStep*5))/5));

	  	var textRounder = function(value){ return Math.round(value); };

	  	var textTween = function(){
	  		//console.log("here ", d3.select(this).attr("count"));
            var i = d3.interpolate(d3.select(this).attr("count"), numberArticles[0] + numberArticles[1] + numberArticles[2] + numberArticles[3] + numberArticles[4]);
            return function(t) { this.textContent = "Count: " + textRounder(i(t)); }
            //return 30;
        };
        d3.select("#countText").transition()
            .duration(1000)
            .tween("text", textTween)
            .style("font-size",  (radius + (radiusStep*5))/5 + "px")
            .attr("y", divMediaSources.height/2 + ((radius + (radiusStep*5))/5))
			.attr("count",  numberArticles[0] + numberArticles[1] + numberArticles[2] + numberArticles[3] + numberArticles[4]); 
    }, 5500);


    setTimeout( () => {
    	d3.select("#circleWashingtonPost")
	  		.transition()
	  		.duration(1000)
	  		.attr("cx", divMediaSources.width/2)
	  		.attr("cy", divMediaSources.height/2)

    	d3.select("#imgWashington")
	  		.transition()
	  		.duration(1000)
	  		.attr("x", divMediaSources.width/2 -((radius)/2))
	  		.attr("y", divMediaSources.height/2 -((radius)/2))
    }, 6000);

    setTimeout( () => {
    	var prevRadius = d3.select("#mainCircle").attr("r");
    	d3.select("#mainCircle")
	  		.transition()
	  		.duration(1000)
	  		.attr("r", radius + (radiusStep*6))


	  	d3.select("#mainText")
	  		.transition()
	  		.duration(1000)
	  		.style("font-size",  (radius + (radiusStep*6))/5 + "px")
	  		.attr("y", divMediaSources.height/2 - ((radius + (radiusStep*6))/5));


	  	var textRounder = function(value){ return Math.round(value); };

	  	var textTween = function(){
	  		//console.log("here ", d3.select(this).attr("count"));
            var i = d3.interpolate(d3.select(this).attr("count"), numberArticles[0] + numberArticles[1] + numberArticles[2] + numberArticles[3] + numberArticles[4] + numberArticles[5]);
            return function(t) { this.textContent = "Count: " + textRounder(i(t)); }
            //return 30;
        };
        d3.select("#countText").transition()
            .duration(1000)
            .tween("text", textTween)
            .style("font-size",  (radius + (radiusStep*6))/5 + "px")
            .attr("y", divMediaSources.height/2 + ((radius + (radiusStep*6))/5))
			.attr("count",  numberArticles[0] + numberArticles[1] + numberArticles[2] + numberArticles[3] + numberArticles[4] + numberArticles[5]); 

    }, 6500);

    setTimeout( () => {
    	d3.select("#mainCircle").attr("complete", true);
    }, 7000);

}



export function drawMediaBias(mediaBias){
	d3.select("#divMediaSources").style("width", "75%").style("height", "100%");
	var divMediaSources = document.getElementById("divMediaSources").getBoundingClientRect();

	var svg = d3.select("#divMediaSources").append("svg").attr("id", "svgMediaSources")
	.attr("width", divMediaSources.width)
	.attr("height", divMediaSources.height);

	svg.append("image")
  		.attr("xlink:href", mediaBias)
  		.attr("x", divMediaSources.width/2 -((divMediaSources.width*0.8)/2))
  		.attr("y", divMediaSources.height/2 - ((divMediaSources.height*0.8)/2))
  		.attr("width", divMediaSources.width *0.8)
    	.attr("height", divMediaSources.height*0.8);
}

export function drawMediaBias2(mediaBias){
	d3.select("#divMediaSources").style("width", "75%").style("height", "100%");
	var divMediaSources = document.getElementById("divMediaSources").getBoundingClientRect();

	var svg = d3.select("#divMediaSources").append("svg").attr("id", "svgMediaSources")
	.attr("width", divMediaSources.width)
	.attr("height", divMediaSources.height);

	svg.append("image")
  		.attr("xlink:href", mediaBias)
  		.attr("x", divMediaSources.width/2 -((divMediaSources.width*0.8)/2))
  		.attr("y", divMediaSources.height/2 - ((divMediaSources.height*0.8)/2))
  		.attr("width", divMediaSources.width *0.8)
    	.attr("height", divMediaSources.height*0.8);
}