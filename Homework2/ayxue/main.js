// (function () {
//     // first, load the dataset from a CSV file
//     d3.csv('datasets/SF_Historical_Ballot_Measures.csv')
//       .then(csv => {
//         // log csv in browser console
//         console.log(csv);

//         // create data by selecting two columns from csv
//         var data = csv.map(row => {
//           return {
//             yes: Number(row['Yes Votes']),
//             no: Number(row['No Votes'])
//           }
//         })

//         /*********************************
//         * Visualization codes start here
//         * ********************************/
//         var width = 600;
//         var height = 400;
//         var margin = {left: 60, right: 20, top: 20, bottom: 60}

//         var svg = d3.select('#container')
//           .append('svg')
//             .attr('width', width + margin.left + margin.right)
//             .attr('height', height + margin.top + margin.bottom)

//         var view = svg.append("g")
//           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//         //scale functions
//         var x = d3.scaleLinear()
//           .domain([0, d3.max(data, d => d.yes)])
//           .range([0, width]);

//         var y = d3.scaleLinear()
//           .domain([0, d3.max(data, d => d.no)])
//           .range([height, 0]);


//         // create a scatter plot
//         var scatterPlot = view.selectAll('circle')
//           .data(data)
//           .enter()
//             .append('circle')
//             .attr('cx', d => x(d.yes))
//             .attr('cy', d => y(d.no))
//             .attr('data-x', d => d.yes)
//             .attr('data-y', d => d.no)
//             .attr("r", 8)
//             .attr('opacity', 0.5)
//             .attr("fill", "green")

//         var tooltip = document.getElementById('tooltip')
//         scatterPlot
//           .on('mouseenter', function(d) {
//             d3.select(this).style('fill', 'red')
//             tooltip.innerHTML = 'Yes Votes = ' + d.yes + ', No Votes = ' + d.no
//           })
//           .on('mouseleave', function(d) {
//             d3.select(this).style('fill', 'green')
//           })

//         // x axis
//         view.append("g")
//           .attr("transform", "translate(0," + height + ")")
//           .call(d3.axisBottom(x).ticks(6))
//             .append("text")
//             .attr("fill", "#000")
//             .attr("x", width / 2)
//             .attr('y', margin.bottom / 2)
//             .attr("dy", "0.71em")
//             .attr("text-anchor", "end")
//             .text("Yes Votes");

//         // y axis
//         view.append("g")
//           .call(d3.axisLeft(y).ticks(6))
//           .append("text")
//             .attr("fill", "#000")
//             .attr("transform", "rotate(-90)")
//             .attr("x", - height / 2)
//             .attr("y", - margin.left)
//             .attr("dy", "0.71em")
//             .attr("text-anchor", "end")
//             .text("No Votes");

//       })
//   })()

const width = 960;
const height = 600;

let div = d3.select('#container');
var mapLayer = div.append('svg').attr('id', 'map').attr('width', width).attr('height', height);
var canvasLayer = div.append('canvas').attr('id', 'heatmap').attr('width', width).attr('height', height);

var canvas = canvasLayer.node(),
    context = canvas.getContext("2d");

// context.globalAlpha = 0.5;

var projection = d3.geoMercator().translate([width/2, height/2]),
    path = d3.geoPath(projection),
    airportMap;

d3_queue.queue()
    .defer(d3.json, 'world-50m.json')
    .defer(d3.json, 'airports.json')
//    .defer(d3.csv, 'dests.csv')
    .defer(d3.csv, 'flexwatch.csv')
    .await(main);


function main(error, world, airports, dests) {
    airports.forEach(d => { d.coords = projection([d.longitude, d.latitude]); })
    airportMap = d3.map(airports, d => d.id);

    var countries = topojson.feature(world, world.objects.countries).features;

    mapLayer
        .append('g')
        .classed('countries', true)
        .selectAll(".country")
          .data(countries)
        .enter()
          .append("path")
          .attr("class", "country")
          .attr("d", path);

    mapLayer
      .append('g')
      .classed('airports', true)
      .selectAll('.airport')
        .data(airports)
      .enter().append('circle')
        .attr('r', 1)
            .attr('cx', function(d) { return d.coords && d.coords[0]; })
            .attr('cy', function(d) { return d.coords && d.coords[1]; })

    var heat = simpleheat(canvas);

    // set data of [[x, y, value], ...] format
    heat.data(dests.map(d => {a = airportMap.get(d.destination); return [a.coords[0], a.coords[1], +d.watches]}));

    // set point radius and blur radius (25 and 15 by default)
    heat.radius(10, 10);

    // optionally customize gradient colors, e.g. below
    // (would be nicer if d3 color scale worked here)
    // heat.gradient({0: '#0000ff', 0.5: '#00ff00', 1: '#ff0000'});

    // set maximum for domain
    heat.max(d3.max(dests, d => +d.watches));

    // draw into canvas, with minimum opacity threshold
    heat.draw(0.05);
}