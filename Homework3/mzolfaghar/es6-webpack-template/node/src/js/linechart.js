// 1. now the font size for the y axis doesnt change 

import * as d3 from "d3";
import legend from "d3-svg-legend";
import csvPath from '../assets/data/spotify_data/data_by_year_updated.csv';


export async function drawLineddFromCsvAsync(){
    const data = await d3.csv(csvPath);
    
    let id = "#linedd"
    let svg_id = "#linedd-svg"

    // initialize the svg
    initLineddChart(id)
    
    const params = {
        "text1":"",
        "text2":"",
        "draw": "0",
        // "sec_click": "0"
    }

    // draw chart    
    drawLineddChart(data, params, svg_id); 

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

export function drawLineddChart(data, params, id) {
  
    // -------------------------------------------------------------- //
    // --------------------- Initializing the svg ------------------- //
    // -------------------------------------------------------------- //
    console.log('iiiiiiiiid, params', id, params)

    const margin = {top: 10, right: 100, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    const width = parentDiv.clientWidth; //600 - margin.left - margin.right;
    const height = 460 - margin.top - margin.bottom;
    
    let svg = d3.select(id)

    var allGroup = ['danceability', 'energy','speechiness','liveness', 'acousticness', 'valence', 'normalized_tempo','instrumentalness','normalized_duration_ms']
    
    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

    // -------------------------------------------------------------- //
    // ------------------- Creating scales and axis ----------------- //
    // -------------------------------------------------------------- //
    const x = d3.scaleBand().domain(data.map(d => d.year))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.2);

    const y = d3.scaleLinear()
        // .domain([0, d3.max(data, d => d.value), d3.max(data, d => d.value2)])
        .domain([0, 1]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    // -------------------------------------------------------------- //
    // ----------------------- Creating tooltips -------------------- //
    // -------------------------------------------------------------- //
    let tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-size", "12px")
        .style("z-index", "10")
        .style("visibility", "hidden"); 

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
    // -------------------------------------------------------------- //
    // --------- Removing everything from the screen ---------------- //
    // -------------------------------------------------------------- //
    svg.selectAll('path').remove();
    svg.selectAll(".legendOrdinal").remove(); 
    // svg.select("mydots").selectAll("circle").remove();
    // svg.select("mylabels").selectAll("text").remove();
    // handmade-legends
    
    // -------------------------------------------------------------- //
    // --------------------- Creating the lines/path ---------------- //
    // -------------------------------------------------------------- //
    let myColors = ['red', 'blue']

    // let legend = svg.append("g")
    //     .attr("class","legend")
    //     .attr("transform","translate(50,30)")
    //     .style("font-size","12px")
    //     .call(d3.legend)
    // console.log('legends', legend)

    var line = svg
      .datum(data)
      .append("path")
    //   .join(
    //     enter => enter.select("path"),
    //     update => update,
    //     exit => exit.remove()

    // )
      
      .attr("d", d3.line()
        .x(function(d) { return x(+d.year) })
        .y(function(d) { return y(+d.value) })
      )
      // .attr("stroke", function(d){ return myColor("danceability") })
      .attr('stroke', myColors[0])
      .style("stroke-width", 3)
      .style("fill", "none")
    //   .attr("data-legend",function(d) { return d.text1})
      .call(transition)


    var line = svg
        .datum(data)
        .append("path")
    //     .join(
    //       enter => enter.select("path"),
    //       update => update,
    //       exit => exit.remove()
  
    //   )
        .attr("d", d3.line()
          .x(function(d) { return x(+d.year) })
          .y(function(d) { return y(+d.value2) })
        )
        // .attr("stroke", function(d){ return myColor("danceability") })
        .attr('stroke', myColors[1])
        .style("stroke-width", 3)
        .style("fill", "none")
        // .attr("data-legend",function(d) { return d.text2})
        .call(transition)
  
    // -------------------------------------------------------------- //
    // ---------------------- Creating the legend  -------------------- //
    // -------------------------------------------------------------- //    
    // Build color scale
    // var myColor = d3.scaleSequential()
    //             .interpolator(d3.interpolateInferno)
    //             .domain([-1,1])

    // var sequentialScale = d3.scaleSequential()
    //                 .interpolator(d3.interpolateInferno)
    //                 .domain([-1,1]);
    

    // svg.append("g")
    //     .attr("class", "legendSequential")
    //     .attr("transform", "translate(500, 8)");
  
    // var legendSequential = legend.legendColor()
    //     .shapeWidth(30)
    //     .cells(10)
    //     .orient('verical')
    //     .scale(sequentialScale);
  
    // svg.select(".legendSequential")
    //     .call(legendSequential);
    var ordinal = d3.scaleOrdinal()
        .domain([params.text1, params.text2])
        .range([ "red", "blue"]);

    svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(20,20)");

    var legendOrdinal = legend.legendColor()
            .shapeWidth(30)
            .cells(2)
            // .shape("path", d3.symbol().type(d3.symbolTriangle).size(150)())
            .shapePadding(10)
            //use cellFilter to hide the "e" cell
            // .cellFilter(function(d){ return d.label !== "e" })
            .scale(ordinal);

    svg.select(".legendOrdinal")
        .call(legendOrdinal);

    // // svg.select("handmade-legends").selectAll("text").remove()
    // // let textV1 = [].concat(function(d) {console.log('value 2 text', d.text2); return d.text2})
    // // data.map(function(d){console.log('teeeeext1',d.text1); return d.text1 })
    // // if (){}z
    // // console.log('-----textV1', textV1)
    // // console.log('-------data val 2', data.value2)
    // // Handmade legend
    // svg
    //     .append("g")
    //     .attr("class", "handmade-legends")
    //     .attr("transform", "translate(500, 8)");
    
    // // const circles = svg
    // //     .append("g")
    // //     .selectAll("circle")
    // //     .data(data)
    // //     .join(
    // //         (enter) => enter.append("circle").attr("r", 6),
    // //         update => update,
    // //         exit => exit.remove()
    //     // );

    // // circles 
    // //     .attr("cx", 140)
    // //     .attr("cy",10)
    // //     .style("fill", myColors[0]);

    // // circles
    // //     .attr("cx", 200)
    // //     .attr("cy",10)
    // //     .style("fill", myColors[1]);


    // console.log('-----text1-------', params.text1)
    // if (params.text1 != params.text2){
    //     svg
    //         .selectAll("mydots")
    //         .data(data) // datum and check .append("g")
    //         .join(
    //             enter => enter.append("circle"),
    //             update => update,
    //             // exit => exit.remove()
    //         )
    //             .attr("cx", 140)
    //             .attr("cy",10)
    //             .attr("r", 6)
    //             .style("fill", myColors[0]);
    
    //     svg
    //         .attr("class", "mydots")
    //         .selectAll("mydots")
    //         .data(data)
    //         .join(
    //             enter => enter.append("circle"),
    //             update => update,
    //             exit => exit.remove()
    //         )
    //         // .enter()
    //         // .append("circle")
    //             .attr("cx", 250)
    //             .attr("cy",10)
    //             .attr("r", 6)
    //             .style("fill", myColors[1])
        
    //     svg
    //         .selectAll("mylabels")
    //         .data(data)
    //         .enter()
    //         .append("text")
            
    //             .attr("x",160 )
    //             .attr("y", 10)
    //             .text(params.text1)//function(d) {console.log('value 1 text', d.text1); return d.text1})
    //             .style("font-size", "15px")
    //             .attr("alignment-baseline","middle")
    //     svg
    //         .selectAll("mylabels")
    //         .data(data)
    //         .enter()
    //         .append("text")
    //             .attr("x", 270)
    //             .attr("y", 10)
    //             .text(params.text2) //function(d) {console.log('value 2 text', d.text2); return d.text2})
    //             .style("font-size", "15px")
    //             .attr("alignment-baseline","middle")
    //     }
    // if (params.text1 == params.text2){
    //     svg
    //         .attr("class", "mydots")
    //         .selectAll("mydots")
    //         .data(data)
    //         .join(
    //             enter => enter.append("circle"),
    //             update => update,
    //             exit => exit.remove()
    //         )
    //         // .enter()
    //         // .append("circle")
    //             .attr("cx", 140)
    //             .attr("cy",10)
    //             .attr("r", 6)
    //             .style("fill", myColors[0])

    //     svg
    //         .selectAll("mylabels")
    //         .data(data)
    //         .enter()
    //         .append("text")
    //             .attr("x", 160)
    //             .attr("y", 10)
    //             .text(params.text1) //function(d) {console.log('value 2 text', d.text2); return d.text2})
    //             .style("font-size", "15px")
    //             .attr("alignment-baseline","middle")
    // }
    
    // -------------------------------------------------------------- //
    // ------------------ Creating scale and axis  ------------------ //
    // -------------------------------------------------------------- //    
    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat((x,i) => {
          if ((i%10)==0){
            return x;
          }
        }))

    svg.append("text")             
          .attr("transform",
                "translate(" + (width/2) + " ," + 
                                (height - margin.top) + ")")
          .style("text-anchor", "middle")
          .attr("font-weight", "bold")
          .attr("font-size", 13)
          .text("Year");

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))

    svg.select(".x.axis")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        .attr("font-weight", "bold")

    svg.select(".y.axis")
        .call(yAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("font-weight", "bold")
        .attr("font-size", "10px")
}



