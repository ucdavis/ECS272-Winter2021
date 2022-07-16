import React, {Component} from 'react';
import * as d3 from "d3";
import {getData_old,pack} from "./GetData";

class BarChart4 extends Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        getData_old(function () {

                // create data by selecting two columns from csv

               var data = pack.CList

                /*********************************
                 * Visualization codes start here
                 * ********************************/
                var width = 1000;
                var height = 700;
                var margin = {left: 10, right: 10, top: 40, bottom: 40}

                var svg = d3.select('.PC')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)

                var view = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                var i = 0
                data.forEach(function (rv) {
                    rv.index =i++}

                )
               console.log(data);

                var dimensions = [
                    'index',
                    'total_vac',
                    'total_case',
                    'total_deaths',
                    ];

                var y = {}
                var i = 0;

                for (i in dimensions) {
                    var name = dimensions[i]
                  //  console.log(name)
                    y[name] = d3.scaleLinear()
                        .domain(d3.extent(data, d => {
                            return d[name];
                        }))
                        .range([height, 0])

                }

                var x = d3.scalePoint()
                    .range([0, width])
                    .padding(1)
                    .domain(dimensions);

                function path(d) {
                    return d3.line()(dimensions.map(d1 => {
                        return [x(d1), y[d1](d[d1])];
                    }));
                }

                view
                    .selectAll("myPath")
                    .data(data)
                    .enter().append("path")
                    .attr("d", path)
                    .style("fill", "none")
                    .style("stroke", d => {
                        var cs = d3.scaleLinear()
                            .domain([0, 50000, 200000])
                            .range(["lightyellow", "red", "black"]);

                        return cs(d.total_case)
                    })
                    .style("opacity", 0.1)
                    .attr("stroke-width", 2)
                    .attr("stroke-linecap", "round")

                view.selectAll("myAxis")
                    .data(dimensions).enter()
                    .append("g")
                    .attr("transform", d => {
                        return "translate(" + x(d) + ")";
                    })
                    .each(function (d) {

                            d3.select(this).call(d3.axisLeft().scale(y[d]));


                    })

                    .append("text")
                    .style("text-anchor", "middle")
                    .attr("y", -10)
                    .text(function (d) {
                        console.log(d)
                        return d;
                    })
                    .style("fill", "black")

            });

    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart4;