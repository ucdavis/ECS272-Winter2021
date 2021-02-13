import * as d3 from "d3";
import legend from "d3-svg-legend";
import csvPath from '../assets/data/spotify_data/data_by_year_more_corr.csv';


/* 
    Same as the one above but we made the function itself asynch so we can use await
    The two do the same thing essentially but it is cleaner to read
*/
export async function drawHeatFromCsvAsync(){
    const data = await d3.csv(csvPath);
    
    let id = "#heat"
    let svgID = id.substring(1)+ "-svg"

    // initialize the svg
    initHeatChart(id)

    //draw chart ()
    drawHeatChart(data, svgID); 
}

function initHeatChart(id){
    const margin = {top: 10, right: 70, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    
    // here id is heat
    console.log('id initHeatChart', id.substring(1), id)
    console.log('parentDiv', parentDiv)
    
    // const width = parentDiv.clientWidth;
    const width = parentDiv.clientWidth;

    console.log('width',width)
    const height = 460 - margin.top - margin.bottom;

    let svgID = id.substring(1)+ "-svg"
    let svgchartID = id.substring(1)+ "-svg-g"
    
    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", svgID)

    svg.append("g").attr("id", svgchartID)
    
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0," + width + ")")
       

    svg.append("g")
        .attr("class", "legendSequential")
        .attr("transform", "translate(500, 8)");
}

export function drawHeatChart(data, id) {

    const margin = {top: 10, right: 70, bottom: 50, left: 100};
    
    // const parentDiv = document.getElementById(id.substring(1));
    const parentDiv = document.getElementById(id);
    const width = parentDiv.clientWidth;
    const height = 460 - margin.top - margin.bottom;

    console.log('width',width)
    // now id is svgID = id +  "-svg"
    let svgchartID = id + "-g"
    console.log('svgchartID',svgchartID, id)
    const svg = d3.select(id) // "#heat-svg"
    const svgchart = svg.select(svgchartID) //"#heat-svg-g"
    
    const x = d3.scaleBand()
            .domain(data.map(d => d.groups))
            .rangeRound([margin.left, width - margin.right])
            .padding(0.2);   

    const y = d3.scaleBand()
            .domain(data.map(d => d.variables))
            .range([height,0])
            .padding(0.2); 

    // Build color scale
    var myColor = d3.scaleSequential()
                .interpolator(d3.interpolateInferno)
                .domain([-1,1])
                
    var sequentialScale = d3.scaleSequential()
                    .interpolator(d3.interpolateInferno)
                    .domain([-1,1]);

    // svg.append("g")
    //     .attr("class", "legendSequential")
    //     .attr("transform", "translate(500, 8)");
  
    var legendSequential = legend.legendColor()
        .shapeWidth(30)
        .cells(10)
        .orient('verical')
        .scale(sequentialScale);
  
    svg.select(".legendSequential")
        .call(legendSequential);

  
    let tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("font-family", "'Open Sans', sans-serif")
        .style("font-size", "12px")
        .style("z-index", "10")
        .style("background-color", "white")
        .style("border", "solid")
        .style("visibility", "hidden")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    
    // Select and generate rectangle elements
    svgchart
        .selectAll("rect")
        .join("rect")
        .data(data)
        // .enter()
        // .append("rect")
        
        // .join(enter => enter.append("rect"),
        //       update => update,
        //       exit => exit.remove()
        // )
        .attr("x", (d) => x(d.groups))
        .attr("y", (d) => y(d.variables)-50)
        // Set x coordinate of each bar to index of data value (i) times dynamically calculated bar width.
        // Add left margin to account for our left margin.
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .attr("rx", 4)
        .attr("ry", 4)
        .style("fill", function(d) { return myColor(d.r)} )
        .on("mouseover", (e,d) => {
        //   console.log(e)
          tooltip
           .style("visibility", "visible")
           .text("r-value: " + (1*d.r).toFixed(3))})
        
        .on("mousemove", (e,d) => tooltip
            .style("top", (e.pageY-10)+"px")
            .style("left",(e.pageX+10)+"px")
            .text("r-values: " + (1*d.r).toFixed(3)))
       
        .on("mouseout", (e,d) => tooltip
        .style("visibility", "hidden"))
        
        .on("click", (e,d) => {
            console.log('You just clicked')
            // console.log(id)
            // console.log(d)
        });

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSize(0));  
        
    // text label for the x axis
    svg.append("text")           
        .attr("transform",
                "translate(" + (width/2) + " ," +  //was width/2
                                (height - margin.top) + ")")
        .style("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("font-size", 13)

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},-50)`)
        .call(d3.axisLeft(y).tickSize(0))

    // text label for the x axis
    svg.append("text")             
        .attr("transform",
                "translate(" + (width - margin.left) + " ," +  //was width/2
                                (height/2) + ")")
        .style("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("font-size", 13)
            
    svg.select('.x.axis')
        // .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        .attr("font-weight", "bold")
        .attr("font-size", '12');

    svg.select('.y.axis')
        //.append("g")
        // .attr("class", "y axis")
        .attr("transform", "translate(0," + width + ")")
        .call(yAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        .attr("font-weight", "bold")
        .attr("font-size", '12');
}


