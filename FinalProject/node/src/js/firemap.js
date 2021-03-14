import * as d3 from "d3";
import csvPathWeather from '../../dist/Camp_2018_RAWS.csv';
import dir_wind from "../../dist/wind_direction_sum.json";

export async function MapFire(id){

    //const WIDTH = window.innerWidth;
    //const HEIGHT = window.innerHeight;
    const WIDTH = 800;
    const HEIGHT = 1200;
    const ZOOM_THRESHOLD = [0.3,10];
    const OVERLAY_MULTIPLIER = 10;
    const OVERLAY_OFFSET = OVERLAY_MULTIPLIER / 2 - 0.5;
    const ZOOM_DURATION = 500;
    const ZOOM_IN_STEP = 2;
    const ZOOM_OUT_STEP = 1 / ZOOM_IN_STEP;
    //const HOVER_COLOR = "#d36f80"
    
const zoom = d3
    .zoom()
    .scaleExtent(ZOOM_THRESHOLD)
    .on("zoom", zoomHandler);
  
  function zoomHandler(event, d) {
    g.attr("transform", event.transform);
  }
  
  function mouseOverHandler(d, i) {
    d3.select(this).attr('stroke','black')
    .attr("stroke-width", 3)
  }
  
  function mouseOutHandler(d, i) {
    //d3.select(this).attr("fill", color(i))
    d3.select(this).attr('stroke','#DCDCDC')
            .attr("stroke-width", 1)
  }
  
  function clickHandler(d, i) {
    d3.select("#map__text").text(`Burned perimeter of the day ${i.properties.Date} `)
    d3.select("#temp_text").text(`Mean air temperature: ${parseInt(i.properties.Air_Temp_Avg)} F`)
    d3.select("#fuel_text").text(`Mean fuel moisture percentage: ${parseInt(i.properties.Fuel_Moist_Per)}%`)
    d3.select("#wind_text").text(`Mean wind speed: ${parseInt(i.properties.Wind_Avg_mph)} mph`)
    d3.select("#degree_text").text(`Mean wind direction: ${parseInt(i.properties.Wind_Dir_Deg)} degree`)
    Scatter("#scatter",i.properties.Date)
    SpiderChart(dir_wind,"#radar",i.properties.Date)
  }

//prepare svg
//use a transparent rectangle for pan and zoom
const svg = d3
  .select(id)
  .append("svg")
  .attr("style", "outline: thick solid black;")
  .attr("width", "100%")
  .attr("height", "200%");
  
const g = svg.call(zoom).append("g");
g.append("rect")
  .attr("width", WIDTH * OVERLAY_MULTIPLIER)
  .attr("height", HEIGHT * OVERLAY_MULTIPLIER)
  .attr(
    "transform",
    `translate(-${WIDTH * OVERLAY_OFFSET},-${HEIGHT * OVERLAY_OFFSET})`
  )
  .style("fill", "#AEB5BB")
  .style("pointer-events", "all");

  //project geojson
  const projection = d3
  .geoMercator()
  .center([-121.659751732550973, 39.611904777075203])
  .scale(50000)
  .translate([WIDTH / 2, HEIGHT / 2]);


// SVG path and color
const path = d3.geoPath().projection(projection);

let days = ["2018-11-08","2018-11-09","2018-11-10","2018-11-11","2018-11-12","2018-11-13","2018-11-14","2018-11-15","2018-11-16","2018-11-17","2018-11-18","2018-11-19","2018-11-20"];

//const fireColor = d3.scaleOrdinal().domain(days).range(d3.schemePaired)
const fireColor=d3.scaleOrdinal().domain(days)
//.range(d3.schemeCategory10)
.range(d3.quantize(d3.interpolateHcl("#c18dba", "#a9a9b4"), 13))

//interpolator(d3.interpolateViridis);
//hard code colors: no damage, affected, destroyed, minor, major
//black, purple,red,blue,green
const buildColor = d3.scaleOrdinal().range(["#283747","#69039C","#E0213B","#2033B8","#20BD55"])


let inputValue=null

  // update the fill of each SVG of class "incident"
  function updatePeri(value) {
          document.getElementById("range").innerHTML=days[value];
          inputValue = days[value];
          d3.selectAll(".perimeter")
              .attr("fill", dateMatch)
              .attr('opacity',dateMatchTrans);
      }


  function dateMatch(data, value) {

      var d = new Date(data.properties.Date);
      var m = days[d.getDate()-7];
        if (inputValue >= m) {
            this.parentElement.appendChild(this);
            //return "pink";
            return fireColor(data.properties.Date)
        } else {
            return "#999";
        };
    }

  function dateMatchTrans(data, value) {
      //console.log(data.properties)
      var d = new Date(data.properties.Date);
        var m = days[d.getDate()-7];
        if (inputValue >= m) {
            this.parentElement.appendChild(this);
            return 1;
        } else {
            return 0;
        };
    }



    // update the fill of each SVG of class "building"
    function updateBuild(value) {
      document.getElementById("range").innerHTML=days[value];
      inputValue = days[value];
      d3.selectAll(".building")
          .attr("fill", dateMatchDamage)
          //.attr('opacity',dateMatchTrans);
  }
  
  
  function dateMatchDamage(data, value) {
  
  var d = new Date(data.properties.Date);
  var m = days[d.getDate()-7];
    if (inputValue >= m) {
        //this.parentElement.appendChild(this);
        //return "green";
        return buildColor(data.properties.DAMAGE)
    } else {
        //return "#999";
        return "#283747";
    };
  }


d3.json("CampFire_county.geojson").then(function(data){  

    g
    .append("g")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "none")
            .attr("stroke", "black")
            //.attr('stroke-dasharray',[10,10])
            .attr("stroke-width", 2);

    // Place name labels in the middle of a district
  // Introduce some offset (dy, dx) to adjust the position
  g
    .append("g")
    .selectAll("text")
    .data(data.features)
    .enter()
    .append("text")
    .attr("transform", d => `translate(${path.centroid(d)})`)
    .attr("text-anchor", "start")
    .attr("font-size", 20)
    .attr("font-style","italic")
    //.attr("dx", d => _.get(d, "offset[0]", null))
    //.attr("dy", d => _.get(d, "offset[1]", null))
    .text(d => d.properties.COUNTY_NAM+" County");
})


//let myColor=d3.scaleOrdinal().range(["#DE3163","#DFFF00","#40E0D0","#6495ED"])

d3.json("CampFire_progression.geojson").then(function(progression){  

    g
    .append("g")
            .selectAll("path")
            .data(progression.features)
            .enter()
            .append("path")
            .attr("d", path)
            //.attr("fill", (d, i) => myColor(i))
            //.attr("fill", (d, i) => fireColor(d.properties.Day))
            //.attr("stroke", "#FFF")
            .attr("fill", "#E6B0AA")
            .attr('stroke','#DCDCDC')
            .attr("stroke-width", 1)
            .attr("class","perimeter")
            .on("mouseover", mouseOverHandler)
            .on("mouseout", mouseOutHandler)
            .on("click", clickHandler);

    // when the input range changes update the value
    d3.select("#timeslide").on("input", function() {
          updatePeri(+this.value);
          updateBuild(+this.value)
      });
})



d3.json("CampFire_building.geojson").then(function(data){  

    g
    .append("g")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", path)
            //.attr("fill", (d, i) => myColor(d.properties.DAMAGE))
            .attr("fill", "#283747")
            //.attr("stroke", "#FFF")
            //.attr("stroke-width", 0.5);
            .attr("class","building");

      console.log(data.features)

      //d3.select("#timeslide").on("input", function() {
      //  updateBuild(+this.value);
    //});
})

d3.json("CampFire_ignition.geojson").then(function(data){  

    g
    .append("g")
            .selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", "red")
            //.attr("stroke", "#FFF")
            //.attr("stroke-width", 0.5);
})

svg.append("circle").attr("id",'legend_circle').attr("cx",30).attr("cy",110).attr("r", 3).attr('fill',"red").style('opacity',0.6)
//svg.append("circle").attr("id",'legend_circle').attr("cx",30).attr("cy",0).attr("r", 3).attr('fill',function(d){ return myColor("acousticness")}).style('opacity',0.6)
svg.append("text").attr("id",'legend_text').attr("x", 35).attr("y", 111).text("Ignition Location").style("font-size", "10px").attr("alignment-baseline","middle")  
svg.append("rect").attr("id",'legend_dmg_0').attr("x",28).attr("y",130).attr("width", 9).attr("height", 5).attr('fill',"#283747")
svg.append("text").attr("id",'legend_text_0').attr("x", 40).attr("y", 133).text("No Damage").style("font-size", "10px").attr("alignment-baseline","middle")  
svg.append("rect").attr("id",'legend_dmg_1').attr("x",28).attr("y",150).attr("width", 9).attr("height", 5).attr('fill',"#69039C")
svg.append("text").attr("id",'legend_text_1').attr("x", 40).attr("y", 153).text("Affected (1-9%)").style("font-size", "10px").attr("alignment-baseline","middle")  
svg.append("rect").attr("id",'legend_dmg_2').attr("x",28).attr("y",170).attr("width", 9).attr("height", 5).attr('fill',"#2033B8")
svg.append("text").attr("id",'legend_text_2').attr("x", 40).attr("y", 173).text("Minor (10-25%)").style("font-size", "10px").attr("alignment-baseline","middle")  
svg.append("rect").attr("id",'legend_dmg_3').attr("x",28).attr("y",190).attr("width", 9).attr("height", 5).attr('fill',"#20BD55")
svg.append("text").attr("id",'legend_text_3').attr("x", 40).attr("y", 193).text("Major (26-50%)").style("font-size", "10px").attr("alignment-baseline","middle")  
svg.append("rect").attr("id",'legend_dmg_4').attr("x",28).attr("y",210).attr("width", 9).attr("height", 5).attr('fill',"#E0213B")
svg.append("text").attr("id",'legend_text_4').attr("x", 40).attr("y", 213).text("Destroyed (>50%)").style("font-size", "10px").attr("alignment-baseline","middle")  

}

async function Scatter(id,selected){
    
    const data = await d3.csv(csvPathWeather);

    // Create new data with the selection
    //let data_filter = data.map(function(d){return {year: d.year, value:d[selected]} })
  
    let data_filter = data.filter(function (e) {
      return e.Date == selected;
  })
  //.sort(function(a, b) {return d3.ascending(a.Hour, b.Hour)});
  
  //console.log(data_filter)




  //const margin = { top: 40, right: 10, bottom: 120, left: 40 };
  const margin = { top: 0, right: 0, bottom: 100, left: 30};
  const height = 100;
  const width = 750;

  let x = d3.scaleLinear().range([0,width]).nice()

  let y = d3.scaleLinear().nice()
  .range([height,0]);
  //.rangeRound([height - margin.bottom, margin.top]);

  x.domain(d3.extent([d3.min(data_filter, d => parseFloat(d.Wind_Avg_mph))-1, d3.max(data_filter, d => parseFloat(d.Wind_Avg_mph))+1]))
  
  y.domain(d3.extent([d3.min(data_filter, d => parseFloat(d.Air_Temp_Avg)), d3.max(data_filter, d => parseFloat(d.Air_Temp_Avg))+1]))


  
  //let myColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemePaired)

  let brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended),
  idleTimeout,
  idleDelay = 350; 

//clear previous loading
var svg = d3.select(id);
svg.selectAll("*").remove();

svg = d3.select(id).append("svg")
  .attr("viewBox", [0, 0, width, height])
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")")




  let clip = svg.append("defs").append("svg:clipPath")
  .attr("id", "clip")
  .append("svg:rect")
  .attr("width", width )
  .attr("height", height )
  .attr("x", 0) 
  .attr("y", 0);  

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
    .attr("cx", d => x(d.Wind_Avg_mph))
    .attr("cy", d => y(d.Air_Temp_Avg))
    //.attr('fill', 'black')
    //.attr('fill',function(d){ return myColor("acousticness")})
    .attr('fill','#BB2411')
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
    .text("Wind");    


svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "1em")
    .attr("font-weight",500)
    .style("text-anchor", "end")
    .text("Temp.");


svg.append("circle").attr("id",'legend_circle').attr("cx",30).attr("cy",0).attr("r", 3).attr('fill',"#BB2411").style('opacity',0.6)
//svg.append("circle").attr("id",'legend_circle').attr("cx",30).attr("cy",0).attr("r", 3).attr('fill',function(d){ return myColor("acousticness")}).style('opacity',0.6)
svg.append("text").attr("id",'legend_text').attr("x", 35).attr("y", 1).text("Weather Measurement").style("font-size", "10px").attr("alignment-baseline","middle")  

points.append("g")
.attr("class", "brush")
.call(brush);

function brushended({selection}) {

  let s = selection;
  if (!s) {
      if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
      //x.domain(d3.extent(data_filter0, function (d) { return d.year; })).nice();
      //y.domain(d3.extent(data_filter0, function (d) { return d.popularity; })).nice();
      x.domain(d3.extent([d3.min(data_filter, d => parseFloat(d.Wind_Avg_mph))-1, d3.max(data_filter, d => parseFloat(d.Wind_Avg_mph))+1]))

      y.domain(d3.extent([d3.min(data_filter, d => parseFloat(d.Air_Temp_Avg)), d3.max(data_filter, d => parseFloat(d.Air_Temp_Avg))+1]))
  
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
  .attr("cx", function (d) { return x(d.Wind_Avg_mph); })
  .attr("cy", function (d) { return y(d.Air_Temp_Avg); });
}    

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


function SpiderChart(data,id,selected){

    
    //console.log(data0);

    let data_filter = data.filter(function (e) {
      return e.name == selected;
  })

  console.log(data_filter)


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
              color: d3.scaleOrdinal().range(["#BB2411","pink","#DFFF00","#B8D612","#33F529","#40E0D0","#6495ED","#123BD6","#5A1664","#CACFD2"]),
				format: '.0f',
				legend: { title: 'Wind direction of the day:', translateX: -180, translateY: 5 },
			};

      // Draw the chart with the RadarChart
      let svg_radar = d3.select(id);
      svg_radar.selectAll("*").remove();

      svg_radar=RadarChart(id,data_filter,radarChartOptions)


}