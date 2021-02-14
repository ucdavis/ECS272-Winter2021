import * as d3 from "d3";
import { getData } from '../common/GetCommonData';

let x;
let dot, svg, gx;
let margin = ({ top: 20, right: 20, bottom: 30, left: 30 });
let padding = 1.5;
let radius = 3;
let height = 240;
let width = 1100;
let monthMap = new Map();
let selectedMonth = "March";
let selectedState = "Alabama";
let xAxis, brush;
let text, bodySvg;
let overflowHeight = 500;
export async function displayBeeswarm(id) {

    let rawData = await getData("beeswarm");
    populateDropDowns(rawData);
    let data = processData(rawData, selectedMonth, selectedState);



    brush = d3.brush()
        .on("start brush end", updateBeeswarm);

    x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.value))
        .range([margin.left, width - margin.right]);

    /*let y = d3.scaleLinear()
        .domain([0, 50]).nice()
        .range([height - margin.bottom, margin.top]);

    let yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .call(d3.axisLeft(y).tickSizeOuter(0));*/

    xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0).tickSize(7));


    //const minX = x(d3.min(data, d => d.value));
    //const maxX = x(d3.max(data, d => d.value));
    //const overwidth = maxX - minX + margin.left + margin.right;

    let circles = dodge(data, radius * 2 + padding);
    let cy = [];
    //d3.max(circles,d=>cy.push(height - margin.bottom - radius - padding - d.y));
    //console.log("Min: "+d3.min(cy));
    //let minCy = (-1 * d3.min(cy)) + 200;

    const parent = d3.select("#parentBees").append("div");

    const body = parent.append("div");

    body.style("overflow-y", "scroll")
    .style("-webkit-overflow-scrolling", "touch");

    body.attr("viewBox", [0, 0, width, height]);

    bodySvg = body.append("svg").attr("viewBox", [0, 0, width, height])
        .attr("transform", `translate(0,0)`)
        .style("display", "block");


    gx = bodySvg.append("g")
        .call(xAxis);

    dot = bodySvg.append("g").attr("transform", `translate(0,0)`)

    dot.selectAll("circle")
        .data(dodge(data, radius * 2 + padding))
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => {//console.log("d = "+JSON.stringify(d)) ; 
            return (height - margin.bottom - radius - padding - d.y)
        })
        .attr("r", radius)
        .append("title")
        .text(d => d.data.name);

    bodySvg.append("g").call(brush);

}


function dodge(data, radius) {
    const radius2 = radius ** 2;
    const circles = data.map(d => ({ x: x(d.value), data: d })).sort((a, b) => a.x - b.x);
    const epsilon = 1e-3;
    let head = null, tail = null;

    // Returns true if circle ⟨x,y⟩ intersects with any circle in the queue.
    function intersects(x, y) {
        let a = head;
        while (a) {
            if (radius2 - epsilon > (a.x - x) ** 2 + (a.y - y) ** 2) {
                return true;
            }
            a = a.next;
        }
        return false;
    }

    // Place each circle sequentially.
    for (const b of circles) {

        // Remove circles from the queue that can’t intersect the new circle b.
        while (head && head.x < b.x - radius2) head = head.next;

        // Choose the minimum non-intersecting tangent.
        if (intersects(b.x, b.y = 0)) {
            let a = head;
            b.y = Infinity;
            do {
                let y = a.y + Math.sqrt(radius2 - (a.x - b.x) ** 2);
                if (y < b.y && !intersects(b.x, y)) b.y = y;
                a = a.next;
            } while (a);
        }

        // Add b to the queue.
        b.next = null;
        if (head === null) head = tail = b;
        else tail = tail.next = b;
    }
    //console.log("Circles: " + JSON.stringify(circles));

    return circles;
}

function processData(data, month, state) {

    let countyMap = data.get(state);
    let counties = Array.from(countyMap.keys());
    let covidArrayPerMonth = [];
    counties.forEach(countyName => {
        //console.log("Processing county: "+countyName);
        if (countyName != "Unassigned" && !countyName.startsWith("Out of")) {
            let countyCovidArr = countyMap.get(countyName);
            countyCovidArr.forEach(item => {
                if (item.key == monthMap.get(month)) {
                    let covidObj = {
                        name: countyName,
                        value: item.covidCases
                    }
                    covidArrayPerMonth.push(covidObj);
                    //break;
                }
            })
        }
    })

    //console.log("CountyDataPerMonth: " + JSON.stringify(covidArrayPerMonth));
    return covidArrayPerMonth;

}

function updateBeeswarm({ selection }) {
    let value = [];

    if (selection) {
        var x0 = selection[0][0],
            x1 = selection[1][0],
            y0 = selection[0][1],
            y1 = selection[1][1];

        value = bodySvg.selectAll('circle')
            .style("stroke", "gray")
            .filter(d => { return x0 <= d.x && d.x < x1 && y0 <= (height - margin.bottom - radius - padding - d.y) && (height - margin.bottom - radius - padding - d.y) < y1 })
            .style("stroke", "steelblue")
            .data();
    } else {
        bodySvg.selectAll('circle').style("stroke", "steelblue");
    }
    //svg.property("value", value).dispatch("input");
    /*console.log("x0 = " + x0);
    console.log("x1 = " + x1);
    //console.log("cx = " + cx);
    console.log("y0 = " + y0);
    console.log("y1 = " + y1);*/
    //console.log("cy = " + cy);

    if (value.length > 0) {
        let selCounties = Array.from(value);
        //console.log("Value = " + JSON.stringify(selCounties));

        text = "";
        selCounties.forEach(county => {
            text = text + county.data.name + " : " + county.data.value + " , ";
            //console.log("selectedCounties: "+county.data.name + " : " + county.data.value);

        })
        d3.select("#selectedCounties").text(text);
    }

}

function filterData(d, x0, x1, y0, y1) {

    let cx = x(d.x);
    let cy = height - margin.bottom - radius - padding - d.y;
    console.log("x0 = " + x0);
    console.log("x1 = " + x1);
    console.log("cx = " + cx);
    console.log("y0 = " + y0);
    console.log("y1 = " + y1);
    console.log("cy = " + cy);


    let result = x0 <= cx && cx < x1 && y0 <= cy && cy < y1;
    console.log("result: " + result);
    return result;

}

function populateDropDowns(data) {


    let states = Array.from(data.keys());
    d3.select("#selectStates")
        .selectAll('myOptions')
        .data(states)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; })

    //console.log("Initial State Selected: " + d3.select(this).property("value"));
    d3.select("#selectStates").on("change", function (d) {
        console.log("State Selected: " + d3.select(this).property("value"));
        selectedState = d3.select(this).property("value");
        d3.select("#selectedCounties").text("");
        console.log(JSON.stringify(processData(data, selectedMonth, selectedState)));

        if(selectedState == "Texas"){
            height = 1500;
        }else if(selectedState == "Georgia"){
            height = 700;
        }else if(selectedState == "Virginia"){
            height = 600;
        }else if(selectedState == "Kentucky"){
            height = 600;
        }else if(selectedState == "Missouri"){
            height = 700;
        }else if(selectedState == "Kansas" || selectedState == "Michigan"){
            height = 550;
        }else if(selectedState == "Illinois"){
            height = 850;
        }else if(selectedState == "North Carolina" || selectedState == "Oklahoma" || selectedState == "Pennsylvania"|| selectedState == "Florida" || selectedState == "South Dakota" 
        || selectedState == "Louisiana" || selectedState == "Colorado" ||selectedState == "California" || selectedState == "Montana" || selectedState == "North Dakota"){
            height = 300;
        }else if(selectedState == "Iowa" || selectedState == "Ohio" || selectedState == "Wisconsin" ){
            height = 400;
        }else if(selectedState == "Tennessee"|| selectedState == "Indiana"|| selectedState == "Minnesota"){
            height = 450;
        }else if(selectedState == "Nebraska" ){
            height = 600;
        }else if(selectedState == "New York"){
            height = 350;
        }
        else{
            height = 240;
        }

        updateBeeswarmDropDown(processData(data, selectedMonth, selectedState))
    })

    let start = new Date(2020, 2, 1);
    let end = new Date(2020, 12, 1);

    // Calling the timeMonths() function 
    // without step value 
    let dates = d3.timeMonths(start, end);
    console.log("Months: " + months);

    let months = [];
    let format = d3.timeFormat('%B');
    dates.forEach(date => {
        months.push(format(date));
    })
    d3.select("#selectMonth")
        .selectAll('myOptions')
        .data(months)
        .enter()
        .append('option')
        .text(function (d) { return d; }) // text showed in the menu
        .attr("value", function (d) { return d; });

    d3.select("#selectMonth").on("change", function (d) {
        console.log("Month Selected: " + d3.select(this).property("value"));
        selectedMonth = d3.select(this).property("value");
        d3.select("#selectedCounties").text("");
        updateBeeswarmDropDown(processData(data, selectedMonth, selectedState));
    })

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

}

function updateBeeswarmDropDown(data) {

    text = "";
    console.log("Max Value: " + d3.max(data, d => d.value));
    x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.value))
        .range([margin.left, width - margin.right]);

    xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0).tickSize(7));

    bodySvg.attr("viewBox", [0, 0, width, height]);
    bodySvg.append("g").call(brush);

    const t = bodySvg.transition()
        .duration(750);

    const simulation = d3.forceSimulation(data)
        .force('x', d3.forceX((d) => x(d.value)).strength(2))
        .force('y', d3.forceY((height / 2) - margin.bottom / 2))
        .force('collide', d3.forceCollide(9))
        .stop();

    for (let i = 0; i < data.length; i++) {
        //console.log("Simulation start");
        simulation.tick();
    }

    //svg.selectAll('circle').exit().remove();

    dot.selectAll('circle').remove();


    dot.selectAll("circle")
        .data(dodge(data, radius * 2 + padding))
        .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => {//console.log("d = "+JSON.stringify(d)) ; 
            return (height - margin.bottom - radius - padding - d.y)
        })
        .attr("r", radius)
        .append("title")
        .text(d => d.data.name);


    gx.transition(t)
        .call(xAxis)
        .selectAll(".tick")
        .delay((d, i) => i * 20);

}
