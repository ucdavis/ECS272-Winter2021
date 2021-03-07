import * as d3 from "d3";
import * as topojson from "topojson"
import worldtopo from "../assets/data/world-topo-min.json"
import capitals from "../assets/data/country-capitals.csv"
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

    var tooltip = td3.selec("#container").append("div").attr("class", "tooltip hidden");

    setup(width,height);

    function setup(width,height){
      projection = d3.geoMercator()
        .translate([(width/2), (height/2)])
        .scale( width / 2 / Math.PI);
    
      path = d3.geoPath().projection(projection);
    
      svg = d3.select("#container").append("svg")
          .attr("width", width)
          .attr("height", height)
          .call(zoom)
          .on("click", click)
          .append("g");
    
      g = svg.append("g");
    
    }
    console.log(worldtopo)
    var countries = stopojon.feature(worldtopo, worldtopo.objects.countries).features;
    topo = countries;
    draw(topo);
    /*
    d3.json("../assets/data/world-topo-min.json", function(error, world) {
        console.log(3)

      var countries = topojson.feature(world, world.objects.countries).features;
    
      topo = countries;
      draw(topo);
    
    });
    */
   function draw(topo) {

    svg.append("path")
       .datum(graticule)
       .attr("class", "graticule")
       .attr("d", path);
  
  
    g.append("path")
     .datum({type: "LineString", coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]})
     .attr("class", "equator")
     .attr("d", path);
  
  
    var country = g.selectAll(".country").data(topo);
    //g.append("g").attr("class", "gpoint")
    var label = g.append("g")
                 .attr("class", "tooltip-wrapper")
                 .attr("display", "none");
    var tooltipBackground = label.append("rect")
                                 .attr("fill", "#e8e8e8")
                                 .attr("width", 30)
                                 .attr("height", 20)
    var labelText = label.append("text")

    country.enter().insert("path")
        .attr("class", "country")
        .attr("d", path)
        .attr("id", function(d,i) { return d.id; })
        .attr("title", function(d,i) { return d.properties.name; })
        .style("fill", function(d, i) { return d.properties.color; })
        .on("mouseover", function(d, i){ 
            var mouse = d3.pointer(event, this).map( function(d) { return parseInt(d); } );
            console.log(d)
            label.attr("display", null)
            labelText.attr("x", mouse[0]+25)
                     .attr("y", mouse[1]+5)
                     .text("")
        })
        .on("mouseout", function(d, i){
            label.attr("display", "none")
        });
  
    //offsets for tooltips
    var offsetL = document.getElementById('container').offsetLeft+20;
    var offsetT = document.getElementById('container').offsetTop+10;
  
    //tooltips
    /*
    country
      .on("mousemove", function(d,i) {
  
        var mouse = d3.pointer(svg.node()).map( function(d) { return parseInt(d); } );
        console.log(mouse)
        tooltip.classed("hidden", false)
               .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
               .html(d.properties.name);
  
        })
       .on("mouseout",  function(d,i) {
          tooltip.classed("hidden", true);
        }); 
    */
    /*
    country
       .on("mouseover", function(d) {
     var mouse = d3.pointer(event, svg.node()).map( function(d) { return parseInt(d); } );
     console.log(6)
     console.log(event, svg.node())
     tooltip.classed("hidden", false)
            .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
            .html(d.properties.name);

     })
       .on("mouseout",  function(d,i) {
       tooltip.classed("hidden", true);
     }); 
     */
    
    //EXAMPLE: adding some capitals from external CSV file
    /*
    var Capitals = d3.csv(capitals)
    console.log(Capitals)
    Capitals.forEach(function(i){
        addpoint(i.CapitalLongitude, i.CapitalLatitude, i.CapitalName );
      });
    */
    /*  
    d3.csv("../assets/data/country-capitals.csv", function(err, capitals) {
  
      capitals.forEach(function(i){
        addpoint(i.CapitalLongitude, i.CapitalLatitude, i.CapitalName );
      });
  
    });
    */
   d3.csv(capitals, function(row){
       //console.log(row)
       addpoint(row.CapitalLongitude, row.CapitalLatitude, row.CapitalName)
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
  function click() {
    var latlon = projection.invert(d3.pointer(event, this));
    console.log(latlon);
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



