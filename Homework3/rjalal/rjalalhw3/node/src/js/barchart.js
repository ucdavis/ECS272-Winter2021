import * as d3 from "d3";
import { getData } from '../common/GetCommonData';
import { sliderBottom } from 'd3-simple-slider';


let data, x, svg, bar, gx, xAxis, y, yAxis, gy;
let margin = ({ top: 20, right: 0, bottom: 30, left: 40 });
let height = 600;
let width = 1100;
let processedData;
export async function getBarChart(id) {

    getMonthsDropDown();
    let rawData = await getData("barChart");
    processedData = processData(rawData);

    let unsortedData = getRequiredData(processedData, "March");

    //let incidentsMap = new Map();
    //incidentsMap = (await data).get(2011);

    let data = sortedData(unsortedData);
    //console.log("Top 10 countries: " + JSON.stringify(incidentArray));

    x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice()
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
        .data(data)
        .join("rect")
        .style("mix-blend-mode", "multiply")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x.bandwidth());

    gx = svg.append("g")
        .call(xAxis)
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

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

    x.domain(data.map(d => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.1);

    y.domain([0, d3.max(data, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top]);

    const t = svg.transition()
        .duration(750);

    //console.log("Printing Top 10 countries again: " + JSON.stringify(incidentArray));

    bar.data(data, d => d.name)
        .order()
        .transition(t)
        .delay((d, i) => (i * 20))
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value));

    gx.transition(t)
        .call(xAxis)
        .selectAll(".tick")
        .delay((d, i) => i * 20)

    gy.transition(t)
        .call(yAxis);
        

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

