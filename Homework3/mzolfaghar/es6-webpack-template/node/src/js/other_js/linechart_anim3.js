// import * as d3 from "d3";
// import csvPath from '../assets/data/spotify_data/data_by_year_updated.csv';
// import csvPath_harvard from '../assets/data/WorldUniversityRankings/harvard.csv';
// import csvPath_princeton from '../assets/data/WorldUniversityRankings/princeton.csv';
// import csvPath_carnegie from '../assets/data/WorldUniversityRankings/carnegie.csv';
// import csvPath from '../assets/data/WorldUniversityRankings/timesData.csv';

import * as d3 from "d3";
import csvPath from '../assets/data/spotify_data/data_by_year_updated.csv';


export async function drawLineddFromCsvAsync(){
    const data = await d3.csv(csvPath);
    // const data_harvard = await d3.csv(csvPath_harvard);
    // const data_princeton = await d3.csv(csvPath_princeton);
    // const data_carnegie = await d3.csv(csvPath_carnegie);

    let id = "#linedd"
    let svg_id = "#linedd"

    // initialize the svg
    initLineddChart(id)

    //draw chart ()
    drawLineddChart(data, svg_id);

}

function initLineddChart(id){
    const margin = {top: 10, right: 100, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    const width = parentDiv.clientWidth; //600 - margin.left - margin.right;
    const height = 460 - margin.top - margin.bottom;
    
    let sid = id.substring(1)+ "_svg"

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", sid);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    // .call(d3.axisBottom(x))
    // .attr("class", "x axis")
    // .attr("transform", "translate(0," + height + ")")
        

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", `translate(${margin.left},0)`)
        // .call(d3.axisLeft(y))
        // .attr("class", "y axis")
        // .attr("transform", "translate(0," + width + ")")

    

}
export function drawLineddChart(data, id) {
  // const data_harvard = await d3.csv(csvPath_harvard);
  // const data_princeton = await d3.csv(csvPath_princeton);
  // const data_carnegie = await d3.csv(csvPath_carnegie);


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

    const y = d3.scaleLinear()
        .domain([0, 1]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    // let svg = d3.select(id).append("svg")
    //     .attr("viewBox", [0, 0, width, height])
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom);
      
    let tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-size", "12px")
        .style("z-index", "10")
        .style("visibility", "hidden"); 

   

    var line = svg
      .append('g')
      .append("path")
      .datum(data)
      .attr("d", d3.line()
        .x(function(d) { return x(+d.year) })
        .y(function(d) { return y(+d.danceability) })
      )
      // .attr("stroke", function(d){ return myColor("danceability") })
      .attr('stroke', 'gray')
      .style("stroke-width", 3)
      .style("fill", "none")

      // .style("stroke", function(d) { if (d.name == "Airbus") 
      //                               {return "rgb(000,255,000)"}
      //                             else {return "#000";}
      //                                 });
  // var totalLength = [path.getTotalLength()];//, path[0][1].getTotalLength()];
  console.log('sdkfksjhdfkashfahsdkfhaksjdhfkasjhdfkshfkhjsdf')
  
  // multiple path: http://bl.ocks.org/atmccann/8966400

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
      // d3.select('path')
      //   .attr("stroke-dasharray", totalLength+ " " + totalLength ) 
      //   .attr("stroke-dashoffset", totalLength)
      //   .transition()
      //     .duration(4000)
      //     .ease(d3.easeLinear) // Set Easing option
      //     // .ease("linear")
      //     .attr("stroke-dashoffset", 0);
  
      // d3.select(path[0][1])
      //   .attr("stroke-dasharray", totalLength[1] + " " + totalLength[1] )
      //   .attr("stroke-dashoffset", totalLength[1])
      //   .transition()
      //     .duration(5000)
      //     .ease("linear")
      //     .attr("stroke-dashoffset", 0);

      // A function that update the chart
    function update(selectedGroup) {

        // Create new data with the selection?
        var dataFilter = data.map(function(d){return {year: d.year, value:d[selectedGroup]} })
  
        
// Give these new data to update line
        line
        .datum(dataFilter)
        // .transition()
        // .duration(1000)
        .attr("d", d3.line()
        .x(function(d) { return x(+d.year) })
        .y(function(d) { return y(+d.value) })
        )
        // .attr("stroke", function(d){ return myColor(selectedGroup) })
        .attr('stroke', 'gray')
        .call(transition);
            // Give these new data to update line
        // svg.append("path")
        //     .datum(dataFilter)
        //     .transition()
        //     .attr("fill", "none")
        //     .attr("stroke", "gray")
        //     .attr("stroke-width", 2.5)
        //     .attr("d", d3.line()
        //     .x(function(d) { return x(+d.year) })
        //     .y(function(d) { return y(+d.value) })
        //     )
        //     .call(transition);
        // .transition()
        // .duration(7000)

      }
  
  // When the button is changed, run the updateChart function
  d3.select("#selectButton")
    .on("change", function(d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")
    console.log('selected option is -----', selectedOption)
    // run the updateChart function with this selected option
    update(selectedOption)
  })

  // A function that update the chart
//   function update(selectedUni, selectedFeat) {
//     if (selectedUni == 'Harvard University'){
//       // Create new data with the selection?
//     var dataFilter = data_harvard.map(function(d){return {year: d.year, value:d[selectedFeat]} })
//     }
//     if (selectedUni == 'Princeton University'){
//     var dataFilter = data_princeton.map(function(d){return {year: d.year, value:d[selectedFeat]} })
//     }
//     if (selectedUni == 'Carnegie Mellon University'){
//       // Create new data with the selection?
//     var dataFilter = data_carnegie.map(function(d){return {year: d.year, value:d[selectedFeat]} })
//     }
    
//     console.log(dataFilter)
//     // Give these new data to update line
//     svg.append("path")
//         .datum(dataFilter)
//         .attr("fill", "none")
//         .attr("stroke", "gray")
//         .attr("stroke-width", 2.5)
//         .attr("d", d3.line()
//           .x(function(d) { return x(+d.year) })
//           .y(function(d) { return y(+d.value) })
//         )
//       .call(transition);
//         // .transition()
//         // .duration(7000)
//   }

  
// When the button is changed, run the updateChart function
// d3.select("#selectButtonUni")
//   .on("change", function(d) {
//   // recover the option that has been chosen
//   var selectedUni  = d3.select("#selectButtonUni").property("value")
//   var selectedFeat = d3.select("#selectButtonFeat").property("value")
//   update(selectedUni, selectedFeat)
// })

// // When the button is changed, run the updateChart function
// d3.select("#selectButtonFeat")
//   .on("change", function(d) {
//   // recover the option that has been chosen 
  
//   var selectedUni  = d3.select("#selectButtonUni").property("value")
//   var selectedFeat = d3.select("#selectButtonFeat").property("value")
//   update(selectedUni, selectedFeat)
  
// })

       


const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSize(0));  

// text label for the x axis
svg.append("text")           
    .attr("transform",
            "translate(" + (width/2) + " ," +  //was width/2
                            (height - margin.top) + ")")
    .style("text-anchor", "middle")
    .attr("font-weight", "bold")
    .attr("font-size", 13)

const yAxis = g => g
    .attr("transform", `translate(${margin.left},-50)`)
    .call(d3.axisLeft(y))

// text label for the x axis
svg.append("text")             
    .attr("transform",
            "translate(" + (width - margin.left) + " ," +  //was width/2
                            (height/2) + ")")
    .style("text-anchor", "middle")
    .attr("font-weight", "bold")
    .attr("font-size", 13)
    
svg.select('.x.axis')
    // .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)")
    .attr("font-weight", "bold")
    .attr("font-size", '12');

svg.select('.y.axis')
    //.append("g")
    // .attr("class", "y axis")
    .call(g => g.select(".tick:last-of-type text").clone()
    .attr("transform", "translate(0," + width + ")")
    .call(yAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    // .attr("transform", "rotate(-65)")
    .attr("font-weight", "bold")
    .attr("font-size", '12'));


    


    // const yAxis = g => g
    //     .attr("transform", `translate(${margin.left},0)`)
    //     .call(d3.axisLeft(y))
        // .call(g => g.select(".tick:last-of-type text").clone()
        // .attr("y", 0 - margin.left + 50)
        // .attr("x",0 - (height / 2) + 50)
        // // .attr("y", height - margin.top)
        // // .attr("x", width + margin.left + 100)
        // .attr("x",0 - (height / 2) + 50)
        // .attr("transform", "rotate(-90)")
        // .attr("text-anchor", "middle")
        // .attr("font-weight", "bold"))
        // .text('Danceability'))  
      

    // svg.select('.x.axis')
    // // .append("g")
    //     // .attr("class", "x axis")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(xAxis)
    //     .selectAll("text")
    //     .style("text-anchor", "end")
    //     .attr("dx", "-.8em")
    //     .attr("dy", ".15em")
    //     // .attr("dx", "-.01em")
    //     // .attr("dy", ".0em")
    //     .attr("transform", "rotate(-65)")
    //     .attr("font-weight", "bold");

    // svg.append("g")
    //     .call(yAxis)
    //     .call(g => g.select(".tick:last-of-type text")
    //             .clone()
    //             // .attr("transform", `rotate(-90)`)
    //             // .attr("text-anchor", "middle")
    //             .attr("x", -(15 - margin.top - margin.bottom) / 2)
    //             .attr("y", -80)
    //             .style("text-anchor", "middle")
    //             .attr("font-weight", "bold")
    //             // .text('Danceability')
                
    //     )

}



