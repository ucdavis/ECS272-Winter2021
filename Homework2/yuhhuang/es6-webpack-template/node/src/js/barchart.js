import * as d3 from "d3";
//import csvPath from '../assets/data/SF_Historical_Ballot_Measures.csv';
//get raw Spotify data
import csvPath from '../assets/data/data.csv';
import csvPathYear from '../assets/data/data_by_year.csv';
import csvPathPopularity from '../assets/data/data_year_popularity.csv';


export async function ScatterPlot(id){
    //get popularity data (top 50 songs for each year)
    const data = await d3.csv(csvPathPopularity);


    data.sort(function(a, b) {
        return d3.ascending(a.year, b.year)
      })


    //const margin = { top: 40, right: 10, bottom: 120, left: 40 };
    const margin = { top: 10, right: 30, bottom: 60, left: 20};
    const height = 200;
    const width = 600;


    
    //show 1920-1946, acousticness as the preload figure
    let data_filter0=data.filter(function(d) { return d.year < 1946 });

    let x = d3.scalePoint().range([0,width]).domain(data_filter0.map(d => d.year))
    .rangeRound([margin.left, width - margin.right])
    .padding(0.1);




let y = d3.scaleLinear().domain([d3.min(data_filter0, d => parseFloat(d.popularity)), d3.max(data_filter0, d => parseFloat(d.popularity))+0.2]).nice()
    .rangeRound([height - margin.bottom, margin.top]);


 


let svg = d3.select(id).append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");



    let points=svg.append("g")
      //.attr("stroke", "black")
      //.attr("stroke-width", 0.5) //width of the circle
      .attr("fill", "none")
    .selectAll("circle")
    .data(data_filter0)
    .join("circle")
      .attr("cx", d => x(d.year)+3)
      .attr("cy", d => y(d.popularity))
      .attr('fill', 'black')
      .attr('fill-opacity',0.6)
      .attr("r", 3); //r: size of the circle

    let xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
     
    let yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
  
  
      svg.append("g")
          .attr("class", "x axis")
          .attr("id","x_violin")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.6em")
          .attr("transform", "rotate(-90)")
          .attr("font-weight", "bold")
  
      svg.append("g")
          .attr("class", "y axis")
          .attr("id","y_violin")
          .call(yAxis)
          .call(g => g.select(".tick:last-of-type text")
                  .clone()
                  .attr("transform", `rotate(-90)`)
                  .attr("text-anchor", "middle")
                  .attr("x", -(15 - margin.top - margin.bottom) / 2)
                  .attr("y", -80)
                  .attr("font-weight", "bold"))
    
    svg.append("text")             
        .attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
        .attr("y", -40)
        .attr("x",-10)
        .attr("font-weight",500)
        .style("text-anchor", "middle")
        .text("Year");


    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -20)
        .attr("x",-80)
        .attr("dy", "1em")
        .attr("font-weight",500)
        .style("text-anchor", "middle")
        .text("Popularity");   
  

  svg.append("circle").attr("cx",30).attr("cy",19).attr("r", 3).style("fill", "black").style('opacity',0.6)
  svg.append("text").attr("x", 35).attr("y", 20).text("Song Popularity").style("font-size", "10px").attr("alignment-baseline","middle")  
  



   
    function update(data_filter){

    x = d3.scaleBand().range([0,width]).domain(data_filter.map(d => d.year))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);


    y = d3.scaleLinear()
    .domain([d3.min(data_filter, d => parseFloat(d.popularity)), d3.max(data_filter, d => parseFloat(d.popularity))+0.2]).nice()
    .range([height - margin.bottom, margin.top]);

    
    
    d3.select("body").transition().select("#x_violin").duration(1000).call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.6em")
    .attr("transform", "rotate(-90)")
    .attr("font-weight", "bold");
    
    d3.select("body").transition().select("#y_violin").duration(1000).call(yAxis);

    console.log(data_filter)


    //svg.selectAll("circle")

    points
    .data(data_filter)  // Update with new data
    .transition()  // from old to new
    .duration(1000)  // length of animation
    .each( function() {  
        d3.select(this)  // for current element
            //.attr("stroke", "red")
            //.attr("stroke-width", 1)
            .attr("fill", "red")  //color
            .attr("r", 6);  // size
    })
    .delay(function(d, i) {
        return i / data_filter.length * 100;  // use a dynamic delay
    })
    //.attr("cx", d => x(d.year))
    //.attr("cy", d => y(d.popularity))
    .each( function() {  
        d3.select(this)  
            .transition()  
            .duration(1000)  
            .attr("cx", d => x(d.year)+10)
            .attr("cy", d => y(d.popularity))
            //.attr("stroke", "black")
            //.attr("stroke-width", 0.5)
            .attr("fill", "black")  
            .attr('fill-opacity',0.6)
            .attr("r", 3);  
    })
    


    }
   
   

    // When the button is changed, run the update function
    d3.select("#selectButton_Violin").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")

        if(selectedOption == "1920-1945"){
            //remove all svg elements
            //svg.selectAll("*").remove();
            let data_filter=data.filter(function(d) { return d.year < 1946 });
            update(data_filter);
          }else if(selectedOption == "1945-1970"){
            let data_filter=data.filter(function(d) { return (d.year < 1971)&(d.year > 1944) });
            update(data_filter);
          }else if(selectedOption == "1970-1995"){
            let data_filter=data.filter(function(d) { return (d.year < 1996)&(d.year > 1969) });
            update(data_filter);
          }else if(selectedOption == "1996-2021"){
            let data_filter=data.filter(function(d) { return d.year > 1995 });
            update(data_filter);
          }
        })
    




}



export async function LineChart(id){

    const data = await d3.csv(csvPathYear);

    //const margin = { top: 40, right: 10, bottom: 120, left: 40 };
    const margin = { top: 10, right: 30, bottom: 40, left: 30};
    const height = 170;
    const width = 1000;



    // set up groups for the dropdown list
    let allGroup = ["acousticness", "danceability", "energy","instrumentalness","liveness","loudness","speechiness","tempo","valence","key","duration_ms","popularity"]

     // add the options to the button
     d3.select("#selectButton")
     .selectAll('myOptions')
        .data(allGroup)
     .enter()
       .append('option')
     .text(function (d) { return d; }) // show text showed in dropdown menu
     .attr("value", function (d) { return d; }) // return the corresponding value from the selected
   
    
     data.sort(function(a, b) {
        return d3.ascending(a.year, b.year)
      })

    const x = d3.scaleBand().range([0,width]).domain(data.map(d => d.year))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);
    

    let y = d3.scaleLinear().domain([d3.min(data, d => parseFloat(d.acousticness)), d3.max(data, d => parseFloat(d.acousticness))+0.2]).nice()
        .rangeRound([height - margin.bottom, margin.top]);


     


    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    


    
    let myColor = d3.scaleOrdinal()
    .domain(allGroup)
    .range(d3.schemePaired)
    //.range(d3.schemeSet2);
   
    //pre-load the time series for the acousticness  
    let line = svg
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) { return x(+d.year) })
          .y(function(d) { return y(+d.acousticness) })
        )
        .attr("stroke", function(d){ return myColor("acousticness") })
        .style("stroke-width", 4)
        .style("fill", "none")



    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
   
    let yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.6em")
        .attr("transform", "rotate(-90)")
        .attr("font-weight", "bold");

    svg.append("g")
        .attr("class", "y axis")
        .attr("id","y_line")
        .call(yAxis)
        .call(g => g.select(".tick:last-of-type text")
                .clone()
                .attr("transform", `rotate(-90)`)
                .attr("text-anchor", "middle")
                .attr("x", -(15 - margin.top - margin.bottom) / 2)
                .attr("y", -80)
                .attr("font-weight", "bold"))

    svg.append("text")             
                .attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
                .attr("y", -30)
                .attr("x",-10)
                .attr("font-weight",500)
                .style("text-anchor", "middle")
                .text("Year");
        
        
    svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -27)
                .attr("x",-60)
                .attr("dy", "1em")
                .attr("font-weight",500)
                .style("text-anchor", "middle")
                .text("Song Metric"); 



    // update the chart
 function update(selectedGroup) {

    // Create new data with the selection
    let dataFilter = data.map(function(d){return {year: d.year, value:d[selectedGroup]} })

    y = d3.scaleLinear()
    .domain([d3.min(dataFilter, d => parseFloat(d.value)), d3.max(dataFilter, d => parseFloat(d.value))+0.2]).nice()
    .range([height - margin.bottom, margin.top]);

    //update y axis
    //d3.select("body").transition().select(".y.axis").duration(1000).call(yAxis);
    d3.select("body").transition().select("#y_line").duration(1000).call(yAxis);
    
 
    // plot the line with the new data
    line
        .datum(dataFilter)
        .transition()
        .duration(1000)
        .attr("d", d3.line()
          .x(function(d) { return x(+d.year) })
          .y(function(d) { return y(+d.value) })
        )
        .attr("stroke", function(d){ return myColor(selectedGroup) })
  }


    // update the chart when new item is selected
    d3.select("#selectButton").on("change", function(d) {
        
        var selectedOption = d3.select(this).property("value")
        update(selectedOption)
    })


}



function RadarChart(parent_selector, data, options) {
    // this function is adapted from: http://bl.ocks.org/mthh/7e17b680b35b83b49f1c22a3613bd89f

    const max = Math.max;
    const sin = Math.sin;
    const cos = Math.cos;
    const HALF_PI = Math.PI / 2;
    
    
    
        //Wraps SVG text 
        const wrap = (text, width) => {
          text.each(function() {
                let text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.4, // ems
                    y = text.attr("y"),
                    x = text.attr("x"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
    
                while (word = words.pop()) {
                  line.push(word);
                  tspan.text(line.join(" "));
                  if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                  }
                }
          });
        }//wrap
    
        const cfg = {
         w: 600,				
         h: 600,				
         margin: {top: 20, right: 20, bottom: 20, left: 20}, 
         levels: 3,				//levels or inner circles 
         maxValue: 0, 			
         labelFactor: 1.25, 	
         wrapWidth: 60, 		
         opacityArea: 0.35, 	
         dotRadius: 4, 			
         opacityCircles: 0.1, 	
         strokeWidth: 2, 		
         roundStrokes: false,	
         color: d3.scaleOrdinal(d3.schemeCategory10),	
         format: '.2%',
         unit: '',
         legend: false
        };
    
        
        if('undefined' !== typeof options){
          for(let i in options){
            if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
          }
        }
    
        //If the supplied maxValue < the actual one, replace by the maximum value
        let maxValue = 0;
        for (let j=0; j < data.length; j++) {
            for (let i = 0; i < data[j].axes.length; i++) {
                data[j].axes[i]['id'] = data[j].name;
                if (data[j].axes[i]['value'] > maxValue) {
                    maxValue = data[j].axes[i]['value'];
                }
            }
        }
        maxValue = max(cfg.maxValue, maxValue);
    
        const allAxis = data[0].axes.map((i, j) => i.axis),	//Names of each axis
            total = allAxis.length,					//The number of axes
            radius = Math.min(cfg.w/2, cfg.h/2), 	//outermost circle radius
            Format = d3.format(cfg.format),			 	
            angleSlice = Math.PI * 2 / total;		//width of radians for each "slice"
    
        //Scale for the radius
        const rScale = d3.scaleLinear()
            .range([0, radius])
            .domain([0, maxValue]);
    
        //set up container SVG
        const parent = d3.select(parent_selector);
    
        //Remove other same id charts
        //parent.select("svg").remove();
    
        //Initiate the radar chart 
        let svg = parent.append("svg")
                .attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
                .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
                .attr("class", "radar");
    
        let g = svg.append("g")
                .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");
    
        // filtering
    
        //Filter for the outside glow
        let filter = g.append('defs').append('filter').attr('id','glow'),
            feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
            feMerge = filter.append('feMerge'),
            feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
            feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');
    

        //prepare the Circular grid
    
        //Wrapper of the grid & axes
        let axisGrid = g.append("g").attr("class", "axisWrapper");
    
        //Draw the background circles
        axisGrid.selectAll(".levels")
           .data(d3.range(1,(cfg.levels+1)).reverse())
           .enter()
            .append("circle")
            .attr("class", "gridCircle")
            .attr("r", d => radius / cfg.levels * d)
            .style("fill", "#bdbbbb")
            .style("stroke", "#bdbbbb")
            .style("fill-opacity", cfg.opacityCircles)
            .style("filter" , "url(#glow)");
    
    
    
        //Draw axes

    
        //Create the straight lines radiating outward from the center
        var axis = axisGrid.selectAll(".axis")
            .data(allAxis)
            .enter()
            .append("g")
            .attr("class", "axis");

        axis.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", (d, i) => rScale(maxValue *1.1) * cos(angleSlice * i - HALF_PI))
            .attr("y2", (d, i) => rScale(maxValue* 1.1) * sin(angleSlice * i - HALF_PI))
            .attr("class", "line")
            .style("stroke", "white")
            .style("stroke-width", "2px");
        
        
        //Show the labels at each axis for these metrics
        axis.append("text")
            .attr("class", "legend")
            .style("font-size", "11px")
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .attr("x", (d,i) => rScale(maxValue * cfg.labelFactor) * cos(angleSlice * i - HALF_PI))
            .attr("y", (d,i) => rScale(maxValue * cfg.labelFactor) * sin(angleSlice * i - HALF_PI))
            .text(d => d)
            .call(wrap, cfg.wrapWidth);
        

        //Draw the radar chart blobs
    
        //The radial line function
        const radarLine = d3.lineRadial()
            .curve(d3.curveLinearClosed)
            .radius(d => rScale(d.value))
            .angle((d,i) => i * angleSlice);
    
        if(cfg.roundStrokes) {
            radarLine.curve(d3.curveCardinalClosed)
        }
    
        //a wrapper for the blobs
        const blobWrapper = g.selectAll(".radarWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarWrapper");
    
        //Show the backgrounds
        blobWrapper
            .append("path")
            .attr("class", "radarArea")
            .attr("d", d => radarLine(d.axes))
            .style("fill", (d,i) => cfg.color(i))
            .style("fill-opacity", cfg.opacityArea)
            .on('mouseover', function(d, i) {
                //Dim all blobs
                parent.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", 0.1);
                //Bring back the hovered over blob
                d3.select(this)
                    .transition().duration(200)
                    .style("fill-opacity", 0.7);
            })
            .on('mouseout', () => {
                //Bring back all blobs
                parent.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", cfg.opacityArea);
            });
    
        //Create the outlines
        blobWrapper.append("path")
            .attr("class", "radarStroke")
            .attr("d", function(d,i) { return radarLine(d.axes); })
            .style("stroke-width", cfg.strokeWidth + "px")
            .style("stroke", (d,i) => cfg.color(i))
            .style("fill", "none")
            .style("filter" , "url(#glow)");
    
        //Append the circles
        blobWrapper.selectAll(".radarCircle")
            .data(d => d.axes)
            .enter()
            .append("circle")
            .attr("class", "radarCircle")
            .attr("r", cfg.dotRadius)
            .attr("cx", (d,i) => rScale(d.value) * cos(angleSlice * i - HALF_PI))
            .attr("cy", (d,i) => rScale(d.value) * sin(angleSlice * i - HALF_PI))
            .style("fill", (d) => cfg.color(d.id))
            .style("fill-opacity", 0.8);
    
        //Append invisible circles for tooltip
    
        //Wrapper for the invisible circles on top
        const blobCircleWrapper = g.selectAll(".radarCircleWrapper")
            .data(data)
            .enter().append("g")
            .attr("class", "radarCircleWrapper");
    
        //Append a set of invisible circles on top for the mouseover pop-up
        blobCircleWrapper.selectAll(".radarInvisibleCircle")
            .data(d => d.axes)
            .enter().append("circle")
            .attr("class", "radarInvisibleCircle")
            .attr("r", cfg.dotRadius * 1.5)
            .attr("cx", (d,i) => rScale(d.value) * cos(angleSlice*i - HALF_PI))
            .attr("cy", (d,i) => rScale(d.value) * sin(angleSlice*i - HALF_PI))
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function(d,i) {
                tooltip
                    .attr('x', this.cx.baseVal.value - 10)
                    .attr('y', this.cy.baseVal.value - 10)
                    .transition()
                    .style('display', 'block')
                    .text(Format(d.value) + cfg.unit);
            })
            .on("mouseout", function(){
                tooltip.transition()
                    .style('display', 'none').text('');
            });
        
        const tooltip = g.append("text")
            .attr("class", "tooltip")
            .attr('x', 0)
            .attr('y', 0)
            .style("font-size", "12px")
            .style('display', 'none')
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em");
        
    
        if (cfg.legend !== false && typeof cfg.legend === "object") {
            let legendZone = svg.append('g');
            let names = data.map(el => el.name);
            if (cfg.legend.title) {
                let title = legendZone.append("text")
                    .attr("class", "title")
                    .attr('transform', `translate(${cfg.legend.translateX},${cfg.legend.translateY})`)
                    .attr("x", cfg.w - 110)
                    .attr("y", 5)
                    .attr("font-size", "10px")
                    .attr("fill", "#404040")
                    .text(cfg.legend.title);
            }
            let legend = legendZone.append("g")
                .attr("class", "legend")
                .attr("height", 50)
                .attr("width", 100)
                .attr('transform', `translate(${cfg.legend.translateX},${cfg.legend.translateY + 20})`);
            // Create rectangles markers
            legend.selectAll('rect')
              .data(names)
              .enter()
              .append("rect")
              .attr("x", cfg.w - 120)
              .attr("y", (d,i) => i * 20)
              .attr("width", 10)
              .attr("height", 10)
              .style("fill", (d,i) => cfg.color(i));
            // Create labels
            legend.selectAll('text')
              .data(names)
              .enter()
              .append("text")
              .attr("x", cfg.w - 105)
              .attr("y", (d,i) => i * 20 + 9)
              .attr("font-size", "10px")
              .attr("fill", "#737373")
              .text(d => d);
        }
        return svg;
    }


export async function SpiderChart(data,id){

    
    //console.log(data0);


    const margin = { top: 30, right: 50, bottom: 50, left: 80 },
				width = Math.min(700, window.innerWidth / 4) - margin.left - margin.right,
                height = Math.min(width, window.innerHeight - margin.top - margin.bottom);
                

			let radarChartOptions = {
			  w: 300,
			  h: 200,
			  margin: margin,
			  maxValue: 1,
			  levels: 6,
			  roundStrokes: false,
              //color: d3.scaleOrdinal().range(["#FF6347","#FFA07A","#AFC52F",,"#6495ED"]),
              color: d3.scaleOrdinal().range(["#DE3163","#DFFF00","#40E0D0","#6495ED"]),
				format: '.0f',
				legend: { title: '4 Most Popular Songs', translateX: -180, translateY: 5 },
			};

			// Draw the chart with the RadarChart
            let svg_radar=RadarChart(id,data,radarChartOptions)


}

