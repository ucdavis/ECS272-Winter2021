import * as d3 from "d3";
import csvPath from '../assets/data/Los_Angeles_International_Airport_-_Passenger_Traffic_By_Terminal.csv';

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

function data_preprocessing(ds, property){
    let  Groups = groupBy(ds, property);
    console.log(Groups)
    let  formattedData = [];
    Object.keys(Groups).forEach(d => {
        let initialValue = 0;
        let cumulativeValue = Groups[d].reduce((acc, curvalue) => acc + Number(curvalue.Passenger_Count), initialValue);
        let average = cumulativeValue / Groups[d].length ;
        console.log(average)
        //console.log(cumulativeValue)
        let processedObj = {
            name: d,
            average: average
    }
    formattedData.push(processedObj);
    });
  
    // Sort by name
    formattedData.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    })
    return formattedData

}

export async function drawBarFromCsvAsync(){
    const data = await d3.csv(csvPath);
    console.log(data); 
    //process data()
    const chartdata = data_preprocessing(data, "Terminal");
    //draw chart ()

    const svg = d3.create("svg").attr("viewBox", [0,0,width,height]); 
    const margin = { top: 40, right: 40, bottom: 120, left: 100 };
    const height = 600;
    const width = 500;
  
    /* Step 3: Set up our scales 
     For this example we are viewing categorical data (neighborhood groups) 
     along with the average price (quantative data). We need a way to map our data to where it should be 
     rendered within the svg. To achieve this we use d3's scale functions, specifically their linear scale for 
     our quantative data and scaleBand for the categorical data. What the scale will do is map the domain to a 
     position within the svg.
    */
  
    //Set up our X axis scale 
    /* 
    A good explanation on scaleLinear (https://observablehq.com/@d3/d3-scalelinear)
    Usually, the domain will be in the observation’s unit (Celsius degrees, US dollars, seconds…), 
    and the range in screen or print unit (pixels, millimeters… or even CSS colors).
   
    (Margin is a global var specified below this block, it is used a bounding rect      
    which we use to position and adjust our chart. 
    */
    const y = d3.scaleLinear()
              .domain([0, d3.max(chartdata, d => d.average)]) //our average price data ranges from 0 - Max
              .range([margin.top, height - margin.bottom]);  
    //Set up our Y axis scale
    /* 
    Band scales are convenient for charts with an ordinal or categorical dimension.
    The domain is the list neighborhoods. 
    The range — the chart’s width in pixels — is evenly distributed among the neighborhoods, which are 
    separated by a small gap.
    */
    const x = d3.scaleBand()
              .domain(chartdata.map(d => d.name))
              .rangeRound([margin.left, width - margin.right])
              .paddingInner(0.05); //spacing between each bar;
              
    const yAccessor = d => Math.round(d.average)          
    /* Step 4: Draw the chart
      https://observablehq.com/@d3/selection-join
    */
    svg.selectAll("rect") //Selects all defined elements in the DOM and hands off a reference to the next step in the chain.
        .data(chartdata) //connect chart data with DOM <rect/> elements
        .join("rect") // appends a new SVG rect element for each element in our chartdata array.
        .attr('y', y(0)) //since this is a horizontal bar chart we start the bottom of the chart at the left
        .attr('x', (d) => x(d.name)) // bar y position 
        .attr("width",  x.bandwidth()) //compute the width of the bar
        .attr("height", d => y(d.average) - y(0)) // height of the bar so they all stack nicely near eachother
        .attr("fill",   d =>  "rgb("+ "20,0," + Math.round(255 - d.average / 350000 * 255 + 100) + ")"); // color of the bar
  
    svg.selectAll("text")
        .data(chartdata)
        .join("text")
        .text(yAccessor)
        .attr('y', d => y(d.average)+10)
        .attr('x', d => x(d.name)+30)
        .attr("text-anchor", "middle")
        .attr("fill", "darkgrey")
        .attr("font-size", "12px")
        .attr("font-family", "sans-serif");
  
    /* Step 5: labeling */
  
    //initialize the location for the X Axis
    const xAxis = g => g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x))
  
    // initialize the location of the Y axis
    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
  
    // append each to the svg so they will be rendered 
    svg.append("g")
      .call(xAxis)
      .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(35)" );
   
    svg.select("g")
      .call(g =>
        g.select(".tick:last-of-type text")
          .clone()
          .attr("text-anchor", "middle")
          .attr("transform", "rotate(0)")
          .attr("x", margin.right)
          .attr("y", -40)
          .attr("font-weight", "bold")
          .text("Terminal")
       )
      
    svg.append("g")
      .call(yAxis)
      .call(g =>
      g .select(".tick:last-of-type text")
        .clone()
        .attr("transform", `rotate(-90)`)
        .attr("text-anchor", "middle")
        .attr("x",300)
        .attr("y", -60)
        .attr("font-weight", "bold")
        .text("Average Passengers")
          
    );
   
    //There will be some delay in console before it prints the array
}


export function drawBarChart(data, id) {

    const margin = { top: 40, right: 40, bottom: 120, left: 100 };
    const height = 300;
    const width = 500;

    const x = d3.scaleBand().domain(data.map(d => d.y))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.x)]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
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

export async function drawBarChart2(id){
    const data = await d3.csv(csvPath);
    console.log(data); 
    //process data()
    const chartdata = data_preprocessing(data, "Terminal");
    //draw chart ()
    //console.log(chartdata)
    //const svg = d3.create("svg").attr("viewBox", [0,0,width,height]); 
    const margin = { top: 100, right: 40, bottom: 120, left: 100 };
    const height = 600;
    const width = 500;
  
    //set up x y scale
    const y = d3.scaleLinear()
    .domain([0, d3.max(chartdata, d => d.average)]) //our average price data ranges from 0 - Max
    .range([margin.top, height - margin.bottom]); 

    const x = d3.scaleBand()
              .domain(chartdata.map(d => d.name))
              .rangeRound([margin.left, width - margin.right])
              .paddingInner(0.05); //spacing between each bar;

    const yAccessor = d => Math.round(d.average)

    let svg = d3.select(id).append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

    

    svg.selectAll("rect") //Selects all defined elements in the DOM and hands off a reference to the next step in the chain.
    .data(chartdata) //connect chart data with DOM <rect/> elements
    .join("rect") // appends a new SVG rect element for each element in our chartdata array.
    .attr('y', y(0)) //since this is a horizontal bar chart we start the bottom of the chart at the left
    .attr('x', (d) => x(d.name)) // bar y position 
    .attr("width", x.bandwidth()) //compute the width of the bar
    .attr("height", d => y(d.average) - y(0)) // height of the bar so they all stack nicely near eachother
    .attr("fill", d =>  "rgb("+ "20,0," + Math.round(255 - d.average / 350000 * 255 + 100) + ")"); // color of the bar
    
    svg.selectAll("text")
    .data(chartdata)
    .join("text")
    .text(yAccessor)
    .attr('y', d => y(d.average)+10)
    .attr('x', d => x(d.name)+30)
    .attr("text-anchor", "middle")
    .attr("fill", "darkgrey")
    .attr("font-size", "12px")
    .attr("font-family", "sans-serif");
    
    /* Step 5: labeling */
    
    //initialize the location for the X Axis
    const xAxis = g => g
      .attr("transform", `translate(0,${margin.top})`)
      .call(d3.axisTop(x))
    
    // initialize the location of the Y axis
    const yAxis = g => g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
    
    // append each to the svg so they will be rendered 
     svg.append("g")
        .call(xAxis)
        .selectAll("text")  
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(35)" );
     
    svg.select("g")
        .call(g =>
          g .select(".tick:last-of-type text")
            .clone()
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(0)")
            .attr("x", margin.right)
            .attr("y", -40)
            .attr("font-weight", "bold")
            .text("Terminal")
         )
        
        

    svg.append("g")
        .call(yAxis)
        .call(g =>
        g .select(".tick:last-of-type text")
          .clone()
          .attr("transform", `rotate(-90)`)
          .attr("text-anchor", "middle")
          .attr("x",300)
          .attr("y", -60)
          .attr("font-weight", "bold")
          .text("Average Passengers")
            
      );

    

    

    

}
