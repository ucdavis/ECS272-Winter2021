export const draw_pie_chart_depature = (dom) => {
    console.log("Drawing Departure Pie Chart");
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
            // var terminalCount = {
            // 'Imperial T': 490};
            data.forEach(d => {
                // calculate arrivalTerminalCount
                if (d['Arrival_Departure'] === 'Departure') {
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
            // console.log(arrivalTerminalCount);
            // console.log(departTerminalCount);
            // console.log(yearTerminalCount);


            // from arrivalTerminalCount to formattedArrival
            var formattedArrival = [];
            Object.keys(arrivalTerminalCount).forEach(d => {
                formattedArrival.push(
                    {name: d, passenger: arrivalTerminalCount[d]}
                );
            });
            // console.log(formattedArrival);

            /*********************************
             * Visualization codes start here
             * ********************************/
            var colors = d3.scaleOrdinal()
                .domain(formattedArrival.map(d => d.name).sort())
                .range(['#9daec8', '#8386a7', '#a07a71', '#8d9b81', '#71807d', '#dfccbd', '#fbbe92', '#ffb1aa', '#d6a3b6', '#b3afb0', '#ddd8c2'])


            var margin = {left: -20, right: 10, top: 40, bottom: 40};
            const width = dom.width - margin.left - margin.right;
            const height = dom.height - margin.top - margin.bottom;

            var svg = d3.select(dom.id)
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

            var data = d3.pie().value(function (d) {
                return d.passenger;
            })(formattedArrival);
            console.log(data);

            // create a tooltip
            var Tooltip = svg
                .append("text")
                .attr("x", 0)
                .attr("y", 0)
                .style("opacity", 0)
                .style("font-size", 15);

            // Three function that change the tooltip when user hover / move / leave a cell
            var mouseover = function () {
                Tooltip.style("opacity", 1);
                d3.selectAll(".myArea2").style("opacity", .3);
                d3.select(this)
                    .style("stroke", "black")
                    .style("opacity", 1)
            };
            var mousemove = function (d, i) {
                Tooltip.text(i.key);
            };
            var mouseleave = function () {
                Tooltip.style("opacity", 0);
                d3.selectAll(".myArea2").style("opacity", 1).style("stroke", "none")
            };


            var segments = d3.arc()
                .innerRadius(0)
                .outerRadius(height / 2)
                .padAngle(.05)
                .padRadius(50);
            var sections = svg.append("g").attr("transform", "translate(" + (width / 2.5 + margin.left) + "," + (height / 2 + margin.top) + ")")
                .selectAll("path").data(data);

            sections.enter().append("path").attr("class", "myArea2").attr("d", segments).attr("fill", function (d) {
                return colors(d.data.passenger)
            })
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave);

            // var total = 100000;
            // //put content info on piechar
            // var content = d3.select("g").selectAll("text").data(data);
            // content.enter().append("text").classed("inside", true).each(function (d) {
            //     var center = segments.centroid(d);
            //     d3.select(this).attr("x", center[0]).attr("y", center[1])
            //         .text((d.data.passenger / total / 100).toString().substr(0, 4) + "%")//put number of pessageners on each pie
            // });


            var total = 345763666;

            //put content info on piechar
            var content = svg.append("g")
            .attr("transform", "translate(" + (width / 2.7 + margin.left) + "," + (height/2 + margin.top) + ")")

        //d3.select("g")
            .selectAll("text").data(data);
        content.enter().append("text").classed("inside", true).each(function (d) {
            var center = segments.centroid(d);
            d3.select(this)
                // .attr("x", 0 )
                // .attr("y", height/2 + margin.top)
                .attr("x", center[0])//)width / 3 + margin.left
                .attr("y", center[1]) //height / 7 + margin.top) 
                .text((d.data.passenger / total*100).toString().substr(0, 4) + "%")
                //.text((d.data.passenger / total / 100).toString().substr(0, 4) + "%")//put number of pessageners on each pie
        });








            var legends = svg.append("g").attr("transform", "translate(" + (width / 1.4 + margin.right) + "," + (height / 6) + ")") //480, 30
                .selectAll(".legends").data(data);
            var legend = legends.enter().append("g").classed("legends", true)
                .attr("transform", function (d, i) {
                    return "translate(0, " + (i + 1) * 25 + ")";
                });
            legend.append("rect").attr("width", 20).attr("height", 20).attr("fill",
                function (d) {
                    return colors(d.data.passenger);
                });
            legend.append("text").classed("label", true).text(function (d) {
                return d.data.name;
            })
                .attr("fill", function (d) {
                    return colors(d.data.passenger);
                })
                .attr("x", 30)
                .attr("y", 15);
        })
};