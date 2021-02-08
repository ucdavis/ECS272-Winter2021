  // Load the dataset from a CSV URL
  d3.csv('https://raw.githubusercontent.com/cafornaca/ECS272-Winter2021/main/Homework3/cafornaca/pokemon_alopez247.csv')
  .then(csv => {
      // Log CSV in browser console
      console.log(csv);

      /* KEYS ==========================================
      Number,Name,Type_1,Type_2,Total,HP,Attack,Defense,
      Sp_Atk,Sp_Def,Speed,Generation,isLegendary,Color,
      hasGender,Pr_Male,Egg_Group_1,Egg_Group_2,hasMegaEvolution,
      Height_m,Weight_kg,Catch_Rate,Body_Style
      */

      // create data by selecting two columns from csv 
      var data = csv.map(row => {
          return {
              Number: Number(row['Number']),
              Name: String(row['Name']),
              Type_1: String(row['Type_1']),
              Type_2: String(row['Type_2']),
              Total: Number(row['Total']),
              HP: Number(row['HP']),
              Attack: Number(row['Attack']),
              Defense: Number(row['Defense']),
              Sp_Atk: Number(row['Sp_Atk']),
              Sp_Def: Number(row['Sp_Def']),
              Speed: Number(row['Speed']),
              Generation: Number(row['Generation']),
              isLegendary: String(row['isLegendary']),
              Color: String(row['Color']),
              hasGender: String(row['hasGender']),
              Pr_Male: Number(row['Pr_Male']),
              Egg_Group_1: String(row['Egg_Group_1']),
              Egg_Group_2: String(row['Egg_Group_2']),
              hasMegaEvolution: String(row['hasMegaEvolution']),
              Height_m: Number(row['Height_m']),
              Weight_kg: Number(row['Weight_kg']),
              Catch_Rate: Number(row['Catch_Rate']),
              Body_Style: String(row['Body_Style'])
          }
      })
  }
);



// var margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = 960 - margin.left - margin.right,
//     height = 500 - margin.top - margin.bottom;

// /* 
//  * value accessor - returns the value to encode for a given data object.
//  * scale - maps value to a visual display encoding, such as a pixel position.
//  * map function - maps from data value to display value
//  * axis - sets up axis
//  */ 

// // setup x 
// var xValue = function(d) { return d.Weight_kg;}, // data -> value
//     xScale = d3.scale.linear().range([0, width]), // value -> display
//     xMap = function(d) { return xScale(xValue(d));}, // data -> display
//     xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// // setup y
// var yValue = function(d) { return d.Height_m; }, // data -> value
//     yScale = d3.scale.linear().range([height, 0]), // value -> display
//     yMap = function(d) { return yScale(yValue(d));}, // data -> display
//     yAxis = d3.svg.axis().scale(yScale).orient("left");

// // setup fill color
// var cValue = function(d) { return d.Type_1;},
//     color = d3.scale.category20b();

// // add the graph canvas to the body of the webpage
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// // add the tooltip area to the webpage
// var tooltip = d3.select("body").append("div")
//     .attr("class", "tooltip")
//     .style("opacity", 0);

// // load data
// d3.csv("https://raw.githubusercontent.com/cafornaca/ECS272-Winter2021/main/Homework3/cafornaca/pokemon_alopez247.csv", function(data) {

//   // change string (from CSV) into number format
//   data.forEach(function(d) {
//     d.Weight_kg = +d.Weight_kg;
//     d.Height_m = +d.Height_m;
// //    console.log(d);
//   });

//   // don't want dots overlapping axis, so add in buffer to data domain
//   xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
//   yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

//   // x-axis
//   svg.append("g")
//       .attr("class", "x axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(xAxis)
//     .append("text")
//       .attr("class", "label")
//       .attr("x", width)
//       .attr("y", -6)
//       .style("text-anchor", "end")
//       .text("Weight in KG");

//   // y-axis
//   svg.append("g")
//       .attr("class", "y axis")
//       .call(yAxis)
//     .append("text")
//       .attr("class", "label")
//       .attr("transform", "rotate(-90)")
//       .attr("y", 6)
//       .attr("dy", ".71em")
//       .style("text-anchor", "end")
//       .text("Height in M");

//   // draw dots
//   svg.selectAll(".dot")
//       .data(data)
//     .enter().append("circle")
//       .attr("class", "dot")
//       .attr("r", 3.5)
//       .attr("cx", xMap)
//       .attr("cy", yMap)
//       .style("fill", function(d) { return color(cValue(d));}) 
//       .on("mouseover", function(d) {
//           tooltip.transition()
//                .duration(200)
//                .style("opacity", .9);
//           tooltip.html(d["Primary Type"] + "<br/> (" + xValue(d) 
// 	        + ", " + yValue(d) + ")")
//                .style("left", (d3.event.pageX + 5) + "px")
//                .style("top", (d3.event.pageY - 28) + "px");
//       })
//       .on("mouseout", function(d) {
//           tooltip.transition()
//                .duration(500)
//                .style("opacity", 0);
//       });

//   // draw legend
//   var legend = svg.selectAll(".legend")
//       .data(color.domain())
//     .enter().append("g")
//       .attr("class", "legend")
//       .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

//   // draw legend colored rectangles
//   legend.append("rect")
//       .attr("x", width - 18)
//       .attr("width", 18)
//       .attr("height", 18)
//       .style("fill", color);

//   // draw legend text
//   legend.append("text")
//       .attr("x", width - 24)
//       .attr("y", 9)
//       .attr("dy", ".35em")
//       .style("text-anchor", "end")
//       .text(function(d) { return d;})
// });



// var margin = {top: 40, right: 150, bottom: 60, left: 30},
//   width = 1000 - margin.left - margin.right,
//   height = 1000 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz_1")
// .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
// .append("g")
//   .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");

// //Read the data
// d3.csv("https://raw.githubusercontent.com/cafornaca/ECS272-Winter2021/main/Homework3/cafornaca/pokemon_alopez247.csv", function(data) {

// // ---------------------------//
// //       AXIS  AND SCALE      //
// // ---------------------------//

// // Add X axis
// var x = d3.scaleLinear()
//   .domain([0.0, 600.0])
//   .range([ 0, width ]);
// svg.append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x).ticks(3));

// // Add X axis label:
// svg.append("text")
//     .attr("text-anchor", "end")
//     .attr("x", width)
//     .attr("y", height+50 )
//     .text("Weight in KG");

// // Add Y axis
// var y = d3.scaleLinear()
//   .domain([0.0, 9.0])
//   .range([ height, 0]);
// svg.append("g")
//   .call(d3.axisLeft(y));

// // Add Y axis label:
// svg.append("text")
//     .attr("text-anchor", "end")
//     .attr("x", 0)
//     .attr("y", -20 )
//     .text("Pokemon Height")
//     .attr("text-anchor", "start")

// // Add a scale for bubble size
// var z = d3.scaleSqrt()
//   .domain([0, 720])
//   .range([ 2, 100]);

// // Add a scale for bubble color
// var myColor = d3.scaleOrdinal()
//   .domain(["Normal", "Fire", "Water", "Bug", "Ground", "Rock", "Fighting", "Psychic", "Flying", "Ghost", "Ice", "Dragon", "Fairy", "Steel", "Dark", "Electric", "Grass", "Poison"])
//   .range([  "#DAF7A6", //1
//             "#FFC300", //2
//             "#FF5733", //3
//             "#C70039", //4
//             "#900C3F", //5
//             "#581845", //6
//             "#400080",
//             "#000080",
//             "#004080",
//             "#008080",
//             "#008000",
//             "#DAF7A6",
//             "#800800",
//             "#902720",
//             "#a04640",
//             "#b06560",
//             "#c08480",
//             "#cfa29f",
//             "#dfc1bf",
//             "#efe0df" // 18
//   ]);


// // ---------------------------//
// //      TOOLTIP               //
// // ---------------------------//

// // -1- Create a tooltip div that is hidden by default:
// var tooltip = d3.select("#my_dataviz_1")
//   .append("div")
//     .style("opacity", 0)
//     .attr("class", "tooltip")
//     .style("background-color", "black")
//     .style("border-radius", "5px")
//     .style("padding", "10px")
//     .style("color", "white")

// // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
// var showTooltip = function(d) {
//   tooltip
//     .transition()
//     .duration(200)
//   tooltip
//     .style("opacity", 1)
//     .html("Type: " + d.Type_1)
//     .style("left", (d3.mouse(this)[0]+30) + "px")
//     .style("top", (d3.mouse(this)[1]+30) + "px")
// }

// var moveTooltip = function(d) {
//   tooltip
//     .style("left", (d3.mouse(this)[0]+30) + "px")
//     .style("top", (d3.mouse(this)[1]+30) + "px")
// }
// var hideTooltip = function(d) {
//   tooltip
//     .transition()
//     .duration(200)
//     .style("opacity", 0)
// }


// // ---------------------------//
// //       HIGHLIGHT GROUP      //
// // ---------------------------//

// // What to do when one group is hovered
// var highlight = function(d){
//   // reduce opacity of all groups
//   d3.selectAll(".bubbles").style("opacity", .05)
//   // expect the one that is hovered
//   d3.selectAll("."+d).style("opacity", 1)
// }

// // And when it is not hovered anymore
// var noHighlight = function(d){
//   d3.selectAll(".bubbles").style("opacity", 1)
// }


// // ---------------------------//
// //       CIRCLES              //
// // ---------------------------//

// // Add dots
// svg.append('g')
//   .selectAll("dot")
//   .data(data)
//   .enter()
//   .append("circle")
//     .attr("class", function(d) { return "bubbles " + d.Type_1 })
//     .attr("cx", function (d) { return x(d.Weight_kg); } )
//     .attr("cy", function (d) { return y(d.Height_m); } )
//     .attr("r", 4  )

//     //.attr("r", function (d) { return z(d.Total); } )
//     .style("fill", function (d) { return myColor(d.Type_1); } )
//   // -3- Trigger the functions for hover
//   .on("mouseover", showTooltip )
//   .on("mousemove", moveTooltip )
//   .on("mouseleave", hideTooltip )



//   // ---------------------------//
//   //       LEGEND              //
//   // ---------------------------//

//   // Add legend: circles
//   var valuesToShow = [10000000, 100000000, 1000000000]
//   var xCircle = 390
//   var xLabel = 440
//   svg
//     .selectAll("legend")
//     .data(valuesToShow)
//     .enter()
//     .append("circle")
//       .attr("cx", xCircle)
//       .attr("cy", function(d){ return height - 100 - z(d) } )
//       .attr("r", function(d){ return z(d) })
//       .style("fill", "none")
//       .attr("stroke", "black")

//   // Add legend: segments
//   svg
//     .selectAll("legend")
//     .data(valuesToShow)
//     .enter()
//     .append("line")
//       .attr('x1', function(d){ return xCircle + z(d) } )
//       .attr('x2', xLabel)
//       .attr('y1', function(d){ return height - 100 - z(d) } )
//       .attr('y2', function(d){ return height - 100 - z(d) } )
//       .attr('stroke', 'black')
//       .style('stroke-dasharray', ('2,2'))

//   // Add legend: labels
//   svg
//     .selectAll("legend")
//     .data(valuesToShow)
//     .enter()
//     .append("text")
//       .attr('x', xLabel)
//       .attr('y', function(d){ return height - 100 - z(d) } )
//       .text( function(d){ return d/1000000 } )
//       .style("font-size", 10)
//       .attr('alignment-baseline', 'middle')

//   // Legend title
//   svg.append("text")
//     .attr('x', xCircle)
//     .attr("y", height - 100 +30)
//     .text("Total Base Stats")
//     .attr("text-anchor", "middle")

//   // Add one dot in the legend for each name.
//   var size = 20
//   var allgroups = ["Normal", "Fire", "Water", "Bug", "Ground", "Rock", "Fighting", "Psychic", "Flying", "Ghost", "Ice", "Dragon", "Fairy", "Steel", "Dark", "Electric", "Grass", "Poison"]
//   svg.selectAll("myrect")
//     .data(allgroups)
//     .enter()
//     .append("circle")
//       .attr("cx", 390)
//       .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
//       .attr("r", 7)
//       .style("fill", function(d){ return myColor(d)})
//       .on("mouseover", highlight)
//       .on("mouseleave", noHighlight)

//   // Add labels beside legend dots
//   svg.selectAll("mylabels")
//     .data(allgroups)
//     .enter()
//     .append("text")
//       .attr("x", 390 + size*.8)
//       .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
//       .style("fill", function(d){ return myColor(d)})
//       .text(function(d){ return d})
//       .attr("text-anchor", "left")
//       .style("alignment-baseline", "middle")
//       .on("mouseover", highlight)
//       .on("mouseleave", noHighlight)
// })