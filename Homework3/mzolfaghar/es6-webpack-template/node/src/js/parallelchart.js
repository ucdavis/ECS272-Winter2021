import * as d3 from "d3";
import csvPath from '../assets/data/spotify_data/data_by_year.csv';
import dataByYear from '../assets/data/spotify_data/data_by_year.csv';

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

function processData(){
  // We are reducing our array into a map representing a subset of the data we are interested in 
  // const groups = data.reduce((acc , dataObj) => {

    const YearGroups = {};
    data.forEach(d=>{
      if(d.year in YearGroups){
        YearGroups[d.year].size = YearGroups[d.year].size +1;      
        YearGroups[d.year].cumulativeDanceability = YearGroups[d.year].cumulativeDanceability + d.danceability          
    }else{
      const YearGroup = {
        name: d.year,
        size: 1,
        cumulativeDanceability: d.danceability,
        average: 0
    }
    YearGroups[d.year] = YearGroup;
  }
})
//Compute the average and return an array with our data to be used for our chart
const formattedData = []
Object.keys(YearGroups).forEach(d => {
  YearGroups[d].average = YearGroups[d].cumulativeDanceability / YearGroups[d].size;
  formattedData.push(YearGroups[d]);
});

// Sort by name
formattedData.sort(function(a, b){
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
})
return formattedData

}

function drawParallelFromCsv(){
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
export async function drawParallelFromCsvAsync(){
    const data = await d3.csv(csvPath);
    console.log(data);
    drawParallelChart(data, "#parallel"); 
    //process data()
    //draw chart ()
    //There will be some delay in console before it prints the array
}


export function drawParallelChart(data, id) {

    const margin = {top: 10, right: 100, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    // const width = parentDiv.clientWidth; //600 - margin.left - margin.right;
    const width = parentDiv.width; //600 - margin.left - margin.right;
    const height = 460 - margin.top - margin.bottom;
    
    
    // Extract the list of dimensions we want to keep in the plot. Here I keep all except the column called Species
    // dimensions = d3.keys(data[0]).filter(function(d) { return d != "liveness" })

    var dimensions = ['danceability', 'energy','liveness','speechiness']

    // For each dimension, I build a linear scale. I store all in a y object
    var y = {}
    var i;
    var dname;
    for (i in dimensions) {
        dname = dimensions[i]
        y[dname] = d3.scaleLinear()
        .domain( d3.extent(data, function(d) { return +d[dname]; }) )
        .range([height, 0])
    }

    // Build the X scale -> it find the best position for each Y axis
    const x = d3.scalePoint()
          .range([0, width])
          .padding(1)
          .domain(dimensions);

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
        return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
        // .append("g")
        // .attr("transform",
        //       "translate(" + margin.left + "," + margin.top + ")");
      

    // Draw the lines
    var line = svg
                .selectAll("myPath")
                // .append('g')
                // .datum(data)
                .data(data)
                .attr("class", function (d) { return "line " + d.Species } )
                .enter().append("path")
                .attr("d",  path)
                .style("fill", "none")
                .style("stroke", "#69b3a2")
                .style("opacity", 0.5)


    // Draw the axis:
    svg.selectAll("myAxis")
    // For each dimension of the dataset I add a 'g' element:
    .data(dimensions).enter()
    .append("g")
    .attr("class", "axis")
    // I translate this element to its right position on the x axis
    .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
    // And I build the axis with the call function
    .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
    
    // Add axis title
    .append("text")
    .style("text-anchor", "middle")
    .attr("y", -9)
    .text(function(d) { return d; })
    .style("fill", "black")
       

 

}



