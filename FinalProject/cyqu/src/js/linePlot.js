import * as d3 from "d3";
import new_flight from "../assets/data/final_line.csv"

export function linePlot(target_country = "United States"){
    var parseDate = d3.timeParse("%Y-%m")
    var displayFormat = d3.timeFormat("%b")
    d3.csv(new_flight, preprocess).then(function(data){

        var newdata = data.filter(d => d.Name == target_country)

        d3.select("#line").selectAll("*").remove()
        var margin = {top: 10, right: 60, bottom: 30, left: 30},
            width = 500 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        var svg = d3.select("#line")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        svg.append("text")
                .attr("x", (width / 2))             
                .attr("y", margin.top + height)
                .attr("text-anchor", "middle")  
                .style("font-size", "16px") 
                .style("text-decoration", "bold")  
                .text("Domestic and Internation flight in " + target_country);
    

        var x = d3.scaleTime()
            .rangeRound([margin.left, width - margin.right])
            .domain(d3.extent(newdata, d => d.date))
            .nice()
        var y = d3.scaleLinear()
            .domain([0, d3.max(newdata, function(d) { return Math.max(d.Domestic, d.International); })])
            .range([ height - margin.bottom, margin.top ]);

        svg.append("g")
            .attr("class","x-axis")
            .attr("transform", "translate(0," + (height - margin.bottom) + ")")
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
            .selectAll("text")
            //.attr("transform", "translate(50)")

        
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y))
            .attr("transform", "translate(" + margin.left + ",0)");



        svg.append("path")
            .datum(newdata)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.Domestic) })
            )

        svg.append("path")
            .datum(newdata)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return x(d.date) })
                .y(function(d) { return y(d.International) })
            )

        //legend
        
        svg.append("circle").attr("cx",(margin.left + width * 0.8)).attr("cy",margin.top).attr("r", 6).style("fill", "steelblue")
        svg.append("circle").attr("cx",(margin.left + width * 0.8)).attr("cy",(margin.top + 30)).attr("r", 6).style("fill", "red")
        svg.append("text").attr("x", (margin.left + width * 0.8 + 20)).attr("y", margin.top).text("International").style("font-size", "10px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", (margin.left + width * 0.8 + 20)).attr("y", (margin.top + 30)).text("Domestic").style("font-size", "10px").attr("alignment-baseline","middle")
            

    });
    function preprocess(flight){
        flight.date = parseDate(flight.date);
                flight.date = parseDate(flight.Month)
                return flight;

    }
}