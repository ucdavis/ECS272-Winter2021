import * as d3 from "d3";
import legend from "d3-svg-legend";
import csvPath from '../assets/data/spotify_data/data_by_year_more_corr.csv';


function drawHeatFromCsv(){
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
export async function drawHeatFromCsvAsync(){
    const data = await d3.csv(csvPath);
    console.log(data);
    drawHeatChart(data, "#heat"); 
    //process data()
    //draw chart ()
    //There will be some delay in console before it prints the array
}


export function drawHeatChart(data, id) {

    const margin = {top: 10, right: 70, bottom: 50, left: 100};
    const parentDiv = document.getElementById(id.substring(1));
    const width = parentDiv.clientWidth;
    const height = 460 - margin.top - margin.bottom;
    
    console.log(data)

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    const x = d3.scaleBand()
            .domain(data.map(d => d.groups))
            .rangeRound([margin.left, width - margin.right])
            .padding(0.2);   
    
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

    const y = d3.scaleBand()
            .domain(data.map(d => d.variables))
            .range([height,0])
            .padding(0.2); 
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


    // Build color scale
    var myColor = d3.scaleSequential()
                .interpolator(d3.interpolateInferno)
                .domain([-1,1])
    var sequentialScale = d3.scaleSequential()
                    .interpolator(d3.interpolateInferno)
                    .domain([-1,1]);
    

    svg.append("g")
    .attr("class", "legendSequential")
    .attr("transform", "translate(500, 8)");
  
    var legendSequential = legend.legendColor()
        .shapeWidth(30)
        .cells(10)
        .orient('verical')
        .scale(sequentialScale);
  
    svg.select(".legendSequential")
        .call(legendSequential);

    // let valRange = [-1,1]
    // let legendBins = [...Array(5).keys()].map(x => d3.quantile(valRange, x * 0.1))

    // const legend = svg.append("g")
    //                 .attr("transform", d => `translate(${margin.left},0)`);
    // let legendHeight = 20
    // let legendElementWidth = 25      
    // legend
    //     .selectAll("rect")
    //     .data(legendBins)
    //     .enter()
    //     .append("rect")
    //     .attr("y", (d, i) => legendElementWidth * i)
    //     .attr("x", width - margin.left - 10) // + (2*legendHeight) + 30)
    //     .attr("width", legendElementWidth)
    //     .attr("height", legendHeight)
    //     .style("fill", function(d) { return myColor(d.r)})
        // .style("fill", d => z(d));
    
    // legend
    //     .selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .text(d => "≥ " + (1*d.r).toFixed(1))
    //     // .attr("x", (d, i) => legendElementWidth * i)
    //     // .attr("y", height - (legendHeight / 2) + 11 )
    //     .style("font-size", "9pt")
    //     .style("font-family", "Consolas, courier")
    //     .style("fill", "#aaa");                 
    // const lPatchWidth=200;
    // console.log('-----========')
    // console.log((width+margin.right)/2-lPatchWidth/2 -margin.left/2) //170
    // console.log((height+margin.bottom-35-20)) // 395
    // console.log(width, margin.right, height, margin.bottom)

    // const legend = svg.append('g')
    //                     // .attr("transform","translate(" + ((width + margin.right)/2 - lPatchWidth/2 - margin.left/2) + "," +
    //                                                     //   (height + margin.bottom - 35 - 24) + ")")
    //                     .attr("transform","translate(" + ((width + margin.left) + 100 ) + "," +
    //                                                       (height + margin.bottom - 35 - 24) + ")")
    //                     .attr('x', 600)
    //                     .attr("transform", "rotate(90)")                                
   
    //                     //  .attr('transform', `translate(170, 400)`) // ${years.length * yearHeight + cellSize * 4})`)
    
    // const categoriesCount = 3;
    // // let arrayLength = data.length; // length of dataset
    // let maxValue = 1//d3.max(data, d=> d.danceability); // get max value of our dataset

    // const categories = [...Array(categoriesCount)].map((_, i) => {
    // const upperBound = 1; //maxValue / categoriesCount * (i + 1);
    // const lowerBound = -1; //maxValue / categoriesCount * i;
    // // const legendWidth = 10;

    

    // return {
    //     upperBound,
    //     lowerBound,
    //     // color: myColor //d3.interpolateBuGn(upperBound / maxValue)
    //     color: d3.interpolateBuGn(upperBound / maxValue)
    //     // color: myColor.range()
    // };
    // });

    // const gridSize = Math.floor(width / 25)
    // const legendWidth = (gridSize/2 + 4)
    // console.log('gridSize', gridSize, 'lengthWidth', legendWidth)
    // legend
    //     .selectAll('rect')
    //     // .data(categories)
    //     // .data(myColor.range())
    //     .enter()
    //     .append('rect')
    //     // .attr('fill', d => d.color)
    //     .attr("fill", function(d) { return myColor(d.r)} )
    //     .attr('x', (d, i) => 15 * i)
    //     .attr('y', margin.left - width - 50)//(d, i) => 10 * i)
    //     .attr('width', 10) //10
    //     .attr('height', 15)
    // // const all_text = ['-1', '0', '1']
    // // legend.append("text")
    // //     .attr("class", "mono")
    // //     .text((d,i) => all_text[i]) //function(d) { return "≥ " + Math.round(d); })
    // //     .attr("x",(d, i) => 15 * i )// function(d, i) { return gridSize * 11 + 25; })
    // //     .attr("y", (d,i) => margin.left - width - 50) //function(d, i) { return (i * legendWidth + 20); })

    // // legend
    // //     .selectAll('rect')
    // //     .attr("x", (d, i) => gridSize * 11)
    // //     .attr("y", (d, i) => i * legendWidth + 7)
    // //     .attr("width", gridSize/2)
    // //     .attr("height", gridSize/2)
    // //     .style("fill", (d, i) => myColor[i])
    // //     .attr("class", "square");
    // // legend.append("text")
    // //     .attr("class", "mono")
    // //     .text((d,i) => d) //function(d) { return "≥ " + Math.round(d); })
    // //     .attr("x",width + gridSize * 11 + 35)// function(d, i) { return gridSize * 11 + 25; })
    // //     .attr("y", (d,i) => height - 10 + i * legendWidth + 20) //function(d, i) { return (i * legendWidth + 20); })

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
    svg.selectAll()
        .data( data )
        .join("rect")
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
          console.log(e)
          tooltip
           .style("visibility", "visible")
           .text("r-value: " + (1*d.r).toFixed(3))})
        
        .on("mousemove", (e,d) => tooltip
            .style("top", (e.pageY-10)+"px")
            .style("left",(e.pageX+10)+"px")
            .text("r-values: " + (1*d.r).toFixed(3)))
       
        .on("mouseout", (e,d) => tooltip
        .style("visibility", "hidden"));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        .attr("font-weight", "bold")
        .attr("font-size", '12');

    svg.append("g")
        .attr("class", "y axis")
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



