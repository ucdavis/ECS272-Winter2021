import React, {Component} from 'react';
import * as d3 from "d3";
import {getData_old, getData_for_country, pack} from "./GetData.js"


class BarChart2 extends Component {

    componentDidMount() {
        this.drawChart(this.props.iso);
    }


    drawChart(iso) {
        //getData1();

        getData_old(function () {
            console.log('loading finished');
            var datapack = pack
            var data = getData_for_country(pack.data,iso);
            var CList = datapack.CList
            var c = iso
            //console.log(d3.max(pack.CList, d => d.total_vac/d.population))
            /*********************************
             * Visualization codes start here
             * *******************************/
            var width = 1600;
            var height = 600;
            var margin = {left: 80, right: 80, top: 60, bottom: 50}

            var svg = d3.select('.SKY')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)

            var view = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


            var x = d3.scaleTime()
                .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
                .range([0, width]);

            var y = d3.scaleLinear()
                .domain([0,  Math.max(d3.max(data,d => d.total_case),d3.max(data,d => d.total_vaccinated),d3.max(data,d => d.daily_vaccinated))])
                .range([height, 0]);

            var tooltip = document.getElementById('tooltip')
            // create a scatter plot
            tooltip.innerHTML = ('Currently displaying country is:' + CList.find(x => x.iso === c).name);

            var scatterPlot2 = view.append("g")
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.date)
                })
                .attr("cy", function (d) {
                    return y(d.total_case)
                })
                .attr("r", 8)
                .attr("fill", "orange")
                .attr('opacity', 0.8)

            var scatterPlot = view.append("g")
                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.date)
                })
                .attr("cy", function (d) {
                    return y(d.total_deaths)
                })
                .attr("r", 8)
                .attr("fill", "red")
                .attr('opacity', 0.8)

            var scatterPlot3 = view.append("g")
                .selectAll("dot")

                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.date)
                })
                .attr("cy", function (d) {
                    return y(d.daily_vaccinated)
                })
                .attr("r", 8)
                .attr("fill", "blue")
                .attr('opacity', 0.8)

            var scatterPlot4 = view.append("g")

                .selectAll("dot")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return x(d.date)
                })
                .attr("cy", function (d) {
                    return y(d.total_vaccinated)
                })
                .attr("r", 8)
                .attr("fill", "green")
                .attr('opacity', 0.8)


            // Function that is triggered when brushing is performed
            function updateChart(event) {
                var extent = event.selection
                var t1 = 0;
                var t2 = 0;
                var t3 = 0;
                var t4 = 0;

                if (brush.empty()) {
                    t1 = 0;
                    t2 = 0;
                    t3 = 0;
                    t4 = 0;
                    tooltip.innerHTML = ('brush dots to show accumulative data');
                } else {

                    data.forEach(function (d) {
                        if (isBrushed(extent, x(d.date), y(d.total_deaths)))
                            t1 += d.total_deaths;
                        if (isBrushed(extent, x(d.date), y(d.total_case)))
                            t2 += d.total_case;
                        if (isBrushed(extent, x(d.date), y(d.daily_vaccinated)))
                            t3 += d.daily_vaccinated;
                    });
                    tooltip.innerHTML = ("In the selected dots, the number of confirmed case is " + t1 + ", the number of dead cases is " + t2 + "<br />The ratio is " + (t1 / t2).toFixed(2) + " to 1" +"<br />" +
                        "newely vaccinated " + t3 + " people");
                    //console.log(t)
                    scatterPlot.classed("selected", function (d) {
                        return isBrushed(extent, x(d.date), y(d.total_deaths))
                    })
                    scatterPlot2.classed("selected", function (d) {
                        return isBrushed(extent, x(d.date), y(d.total_case))
                    })
                    scatterPlot3.classed("selected", function (d) {
                        return isBrushed(extent, x(d.date), y(d.total_case))
                    })
                    scatterPlot4.classed("selected", function (d) {
                        return isBrushed(extent, x(d.date), y(d.total_case))
                    })
                }


            }

            // A function that return TRUE or FALSE according if a dot is in the selection or not
            function isBrushed(brush_coords, cx, cy) {
                if (brush_coords === null) {
                    return false
                }
                var x0 = brush_coords[0][0],
                    x1 = brush_coords[1][0],
                    y0 = brush_coords[0][1],
                    y1 = brush_coords[1][1];
                return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
            }


            var l1 = view.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", "10,3")
                .attr("stroke-linecap", "round")
                .attr('opacity', 0.8)
                .attr("d", d3.line()
                    .defined(function (d) { return d.total_deaths !== 0; })
                    .x(function (d) {
                        return x(d.date)
                    })
                    .y(function (d) {
                        return y(d.total_deaths)
                    })
                )
            var l2 = view.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "gray")
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", "5,3")
                .attr("stroke-linecap", "round")
                .attr('opacity', 0.8)
                .attr("d", d3.line()
                    .defined(function (d) { return d.total_case !== 0; })
                    .x(function (d) {
                        return x(d.date)
                    })
                    .y(function (d) {
                        return y(d.total_case)
                    })
                )
            var l3 = view.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "gray")
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", "5,3")
                .attr("stroke-linecap", "round")
                .attr('opacity', 0.8)
                .attr("d", d3.line()
                    .defined(function (d) { return d.daily_vaccinated !== 0; })
                    .x(function (d) {
                        return x(d.date)
                    })
                    .y(function (d) {
                        return y(d.daily_vaccinated)
                    })
                )
            var l4 = view.append("path")

                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "gray")
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", "5,3")
                .attr("stroke-linecap", "round")
                .attr('opacity', 0.8)
                .attr("d", d3.line()
                    .defined(function (d) { return d.total_vaccinated !== 0; })
                    .x(function (d) {
                        return x(d.date)
                    })
                    .y(function (d) {
                        return y(d.total_vaccinated)
                    })
                )
            // x axis
            view.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(10))
                .append("text")
                .attr("fill", "#000")
                .attr("x", width / 2)
                .attr('y', margin.bottom / 2)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Date");

            // y axis
            view.append("g")
                .call(d3.axisLeft(y).ticks(10))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("x", -height / 2)
                .attr("y", -margin.left)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Number of Cases");
            var brush = view
                .call(d3.brush()
                    .extent([[-10, -10], [1610, 610]])
                    .on("end", updateChart)
                )

        });
    //getData(()=>(console.log('aaaa')))
    }




    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart2;