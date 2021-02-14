import * as d3 from "d3";

/** Reference: https://observablehq.com/@d3/zoomable-bar-chart **/
/** Reference: https://bl.ocks.org/mukhtyar/d29605757190f60c555a **/
export function drawBarChart(data, id) {

    const margin = { top: 50, right: 40, bottom: 80, left: 70 };
    const height = 630;
    const width = 530;

    const x = d3.scaleBand().domain(data.map(d => d.popularityrange))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.numartists)]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
    

    let svg = d3.select(id).append("svg")
        .attr("class", "bars")
        .attr("id", "barchart")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    // Chart title
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2)-5)
        .attr("text-anchor", "middle")  
        .style("font-size", "15px")
        .text("Artist Popularity");
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2)+7)
        .attr("text-anchor", "middle")  
        .style("font-size", "10px")
        .text("How many artists have low or high popularity ratings?");
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2)+17)
        .attr("text-anchor", "middle")  
        .style("font-size", "10px")
        .style("opacity", 0.7)
        .text("(Select popularity rating and scroll to zoom and drag to move)");

    // X axis
    svg.append("g")
        .attr("class", "x-axis")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")
            .attr("font-weight", "bold")
    // X axis title label
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2) + 570)
        .attr("text-anchor", "middle")  
        .attr("font-weight", "bold")
        .style("font-size", "10px")
        .text("Popularity Rating");

    // Y axis and axis title label
    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .call(g => g.select(".tick:last-of-type text")
                .clone()
                .attr("transform", `rotate(-90)`)
                .attr("text-anchor", "middle")
                .attr("x", -230)
                .attr("y", (width - margin.top - margin.bottom - 450))
                .attr("font-weight", "bold")
                .text("Number of Artists"))

    
    this.updateBars = function(data) {
        // enter
        var selection = svg.selectAll("rect")
            .data(data)
            .join("rect");

        // exit
        selection.exit()
            .transition()
            .delay(100)
            .duration(800)
            .remove();
        
        // update
        selection.transition()
            .duration(800)
            .ease(d3.easeExpOut)
                .attr("x", d => x(d.popularityrange))
                .attr("y", d => y(d.numartists))
                .attr("width", x.bandwidth())
                .attr("height", d => y(0) - y(d.numartists))
                .attr("opacity", 0.7)
                .attr("fill", "#92cad1");

    }

    function zoom(svg) {
        const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];

        svg.call(d3.zoom()
            .scaleExtent([1, 8])
            .translateExtent(extent)
            .extent(extent)
            .on("zoom", zoomed));

        function zoomed(event) {
            x.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
            svg.selectAll(".bars rect").attr("x", d => x(d.popularityrange)).attr("width", x.bandwidth());
            svg.selectAll(".x-axis").call(xAxis);
        }
    }

    svg.call(zoom);

}