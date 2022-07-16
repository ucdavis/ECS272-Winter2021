import React, {Component} from 'react';
import * as d3 from "d3";

class Zoomable extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
        d3.csv(this.props.data)
        .then(csv => {
        
        // Preprocessing
        var init_data = csv.map(row => {
            return {
                num: Number(row['Number']),
                name: String(row['Name']),
                total: Number(row['Total']),
                hp: Number(row['HP']),
                attack: Number(row['Attack']),
                defense: Number(row['Defense']),
                sp_attack: Number(row['Sp_Atk']),
                sp_defense: Number(row['Sp_Def']),
                speed: Number(row['Speed']),
                gen: Number(row['Generation'])
            }
        })

        function filterGen(array) {
        return array.filter(pokemon => pokemon.gen == 1);
        }

        var data = filterGen(init_data);

        console.log(data);

        // Set basic parameters
        const margin = ({top: 20, right: 0, bottom: 30, left: 40});
        const width = 1500;
        const height = 300;


        // scale
        var x = d3.scaleBand()
            .domain(data.map(d => d.num))
            .range([margin.left, width - margin.right])
            .padding(0.1);

        var y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.total)]).nice()
            .range([height - margin.bottom, margin.top]);

        // Draw axis
        var xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0));

        var yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove());
        
        // Define zoom function
        function zoom(svg) {
            const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];

            svg.call(d3.zoom()
                .scaleExtent([1, 8])
                .translateExtent(extent)
                .extent(extent)
                .on("zoom", zoomed));

            function zoomed(event) {
                x.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
                svg.selectAll(".bars rect").attr("x", d => x(d.num)).attr("width", x.bandwidth());
                svg.selectAll(".x-axis").call(xAxis);
            }
        }

        // Visualize chart
        var svg = d3.select("#zoomableBar")
            .append("svg")
            .attr("viewBox", [-15, 0, width+15, height+15])
            .call(zoom);
        
        svg.append("g")
            .attr("class", "bars")
            .attr("fill", "steelblue")
          .selectAll("rect")
          .data(data)
          .join("rect")
            .attr("x", d => x(d.num))
            .attr("y", d => y(d.total))
            .attr("height", d => y(0) - y(d.total))
            .attr("width", x.bandwidth());
      
        svg.append("g")
            .attr("class", "x-axis")
            .call(xAxis);
      
        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis);

        // x label
        svg.select("g").append("text")             
            .attr("transform", `translate(${(width/2)}, ${(height + margin.top - 15)})`)
            .style("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .text("Pokemon Number");

        // y label
        svg.select("g").append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left -20)
            .attr("x", 0 - (height / 2))
            .attr("dy", "4em")
            .style("text-anchor", "middle")
            .text("Total Score");
        
     });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Zoomable;