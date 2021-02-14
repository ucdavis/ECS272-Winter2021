// 1. now the font size for the y axis doesnt change 

import * as d3 from "d3";
import legend from "d3-svg-legend";
import csvPath from '../assets/data/spotify_data/data_by_year_updated.csv';


export async function drawLineddFromCsvAsync(draw){
    const data = await d3.csv(csvPath);
    
    let id = "#linedd"
    let svg_id = "#linedd-svg"

    // initialize the svg
    initLineddChart(id)
    
    const params = {
        "text1":"",
        "text2":"",
    }
    // draw chart    
    drawLineddChart(data, params, svg_id, draw); 

}

function initLineddChart(id){
    const margin = {top: 10, right: 100, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    const width = 570 //parentDiv.clientWidth; 
    const height = 460 - margin.top - margin.bottom;
    
    let sid = id.substring(1)+ "-svg"
    let scid = id.substring(1)+ "-svg-g"

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left)// + margin.right)
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
        .attr('stroke', 'gray')
        .call(transition);
}

export function drawLineddChart(data, params, id, draw) {
  
    // -------------------------------------------------------------- //
    // --------------------- Initializing the svg ------------------- //
    // -------------------------------------------------------------- //
    const margin = {top: 10, right: 100, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    const width = parentDiv.clientWidth; //600 - margin.left - margin.right;
    const height = 460 - margin.top - margin.bottom;
    
    let svg = d3.select(id)

    // -------------------------------------------------------------- //
    // ------------------- Creating scales and axis ----------------- //
    // -------------------------------------------------------------- //
    const x = d3.scaleBand().domain(data.map(d => d.year))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, 100]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    // -------------------------------------------------------------- //
    // ----------------------- Helper functions -------------------- //
    // -------------------------------------------------------------- //
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
    
    // -------------------------------------------------------------- //
    // --------------------- Creating the lines/path ---------------- //
    // -------------------------------------------------------------- //
    let myColors = ["#6680B3", '#762712']
   if (draw == 1){
        var line = svg
        .datum(data)
        .append("path")
        .attr("d", d3.line()
            .x(function(d) { return x(+d.year) })
            .y(function(d) { return y(+d.value) })
        )
        .attr('stroke', myColors[0])
        .style("stroke-width", 3)
        .style("fill", "none")
        .call(transition)

        var line = svg
            .datum(data)
            .append("path")
            .attr("d", d3.line()
            .x(function(d) { return x(+d.year) })
            .y(function(d) { return y(+d.value2) })
            )
            .attr('stroke', myColors[1])
            .style("stroke-width", 3)
            .style("fill", "none")
            .call(transition)
    }
    // -------------------------------------------------------------- //
    // ---------------------- Creating the legend  ------------------ //
    // -------------------------------------------------------------- //    
    var ordinal = d3.scaleOrdinal()
        .domain([params.text1, params.text2])
        .range([ myColors[0], myColors[1]]);

    svg.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", "translate(20,20)");

    var legendOrdinal = legend.legendColor()
            .shapeWidth(30)
            .cells(2)
            .shape("path", d3.symbol().type(d3.symbolSquare).size(150)())
            .shapePadding(10)
            .scale(ordinal);

    svg.select(".legendOrdinal")
        .attr("font-size", "10")
        .attr("font-weight", "bold")
        .call(legendOrdinal);
    
    // -------------------------------------------------------------- //
    // ------------------ Creating scale and axis  ------------------ //
    // -------------------------------------------------------------- //    
    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat((x,i) => {
          if ((i%5)==0){
            return x;
          }
        }))

    svg.append("text")             
          .attr("transform",
                "translate(" + (width/2) + " ," + 
                                (height - margin.top + 10) + ")")
          .style("text-anchor", "middle")
          .attr("font-weight", "bold")
          .attr("font-size", 19)
          .text("Year");

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))

    svg.select(".x.axis")
        .call(xAxis)
        // .selectAll("line")
        //     .attr("fill", "red")
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")
            .attr("font-weight", "bold")
            .attr("font-size", "8px")

    svg.select(".y.axis")
        .call(yAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("font-weight", "bold")
            .attr("font-size", "10px")
}



