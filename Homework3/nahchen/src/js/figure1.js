import * as d3 from "d3";

export function test1(id,button_id){
    
    const margin = { top: 40, right: 40, bottom: 120, left: 100 };
    const height = 300;
    const width = 500;
    /*
    const x = d3.scaleBand().domain(data.map(d => d.y))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.x)]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.y))
        .attr("y", d => y(d.x))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.x))
        .attr("fill", "green");
    */
    var position = [50, 100, 150, 200, 250, 300, 350]

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    // Add circles at the top
    svg.selectAll("mycircles")
        .data(position)
        .enter()
        .append("circle")
        .attr("cx", function(d){return d} )
        .attr("cy", 40)
        .attr("r", 10)

    d3.select(button_id).on("click", function(){
        d3.selectAll("circle")
          .transition()
          .duration(2000)
          .attr("cy", 300)
          .delay(function(i){return(i*10)})
      })

        
    
}

export function test2(){
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                     "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv", function(data) {

// List of groups (here I have one group per column)
var allGroup = d3.map(data, function(d){return(d.name)}).keys()

// add the options to the button
d3.select("#selectButton")
  .selectAll('myOptions')
     .data(allGroup)
  .enter()
    .append('option')
  .text(function (d) { return d; }) // text showed in the menu
  .attr("value", function (d) { return d; }) // corresponding value returned by the button

// A color scale: one color for each group
var myColor = d3.scaleOrdinal()
  .domain(allGroup)
  .range(d3.schemeSet2);

// Add X axis --> it is a date format
var x = d3.scaleLinear()
  .domain(d3.extent(data, function(d) { return d.year; }))
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).ticks(7));

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, d3.max(data, function(d) { return +d.n; })])
  .range([ height, 0 ]);
svg.append("g")
  .call(d3.axisLeft(y));

// Initialize line with first group of the list
var line = svg
  .append('g')
  .append("path")
    .datum(data.filter(function(d){return d.name==allGroup[0]}))
    .attr("d", d3.line()
      .x(function(d) { return x(d.year) })
      .y(function(d) { return y(+d.n) })
    )
    .attr("stroke", function(d){ return myColor("valueA") })
    .style("stroke-width", 4)
    .style("fill", "none")

// A function that update the chart
function update(selectedGroup) {

  // Create new data with the selection?
  var dataFilter = data.filter(function(d){return d.name==selectedGroup})

  // Give these new data to update line
  line
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year) })
        .y(function(d) { return y(+d.n) })
      )
      .attr("stroke", function(d){ return myColor(selectedGroup) })
}

// When the button is changed, run the updateChart function
d3.select("#selectButton").on("change", function(d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")
    // run the updateChart function with this selected option
    update(selectedOption)
})

    })


}



export function test3(){
    var ratData = [];

    d3.csv("data/coffee_rodents_transform.csv", function(d) { // updated dataset
	return {
		city : d.city,
		rats2015 : +d.rats_2015, // new field
		coffee2015 : +d.coffee_2015, // new field
		rats2016 : +d.rats_2016, // new field
		coffee2016 : + d.coffee_2016 // new field
	};
    }, function(error, rows) {
	ratData = rows;
	console.log(ratData);
	createVisualization();
    });

    function createVisualization(){

        //Width and height
        var w = 180;
        var h = 180;
    
        //Create SVG element
        var svg = d3.select("#main")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h)
                    .attr("style", "outline: thin solid black;");
    
        var circle = svg.selectAll("circle")
           .data(ratData)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                   return d.rats2015; // new data field
           })
           .attr("cy", function(d) {
                   return d.coffee2015; // new data field
           })
           .attr("r", 5);}

}
