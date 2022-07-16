import * as d3 from "d3";
import flightCountry from "../assets/data/flightCountry2.csv"

export async function flightCountryLine(id, width = 400, height = 300){
    const margin = ({top: 130, right: 40, bottom: 40, left: 200});
    const data0 = await d3.csv(flightCountry);
    const columns = data0.columns.slice(2);
    //process data()
    const data = {
        y: "% Flight Change",
        series: data0.map(d => ({
          name: d.name,
          values: columns.map(k => +d[k] * 100)
        })),
        dates: columns.map(value => new Date(value))

    }
    console.log(data)
    // hover function
    function hover(svg, path) {
  
        if ("ontouchstart" in document) svg
            .style("-webkit-tap-highlight-color", "transparent")
            .on("touchmove", moved)
            .on("touchstart", entered)
            .on("touchend", left)
        else svg
            .on("mousemove", moved)
            .on("mouseenter", entered)
            .on("mouseleave", left);
      
        const dot = svg.append("g")
            .attr("display", "none");
      
        dot.append("circle")
            .attr("r", 2.5);
      
        dot.append("text")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .attr("y", -8);
      
        function moved(event) {
          event.preventDefault();
          const pointer = d3.pointer(event, this);
          const xm = x.invert(pointer[0]);
          const ym = y.invert(pointer[1]);
          const i = d3.bisectCenter(data.dates, xm);
          const s = d3.least(data.series, d => Math.abs(d.values[i] - ym));
          path.attr("stroke", d => d === s ? null : "#ddd").filter(d => d === s).raise();
          dot.attr("transform", `translate(${x(data.dates[i])},${y(s.values[i])})`);
          dot.select("text").text(s.name);
        }
      
        function entered() {
          path.style("mix-blend-mode", null).attr("stroke", "#ddd");
          dot.attr("display", null);
        }
      
        function left() {
          path.style("mix-blend-mode", "multiply").attr("stroke", null);
          dot.attr("display", "none");
        }
    }

    //Axis 
    const x = d3.scaleUtc()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])

    const y = d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])

    const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))

    const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

    // line 
    const line = d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(data.dates[i]))
    .y(d => y(d))


    // main chart
    const svg = d3.select(id).append("svg")
    .attr("viewBox", [0, 0, width, height])
    .style("overflow", "visible");

    svg.append("g")
        .call(xAxis);

    svg.append("g")
        .call(yAxis);

    const path = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .selectAll("path")
        .data(data.series)
        .join("path")
        .style("mix-blend-mode", "multiply")
        .attr("d", d => line(d.values));

    svg.call(hover, path);


   
}