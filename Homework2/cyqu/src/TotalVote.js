import React, {Component} from 'react';
import * as d3 from "d3";

class TotalVote extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart() {
        d3.csv(this.props.data)
            .then(csv => {
                // log csv in browser console
                console.log(csv);


                var data = csv.map(row => {
                    return {
                        yes: Number(row['Yes Votes']),
                        no: Number(row['No Votes']),
                        Subject: String(row['Subject']),
                        pass: String(row['Pass or Fail']),
                        totalVote: Number(row['Yes Votes'] + row['No Votes'])
                    }
                })

                function processData() {
                    //Sort data by neighborhood group and track the cumulative price and number of data points per group to calculate the average
                    const set = {};
                    set['less50k'] = {
                        range: 'less50k',
                        count: 0
                    };
                    set['50kTo100k'] = {
                        range: '50kTo100k',
                        count: 0
                    };
                    set['100kTo150k'] = {
                        range: '100kTo150k',
                        count: 0
                    };
                    set['150kTo200k'] = {
                        range: '150kTo200k',
                        count: 0
                    };
                    set['200kTo250k'] = {
                        range: '200kTo250k',
                        count: 0
                    };
                    set['250kmore'] = {
                        range: '250kmore',
                        count: 0
                    };
                    data.forEach(d => {
                        if (d.yes+d.no < 50000) {
                            set['less50k'].count = set['less50k'].count + 1;

                        } else if (d.yes+d.no < 100000) {
                            set['50kTo100k'].count = set['50kTo100k'].count + 1;
                        } else if (d.yes+d.no < 150000) {
                            set['100kTo150k'].count = set['100kTo150k'].count + 1;
                        } else if (d.yes+d.no < 200000) {
                            set['150kTo200k'].count = set['150kTo200k'].count + 1;
                        } else if (d.yes+d.no < 250000) {
                            set['200kTo250k'].count = set['200kTo250k'].count + 1;
                        } else {
                            set['250kmore'].count = set['250kmore'].count + 1;
                        }
                    })

                    const formattedData = []
                    Object.keys(set).forEach(d => {

                        formattedData.push(set[d]);
                    });
                    return formattedData
                }

                var count = processData()
                //document.write(d3.min(data, d => d.totalVote));
                /*********************************
                 * Visualization codes start here
                 * ********************************/
                var width = 600;
                var height = 400;
                var margin = {left: 100, right: 20, top: 20, bottom: 60}

                var svg = d3.select('#container')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)

                /*
                var view = svg.append("g")

                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                */
                //scale functions
                const x = d3.scaleLinear()
                    .domain([0, d3.max(count, d => d.count)]) //our average price data ranges from 0 - Max
                    .range([margin.left, width - margin.right]);


                const y = d3.scaleBand()
                    .domain(count.map(d => d.range))
                    .rangeRound([margin.top, height - margin.bottom])
                    .padding(0.1);


                svg.selectAll("rect") //Selects all defined elements in the DOM and hands off a reference to the next step in the chain.
                    .data(count) //connect chart data with DOM <rect/> elements
                    .join("rect") // appends a new SVG rect element for each element in our chartdata array.
                    .attr('x', (d) => x(0)) //since this is a horizontal bar chart we start the bottom of the chart at the left
                    .attr('y', (d) => y(d.range)) // bar y position
                    .attr("height", y.bandwidth()) // height of the bar so they all stack nicely near eachother
                    .attr("width", (d) => x(d.count) - x(0)) // height of the bar so they all stack nicely near eachother
                    .attr("fill", "#98abc5"); // color of the bar


                const xAxis = g => g
                    .attr("transform", `translate(0,${height - margin.bottom})`)
                    .call(d3.axisBottom(x))


                const yAxis = g => g
                    .attr("transform", `translate(${margin.left},0)`)
                    .call(d3.axisLeft(y))


                svg.append("g")
                    .call(xAxis)
                    .call(g =>
                        g.select(".tick:last-of-type text")
                            .clone()
                            .attr("text-anchor", "middle")
                            .attr("x", -(width - margin.left - margin.right) / 2)
                            .attr("y", margin.bottom - 10)
                            .attr("font-weight", "bold")
                            .text("Number of Subjects")
                    );

                svg.append("g")
                    .call(yAxis)
                    .call(g =>
                        g
                            .select(".tick:last-of-type text")
                            .clone()
                            .attr("transform", `rotate(-90)`)
                            .attr("text-anchor", "middle")
                            .attr("x", -(15 - margin.top - margin.bottom) / 2)
                            .attr("y", -80)
                            .attr("font-weight", "bold")
                            .text("Total Vote Range")
                    );

            });
    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default TotalVote;
