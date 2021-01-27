(function () {
  var crimeData = [];
  var dailyCrimes = {};

  // Load the dataset from a CSV URL
  d3.csv('https://raw.githubusercontent.com/cafornaca/ECS272-Winter2021/main/Homework2/datasets/Police_Department_Incidents_-_Previous_Year__2016_.csv')
    .then(csv => {
      // Log CSV in browser console
      console.log(csv);

      var parseTime = d3.timeParse("%d-%b-%y");

      // Frequency of each category
      // categoryFreq= {};

      // Daily crime count
      // dailyCrimes= {};

      // Create data by selecting columns from the CSV file
      var data = csv.map(row => {

        // categoryFreq[String(row['Category'])] = categoryFreq[String(row['Category'])] ? categoryFreq[String(row['Category'])]+1 : 1;
        dailyCrimes[new Date(row['Date'])] = dailyCrimes[new Date(row['Date'])] ? dailyCrimes[new Date(row['Date'])]+1 : 1.0;

        //console.log("categoryfreq: ", categoryFreq)
        //console.log("daily crimes: ", dailyCrimes)
        // console.log(row)

        return {
          Date: parseTime(new Date(row['Date'])),
          Category: String(row['Category']),
          Weekday: String(row['DayOfWeek']),
          District: String(row['PdDistrict']),
          X: parseFloat(row['X']),
          Y: parseFloat(row['Y'])
        };
      });

      Object.keys(dailyCrimes).forEach( d => { 
        // console.log("this is in crime data creations: ", d, dailyCrimes[d], crimeData)
        if (typeof dailyCrimes[d] === "number"){
          crimeData.push([ new Date(d), dailyCrimes[d] ]);
        }
      });

      // Sort my crimeData so it doesn't draw jibberish
      // crimeData.sort(function(a, b) {
      //   return d3.ascending(a[0], b.year)
      // });


      crimeData = crimeData.sort((a, b) => {
        return a[0] > b[0] ? 1 : -1
      })

      // console.log(crimeData)

      // set the dimensions and margins of the graph
      var margin = {top: 20, right: 20, bottom: 100, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;
  
      // set the ranges
      var x = d3.scaleTime().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);
  
      // define the line
      var valueline = d3.line()
      .x( (d) => { 
        console.log("inside x ", d, d[0])
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
      x.domain(d3.extent(crimeData, function(d) { return d[0]; }));
      y.domain([0, d3.max(crimeData, function(d) { return d[1]; })]);
  
      // Add the valueline path.
      svg.append("path")
      .data([crimeData])    //   Maybe try:   .data(crimeData)
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

      svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("Number of Crimes per Day");
  

    })

  })()