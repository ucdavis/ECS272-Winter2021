import * as d3 from "d3";
import csvPath from '../assets/data/spotify_data/data_by_year_corr.csv';
// import dataByYear from '../assets/data/spotify_data/data_by_year.csv';



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
    drawBarChart(data, "#heat"); 
    //process data()
    //draw chart ()
    //There will be some delay in console before it prints the array
}


export function drawBarChart(data, id) {

    const margin = {top: 10, right: 100, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    const width = parentDiv.clientWidth;
    const height = 460 - margin.top - margin.bottom;
    

    
    console.log(data)
    // console.log(data.map(d => d.year))
    const x = d3.scaleBand()
        .domain(data.map(d => d.groups))
        // .rangeRound([margin.left - 40, width - margin.right])
        .rangeRound([margin.left, width - margin.right])
        .padding(0.2);   

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.r)]).nice()
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
    let maxValue = d3.max(data, d=> d.r); // get max value of our dataset
    let x_axisLength = (width - margin.right - margin.left); // length of x-axis in our layout
    let y_axisLength = (height - margin.top - margin.bottom); // length of y-axis in our layout

    // Select and generate rectangle elements
    svg.selectAll( "rect" )
        .data( data )
        // .enter()
        .join("rect"
        

        
        )
        .attr("x", (d) => x(d.groups))
        // Set x coordinate of each bar to index of data value (i) times dynamically calculated bar width.
        // Add left margin to account for our left margin.
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.r))
        .attr("y", (d) => y(d.r))
        .attr( "fill", "steelblue")
        
        .on("mouseover", (e,d) => {
          console.log(e)
          tooltip
           .style("visibility", "visible")
           .text("r-value: " + d.r)})
        .on("mousemove", (e,d) => tooltip
            .style("top", (e.pageY-10)+"px")
            .style("left",(e.pageX+10)+"px")
            .text("r-values: " + d.r))
        .on("mouseout", (e,d) => tooltip
        .style("visibility", "hidden"));

    
    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));
      
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
        .attr("transform", "rotate(-65)")
        .attr("font-weight", "bold");

    svg.append("g")
        .call(yAxis)
        .call(g => g.select(".tick:last-of-type text")
                .clone()
                .attr("x", -(15 - margin.top - margin.bottom) / 2)
                .attr("y", -80)
                .style("text-anchor", "middle")
                .attr("font-weight", "bold")
)

}



