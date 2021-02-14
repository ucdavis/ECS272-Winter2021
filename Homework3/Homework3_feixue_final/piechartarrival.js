import { itemMouseOver, itemMouseLeave } from './link.js'
// import * as d3 from 'd3'; 
// import d3Tip from "d3-tip";

export const draw_pie_chart_arrival = (dom) => {
    console.log("Drawing Arrival Pie Chart");
    // transform from Observable to Visual Studio
    // first, load the dataset from a CSV file
    d3.csv('Los_Angeles_International_Airport_-_Passenger_Traffic_By_Terminal.csv')
        .then(data => {
            // log csv in browser console
            // console.log(data);

            // process data from csv
            var arrivalTerminalCount = {};
            var departTerminalCount = {};
            var yearTerminalCount = {};

            data.forEach(d => {
                // calculate arrivalTerminalCount
                if (d['Arrival_Departure'] === 'Arrival') {
                    if (d['Terminal'] in arrivalTerminalCount) {
                        arrivalTerminalCount[d['Terminal']] = arrivalTerminalCount[d['Terminal']] + Number(d['Passenger_Count']);
                    } else {
                        arrivalTerminalCount[d['Terminal']] = Number(d['Passenger_Count']);
                    }
                }
                // calculate departTerminalCount
                else {
                    if (d['Terminal'] in departTerminalCount) {
                        departTerminalCount[d['Terminal']] = departTerminalCount[d['Terminal']] + Number(d['Passenger_Count']);
                    } else {
                        departTerminalCount[d['Terminal']] = Number(d['Passenger_Count']);
                    }
                }

                // calculate yearTerminalCount
                var year = Number(d['DataExtractDate'].split(' ')[0].split('/')[2]);
                if (year in yearTerminalCount) {
                    yearTerminalCount[year] = yearTerminalCount[year] + Number(d['Passenger_Count']);
                } else {
                    yearTerminalCount[year] = Number(d['Passenger_Count']);
                }
            });
            //console.log(arrivalTerminalCount);
            // console.log(departTerminalCount);
            // console.log(yearTerminalCount);


            // from arrivalTerminalCount to formattedArrival
            var formattedArrival = [];
            Object.keys(arrivalTerminalCount).forEach(d => {
                formattedArrival.push(
                    { name: d, passenger: arrivalTerminalCount[d] }
                );
            });
            // console.log(formattedArrival);

            /*********************************
             * Visualization codes start here
             * ********************************/
            // console.log(formattedArrival.map(d => d.name).sort());
            var colors = d3.scaleOrdinal()
                .domain(formattedArrival.map(d => d.name).sort())
                .range(['#9daec8', '#8386a7', '#a07a71', '#8d9b81', '#71807d', '#dfccbd', '#fbbe92', '#ffb1aa', '#d6a3b6', '#b3afb0', '#ddd8c2'])


            var margin = { left: -50, right: 70, top: 40, bottom: 40 };
            const width = dom.width - margin.left- margin.right ;//
            const height = dom.height - margin.top - margin.bottom;

            var svg = d3.select(dom.id)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);


            var data = d3.pie().value(function (d) {
                return d.passenger;
            })(formattedArrival);
            console.log(data);


            var segments = d3.arc()
                .innerRadius(0)
                .outerRadius(height / 2)
                .padAngle(.05)
                .padRadius(50);


            var sections = svg.append("g")
                .attr("transform", "translate(" + (width / 2.5 + margin.left) + "," + (height / 2 + margin.top) + ")")
                .selectAll("path").data(data);

            //Tween Animation
            const arcAnimation = (d) => {
                var i = d3.interpolate(d.endAngle, d.startAngle);

                return function (t) {
                    d.startAngle = i(t);

                    return segments(d);
                }
            }

            sections.enter().append("path")
                .attr("class", "myArea2").attr("d", segments)
                .attr("fill", function (d) {
                    return colors(d.data.passenger)
                })
                // .transition()
                // .duration(750)
                // .attrTween("d", arcAnimation)

                .on("mouseover", function(d, i) {
                    itemMouseOver(i.data.name);
                    svg.append("text")
                        .attr("id", "mouse_over_text")
                        .attr("x", width / 3)
                        .attr("y", margin.top/1.5)
                        .style("font-size", "12px")
                        .attr("font-weight", "bold")
                        .text("Total passenger percent:" + (i.data.passenger / total * 100).toString().substr(0, 4) + "%");
                        //.text((d.data.passenger / total * 100).toString().substr(0, 4) + "%")

                })
                .on("mouseleave", function() {
                    d3.select('#mouse_over_text')
                        .remove();
                    itemMouseLeave();

                })
                .transition()
                .duration(750)
                .attrTween("d", arcAnimation);

                // sections.transition()
                // .duration(750)
                // .attrTween("d", arcAnimation)

               
            var total = 454078173;
            // var percent = Math.round(1000 * d.data.Passenger/ total) / 10;



            const square_width = height / 14;
            var legends = svg.append("g").attr("transform", "translate(" + (width * 0.65) + "," + "0" + ")")
                .selectAll(".legends").data(data);
            var legend = legends.enter().append("g").classed("legends", true)
                .attr("transform", function (d, i) {
                    return "translate(0, " + (i + 1) * (square_width * 1.5) + ")";
                });
            legend.append("rect")
                .attr("width", square_width)
                .attr("height", square_width)
                .attr("fill", function (d) {
                    return colors(d.data.passenger);
                });
            legend.append("text")
                .classed("label", true)
                .text(function (d) {
                    return d.data.name;
                })
                .attr("fill", function (d) {
                    return colors(d.data.passenger);
                })
                .attr("x", square_width + 10)
                .attr("y", square_width * 1.5 / 2);
        })
};