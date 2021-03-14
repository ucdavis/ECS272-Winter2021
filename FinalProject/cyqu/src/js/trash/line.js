import * as d3 from "d3";
import csvPath from '../assets/data/Los_Angeles_International_Airport_-_Passenger_Traffic_By_Terminal.csv';
import flightDaily from "../assets/data/flightDaily.csv"
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

function data_processing(ds){
    let formattedData = []
    Object.keys(ds).forEach(d => {
        let processedObj = {
            date: new Date(ds[d].date),
            count: Number(ds[d].count)
        }
        formattedData.push(processedObj)
    })
    return formattedData
}

export async function drawLine(id){
    const width = 600
    const height = 300
    const margin = ({top: 80, right: 40, bottom: 40, left: 80});
    const data = await d3.csv(flightDaily);
    //console.log(data)
    //process data()
    const chartdata = data_processing(data)
    //console.log(chartdata)
    // plot the figure in the place of id

    
    const svg = d3.select(id).append("svg")
      .attr("viewBox", [0, 0, width, height]);

    const zx =  d3.scaleUtc()
                    .domain(d3.extent(chartdata, d => d.date))
                    .range([margin.left, width - margin.right]); // x, but with a new domain.
    const y = d3.scaleLinear()
                .domain([d3.min(chartdata, d => d.count), d3.max(chartdata, d => d.count)])
                .range([height - margin.bottom, margin.top])
    const line = d3.line()
        .x(d => zx(d.date))
        .y(d => y(d.count));


    const xAxis = (g, scale = zx) => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(scale).ticks(width / 80).tickSizeOuter(0))
    
    const yAxis = (g, scale = y) => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(scale).ticks(height / 40))
        .call(g => g.select(".domain").remove())
    
    const gx = svg.append("g")
        .call(xAxis, zx);

    const gy = svg.append("g")
        .call(yAxis, y)
        .call(g =>
        g .select(".tick:last-of-type text")
            .clone()
            .attr("transform", `rotate(0)`)
            .attr("text-anchor", "middle")
            .attr("x",-30)
            .attr("y", -35)
            .attr("font-weight", "bold")
            .text("Total Flight")
            
        );


    d3.select("#start").on("click", function() {
        //initialize a path
        const path = svg.append("path")
        .datum(chartdata)
        .attr("id", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", line);

    


        //set the animation
        var totalLength = path.node().getTotalLength();

        // Set Properties of Dash Array and Dash Offset and initiate Transition
        svg.attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition() // Call Transition Method
        .duration(4000) // Set Duration timing (ms)
        .ease(d3.easeLinear) // Set Easing option
        .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition
            });
            
    // Reset Animation
    d3.select("#reset").on("click", function() {
        d3.select("#line").remove();
            });
            

    // brush   
    const area = (x, y) => d3.area()
    .defined(d => !isNaN(d.count))
    .x(d => x(d.date))
    .y0(y(0))
    .y1(d => y(d.count))     
    const brush = d3.brushX()
            .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom + 0.5]])
            .on("brush", brushed)
            .on("end", brushended);
      
    const defaultSelection = [230, 350];
      
    const gb = svg.append("g")
            .call(brush)
            .call(brush.move, defaultSelection);
      
    function brushed({selection}) {
          if (selection) {
            svg.property("value", selection.map(zx.invert, zx).map(d3.utcDay.round));
            svg.dispatch("input");
          }
    }
      
    function brushended({selection}) {
          if (!selection) {
            gb.call(brush.move, defaultSelection);
          }
    }
      
    let brushExtent = brush.extent();
      
      
    Object.assign(svg.node(), {
          update(focusX, focusY) {
            gx.call(xAxis, focusX, height);
            gy.call(yAxis, focusY, data.y);
            path.attr("d", area(focusX, focusY));
          }
        });
        
        
      
      

    //return svg.node()

}

