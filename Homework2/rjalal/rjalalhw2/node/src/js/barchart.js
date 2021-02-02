import * as d3 from "d3";
import { getData } from '../common/GetCommonData';
import { sliderBottom } from 'd3-simple-slider';


let data, x, svg, bar, gx, xAxis, y, yAxis, gy;
let margin = ({ top: 20, right: 0, bottom: 30, left: 40 });
let height = 500;
let width = 954;
export async function getBarChart(id) {

    getTimeSlider("#timeSilderBar");
    data = getData("barChart");

    let incidentsMap = new Map();
    incidentsMap = (await data).get(2011);

    let incidentArray = sortedData(incidentsMap);
    //console.log("Top 10 countries: " + JSON.stringify(incidentArray));

    x = d3.scaleBand()
        .domain(incidentArray.map(d => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    y = d3.scaleLinear()
        .domain([0, d3.max(incidentArray, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top]);


    xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));


    yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove());


    svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height]);

    bar = svg.append("g")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(incidentArray)
        .join("rect")
        .style("mix-blend-mode", "multiply")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x.bandwidth());

    gx = svg.append("g")
        .call(xAxis);
        /*.call(g =>
            g .select(".tick:last-of-type text")
              .clone()
              .attr("text-anchor", "middle")
              .attr("x", -(width - margin.left - margin.right) / 2)
              .attr("y", margin.bottom - 10)
              .attr("font-weight", "bold")
              .attr("font-size", "small")
              .text("Countries"));*/

    gy = svg.append("g")
        .call(yAxis);

}

function sortedData(incidentsMap) {

    let incidentEntries = Array.from(incidentsMap.entries());
    console.log("Keys: " + incidentEntries);
    console.log("Keys Length: " + incidentEntries.length);

    let incidentArray = [];
    incidentEntries.forEach(inci => {
        const incident = {
            name: inci[0],
            value: inci[1]
        }
        incidentArray.push(incident);
    });

    incidentArray = incidentArray.slice().sort((a, b) => d3.descending(a.value, b.value));
    incidentArray = incidentArray.slice(0, 10);

    return incidentArray;

}

function getTimeSlider(id) {

    var dataTime = d3.range(0, 7).map(function (d) {
        return new Date(2011 + d, 10, 3);
    });

    var sliderTime =
        sliderBottom()
            .min(d3.min(dataTime))
            .max(d3.max(dataTime))
            .step(1000 * 60 * 60 * 24 * 365)
            .width(300)
            .tickFormat(d3.timeFormat('%Y'))
            .tickValues(dataTime)
            .default(new Date(2011, 10, 3))
            .on('onchange', val => {
                // d3.select('p#value-time').text(d3.timeFormat('%Y')(val));
                console.log("New Slider Value: " + val);
                updateBarChart(val);
            });

    var gTime = d3
        .select(id)
        .append('svg')
        .attr('width', 500)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

    gTime.call(sliderTime);

}

async function updateBarChart(silderValue) {

    let date = new Date(silderValue);
    let targetYear = date.getFullYear();
    console.log("Target Year: " + targetYear);

    let incidentsMap = new Map();
    incidentsMap = (await data).get(targetYear);
    let incidentArray = sortedData(incidentsMap);

    console.log("Top 10 countries: " + JSON.stringify(incidentArray));

    x.domain(incidentArray.map(d => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    y.domain([0, d3.max(incidentArray, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top]);

    const t = svg.transition()
        .duration(750);

    //console.log("Printing Top 10 countries again: " + JSON.stringify(incidentArray));

    bar.data(incidentArray)
        .order()
        .transition(t)
        .delay((d, i) => (i * 20))
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value));

    gx.transition(t)
        .call(xAxis)
        .selectAll(".tick")
        .delay((d, i) => i * 20);

    gy.transition(t)
        .call(yAxis);

}

