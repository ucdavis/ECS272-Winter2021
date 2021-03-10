import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart2 extends Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {

        Promise.all([
            d3.csv(this.props.data),
            d3.csv(this.props.data2),
            d3.csv(this.props.data3)
        ]).then(([csv1, csv2, csvgeo]) => {

                var data = csv1.map(row => {
                    return {
                        iso: row['iso_code'],
                        date: Date.parse(row['date']),
                        total_cases: Number(row['total_cases']),
                        total_deaths: Number(row['total_deaths']),
                        new_cases: Number(row['new_cases']),
                        new_deaths: Number(row['new_deaths']),
                    }
                })
                var data2 = csv2.map(row => {
                    return {
                        iso: row['iso_code'],
                        date: Date.parse(row['date']),
                        people_vaccinated: Number(row['people_vaccinated']),
                        people_fully_vaccinated: Number(row['people_fully_vaccinated'])
                    }
                })
                var datag = csvgeo.map(row => {
                    return {
                        iso: row['Alpha-3 code'].substring(2,5),
                        lat: Date.parse(row['Latitude (average)']),
                        long: Date.parse(row['Longitude (average)'])
                    }
                })
            console.log(datag)

                data2.forEach(function(rv) {
                    var result = data.filter(function(rc) {
                        return rc
                            .iso === rv.iso && rc.date === rv.date;
                    });

                    rv.total_cases = (result[0] !== undefined) ? result[0].total_cases : null;
                    rv.total_deaths = (result[0] !== undefined) ? result[0].total_deaths : null;
                    rv.new_cases = (result[0] !== undefined) ? result[0].new_cases : null;
                    rv.new_deaths = (result[0] !== undefined) ? result[0].new_deaths : null;

                    var result = datag.filter(function(rc) {
                        return rc.iso === rv.iso;
                    });
                    rv.long = (result[0] !== undefined) ? result[0].long : null;
                    rv.lat = (result[0] !== undefined) ? result[0].lat : null;
                });
                data2 = data2.filter(function(data) {
                    return data.total_cases !== null;
                });
                console.log(data2);
                console.log(data)
                /**
                 var filtered = data.filter(function (el) {
                    return (el.gname != "Unknown");
                });
                 */

                var holderV = {};
                var holderC = {};

                data2.forEach(function (d) {
                    if (holderV.hasOwnProperty(d.iso)) {
                        holderV[d.iso] = holderV[d.iso] + d.people_vaccinated;
                    } else {
                        holderV[d.iso] = d.people_vaccinated;
                    }
                    if (holderC.hasOwnProperty(d.iso)) {
                        holderC[d.iso] = holderC[d.iso] + d.new_cases;
                    } else {
                        holderC[d.iso] = d.new_cases;
                    }
                });



                 var filteredC = [];

                 for (var i in holderC) {
                     filteredC.push({iso: i, total_case: holderC[i], total_vac: holderV[i]});
                }

                 console.log(filteredC);

                 //data = filtered2


                /*********************************
                 * Visualization codes start here
                 * ********************************/
                var width = 1600;
                var height = 600;
                var margin = {left: 80, right: 80, top: 60, bottom: 50}

                var svg = d3.select('#container1b')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)

                var view = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                var x = d3.scaleTime()
                    .domain([d3.min(data, d => d.date), d3.max(data, d => d.date)])
                    .range([0, width]);

                var y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.total_cases)])
                    .range([height, 0]);

                var tooltip = document.getElementById('tooltip')
                // create a scatter plot
                tooltip.innerHTML = ('brush dots to show accumulative data');

                var scatterPlot2 = view.append("g")
                    .selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) {
                        return x(d.date)
                    })
                    .attr("cy", function (d) {
                        return y(d.total_cases)
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






                // Function that is triggered when brushing is performed
                function updateChart(event) {
                    var extent = event.selection
                    var t1 = 0;
                    var t2 = 0;


                    if (brush.empty()) {
                        t1 = 0;
                        t2 = 0;
                        tooltip.innerHTML = ('brush dots to show accumulative data');
                    } else {

                        data.forEach(function (d) {
                            if (isBrushed(extent, x(d.date), y(d.total_deaths)))
                                t1 += d.total_deaths;
                            if (isBrushed(extent, x(d.date), y(d.total_cases)))
                                t2 += d.total_cases;
                        });
                        tooltip.innerHTML = ("In the selected region, the number of killed victim is " + t1 + ", the number of wounded victim is " + t2 + "<br />The ratio is " + (t1 / t2).toFixed(2) + " to 1");
                        //console.log(t)
                        scatterPlot.classed("selected", function (d) {
                            return isBrushed(extent, x(d.date), y(d.total_deaths))
                        })
                        scatterPlot2.classed("selected", function (d) {
                            return isBrushed(extent, x(d.date), y(d.total_cases))
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
                        .x(function (d) {
                            return x(d.date)
                        })
                        .y(function (d) {
                            return y(d.total_cases)
                        })
                    )
                // x axis
                view.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x).ticks(10, "d"))
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
                        .extent([[-10, -10], [610, 410]])
                        .on("end", updateChart)
                    )




            }
        );

    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart2;