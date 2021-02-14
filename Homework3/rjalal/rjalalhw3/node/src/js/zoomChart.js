import * as d3 from "d3";
import { getData } from '../common/GetCommonData';

export async function displayZoomChart(id) {

    let data = await getData("zoomChart");

    let margin = ({ top: 20, right: 20, bottom: 30, left: 30 });
    //let height = 500;
    //let width = 2500;
    let height = 420;
    let width = 954;

    let x = d3.scaleUtc()
        .domain(d3.extent(data, d => d.date))
        .range([margin.left, width - margin.right]);


    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top]);


    let xAxis = (g, x) => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));


    let yAxis = (g, y) => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y));


    let area = (data, x) => d3.area()
        .curve(d3.curveStepAfter)
        .x(d => x(d.date))
        .y0(y(0))
        .y1(d => y(d.value))
        (data);


    const zoom = d3.zoom()
        .scaleExtent([1, 10])
        .extent([[margin.left, 0], [width - margin.right, height]])
        .translateExtent([[margin.left, -Infinity], [width - margin.right, Infinity]])
        .on("zoom", zoomed);


    const minX = x(data[0].date);
    const maxX = x(data[data.length - 1].date);
    const overwidth = maxX - minX + margin.left + margin.right;
    const parent = d3.select("#parent").append("div");

    let svg = parent.append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("position", "absolute")
        .style("pointer-events", "none")
        .style("z-index", 1)
        .call(svg => svg.append("g").call(yAxis, y));


    const body = parent.append("div")
        .style("overflow-x", "scroll")
        .style("-webkit-overflow-scrolling", "touch");

    body.attr("viewBox", [0, 0, width, height])

    let bodySvg = body.append("svg")
        .attr("width", overwidth)
        .attr("height", height)
        .style("display", "block");

    /*body.append("clipPath")
        //.attr("id", clip.id)
        .append("rect")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom);*/

    const path = bodySvg.append("path")
        //.attr("clip-path", clip)
        .attr("fill", "steelblue")
        .attr("d", area(data, x));

    const gx = bodySvg.append("g")
        .call(xAxis, x);

    bodySvg.call(zoom)
        .transition()
        .duration(750)
        .call(zoom.scaleTo, 4, [x(Date.UTC(2020, 12, 1)), x(Date.UTC(2020, 12, 31))]);

    console.log("Before Zoom");
    function zoomed(event) {
        const xz = event.transform.rescaleX(x);
        //console.log("xz = " + xz);
        path.attr("d", area(data, xz));
        gx.call(xAxis, xz);
    }

    /*const svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height]);

    //const clip = DOM.uid("clip");

    svg.append("clipPath")
        //.attr("id", clip.id)
        .append("rect")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("width", width - margin.left - margin.right)
        .attr("height", height - margin.top - margin.bottom);

    const path = svg.append("path")
        //.attr("clip-path", clip)
        .attr("fill", "steelblue")
        .attr("d", area(data, x));

    const gx = svg.append("g")
        .call(xAxis, x);

    svg.append("g")
        .call(yAxis, y);

    svg.call(zoom)
        .transition()
        .duration(750)
        .call(zoom.scaleTo, 4, [x(Date.UTC(2020, 8, 1)), 0]);

    console.log("Before Zoom");
    function zoomed(event) {
        const xz = event.transform.rescaleX(x);
        //console.log("xz = " + xz);
        path.attr("d", area(data, xz));
        gx.call(xAxis, xz);
    }*/


}