import * as d3 from "d3";
import flightChord from "../assets/data/flightChord.csv"
import { sliderBottom } from 'd3-simple-slider';




export async function chord(id){
    const width = 350
    const height = 350
    const innerRadius = Math.min(width, height) * 0.5 - 90
    const outerRadius = innerRadius + 10
    const ribbon = d3.ribbonArrow()
                   .radius(innerRadius - 1)
                   .padAngle(1 / innerRadius)
    const arc = d3.arc()
                  .innerRadius(innerRadius)
                  .outerRadius(outerRadius)
    const chord = d3.chordDirected()
                .padAngle(10 / innerRadius)
                .sortSubgroups(d3.descending)
                .sortChords(d3.descending)

    //process data & names
    const data0 = await d3.csv(flightChord, function(d) {
        return {
          date: new Date(d.date),
          day: Number(d.day),
          source : d.source,
          target : d.target,
          value : Number(d.value)
        }
        });
    var data = data0.filter(d => d.day == 2)
    console.log(data)
  
    //const names = data.map(d => d.source).filter(onlyUnique)
    const names = ["CN", "JP", "RU", "US", "CA", "AU", "BR", "IT", "FR", "DE", "TR", "ES", "GB"]
    //color
    const color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length + 2))
    console.log(color)
    //create matrix
    function get_matrix (){
        const index = new Map(names.map((name, i) => [name, i]));
        const matrix = Array.from(index, () => new Array(names.length).fill(0));
        for (const {source, target, value} of data) matrix[index.get(source)][index.get(target)] += value;
        return matrix;
    }
    var matrix = get_matrix()

    //chorplot 
    const svg = d3.select(id).append("svg")
                  .attr("viewBox", [-width / 2, -height / 2, width, height]);

    const chords = chord(matrix);

    const group = svg.append("g")
            .attr("font-size", 10)
            .attr("font-family", "sans-serif")
            .selectAll("g")
            .data(chords.groups)
            .join("g");

    group.append("path")
      .attr("fill", d => color(names[d.index]))
      .attr("d", arc);

    group.append("text")
      .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
      .attr("dy", "0.35em")
      .attr("transform", d => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${outerRadius + 5})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
      `)
      .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
      .text(d => names[d.index]);

    group.append("title")
      .text(d => `${names[d.index]}
    ${d3.sum(chords, c => (c.source.index === d.index) * c.source.value)} outgoing →
    ${d3.sum(chords, c => (c.target.index === d.index) * c.source.value)} incoming ←`);

    svg.append("g")
        .attr("fill-opacity", 0.75)
        .selectAll("path")
        .data(chords)
        .join("path")
        .style("mix-blend-mode", "multiply")
        .attr("fill", d => color(names[d.target.index]))
        .attr("d", ribbon)
        .append("title")
        .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);
    
}