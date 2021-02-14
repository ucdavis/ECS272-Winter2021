import * as d3 from "d3";
import { zoomTransform } from "d3";
import csvPath from '../assets/data/data.csv';

/*
################ FORMATS ##################
-------------------------------------------
*/


const 	formatAsPercentage = d3.format("%"),
		formatAsPercentage1Dec = d3.format(".1%"),
		fsec = d3.timeFormat("%S s"),
		fmin = d3.timeFormat("%M m"),
		fhou = d3.timeFormat("%H h"),
		fwee = d3.timeFormat("%a"),
		fdat = d3.timeFormat("%d d"),
		fmon = d3.timeFormat("%b")
		;

/*
############# PIE CHART ###################
-------------------------------------------
*/

export function dsPieChart(){
    //  Retrieve data from the CSV file and execute everything below
    
    d3.csv(csvPath).then(function(csvData){
        // parse data
        csvData.forEach(function(data) {
            data.count = +data.count;
            data.date = +data.date;
        });
        
        let length = csvData.length;
        
        // creating dataset for pie chart
        let totalSum = 0;
        let cause = "Arson";
        let totalCount = 0;
        let dataset = [];

        for(let i = 0;i < length;i++){
            
            let item = csvData[i];
            
            totalSum += item.count
            
            if (item.cause !== cause ) {

                dataset.push({"cause": cause, "sum": totalCount})
                cause = item.cause
                totalCount = item.count
            }
            else if (i === length-1){
                totalCount += item.count
                dataset.push({"cause": cause, "sum": totalCount})
            }
            else {
                totalCount += item.count
            }
        }
    

        var width = 400,
            height = 400,
            outerRadius = Math.min(width, height) / 2,
            innerRadius = outerRadius * .999,   
            // for animation
            innerRadiusFinal = outerRadius * .30,
            color = d3.scaleOrdinal(d3.schemePaired)
        ;    //builtin range of colors
            
        var vis = d3.select("#pieChart")
                .append("svg:svg")              //create the SVG element inside the <body>
                .data([dataset])                //associate our data with the document
                .attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
                .attr("height", height)
                .append("svg:g")                //make a cause to hold our pie chart
                .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")    //move the center of the pie chart from 0, 0 to radius, radius
        ;
                    
        var arc = d3.arc()              //this will create <path> elements for us using arc data
                .outerRadius(outerRadius).innerRadius(innerRadius);

        // for animation
        var arcFinal = d3.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius-20);
        var arcFinal3 = d3.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);

        var pie = d3.pie()           //this will create arc data for us given a list of values
            .value(function(d) { return d.sum; });    //we must tell it out to access the value of each element in our data array

        var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
            .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
            .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a cause to hold each slice (we will have a <path> and a <text> element associated with each slice)
            .attr("class", "slice")    //allow us to style things in the slices (like text)
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);
                        
        arcs.append("svg:path")
            .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
            .attr("d", arc)     //this creates the actual SVG path using the associated data (pie) with the arc drawing function
            .append("svg:title") //mouseover title showing the figures
            .text(function(d) { return d.data.cause + ": " + formatAsPercentage(d.data.sum/totalSum); });			

        d3.selectAll("g.slice").selectAll("path").transition()
            .duration(750)
            .delay(10)
            .attr("d", arcFinal )
            ;
        
        // Add a label to the larger arcs, translated to the arc centroid and rotated.
        arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; })
            .append("svg:text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) { return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")"; })
            //.text(function(d) { return formatAsPercentage(d.value); })
            .text(function(d) { return d.data.cause; })
        ;
        
        // Computes the label angle of an arc, converting from radians to degrees.
        function angle(d) {
            let a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
            return a > 90 ? a - 180 : a;
        }
                
        // Pie chart title			
        vis.append("svg:text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text("Total")
            .attr("class","title")
        ;		    
            
        function mouseover() {
        d3.select(this).select("path").transition()
                .duration(750)
                // .attr("stroke","black")
                //.attr("stroke-width", 1.5)
                .attr("d", arcFinal3)
                ;
        }
        
        function mouseout() {
        d3.select(this).select("path").transition()
                .duration(750)
                //.attr("stroke","blue")
                //.attr("stroke-width", 1.5)
                .attr("d", arcFinal)
                ;
        }
    });
};

// dsPieChart();

// 	/*
// ############# BAR CHART ###################
// -------------------------------------------
// */


function dsBarChart(cause, dataset) {

    let firstDatasetBarChart = [];
    for(let x in dataset) {
        if(dataset[x].cause==cause){
            //console.log(x);
            firstDatasetBarChart.push(dataset[x]);
        }
    };
    
    var margin = {top: 30, right: 5, bottom: 20, left: 50},
        width = 1080 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom,
        barPadding = 1
                    
    var xScale = d3.scaleLinear()
            .domain([0, firstDatasetBarChart.length])
            .range([0, width])
    ;
                        
    // Create linear y scale 
    // Purpose: No matter what the data is, the bar should fit into the svg area; bars should not
    // get higher than the svg height. Hence incoming data needs to be scaled to fit into the svg area.  
    var yScale = d3.scaleLinear()
            // use the max funtion to derive end point of the domain (max value of the dataset)
            // do not use the min value of the dataset as min of the domain as otherwise you will not see the first bar
        .domain([0, d3.max(firstDatasetBarChart, function(d) { return d.count; })])
        // As coordinates are always defined from the top left corner, the y position of the bar
        // is the svg height minus the data value. So you basically draw the bar starting from the top. 
        // To have the y position calculated by the range function
        .range([height, 0])
    ;
    
    //Create SVG element
    
    var svg = d3.select("#barChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id","barChartPlot")
    ;
    
    var plot = svg
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    ;
                
    plot.selectAll("rect")
        .data(firstDatasetBarChart)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {return xScale(i);})
        .attr("width", width / firstDatasetBarChart.length - barPadding)   
        .attr("y", function(d) {return yScale(d.count);})  
        .attr("height", function(d) {return height-yScale(d.count);})
        .attr("fill", "lightgrey")
    ;
    
    // Add y labels to plot	
    plot.selectAll("text")
        .data(firstDatasetBarChart)
        .enter()
        .append("text")
        .text(function(d) {return d.count;})
        .attr("text-anchor", "middle")
    // Set x position to the left edge of each bar plus half the bar width
        .attr("x", function(d, i) {
            return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);})
        .attr("y", function(d) {return yScale(d.count) + 14;})
        .attr("class", "yAxis")
    ;
    
    // Add x labels to chart	
    
    var xLabels = svg
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + (margin.top + height)  + ")")
    ;
    
    xLabels.selectAll("text.xAxis")
        .data(firstDatasetBarChart)
        .enter()
        .append("text")
        .text(function(d) { return d.date;})
        .attr("text-anchor", "middle")
            // Set x position to the left edge of each bar plus half the bar width
        .attr("x", function(d, i) {
            return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
        })
        .attr("y", 15)
        .attr("class", "xAxis")
        //.attr("style", "font-size: 12; font-family: Helvetica, sans-serif")
    ;			
    
    // Title
    
    svg.append("text")
        .attr("x", (width + margin.left + margin.right)/2 + 40 )
        .attr("y", 24)
        .attr("class","title")				
        .attr("text-anchor", "middle")
        .text("Overall Wildfire Breakdown 1992 - 2015")
    ;
};
/* ** UPDATE CHART ** */

/* updates bar chart on request */

function updateBarChart(cause, colorChosen, dataset) {
    
    let currentDatasetBarChart = [];
    for(let x in datasest) {
        if(dataset[x].cause==cause){
            currentDatasetBarChart.push(dataset[x]);
        }
    };
        
    var margin = {top: 30, right: 5, bottom: 20, left: 50},
        width = 1080 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom,
        barPadding = 1
    ;
    var xScale = d3.scaleLinear()
        .domain([0, currentDatasetBarChart.length])
        .range([0, width])
    ;
        
            
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(currentDatasetBarChart, function(d) { return d.count; })])
        .range([height,0])
    ;
        
    var svg = d3.select("#barChart svg");
        
    var plot = d3.select("#barChartPlot")
        .datum(currentDatasetBarChart)
    ;
    
        /* Note that here we only have to select the elements - no more appending! */
        plot.selectAll("rect")
            .data(currentDatasetBarChart)
            .transition()
            .duration(750)
            .attr("x", function(d, i) {return xScale(i);})
            .attr("width", width / currentDatasetBarChart.length - barPadding)   
            .attr("y", function(d) {return yScale(d.count);})  
            .attr("height", function(d) {return height-yScale(d.count);})
            .attr("fill", colorChosen)
        ;
        
        plot.selectAll("text.yAxis") // target the text element(s) which has a yAxis class defined
            .data(currentDatasetBarChart)
            .transition()
            .duration(750)
            .attr("text-anchor", "middle")
            .attr("x", function(d, i) {
                return (i * (width / currentDatasetBarChart.length)) + ((width / currentDatasetBarChart.length - barPadding) / 2);
            })
            .attr("y", function(d) {return yScale(d.count) + 14;})
            .text(function(d) {return d.count;})
            .attr("class", "yAxis")					 
        ;
        

        svg.selectAll("text.title") // target the text element(s) which has a title class defined
            .attr("x", (width + margin.left + margin.right)/2 + 40)
            .attr("y", 15)
            .attr("class","title")				
            .attr("text-anchor", "middle")
            .text(cause + " Wildfire Breakdown 1992 - 2015")
        ;
}

// /*
// ############# LINE CHART ##################
// -------------------------------------------
// */

function dsLineChart(cause,dataset) {

    let firstDatasetLineChart = [];    
    for(let x in dataset) {
        if(dataset[x].cause==cause){
            firstDatasetLineChart.push(dataset[x]);
        }
    };

    var margin = {top: 100, right: 20, bottom: 20, left: 100},
        width = 700 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom
    ;

    
    var xScale = d3.scaleLinear()
        .domain([0, firstDatasetLineChart.length-1])
        .range([0, width])
    ;

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(firstDatasetLineChart, function(d) { return d.count; })])
        .range([height, 0])
    ;

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    var line = d3.line()
        // .x(function(d) { return xScale(d.year); })
        .x(function(d,i) { return xScale(i); })
        .y(function(d) { return yScale(d.count); })
        ;
    
    var svg = d3.select("#lineChart").append("svg")
        .datum(firstDatasetLineChart)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        // create cause and move it so that margins are respected (space for axis and title)
        
    var plot = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("id", "lineChartPlot")
    ;

    // append x axis
    plot.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis)
    ;

    // append y axis
    plot.append("g")
        .classed("y-axis", true)
        .call(leftAxis)
    ;


    // creating sum of count by cause
    let totalCount = firstDatasetLineChart.reduce(function(a,b){
          return a + b.count;
        }, 0)
    ;

    plot.append("text")
        .text("Total number of Wildfires: " + totalCount)
        .attr("id","lineChartTitle2")
        .attr("x",width/2)
        .attr("y", -15)	
    ;
    /* descriptive titles -- end */
        
    plot.append("path")
        .attr("class", "line")
        .attr("d", line)	
        // add color
        .attr("stroke", "lightgrey")
    ;
    
    plot.selectAll(".dot")
        .data(firstDatasetLineChart)
        .enter().append("circle")
        .attr("class", "dot")
        //.attr("stroke", function (d) { return d.count==datasetcountMin ? "red" : (d.count==datasetcountMax ? "green" : "steelblue") } )
        .attr("fill", function (d) { return d.count==d3.min(firstDatasetLineChart, function(d) { return d.count; }) ? "red" : (d.count==d3.max(firstDatasetLineChart, function(d) { return d.count; }) ? "green" : "white") } )
        //.attr("stroke-width", function (d) { return d.count==datasetcountMin || d.count==datasetcountMax ? "3px" : "1.5px"} )
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        .attr("stroke", "lightgrey")
        .append("title")
        .text(function(d) { return "Total number of wildfires in "+ d.date + " was " + d.count; })
    ;
}

/* ** UPDATE CHART ** */
// 

/* updates line chart on request */
function updateLineChart(cause, colorChosen, dataset) {

    let currentDatasetLineChart = [];   
    for(let x in dataset) {
        if(dataset[x].cause==cause){
            currentDatasetLineChart.push(dataset[x]);
        }
    };

    var margin = {top: 100, right: 20, bottom: 20, left: 100},
        width = 700 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom
    ;

    var xScale = d3.scaleLinear()
        .domain([0, currentDatasetLineChart.length-1])
        .range([0, width])
    ;

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(currentDatasetLineChart, function(d) { return d.count; })])
        .range([height, 0])
    ;
    
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    var line = d3.line()
        .x(function(d, i) { return xScale(i); })
        .y(function(d) { return yScale(d.count); })
    ;

    var plot = d3.select("#lineChartPlot")
        .datum(currentDatasetLineChart)
    ;
    
    /* descriptive titles as part of plot -- start */
    // creating sum of count by cause
    let totalCount = currentDatasetLineChart.reduce(function(a,b){
        return a + b.count;
        }, 0)
    ;
    
    plot.select("text")
        .text("Total number of Wildfires by "+ cause + ": " + totalCount)
    ;
    /* descriptive titles -- end */
    
    plot
        .select("path")
        .transition()
        .duration(750)			    
        .attr("class", "line")
        .attr("d", line)	
        // add color
        .attr("stroke", colorChosen)
    ;
    
    // append x axis
    plot.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis)
    ;

    // append y axis
    plot.append("g")
        .classed("y-axis", true)
        .call(leftAxis)
    ;

    
    var path = plot
        .selectAll(".dot")
        .data(currentDatasetLineChart)
        .transition()
        .duration(750)
        .attr("class", "dot")
        .attr("fill", function (d) { return d.count==d3.min(currentDatasetLineChart, function(d) { return d.count; }) ? "red" : (d.count==d3.max(currentDatasetLineChart, function(d) { return d.count; }) ? "green" : "white") } )
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        // add color
        .attr("stroke", colorChosen)
    ;
    
    path
        .selectAll("title")
        .text(function(d) { return "Total number of wildfires in " + d.date + " caused by " + cause + " was " + d.count; })	 
    ;  

}

//  Retrieve data from the CSV file and execute everything below
d3.csv(csvPath).then(function(csvData){
    // parse data
    csvData.forEach(function(data) {
        data.count = +data.count;
        data.date = +data.date;
    });
    
    let result = [];
    csvData.reduce(function(res, value) {
        if (!res[value.date]) {
            res[value.date] = { cause: "All", date: value.date, count: 0 };
            result.push(res[value.date])
        }
        res[value.date].count += value.count;
        return res;
    }, {});

    var dataset = csvData.concat(result);
    
    // set initial cause value for barchart 
    let cause = "All";

    dsBarChart(cause,dataset);

    dsLineChart(cause,dataset);

    // y axis labels event listener

    d3.select("#pieChart").select('.title')
        .on("click", function(){
            updateBarChart("All", "lightgrey", dataset);
            updateLineChart("All", "lightgrey", dataset);
    })

    d3.select("#pieChart").selectAll("g.slice")
        .on("click", function(d) {
            //console.log("here", d)
            var color = d3.select(d3.event.target).attr('fill') // SELECT FILL VALUE
            //console.log("color", color)
            updateBarChart(d.data.cause, color, dataset);
            updateLineChart(d.data.cause, color, dataset);
  
        });
});
