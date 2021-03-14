import * as d3 from "d3";
import * as topojson from "topojson"
import * as fc from "d3fc"
import worldtopo from "../assets/data/world-topo-min.json"
import capitals from "../assets/data/country-capitals.csv"
import totalflight from "../assets/data/final_line.csv"
import {casestudy} from "./casestudy"
import {linePlot} from "./linePlot"

export function worldmap(){
    
    d3.select(window).on("resize", throttle);
    var zoom = d3.zoom()
        .scaleExtent([1, 9])
        .on("zoom", move);
    
    var width = document.getElementById('container').offsetWidth;
    console.log(width)
    //var width = 600;
    var height = width / 2;
    
    var topo,projection,path,svg,g;
    
    var graticule = d3.geoGraticule();

    var max_legend = 70000

    setup(width,height);

    function setup(width,height){
      projection = d3.geoMercator()
        .translate([(width/2), (height/2)]) // 
        .scale( width / 2 / Math.PI);
    
      path = d3.geoPath().projection(projection);
    
      svg = d3.select("#container").append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("id", "map_svg")
          .call(zoom)
    
      g = svg.append("g");
    
    }
   
    var countries = topojson.feature(worldtopo, worldtopo.objects.countries).features;
    topo = countries;
    //draw(topo, "2019-12");

    //////// slider /////////
    var formatDateIntoMonth = d3.timeFormat("%Y-%m")
    var formatDate = d3.timeFormat("%b %Y");
    
    var startDate = new Date("2019-12-02"),
        endDate = new Date("2021-01-01");
    
    ////////// slider //////////
    var currentValue = 0;
    var targetValue = width * 0.2;
        
    var x = d3.scaleTime()
        .domain([startDate, endDate])
        .range([0, targetValue])
        .nice(12)
        .clamp(true);
    
    var slider = svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + ( width / 10) + "," + (height *7 /8) + ")");
    
    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function(event, d) {
            currentValue = event.x;
            update(x.invert(currentValue)); 
            })
        );
    
    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);
    
    var label = slider.append("text")  
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .text(formatDate(startDate))
        .attr("transform", "translate(0," + (-25) + ")")

    // update map accordingly
    function update(h) {
          // update position and text of label according to slider scale
          handle.attr("cx", x(h));
          label
          .attr("x", x(h))
          .text(formatDate(h));
          draw(topo, formatDateIntoMonth(h))
      }

    // main function to draw map
    function draw(topo, month = "2019-12") {
    const promises = [
      d3.csv(totalflight),
      d3.csv(capitals)
          ];
    Promise.all(promises).then(function(values){
      var total = values[0]
      var airport = values[1]

      total = total.filter(d => d.Month == month)
      svg.append("path")
       .datum(graticule)
       .attr("class", "graticule")
       .attr("d", path);
      
      //remove the original map 
      g.selectAll("*").remove();
      g.append("path")
        .datum({type: "LineString", coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]})
        .attr("class", "equator")
        .attr("d", path);
    

      var country = g.selectAll(".country").data(topo);
      var label = d3.select("#container").append("div")
                  .attr('class', 'd3-tooltip')
                  .style('position', 'absolute')
                  .style('z-index', '10')
                  .style('visibility', 'hidden')
                  .style('padding', '10px')
                  .style('background', 'rgba(0,0,0,0.6)')
                  .style('border-radius', '4px')
                  .style('color', '#fff')
                  .text('a simple tooltip')
                
      //color map 
      var color =  d3.scaleSequential(d3.interpolateOrRd)
                      .domain([0, max_legend])

      country.enter()
        .insert("path")
        .attr("class", "country")
        .attr("d", path)
        .attr("id", function(d,i) { return d.properties.name; })
        .attr("title", function(d,i) { return d.id; })
        .style("fill", function(d, i) { return fetchcolor(d.properties.name) }) // d.properties.color//fetchcolor(d.properties.name)
        .on("mouseover", function(d, i){
            //var mouse = d3.pointer(event, this).map( function(d) { return parseInt(d); } );
           label.style('visibility', 'visible')
                .html(this.id + " total flight: " + fetchtotal(this.id))
        })
        .on("mouseout", function(d, i){
            label.style('visibility', 'hidden')
        })
        .on("click", click);

        //draw airports
        airport.forEach(function(row){
          addpoint(row.CapitalLongitude, row.CapitalLatitude, row.CapitalName)
        })
        
        //draw legend
        drawLegend([0,max_legend], color)

        function fetchcolor(cty){
          let temp = total.filter(d => d.Name == cty)
          let val
          if (temp.length > 0){
             val = temp[0].total_count
          }else{
             val = 0
          }
          return color(val)
        }

        function fetchtotal(cty){
          let temp = total.filter(d => d.Name == cty)
          let val
          if (temp.length > 0){
             val = temp[0].total_count
          }else{
             val = 0
          }
          return val
        }

        
        function drawLegend(domain, color){
          const min = domain[0]
          const max = domain[1]
          const width = 30
          const height = 100
          //var container= d3.select("#testmove")
          //var color =  d3.scaleSequential(d3.interpolateOrRd).domain(domain)
           // Band scale for x-axis
          const xScale = d3
           .scaleBand()
           .domain([0, 1])
           .range([0, width]);
         
          // Linear scale for y-axis
          const yScale = d3
           .scaleLinear()
           .domain(domain)
           .range([height, 0]);
      
      
      
          // An array interpolated over our domain where height is the height of the bar
          const expandedDomain = d3.range(min, max, (max - min) / height);
      
          // Defining the legend bar
          const svgBar = fc
            .autoBandwidth(fc.seriesSvgBar())
            .xScale(xScale)
            .yScale(yScale)
            .crossValue(0)
            .baseValue((_, i) => (i > 0 ? expandedDomain[i - 1] : 0))
            .mainValue(d => d)
            .decorate(selection => {
              selection.selectAll("path").style("fill", d => color(d));
            });
      
          // Drawing the legend bar
          //const legendSvg = container.append("svg").attr("width", 500).attr("height", 500);
        
          const legendBar = svg
            .append("g")
            .datum(expandedDomain)
            .call(svgBar)
            .attr("transform", "translate(50," + 400 + ")");
      
      
      
          // Defining our label
          const axisLabel = fc
            .axisRight(yScale)
            .tickValues([...domain, (domain[1] + domain[0]) / 2]);
      
          // Drawing and translating the label
          const barWidth = Math.abs(legendBar.node().getBoundingClientRect().x);
      
      
          // Hiding the vertical line
          svg.append("g")
            //.attr("transform", `translate(${barWidth})`)
            .attr("transform", "translate(" + (50+10)+ "," + 400 + ")")
            .datum(expandedDomain)
            .call(axisLabel)
            .select(".domain")
            .attr("visibility", "hidden");
      
      
      
                        }
      
    })  
  }
  
  
  function redraw() {
    width = document.getElementById('container').offsetWidth;
    height = width / 2;
    d3.select('svg').remove();
    setup(width,height);
    draw(topo);
  }
  
  
  function move() {
    /*
    console.log(3)
    var t = d3.event.transform;
    var s = d3.event.transform.k; 
    zscale = s;
    var h = height/4;
  
  
    t.x = Math.min(
      (width/height)  * (s - 1), 
      Math.max( width * (1 - s), t.x )
    );
  
    t.y = Math.min(
      h * (s - 1) + h * s, 
      Math.max(height  * (1 - s) - h * s, t.y)
    );
    console.log(4)
    zoom.translate(t);
    //g.attr("transform", "translate(" + t + ")scale(" + s + ")");
    g.attr("transform", t)
    //adjust the country hover stroke width based on zoom level
    d3.selectAll(".country").style("stroke-width", 1.5 / s);
    */
   var transform = d3.zoomTransform(this)
   var h = height/4;
   transform.x = Math.min(
    (width/height)  * (transform.k - 1), 
    Math.max( width * (1 - transform.k), transform.x )
    );
    transform.y = Math.min(
        h * (transform.k - 1) + h * transform.k, 
        Math.max(height  * (1 - transform.k) - h * transform.k, transform.y)
      );
   g.attr("transform", transform)
  }
  
  
  
  var throttleTimer;
  function throttle() {
    window.clearTimeout(throttleTimer);
      throttleTimer = window.setTimeout(function() {
        redraw();
      }, 200);
  }
  
  
  //geo translation on mouse click in map
  function click(event,d) {
    console.log(event)
    console.log(d)
    console.log(d.properties.name)
    casestudy(d.properties.name)
    linePlot(d.properties.name)
  }
  
  
  //function to add points and text to the map (used in plotting capitals)
  function addpoint(lat,lon,text) {
  
    var gpoint = g.append("g").attr("class", "gpoint");
    var x = projection([lat,lon])[0];
    var y = projection([lat,lon])[1];
  
    gpoint.append("svg:circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("class","point")
          .attr("r", 1.5);
  
    //conditional in case a point has no associated text
    if(text.length>0){
  
      gpoint.append("text")
            .attr("x", x+2)
            .attr("y", y+2)
            .attr("class","text")
            .text(text);
    }
  
  }
  
  
}



