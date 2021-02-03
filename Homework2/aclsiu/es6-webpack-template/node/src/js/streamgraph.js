import * as d3 from "d3";

/** Reference: https://www.d3-graph-gallery.com/graph/streamgraph_basic.html **/
export function drawStreamGraph(data, id) {

    const margin = { top: 30, right: 80, bottom: 80, left: 65 };
    const height = 330;
    const width = 530;

    var keys = ["C", "C_sharpD_flat", "D", "D_sharpE_flat", "E", "F", "F_sharpG_flat", "G", "G_sharpA_flat", "A", "A_sharpB_flat", "B"];

    const color = d3.scaleOrdinal()
        .domain(["C", "C_sharpD_flat", "D", "D_sharpE_flat", "E", "F", "F_sharpG_flat", "G", "G_sharpA_flat", "A", "A_sharpB_flat", "B"]) // list of subgroups 
        .range(['#ba1a62', '#9dc6d8', '#00b3ca', '#7dd0b6', '#1d4e89', '#d2b29b', '#e38690', '#f69256', '#ead98b','#965251','#2fa13c','#663a82'])

    const dataStacked = d3.stack()
        .keys(["C", "C_sharpD_flat", "D", "D_sharpE_flat", "E", "F", "F_sharpG_flat", "G", "G_sharpA_flat", "A", "A_sharpB_flat", "B"])
        .offset(d3.stackOffsetWiggle)
        (data)

    const x = d3.scaleLinear()
        .domain([d3.min(data, d => d.year), d3.max(data, d => d.year)]).nice()
        .rangeRound([margin.left, width - margin.right])

    const y = d3.scaleLinear()
        .domain([d3.min(dataStacked, d => d3.min(d, d=>d[0])), d3.max(dataStacked, d => d3.max(d, d=>d[1])) ]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    let svg = d3.select(id).append("svg")
        .attr("id", "streamgraph")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

  
    const area = d3.area()
        .x(d => x(d.data.year))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))

    svg.selectAll("path")
        .data(dataStacked)
        .join("path")
        .attr("fill", d => color(d.key))
        .attr("d", area)

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")
        .text("Song Key Used Among Artists Each Year");
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2)+13)
        .attr("text-anchor", "middle")  
        .style("font-size", "10px")
        .text("How many artists use a certain song key each year?");

    svg.append("g")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)")
            .attr("font-weight", "bold")
        
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (margin.top / 2) + 280)
        .attr("text-anchor", "middle")  
        .attr("font-weight", "bold")
        .style("font-size", "10px")
        .text("Year");

    svg.append("g")
        .call(yAxis)
        .call(g => g.select(".tick:last-of-type text")
                .clone()
                .attr("transform", `rotate(-90)`)
                .attr("text-anchor", "middle")
                .attr("x", -100)
                .attr("y", (width - margin.top - margin.bottom - 470))
                .attr("font-weight", "bold")
                .text("Number of Artists Range"))

    svg.append("circle").attr("cx",470).attr("cy",30).attr("r", 3).style("fill", "#ba1a62")
    svg.append("text").attr("x", 480).attr("y", 30).text("C").style("font-size", "11px").style("font-family", "sans-serif").attr("alignment-baseline","middle")
    
    svg.append("circle").attr("cx",470).attr("cy",50).attr("r", 3).style("fill", "#9dc6d8")
    svg.append("text").attr("x", 480).attr("y", 50).text("C#/Db").style("font-size", "11px").style("font-family", "sans-serif").attr("alignment-baseline","middle")
    
    svg.append("circle").attr("cx",470).attr("cy",70).attr("r", 3).style("fill", "#00b3ca")
    svg.append("text").attr("x", 480).attr("y", 70).text("D").style("font-size", "11px").style("font-family", "sans-serif").attr("alignment-baseline","middle")
    
    svg.append("circle").attr("cx",470).attr("cy",90).attr("r", 3).style("fill", "#7dd0b6")
    svg.append("text").attr("x", 480).attr("y", 90).text("D#/Eb").style("font-size", "11px").style("font-family", "sans-serif").attr("alignment-baseline","middle")
    
    svg.append("circle").attr("cx",470).attr("cy",110).attr("r", 3).style("fill", "#1d4e89")
    svg.append("text").attr("x", 480).attr("y", 110).text("E").style("font-size", "11px").style("font-family", "sans-serif").attr("alignment-baseline","middle")
    
    svg.append("circle").attr("cx",470).attr("cy",130).attr("r", 3).style("fill", "#d2b29b")
    svg.append("text").attr("x", 480).attr("y", 130).text("F").style("font-size", "11px").style("font-family", "sans-serif").attr("alignment-baseline","middle")
    
    svg.append("circle").attr("cx",470).attr("cy",150).attr("r", 3).style("fill", "#e38690")
    svg.append("text").attr("x", 480).attr("y", 150).text("F#/Gb").style("font-size", "11px").style("font-family", "sans-serif").attr("alignment-baseline","middle")
    
    svg.append("circle").attr("cx",470).attr("cy",170).attr("r", 3).style("fill", "#f69256")
    svg.append("text").attr("x", 480).attr("y", 170).text("G").style("font-size", "11px").style("font-family", "sans-serif").attr("alignment-baseline","middle")
    
    svg.append("circle").attr("cx",470).attr("cy", 190).attr("r", 3).style("fill", "#ead98b")
    svg.append("text").attr("x", 480).attr("y", 190).text("G#/Ab").style("font-size", "11px").style("font-family", "sans-serif").attr("alignment-baseline","middle")
    
    svg.append("circle").attr("cx",470).attr("cy",210).attr("r", 3).style("fill", "#965251")
    svg.append("text").attr("x", 480).attr("y", 210).text("A").style("font-size", "11px").style("font-family", "sans-serif").attr("alignment-baseline","middle")
    
    svg.append("circle").attr("cx",470).attr("cy",230).attr("r", 3).style("fill", "#2fa13c")
    svg.append("text").attr("x", 480).attr("y", 230).text("A#/Bb").style("font-size", "11px").style("font-family", "sans-serif").attr("alignment-baseline","middle")
    
    svg.append("circle").attr("cx",470).attr("cy",250).attr("r", 3).style("fill", "#663a82")
    svg.append("text").attr("x", 480).attr("y", 250).text("B").style("font-size", "11px").style("font-family", "sans-serif").attr("alignment-baseline","middle")
}


