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

function drawBarFromCsv(){
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
export async function drawBarFromCsvAsync(){
    const data = await d3.csv(csvPath);
    console.log(data);
    drawBarChart(data, "#bar"); 
    //process data()
    //draw chart ()
    //There will be some delay in console before it prints the array
}


export function drawBarChart(data, id) {

    // const margin = { top: 40, right: 40, bottom: 120, left: 100 };
    // const height = 300;
    // const width = 500;
    // const height = 500;
    // const width = 600;

    const margin = {top: 10, right: 100, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    const width = parentDiv.clientWidth; //600 - margin.left - margin.right;
    const height = 460 - margin.top - margin.bottom;
    

    
    // console.log(data)
    // console.log(data.map(d => d.year))
    const x = d3.scaleBand().domain(data.map(d => d.year))
        // .rangeRound([margin.left - 40, width - margin.right])
        .rangeRound([margin.left, width - margin.right])
        .padding(0.2);   

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.danceability)]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
      
    let tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-size", "12px")
        .style("z-index", "10")
        .style("visibility", "hidden"); 

    // Get length of dataset
    let arrayLength = data.length; // length of dataset
    let maxValue = d3.max(data, d=> d.danceability); // get max value of our dataset
    let x_axisLength = (width - margin.right - margin.left); // length of x-axis in our layout
    let y_axisLength = (height - margin.top - margin.bottom); // length of y-axis in our layout

    // Select and generate rectangle elements
    svg.selectAll( "rect" )
        .data( data )
        // .enter()
        .join("rect"
        

        
        )
        .attr("x", (d) => x(d.year))
        // .attr( "x", (d,i) => (i*(x_axisLength/arrayLength) + margin.left)) 
        // Set x coordinate of each bar to index of data value (i) times dynamically calculated bar width.
        // Add left margin to account for our left margin.
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.danceability))
        .attr("y", (d) => y(d.danceability))
        // .attr( "y", d => (height - y(d.danceability)) )  
        // Set y coordinate using yScale. 
        // .attr( "width", (x_axisLength/arrayLength) - 1 )    
        // Set bar width using length of array, with 1px gap between each bar.
        // .attr( "height", d => y(d.danceability) - y(0))                         
        // Set height of rectangle to data value, accounting for bottom margin.
        .attr( "fill", "steelblue")
        
        .on("mouseover", (e,d) => {
          // console.log(e)
          tooltip
           .style("visibility", "visible")
           .text('Year:', d.year + "; danceability: " + d.danceability)})
        .on("mousemove", (e,d) => tooltip
            .style("top", (e.pageY-10)+"px")
            .style("left",(e.pageX+10)+"px")
            .text('Year:' + d.year + "; danceability: " + d.danceability))
        .on("mouseout", (e,d) => tooltip
        .style("visibility", "hidden"));

    // svg.selectAll("rect")
    //     .data(data)
    //     .join("rect")
    //     .attr("x", (d) => x(d.year))
    //     .attr("y", (d) => y(d.danceability))
    //     .attr("width", x.bandwidth())
    //     .attr("height", d => y(0) - y(d.danceability))
    //     .attr("fill", "green");

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        // .call(d3.axisBottom(x)).ticks(2);
        .call(d3.axisBottom(x).tickFormat((x,i) => {
          if ((i%3)===0) {
            console.log(x);
            return x;
           }
            }))

      
      // .call(g => g.append("text")
      //   .attr("x", 200)//width - margin.right)
      //   .attr("y", 0)
      //   .attr("transform", "rotate(-90)")
      //   .attr("fill", "#000")
      //   .attr("font-weight", "bold")
      //   .attr("text-anchor", "end")
      //   .text(data.x))
        // .text('Year'))
    
        // text label for the x axis
      svg.append("text")             
          .attr("transform",
                "translate(" + (width/2) + " ," +  //was width/2
                                (height - margin.top) + ")")
          .style("text-anchor", "middle")
          .attr("font-weight", "bold")
          .attr("font-size", 13)
          .text("Year");

        // .call(d3.axisBottom(x).tickFormat(function(d,i){ return !(d%10)}))
        // .call(d3.axisBottom(x))
        // .tickValues(x.domain().filter(function(x,i){ return !(i%10)}));
        // .call(d3.axisBottom(x).ticks(d3.timeYear.every(10)))

    // const yAxis = g => g
    //     .attr("transform", `translate(${margin.left},0)`)
    //     .call(d3.axisLeft(y))
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
        .attr("font-weight", "bold")
        .text('Danceability'))

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        // .attr("dx", "-.01em")
        // .attr("dy", ".0em")
        .attr("transform", "rotate(-65)")
        .attr("font-weight", "bold");

    svg.append("g")
        .call(yAxis)
        .call(g => g.select(".tick:last-of-type text")
                .clone()
                // .attr("transform", `rotate(-90)`)
                // .attr("text-anchor", "middle")
                .attr("x", -(15 - margin.top - margin.bottom) / 2)
                .attr("y", -80)
                .style("text-anchor", "middle")
                .attr("font-weight", "bold")
                // .text('Danceability')
                
)


// .call(g => g.append("text")
//         .attr("x", 200)//width - margin.right)
//         .attr("y", 0)
//         .attr("transform", "rotate(-90)")
//         .attr("fill", "#000")
//         .attr("font-weight", "bold")
//         .attr("text-anchor", "end")
//         .text(data.y))
//         // .text('Year'))
    
//         // text label for the x axis
//       svg.append("text")             
//           .attr("transform",
//                 "translate(" + (height + margin.top) + " ," +  //was width/2
          //                       (height/2) + ")")
          // .style("text-anchor", "start")
          // .attr("transform", `rotate(-90)`)           
          // .attr("font-weight", "bold")
          // .attr("font-size", 13)
          // .text("Danceabiity");


      // // text label for the x axis
      // svg.append("text")  
      
      // .attr("transform", 
      //       "translate(" + (margin.top - margin.bottom + 2-- ) + " ," +  //was width/2
      //                       (height/2) + ")")
      // .style("text-anchor", "middle")
      // .attr("transform", `rotate(-90)`)           
      // .attr("font-weight", "bold")
      // .attr("font-size", 13)
      // .text("Danceability");
}



