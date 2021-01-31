import * as d3 from "d3";
// import csvPath from '../assets/data/spotify_data/data_by_year_updated.csv';
import csvPath from '../assets/data/spotify_data/data_by_artist_updated.csv';
import dataByYear from '../assets/data/spotify_data/data_by_year.csv';


function drawBarddgFromCsv(){
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
export async function drawBarddgFromCsvAsync(){
    const data = await d3.csv(csvPath);
    console.log(data);
    drawBarddgChart(data, "#bardd_g"); 
    //process data()
    //draw chart ()
    //There will be some delay in console before it prints the array
}


export function drawBarddgChart(data, id) {

    // const margin = { top: 40, right: 40, bottom: 120, left: 100 };
    // const height = 300;
    // const width = 500;
    // const height = 500;
    // const width = 600;

    const margin = {top: 10, right: 100, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    const width = parentDiv.clientWidth; //600 - margin.left - margin.right;
    // const width = parentDiv.width;
    const height = 460 - margin.top - margin.bottom;
    
    var allGroup = ['danceability', 'energy','liveness','speechiness','average_popularity']
    
    // add the options to the button
    d3.select("#selectButtonG")
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


    // console.log(data)
    // console.log(data.map(d => d.year))
    const x = d3.scaleBand().domain(data.map(d => d.artists))
        // .rangeRound([margin.left - 40, width - margin.right])
        .rangeRound([margin.left, width - margin.right])
        .padding(0.2);   

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.average_popularity)]).nice()
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

    var line = svg
        .append('g')
        .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) { return x(+d.artists) })
          .y(function(d) { return y(+d.danceability) })
        )
        // .attr("stroke", function(d){ return myColor("danceability") })
        .attr('stroke', 'gray')
        .style("stroke-width", 4)
        .style("fill", "none")

    // Get length of dataset
    let arrayLength = data.length; // length of dataset
    let maxValue = d3.max(data, d=> d.danceability); // get max value of our dataset
    let x_axisLength = (width - margin.right - margin.left); // length of x-axis in our layout
    let y_axisLength = (height - margin.top - margin.bottom); // length of y-axis in our layout


    // A function that update the chart
    function update(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = data.map(function(d){return {artists: d.artists, value:d[selectedGroup]} })

      // Give these new data to update line
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(+d.artists) })
            .y(function(d) { return y(+d.value) })
          )
          // .attr("stroke", function(d){ return myColor(selectedGroup) })
          .attr('stroke', 'gray')
    }

// When the button is changed, run the updateChart function
d3.select("#selectButtonG")
  .on("change", function(d) {
  // recover the option that has been chosen
  var selectedOption = d3.select(this).property("value")
  // run the updateChart function with this selected option
  update(selectedOption)
})

    // // Select and generate rectangle elements
    // svg.selectAll( "rect" )
    //     .data( data )
    //     // .enter()
    //     .join("rect"
        

        
    //     )
    //     .attr("x", (d) => x(d.year))
    //     // .attr( "x", (d,i) => (i*(x_axisLength/arrayLength) + margin.left)) 
    //     // Set x coordinate of each bar to index of data value (i) times dynamically calculated bar width.
    //     // Add left margin to account for our left margin.
    //     .attr("width", x.bandwidth())
    //     .attr("height", d => y(0) - y(d.danceability))
    //     .attr("y", (d) => y(d.danceability))
    //     // .attr( "y", d => (height - y(d.danceability)) )  
    //     // Set y coordinate using yScale. 
    //     // .attr( "width", (x_axisLength/arrayLength) - 1 )    
    //     // Set bar width using length of array, with 1px gap between each bar.
    //     // .attr( "height", d => y(d.danceability) - y(0))                         
    //     // Set height of rectangle to data value, accounting for bottom margin.
    //     .attr( "fill", "steelblue")
        
    //     .on("mouseover", (e,d) => {
    //       // console.log(e)
    //       tooltip
    //        .style("visibility", "visible")
    //        .text('Year:', d.year + "; danceability: " + d.danceability)})
    //     .on("mousemove", (e,d) => tooltip
    //         .style("top", (e.pageY-10)+"px")
    //         .style("left",(e.pageX+10)+"px")
    //         .text('Year:' + d.year + "; danceability: " + d.danceability))
    //     .on("mouseout", (e,d) => tooltip
    //     .style("visibility", "hidden"));

   

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        // .call(d3.axisBottom(x)).ticks(2);
        .call(d3.axisBottom(x).tickFormat((x,i) => {
          if ((i%3)===0) {
            console.log(x);
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
          .text("artists");

       
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

}



