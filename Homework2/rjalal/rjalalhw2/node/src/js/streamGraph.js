import * as d3 from "d3";
import csvPath from '../assets/data/globalterrorismdb_0718dist.csv';
import { getData } from '../common/GetCommonData';
import { swatches } from "../common/legend";
//import d3_colorLegend from "https://api.observablehq.com/@d3/color-legend.js?v=3"

let margin = ({ top: 20, right: 30, bottom: 30, left: 40 });
let height = 500;
let width = 954;
let data = null;
let svg = null;
let x, y, xAxis, yAxis, gx, gy;
let columns = ["Assassination", "ArmedAssault", "BombingOrExplosion", "Hijacking", "HostageOrBarricade", "HostageKidnapping", "FacilityOrInfraAttack", "UnarmedAssault", "Unknown"];
export async function getStreamGraph(id) {

    console.log("**************** Loading Streamgraph ***********************");
    data = await getData("streamGraph");
    //const data = await d3.csv(csvPath);


    let countries = [];
    countries = data.keys();

    d3.select("#selectButton")
        .selectAll('myOptions')
        .data(countries)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; })

    let data1 = data.get("Egypt");

    console.log("Incidents for Egypt: " + JSON.stringify(data1));
    //console.log("Data size: " + data1.length);

    let series = d3.stack().keys(columns)(data1);
    //console.log("Series: " + series);


    y = d3.scaleLinear()
        .domain([0, d3.max(series, d => d3.max(d, d => d[1]))]).nice()
        .range([height - margin.bottom, margin.top]);

    x = d3.scaleLinear()
        .domain(d3.extent(data1, d => d["year"]))
        .range([margin.left, width - margin.right]);

    /*x = d3.scaleBand()
        .domain(data1.map(d => d["year"]))
        .range([margin.left, width - margin.right]);*/

    yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g => g.select(".tick:last-of-type text")
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data1.y))

    var formatxAxis = d3.format('.0f');

    xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(formatxAxis).ticks(data1.length))
        .call(g => g.select(".domain").remove());
    /*const xAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisBottom(x));*/

    //console.log("XAXIS value: "+d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

    let color = d3.scaleOrdinal()
        .domain(series)
        .range(d3.schemeCategory10);


    let area = d3.area()
        .x(d => x(d["data"].year))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]));


    //console.log("Area: " + area);

    svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height]);

    svg.append("g")
        .selectAll("path")
        .data(series)
        .join("path")
        .attr("fill", ({ key }) => color(key))
        .attr("d", area)
        .append("title")
        .text(({ key }) => key);

    gx = svg.append("g")
        .call(xAxis);

    gy = svg.append("g")
        .call(yAxis);


    let legendSVG3 = d3.select("#streamLegend");

    /*legendSVG3.append("circle")
        .attr("cx", 200)
        .attr("cy", 130).
        attr("r", 6)
        .style("fill", "#69b3a2");

    legendSVG3.append("text").attr("x", 220).attr("y", 130).text("variable A").style("font-size", "15px").attr("alignment-baseline", "middle");*/


    d3.select("#selectButton").on("change", function (d) {
        // recover the option that has been chosen
        var selectedCntry = d3.select(this).property("value")
        // run the updateChart function with this selected option
        console.log("Country Selected: " + selectedCntry);
        updateStreamGraph(selectedCntry)
    })

    addLegend(color);

}


function updateStreamGraph(selectedCntry) {

    let countryData = data.get(selectedCntry);
    //countryData = data.get(selectedCntry);

    console.log("Incidents for " + selectedCntry + " : " + JSON.stringify(countryData));

    let series = d3.stack().keys(columns)(countryData);

    console.log("Series: " + JSON.stringify(series));


    y.domain([0, d3.max(series, d => d3.max(d, d => d[1]))]).nice();

    x.domain([2011, d3.max(countryData, d => d["year"])]);

    console.log("Data size: " + countryData.length);

    var formatxAxis = d3.format('.0f');
    /*xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(formatxAxis).ticks(countryData.length))
        .call(g => g.select(".domain").remove())*/

    let color = d3.scaleOrdinal()
        .domain(series)
        .range(d3.schemeCategory10);


    let area = d3.area()
        .x(d => x(d["data"].year))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]));


    svg.select("g")
        .selectAll("path")
        .data(series)
        .join("path")
        .transition()
        .attr("fill", ({ key }) => color(key))
        .attr("d", area);

    svg.select("g")
        .selectAll("path")
        .data(series)
        .append("title")
        .text(({ key }) => key);

    gx.transition()
        .call(xAxis);

    gy.transition()
        .call(yAxis);

    addLegend(color);

}

function addLegend(color) {
    let legendSVG3 = d3.select("#streamLegend");

    /*legendSVG3.append("rect").attr("x", 40).attr("y", 30).attr("width", 20).attr("height", 20).style("fill", "#17becf")
    legendSVG3.append("rect").attr("x", 240).attr("y", 30).attr("width", 20).attr("height", 20).style("fill", "#1f77b4")
    legendSVG3.append("rect").attr("x", 440).attr("y", 30).attr("width", 20).attr("height", 20).style("fill", "#ff7f0e")
    legendSVG3.append("rect").attr("x", 640).attr("y", 30).attr("width", 20).attr("height", 20).style("fill", "#2ca02c")

    legendSVG3.append("rect").attr("x", 40).attr("y", 70).attr("width", 20).attr("height", 20).style("fill", "#d62728")
    legendSVG3.append("rect").attr("x", 240).attr("y", 70).attr("width", 20).attr("height", 20).style("fill", "#9467bd")
    legendSVG3.append("rect").attr("x", 440).attr("y", 70).attr("width", 20).attr("height", 20).style("fill", "#8c564b")
    legendSVG3.append("rect").attr("x", 640).attr("y", 70).attr("width", 20).attr("height", 20).style("fill", "#e377c2")

    legendSVG3.append("rect").attr("x", 40).attr("y", 110).attr("width", 20).attr("height", 20).style("fill", "#7f7f7f")

    legendSVG3.append("text").attr("x", 70).attr("y", 40).text("Assasination").style("font-size", "12px").attr("alignment-baseline", "middle")
    legendSVG3.append("text").attr("x", 270).attr("y", 40).text("Armed Assault").style("font-size", "12px").attr("alignment-baseline", "middle")
    legendSVG3.append("text").attr("x", 470).attr("y", 40).text("Bombing or Explosion").style("font-size", "12px").attr("alignment-baseline", "middle")
    legendSVG3.append("text").attr("x", 670).attr("y", 40).text("Hijacking").style("font-size", "12px").attr("alignment-baseline", "middle")

    legendSVG3.append("text").attr("x", 70).attr("y", 80).text("Hostage Taking (Barricade Incident)").style("font-size", "11px").attr("alignment-baseline", "middle")
    legendSVG3.append("text").attr("x", 270).attr("y", 80).text("Hostage Taking (Kidnapping)").style("font-size", "12px").attr("alignment-baseline", "middle")
    legendSVG3.append("text").attr("x", 470).attr("y", 80).text("Facility/Infrastructure Attack").style("font-size", "12px").attr("alignment-baseline", "middle")
    legendSVG3.append("text").attr("x", 670).attr("y", 80).text("Unarmed Assault").style("font-size", "12px").attr("alignment-baseline", "middle")

    legendSVG3.append("text").attr("x", 70).attr("y", 120).text("Unknown").style("font-size", "12px").attr("alignment-baseline", "middle")*/


    let size = 20;
    legendSVG3.selectAll("mydots")
        .data(columns)
        .enter()
        .append("rect")
        .attr("x", 100)
        .attr("y", function (d, i) { return 100 + i * (size + 5) }) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function (d) { return color(d) })

    // Add one dot in the legend for each name.
    legendSVG3.selectAll("mylabels")
        .data(columns)
        .enter()
        .append("text")
        .attr("x", 100 + size * 1.2)
        .attr("y", function (d, i) { return 100 + i * (size + 5) + (size / 2) }) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function (d) { return color(d) })
        .text(function (d) { return d })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

}

function removeUnwantedColn() {

}
