import * as d3 from "d3";

export function drawBarChart(data, id) {

    const margin = { top: 50, right: 40, bottom: 90, left: 60 };
    const height = 630;
    const width = 500;

    let svg = d3.select(id).append("svg") // 선택은 말그대로 선택 
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .call(zoom);



    function zoom(svg) {
          const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];
        
    svg.call(d3.zoom()
              .scaleExtent([1, 8])
              .translateExtent(extent)
              .extent(extent)
              .on("zoom", zoomed));
        
    function zoomed(event) {
            x.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
            svg.selectAll(".bars rect").attr("x", d => x(d.date)).attr("width", x.bandwidth());
            svg.selectAll(".x-axis").call(xAxis);
          }
    }

// @ 여러 차트 보여 주기 refernce  : https://observablehq.com/@cesandoval/week-12-interaction-and-animation-d3-transitions-behavior
    //@ reference : https://observablehq.com/@d3/zoomable-bar-chart
    const x = d3.scaleBand()
        .domain(data.map(d => d.date))
        .range([margin.left, width - margin.right])
        .padding(0.1);

   // function getDate(d) {
    //  return new Date(d.jsonDate);
 // }

   // const minDate = getDate(data[0]),
    //      maxDate = getDate(data[data.length-1]);

   // const x = d3.scaleTime().domain([new Date(minDate), new Date(maxDate)])
   // .range([0, w]);
     //   .domain(d3.extent(data, d => d.date))
        //.domain([new Date(01/02/2016), new Date(01/05/2016)]);
        //.range([margin.left, width - margin.right])

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)]).nice()
        .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))


    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())


    svg.append("g")
        .attr("class", "bars")
        .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
        .attr("x", d => x(d.date))
        .attr("y", d => y(d.value))
        .attr("height", d => y(0) - y(d.value))
        .attr("width", x.bandwidth());
  
    svg.append("g")
        .attr("class", "x-axis")
        .call(xAxis)
        .call(g =>
            g .select(".tick:last-of-type text")
            .clone()
            .attr("text-anchor", "middle")
            .attr("x", -(width - margin.left - margin.right) / 2)
            .attr("y", margin.bottom - 60)
            .attr("font-weight", "bold")
            .text("Release Year")
            );
  
    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .call(g =>
            g .select(".tick:last-of-type text")
              .clone()
              .attr("transform", `rotate(-90)`)
              .attr("text-anchor", "middle")
              .attr("x", -(300 - margin.top - margin.bottom) / 2)
              .attr("y", -35)
              .attr("font-weight", "bold")
              .text("Number of Movies")
            );

}