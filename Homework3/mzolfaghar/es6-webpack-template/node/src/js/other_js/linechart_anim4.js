// 1. now the font size for the y axis doesnt change 

import * as d3 from "d3";
import csvPath from '../assets/data/spotify_data/data_by_year_updated.csv';


export async function drawLineddFromCsvAsync(){
    const data = await d3.csv(csvPath);
    
    let id = "#linedd"
    let svg_id = "#linedd-svg"

    // initialize the svg
    initLineddChart(id)
    
    // draw chart    
    drawLineddChart(data, svg_id); 

}

function initLineddChart(id){
    const margin = {top: 10, right: 100, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    const width = parentDiv.clientWidth; 
    const height = 460 - margin.top - margin.bottom;
    
    let sid = id.substring(1)+ "-svg"
    let scid = id.substring(1)+ "-svg-g"

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", sid);

    svg.append("g").attr("id", scid)

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", `translate(${margin.left},0)`)

} 
function tweenDash() {
    const l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function(t) { return i(t) };
  }

function transition(path) {
    path.transition()
        .duration(7000)
        .attrTween("stroke-dasharray", tweenDash)
        .ease(d3.easeLinear) // Set Easing option
        .on("end", () => { d3.select(this).call(transition); });
  }

 // A function that update the chart
 export function update(data, line, x, y, selectedGroup) {

    // Create new data with the selection?
    var dataFilter = data.map(function(d){return {year: d.year, value:d[selectedGroup]} })
    // console.log('joooooooin')

    // const y = d3.scaleLinear()
    //     .domain([0, 0.7]).nice()
    //     .rangeRound([height - margin.bottom, margin.top]);

    // Give these new data to update line
    line
        .datum(dataFilter)
        .attr("d", d3.line()
        .x(function(d) { return x(+d.year) })
        .y(function(d) { return y(+d.value) })
        )
        // .attr("stroke", function(d){ return myColor(selectedGroup) })
        .attr('stroke', 'gray')
        .call(transition);
    
}

export function drawLineddChart(data, id) {
  
    const margin = {top: 10, right: 100, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    const width = parentDiv.clientWidth; //600 - margin.left - margin.right;
    const height = 460 - margin.top - margin.bottom;
    
    let svg = d3.select(id)

    var allGroup = ['danceability', 'energy','speechiness','liveness', 'acousticness', 'valence', 'normalized_tempo','instrumentalness','normalized_duration_ms']
    
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

    const x = d3.scaleBand().domain(data.map(d => d.year))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.2);    
    // console.log('.domain([0, d3.max(d3.max(data, d => d.value1), d3.max(data, d => d.value2))])')
    // console.log(([0, d3.max(d3.max(data, d => d.value1), d3.max(data, d => d.value2))]))
    const y = d3.scaleLinear()
        // .domain([0, d3.max(d3.max(data, d => d.value1), d3.max(data, d => d.value2))])
        .domain([0, 1]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

      
    let tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-size", "12px")
        .style("z-index", "10")
        .style("visibility", "hidden"); 

    var line = svg
    //   .append('g')
      .datum(data)
      .append("path")
    //   .join(
    //     enter => enter.select("path"),
    //     update => update,
    //     exit => exit.remove()

    // )
      
      .attr("d", d3.line()
        .x(function(d) { return x(+d.year) })
        .y(function(d) { return y(+d.danceability) })
        // .y(function(d) { return y(+d.value1) })
      )
    //   .attr("d", d3.line()
    //     .x(function(d) { return x(+d.year) })
    //     .y(function(d) { return y(+d.value2) })
    //   )
      // .attr("stroke", function(d){ return myColor("danceability") })
      .attr('stroke', 'gray')
      .style("stroke-width", 3)
      .style("fill", "none")

  
//   console.log('sdkfksjhdfkashfahsdkfhaksjdhfkasjhdfkshfkhjsdf')
  
  // multiple path: http://bl.ocks.org/atmccann/8966400

//   function tweenDash() {
//     const l = this.getTotalLength(),
//         i = d3.interpolateString("0," + l, l + "," + l);
//     return function(t) { return i(t) };
//   }

//   function transition(path) {
//     path.transition()
//         .duration(7000)
//         .attrTween("stroke-dasharray", tweenDash)
//         .ease(d3.easeLinear) // Set Easing option
//         .on("end", () => { d3.select(this).call(transition); });
//   }
      
    // // A function that update the chart
    // function update(selectedGroup) {

    //     // Create new data with the selection?
    //     var dataFilter = data.map(function(d){return {year: d.year, value:d[selectedGroup]} })
    //     // console.log('joooooooin')

    //     // const y = d3.scaleLinear()
    //     //     .domain([0, 0.7]).nice()
    //     //     .rangeRound([height - margin.bottom, margin.top]);

    //     // Give these new data to update line
    //     line
    //         .datum(dataFilter)
    //         .attr("d", d3.line()
    //         .x(function(d) { return x(+d.year) })
    //         .y(function(d) { return y(+d.value) })
    //         )
    //         // .attr("stroke", function(d){ return myColor(selectedGroup) })
    //         .attr('stroke', 'gray')
    //         .call(transition);
        
    //   }
  
  // When the button is changed, run the updateChart function
  d3.select("#selectButton")
    .on("change", function(d) {
    // recover the option that has been chosen
    var selectedGroup = d3.select(this).property("value")
    // console.log('selected option is -----', selectedGroup)
    // run the updateChart function with this selected option
    var dataFilter = data.map(function(d){return {year: d.year, value:d[selectedGroup]} })
    // drawLineddChart(dataFilter, "#linedd-svg")
    update(data, line, x, y, selectedGroup)

  })

  const xAxis = g => g
  .attr("transform", `translate(0,${height - margin.bottom})`)
  // .call(d3.axisBottom(x)).ticks(2);
  .call(d3.axisBottom(x).tickFormat((x,i) => {
    if ((i%3)===0) {
      console.log(x);
      return x;
     }
      }))



//   // text label for the x axis
// svg.append("text")             
//     .attr("transform",
//           "translate(" + (width/2) + " ," +  //was width/2
//                           (height - margin.top) + ")")
//     .style("text-anchor", "middle")
//     .attr("font-weight", "bold")
//     .attr("font-size", 13)
//     .text("Year");


    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat((x,i) => {
          if ((i%3)==0){
            return x;
          }
        }))

        // text label for the x axis
    svg.append("text")             
          .attr("transform",
                "translate(" + (width/2) + " ," +  //was width/2
                                (height - margin.top) + ")")
          .style("text-anchor", "middle")
          .attr("font-weight", "bold")
          .attr("font-size", 13)
          .text("Year");

       
    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".tick:last-of-type text").clone()
        .attr("y", 0 - margin.left + 50)
        .attr("x",0 - (height / 2) + 50)
        // .attr("y", height - margin.top)
        // .attr("x", width + margin.left + 100)
        .attr("x",0 - (height / 2) + 50)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold"))
        // .text('Danceability'))

    svg.select(".x.axis")
    // .append("g")
        // .attr("class", "x axis")
        // .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        // .attr("dx", "-.01em")
        // .attr("dy", ".0em")
        .attr("transform", "rotate(-65)")
        .attr("font-weight", "bold")
        // .attr("font-size", 12);

    svg.select(".y.axis")
    // .append("g")
        .call(yAxis)
        .call(g => g.select(".tick:last-of-type text")
                .clone()
                // .attr("transform", `rotate(-90)`)
                // .attr("text-anchor", "middle")
                .attr("x", -(15 - margin.top - margin.bottom) / 2)
                .attr("y", -80)
                .style("text-anchor", "middle")
                .attr("font-weight", "bold")
                .attr("font-size", 24)
                // .text('Danceability')
                
)

}



