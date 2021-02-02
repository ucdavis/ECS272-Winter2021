import * as d3 from "d3";

export function drawline(data, id) {

    const margin = { top: 50, right: 30, bottom: 90, left: 100 };
    const height = 250;
    const width = 470;

    const line = d3.line()
        .defined(d => !isNaN(d.incidents))
        .x(d => x(d.dayofweek))
        .y(d => y(d.incidents));

    const x = d3.scaleBand()
        .domain(data.map(d => d.dayofweek))
        .rangeRound([margin.left, width - margin.right]);

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.incidents)]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    let svg = d3.select(id)
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
        //.append("g")
       // .attr("transform",   // make small ? 
        //      "translate(" + margin.left + "," + margin.top + ")");

    // Add the line
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "purple")
        .attr("stroke-width", 2)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);


    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))


    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())  // remove y line

    svg.append("g")
    .call(xAxis)
    .call(g =>
        g .select(".tick:last-of-type text")
        .clone()
        .attr("text-anchor", "middle")
        .attr("x", -(width - margin.left - margin.right) / 2)
        .attr("y", margin.bottom - 60)
        .attr("font-weight", "bold")
        .text("Day of Week")
        );
  
    svg.append("g")
        .call(yAxis)
        .call(g =>
        g .select(".tick:last-of-type text")
          .clone()
          .attr("transform", `rotate(-90)`)
          .attr("text-anchor", "middle")
          .attr("x", -(250 - margin.top - margin.bottom) / 2)
          .attr("y", -50)
          .attr("font-weight", "bold")
          .text("Number of Incidents")
      )
}