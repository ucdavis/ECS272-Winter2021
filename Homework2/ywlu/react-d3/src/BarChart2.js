import React, {Component} from 'react';
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

                filtered.forEach(function(d) {
                    if (holderk.hasOwnProperty(d.iyear)) {
                        holderk[d.iyear] = holderk[d.iyear] + d.nkill;
                    } else {
                        holderk[d.iyear] = d.nkill;
                    }
                    if (holderw.hasOwnProperty(d.iyear)) {
                        holderw[d.iyear] = holderw[d.iyear] + d.nwound;
                    } else {
                        holderw[d.iyear] = d.nwound;
                    }
                });

                var filtered2 = [];

                for (var i in holderk) {
                    filtered2.push({ iyear: i, nkill: holderk[i], nwound: holderw[i]});
                }

                //console.log(filtered2);

                data = filtered2




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

                var divt = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

                //scale functions
                var x = d3.scaleLinear()
                    .domain([d3.min(data, d => d.iyear), d3.max(data, d => d.iyear)])
                    .range([0, width]);

                var y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.nkill)])
                    .range([height, 0]);

                var tooltip = document.getElementById('tooltip')
                // create a scatter plot


                var scatterPlot = view.append("g")
                    .selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d) { return x(d.iyear) } )
                    .attr("cy", function(d) { return y(d.nkill) } )
                    .attr("r", 8)
                    .attr("fill", "red")
                    .attr('opacity', 0.8)

                    .on("mouseover", function(event,d) {
                        //console.log(event);
                        d3.select(this).style('fill', 'black')
                        tooltip.innerHTML = ('In ' + d.iyear + ', A total number of ' + d.nkill +' victims are killed');
                    })
                    .on("mouseout", function(d) {
                        d3.select(this).style('fill', 'red')
                        tooltip.innerHTML = ('hover on a element to show accurate data');
                    });

                var scatterPlot2 = view.append("g")
                    .selectAll("dot")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d) { return x(d.iyear) } )
                    .attr("cy", function(d) { return y(d.nwound) } )
                    .attr("r", 8)
                    .attr("fill", "orange")
                    .attr('opacity', 0.8)

                    .on("mouseover", function(event,d) {
                        //console.log(event);
                        d3.select(this).style('fill', 'black')
                        tooltip.innerHTML = ('In ' + d.iyear + ', A total number of ' + d.nwound +' victims are wounded');
                    })
                    .on("mouseout", function(d) {
                        d3.select(this).style('fill', 'orange')
                        tooltip.innerHTML = ('hover on a element to show accurate data');
                    });


                tooltip.innerHTML = ('hover on a element(like points, bars) to show accurate data');

                var allGroup = ["Both", "Kill Count", "Wound Count"]

                // add the options to the button
                d3.select("#selectButton")
                    .selectAll('myOptions')
                    .data(allGroup)
                    .enter()
                    .append('option')
                    .text(function (d) { return d; }) // text showed in the menu
                    .attr("value", function (d) { return d; }) // corresponding value returned by the button
                d3.select("#selectButton").on("change", function(d) {
                    // recover the option that has been chosen
                    var selectedOption = d3.select(this).property("value")
                    // run the updateChart function with this selected option

                    update(selectedOption)
                })
                function update(selectedGroup) {
                    //console.log(selectedGroup)
                    switch (selectedGroup) {

                        case 'Kill Count':
                            scatterPlot.attr('opacity', 0.8);
                            l1.attr('opacity', 0.8);
                            scatterPlot2.attr('opacity', 0);
                            l2.attr('opacity', 0);
                            break;

                        case 'Wound Count':
                            scatterPlot.attr('opacity', 0);
                            l1.attr('opacity', 0);
                            scatterPlot2.attr('opacity', 0.8);
                            l2.attr('opacity', 0.8);
                            break;
                        default:
                            scatterPlot.attr('opacity', 0.8);
                            l1.attr('opacity', 0.8);
                            scatterPlot2.attr('opacity', 0.8);
                            l2.attr('opacity', 0.8);
                    }
                }

                svg.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "red")
                svg.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "orange")
                svg.append("text").attr("x", 220).attr("y", 130).text("Kills").style("font-size", "15px").attr("alignment-baseline","middle")
                svg.append("text").attr("x", 220).attr("y", 160).text("Wounds").style("font-size", "15px").attr("alignment-baseline","middle")

                var l1 = view.append("path")
                    .datum(data)
                    .attr("fill", "none")
                    .attr("stroke", "black")
                    .attr("stroke-width", 2)
                    .attr("stroke-dasharray", "10,3")
                    .attr("stroke-linecap", "round")
                    .attr('opacity', 0.8)
                    .attr("d", d3.line()
                        .x(function(d) { return x(d.iyear) })
                        .y(function(d) { return y(d.nkill) })
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
                        .x(function(d) { return x(d.iyear) })
                        .y(function(d) { return y(d.nwound) })
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
                    .text("Date of the attack");

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
                    .text("Number of Victims");


            });

    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart2;