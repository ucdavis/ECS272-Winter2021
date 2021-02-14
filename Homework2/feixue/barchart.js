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


            // const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);

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


            svg.append("g")
                //.attr("fill", "orange")
                // .attr("fill", function(d){
                //     return color(d)})
                .selectAll("rect")
                .data(formattedData)
                .join("rect")
                .attr("x", (d, i) => x(i))
                .attr("y", d => y(d.avg))
                .attr("height", d => y(0) - y(d.avg))
                .attr("width", x.bandwidth())
                .attr("fill", function (d, i) { return color(d.name) });




            //initialize the location for the X Axis

            const xAxis = g => g
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(d3.axisBottom(x).tickFormat(i => formattedData[i].name))
                .selectAll("text")
                .attr("y", -3)
                .attr("x", 9)
                .attr("transform", "rotate(90)")
                .style("text-anchor", "start");


            // // initialize the location of the Y axis
            const yAxis = g => g
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y));


            svg.append("g")
                .call(xAxis);
            svg.append("g")
                .call(yAxis);


            svg.append("g")
                .call(yAxis)
                .call(g =>
                    g
                        .select(".tick:last-of-type text")
                        .clone()
                        .attr("transform", `rotate(90)`)
                        //.attr("transform", `rotate(-90)`)
                        .attr("text-anchor", "middle")
                        .attr("x", -(width - margin.left - margin.right) / 3)
                        .attr("x", 120)
                        .attr("y", 70)
                        //.attr("y", -80)
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
                        //.attr("text-anchor", "middle")
                        //.attr("x",250)//-(width - margin.left - margin.right)/2
                        .attr("y", -280)
                        .attr("x",-(width - margin.left - margin.right)/2)
                        .attr("font-size", 14)
                        .attr("font-weight", "bold")
                        .text("month: "+selectedMonth)
                );








        })
};