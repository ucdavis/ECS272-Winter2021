export const draw_streamgraph_all = (dom) => {
    console.log("Drawing Domestic + International Stream Graph");
    d3.csv('Los_Angeles_International_Airport_-_Passenger_Traffic_By_Terminal.csv')
        .then(data => {
            // log csv in browser console
            // console.log(data);

            var advanceVisData = {};
            var airport = new Set();


            data.forEach(d => {
                airport.add(d['Terminal']);
                var period = new Date(d['ReportPeriod']);
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


            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(20));


            // Add Y axis
            var y = d3.scaleLinear()
                .domain([min_val, max_val])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));




            //show label    
            svg.append("text")
            .attr("x",width/2)             
            .attr("y",height+margin.bottom/1.5)
            .attr("text-anchor", "middle")  
            .style("font-size", "12px") 
            .attr("font-weight", "bold")
            .text("Timeline");

            svg.append("text")
            .attr("transform", `rotate(90)`)
            .attr("x",150)             
            .attr("y",2.5*margin.right)  //height/20  -2.2*margin.right
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


            // create a tooltip
            var Tooltip = svg
                .append("text")
                .attr("x", 0)
                .attr("y", 0)
                .style("opacity", 0)
                .style("font-size", 17)

            // Three function that change the tooltip when user hover / move / leave a cell
            var mouseover = function () {
                Tooltip.style("opacity", 1);
                d3.selectAll(".myArea").style("opacity", .3);
                d3.select(this)
                    .style("stroke", "black")
                    .style("opacity", 1)
            };
            var mousemove = function (d, i) {
                Tooltip.text(i.key);
            };
            var mouseleave = function () {
                Tooltip.style("opacity", 0);
                d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
            };


            // Show the areas
            svg
                .selectAll("mylayers")
                .data(stackedData)
                .enter()
                .append("path")
                .attr("class", "myArea")
                .style("fill", function (d) {
                    return color(d.key);
                })
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
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave)





        })
};

