import React, {Component} from 'react';
import * as d3 from "d3";

class Topics extends Component{

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
                        Keyword1: String(row['Keyword1']),
                        Keyword2: String(row['Keyword2']),
                        Keyword3: String(row['Keyword3']),
                        Keyword4: String(row['Keyword4']),
                        Keyword5: String(row['Keyword5'])
                    }
                })

                function processData2() {
                    //Sort data by neighborhood group and track the cumulative price and number of data points per group to calculate the average
                    const set = {};
                    data.forEach(d => {
                        if(d.Keyword1 in set){
                            set[d.Keyword1].count = set[d.Keyword1].count+1;
                        }else{
                            const dataString = {
                                Keyword: d.Keyword1,
                                count: 1
                            }
                            set[d.Keyword1] = dataString;
                        }
                        if(d.Keyword2 in set){
                            set[d.Keyword2].count = set[d.Keyword2].count+1;
                        }else{
                            const dataString = {
                                Keyword: d.Keyword2,
                                count: 1
                            }
                            set[d.Keyword2] = dataString;
                        }
                        if(d.Keyword3 in set){
                            set[d.Keyword3].count = set[d.Keyword3].count+1;
                        }else{
                            const dataString = {
                                Keyword: d.Keyword3,
                                count: 1
                            }
                            set[d.Keyword3] = dataString;
                        }
                        if(d.Keyword4 in set){
                            set[d.Keyword4].count = set[d.Keyword4].count+1;
                        }else{
                            const dataString = {
                                Keyword: d.Keyword4,
                                count: 1
                            }
                            set[d.Keyword4] = dataString;
                        }
                        if(d.Keyword5 in set){
                            set[d.Keyword5].count = set[d.Keyword5].count+1;
                        }else{
                            const dataString = {
                                Keyword: d.Keyword5,
                                count: 1
                            }
                            set[d.Keyword5] = dataString;
                        }


                    })

                    const formattedData = []
                    Object.keys(set).forEach(d => {

                        formattedData.push(set[d]);
                    });

                    formattedData.sort(function(a, b){
                        if(a.count < b.count) { return 1; }
                        if(a.count > b.count) { return -1; }
                        return 0;
                    })
                    return formattedData
                }

                var count = processData2()

                var sortedData=count.slice(1,11);
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
                    .domain([0, d3.max(sortedData, d => d.count)]) //our average price data ranges from 0 - Max
                    .range([margin.left, width - margin.right]);


                const y = d3.scaleBand()
                    .domain(sortedData.map(d => d.Keyword))
                    .rangeRound([margin.top, height - margin.bottom])
                    .padding(0.1);


                svg.selectAll("rect") //Selects all defined elements in the DOM and hands off a reference to the next step in the chain.
                    .data(sortedData) //connect chart data with DOM <rect/> elements
                    .join("rect") // appends a new SVG rect element for each element in our chartdata array.
                    .attr('x', (d) => x(0)) //since this is a horizontal bar chart we start the bottom of the chart at the left
                    .attr('y', (d) => y(d.Keyword)) // bar y position
                    .attr("height", y.bandwidth()) // height of the bar so they all stack nicely near eachother
                    .attr("width", (d) => x(d.count) - x(0)) // height of the bar so they all stack nicely near eachother
                    .attr("fill", "#7b6888"); // color of the bar


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
                            .text("Number of Related Subjects")
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
                            .text("Popular Topics/Keywords")
                    );

            });
    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Topics;
