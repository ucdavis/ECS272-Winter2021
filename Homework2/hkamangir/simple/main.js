var width = 600;
var height = 500;
var radius = 200;



var data = [1, 2, 5, 8, 5];

var pie = d3.layout.pie();

var stencil = pie(data);

var svg = d3.select('html')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var cantainer = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


var g = cantainer.selectAll("g")
    .data(stencil)
    .enter()
    .append('g');

var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius / 2);

var color = d3.scale.category20();


g.append('path')
    .attr("d", arc)
    .style("fill", function(d, i) {
        return color(d.value);
    });