// GLOBAL VARIABLES
var range1 = -1
var range2 = -1
var datesValid = false
var crimeData = [];
var crimeTypeFreq = {};
var categoryFreq = {};
var parallelData = {};

// Set-up for date drop-downs
function initSelect(input){
  //console.log("init select ", 
    document.getElementById("startDate"), 
    document.getElementsByClassName("start")

  var select1 = document.getElementById("startDate");
  var select2 = document.getElementById("endDate");

  for (let item of input) {
    var option1 = document.createElement("option");
    option1.text = item[0];
    option1.value = item[0];

    var option2 = document.createElement("option");
    option2.text = item[0];
    option2.value = item[0];

    //console.log("select ", select1);
    select1.appendChild(option1);
    select2.appendChild(option2);
  }
}

function selectStart() {
  range1 = new Date(document.getElementById("startDate").value)
  compare() 
  if (datesValid) {
    //const result = words.filter(word => word.length > 6);
    temp = crimeData.filter(d => {return range1 <= new Date(d[0]) || d[0] <= range2} )
    drawLineGraph(temp)
  }
  //console.log(range1, range2, datesValid)
}

function selectEnd() {
  range2 = new Date(document.getElementById("endDate").value)
  compare()
  if (datesValid) {
    temp = crimeData.filter(d => {return range1 <= new Date(d[0]) || d[0] <= range2} )
    drawLineGraph(temp)
  }
  //console.log(range1, range2, datesValid)
}

function compare() {
  datesValid = (range1 < range2) || (range1 === -1 && range2 !== -1) || (range1 !== -1 && range2 === -1)
}


(function () {
  var dailyCrimes = {};
  
  // Load the dataset from a CSV URL
  d3.csv('https://raw.githubusercontent.com/cafornaca/ECS272-Winter2021/main/Homework2/datasets/Police_Department_Incidents_-_Previous_Year__2016_.csv')
    .then(csv => {
      // Log CSV in browser console
      console.log(csv);

      var parseTime = d3.timeParse("%d-%b-%y");
      // Create data by selecting columns from the CSV file
      var data = csv.map(row => {

        categoryFreq[String(row['Category'])] = categoryFreq[String(row['Category'])] ? categoryFreq[String(row['Category'])]+1.0 : 1.0;
        dailyCrimes[new Date(row['Date'])] = dailyCrimes[new Date(row['Date'])] ? dailyCrimes[new Date(row['Date'])]+1 : 1.0;

        if (crimeTypeFreq[new Date(row['Date'])]) {
          crimeTypeFreq[new Date(row['Date'])].total = crimeTypeFreq[new Date(row['Date'])].total + 1
          crimeTypeFreq[new Date(row['Date'])][row['Category']] = crimeTypeFreq[new Date(row['Date'])][row['Category']] ?
            crimeTypeFreq[new Date(row['Date'])][row['Category']] + 1 :
            1;
        } else {
          crimeTypeFreq[new Date(row['Date'])] = {
            total: 1,
            [row['Category']]: 1
          }
        }

        //console.log(crimeTypeFreq)
        
        dailyCrimes[new Date(row['Date'])] ? dailyCrimes[new Date(row['Date'])]+1 : 1.0;
        //console.log(categoryFreq)

        return {
          // Date: parseTime(new Date(row['Date'])),
          Category: String(row['Category']),
          Weekday: String(row['DayOfWeek']),
          District: String(row['PdDistrict'])//,
          // X: parseFloat(row['X']),
          // Y: parseFloat(row['Y'])
        };
      });

      Object.keys(dailyCrimes).forEach( d => { 
        // console.log("this is in crime data creations: ", d, dailyCrimes[d], crimeData)
        if (typeof dailyCrimes[d] === "number"){
          crimeData.push([ new Date(d), dailyCrimes[d] ]);
        }
      });


      // Sort dates
      crimeData = crimeData.sort((a, b) => {
        return a[0] > b[0] ? 1 : -1
      })

      drawLineGraph(crimeData)
      initSelect(crimeData)
      drawParallelCoords(parallelData)
      drawPieChart(categoryFreq)
    })
  })()

function drawPieChart(categoryFreq){
  var data = categoryFreq
  console.log(data)

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 40, left: 200},
    width = 2000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#piechart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleLinear()
  .domain([0, 45000])
  .range([ 0, width]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

// Y axis
var y = d3.scaleBand()
  .range([ 0, height ])
  // .domain(Object.keys(data).map(function(d) { 
  //   return d; }))
  .domain(Object.keys(data))
  .padding(1)
svg.append("g")
  .call(d3.axisLeft(y))

// Lines
svg.selectAll("lines")
  .data(Object.keys(data))
  .enter()
  .append("line")
    .attr("x1", function(d) {return x(data[d]) } )
    .attr("x2", x(0))
    .attr("y1", function(d) {return y(d) } )
    .attr("y2", function(d) {return y(d) } )
    .attr("stroke", "grey")
    
// Circles
svg.selectAll("mycircle")
  .data(Object.keys(data))
  .enter()
  .append("circle")
    .attr("cx", function(d) {return x(data[d]) } )
    .attr("cy", function(d) {return y(d) } )
    .attr("r", "4")
    .style("fill", "teal")
    .attr("stroke", "teal")

}



function advplot(){
  
}

  





function drawLineGraph(currentdata){
  // Set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 100, left: 50},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // define the line
  var valueline = d3.line()
  .x( (d) => { 
    // console.log("inside x ", d, d[0])
    return x(d[0]); 
  })
  .y(function(d) { return y(d[1]); });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("div#container").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  // Scale the range of the data
  x.domain(d3.extent(currentdata, function(d) { return d[0]; }));
  y.domain([0, d3.max(currentdata, function(d) { return d[1]; })]);

  // Add the valueline path.
  svg.append("path")
  .data([currentdata])    //   Maybe try:   .data(crimeData)
  .attr("class", "line")
  .attr("fill", "none")
  .attr("stroke", "teal")
  .attr("stroke-width", 1.5)
  .attr("d", valueline);

  // Add the X Axis
  svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x)
          .tickFormat(d3.timeFormat("%Y-%m-%d")))
  .selectAll("text")	
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

  // Add the Y Axis
  svg.append("g")
  .attr("class", "axis")
  .call(d3.axisLeft(y));

  // Add a title to the line graph
  svg.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .text("Number of Crimes per Day");
}