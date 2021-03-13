import * as d3 from "d3";
import {sankey} from "d3-sankey";
//import csvPath from '../assets/data/SF_Historical_Ballot_Measures.csv';
//get raw Spotify data
import csvPath from '../assets/data/data.csv';
import csvPathYear from '../assets/data/data_by_year.csv';
import csvPathPopularity from '../assets/data/data_year_popularity.csv';
import csvPathArtist from '../assets/data/data_year_artist.csv';


export async function ScatterPlot(id){
    //get popularity data (top 50 songs for each year)
    const data = await d3.csv(csvPathPopularity);

    data.sort(function(a, b) {
        return d3.ascending(a.year, b.year)
      })

    // set up groups for the dropdown list
    let allGroup = ["acousticness", "danceability", "energy","instrumentalness","liveness","speechiness","loudness","tempo","duration_ms","key","valence","popularity"]

    // add the options to the button
    d3.select("#selectButton_Scatter")
    .selectAll('myOptions')
       .data(allGroup)
    .enter()
      .append('option')
    .text(function (d) { return d; }) // show text showed in dropdown menu
    .attr("value", function (d) { return d; }) // return the corresponding value from the selected


    //const margin = { top: 40, right: 10, bottom: 120, left: 40 };
    const margin = { top: 0, right: 0, bottom: 100, left: 60};
    const height = 100;
    const width = 800;


    // Create new data with the selection
    let data_filter = data.map(function(d){return {year: d.year, value:d.acousticness} })

    let x = d3.scaleLinear().range([0,width]).nice()




    let y = d3.scaleLinear().nice()
    .range([height,0]);
    //.rangeRound([height - margin.bottom, margin.top]);

    x.domain(d3.extent([d3.min(data_filter, d => parseFloat(d.year))-1, d3.max(data_filter, d => parseFloat(d.year))+1]))
    
    y.domain(d3.extent([d3.min(data_filter, d => parseFloat(d.value)), d3.max(data_filter, d => parseFloat(d.value))+0.2]))


    
    let myColor = d3.scaleOrdinal()
    .domain(allGroup)
    .range(d3.schemePaired)





    let brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended),
    idleTimeout,
    idleDelay = 350; 


let svg = d3.select(id).append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");



    let clip = svg.append("defs").append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", width )
    .attr("height", height )
    .attr("x", 0) 
    .attr("y", 0);


     


    
/*
    let points = svg.append("g")
    .attr("fill", "none")
     .attr("id", "scatterplot")
     .attr("clip-path", "url(#clip)");
    
points.selectAll(".dot")
    .data(data_filter0)
  .enter().append("circle")
    .attr("class", "dot")
      .attr("cx", d => x(d.year)+3)
      .attr("cy", d => y(d.popularity))
      .attr('fill', 'black')
      .attr('fill-opacity',0.6)
      .attr("r", 3) //r: size of the circle
      .on('mouseover', function (d, i) {
        d3.select(this).transition()
             .duration('100')
             .attr('fill', 'green')
             .attr('fill-opacity',0.6)
             .attr("r", 8);
       })
       .on('mouseout', function (d, i) {
        d3.select(this).transition()
             .duration('200')
             .attr('fill', 'black')
             .attr('fill-opacity',0.6)
             .attr("r", 3);
       });
    */

    

    let points=svg.append("g")
      //.attr("stroke", "black")
      //.attr("stroke-width", 0.5) //width of the circle
      .attr("fill", "none")
      .attr("id", "scatterplot")
      .attr("clip-path", "url(#clip)")
      


    points//.selectAll(".dot")
    .selectAll("circle")
    .data(data_filter)
    //.join("circle")
    .enter().append('circle')
    //.attr("class", "dot")
      .attr("cx", d => x(d.year))
      .attr("cy", d => y(d.value))
      //.attr('fill', 'black')
      .attr('fill',function(d){ return myColor("acousticness")})
      .attr('fill-opacity',0.6)
      .attr("r", 2)//r: size of the circle
      //.attr("stroke", function(d){ return myColor("popularity") })
      //.attr("transform", `translate(0,${height - margin.bottom})`)


    let xAxis = g => g
        //.attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
     
    let yAxis = g => g
        //.attr("transform", `translate(${margin.left},0)`)
        //.attr("transform", `translate(0,${height - margin.bottom})`)
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
        .attr("y", -30)
        .attr("x",330)
        .attr("font-weight",500)
        .style("text-anchor", "end")
        .text("Year");    


svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "1em")
        .attr("font-weight",500)
        .style("text-anchor", "end")
        .text("Song Metrics");
  

  svg.append("circle").attr("id",'legend_circle').attr("cx",30).attr("cy",0).attr("r", 3).attr('fill',function(d){ return myColor("acousticness")}).style('opacity',0.6)
  svg.append("text").attr("id",'legend_text').attr("x", 35).attr("y", 1).text("acousticness").style("font-size", "10px").attr("alignment-baseline","middle")  
  
  points.append("g")
    .attr("class", "brush")
    .call(brush);



    function brushended({selection}) {

        let s = selection;
        if (!s) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
            //x.domain(d3.extent(data_filter0, function (d) { return d.year; })).nice();
            //y.domain(d3.extent(data_filter0, function (d) { return d.popularity; })).nice();
            x.domain(d3.extent([d3.min(data_filter, d => parseFloat(d.year))-1, d3.max(data_filter, d => parseFloat(d.year))+1]))
    
            y.domain(d3.extent([d3.min(data_filter, d => parseFloat(d.value)), d3.max(data_filter, d => parseFloat(d.value))+0.2]))
        
        } else {
            //console.log(s)
            
            x.domain([s[0][0], s[1][0]].map(x.invert, x));
            y.domain([s[1][1], s[0][1]].map(y.invert, y));
            //y.domain([s[1][1], s[0][1]].map(y.invert, y));
            points.select(".brush").call(brush.move, null);
        }
        zoom();
    }
    
    function idled() {
        idleTimeout = null;
    }
    
    function zoom() {
    
        //let t = scatter.transition().duration(750);
        svg.select("#x_violin").transition().call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.6em")
        .attr("transform", "rotate(-90)")
        .attr("font-weight", "bold");

        svg.select("#y_violin").transition().call(d3.axisLeft(y));
        points.selectAll("circle").transition()
        .attr("cx", function (d) { return x(d.year); })
        .attr("cy", function (d) { return y(d.value); });
    }    

    

// update the chart after selection from the dropdown list
 function update(selectedGroup) {

    // Create new data with the selection
    let data_filter = data.map(function(d){return {year: d.year, value:d[selectedGroup]} })

    y = d3.scaleLinear()
    .domain([d3.min(data_filter, d => parseFloat(d.value)), d3.max(data_filter, d => parseFloat(d.value))+0.2]).nice()
    .range([height,0])

    //update y axis
    //d3.select("body").transition().select(".y.axis").duration(1000).call(yAxis);
    d3.select("body").transition().select("#y_violin").duration(1000).call(yAxis);
    
 
    d3.select("body").transition().select('#legend_circle').duration(1000).attr('fill',function(d){ return myColor(selectedGroup)})
    d3.select("body").transition().select('#legend_text').duration(1000).text(selectedGroup)
  


    points
    .selectAll("circle").data(data_filter).transition().duration(100000)
    .each( function() {  
        d3.select(this)  // for current element
            .attr("fill", function(d){ return myColor(selectedGroup)}) //color
            .attr("r", 4)  // size
            //.attr("stroke", "black")
            //.attr("stroke-width", 0.01);
    })
    .delay(function(d, i) {
        return i / data_filter.length * 100;  // use a dynamic delay
    })
    .each( function() {  
        d3.select(this)  
            .transition()  
            .duration(1000)  
            .attr("cx", d => x(d.year))
            .attr("cy", d => y(d.value))
            //.attr("stroke", function(d){ return myColor(selectedGroup)})
            //.attr("stroke-width", 0)
            //.attr("fill", function(d){ return myColor(selectedGroup)}) 
            .attr('fill-opacity',0.6)
            .attr("r", 2)})
    .append("g")
    .attr("class", "brush")
    .call(brush); 
    
    

    
  }


    // update the chart when new item is selected
    d3.select("#selectButton_Scatter").on("change", function(d) {
        
        var selectedOption = d3.select(this).property("value")
        update(selectedOption)
    })

}


export async function StreamChart(id){

  // set the dimensions and margins of the graph
var margin = {top: 0, right: 0, bottom: 20, left: 30},
width = 460 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(id)
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

const data = await d3.csv(csvPathArtist);

// List of groups = header of the csv files
var keys = data.columns.slice(1)
console.log(Object.keys(data))

// Add X axis
var x = d3.scaleLinear()
.domain(d3.extent(data, function(d) { return d.year; }))
.range([ 0, width ]);

//x.domain(d3.extent([d3.min(data_filter, d => parseFloat(d.year))-1, d3.max(data_filter, d => parseFloat(d.year))+1]))
    

svg.append("g")
.attr("transform", "translate(0," + height*0.8 + ")")
.call(d3.axisBottom(x).tickSize(-height*.7).tickValues([1972, 1984, 1996, 2008]))
.select(".domain").remove()
// Customization
svg.selectAll(".tick line").attr("stroke", "#b8b8b8")

// Add X axis label:
svg.append("text")
  .attr("text-anchor", "end")
  .attr("x", width)
  .attr("y", height-30 )
  .text("X: Time (year)")
  .style("font-size", "12px");

// Add Y axis
var y = d3.scaleLinear()
.domain([-150, 150])
.range([ height, 0 ]);

// color palette
var color = d3.scaleOrdinal()
.domain(keys)
.range(d3.schemeSet3);



svg.append("text").attr("x", 0).attr("y", 20).text('Y: relative magnitude of published song count').style("font-size", "12px")


//stack the data?
let stackGen = d3.stack()
.offset(d3.stackOffsetSilhouette)
.keys(keys)
let stackedData=stackGen(data)


var Tooltip = d3.select(id)
.append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "grey")
  .style("border-radius", "5px")
  .style("padding", "10px")
  .style("color", "white")
  .style("font-size", "11px")

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function(d,i) {

Tooltip.transition().duration(200)
Tooltip.style("opacity", 1)
.text("artist: "+i.key)
.style("left", (d3.pointer(event,this)[0]+100) + "px")
.style("top", (d3.pointer(event,this)[1])+5 + "px")
d3.selectAll(".myArea").style("opacity", .2)
d3.select(this)
  .style("stroke", "black")
  .style("opacity", 1)

}

var mousemove = function(d,i) {
Tooltip.text("artist: "+i.key)
}

var mouseleave = function(d) {
Tooltip.style("opacity", 0)
d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
}

// Area generator
var area = d3.area()
.x(function(d) { return x(d.data.year); })
.y0(function(d) { return y(d[0]); })
.y1(function(d) { return y(d[1]); })

// Show the areas
svg
.selectAll("mylayers")
.data(stackedData)
.enter()
.append("path")
  .attr("class", "myArea")
  .style("fill", function(d) { return color(d.key); })
  .attr("d", area)
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave)

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

        //define drag behaviors
        function dragstarted(event, d) {
                d3.select(this).raise().attr("stroke", "red")
                .attr("stroke-width", 4)
                //.style("fill-opacity", 1);
              }
            

        function dragged(event, d) {
                // Apply the translation to the shape:
                d3.select(this)
                  .attr("transform", "translate(" + event.x + "," + event.y + ")")
                  //.attr("stroke-width", 4)
                  .style("fill-opacity", 1);
              }
            
        function dragended(event, d) {
                d3.select(this).attr("stroke", "black")
                .attr("stroke-width", 1)
                //.style("fill-opacity", 1);
              }
            
        let drag=d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
    

        var Tooltip = d3.select(parent_selector)
                    .append("div")
                      .style("opacity", 0)
                      .attr("class", "tooltip")
                      .style("background-color", "grey")
                      .style("border-radius", "5px")
                      .style("padding", "10px")
                      .style("color", "white")
                      .style("font-size", "11px")
                    

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
                d3.select(this).raise().attr("stroke", "#5A1664")
                .attr("stroke-width", 6)
                
                let text_show=i.name+" Metrics:\n"+i.axes[0].axis+' '+i.axes[0].value.toFixed(2)+"\n"+i.axes[1].axis+' '+i.axes[1].value.toFixed(2)
              +"\n"+i.axes[2].axis+' '+i.axes[2].value.toFixed(2)+"\n"+i.axes[3].axis+' '+i.axes[3].value.toFixed(2)+"\n"+i.axes[4].axis+' '+i.axes[4].value.toFixed(2)
              +"\n"+i.axes[5].axis+' '+i.axes[5].value.toFixed(2)+"\n"+i.axes[6].axis+' '+i.axes[6].value.toFixed(2)
                
              Tooltip.transition().duration(200)
                      Tooltip.style("opacity", 1)
                      .text(text_show)
                      .style("left", (d3.pointer(event,this)[0]+100) + "px")
                      .style("top", (d3.pointer(event,this)[1]) + "px")

            })
            .on('mousemove',function(d,i){
              let text_show=i.name+" Metrics:\n"+i.axes[0].axis+' '+i.axes[0].value.toFixed(2)+"\n"+i.axes[1].axis+' '+i.axes[1].value.toFixed(2)
              +"\n"+i.axes[2].axis+' '+i.axes[2].value.toFixed(2)+"\n"+i.axes[3].axis+' '+i.axes[3].value.toFixed(2)+"\n"+i.axes[4].axis+' '+i.axes[4].value.toFixed(2)
              +"\n"+i.axes[5].axis+' '+i.axes[5].value.toFixed(2)+"\n"+i.axes[6].axis+' '+i.axes[6].value.toFixed(2)
                Tooltip.text(text_show)
            })
            .on('mouseout', () => {
                //Bring back all blobs
                parent.selectAll(".radarArea")
                    .transition().duration(200)
                    .style("fill-opacity", cfg.opacityArea)
                    .attr("stroke", null);
                Tooltip.style("opacity", 0)
            })
            blobWrapper.selectAll(".radarArea").call(drag);

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
            .style("fill-opacity", 0.8).call(drag);
    
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
            }).call(drag);
        
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
              //color:d3.scaleOrdinal().range(["gold", "blue", "green", "yellow", "black", "grey", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange"]),
              //color:d3.scaleOrdinal(d3.schemeAccent),
              color: d3.scaleOrdinal().range(["#D61812","pink","#DFFF00","#B8D612","#33F529","#40E0D0","#6495ED","#123BD6","#5A1664","#CACFD2"]),
				format: '.0f',
				legend: { title: '10 Most Popular Songs', translateX: -180, translateY: 5 },
			};

			// Draw the chart with the RadarChart
            let svg_radar=RadarChart(id,data,radarChartOptions)


}

