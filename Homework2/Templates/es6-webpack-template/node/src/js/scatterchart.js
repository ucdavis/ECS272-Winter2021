import * as d3 from "d3";
import { color } from "d3";
import csvPath from '../assets/data/spotify_data/data_by_year_updated.csv';

function drawScatterFromCsv(){
    //async method
    d3.csv(csvPath).then((data) => {
        // array of objects
        console.log(data.length);
        console.log(data);
    });
}
/* 
    Same as the one above but we made the function itself asynch so we can use await
    The two do the same thing essentially but it is cleaner to read
*/
export async function drawScatterFromCsvAsync(){
    const data = await d3.csv(csvPath);
    console.log(data);
    drawScatterChart(data, "#scatter"); 
}


export function drawScatterChart(data, id) {
    
    // margin convention
    const margin = {top: 10, right: 100, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    const visWidth = parentDiv.clientWidth;
    const visHeight = 460 - margin.top - margin.bottom;
  
    const svg = d3.select(id).append("svg")
        .attr('width', visWidth + margin.left + margin.right)
        .attr('height', visHeight + margin.top + margin.bottom);
  
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    // create scales
    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year)).nice()
        .range([0, visWidth]);
    
    const y = d3.scaleLinear()
        .domain([0,1]).nice()
        .range([visHeight, 0]);
    
    // create and add axes
    const xAxis = d3.axisBottom(x);
    
    g.append("g")
        .attr('transform', `translate(0, ${visHeight})`)
        .call(xAxis)
        .call(g => g.selectAll('.domain').remove())
      .append('text')
        .attr('x', visWidth / 2)
        .attr('y', 40)
        .attr('fill', 'black')
        .attr('text-anchor', 'middle')
        .attr("font-weight", "bold")
        .attr("font-size", '12')
        .text('Year');
    
    const yAxis = d3.axisLeft(y);
    
    g.append('g')
        .call(yAxis)
        .call(g => g.selectAll('.domain').remove())
      .append('text')
        .attr('x', -40)
        .attr('y', visHeight / 2)
        .attr('fill', 'black')
        .attr('dominant-baseline', 'middle')
        .attr("font-weight", "bold")
        .attr("font-size", '12')
        .text('Popularity');

    const grid = g.append('g')
        .attr('class', 'grid');
    
    grid.append('g')
      .selectAll('line')
      .data(y.ticks())
      .join('line')
        .attr('stroke', '#d3d3d3')
        .attr('x1', 0)
        .attr('x2', visWidth)
        .attr('y1', d => 0.5 + y(d))
        .attr('y2', d => 0.5 + y(d));
    
    grid.append('g')
      .selectAll('line')
      .data(x.ticks())
      .join('line')
        .attr('stroke', '#d3d3d3')
        .attr('x1', d => 0.5 + x(d))
        .attr('x2', d => 0.5 + x(d))
        .attr('y1', d => 0)
        .attr('y2', d => visHeight);

    // Build color scale
    var myColor = d3.scaleSequential()
                  .interpolator(d3.interpolateInferno)
                  .domain([-1,1])

    let tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-size", "12px")
        .style("z-index", "10")
        .style("background-color", "white")
        .style("border", "solid")
        .style("visibility", "hidden")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px"); 
    
    // draw points
    function drawPoints(data) {
      g.selectAll('circle')
        .data(data)
        .join('circle')
          .attr('opacity', 0.75)
          .attr('cx', d => x(d.year))
          .attr('cy', d => y(d.normalized_popularity))
          .attr('fill', d =>  color(d.normalized_popularity))
          .attr('r', 4) 

          .on("mouseover", (e,d) => {
            // console.log(e)
            tooltip
             .style("visibility", "visible")
             .text("Year:" + d.year + "; Popularity: " + (1*d.normalized_popularity).toFixed(3))})
          .on("mousemove", (e,d) => {
              tooltip
              .style("top", (e.pageY-10)+"px")
              .style("left",(e.pageX+10)+"px")
              .text("Year:" + d.year + "; Popularity: " + (1*d.normalized_popularity).toFixed(3))})
          .on("mouseout", (e,d) => tooltip
          .style("visibility", "hidden"));
    }
    
    drawPoints(data);
    
    
  }