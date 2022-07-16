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
                var margin = {left: 80, right: 80, top: 60, bottom: 50}

                var svg = d3.select('#container3b')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)

                var view = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                var tooltip2 = document.getElementById('tooltip2')
                var tooltip3 = document.getElementById('tooltip3')

                update(10);



                function update(n) {
                    tooltip2.innerHTML = ('Hover over histogram to show accurate data' );
                    tooltip3.innerHTML = ('Select histograms to show accumulative data' );
                    var kn = 0;
                    var wn = 0;
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
                        .attr("transform", "translate(0,5)rotate(-13)")


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
                        .attr("y", 400)

                        .attr("width", x.bandwidth() - 10)
                        .attr("height", 1)
                        .attr("fill", "red")
                        .attr('opacity', 0.5)
                        .attr("transform", "translate(-5,0)")
                        .on("mouseover", function (event, d) {
                            //console.log(event);
                            d3.select(this)
                                .transition()
                                .duration(500)
                                .style('fill', 'black')
                            tooltip2.innerHTML = ('In total, by terro-group ' + d.gname + ',  ' + d.nkill + ' victims are killed');
                        })
                        .on("mouseout", function (d) {
                            d3.select(this)
                                .transition()
                                .duration(500)
                                .style('fill', 'red')
                            tooltip2.innerHTML = ('Hover over histogram to show accurate data');
                        })
                        .on("click", function (event, d) {
                            if (!d3.select(this).classed("selected")) {
                                kn += d.nkill
                                d3.select(this).classed("selected", true)


                                updatebar(wn,kn)
                            } else {
                                kn -= d.nkill
                                d3.select(this).classed("selected", false)

                                updatebar(wn,kn)
                            }
                        })


                    bar1
                        .transition()
                        .duration(2000)
                        .attr("height", d => {
                            return height - y(d.nkill)
                        })
                        .attr("y", d => {
                            return y(d.nkill);

                        })

                    var bar2 = view.selectAll("mybar2")
                        .data(data)
                        .enter()
                        .append("rect")
                        .attr("x", d => {
                            return x(d.gname);
                        })
                        .attr("y", 400)
                        .attr("width", x.bandwidth() - 10)
                        .attr("height", 1)

                        .attr("fill", "orange")
                        .attr('opacity', 0.5)
                        .attr("transform", "translate(5,0)")
                        .on("mouseover", function (event, d) {
                            //console.log(event);
                            d3.select(this)
                                .transition()
                                .duration(500)
                                .style('fill', 'black')
                            tooltip2.innerHTML = ('In total, by terro-group ' + d.gname + ', ' + d.nwound + ' victims are wounded');
                        })
                        .on("mouseout", function (d) {
                            d3.select(this)
                                .transition()
                                .duration(500)
                                .style('fill', 'orange')
                            tooltip2.innerHTML = ('Hover over histogram to show accurate data');
                        })

                        .on("click", function (event, d) {
                            if (!d3.select(this).classed("selected")) {
                                wn += d.nwound
                                d3.select(this).classed("selected", true)

                                updatebar(wn,kn)
                            } else {
                                wn -= d.nwound
                                d3.select(this).classed("selected", false)

                                updatebar(wn,kn)
                            }
                        })
                    bar2
                        .transition()
                        .duration(2000)
                        .attr("height", d => {
                            return height - y(d.nwound);
                        })
                        .attr("y", d => {
                            return y(d.nwound);
                        })

                }

                function updatebar(n1,n2){
                    if (n1 == 0 && n2 == 0)
                    {
                        tooltip3.innerHTML = ('Select histograms (by clicking) to show accumulative data')
                        return
                    }
                    if (n1 != 0 && n2 == 0)
                    {
                        tooltip3.innerHTML = ('The total number of wounded victim for selected group(s) is ' + n1);
                        return;
                    }
                    if (n1 == 0 && n2 != 0)
                    {
                        tooltip3.innerHTML = ('The total number of killed victim for selected group(s) is ' + n2);
                        return;
                    }
                    tooltip3.innerHTML = ('The total number of wounded victim for selected group(s) is ' + n1
                        +"</Br>"+ 'The total number of Killed victim for selected group(s) is ' + n2);
                }

                d3.select("#button1").on("click", function (d) {
                    update(5)
                })
                d3.select("#button2").on("click", function (d) {
                    update(10)
                })
                d3.select("#button3").on("click", function (d) {
                    update(15)
                })
                d3.select("#reset").on("click", function (d) {
                    view.selectAll("rect")

                        .classed("selected",false)
                    updatebar(0,0)
                })

                svg.append('rect')
                    .attr('x', 390)
                    .attr('y', 115)
                    .attr('width', 230)
                    .attr('height', 45)
                    .attr('stroke', 'black')
                    .attr('fill', 'none');
                svg.append("circle").attr("cx", 400).attr("cy", 130).attr("r", 6).style("fill", "red").attr('opacity', 0.5)
                svg.append("circle").attr("cx", 400).attr("cy", 148).attr("r", 6).style("fill", "orange").attr('opacity', 0.5)
                svg.append("text").attr("x", 410).attr("y", 131).text("Killed").style("font-size", "15px").attr("alignment-baseline", "middle")
                svg.append("text").attr("x", 410).attr("y", 149).text("Wounded").style("font-size", "15px").attr("alignment-baseline", "middle")
                svg.append("text").attr("x", 480).attr("y", 139).text("Victim by the group").style("font-size", "15px").attr("alignment-baseline", "middle")


            });

    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart3;