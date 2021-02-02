import * as d3 from "d3";

export function drawBarChart(data, id) {

    const margin = { top: 50, right: 40, bottom: 90, left: 100 };
    const height = 500;
    const width = 500;

    const x = d3.scaleBand().domain(data.map(d => d.y))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.3);

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.x)]).nice()
    //const y = d3.scaleLinear().domain([0, 40409]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    let svg = d3.select(id).append("svg") // 선택은 말그대로 선택 
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.y))
        .attr("y", d => y(d.x))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.x))
        .attr("fill", function(d){
            return "rgb(204,0, " + Math.round(d.x/90) + ")";
        });

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))

    svg.append("g") 
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        .style("font-size", "8px")
        .attr("font-weight", "bold");

    svg.append("g")
        .call(yAxis)
        .call(g => g.select(".tick:last-of-type text")
                .clone()
                .attr("transform", `rotate(-90)`)
                .attr("text-anchor", "middle")
                .attr("x", -(500 - margin.top - margin.bottom) / 2)
                .attr("y", -60)
                .attr("font-weight", "bold")
                .text("Number of Incidents")
            )
}