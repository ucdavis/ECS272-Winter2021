import { itemMouseOver, itemMouseLeave } from './link.js'

export const draw_bar_chart = (dom, selectedMonth) => {
    // transform from Observable to Visual Studio
    // first, load the dataset from a CSV file
    d3.csv('Los_Angeles_International_Airport_-_Passenger_Traffic_By_Terminal.csv')
        .then(data => {
            // log csv in browser console
            //console.log(data);

            // process data from csv
            var totalPassenger = {};
            var avgPassenger = {};


            data.forEach(d => {
                // calculate arrivalTerminalCount
                var month = Number(d['ReportPeriod'].split(" ")[0].split("/")[0]);
                if (month in totalPassenger) {
                    let terminal = d['Terminal'];
                    if (terminal in totalPassenger[month]) {
                        totalPassenger[month][terminal]['count'] += Number(d['Passenger_Count']);
                        totalPassenger[month][terminal]['total'] += 1;
                    } else {
                        totalPassenger[month][terminal] = { 'count': Number(d['Passenger_Count']), 'total': 1 };
                    }
                } else {
                    let terminal = d['Terminal'];
                    totalPassenger[month] = {};
                    totalPassenger[month][terminal] = { 'count': Number(d['Passenger_Count']), 'total': 1 };
                }
            });

            // console.log(totalPassenger);

            Object.keys(totalPassenger).forEach(m => {
                avgPassenger[m] = [];
                Object.keys(totalPassenger[m]).forEach(t => {
                    avgPassenger[m].push({ name: t, avg: totalPassenger[m][t]['count'] / totalPassenger[m][t]['total'] });
                });
            });

            console.log(avgPassenger);

            var formattedData = avgPassenger[selectedMonth];
            // console.log(formattedData);

            /*********************************
             * Visualization codes start here
             * ********************************/
            var width = dom.width;
            var height = dom.height;
            var margin = { left: 100, right: 30, top: 20, bottom: 60 };


            //Create the SVG and location for where we will draw our chart
            var svg = d3.select(dom.id)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);

            //Set up our Y axis scale
            const y = d3.scaleLinear()
                .domain([0, d3.max(formattedData, d => d.avg)])
                .range([height - margin.bottom, margin.top]);


            //Set up our X axis scale
            const x = d3.scaleBand()
                .domain(d3.range(formattedData.length))
                .range([margin.left, width - margin.right])
                .padding(0.1);

            var color = d3.scaleOrdinal()
                .domain(formattedData.map(d => d.name).sort())
                .range(['#9daec8', '#8386a7', '#a07a71', '#8d9b81', '#71807d', '#dfccbd', '#fbbe92', '#ffb1aa', '#d6a3b6', '#b3afb0', '#ddd8c2'])

            //initialize the location for the X Axis
            const xAxis = g => g
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickFormat(i => formattedData[i].name))
                .selectAll("text")
                .attr("y", -3)
                .attr("x", 9)
                .attr("transform", "rotate(90)")
                .style("text-anchor", "start");


            // initialize the location of the Y axis
            const yAxis = g => g
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y));



            svg.append("g")
                .call(yAxis)
                .call(g =>
                    g
                        .select(".tick:last-of-type text")
                        .clone()
                        .attr("transform", `rotate(90)`)
                        .attr("text-anchor", "middle")
                        .attr("x", -(width - margin.left - margin.right) / 3)
                        .attr("x", 120)
                        .attr("y", 70)
                        .attr("font-weight", "bold")
                        .text("Average Passenger Count")
                );

            //show month
            svg.append("g")
                .call(xAxis)
                .call(g =>
                    g
                        .select(".tick:last-of-type text")
                        .clone()
                        .attr("transform", `rotate(0)`)
                        .attr("y", -160)
                        .attr("x", -(width - margin.left - margin.right) / 2)
                        .attr("font-size", 14)
                        .attr("font-weight", "bold")
                        .text("month: " + selectedMonth)
                );

            var Onetimechange = null;
            svg.append("g")
                .selectAll("rect")
                .data(formattedData)
                .enter()
                .append("rect")
                .attr("class", "myBar")
                .attr("height", function (d) { return height - y(0); }) // always equal to 0
                .attr("y", function (d) { return y(0); })
                .on("mouseover", function (d, i) {
                    itemMouseOver(i.name);
                    svg.append("text")
                        .attr("id", "mouse_over_text")
                        .attr("x", width / 2)
                        .attr("y", 60)
                        .style("font-size", "12px")
                        .attr("font-weight", "bold")
                        //.text("Bar Chart Text:" + i.name + i.avg);
                        // no bar at the beginning thus:
                        .text("Average passenger count" + ":" + Math.trunc(i.avg));

                    if (Onetimechange != i.name) {
                        Onetimechange = i.name;

                        svg.selectAll("rect")
                        .transition()
                        .duration(0)
                        .attr("y", function (d) { return height - margin.bottom; })
                        .attr("height", function (d) {
                            return height - margin.bottom - y(0);
                        })

                    // Animation
                    svg.selectAll("rect")
                        .transition()
                        .duration(800)
                        .attr("y", function (d) { return y(d.avg); })
                        .attr("height", function (d) { return height - margin.bottom - y(d.avg); })
                        .delay(function (d, i) {
                            //console.log(i); 
                            return (i * 50);
                        })
                    }
                })
       
                    .on("mouseleave", function () {
                            d3.select('#mouse_over_text')
                                .remove();
                            itemMouseLeave();
                        })
                        .attr("x", (d, i) => x(i))
                        .attr("y", d => y(d.avg))
                        .attr("height", d => y(0) - y(d.avg))
                        .attr("width", x.bandwidth())
                        .attr("fill", function (d) {
                            return color(d.name);
                        });
                })
        };