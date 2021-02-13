import * as d3 from "d3";
import { color } from "d3";
import legend from "d3-svg-legend";
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
    //     const random;
    //     random = d3.randomNormal(0, 0.2);
    //     const sqrt3 = Math.sqrt(3);

    // let data2 = {
        
    //     return [].concat(
    //       Array.from({length: 300}, () => [random() + sqrt3, random() + 1, 0]),
    //       Array.from({length: 300}, () => [random() - sqrt3, random() + 1, 1]),
    //       Array.from({length: 300}, () => [random(), random() - 1, 2])
    //     );
    //   }
    // console.log('new data',data)
    // margin convention
    const margin = {top: 10, right: 100, bottom: 50, left: 200};
    const parentDiv = document.getElementById(id.substring(1));
    const visWidth = parentDiv.clientWidth;
    const visHeight = 460 - margin.top - margin.bottom;
    
    console.log(data)
    // -------------------------------------------------------------- //
    // --------------------- Initializing the svg ------------------- //
    // -------------------------------------------------------------- //
    const svg = d3.select(id).append("svg")
        .attr('width', visWidth + margin.left + margin.right)
        .attr('height', visHeight + margin.top + margin.bottom);
  
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // -------------------------------------------------------------- //
    // ------------------- Creating scales and axis ----------------- //
    // -------------------------------------------------------------- //
    let k = visHeight / visWidth;

    const x = d3.scaleTime()
        // .domain(d3.extent(data, d => {console.log(new Date(d.year)); return new Date(d.year)})).nice()
        // .domain(d3.extent(data, d => {console.log(new Date(d.year)); return new Date(d.year) * k})).nice()
        .domain(d3.extent(data, d => new Date(d.year) * k)).nice()
        .range([0, visWidth]);
    
    const y = d3.scaleLinear()
        .domain([0 , 1 * k]).nice()
        .range([visHeight, 0]);
    
    const z = d3.scaleOrdinal()
        .domain(data.map(d => d.key))
        .range(d3.schemeCategory10)

    // const xAxis = (g, x) => {
    //     // console.log('g and x', g, x);
    // return (g
    // .attr("transform", `translate(0,${visHeight})`)
    // .call(d3.axisBottom(x).ticks(12))
    // .call(g => g.select(".domain").attr("display", "none")))}
    const xAxis = (g, x) => g
    .attr("transform", `translate(0,${visHeight})`)
    .call(d3.axisBottom(x).ticks(12))
    .call(g => g.select(".domain").attr("display", "none"))

    g.append("g")
        .attr('transform', `translate(0, ${visHeight})`)
        .append('text')
        .attr('x', visWidth / 2 - 200)
        .attr('y', 40)
        .attr('fill', 'black')
        .attr('text-anchor', 'middle')
        .attr("font-weight", "bold")
        .attr("font-size", '19')
        .text('Year');


    const yAxis = (g, y) => {
        // console.log('g and y',g, y);
        return (g
        .call(d3.axisRight(y).ticks(12 * k))
        .call(g => g.select(".domain").attr("display", "none")))}
   
    g.append('g')
        .append('text')
        .attr('x', -150)
        .attr('y', visHeight - 400 )
        .attr('fill', 'black')
        .attr('dominant-baseline', 'middle')
        .attr("font-weight", "bold")
        .attr("font-size", '19')
        .text('Popularity');


    
    // -------------------------------------------------------------- //
    // ---------------------------- Zoom  --------------------------- //
    // -------------------------------------------------------------- //    
    const zoom = d3.zoom()
        .scaleExtent([0.5, 32])
        .on("zoom", zoomed);
    
    const gGrid = svg.append("g")

    const gDot = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-linecap", "round");
    gDot.selectAll("path")
        .data(data)
        .join("path")
            .attr("d", d => `M${x(new Date(d.year))},${y(d.normalized_popularity)}h0`)
            .attr("stroke", d => z(d.key))
            
    const gx = svg.append("g");

    const gy = svg.append("g");
    
    svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

    // const grid = (g, x, y) => g
    //     .attr("stroke", "currentColor")
    //     .attr("stroke-opacity", 0.1)
    //     .call(g => g
    //     .selectAll(".x")
    //     .data(x.ticks(12))
    //     .join(
    //         enter => enter.append("line").attr("class", "x").attr("y2", visHeight),
    //         update => update,
    //         exit => exit.remove()
    //     )
    //         .attr("x1", d => 0.5 + x(d))
    //         .attr("x2", d => 0.5 + x(d)))
    //     .call(g => g
    //     .selectAll(".y")
    //     .data(y.ticks(12 * k))
    //     .join(
    //         enter => enter.append("line").attr("class", "y").attr("x2", visWidth),
    //         update => update,
    //         exit => exit.remove()
    //     )
    //         .attr("y1", d => 0.5 + y(d))
    //         .attr("y2", d => 0.5 + y(d)));
    // console.log('grid', grid)

    function zoomed({transform}) {
        const grid = (g, x, y) => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g
        .selectAll(".x")
        .data(x.ticks(12))
        .join(
            enter => enter.append("line").attr("class", "x").attr("y2", visHeight),
            update => update,
            exit => exit.remove()
        )
            .attr("x1", d => 0.5 + x(d))
            .attr("x2", d => 0.5 + x(d)))
        .call(g => g
        .selectAll(".y")
        .data(y.ticks(12 * k))
        .join(
            enter => enter.append("line").attr("class", "y").attr("x2", visWidth),
            update => update,
            exit => exit.remove()
        )
            .attr("y1", d => 0.5 + y(d))
            .attr("y2", d => 0.5 + y(d)));

        const zx = transform.rescaleX(x).interpolate(d3.interpolateRound);
        const zy = transform.rescaleY(y).interpolate(d3.interpolateRound);
        gDot.attr("transform", transform).attr("stroke-width", 5 / transform.k);
        gx.call(xAxis, zx);
        gy.call(yAxis, zy);
        // console.log('gDot, gx, gy, gGrid', gDot, gx, gy, gGrid)
        gGrid.call(grid, zx, zy);
      }

    
    // -------------------------------------------------------------- //
    // -------------------------- Draw points  ---------------------- //
    // -------------------------------------------------------------- //    
    function drawPoints(data) {
      g.selectAll('circle')
        .data(data)
        .join('circle')
          .attr('opacity', 0.75)
          .attr('cx', d => x(new Date(d.year)))
          .attr('cy', d => y(d.normalized_popularity))
          .attr('fill', d =>  color(d.normalized_popularity))
          .attr('r', 4) 

          .on("mouseover", (e,d) => {
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
    
    // drawPoints(data);
    
    return Object.assign(svg.node(), {
    reset() {
        svg.transition()
            .duration(1050)
            .call(zoom.transform, d3.zoomIdentity);
    }
    });
  }