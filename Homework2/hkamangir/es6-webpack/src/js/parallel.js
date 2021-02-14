import * as d3 from "d3";
//import csvPath from '../assets/data/Police_Department_Incidents__2016.csv';
//import jsondata from "./assets/data/Police_Department_Incidents__2016.json"; /* Example of reading in data */
import csvPath from '../assets/data/cars.csv';

export function drawBarFromCsv(){
    //async method
    d3.csv(csvPath).then((data) => {
        // array of objects
        console.log(data.length);
        console.log(data);
        // do something with the data (e.g process and render chart)
        // const pData = processData();
        parallelchart(data, id);
        // (data will only exist inside here since it is an async call to read in data) so all rendering and processsing with data has to occur inside the "then"
    });
}


export async function drawBarFromCsvAsync(){
    const data = await d3.csv(csvPath);
    console.log(data); 
    //process data()
    //draw chart ()
    //There will be some delay in console before it prints the array
}

function parallelchart (data, id) {npm
    var margin = {top: 30, right: 40, bottom: 20, left: 200},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var dimensions = [
    {
        name: "name",
        scale: d3.scale.ordinal().rangePoints([0, height]),
        type: "string"
    },
    {
        name: "mpg",
        scale: d3.scale.linear().range([0, height]),
        type: "number"
    },
    {
        name: "cyl",
        scale: d3.scale.linear().range([height, 0]),
        type: "number"
    },
    {
        name: "disp",
        scale: d3.scale.linear().range([height, 0]),
        type: "number"
    },
    {
        name: "hp",
        scale: d3.scale.linear().range([height, 0]),
        type: "number"
    },
    {
        name: "dart",
        scale: d3.scale.linear().range([height, 0]),
        type: "number"
    },
    {
        name: "wt",
        scale: d3.scale.linear().range([height, 0]),
        type: "number"
    },
    {
        name: "qsec",
        scale: d3.scale.linear().range([height, 0]),
        type: "number"
    },
    {
        name: "vs",
        scale: d3.scale.linear().range([height, 0]),
        type: "number"
    },
    {
        name: "am",
        scale: d3.scale.linear().range([height, 0]),
        type: "number"
    },
    {
        name: "gear",
        scale: d3.scale.linear().range([height, 0]),
        type: "number"
    },
    {
        name: "carb",
        scale: d3.scale.linear().range([height, 0]),
        type: "number"
    },
    ];


    var x = d3.scale.ordinal()
        .domain(dimensions.map(function(d) { return d.name; }))
        .rangePoints([0, width]);

    var line = d3.svg.line()
        .defined(function(d) { return !isNaN(d[1]); });

    var yAxis = d3.svg.axis()
        .orient("left");

    var svg = d3.select(id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dimension = svg.selectAll(".dimension")
        .data(dimensions)
    .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + x(d.name) + ")"; });

    dimensions.forEach(function(dimension) {
        dimension.scale.domain(dimension.type === "number"
            ? d3.extent(data, function(d) { return +d[dimension.name]; })
            : data.map(function(d) { return d[dimension.name]; }).sort());

    svg.append("g")
        .attr("class", "background")
        .selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", draw);

    svg.append("g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("d", draw);

    dimension.append("g")
        .attr("class", "axis")
        .each(function(d) { d3.select(this).call(yAxis.scale(d.scale)); })
        .append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("y", -9)
        .text(function(d) { return d.name; });

    var ordinal_labels = svg.selectAll(".axis text")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

    var projection = svg.selectAll(".background path,.foreground path")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

    function mouseover(d) {
        svg.classed("active", true);

        // this could be more elegant
        if (typeof d === "string") {
        projection.classed("inactive", function(p) { return p.name !== d; });
        projection.filter(function(p) { return p.name === d; }).each(moveToFront);
        ordinal_labels.classed("inactive", function(p) { return p !== d; });
        ordinal_labels.filter(function(p) { return p === d; }).each(moveToFront);
        } else {
        projection.classed("inactive", function(p) { return p !== d; });
        projection.filter(function(p) { return p === d; }).each(moveToFront);
        ordinal_labels.classed("inactive", function(p) { return p !== d.name; });
        ordinal_labels.filter(function(p) { return p === d.name; }).each(moveToFront);
        }
    }

    function mouseout(d) {
        svg.classed("active", false);
        projection.classed("inactive", false);
        ordinal_labels.classed("inactive", false);
    }

    function moveToFront() {
        this.parentNode.appendChild(this);
    }
    });

    function draw(d) {
    return line(dimensions.map(function(dimension) {
        return [x(dimension.name), dimension.scale(d[dimension.name])];
    }));
}}










