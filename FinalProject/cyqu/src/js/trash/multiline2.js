import * as d3 from "d3";
import flightCountry from "../assets/data/flightCountry2.csv"






export async function flightCountryLine(id){
    //highlight function 
    function highlightPoint(pointer, svg, path) {
        const xm = xcopy.invert(pointer[0]);
        const ym = ycopy.invert(pointer[1]);
        const i = d3.bisectCenter(data.dates, xm);
        const s = d3.least(data.series, d => Math.abs(d.values[i] - ym));
        const dot = svg.select('.dottext');
      
        path
          .attr("stroke", d => (d === s ? null : "#ddd"))
          .filter(d => d === s)
          .raise();
      
        dot.attr(
          "transform",
          `translate(${xcopy(data.dates[i])},${ycopy(s.values[i])})`
        );
        dot.select("text").text(s.name);
    }
    // hover function
    function hover(svg, path) {
        svg
          .on("pointermove", moved)
          .on("pointerenter", entered)
          .on("pointerleave", left);
      
        const dot = svg
          .append("g")
          .attr("display", "none")
          .attr('class', 'dottext');
        dot.append("circle").attr("r", 2.5);
      
        dot
          .append("text")
          .attr("font-family", "sans-serif")
          .attr("font-size", 10)
          .attr("text-anchor", "middle")
          .attr("y", -8);
      
        function moved(event) {
          event.preventDefault();
          const pointer = d3.pointer(event, this);
          highlightPoint(pointer, svg, path);
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
    const margin = ({top: 80, right: 40, bottom: 20, left: 80});
    const width = 600
    const height = 300
    const data0 = await d3.csv(flightCountry);
    const columns = data0.columns.slice(2);
    //process data()
    const data = {
        y: "% Flight Percentage Change",
        series: data0.map(d => ({
          name: d.name,
          values: columns.map(k => +d[k] * 100)
        })),
        dates: columns.map(value => new Date(value))

    }

    //Axis 
    const x = d3.scaleUtc()
    .domain(d3.extent(data.dates))
    .range([margin.left, width - margin.right])

    const y = d3.scaleLinear()
    .domain([0, d3.max(data.series, d => d3.max(d.values))]).nice()
    .range([height - margin.bottom, margin.top])

    const xcopy = x.copy()
    const ycopy = y.copy()

    const xAxis = (g, x) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    )

    const yAxis = (g, y) =>g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g =>
            g
            .select(".tick:last-of-type text")
            .attr("x", -30)
            .attr("y", -20)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y)
        )

    //line 
    const line = (linedata, x, y) =>
            d3
        .line()
        .defined(d => !isNaN(d))
        .x((d, i) => x(data.dates[i]))
        .y(d => y(d))(linedata)


    //main chart 
    const zoom = d3.zoom()
                   .scaleExtent([1, 5])
                   .extent([[margin.left, 0], [width - margin.right, height]])
                   .translateExtent([
                   [margin.left, -Infinity],
                   [width - margin.right, Infinity]
                   ])
                   .on("zoom", zoomed);

    const svg = d3.select(id)
                  .append("svg")
                  .attr("viewBox", [0, 0, width, height])
                  .style("overflow", "visible");

    const gx = svg.append("g").call(xAxis, x);

    const gy = svg.append("g").call(yAxis, y);

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
                    .attr("d", d => line(d.values, x, y));

    function zoomed(event) {
        const xz = event.transform.rescaleX(x);
        const yz = event.transform.rescaleY(y);

        // updata domain on copied x scale so hover function can find the correct point
        xcopy.domain(xz.domain());
        ycopy.domain(yz.domain());

        // redraw paths with new x zoomed scale
        path.attr("d", d => line(d.values, xz, yz));
        // find and redraw closest point path
        const pointer = d3.pointer(event, this);
        if (event.sourceEvent.type === "mousemove") {
        highlightPoint(pointer, svg, path);
        }
        gx.call(xAxis, xz);
        gy.call(yAxis, yz);
    }

    svg.call(hover, path);
    svg.call(zoom);



}