import * as d3 from "d3";
import csvPath from '../assets/data/TopArtistbyCent.csv';


export async function drawStackedBarChartTopArtist(){

    // set the dimensions and margins of the graph
    var margin = {top: 40, right: 20, bottom: 30, left: 30},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#stackedbarcharttopartist")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");


        const data = await d3.csv(csvPath);

    var subgroups = data.columns.slice(1)

    console.log("Sliceeee: " + data.columns.slice(1))


    var groups = d3.map(data, function(d){return(d.year)}).keys()

    console.log("Groupsssss: " + groups)


    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSizeOuter(0));


    var y = d3.scaleLinear()
                .domain([0, 5])
                .range([ height, 0 ]);
                svg.append("g")
                .call(d3.axisLeft(y));

    var color = d3.scaleOrdinal()
                .domain(subgroups)
                .range(['#fcd471','#fbafa1','#fb84ce', '#ef54f1', '#c4fa7'])

    var stackedData = d3.stack()
                        .keys(subgroups)
                        (data)

    // Show the bars
    svg.append("g")
    .selectAll("g")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("fill", function(d) { return color(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
        .attr("x", function(d) { return x(d.data.year); })
        .attr("y", function(d) { return y(d[0] + d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]+d[0]); })
        .attr("width",x.bandwidth()-1)
    
}