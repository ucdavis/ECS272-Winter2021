import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart3 extends Component {

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
                        iyear: Number(row['iyear']),
                        nkill: Number(row['nkill']),
                        nwound: Number(row['nwound']),
                        gname: row['gname']
                    }
                })

                var filtered = data.filter(function (el) {
                    return (el.gname != "Unknown");
                });

                var holderk = {};
                var holderw = {};

                filtered.forEach(function (d) {
                    if (holderk.hasOwnProperty(d.gname)) {
                        holderk[d.gname] = holderk[d.gname] + d.nkill;
                    } else {
                        holderk[d.gname] = d.nkill;
                    }
                    if (holderw.hasOwnProperty(d.gname)) {
                        holderw[d.gname] = holderw[d.gname] + d.nwound;
                    } else {
                        holderw[d.gname] = d.nwound;
                    }
                });

                var filtered2 = [];

                for (var i in holderk) {
                    filtered2.push({gname: i, nkill: holderk[i], nwound: holderw[i]});
                }


                var filtered2 = filtered2.filter(function (el) {
                    return (el.nkill != 0) || (el.nwound != 0);
                });


                filtered2 = filtered2.sort(function (a, b) {
                    return b.nkill + b.nwound - a.nkill - a.nwound;
                }).slice(0, 15)

                data = filtered2;
                console.log(data.slice(0, 10));


                /*********************************
                 * Visualization codes start here
                 * ********************************/
                var width = 600;
                var height = 400;
                var margin = {left: 60, right: 20, top: 20, bottom: 60}

                var svg = d3.select('#container')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)

                var view = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var tooltip = document.getElementById('tooltip')

                update(10);

                function update(n) {
                    view.selectAll("rect").remove()
                    view.selectAll("g").remove()
                    data = filtered2.slice(0, Number(n));
                    // X axis
                    var x = d3.scaleBand()
                        .range([0, width])
                        .domain(data.map(function (d) {
                            return d.gname;
                        }))
                        .padding(0.2)

                    view.append("g")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x))
                        .selectAll("text")
                        .style("text-anchor", "middle")
                        .attr("transform", "translate(0,5)rotate(-10)")



                    var y = d3.scaleLinear()
                        .domain([0, d3.max(data, d => d.nkill)])
                        .range([height, 0]);


                    view.append("g")
                        .call(d3.axisLeft(y).ticks(10))
                        .append("text")
                        .attr("fill", "#000")
                        .attr("transform", "rotate(-90)")
                        .attr("x", -height / 2)
                        .attr("y", -margin.left)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end")
                        .text("Number of Victims");

                    var bar1 = view.selectAll("mybar")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("x", d => {
                            return x(d.gname);
                        })
                        .attr("y", d => {
                            return y(d.nkill);
                        })
                        .attr("width", x.bandwidth())
                        .attr("height", d => {
                            return height - y(d.nkill);
                        })
                        .attr("fill", "red")
                        .attr('opacity', 0.5)
                        .attr("transform", "translate(-5,0)")
                        .on("mouseover", function (event, d) {
                            //console.log(event);
                            d3.select(this).style('fill', 'black')
                            tooltip.innerHTML = ('In total, by terro-group ' + d.gname + ',  ' + d.nwound + ' victims are killed');
                        })
                        .on("mouseout", function(d) {
                            d3.select(this).style('fill', 'red')
                            tooltip.innerHTML = ('hover on a element to show accurate data');
                        })
                        .exit()
                        .remove();

                    var bar2 = view.selectAll("mybar2")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("x", d => {
                            return x(d.gname);
                        })
                        .attr("y", d => {
                            return y(d.nwound);
                        })
                        .attr("width", x.bandwidth())
                        .attr("height", d => {
                            return height - y(d.nwound);
                        })
                        .attr("fill", "orange")
                        .attr('opacity', 0.5)
                        .attr("transform", "translate(5,0)")
                        .on("mouseover", function (event, d) {
                            //console.log(event);
                            d3.select(this).style('fill', 'black')
                            tooltip.innerHTML = ('In total, by terro-group ' + d.gname + ', ' + d.nwound + ' victims are wounded');
                        })
                        .on("mouseout", function(d) {
                            d3.select(this).style('fill', 'orange')
                            tooltip.innerHTML = ('hover on a element to show accurate data');
                        })
                        .exit()
                        .remove();
                }

                d3.select("#button1").on("click", function(d) {
                    update(5)
                })
                d3.select("#button2").on("click", function(d) {
                    update(10)
                })
                d3.select("#button3").on("click", function(d) {
                    update(15)
                })







            });

    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart3;