//bubblechart
import * as d3 from "d3";
import csvPath from '../assets/data/data_by_year.csv';


export async function drawBubbleChart(){

    

    //Read the data
    const data = await d3.csv(csvPath);
    
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;




    // append the svg object to the body of the page
    var svg = d3.select("#mydataviz")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")")
                // .call(d3.zoom().on("zoom", function () {
                //         svg.attr("transform", d3.event.transform)
                //      }))
                //      .append("g");

    
    // Add X axis
    var x = d3.scaleLinear()
              .domain([1920, 2020])
              .range([ 0, width ])

    var xAxis = svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
    
    // svg.append("g")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(d3.axisBottom(x))
    //    .call(g =>
    //     g .select(".tick:last-of-type text")
    //       .clone()
    //       .attr("text-anchor", "middle")
    //       .attr("x", -width / 2)
    //       .attr("y", margin.bottom - 10)
    //       //.attr("font-weight", "bold")
    //       .text("Year")
    //     );


    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0]);

    var yAxis = svg.append("g")
        .call(d3.axisLeft(y));
    
    
    // Add a clipPath: everything out of this area won't be drawn.
    var clip = svg.append("defs").append("SVG:clipPath")
        .attr("id", "clip")
        .append("SVG:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

    // Create the scatter variable: where both the circles and the brush take place
    var scatter = svg.append('g')
                    .attr("clip-path", "url(#clip)")


    // svg.append("g")
    //     .call(d3.axisLeft(y))
    //     .call(g =>
    //         g .select(".tick:last-of-type text")
    //           .clone()
    //           .attr("transform", `rotate(-90)`)
    //           .attr("text-anchor", "middle")
    //           .attr("x", (600 - margin.top - margin.bottom) / 2)
    //           .attr("y", 100)
    //           .attr("font-weight", "bold")
    //           .text("Danceability")
    //           .style("color", "white")
    //       );



    // Add a scale for bubble size
    var z = d3.scaleLinear()
        .domain([0, 100])
        .range([ 1, 50]);


    var tooltip = d3.select("#mydataviz")
                    .append("div")
                    .style("opacity", 0)
                    .attr("id", "tooltip")
                    .style("background-color", "grey")
                    .style("border-radius", "5px")
                    .style("padding", "10px")
                    .style("color", "white")

                    tooltip.append("text")
                    .attr("x", 15)
                    .attr("dy", "1.2em")
                    .style("text-anchor", "middle")
                    .attr("font-size", "12px")
                    .attr("font-weight", "bold");

    
    var showTooltip = function(d) {
                        
                    tooltip
                          .transition()
                          .duration(200)
                    tooltip
                          .style("opacity", 1)
                          .html("Popularity: " + d.popularity)
                        //   .style("left", (d3.mouse(this)[0]+30) + "px")
                        //   .style("top", (d3.mouse(this)[1]+30) + "px")

                      }

    var moveTooltip = function(d) {
                        
                    tooltip
                          //.style("left", (d3.mouse(this)[0]+30) + "px")
                          //.style("top", (d3.mouse(this)[1]+30) + "px")
                      }
    
    var hideTooltip = function(d) {
                
                    tooltip
                          .transition()
                          .duration(200)
                          .style("opacity", 0)
                      }
                    
    const g = svg.append("g");

    
    // Add dots
    //svg.append('g')
    const bubbles = g
    //scatter
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "bubbles")
        .attr("cx", function (d) { return x(d.year); } )
        .attr("cy", function (d) { return y(d.danceability); } )
        .attr("r", function (d) { return z(d.popularity); } )
        //.style("fill", "#c4fa70")
        .style("opacity", "1")
        .attr("stroke", "black")
        .style("stroke-width", '2.5px')
        //.on('mouseover', showTooltip)
        .on('mouseover', function(d) {
            tooltip.transition()
            //tooltip.duration(200)
            tooltip.style("opacity", 1)
            tooltip.select("text").text(d.popularity);
        })
        .on("mousemove", moveTooltip )
        .on("mouseleave", hideTooltip)

    


        let transform;

        const zoom = d3.zoom().on("zoom", e => {
          g.attr("transform", (transform = e.transform));
          g.style("stroke-width", 3 / Math.sqrt(transform.k));
          //bubbles.attr("r", 3 / Math.sqrt(transform.k));
        });


        return svg
                .call(zoom)
                .call(zoom.transform, d3.zoomIdentity)
                .on("pointermove", event => {
                    const p = transform.invert(d3.pointer(event));
                });
    
    // var zoom = d3.zoom()
    //     .scaleExtent([.5, 20])  // This control how much you can unzoom (x0.5) and zoom (x20)
    //     .extent([[0, 0], [width, height]])
    //     .on("zoom", updateChart);



    // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
    // svg.append("rect")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .style("fill", "none")
    //     .style("pointer-events", "all")
    //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    //     .call(zoom);
    // now the user can zoom and it will trigger the function called updateChart

    // A function that updates the chart when the user zoom and thus new boundaries are available
    // function updateChart() {

    //         // recover the new scale
    //         var newX = d3.event.transform.rescaleX(x);
    //         var newY = d3.event.transform.rescaleY(y);

    //         // update axes with these new boundaries
    //         xAxis.call(d3.axisBottom(newX))
    //         yAxis.call(d3.axisLeft(newY))

    //         // update circle position
    //         scatter
    //         .selectAll("circle")
    //         .attr("cx", function(d) {return newX(d.year)})
    //         .attr("cy", function(d) {return newY(d.danceability)})
    //         .attr("r", function (d) { return z(d.popularity); } );
    //     }


    //     var zoom = d3.zoom()
    // .scaleExtent([1, 40])
    // .translateExtent([[-100, -100], [width + 90, height + 100]])
    // .on("zoom", zoomed);
        
    //     svg.call(zoom);

    //     function zoomed() {
    //       view.attr("transform", d3.event.transform);
    //       gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
    //       gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
    //     }


}














//linechArt

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


    var colors = ["#fcd471", "#fbafa1", "#fb84ce", "#ef54f1", "#c4fa70"]
    var attr = ["danceability", "energy", "liveness", "acousticness", "valence"]
    var padding = 400;

    var legend = svg.append('g')
                .attr('class', 'legend')
                .attr('transform', 'translate(' + (padding + 12) + ', 0)');

            legend.selectAll('rect')
                .data(attr)
                .enter()
                .append('rect')
                .attr('x', 0)
                .attr('y', function(d, i){
                    return i * 16;
                })
                .attr('width', 10)
                .attr('height', 10)
                .attr('fill', function(d, i){
                    return colors[i];
                });
            
            legend.selectAll('text')
                .data(attr)
                .enter()
                .append('text')
                .text(function(d){
                    return d;
                })
                .attr('x', 16)
                .attr('y', function(d, i){
                    return i * 16;
                })
                .attr('text-anchor', 'start')
                .attr('alignment-baseline', 'hanging');
  

}