import yrcsv from "../assets/yr.csv";
import * as d3 from "d3v4";

var margin = { top: 15, right: 220, bottom: 40, left: 50 },
  width = window.innerWidth - 50 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var MainSvg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

var Svg = MainSvg.append("g").attr(
  "transform",
  "translate(" + margin.left + "," + margin.top + ")"
);

//Read the data
d3.csv(yrcsv, function (data) {
  var allGroup = [
    "valence",
    "acousticness",
    "danceability",
    "energy",
    "instrumentalness",  
    "liveness",
    "speechiness",
  ];
  // var allGroup = ["valence"]
  var myColorArray = {
    valence: "#00FF00",
    acousticness: "#FF7F00",
    danceability: "#FFF",
    energy: "#F00",
    instrumentalness: "#00FFFF",
    liveness: "#FFFF00",
    speechiness: "#8B00FF",
  };

  // Reformat the data: we need an array of arrays of {x, y} tuples
  var dataReady = allGroup.map(function (grpName) {
    // .map allows to do something for each element of the list
    return {
      name: grpName,
      values: data.map(function (d) {
        return { year: d.year, value: +d[grpName] };
      }),
    };
  });
  // Add X axis
  var x = d3
    .scaleLinear()
    .domain([
      1919,
      d3.max(data, function (d) {
        return parseInt(d.year);
      }),
    ])
    .range([0, width - 10]);

  var xAxis = Svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "baraxis")
    .call(d3.axisBottom(x).ticks(7));
  Svg.append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
    )
    .style("text-anchor", "middle")
    .style("font-size", "15px")
    .text("Year");
  Svg.append("text")
    .attr("transform", "translate(" + width / 2 + " ,18)")
    .style("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text("Music Characteristics by Year");
  // Add Y axis
  var y = d3.scaleLinear().domain([0, 1]).range([height, 0]);
  var yAxis = Svg.append("g")
    .attr("class", "baraxis")
    .call(d3.axisLeft(y).ticks(6));
  Svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Measure");
  // Add a clipPath: everything out of this area won't be drawn.
  var clip = Svg.append("defs")
    .append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0);

  // myColor scale: give me a specie name, I return a myColor
  var myColor = d3
    .scaleOrdinal()
    .domain([
      "valence",
      "acousticness",
      "danceability",
      "energy",
      "instrumentalness",
      "liveness",
      "speechiness",
    ])
    .range([
      "#66994D",
      "#9A66FF",
      "#D3D3D3",
      "#DE354C",
      "#4DA8DA",
      "#D9AC2A",
      "#0ABDA0",
    ]);

  // Add brushing
  var brush = d3
    .brushX() // Add the brush feature using the d3.brush function
    .extent([
      [0, 0],
      [width, height],
    ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    .on("end", updateChart);

  var scatter = Svg.append("g").attr("clip-path", "url(#clip)");
  // Add circles
  scatter
    .selectAll("firstStep")
    .data(dataReady)
    .enter()
    .append("g")
    .style("fill", function (d) {
      return myColorArray[d.name];
    })
    .attr("class", function (d) {
      return d.name;
    })
    .selectAll("circle")
    .data(function (d) {
      return d.values;
    })
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.year);
    })
    .attr("cy", function (d) {
      return y(d.value);
    })
    .attr("r", 3)
    .style("fill", function (d) {
      return myColorArray[d.name];
    })
    .style("opacity", 1)
    .attr("class", "circle")
    .on("mouseover", function (d) {
      d3.select(this).style("cursor", "pointer").attr("r", 8);

      scatter
        .append("text")
        .attr("class", "text")
        .attr("fill", "#000")
        .text(d.value.toFixed(3))
        .attr(
          "transform",
          "translate(" + (x(d.year) + 5) + "," + (y(d.value) - 10) + ")"
        );
    })
    .on("mouseout", function (d) {
      d3.select(this).style("cursor", "default").attr("r", 3);
      scatter.selectAll(".text").remove();
    });

  d3.selectAll("input[name='charttype']").on("change", function () {
    if (this.id == "Brush") {
      scatter
        .append("g")
        .attr("class", "brush")
        .attr("id", "brushID")
        .call(brush)
        .on("dblclick", resetChart);
    } else {
      var myobj = document.getElementById("brushID");
      myobj.remove();
    }
  });

  var idleTimeout;
  function idled() {
    idleTimeout = null;
  }

  // A function that update the chart for given boundaries
  function updateChart() {
    var extent = d3.event.selection;

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if (!extent) {
      if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
      x.domain(
        d3.extent(data, function (d) {
          return d.year;
        })
      );
    } else {
      x.domain([x.invert(extent[0]), x.invert(extent[1])]);
      scatter.select(".brush").call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
    }

    // Update axis and circle position
    xAxis.transition().duration(1000).call(d3.axisBottom(x));
    scatter
      .selectAll("circle")
      .transition()
      .duration(1000)
      .attr("cx", function (d) {
        return x(d.year);
      })
      .attr("cy", function (d) {
        return y(d.value);
      })
      .attr("fill", function (d) {
        return myColorArray[d.name];
      });
  }
  function resetChart() {
    var extent = d3.event.selection;

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if (!extent) {
      if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
      x.domain([
        1919,
        d3.max(data, function (d) {
          return parseInt(d.year) + parseInt(2);
        }),
      ]);
    } else {
      x.domain([x.invert(extent[0]), x.invert(extent[1])]);
      scatter.select(".brush").call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
    }

    // Update axis and circle position
    xAxis.transition().duration(1000).call(d3.axisBottom(x));
    scatter
      .selectAll("circle")
      .transition()
      .duration(1000)
      .attr("cx", function (d) {
        return x(d.year);
      })
      .attr("cy", function (d) {
        return y(d.value);
      })
      .attr("fill", function (d) {
        return myColorArray[d.name];
      });
  }

  // SCATTER PLOT TOGGLE SWITCH UPDATE FUNCTION
  function updateLegend(){
      
    // For each check box:
    
    d3.selectAll(".form-check-input").each( function(d){
      var cb = d3.select(this);
      var grp = cb.property("value")
      
      var currentOpacity = 1;
      // If the box is check, I show the group
      if(cb.property("checked")){
        // Svg.selectAll(grp).transition().duration(1000).style("opacity", 1);
        d3.selectAll("."+grp)
        .transition()
        .style("opacity", currentOpacity)
        .style("visibility", "visible");

      // Otherwise I hide it
      }else{
        // Svg.selectAll(grp).style("opacity", 0)
        d3.selectAll("."+grp)
          .transition()
          .style("opacity", currentOpacity == 1 ? 0 : 1)
          .style("visibility", currentOpacity == 1 ? "hidden" : "visible");
      }
    })
  }

  // When a button change, I run the updateLegend function
  d3.selectAll(".form-check-input").on("change",updateLegend);

  // And I initialize it at the beginning
  updateLegend();

});
