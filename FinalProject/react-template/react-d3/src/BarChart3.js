import React, {Component} from 'react';
import * as d3 from "d3";
import {getData_old, getData_for_country, pack} from "./GetData";

class BarChart3 extends Component {

    componentDidMount() {
        this.drawChart("USA");
    }

    drawChart(iso) {
        getData_old(function () {

            // log csv in browser console
            //console.log(csv);
            var filtered = []

            // create data by selecting two columns from csv
            var temp = pack.CList.find(x => x.iso === iso)
            filtered.push({
                name: temp.name,
                total_case: temp.total_case,
                total_deaths: temp.total_deaths,
                total_vac: temp.total_vac
            })

            var rawdata = pack.CList.find(x => x.iso === iso).close

            console.log(rawdata)


            rawdata.forEach(function (d) {
                filtered.push({
                    name: pack.CList.find(x => x.iso === d.iso).name,
                    total_case: pack.CList.find(x => x.iso === d.iso).total_case,
                    total_deaths: pack.CList.find(x => x.iso === d.iso).total_deaths,
                    total_vac: pack.CList.find(x => x.iso === d.iso).total_vac
                })
            });
            console.log(filtered)

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


            var tooltip2 = document.getElementById('tooltip2')


            update();


            function update() {
                console.log('good')
                tooltip2.innerHTML = ('Hover over histogram to show accurate data');

                var kn = 0;
                var wn = 0;
                view.selectAll("rect").remove()
                view.selectAll("g").remove()
                var data = filtered
                // X axis
                var x = d3.scaleBand()
                    .range([0, width])
                    .domain(data.map(function (d) {
                        return d.name;
                    }))
                    .padding(0.2)

                view.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x))
                    .selectAll("text")
                    .style("text-anchor", "middle")
                    .attr("transform", "translate(0,5)rotate(-13)")


                var y = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.total_case)])
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
                    .text("Number of cases");

                var bar1 = view.selectAll("mybar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", d => {
                        return x(d.name);
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
                        tooltip2.innerHTML = ('In ' + d.name + ',  ' + d.total_case + ' cases are confirmed');
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .transition()
                            .duration(500)
                            .style('fill', 'red')
                        tooltip2.innerHTML = ('Hover over histogram to show accurate data');
                    })

                bar1
                    .transition()
                    .duration(2000)
                    .attr("height", d => {
                        return height - y(d.total_case)
                    })
                    .attr("y", d => {
                        return y(d.total_case);

                    })

                var bar2 = view.selectAll("mybar2")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", d => {
                        return x(d.name);
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
                        tooltip2.innerHTML = ('In ' + d.name + ', ' + d.total_vac + ' people are vaccinated');
                    })
                    .on("mouseout", function (d) {
                        d3.select(this)
                            .transition()
                            .duration(500)
                            .style('fill', 'orange')
                        tooltip2.innerHTML = ('Hover over histogram to show accurate data');
                    })

                bar2
                    .transition()
                    .duration(2000)
                    .attr("height", d => {
                        return height - y(d.total_vac);
                    })
                    .attr("y", d => {
                        return y(d.total_vac);
                    })

            }



        });

    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart3;