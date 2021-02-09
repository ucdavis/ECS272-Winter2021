import * as d3 from "d3";
import csvPath from '../assets/data/SpotifyData.csv';

export async function drawScatterPlot(){

    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 1000 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    var margin2 = {top: 400, right: 20, bottom: 20, left: 40},
        height2 = 200 - margin2.top - margin2.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    const data = await d3.csv(csvPath);
    // for (var i = 0; i < data.length; i++) {
    //     console.log("Valence of record " + i + ":" + data[i].valence);
    //     console.log("Energy of record " + i + ":" + data[i].energy);
    // }

    console.log(data);
    //(data, function(data) {

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 1])
        .range([ 0, width ]);
    
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 1])
        .range([ height, 0]);
    
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.valence); } )
        .attr("cy", function (d) { return y(d.energy); } )
        .attr("r", 1.5)
        .style("fill", "#1ed760")

    //})
    return svg.node();
}
