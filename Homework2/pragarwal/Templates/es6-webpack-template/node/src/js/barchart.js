import * as d3 from "d3";

export function drawBarChart(data, id) {

    const margin = {top: 0, right: 10, bottom: 100, left: 70};
    const height = 1000;
    const width = 500;

    const x = d3.scaleBand()
                .domain(chartData.map(d => d.name))
                .rangeRound([margin.left, width-margin.right])
                .padding(0.5);

    const y = d3.scaleLinear()
                .domain([0, d3.max(chartData, d => d.average)])
                .nice()
                .rangeRound([height-margin.bottom, margin.top]);

    const color = d3.scaleOrdinal()
                    .range(["#23171b","#4a58dd","#2f9df5","#27d7c4","#4df884","#95fb51",
                            "#dedd32","#ffa423","#f65f18","#ba2208","#900c00","#6e40aa",
                            "#6054c8","#4c6edb","#368ce1","#23abd8","#1ac7c2","#1ddfa3",
                            "#30ef82","#52f667","#7ff658","#aff05b"]);

    let colorColumn = "average";

    let svg = d3.select(id).append("svg")
                .attr("viewBox", [0, 0, width, height])
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);
            
    
    
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr('x', d => x(d.name))  
        .attr('y', d => y(d.average))
        .attr("width", x.bandwidth()) 
        .attr("height", d => height - margin.bottom - y(d.average)) 
        .attr("fill", (d) => color(d[colorColumn]));

    
    const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "middle")
    .attr("x", function(d,i){
                    return x(i) + x.bandwidth() / 2;
                  })
    .attr("y", d => {height - margin.bottom - 500})
    .attr("transform", "rotate(-90)")
    .attr("font-family" , "sans-serif")
    .attr("font-size" , "11px")
  
    const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))

    
    svg.append("g")
        .call(xAxis)
        .call(g =>
      g .select(".tick:last-of-type text")
        .clone()
        .attr("text-anchor", "middle")
        .attr("x", -(width - margin.left - margin.right) / 2)
        .attr("y", margin.bottom - 10)
        .attr("font-weight", "bold")
        .text("Type Description")
      );

    svg.append("g")
        .call(yAxis)
        .call(g =>
    g .select(".tick:last-of-type text")
      .clone()
      .attr("transform", `rotate(-90)`)
      .attr("text-anchor", "middle")
      .attr("x", (-1000 - margin.top - margin.bottom) / 2)
      .attr("y", -50)
      .attr("font-weight", "bold")
      .text("Average Score")
      ); 

}






// export function drawBarChart(data, id) {

//     const margin = { top: 40, right: 40, bottom: 120, left: 100 };
//     const height = 300;
//     const width = 500;

//     const x = d3.scaleBand().domain(data.map(d => d.y))
//         .rangeRound([margin.left, width - margin.right])
//         .padding(0.1);

//     const y = d3.scaleLinear().domain([0, d3.max(data, d => d.x)]).nice()
//         .rangeRound([height - margin.bottom, margin.top]);

//     let svg = d3.select(id).append("svg")
//         .attr("viewBox", [0, 0, width, height])
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom);

//     svg.selectAll("rect")
//         .data(data)
//         .join("rect")
//         .attr("x", d => x(d.y))
//         .attr("y", d => y(d.x))
//         .attr("width", x.bandwidth())
//         .attr("height", d => y(0) - y(d.x))
//         .attr("fill", "green");

//     const xAxis = g => g
//         .attr("transform", `translate(0,${height - margin.bottom})`)
//         .call(d3.axisBottom(x))

//     const yAxis = g => g
//         .attr("transform", `translate(${margin.left},0)`)
//         .call(d3.axisLeft(y))

//     svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis)
//         .selectAll("text")
//         .style("text-anchor", "end")
//         .attr("dx", "-.8em")
//         .attr("dy", ".15em")
//         .attr("transform", "rotate(-65)")
//         .attr("font-weight", "bold");

//     svg.append("g")
//         .call(yAxis)
//         .call(g => g.select(".tick:last-of-type text")
//                 .clone()
//                 .attr("transform", `rotate(-90)`)
//                 .attr("text-anchor", "middle")
//                 .attr("x", -(15 - margin.top - margin.bottom) / 2)
//                 .attr("y", -80)
//                 .attr("font-weight", "bold"))
// }



