import * as d3 from "d3";
import csvPath from '../assets/data/data_by_year.csv';


export async function drawBubbleChart(){

    

    //Read the data
    const data = await d3.csv(csvPath);
    
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 250 - margin.top - margin.bottom;


    const zoom = d3.zoom()
        .scaleExtent([0.5, 32])
        .on("zoom", zoomed);
  
  

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

    var k = height/width;

    console.log("k:...." + k)
    
    
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
                    
    
    const gGrid = svg.append("g");

    
    
    // Add dots
    //svg.append('g')
    const bubbles = svg.append('g')
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

    
    const gx = svg.append("g");

    const gy = svg.append("g");

    svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

    
    function grid(g, x, y) {
        g
            .attr("stroke", "white")
            .attr("stroke-opacity", 0.1)
            .call(g => g
            .selectAll(".x")
            .data(x.ticks(12))
            .join(
                enter => enter.append("line").attr("class", "x").attr("y2", height),
                update => update,
                exit => exit.remove()
            )
                .attr("x1", d => 0.5 + x(d))
                .attr("x2", d => 0.5 + x(d)))
            .call(g => g
            .selectAll(".y")
            .data(y.ticks(12 * 0.377))
            .join(
                enter => enter.append("line").attr("class", "y").attr("x2", width),
                update => update,
                exit => exit.remove()
            )
                .attr("y1", d => 0.5 + y(d))
                .attr("y2", d => 0.5 + y(d)));
    }
    
    function zoomed({transform}) {
        const k=0.377;
        const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
        const zy = transform.rescaleY(y).interpolate(d3.interpolateRound);
        bubbles.attr("transform", transform).attr("stroke-width", 5 / transform.k);
        gx.call(xAxis, zx);
        gy.call(yAxis, zy);
        gGrid.call(grid, zx, zy);
    }

    
    
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