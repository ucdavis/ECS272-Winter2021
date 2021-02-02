import * as d3 from "d3";

export function drawss(data, id) {

    const margin = { top: 50, right: 30, bottom: 90, left: 100 };
    const height = 250;
    const width = 450;

    const line = d3.line()
        .defined(d => !isNaN(d.incidents))
        .x(d => x(d.date))
        .y(d => y(d.incidents));

    const x = d3.scaleBand()
        .domain(data.map(d => d.date))
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
        .attr("stroke", "blue")
        .attr("stroke-width", 1.5)
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
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        .style("font-size", "6px")
        .attr("font-weight", "bold");
                
  
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