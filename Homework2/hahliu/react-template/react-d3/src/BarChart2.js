import React, { Component } from 'react';
import * as d3 from "d3";

class BarChart2 extends Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        d3.csv(this.props.data)
            .then(csv => {
                // log csv in browser console
                console.log(csv);

                // create data by selecting one column from csv 
                var data = csv.map(row => {
                    return {
                        day: row['DayOfWeek']
                    }
                })

                //processing the data for chart
                var countObj = [];
                for (var i = 0; i < data.length; i++) {
                    if (!countObj[data[i].day]) {
                        countObj[data[i].day] = 0;
                    }
                    countObj[data[i].day]++;
                }

                var countArr = Object.entries(countObj);
                var dataMap = [];
                for (var j = 0; j < countArr.length; j++) {
                    var obj = {
                        key: countArr[j][0],
                        value: countArr[j][1]
                    }
                    dataMap.push(obj);
                }

               
                /********************************* 
               * Visualization codes start here
               * ********************************/
                var width = 600;
                var height = 400;
                var margin = { left: 60, right: 20, top: 20, bottom: 60 }

                var svg = d3.select('#container')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)

                var view = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                
                const x = d3.scaleBand()
                    .domain(dataMap.map(d => d.key))
                    .rangeRound([margin.left, width])
                    .padding(0.1);
                const y = d3.scaleLinear()
                    .domain([d3.max(dataMap, d => d.value), 0])
                    .range([margin.top, height - margin.bottom]);
                var barPlot = svg.selectAll("rect")
                        .data(dataMap)
                        .join("rect")
                        .attr('x', (d) => x(d.key))
                        .attr('y', (d) => y(d.value))
                        .attr("height", (d) => 400 - y(d.value) - margin.bottom)
                        .attr("width", x.bandwidth())
                        .attr("fill", "green");

                const xAxis = g => g
                     .attr("transform", `translate(0,${height - margin.bottom})`)
                     .call(d3.axisBottom(x))

                var tooltip = document.getElementById('tooltip')
                barPlot
                    .on('mouseenter', function (d) {
                        d3.select(this).style('fill', 'red')
                        tooltip.innerHTML = (d3.select(this).data()[0].key) + ' has ' + (d3.select(this).data()[0].value) + ' crimes.'
                    })
                    .on('mouseleave', function (d) {
                        d3.select(this).style('fill', 'green')
                    })

                  // initialize the location of the Y axis
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
                                .text("Day of a Week")
                        );

                    svg.append("g")
                        .call(yAxis)
                        .call(g =>
                            g.select(".tick:last-of-type text")
                                .clone()
                                .attr("text-anchor", "middle")
                                .attr("transform", "rotate(-90)")
                                .attr("x",  height / 2)
                                .attr("y", - margin.left)
                                .attr("dy", "0.71em")
                                .attr("font-weight", "bold")
                                .text("Number of Crimes")
                        );


            });

    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart2;