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
                //console.log(csv);

                // create data by selecting two column from csv
                var data = csv.map(row => {
                    return {
                        category: row['Category'],
                        day: row['DayOfWeek']
                    }
                })
                //processing the data for chart
                var countObj = [];
                var theftCount = [];
                for (var i = 0; i < data.length; i++) {
                    if (!countObj[data[i].day]) {
                        countObj[data[i].day] = 0;
                    }
                    if (data[i].category === "LARCENY/THEFT") {
                        if(!theftCount[data[i].day]){
                            theftCount[data[i].day] = 0;
                        }
                        theftCount[data[i].day] ++;
                    }
                    countObj[data[i].day]++;
                }
                //console.log(countObj)
                //console.log(theftCount)

                //var countArr = Object.entries(countObj);
                var countArr = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
                var dataMap = [];
                for (var j = 0; j < 7; j++) {
                    var obj = {
                        day: countArr[j],
                        total: countObj[countArr[j]],
                        theft: theftCount[countArr[j]]
                    }
                    dataMap.push(obj);
                }
                //console.log(dataMap)

                /********************************* 
               * Visualization codes start here
               * ********************************/
                var margin = { left: 100, right: 10, top: 10, bottom: 100 }
                var width = 600-margin.left-margin.right;
                var height = 400-margin.bottom-margin.top;
                let flag = true; // when flag is true, using the overall data; when flag is flase
                                 // using the theft data

                var svg = d3.select('#container')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)



                const g = svg.append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);

                g.append("text")
                    .attr("class", "x axis-label")
                    .attr("x",width/2)
                    .attr("y",height+60)
                    .attr("font-size","15px")
                    .attr("text-anchor", "middle")
                    .text("Day of a Week");

                const yLable = g.append("text")
                    .attr("class", "y axis-label")
                    .attr("x",-(height/2))
                    .attr("y", - 60)
                    .attr("font-size","15px")
                    .attr("text-anchor", "middle")
                    .attr("transform", "rotate(-90)");


                const x = d3.scaleBand()
                    .range([0, width])
                    .paddingInner(0.3)
                    .paddingOuter(0.2);

                const y = d3.scaleLinear()
                    .range([height, 0]);

                const xAxisGroup = g.append("g")
                    .attr("class", "x axis")
                    .attr("transform", `translate(0,${height})`)

                const yAxisGroup = g.append("g")
                    .attr("class", "y axis")


                d3.interval(() =>{
                    flag = !flag
                    update(data)
                },3000)

                update(data)

                function update(data){
                    const value = flag ? "total" : "theft"
                    const myColor = flag ?"#69b3a2":"rgba(198, 45, 205, 0.8)"
                    const t = d3.transition().duration(2750)

                    x.domain(dataMap.map(d=> d.day))
                    y.domain([0,d3.max(dataMap,d=>d[value])])

                    const xAxisCall = d3.axisBottom(x)
                    xAxisGroup.transition(t).call(xAxisCall)
                        .selectAll("text")
                        .attr("y","10")
                        .attr("x","-5")
                        .attr("text-anchor","middle")
                    const yAxisCall = d3.axisLeft(y)
                    yAxisGroup.transition(t).call(yAxisCall)

                    // Join new data
                    const rects = svg.selectAll("rect")
                        .data(dataMap)
                    //exit old elemnts
                    rects.exit().remove()
                    //update old elements
                    rects.attr('x', (d) => x(d.day)+margin.left)
                        .attr('y', (d) => y(d[value]))
                        .attr("height", (d) => height - y(d[value])+margin.top)
                        .attr("width", x.bandwidth())
                        .attr("fill", myColor)
                    //enter new elements
                    rects.enter().append("rect")
                        .attr('x', (d) => x(d.day)+margin.left)
                        .attr('y', (d) => y(d[value]))
                        .attr("height", (d) => height - y(d[value])+margin.top)
                        .attr("width", x.bandwidth())
                        .attr("fill", myColor)
                        .call(zoom);

                    const text = flag ? "Total Crimes Through a Week" : "Theft Crimes Through a Week"
                    yLable.text(text)

                    function zoom(svg) {
                        const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];

                        svg.call(d3.zoom()
                            .scaleExtent([1, 8])
                            .translateExtent(extent)
                            .extent(extent)
                            .on("zoom", zoomed));

                        function zoomed(event) {
                            x.range([margin.left, width - margin.right].map(d => event.transform.applyX(d)));
                            svg.selectAll(".bars rect").attr("x", d => x(d.day)).attr("width", x.bandwidth());
                            svg.selectAll(".x-axis").call(xAxisCall);
                        }
                    }

                }

             });


    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart2;