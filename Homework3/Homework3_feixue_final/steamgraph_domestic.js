import {itemMouseLeave, itemMouseOver} from "./link.js";

export const draw_streamgraph_domestic = (dom) => {
    console.log("Drawing Domestic Stream Graph");
    d3.csv('Los_Angeles_International_Airport_-_Passenger_Traffic_By_Terminal.csv')
        .then(data => {
            // log csv in browser console
            // console.log(data);

            var advanceVisData = {};
            var airport = new Set();


            data.forEach(d => {
                airport.add(d['Terminal']);
                if (d['Domestic_International'] === 'Domestic') {
                    var period = new Date(d['ReportPeriod']);
                    // var year = Number(d['ReportPeriod'].split(' ')[0].split('/')[2]);
                    if (period in advanceVisData) {
                        if (d['Terminal'] in advanceVisData[period]) {
                            advanceVisData[period][d['Terminal']] += Number(d['Passenger_Count']);
                        } else {
                            advanceVisData[period][d['Terminal']] = Number(d['Passenger_Count']);
                        }
                    } else {
                        advanceVisData[period] = {};
                        advanceVisData[period][d['Terminal']] = Number(d['Passenger_Count']);
                    }
                }
            });

            // console.log(airport);
            // console.log(advanceVisData);
            // console.log(advanceVisData['2014']);

            // advanceVisData = {  "2014/01/01": {"T1": 42, "T3": 50},
            //                     "2015/10/01": {"T1": 78, "T2": 90, "T3": 85}};
            // formattedData = [{year: "2014/01/01", "T1": 42, "T2": 0, "T3": 50}, {}, {}];


            // reformat the advanceVisData for d3.stack()
            var formattedData = [];
            Object.keys(advanceVisData).forEach(d => {
                var item = {};
                item['year'] = d;
                airport.forEach(terminal => {
                    if (terminal in advanceVisData[d]) {
                        item[terminal] = advanceVisData[d][terminal];
                    } else {
                        item[terminal] = 0;
                    }
                });
                formattedData.push(item);
            });
            // console.log(formattedData);


            /*********************************
             * Visualization codes start here
             * ********************************/

            const margin = { top: 20, right: 30, bottom: 60, left: 100 };
            const width = dom.width - margin.left - margin.right;
            const height = dom.height - margin.top - margin.bottom;

            // //Create the SVG and location for where we will draw our chart
            // append the svg object to the body of the page
            var svg = d3.select(dom.id)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // List of groups = header of the csv files
            var keys = Array.from(airport).sort();
            // console.log(keys);

            //stack the data?
            var stackedData = d3.stack()
                .offset(d3.stackOffsetSilhouette)
                .keys(keys)
                (formattedData);
            // console.log(stackedData);
            var max_val = 0;
            var min_val = 0;
            stackedData.forEach(terminal => {
                terminal.forEach(year => {
                    if (year[0] < min_val) min_val = year[0];
                    if (year[1] < min_val) min_val = year[1];
                    if (year[0] > max_val) max_val = year[0];
                    if (year[1] > max_val) max_val = year[1];
                })
            });
            // console.log(max_val, min_val);

            // Add X axis

            var x = d3.scaleTime()
                .domain(d3.extent(formattedData, function (d) {
                    return new Date(d.year);
                }))
                .range([0, width]);


            var xAxis = svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(20));


            // Add Y axis
            var y = d3.scaleLinear()
                .domain([min_val, max_val])
                .range([height, 0]);
            var yAxis = svg.append("g")
                .call(d3.axisLeft(y));


            //show label
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", height + margin.bottom / 1.5)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .attr("font-weight", "bold")
                .text("Timeline");

            svg.append("text")
                .attr("transform", `rotate(90)`)
                .attr("x", height / 2)
                .attr("y", margin.left * 0.8)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .attr("font-weight", "bold")
                .text("Passenger Count");


            // color palette
            var color = d3.scaleOrdinal()
                .domain(keys)
                // .domain(["T1", "T2", "T3"])
                //.range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#f781bf'])
                .range(['#9daec8', '#8386a7', '#a07a71', '#8d9b81', '#71807d', '#dfccbd', '#fbbe92', '#ffb1aa', '#d6a3b6', '#b3afb0', '#ddd8c2'])

            var tooltip = svg.append("text")
                .attr("class", "remove")
                .attr("x", width / 2)
                .attr("y", 0)
                .style("visibility", "hidden")
                .style("font-size", "12px")
                .attr("font-weight", "bold");



            // Three function that change the tooltip when user hover / move / leave a cell
            var mouseover = function (d) {
                Tooltip.style("opacity", 1)
                d3.selectAll(".myArea").style("opacity", .2)
                d3.select(this)
                    .style("stroke", "black")
                    .style("opacity", 1)
            }
            var mousemove = function (d, i) {
                grp = keys[i]
                Tooltip.text(grp)
            }
            var mouseleave = function (d) {
                Tooltip.style("opacity", 0)
                d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
            }


            //Add a clipPath: everything out of this area won't be drawn.
            var clip = svg.append("defs").append("svg:clipPath")
                .attr("id", "clip")
                .append("svg:rect")
                .attr("width", width)
                .attr("height", height)
                .attr("x", 0)
                .attr("y", 0);

            // Show the areas
            var stream = svg.append("g")
                .attr("clip-path", "url(#clip)")


            stream
                //.selectAll("mylayers")
                .selectAll(".myStreamArea")
                .data(stackedData)
                .enter()
                .append("path")
                .attr("class", "myStreamArea")
                .style("fill", function (d) {
                    return color(d.key);
                })
                .style("opacity", 1)
                .attr("d", d3.area()
                    .x(function (d) {
                        return x(new Date(d.data.year));
                    })
                    .y0(function (d) {
                        return y(d[0]);
                    })
                    .y1(function (d) {
                        return y(d[1]);
                    })
                )
                // .on("mouseover", mouseover)
                // .on("mousemove", mousemove)
                // .on("mouseleave", mouseleave)



                .on("mouseover", function (d, i) {
                    itemMouseOver(i.key);
                })
                .on("mousemove", function (d, i) {
                    var selectedDate = x.invert(d3.pointer(event, this)[0]);
                    var displayVal = null;
                    i.forEach(k => {
                        var tmpDate = new Date(k.data.year);
                        if (tmpDate.getFullYear() === selectedDate.getFullYear()
                            && tmpDate.getMonth() === selectedDate.getMonth()) {
                            displayVal = (k.data)[i.key];
                        }
                    });
                    console.log(displayVal
                        // , i.key, selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()
                    );

                    d3.select('#mouse_move_text')
                        .remove();
                    svg.append("text")
                        .attr("id", "mouse_move_text")
                        .attr("x", width / 2)
                        .attr("y", 0)
                        .style("font-size", "12px")
                        .attr("font-weight", "bold")
                        .text("Total passenger count:" + displayVal)
                        ;
                })
                .on("mouseleave", function (d, i) {
                    d3.select('#mouse_over_text')
                        .remove();
                    itemMouseLeave();
                });

            var extent = [[margin.left, margin.top], [width - margin.right - margin.left, height - margin.top - margin.bottom]];

            // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
            var zoom = d3.zoom()
                .scaleExtent([1, 10])  // This control how much you can unzoom (x0.5) and zoom (x20)
                //.extent([[0, 0], [width, height]])
                .translateExtent(extent)
                .extent(extent)
                .on("zoom", updateChart);

            // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
            svg.call(zoom);

            // A function that updates the chart when the user zoom and thus new boundaries are available
            function updateChart() {

                // recover the new scale
                var transform = d3.zoomTransform(this);
                var newX = transform.rescaleX(x);

                // update axes with these new boundaries

                xAxis.call(d3.axisBottom(newX))

                stream
                    .selectAll(".myStreamArea")
                    .attr("d", d3.area()
                        .x(function (d) {
                            return newX(new Date(d.data.year));
                        })
                        .y0(function (d) {
                            return y(d[0]);
                        })
                        .y1(function (d) {
                            return y(d[1]);
                        }));
            }





        })
};

