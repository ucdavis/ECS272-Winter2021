import * as d3 from "d3";

export function drawBarChart(data, id) {

    const margin = { top: 40, right: 40, bottom: 80, left: 90 };
    const height = 600;
    const width = 545;

    const x = d3.scaleBand().domain(data.map(d => d.popularityrange))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.numartists)]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    let svg = d3.select(id).append("svg")
        .attr("id", "barchart")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.popularityrange))
        .attr("y", d => y(d.numartists))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.numartists))
        .attr("fill", "#92cad1");

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
        .text("Artist Popularity");
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2)+11)
        .attr("text-anchor", "middle")  
        .style("font-size", "10px")
        .text("How many artists have low or high popularity ratings?");

    svg.append("g")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")
            .attr("font-weight", "bold")

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2) + 550)
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
                .attr("x", -200)
                .attr("y", (width - margin.top - margin.bottom - 480))
                .attr("font-weight", "bold")
                .text("Number of Artists"))
}


