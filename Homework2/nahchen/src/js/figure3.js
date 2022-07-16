import * as d3 from "d3";
import csvPath from '../assets/data/Los_Angeles_International_Airport_-_Passenger_Traffic_By_Terminal.csv';
//import {ramp, legend, swatches, entity} from "./legend"
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

function data_preprocessing(ds){

        let  Groups = groupBy(ds, "ReportPeriod");
        let yearFormat = d3.timeFormat("%Y");
        let monthFormat = d3.timeFormat("%b");
        let  formattedData = [];
        Object.keys(Groups).forEach(d => {
          let initialValue = 0;
          let cumulativeValue = Groups[d].reduce((acc, curvalue) => acc + Number(curvalue.Passenger_Count), initialValue);
          
          let processedObj = {
            date: new Date(d),
            year: yearFormat(new Date(d)),
            month: monthFormat(new Date(d)),
            sum: cumulativeValue
          }
          formattedData.push(processedObj);
        });
        
        // Sort by name
        formattedData.sort(function(a, b){
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
        })
        
        return formattedData;
      

}



export async function drawScatter2(id, width = 400, height = 300){
    const margin = ({top: 130, right: 40, bottom: 40, left: 200});
    const data = await d3.csv(csvPath);
    //process data()
    const chartdata = data_preprocessing(data);
    //draw chart ()
    console.log(chartdata)
    // plot the figure in the place of id
    const svg = d3.select(id).append("svg").attr("viewBox", [0,0,width,height]); 

  
    // set up y axis scale 
    const y = d3.scaleLinear()
                .domain([2000000, d3.max(chartdata, d => d.sum)]) //our average price data ranges from 0 - Max
                .range([height - margin.bottom, margin.top]);  

    // set up x axis scale 
    const x = d3.scaleUtc()
      .domain(d3.extent(chartdata, d => d.date))
      .range([margin.left, width - margin.right])
     
    
    const max = d3.max(chartdata, d => Math.abs(d.sum))
    // scale from max to minimum
    const z = d3.scaleSequential(d3.interpolateRdBu).domain([max, 2000000]);
    
    
    /* Step 4: Draw the chart
        https://observablehq.com/@d3/selection-join
    */
   svg.selectAll('circle')
      .data(chartdata)
      .enter()
      .append('circle')
        // Circles are distributed along the x-axis
        .attr('cx', d => x(d.date))
        // Along y-axis as well, and it becomes two dimensional
        .attr('cy', d => y(d.sum))
        .attr('r', 3)
        .attr('fill', d => z(d.sum))
    
    
    /* Step 5: labeling */
    
    //initialize the location for the X Axis
    const xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(width / 80))
      .call(g => g.select(".domain").remove())
    
    // initialize the location of the Y axis
    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
    
    
   // append each to the svg so they will be rendered 
     svg.append("g")
        .call(xAxis)
        .call(g =>
        g .select(".tick:last-of-type text")
          .clone()
          .attr("transform", `rotate(0)`)
          .attr("text-anchor", "middle")
          .attr("x",0)
          .attr("y", -10)
          .attr("font-weight", "bold")
          .text("Year"));
     
  
    //color legend
    //const colorScale = d3.scaleSequential(d3.interpolateRdBu).domain([ d3.max(chartdata, d => Math.abs(d.sum)), 2000000])
    //const colorlegend = d3.legendColor().scale(colorScale)
     
    
            
    
     
    //Y label
    svg.append("g")
        .call(yAxis)
        .call(g =>
        g .select(".tick:last-of-type text")
          .clone()
          .attr("transform", `rotate(0)`)
          .attr("text-anchor", "middle")
          .attr("x",0)
          .attr("y", -45)
          .attr("font-weight", "bold")
          .text("Total Passengers")
            
      );
     
     /*   
    colorlegend = legend({
        color: d3.scaleSequential(d3.interpolateRdBu).domain([ d3.max(chartdata, d => Math.abs(d.sum)), 2000000]),
        title: "Total Passengers"
     });
    
    svg.append("g")
        .attr("transform", "translate(10, 0)") // appending a G so you can easily position it
        .append(() => colorlegend);  

    */

    

}
