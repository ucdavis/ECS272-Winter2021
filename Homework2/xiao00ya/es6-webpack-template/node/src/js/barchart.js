import * as d3 from "d3";
import csvPath from '../assets/data/SF_Historical_Ballot_Measures.csv';
import exampleBarData from '../assets/data/example_bar.csv';
import crimeDayData from '../assets/data/crime_day1.csv';

export async function drawCrimeTimeBarChart(type, id) {
    d3.select(id).select("svg").remove();

    // parse data
    // const data =  await d3.csv(exampleBarData);
    var data =  await d3.csv(crimeDayData);

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
    
    console.log("The DOM object id is: ", id)
    var svg = d3.select(id)
                .append("svg")
                .attr("width", width- margin.left - margin.right)
                .attr("height", height- margin.top - margin.bottom)
                .attr("viewBox", [0, 0, width-margin.left-margin.right, height+ margin.top])
                .attr("transform", "translate(" + half_margin_left+ "," + margin.top + ")")
                .style("background-color", 'white');

                // .append("g")
                // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    // svg.append("rect")
    //     .attr("width", width- margin.left - margin.right)
    //     .attr("height", height- margin.top - margin.bottom)
    //     .attr("fill", "white");
     
    // sort data
    // data.sort(function(b, a) {
    //     return a.count - b.count;
    //   });
    
    
    console.log("The ordered data is: ", data);
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

    // Bars
    // svg.selectAll("mybar")
    //     .data(data)
    //     .enter()
    //     .append("rect")
    //     .attr("x", function(d) { return x(d.Country); })
    //     .attr("y", function(d) { return y(d.Value); })
    //     .attr("width", x.bandwidth())
    //     .attr("height", function(d) { return height - y(d.Value); })
    //     .attr("fill", "#69b3a2")
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", function(d) { return x(d.dayOfWeek); })
        .attr("y", function(d) { return y(d.count); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.count)-10; })
        .attr("fill", "#69b3a2")



    svg.append("g")
        .attr("transform", "translate(0," + (height-10) + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        // .attr("transform", "translate(-10,0)rotate(-45)")
        .attr("transform", "translate(10,10)rotate(-15)")
        .style("text-anchor", "end");
    

    svg.append("g")
        .call(d3.axisLeft(y))
        .attr("transform", "translate(0,10)")
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
function drawBarFromCsv(){
    //async method
    d3.csv(csvPath).then((data) => {
        // array of objects
        console.log(data.length);
        console.log(data);
        
        // do something with the data (e.g process and render chart)
        //  const pData = processData();
        //  drawBarChart(pData, id);
        //(data will only exist inside here since it is an async call to read in data) so all rendering and processsing with data has to occur inside the "then"
    });
}
/* 
    Same as the one above but we made the function itself asynch so we can use await
    The two do the same thing essentially but it is cleaner to read
*/


export async function testDrawStreamGraph(){
    const data = await d3.csv(csvPath);
    // console.log("D3 info!!!: ", d3.version); //6.3.1 version
    console.log(data); 
    //process data()
    //draw chart ()
    //There will be some delay in console before it prints the array
}


export function drawBarChart(data, id) {
    console.log("The width of window content is " + window.innerWidth);
    console.log("The height of window content is " + window.innerHeight);
    const margin = { top: 40, right: 40, bottom: 120, left: 100 };
    const height = 0.5*window.innerHeight;
    const width = 0.5*window.innerWidth;

    const x = d3.scaleBand().domain(data.map(d => d.y))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.x)]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height+ margin.top+ margin.bottom])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.y))
        .attr("y", d => y(d.x))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.x))
        .attr("fill", "green");

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        .attr("font-weight", "bold");

    svg.append("g")
        .call(yAxis)
        .call(g => g.select(".tick:last-of-type text")
                .clone()
                .attr("transform", `rotate(-90)`)
                .attr("text-anchor", "middle")
                .attr("x", -(15 - margin.top - margin.bottom) / 2)
                .attr("y", -80)
                .attr("font-weight", "bold"))
}


