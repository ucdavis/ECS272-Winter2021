import * as d3 from "d3";

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
    d3.select("#map__text").text(`Burned perimeter of the day ${i.properties.Date}`)
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


}