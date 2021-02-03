import React, { Component } from 'react';
import * as d3 from "d3";

class AdvancedChart extends Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        d3.csv(this.props.data)
            .then(csv => {
                // log csv in browser console
                //console.log(csv);

                // create data by selecting two columns from csv 
                var data = csv.map(row => {
                    return {
                        time: row['Time'],
                        category: row['Category']
                    }
                })

                //var totalData = [];
                var theftData = [];
                var buglaryDate = [];
                var assaultData = [];
                var missingPData = [];
                //var index = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
                var index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
                for (var i = 0; i < index.length; i++) {
                    theftData[index[i]] = 0;   //LARCENY/THEFT
                    buglaryDate[index[i]] = 0; //BURGLARY
                    assaultData[index[i]] = 0; //ASSAULT
                    missingPData[index[i]] = 0;//MISSING PERSON
                }
                
                for (i = 0; i < data.length; i++) {
                    var digit = data[i].time.substr(0, 1);
                    var temp = data[i].time.substr(0, 2);
                    if (digit == "0") {
                        temp = data[i].time.substr(1, 2);
                        if (data[i].category === "LARCENY/THEFT") {
                            theftData[index[parseInt(temp)]]++;
                        } else if (data[i].category === "BURGLARY") {
                            buglaryDate[index[parseInt(temp)]]++;
                        } else if (data[i].category === "ASSAULT") {
                            assaultData[index[parseInt(temp)]]++;
                        } else if (data[i].category === "MISSING PERSON") {
                            missingPData[index[parseInt(temp)]]++;
                        }
                    } else {
                        if (data[i].category === "LARCENY/THEFT") {
                            theftData[index[parseInt(temp)]]++;
                        } else if (data[i].category === "BURGLARY") {
                            buglaryDate[index[parseInt(temp)]]++;
                        } else if (data[i].category === "ASSAULT") {
                            assaultData[index[parseInt(temp)]]++;
                        } else if (data[i].category === "MISSING PERSON") {
                            missingPData[index[parseInt(temp)]]++;
                        }
                    }
                }

                theftData = Object.entries(theftData);
                buglaryDate = Object.entries(buglaryDate);
                assaultData = Object.entries(assaultData);
                missingPData = Object.entries(missingPData);

                var dataMap = [];
                for (var j = 0; j < index.length; j++) {
                    var obj = {
                        time: index[j],
                        theft: theftData[j][1],
                        buglary: buglaryDate[j][1],
                        assault: assaultData[j][1],
                        missing_people: missingPData[j][1]
                    }
                    dataMap.push(obj);
                }
                //console.log(dataMap);

                var slice = ["theft", "buglary", "assault", "missing_people"];

                // Visualization codes start here

                var width = 600;
                var height = 500;
                var margin = { top: 0, right: 20, bottom: 30, left: 20 };

                var svg = d3.select('#container')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    

                var series = d3.stack()
                    .keys(slice)
                    .offset(d3.stackOffsetWiggle)
                    .order(d3.stackOrderInsideOut)
                    (dataMap);

                console.log(series);

                var area = d3.area()
                    .x(d => x(d.data.time))
                    .y0(d => y(d[0]))
                    .y1(d => y(d[1]))

                var x = d3.scaleLinear()
                    .domain([0,23]) 
                    .range([margin.left, width])

                var y = d3.scaleLinear()
                    .domain([d3.min(series, d => d3.min(d, d => d[0])), d3.max(series, d => d3.max(d, d => d[1]))])
                    .range([height - margin.bottom, margin.top])


                var color = d3.scaleOrdinal()
                    .domain(slice)
                    .range(d3.schemeCategory10)


                var xAxis = (g => g
                    .attr("transform", `translate(0,${height - margin.bottom})`)
                    .call(d3.axisBottom(x).ticks(width/30).tickSizeOuter(0))
                    .call(g => g.select(".domain").remove())
                );

                svg.append("g")
                    .selectAll("path")
                    .data(series)
                    .join("path")
                    .attr("fill", ({ key }) => color(key))
                    .attr("d", area)
                    .append("title")
                    .text(({ key }) => key);

                svg.append("g")
                    .call(xAxis)
                    .call(g =>
                        g.select(".tick:last-of-type text")
                            .clone()
                            .attr("text-anchor", "middle")
                            .attr("x", -(width - margin.left - margin.right) / 2)
                            .attr("y", margin.bottom - 10)
                            .attr("font-weight", "bold")
                            .text("Time of a Day")
                    );

            });

    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default AdvancedChart;