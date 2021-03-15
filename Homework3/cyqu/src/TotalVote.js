import React, {Component} from 'react';
import * as d3 from "d3";

class TotalVote extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart() {
        d3.csv(this.props.data)
            .then(csv => {
                // log csv in browser console
                console.log(csv);


                var data = csv.map(row => {
                    return {
                        name: String(row['Name']),
                        total: Number(row['Total']),
                        type1: String(row['Type_1']),
                        type2: String(row['Type_2'])
                    }
                })
                function processData(){
                    //Sort data by neighborhood group and track the cumulative price and number of data points per group to calculate the average
                    const set = {};
                    set['Overall']=[];
                    data.forEach(d => {
                        const dataString = {
                            name: d.name,
                            total: d.total
                        }
                        set['Overall'].push(dataString);

                        if(d.type1!==""){
                            if(!(d.type1 in set))set[d.type1]=[];
                            set[d.type1].push(dataString);
                        }
                        if(d.type2!==""){
                            if(!(d.type2 in set))set[d.type2]=[];
                            set[d.type2].push(dataString);
                        }
                    })
                    const formattedData = {}

                    Object.keys(set).forEach(d => {
                        const subset=set[d];
                        subset.sort(function(a, b){
                            if(a.total < b.total) { return 1; }
                            if(a.total > b.total) { return -1; }
                            return 0;
                        })

                        formattedData[d]=subset.slice(0,11);
                    });

                    return formattedData
                }

                var count = processData()

                var allGroup = Object.keys(count);

                var dropdownButton = d3.select("#container")
                    .append('select')

                dropdownButton // Add a button
                    .selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
                    .data(allGroup)
                    .enter()
                    .append('option')
                    .text(function (d) { return d; }) // text showed in the menu
                    .attr("value", function (d) { return d; })


                //document.write(count.length);
                /*********************************
                 * Visualization codes start here
                 * ********************************/
                var width = 570;
                var height = 400;
                var margin = {left: 100, right: 20, top: 20, bottom: 60}

                var svg = d3.select('#container')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)

                /*
                var view = svg.append("g")

                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                */
                //scale functions

                var tooltip = document.getElementById('tooltip')



                const x = d3.scaleLinear()
                    .domain([0, d3.max(count['Overall'], d => d.total)]) //our average price data ranges from 0 - Max
                    .range([margin.left, width - margin.right]);


                const y = d3.scaleBand()
                    .domain(count['Overall'].map(d => d.name))
                    .rangeRound([margin.top, height - margin.bottom])
                    .padding(0.1);


                svg.selectAll("rect") //Selects all defined elements in the DOM and hands off a reference to the next step in the chain.
                    .data(count['Overall']) //connect chart data with DOM <rect/> elements
                    .join("rect") // appends a new SVG rect element for each element in our chartdata array.
                    .attr('x', (d) => x(0)) //since this is a horizontal bar chart we start the bottom of the chart at the left
                    .attr('y', (d) => y(d.name)) // bar y position
                    .attr("height", y.bandwidth()) // height of the bar so they all stack nicely near eachother
                    .attr("width", (d) => x(d.total) - x(0)) // height of the bar so they all stack nicely near eachother
                    .attr("fill", "#98abc5") // color of the bar
                    .on("mouseover", function(d) {
                    tooltip.innerHTML = d.x;
                    d3.select(this).style('fill', 'red');
                })
                    .on("mouseout", function(){
                        d3.select(this).style('fill', '#98abc5');});

                const xAxis = g => g
                    .attr("transform", `translate(0,${height - margin.bottom})`)
                    .call(d3.axisBottom(x))


                const yAxis = g => g
                    .attr("transform", `translate(${margin.left},0)`)
                    .call(d3.axisLeft(y))


                svg.append("g")
                    .call(xAxis)
                    .call(g =>
                        g.select(".tick:last-of-type text")
                            .clone()
                            .attr("text-anchor", "middle")
                            .attr("x", -(width - margin.left - margin.right) / 2)
                            .attr("y", margin.bottom - 10)
                            .attr("font-weight", "bold")
                            .text("Population")
                    );

                svg.append("g")
                    .call(yAxis)
                    .call(g =>
                        g
                            .select(".tick:last-of-type text")
                            .clone()
                            .attr("transform", `rotate(-90)`)
                            .attr("text-anchor", "middle")
                            .attr("x", -(15 - margin.top - margin.bottom) / 2)
                            .attr("y", -80)
                            .attr("font-weight", "bold")
                            .text("Overall Pokemons")
                    );

                function updateChart(keys){
                    svg.selectAll('*').remove();

                    const x = d3.scaleLinear()
                        .domain([0, d3.max(count[keys], d => d.total)]) //our average price data ranges from 0 - Max
                        .range([margin.left, width - margin.right]);


                    const y = d3.scaleBand()
                        .domain(count[keys].map(d => d.name))
                        .rangeRound([margin.top, height - margin.bottom])
                        .padding(0.1);


                    svg.selectAll("rect") //Selects all defined elements in the DOM and hands off a reference to the next step in the chain.
                        .data(count[keys]) //connect chart data with DOM <rect/> elements
                        .join("rect") // appends a new SVG rect element for each element in our chartdata array.
                        .attr('x', (d) => x(0)) //since this is a horizontal bar chart we start the bottom of the chart at the left
                        .attr('y', (d) => y(d.name)) // bar y position
                        .attr("height", y.bandwidth()) // height of the bar so they all stack nicely near eachother
                        .attr("width", (d) => x(d.total) - x(0)) // height of the bar so they all stack nicely near eachother
                        .attr("fill", '#69b3b2')
                        .on("mouseover", function(d) {
                            tooltip.innerHTML = d.x;
                            d3.select(this).style('fill', 'red');
                        })
                        .on("mouseout", function(){
                            d3.select(this).style('fill', '#69b3b2');});


                    const xAxis = g => g
                        .attr("transform", `translate(0,${height - margin.bottom})`)
                        .call(d3.axisBottom(x))


                    const yAxis = g => g
                        .attr("transform", `translate(${margin.left},0)`)
                        .call(d3.axisLeft(y))


                    svg.append("g")
                        .call(xAxis)
                        .call(g =>
                            g.select(".tick:last-of-type text")
                                .clone()
                                .attr("text-anchor", "middle")
                                .attr("x", -(width - margin.left - margin.right) / 2)
                                .attr("y", margin.bottom - 10)
                                .attr("font-weight", "bold")
                                .text("Population")
                        );

                    svg.append("g")
                        .call(yAxis)
                        .call(g =>
                            g
                                .select(".tick:last-of-type text")
                                .clone()
                                .attr("transform", `rotate(-90)`)
                                .attr("text-anchor", "middle")
                                .attr("x", -(15 - margin.top - margin.bottom) / 2)
                                .attr("y", -80)
                                .attr("font-weight", "bold")
                                .text(keys+" Pokemons names")
                        );

                    svg.append("text")
                        .attr("text-anchor", "middle")
                        .style("fill", "black")
                        .style("font-size", "15px")
                        .attr("x", 200)
                        .attr("y", 10)
                        .html(keys+" Pokemons with top Populations")
                }
                dropdownButton.on("change", function(d) {

                    // recover the option that has been chosen
                    var selectedOption = d3.select(this).property("value")

                    // run the updateChart function with this selected option
                    updateChart(selectedOption)
                })
                svg
                    .append("text")
                    .attr("text-anchor", "middle")
                    .style("fill", "black")
                    .style("font-size", "15px")
                    .attr("x", 200)
                    .attr("y", 10)
                    .html("Overall Pokemons with top Populations")

            });
    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default TotalVote;
