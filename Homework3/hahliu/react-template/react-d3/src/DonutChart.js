import React, { Component } from 'react';
import * as d3 from "d3";

class DonutChart extends Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        d3.csv(this.props.data)
            .then(csv => {
                // log csv in browser console

                // create data by selecting category column from csv 
                var data = csv.map(row => {
                    return {
                        category: row['Category']
                    }
                })

                //process the data for chart
                var countObj = [];
                for (var i = 0; i < data.length; i++) {
                    if (!countObj[data[i].category]) {
                        countObj[data[i].category] = 0;
                    }
                    countObj[data[i].category]++;
                }

                var indexArr = Object.keys(countObj);
                var countArray = Object.values(countObj);
                var countArr = Object.entries(countObj);
             

                const dataMap = [];
                for (var j = 0; j < countArr.length; j++) {
                    var obj = {
                        key: countArr[j][0],
                        value: countArr[j][1]
                    }
                    dataMap.push(obj);
                }

                // Visualization codes start here

                // set the dimensions and margins of the graph
                var width = 600
                var height = 600
                var margin = 100

                // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.

                var radius = Math.min(width, height) / 2 - margin

                // append the svg object to the div called 'my_dataviz'
                var svg = d3.select('#container')
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

                // set the color scale
                var color = d3.scaleOrdinal()
                    .domain(indexArr)
                    .range(d3.schemeDark2);

                // Compute the position of each group on the pie:
                var pie = d3.pie()
                    .sort(null) // Do not sort group by size  
                    .value(function (d) { return d.value; })
                var data_ready = pie(dataMap);

                console.log(data_ready)
       

                // The arc generator

                var arc = d3.arc()
                    .innerRadius(radius * 0.5)         // This is the size of the donut hole 
                    .outerRadius(radius * 0.8)

                // Another arc that won't be drawn. Just for labels positioning

                var outerArc = d3.arc()
                    .innerRadius(radius * 0.9)
                    .outerRadius(radius * 0.9)

                // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.

                var donutplot = svg
                    .selectAll('allSlices')
                    .data(data_ready)
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function (d) { return (color(d.data.key)) })
                    .attr("stroke", "white")
                    .style("stroke-width", "2px")
                    .style("opacity", 0.7);

                svg
                    .selectAll('allPolylines')
                    .data(data_ready)
                    .enter()
                    .append('polyline')
                    .attr("stroke", "black")
                    .style("fill", "none")
                    .attr("stroke-width", 0.5)
                    .attr('points', function (d) {
                        var posA = arc.centroid(d) // line insertion in the slice
                        var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
                        var posC = outerArc.centroid(d); // Label position = almost the same as posB
                        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                        return [posA, posB, posC]
                    })

                svg
                    .selectAll('allLabels')
                    .data(data_ready)
                    .enter()
                    .append('text')
                    .text(function (d) { console.log(d.data.key); return d.data.key })
                    .attr('transform', function (d) {
                        var pos = outerArc.centroid(d);
                        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                        return 'translate(' + pos + ')';
                    })
                    .style('font-size', '10px')
                    .style('text-anchor', function (d) {
                        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 //d.startAngle + (d.endAngle - d.startAngle) / 2
                        return (midangle < Math.PI ? 'start' : 'end')
                    })

                //
                // var getAngle = function (d) {
                //     return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90);
                // };
                //
                // g.append("text")
                //     .attr("transform", function(d) {
                //         return "translate(" + pos.centroid(d) + ") " +
                //             "rotate(" + getAngle(d) + ")"; })
                //     .attr("dy", 5)
                //     .style("text-anchor", "start")
                //     .text(function(d) { return d.data.label; });



                // svg.append("g")
                //     .attr("font-family", "sans-serif")
                //     .attr("font-size", 10)
                //     .attr("text-anchor", "middle")
                //     .selectAll("text")
                //     .data(data_ready)
                //     .join("text")
                //     .attr("transform", d => `translate(${arc.centroid(d)})`)
                //     .call(text => text.append("tspan")
                //         .attr("y", "-0.4em")
                //         .text(d => d.data.key));

                var tooltip = document.getElementById('tooltip')
                donutplot
                    .on('mouseenter', function (d) {
                        d3.select(this).style('fill', 'red')
                        tooltip.innerHTML = 'In 2016, there is '+ (d3.select(this).data()[0].value) + ' of '+ (d3.select(this).data()[0].data.key) + ' Incidences.'
                    })
                    .on('mouseleave', function (d) {
                        var colorOri = color((d3.select(this).data()[0].data.key));
                        d3.select(this).style('fill', colorOri)
                    });


            });

    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default DonutChart;