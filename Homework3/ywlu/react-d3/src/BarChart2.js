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
                var margin = {left: 80, right: 80, top: 60, bottom: 50}

                var svg = d3.select('#container1b')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)

                var view = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




                //scale functions
                var x = d3.scaleLinear()
                    .domain([d3.min(data, d => d.iyear), d3.max(data, d => d.iyear)])
                    .range([0, width]);

                var y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.nkill)])
                    .range([height, 0]);

                var tooltip = document.getElementById('tooltip')
                // create a scatter plot
                tooltip.innerHTML = ('brush dots to show accumulative data');

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



                var selectedOption = "Both"
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
                    selectedOption = d3.select(this).property("value")

                    update(selectedOption)
                })
                var b1 = true;
                var b2 = true;
                function update(selectedGroup) {
                    //console.log(selectedGroup)
                    switch (selectedGroup) {

                        case 'Kill Count':
                            scatterPlot.attr('opacity', 0.8);
                            l1.attr('opacity', 0.8);
                            scatterPlot2.attr('opacity', 0);
                            l2.attr('opacity', 0);
                            b1 = true;
                            b2 = false;
                            break;

                        case 'Wound Count':
                            scatterPlot.attr('opacity', 0);
                            l1.attr('opacity', 0);
                            scatterPlot2.attr('opacity', 0.8);
                            l2.attr('opacity', 0.8);
                            b1 = false;
                            b2 = true;
                            break;
                        default:
                            scatterPlot.attr('opacity', 0.8);
                            l1.attr('opacity', 0.8);
                            scatterPlot2.attr('opacity', 0.8);
                            l2.attr('opacity', 0.8);
                            b1 = true;
                            b2 = true;
                    }
                }




                // Function that is triggered when brushing is performed
                function updateChart(event) {
                    var extent = event.selection
                    var t1 = 0;
                    var t2 = 0;
                    update(selectedOption)

                    if (brush.empty()) {
                        t1 = 0;
                        t2 = 0;
                        tooltip.innerHTML = ('brush dots to show accumulative data');
                    } else {

                        data.forEach(function (d) {
                            if (isBrushed(extent, x(d.iyear), y(d.nkill)))
                                t1 += d.nkill;
                            if (isBrushed(extent, x(d.iyear), y(d.nwound)))
                                t2 += d.nwound;
                        });
                        tooltip.innerHTML = ("In the selected region, the number of killed victim is "+ t1+ ", the number of wounded victim is " + t2 +"<br />The ratio is " + (t1/t2).toFixed(2) + " to 1");
                        //console.log(t)
                        scatterPlot.classed("selected", function(d){ return b1 && isBrushed(extent, x(d.iyear), y(d.nkill) ) } )
                        scatterPlot2.classed("selected", function(d){ return b2 && isBrushed(extent, x(d.iyear), y(d.nwound) ) } )
                    }




                }

                // A function that return TRUE or FALSE according if a dot is in the selection or not
                function isBrushed(brush_coords, cx, cy) {
                    if (brush_coords === null)
                    {
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
                    .call(d3.axisBottom(x).ticks(10, "d"))
                    .append("text")
                    .attr("fill", "#000")
                    .attr("x", width / 2)
                    .attr('y', margin.bottom / 2)
                    .attr("dy", "0.71em")
                    .attr("text-anchor", "end")
                    .text("Year of the attack");

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
                var brush = view
                    .call( d3.brush()
                        .extent( [ [-10,-10], [610,410] ] )
                        .on("end", updateChart)
                    )

                svg.append('rect')
                    .attr('x', 140)
                    .attr('y', 115)
                    .attr('width', 215)
                    .attr('height', 45)
                    .attr('stroke', 'black')
                    .attr('fill', 'none');
                svg.append("circle").attr("cx",150).attr("cy",130).attr("r", 6).style("fill", "red")
                svg.append("circle").attr("cx",150).attr("cy",146).attr("r", 6).style("fill", "orange")
                svg.append("text").attr("x", 160).attr("y", 131).text("Killed").style("font-size", "15px").attr("alignment-baseline","middle")
                svg.append("text").attr("x", 160).attr("y", 149).text("Wounded").style("font-size", "15px").attr("alignment-baseline","middle")
                svg.append("text").attr("x", 230).attr("y", 139).text("Victim of the year").style("font-size", "15px").attr("alignment-baseline","middle")


            });

    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart2;