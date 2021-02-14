import * as d3 from "d3";
import { getData } from '../common/GetCommonData';

let data, x, svg, bar, gx, xAxis, y, yAxis, gy;
let margin = ({ top: 30, right: 0, bottom: 10, left: 90 })
let barHeight = 25;
let height;
let width = 1100;
let processedData, barValues, format;
export async function getBarChartVertical(id) {

    getMonthsDropDown();
    let rawData = await getData("barChart");
    processedData = processData(rawData);

    let unsortedData = getRequiredData(processedData, "March");

    //let incidentsMap = new Map();
    //incidentsMap = (await data).get(2011);

    let data = sortedData(unsortedData);
    //console.log("Top 10 countries: " + JSON.stringify(incidentArray));


    height = Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom;

    y = d3.scaleBand()
        .domain(d3.range(data.length))
        .rangeRound([margin.top, height - margin.bottom])
        .padding(0.1);

    x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([margin.left, width - margin.right]);

    format = x.tickFormat(20, data.format);


    yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0));


    xAxis = g => g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 80, data.format))
        .call(g => g.select(".domain").remove());


    svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height]);

    bar = svg.append("g")
        .attr("fill", "steelblue")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", x(0))
        .attr("y", (d, i) => y(i))
        .attr("width", d => x(d.value) - x(0))
        .attr("height", y.bandwidth());

    barValues = svg.append("g")
        .attr("fill", "white")
        .attr("text-anchor", "end")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("x", d => x(d.value))
        .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", -4)
        .text(d => format(d.value))
        .call(text => text.filter(d => x(d.value) - x(0) < 40) // short bars
            .attr("dx", +4)
            .attr("fill", "black")
            .attr("text-anchor", "start"));

    gx = svg.append("g")
        .call(xAxis);

    gy = svg.append("g")
        .call(yAxis);

}

function sortedData(unsortedData) {

    return unsortedData.slice().sort((a, b) => d3.descending(a.value, b.value));;

}

function getMonthsDropDown() {

    let start = new Date(2020, 2, 1);
    let end = new Date(2020, 12, 1);
    let dates = d3.timeMonths(start, end);
    console.log("Months: " + months);

    let months = [];
    let format = d3.timeFormat('%B');
    dates.forEach(date => {
        months.push(format(date));
    })
    d3.select("#selectMonthBar")
        .selectAll('myOptions')
        .data(months)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; });

    d3.select("#selectMonthBar").on("change", function (d) {
        console.log("Month Selected: " + d3.select(this).property("value"));
        //selectedMonth = d3.select(this).property("value");
        //updateBeeswarmDropDown(processData(data, selectedMonth, selectedState));
        updateBarChart(d3.select(this).property("value"));
    })
}

async function updateBarChart(month) {

    let unsortedData = getRequiredData(processedData, month);

    //let incidentsMap = new Map();
    //incidentsMap = (await data).get(2011);

    let data = sortedData(unsortedData);

    //console.log("Top 10 countries: " + JSON.stringify(incidentArray));

    y.domain(d3.range(data.length))
        .rangeRound([margin.top, height - margin.bottom])
        .padding(0.1);

    x.domain([0, d3.max(data, d => d.value)])
        .range([margin.left, width - margin.right]);

    yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0));


    xAxis = g => g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 80, data.format))
        .call(g => g.select(".domain").remove());

    const t = svg.transition()
        .duration(750);

    //console.log("Printing Top 10 countries again: " + JSON.stringify(incidentArray));

    bar.data(data, d => d.name)
        .order()
        .transition(t)
        .delay((d, i) => (i * 20))
        .attr("x", x(0))
        .attr("y", (d, i) => y(i))
        .attr("width", d => x(d.value) - x(0))
        .attr("height", y.bandwidth());

    barValues.data(data, d => d.name)
        .order()
        .transition(t)
        .delay((d, i) => (i * 20))
        .attr("x", d => x(d.value))
        .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("dx", -4)
        .text(d => format(d.value))
        .call(text => text.filter(d => x(d.value) - x(0) < 20) // short bars
            .attr("dx", +4)
            .attr("fill", "black")
            .attr("text-anchor", "start"));

    gx.transition(t)
        .call(xAxis)


    gy.transition(t)
        .call(yAxis)
        .selectAll(".tick")
        .delay((d, i) => i * 20);


}

function processData(data) {

    let stateKeys = Array.from(data.keys());
    let monthMap = new Map();
    monthMap.set("March", "3/31/20");
    monthMap.set("April", "4/30/20");
    monthMap.set("May", "5/31/20");
    monthMap.set("June", "6/30/20");
    monthMap.set("July", "7/31/20");
    monthMap.set("August", "8/31/20");
    monthMap.set("September", "9/30/20");
    monthMap.set("October", "10/31/20");
    monthMap.set("November", "11/30/20");
    monthMap.set("December", "12/31/20");

    let finalStateCovidMap = new Map();
    let monthKeys = Array.from(monthMap.keys());
    monthKeys.forEach(month => {
        let stateCovidArr = [];
        stateKeys.forEach(stateName => {
            let countyMap = data.get(stateName);
            let countyKeys = Array.from(countyMap.keys());

            let stateCovidCount = 0;
            countyKeys.forEach(countyName => {
                let covidArray = countyMap.get(countyName);
                covidArray.forEach(covidObj => {

                    if (covidObj.key == monthMap.get(month)) {
                        stateCovidCount = stateCovidCount + covidObj.covidCases;
                    }

                })
            })
            let monthlyStateObj = {
                name: stateName,
                value: stateCovidCount
            }
            stateCovidArr.push(monthlyStateObj);
        })
        finalStateCovidMap.set(month, stateCovidArr);
    });
    console.log("finalStateCovidMap: " + JSON.stringify(finalStateCovidMap));
    return finalStateCovidMap;

}

function getRequiredData(data, month) {

    return data.get(month);

}

