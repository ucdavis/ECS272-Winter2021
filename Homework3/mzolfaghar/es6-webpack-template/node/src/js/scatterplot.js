import * as d3 from "d3";
import csvPath from '../assets/data/spotify_data/data_by_year_interaction.csv';

export async function drawScatterFromCsvAsync(){
    const data = await d3.csv(csvPath);
    console.log(data);
    drawScatterChart(data, "#scatter"); 
}


export function drawScatterChart(data, id) {
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
        .domain(d3.extent(data, d => new Date(d.year) * k)).nice()
        .range([0, visWidth]);
    
    const y = d3.scaleLinear()
        .domain([0 , 100 * k]).nice()
        .range([visHeight, 0]);
    
    const z = d3.scaleOrdinal()
        .domain(data.map(d => d.key))
        .range(d3.schemeCategory10)

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
        return (g
        .call(d3.axisRight(y).ticks(12 * k))
        .call(g => g.select(".domain").attr("display", "none")))}
   
    g.append('g')
        .append('text')
        .attr('x', -150)
        .attr('y', visHeight - 390 )
        .attr('fill', 'black')
        .attr('dominant-baseline', 'middle')
        .attr("font-weight", "bold")
        .attr("font-size", '19')
        .text('Popularity');

    g.append('g')
        .append('text')
        .attr('x', -55)
        .attr('y', visHeight - 390 )
        .attr('fill', 'black')
        .attr('dominant-baseline', 'middle')
        .attr("font-weight", "bold")
        .attr("font-size", '12')
        .text('(Zoom in/out)');

    // -------------------------------------------------------------- //
    // ---------------------------- Zoom  --------------------------- //
    // -------------------------------------------------------------- //    
    const zoom = d3.zoom()
        .scaleExtent([0.5, 32])
        .on("zoom", zoomed);
    
    const gGrid = svg.append("g")

    const gDot = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "gray") 
        .attr('opacity', '.7')
        .attr('stroke', 'black')
        .attr('stroke-width', '.7px')
        .attr("stroke-linecap", "round");

    gDot.selectAll("path")
        .data(data)
        .join("path")
            .attr("d", d => `M${x(new Date(d.year))},${y(d.normalized_popularity)}h0`)
            
    const gx = svg.append("g");

    const gy = svg.append("g");
    
    svg.call(zoom).call(zoom.transform, d3.zoomIdentity);

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
        gGrid.call(grid, zx, zy);
      }

    
    return Object.assign(svg.node(), {
    reset() {
        svg.transition()
            .duration(1050)
            .call(zoom.transform, d3.zoomIdentity);
    }
    });
  }