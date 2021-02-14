import * as d3 from "d3";
import 'd3-transition';

/** Reference: https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7 **/
export function drawScatterplot(data, id) {

    const margin = { top: 40, right: 80, bottom: 80, left: 65 };
    const height = 280;
    const width = 630;

    const x = d3.scaleLinear()
        .domain([d3.min(data, d => d.popularity), d3.max(data, d => d.popularity)]).nice()
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.danceability)]).nice()
        .range([height, 0]);

    let svg = d3.select(id).append("svg")
        .attr("id", "scatterplot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xAxis = g => g
        .attr("transform", `translate(0,` + height + `)`)
        .call(d3.axisBottom(x))

    const yAxis = g => g
        .call(d3.axisLeft(y))

    // Tooltip
    d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("id", "clip-rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0) 
        .attr("y", 0);

    var scatter = svg.append("g");
    scatter
        .attr("clip-path", "url(#clip)");

    scatter
        .selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => x(d.popularity))
        .attr("cy", d => y(d.danceability))
        .attr("r", 1)
        .attr("opacity", 0.7)
        .attr("fill", "#166d66")

    // Chart title
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2)-45)
        .attr("text-anchor", "middle")  
        .style("font-size", "17px")
        .text("Tempo and Artist Popularity");
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2)-30)
        .attr("text-anchor", "middle")  
        .style("font-size", "12px")
        .text("Does the measurement of track being danceable influence artist popularity? (Select area to zoom; Double-click to zoom out)");

    // X axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("id", "x_axis")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "0.5em")
            .attr("dy", "0.5em")
            .attr("font-weight", "bold")

    // X axis title label
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2) + 290)
        .attr("text-anchor", "middle")  
        .attr("font-weight", "bold")
        .style("font-size", "11px")
        .text("Popularity Rating");

    // Y axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("id", "y_axis")
        .call(yAxis)

    // Y axis title label
    svg.append("text")
        .attr("transform", `rotate(-90)`)
        .attr("text-anchor", "middle")
        .attr("x", -125)
        .attr("y", (width - margin.top - margin.bottom - 550))
        .attr("font-weight", "bold")
        .style("font-size", "11px")
        .text("Danceability");

    var brush = d3.brush().extent([[0, 0], [width, height]]).on("end", brushended),
        idleTimeout,
        idleDelay = 350;

    scatter.append("g")
        .attr("class", "brush")
        .call(brush);

    function brushended(event) {

        var s = event.selection;
        if (!s) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay);
            x.domain(d3.extent(data, d => d.popularity )).nice();
            y.domain(d3.extent(data, d => d.danceability )).nice();
        } else {
            
            x.domain([s[0][0], s[1][0]].map(x.invert, x));
            y.domain([s[1][1], s[0][1]].map(y.invert, y));
            scatter.select(".brush").call(brush.move, null);
        }
        zoom();
    }

    function idled() {
        idleTimeout = null;
    }

    function zoom() {
        svg.select("#x_axis").transition().duration(1000).call(xAxis);
        svg.select("#y_axis").transition().duration(1000).call(yAxis);
        scatter.selectAll(".dot").transition().duration(1000)
            .attr("cx", d => x(d.popularity) )
            .attr("cy", d => y(d.danceability) );
        console.log("Zoomed points");
    }


}

