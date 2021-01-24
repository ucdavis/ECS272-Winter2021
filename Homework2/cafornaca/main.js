(function () {
    // Load the dataset from a CSV URL
    d3.csv('https://raw.githubusercontent.com/cafornaca/ECS272-Winter2021/main/Homework2/datasets/Police_Department_Incidents_-_Previous_Year__2016_.csv')
      .then(csv => {
        // Log CSV in browser console
        console.log(csv);
        
        // Frequency of each category
        categoryFreq= {};

        // Daily crime count
        dailyCrimes= {};

        // Create data by selecting columns from the CSV file
        var data = csv.map(row => {
          categoryFreq[String(row['Category'])] = categoryFreq[String(row['Category'])] ? categoryFreq[String(row['Category'])]+1 : 1
          dailyCrimes[Date(row['Date'])] = dailyCrimes[Date(row['Date'])] ? dailyCrimes[Date(row['Date'])]+1 : 1

         // console.log(row)

          return {
            Date: new Date(row['Date']),
            Category: String(row['Category']),
            Weekday: String(row['DayOfWeek']),
            District: String(row['PdDistrict']),
            X: parseFloat(row['X']),
            Y: parseFloat(row['Y']) 
          }
        })

        console.log(data)

        /********************************* 
        * Visualization codes start here
        * ********************************/
        var width = 600;
        var height = 400;
        var margin = {left: 60, right: 20, top: 20, bottom: 60}
 
        var svg = d3.select('#container')
          .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom) 
  
        var view = svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
        //scale functions
        // var x = d3.scaleLinear()
        //   .domain([0, d3.max(data, d => data.Date)])
        //   .range([0, width]);
          
        // var y = d3.scaleLinear()
        //   .domain([0, d3.max(data, d => dailyCrimes)])
        //   .range([height, 0]);
  
        
        // Create a Line Graph

        // Add X axis --> it is a date format
        var x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { 
            // console.log("x: ", d, d.Date)
            return d.Date; }))
          .range([ 0, width ]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));

        // Add Y axis
        var y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) { 
            // console.log("y: ", d, dailyCrimes)
            return +dailyCrimes[d]; })])
          .range([ height, 0 ]);
        svg.append("g")
          .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "teal")
          .attr("stroke-width", 1.5)
          .attr("d", d3.line()
            .x(function(d) { 
              // console.log("date line: ", d, d.Date)
              return x(d.Date) })
            .y(function(d) { 
              // console.log("daily crimes line: ", d, dailyCrimes)
              return y(dailyCrimes[d]) })
        )
  
        // x axis
        view.append("g")	
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).ticks(6))
            .append("text")
            .attr("fill", "#000")
            .attr("x", width / 2)
            .attr('y', margin.bottom / 2)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Date");
  
        // y axis
        view.append("g")
          .call(d3.axisLeft(y).ticks(6))
          .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("x", - height / 2)
            .attr("y", - margin.left)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Number of Crimes");
  
      })
  })()