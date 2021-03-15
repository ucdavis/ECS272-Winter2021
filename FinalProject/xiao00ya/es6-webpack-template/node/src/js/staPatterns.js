import * as d3 from "d3";

import overview_data from '../assets/data/overview.csv';
import activity_data from "../assets/data/collab.csv";
// color: https://bl.ocks.org/jonsadka/5054e6a53e25a7582d4d73d3958fbbf9
// histogram: https://www.d3-graph-gallery.com/graph/histogram_basic.html
// https://observablehq.com/@d3/double-click-brush-clear brush clear
// https://bl.ocks.org/mbostock/f48fcdb929a620ed97877e4678ab15e6 brush and zoom
// https://bl.ocks.org/martinjc/7fa5deb1782da2fc6da15c3fad02c88b#script.js transition
export async function drawOverviewChart(id) {
    console.log("The id of page is: ", id);
    var data =  await d3.csv(overview_data);
    var max_value = 0;
    var max_editors_num = 0;

    for (var i = 0; i < data.length; i++) {
        if (parseFloat(data[i].age) >max_value) {
            max_value = parseFloat(data[i].age);
        }
        if (parseFloat(data[i].editor_num) >max_editors_num) {
            if (parseFloat(data[i].editor_num) < 200) {
                max_editors_num = parseFloat(data[i].editor_num);
            }
                
        } 
    }

    // const height = 0.4 * window.innerHeight;
    // const width = window.innerWidth;
    // const margin = ({top: 0, right: 0, bottom: 20, left: 0});
    const margin = { top:0, right: 30, bottom: 20, left: 30 };

    // set the dimensions and margins of the graph
    // var margin = {top: 10, right: 30, bottom: 30, left: 60},
    const width = window.innerWidth - margin.left - margin.right;
    const height = 0.35 * window.innerHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(id)
    .append("svg")
    // .attr("width", width + margin.left + margin.right)
    // .attr("height", height + margin.top + margin.bottom)
    .attr("width", width+ margin.left + margin.right + 30 )
    .attr("height", height + margin.top + margin.bottom + 30)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    
      // Add X axis
    var x = d3.scaleLinear()
    // .domain([0, max_value])
    .domain([0, max_value])
    .range([ 0, width]);

    svg.append("g")
    .attr("transform", "translate(0," + (height) + ")")
    .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([-10, 110])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Color scale: give me a specie name, I return a color
    // var color = d3.scaleOrdinal()
    // .domain(["setosa", "versicolor", "virginica" ])
    // .range([ "#440154ff", "#21908dff", "#fde725ff"])
    // var color = d3.scaleLinear().domain([1,max_editors_num]).range(["#999", "orange"]);
    const logScale = d3.scaleLog()
        .domain([1, max_editors_num])
    const color = d3.scaleSequential(
        (d) => d3.interpolateOranges(logScale(d))
        )   

    // Add dots
    var myCircle = svg.append('g')
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", function (d) { return x(parseFloat(d.age)); } )
        .attr("cy", function (d) { return y(parseFloat(d.rating)); } )
        .attr("r", 6)
        .style("fill", function (d) { return color(parseFloat(d.editor_num)) } )
        .style("opacity", 0.5)
    
      // Add brushing
    const brush = d3.brush()                 // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("start brush", updateChart)
        .on("end", update_linked_barchart);; // Each time the brush selection changes, trigger the 'updateChart' function
    svg
        .call(brush)
        .on("click", function() { 
            console.log("Clear brush!", brush.length);
            // const selection = d3.brushSelection(this);
            // console.log("test brushSelection func!", selection);
            // d3.select(this).call(brush.move, selection);
            
            myCircle.style("opacity", 0.5)
                    .style("stroke", "#00FFFFFF")
                    .style("stroke-width", 0);
            });
        // .on("contextmenu", function() {
        //     var selection = d3.brushSelection(this);
        //     console.log("The brush is:", selection);
        //     console.log("The mouse is up!");
        // });

    // Function that is triggered when brushing is performed
    function updateChart({selection}) {
        console.log("In the update chart function!!!");
        // var extent = d3.event.selection
        // myCircle.classed("selected", function(d){ return isBrushed(selection, x(parseFloat(d.age)), y(parseFloat(d.rating)) ) } )
        var selected_nodes = myCircle.filter(function(d){ 
                var flag = isBrushed(selection, x(parseFloat(d.age)), y(parseFloat(d.rating)) )
                // if (flag) {
                //     console.log("FOUND SELECT!");
                // }
                return  flag});

        selected_nodes.style("opacity", 1)
                    .style("stroke", "black")
                    .style("stroke-width", 1);

        // var selection = d3.brushSelection(this);
        // console.log("In the brushing func!", selection);
    }
    
    function update_linked_barchart({selection}){
        console.log("This is in the function after brush end");
        var selection = d3.brushSelection(this);
        var page_list = [];
        var selected_nodes = myCircle.filter(function(d){ 
            var flag = isBrushed(selection, x(parseFloat(d.age)), y(parseFloat(d.rating)) )
            if (flag) {
                page_list.push(d.page);
            }
            return  flag});
        // test part
        // console.log("Page list is: ", page_list);
        // console.log("The brush is:", selection);
        // console.log("The mouse is up!");
        
        // update the barchart:
        updateBar("add_ref","#reference",page_list);
        updateBar("add_media","#media",page_list);
        updateBar("add_info","#info",page_list);
        updateBar("reversion","#revert",page_list);
        updateBar("remove_info","#rem_info",page_list);
        updateBar("remove_media","#rem_media",page_list);

    }

    // A function that return TRUE or FALSE according if a dot is in the selection or not
    function isBrushed(brush_coords, cx, cy) {
        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
    }
}

export async function drawRefPattern(type, id) {
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 0.5 * window.innerWidth - margin.left - margin.right,
    height = 0.28 * window.innerHeight - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(id)
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // get the data
    var data =  await d3.csv(activity_data);
    // filter out the data
    data = data.filter(function(d) {
        var select = false;
        if (d.edit_type === type) {
            select = true;
        }
        return select
    })

      // X axis: scale and draw:
    var x = d3.scaleLinear()
        .domain([0, 1])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr('class', 'x axis')
        .call(d3.axisBottom(x));

    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function(d) { return d.time_column; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(20)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(data);

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0]);
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
    svg.append("g")
        .attr('class', 'y axis')
        .call(d3.axisLeft(y));

    // append the bar rectangles to the svg element
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#69b3a2")

}           



export async function updateBar(type, id, pages){
    var data =  await d3.csv(activity_data);
    data = data.filter(function(d) {
        var select = pages.includes(d.page);
        return select
    })

    data = data.filter(function(d) {
        var select = false;
        if (d.edit_type === type) {
            select = true;
        }
        return select
    })
    console.log("In the updating stage!");
            
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 0.5 * window.innerWidth - margin.left - margin.right,
    height = 0.28 * window.innerHeight - margin.top - margin.bottom;

    // d3.select(id).select("svg").remove();

    // parse data
    // const data =  await d3.csv(exampleBarData);
    // const max_y = Math.max.apply(Math, data.map(function(d) {return d.count}));
    // data = data.filter(function(d){
    //     console.log(d.category); 
    //     return d.category==type})  
    // console.log("In the drawCrimeTime function, the data is: ", data)

    // // const max_y = Math.max.apply(Math, data.map(function(d) {return d.count}));
    // console.log("Max value: ", max_y)
    

    var svg = d3.select(id).select("svg");
    
      // X axis
    var x = d3.scaleLinear()
      .domain([0, 1])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
    
    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function(d) { return d.time_column; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(20)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(data);

    // Add Y axis -- Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0]);
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);
    console.log("TEST: the maximual count - ", d3.max(bins, function(d) { return d.length; }));
    // append the bar rectangles to the svg element
    svg.selectAll("rect")
        .data(bins)
        .transition()
        .duration(2000)
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")
    
    svg.select('.y.axis')
        .transition()
        .duration(2000)
        .call(d3.axisLeft(y));

        // y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
        // svg.append("g")
        //     .call(d3.axisLeft(y));
  
    // svg.selectAll("rect")
    //     .data(data)
    //     .transition() // <---- Here is the transition
    //     .duration(2000)
    //     .attr("y", function(d) { return y(d.count); })
    //     .attr("height", function(d) { return height - y(d.count)-10; })
    //     .attr("fill", "#69b3a2")
  }

export async function updateY(type, id){
    // axis transition 
    // https://www.d3-graph-gallery.com/graph/scatter_buttonXlim.html
    var div = d3.select("body")
		    .select("div");
    		
    // d3.select(id).select("svg").remove();

    // parse data
    // const data =  await d3.csv(exampleBarData);
    var data =  await d3.csv(crimeDayData);
    const max_y_whole = Math.max.apply(Math, data.map(function(d) {return d.count}));
    data = data.filter(function(d){
        console.log(d.category); 
        return d.category==type})  
    console.log("In the drawCrimeTime function, the data is: ", data)

    const max_y = Math.max.apply(Math, data.map(function(d) {return d.count}));
    console.log("Max value: ", max_y)
    
    const margin = { top:30, right: 30, bottom: 30, left: 30 };
    const height = 0.5 * window.innerHeight;
    const width = 0.5 * window.innerWidth;
    const half_margin_left = 0.5 * margin.left;
    const half_margin_top = 0.5*margin.top;

    var svg = d3.select(id).select("svg")
    
      // X axis
    var x = d3.scaleBand()
      .range([ 0, width-margin.left-margin.right ])
      .domain(data.map(function(d) { return d.dayOfWeek; }))
      .padding(0.2);
  // Add Y axis
    var y = d3.scaleLinear()
    //   .domain([0, 13000])
      .domain([0, max_y+50])
      .range([ height-20, 0]);
      // .padding(0.1);
    
    var y_whole = d3.scaleLinear()
    //   .domain([0, 13000])
      .domain([0, max_y_whole+50])
      .range([ height-20, 0]);

     
    svg.selectAll('g').remove();
    // select('path').select(".domain").remove();

    svg.selectAll("rect")
        .data(data)
        .transition() // <---- Here is the transition
        .duration(2000)
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count)-10; })
        .attr("fill", "#69b3a2")

    var xAxis = svg.append("g")
        .attr("transform", "translate(0," + (height-10) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        // .attr("transform", "translate(-10,0)rotate(-45)")
        .attr("transform", "translate(10,10)rotate(-15)")
        .style("text-anchor", "end");
   
    var yAxis = svg.append("g")
        .call(d3.axisLeft(y_whole))
        .attr("transform", "translate(0,10)")
    yAxis.transition().duration(1000).call(d3.axisLeft(y))

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width-14)
        .attr("y", height+14 )
        .text("dayOfWeek");
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 20)
        // .attr("dy", "1.5em")
        .attr("x", 40)
        .text("Counts");


  }