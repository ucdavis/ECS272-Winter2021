import * as d3 from "d3";

export function drawScatterplot(data, id) {

    const margin = { top: 30, right: 80, bottom: 80, left: 65 };
    const height = 310;
    const width = 580;

    const x = d3.scaleLinear().domain([d3.min(data, d => d.popularity), d3.max(data, d => d.popularity)]).nice()
        .rangeRound([margin.left, width - margin.right])

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.danceability)]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    let svg = d3.select(id).append("svg")
        .attr("id", "scatterplot")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", d => x(d.popularity))
        .attr("cy", d => y(d.danceability))
        .attr("r", 0.6)
        .attr("fill", "#166d66")

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2)-2)
        .attr("text-anchor", "middle")  
        .style("font-size", "15px")
        .text("Tempo and Artist Popularity");
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2)+11)
        .attr("text-anchor", "middle")  
        .style("font-size", "10px")
        .text("Does the measurement of track being danceable influence artist popularity?");

    svg.append("g")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "0.5em")
            .attr("dy", "0.5em")
            .attr("font-weight", "bold")

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2) + 250)
        .attr("text-anchor", "middle")  
        .attr("font-weight", "bold")
        .style("font-size", "10px")
        .text("Popularity Rating");

    svg.append("g")
        .call(yAxis)
        .call(g => g.select(".tick:last-of-type text")
                .clone()
                .attr("transform", `rotate(-90)`)
                .attr("text-anchor", "middle")
                .attr("x", -100)
                .attr("y", (width - margin.top - margin.bottom - 510))
                .attr("font-weight", "bold")
                .text("Danceability"))
}


