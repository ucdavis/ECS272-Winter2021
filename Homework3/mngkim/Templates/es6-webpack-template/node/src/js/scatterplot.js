import * as d3 from "d3";
import { format } from "d3";

export function drawplot(data, id) {

//Reference :https://observablehq.com/@d3/brush-filter?collection=@d3/d3-brush


    //const margin = { top: 50, right: 40, bottom: 90, left: 100 };
    const margin = ({top: 10, right: 50, bottom: 40, left: 100});
    const height = 240;
    const width = 450;

    const x = d3.scaleLinear().domain([0, d3.max(data, d => d[0])]).nice()
        .rangeRound([margin.left, width - margin.right])

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d[1])]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    const brush = d3.brush()
       .on("start brush", ({selection}) => brushed(selection))
       .on("end", brushended);

    // data = Array.from({length: 2000}, () => [Math.random() * width, Math.random() * height])
    //data = Array.from({length: 2}, () => [data, d => d.dayofweek, data, d => d.incidents])

    let svg = d3.select(id)    // let  블록안에서만 쓸 수 있는 변수. ES6에서는 var  보다 let 
        .append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
        //.append("g")
       // .attr("transform",   // make small ? 
 
   const point = svg.append("g")
       //.attr("fill", "#ccc")
       .attr("fill", "blue")
       .attr("stroke", "#777")
     .selectAll("circle")
     .data(data)
     .join("circle")
   //    .attr("cx", d=>x(d[0])) 
   //    .attr("cy", d=>y(d[1]))
       //      .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`)
        .attr("cx", function(d) {return x(d[0]);})  
        .attr("cy", function(d) {return y(d[1]);}) 
        //.text(function(d){return x(d[0]);})  왜 라벨이 안 나오지..
        .attr("r", 3.5);


      // 라벨링 하기 
       // svg.selectAll("text")
       // .data(data).enter()
       // .append("text")
       // .attr("x", function(d) {return x(d[0])+4})
       // .attr("y", function(d) {return y(d[1])+4})
       // .text(function(d) {return x(d[0]) + ", " + y(d[1])})
       // .attr("font-size", "9px");

   // svg.append("g")
   //   .attr("class", "brush")
   //   .call(brush)
     // .call(brush.move, [[100, 100], [200, 200]])
      //.call(g => g.select(".overlay").style("cursor", "default"));

      svg.append("g")
      .call(brush)
      .call(brush.move, defaultExtent);
 
   function brushed(selection) {
     point.attr("fill", selection && (d => contains(selection, d) ? "red" : null));// 조건연산자 ? true 일때,  : flase 일떄 
     ////point.text(function(d){return d[0];})
   }

   //function contains([[x0, y0], [x1, y1]], [x, y]) {
    //return x >= x0 && x < x1 && y >= y0 && y < y1;
    //return x >= x0 && x < x1 &&    y < y0 && y >= y1 ;
//}

    function contains([[x0, y0], [x1, y1]], [X, Y]) {
      return Number(x(X)) >= x0 && Number(x(X)) < x1 && Number(y(Y)) > y0 && Number(y(Y)) <= y1;
    }
 
   function brushended({sourceEvent, selection}) {
     if (!sourceEvent) return; // Only transition after interaction.
     d3.select(this).transition()
         .delay(100) // 애니메이션의 시작시간의 지정
         .duration(selection ? 750 : 0) // 실행 시간, 단위는 초 
         .call(brush.move, defaultExtent);
   }


  const xAxis = g => g
 // .attr("transform", `translate(0,${height - margin.bottom})`)
   .attr("transform", `translate(0,${height - margin.bottom})`) // 지정한 크기만큼 x축, y축 이동
  .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))


const yAxis = g => g
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(y))
  .call(g => g.select(".domain").remove())  // remove y line


  svg.append("g")
  .call(xAxis)
  .call(g =>
      g .select(".tick:last-of-type text")
      .clone()
      .attr("text-anchor", "middle")
      .attr("x", -180)
      .attr("y", 30)
      .attr("font-weight", "bold")
      .text("Budget")
      );

svg.append("g")
  .call(yAxis)
  .call(g =>
  g .select(".tick:last-of-type text")
    .clone()
    .attr("transform", `rotate(-90)`)
    .attr("text-anchor", "middle")
    .attr("x", -(250 - margin.top - margin.bottom) / 2)
    .attr("y", -90)
    .attr("font-weight", "bold")
    .text("Revinue of Movie")
)

  const defaultExtent = [[width * 0.2, width * 0.2], [width * 0.4, width * 0.4]]
}