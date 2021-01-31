import * as d3 from "d3";
import csvPath from '../assets/data/spotify_data/data_by_year.csv';
import dataByYear from '../assets/data/spotify_data/data_by_year.csv';



function drawHeatFromCsv(){
    //async method
    d3.csv(csvPath).then((data) => {
        // array of objects
        console.log(data.length);
        console.log(data);
        // do something with the data (e.g process and render chart)
        //  const pData = processData();
        //  drawBarChart(pData, id);
        //(data will only exist inside here since it is an async call to read in data) so all rendering and processsing with data has to occur inside the "then"
    });
}
/* 
    Same as the one above but we made the function itself asynch so we can use await
    The two do the same thing essentially but it is cleaner to read
*/
export async function drawHeatFromCsvAsync(){
    const data = await d3.csv(csvPath);
    console.log(data);
    drawHeatChart(data, "#heat"); 
    //process data()
    //draw chart ()
    //There will be some delay in console before it prints the array
}


export function drawHeatChart(data, id) {

 
    // const margin = {top: 80, right: 25, bottom: 30, left: 40},
    // width = 450 - margin.left - margin.right,
    // height = 450 - margin.top - margin.bottom;

    const margin = {top: 10, right: 100, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    const width = parentDiv.clientWidth; //600 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;

    var allGroup = ['danceability', 'energy','liveness','speechiness']
    console.log('HERE HERE HERE')
    // append the svg object to the body of the page
    let svg = d3.select(id)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // let svg = d3.select(id).append("svg")
    //     .attr("viewBox", [0, 0, width, height])
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom);

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    console.log(data)
    // var myGroups = d3.map(data, function(d){return d.year;}).keys()
    var myGroups = d3.map(data, function(d){return d.year;})
    console.log('myGroups')
    console.log(myGroups)
    var myVars = d3.map(data, function(d){return d.energy;})//.keys()
    console.log('myVars')
    console.log(myVars)
    var mapss = d3.map([{name: "foo"}, {name: "bar"}], function(d) { return d.name; });
    console.log('mapss')
    console.log(mapss)

    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(myGroups)
        .padding(0.05);
    svg
        .append("g")
        .style("font-size", 15)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()

        
    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([ height, 0 ])
        .domain(myVars)
        .padding(0.05);
    svg
        .append("g")
        .style("font-size", 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()


    // Build color scale
    var myColor = d3.scaleSequential()
        .interpolator(d3.interpolateInferno)
        .domain([1,100])

    // create a tooltip
    var tooltip = d3.select("#my_dataviz") // ("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")


    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
        tooltip
        .style("opacity", 1)
        d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }
    var mousemove = function(d) {
        tooltip
        .html("The exact value of<br>this cell is: " + d.value)
        .style("left", (d3.mouse(this)[0]+70) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function(d) {
        tooltip
        .style("opacity", 0)
        d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

    
    svg.selectAll()
        .data(data, function(d) {return d.group+':'+d.variable;})
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.group) })
            .attr("y", function(d) { return y(d.variable) })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", function(d) { return myColor(d.value)} )
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
   

   // Add title to graph
    svg.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
        .text("A d3.js heatmap");

    // Add subtitle to graph
    svg.append("text")
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", 400)
        .text("A short description of the take-away message of this chart.");

      
    
   

}



