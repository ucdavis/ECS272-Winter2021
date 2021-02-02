import * as d3 from "d3";
import csvPath from '../assets/data/data_by_year.csv';


export async function drawLineChart(){

    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 50, left: 50},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;



    // List of groups (here I have one group per column)
    var allGroup = ["danceability", "energy", "liveness", "acousticness", "valence"]


    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

      var myColor = d3.scaleLinear()
                        .domain(allGroup)
                        .range(["#79d70f", "#d7efb6", "#e8249a", "#c4fa70", "#cf7500"]);

        console.log("colorrrrrr:   " + myColor["danceability"]);
    // parse the date / time
    var parseTime = d3.timeParse("%y");

    // set the ranges
    var x = d3.scaleLinear()
                .domain([1920, 2020])
                .range([0, width]);
    var y = d3.scaleLinear()
                .range([height, 0]);

    // define the 1st line
    var valueline = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.danceability); });

    // define the 2nd line
    var valueline2 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.energy); });

    var valueline3 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.liveness); });

    var valueline4 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.acousticness); });

    var valueline5 = d3.line()
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.valence); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#linechart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

    // Get the data
    const data = await d3.csv(csvPath);


    // format the data
    data.forEach(function(d) {
            d.date = parseTime(d.year);
            d.danceability = +d.danceability;
            d.energy = +d.energy;
            d.liveness = +d.liveness;
            d.acousticness = +d.acousticness;
            d.valence = +d.valence;
    });

    // Scale the range of the data
    x.domain([1920, 2020])
    y.domain([0, 1]);

    
    var tooltip = d3.select(".line")
                    .append("div")
                    .style("opacity", 1.0)
                    .attr("class", "tooltip")
                    .style("background-color", "black")
                    // .style("border-radius", "5px")
                    .style("padding", "10px")
                    .style("color", "white")

    
    //var showTooltip = 
    function handleMouseOver(d) {
                        
                    //tooltip
                    d3.select(this)
                          .transition()
                          .duration(200)
                          //.style("opacity", 1)
                    //tooltip
                          .style("opacity", 2)
                          .style("stroke-width", '3.5px')

                          //.html("Attribute: " + d.valueline)
                        //   .style("left", (d3.mouse(this)[0]+30) + "px")
                        //   .style("top", (d3.mouse(this)[1]+30) + "px")
                      }

    // var moveTooltip = function(d) {
                        
    //                 tooltip
    //                       .style("left", (d3.mouse(this)[0]+30) + "px")
    //                       .style("top", (d3.mouse(this)[1]+30) + "px")
    //                   }
    
    //var hideTooltip = 
    function handleMouseOut(d) {
                
                    d3.select(this)
                          .transition()
                          .duration(100)
                          .style("opacity", 1.0)
                          .style("stroke-width", "2px")
                      }
                    
    
    // Add the valueline path.
    var line = svg.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "#fcd471")
    .attr("d", valueline)
    .on("mouseover", handleMouseOver )
    //.on("mousemove", moveTooltip )
    .on("mouseleave", handleMouseOut );

    // Add the valueline2 path.
    var line = svg.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "#fbafa1")
    .attr("d", valueline2)
    .on("mouseover", handleMouseOver )
    //.on("mousemove", moveTooltip )
    .on("mouseleave", handleMouseOut );

    // Add the valueline3 path.
    var line = svg.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "#fb84ce")
    .attr("d", valueline3)
    .on("mouseover", handleMouseOver )
    //.on("mousemove", moveTooltip )
    .on("mouseleave", handleMouseOut );

    // Add the valueline4 path.
    var line = svg.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "#ef54f1")
    .attr("d", valueline4)
    .on("mouseover", handleMouseOver )
    //.on("mousemove", moveTooltip )
    .on("mouseleave", handleMouseOut );

    // Add the valueline5 path.
    var line = svg.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "#c4fa70")
    .attr("d", valueline5)
    .on("mouseover", handleMouseOver )
    //.on("mousemove", moveTooltip )
    .on("mouseleave", handleMouseOut );

    // Add the X Axis
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("background-color", "white")
    .attr("class", "axisWhite")
    .call(d3.axisBottom(x))
    .call(g =>
        g .select(".tick:last-of-type text")
          .clone()
          .attr("text-anchor", "middle")
          .attr("x", -width / 2)
          .attr("y", margin.bottom - 10)
          //.attr("font-weight", "bold")
          .text("Year")
        );

    // Add the Y Axis
    svg.append("g")
    .attr("class", "axisWhite")
    .call(d3.axisLeft(y));


    // legendSpace = width;

    function update(selectedGroup) {

        // Create new data with the selection?
        var dataFilter = data.map(function(d){return {year: d.year, value:d[selectedGroup]} })
  
        // Give these new data to update line
        line
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
                                .x(function(d) { return x(d.year) })
                                .y(function(d) { return y(d.value) })
            )
            .attr("stroke", function(d){ return myColor(selectedGroup) })
      }

      // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })
  

}