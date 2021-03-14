import * as d3 from "d3";
import flightChord from "../assets/flights/flight_int_month.csv"



export async function chord(target_cty = "China", month = "201912"){
    var parseDate = d3.timeParse("%Y%m")
    var mon = parseDate(month)
    var formatDate = d3.timeFormat("%b, %Y")
    var margin = {top: 50, right: 60, bottom: 10, left: 0},
            width = 600 - margin.left - margin.right,
            height = 420 - margin.top - margin.bottom;

    const innerRadius = Math.min(width, height) * 0.5 - 50
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
          source : d.source,
          target : d.target,
          name_origin_country: d.name_origin_country,
          name_destination_country: d.name_destination_country,
          month: d.month,
          value : Number(d.value)
        }
        });
    var data = data0.filter(d => (d.name_origin_country == target_cty || d.name_destination_country == target_cty) && d.month == month )
    console.log(data)
    var total = 0
    data.forEach(d => {
      total += d.value
    })
    var thres = total / data.length * 0.6
    console.log(thres)
    data = data.filter(d => d.value > thres)

    /*
    const thres = 300
    var data = []
    var OtherSource = 0
    var OtherTarget = 0 
    var iso_cty 
    data0.forEach(d => {
      let processedObj
      // larger than thres push to data
      if (d.value > thres && (d.name_origin_country == target_cty || d.name_destination_country == target_cty) && d.month == month ){
        processedObj = {
          source: d.source,
          target: d.target,
          value: d.value
        }
        data.push(processedObj)
      }else{
        if (d.name_origin_country == target_cty){
          iso_cty = d.source
          OtherSource += d.value
        }else{
          OtherTarget += d.value
        }
      }
      //smaller than threshold 
    })
    console.log(data)
    //data.push(["source": "Others"])
    data.push({
      source: "Others",
      target: iso_cty,
      value: OtherSource
    })
    data.push({
      source: iso_cty, 
      target: "Others",
      value: OtherTarget
    })

    */


    console.log(data)
  
    
    var names =  Array.from(new Set(data.flatMap(d => [d.source, d.target])))
    //names = names.slice(0,8)
    console.log(names)
    //const names = ["CN", "JP", "RU", "US", "CA", "AU", "BR", "IT", "FR", "DE", "TR", "ES", "GB"]
    //color
    const color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length + 1))
    console.log(color)
    //create matrix
    function get_matrix (){
        const index = new Map(names.map((name, i) => [name, i]));
        const matrix = Array.from(index, () => new Array(names.length).fill(0));
        for (const {source, target, value} of data) matrix[index.get(source)][index.get(target)] += value;
        return matrix;
    }
    var matrix = get_matrix()
    console.log(matrix)
    //chorplot 
    d3.select("#chord").selectAll("*").remove()
    const svg = d3.select("#chord").append("svg")
                  .attr("viewBox", [-width / 3, -height / 2, width, height])
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  //.attr("transform", "translate(" + (margin.left + width / 3) + "," + (margin.top + height / 3) + ")");
    svg.append("text")
                .attr("x", margin.left + width / 8)             
                .attr("y", margin.top + height / 3)
                .attr("text-anchor", "middle")  
                .style("font-size", "16px") 
                .style("text-decoration", "bold")  
                .text("International flight flow for " + target_cty + " in " + formatDate(mon));
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