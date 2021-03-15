import React, {Component} from 'react';
import * as d3 from "d3";

class Pie extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
        d3.csv( this.props.data)
            .then(csv => {
                // log csv in browser console
                console.log(csv);



                var data = csv.map(row => {
                    return {
                        name: String(row['Name']),
                        total: Number(row['Total']),
                        type1: String(row['Type_1']),
                        type2: String(row['Type_2'])
                    }
                })
                const mySet1 = new Set()
                function processData(){
                    //Sort data by neighborhood group and track the cumulative price and number of data points per group to calculate the average
                    const set = {
                        'population':{},
                        'species':{}
                    };
                    data.forEach(d => {

                        if(d.type1!==""){
                            mySet1.add(d.type1)
                            if(!(d.type1 in set['population']))set['population'][d.type1]=0;
                            set['population'][d.type1]=set['population'][d.type1]+d.total;
                            if(!(d.type1 in set['species']))set['species'][d.type1]=0;
                            set['species'][d.type1]=set['species'][d.type1]+1;
                        }
                        if(d.type2!==""){
                            mySet1.add(d.type2)
                            if(!(d.type2 in set['population']))set['population'][d.type2]=0;
                            set['population'][d.type2]=set['population'][d.type2]+d.total;
                            if(!(d.type2 in set['species']))set['species'][d.type2]=0;
                            set['species'][d.type2]=set['species'][d.type2]+1;
                        }
                    })


                    const formattedData = {}
                    Object.keys(set).forEach(d => {
                        const subset=set[d];
                        formattedData[d]=[];
                        Object.keys(subset).forEach(ds => {
                            const dataString={
                                'group':ds,
                                'value':subset[ds]
                            };
                            formattedData[d].push(dataString);


                        });


                    });
                    return formattedData
                }
                var count=processData()

                var allGroup = Object.keys(count);

                var dropdownButton = d3.select("#container")
                    .append('select')

                dropdownButton // Add a button
                    .selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
                    .data(allGroup)
                    .enter()
                    .append('option')
                    .text(function (d) { return d; }) // text showed in the menu
                    .attr("value", function (d) { return d; })
                //document.write(count['population'].length);
                /*********************************
                 * Visualization codes start here
                 * ********************************/
                var width = 570;
                var height = 400;
                var margin = {left: 60, right: 20, top: 20, bottom: 60}
                var radius = Math.min(width, height) / 2 - 20

                var svg = d3.select('#container')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + (width + margin.left + margin.right)/2 + "," + (height + margin.top + margin.bottom)/2 + ")");



                var color = d3.scaleOrdinal()
                    .domain(mySet1)
                    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), mySet1.size).reverse());
                //scale functions

                var pie = d3.pie()
                    .value(d => d.value)



                var arcGenerator = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius)

                const newradius = 1.5*Math.min(width, 400) / 2 * 0.67;
                var arcLabel =
                    d3.arc().innerRadius(newradius).outerRadius(newradius);

                var data_ready = pie(count['population'])

                svg
                    .selectAll('mySlices')
                    .data(data_ready)
                    .enter()
                    .append('path')
                    .attr('d', arcGenerator)
                    .attr('fill', function(d){ return(color(d.data.group)) })
                    .attr("stroke", "black")
                    .style("stroke-width", "2px")
                    .style("opacity", 0.7)

                svg
                    .selectAll('mySlices')
                    .data(data_ready)
                    .enter()
                    .append('text')
                    .text(function(d){ return d.data.group})
                    .attr("transform", function(d) { return "translate(" + arcLabel.centroid(d) + ")";  })
                    .style("text-anchor", "middle")
                    .style("font-size", 17)
                svg.append("text")
                    .attr("text-anchor", "middle")
                    .style("fill", "black")
                    .style("font-size", "15px")
                    .attr("x", 0)
                    .attr("y", -220)
                    .html("Partition of Different Pokemons Groups by Populations")

                function updateChart(keys){
                    svg.selectAll('*').remove();
                    data_ready = pie(count[keys])

                    svg
                        .selectAll('mySlices')
                        .data(data_ready)
                        .enter()
                        .append('path')
                        .attr('d', arcGenerator)
                        .attr('fill', function(d){ return(color(d.data.group)) })
                        .attr("stroke", "black")
                        .style("stroke-width", "2px")
                        .style("opacity", 0.7)


                    svg
                        .selectAll('mySlices')
                        .data(data_ready)
                        .enter()
                        .append('text')
                        .text(function(d){ return d.data.group})
                        .attr("transform", function(d) { return "translate(" + arcLabel.centroid(d) + ")";  })
                        .style("text-anchor", "middle")
                        .style("font-size", 17)

                    svg.append("text")
                        .attr("text-anchor", "middle")
                        .style("fill", "black")
                        .style("font-size", "15px")
                        .attr("x", 0)
                        .attr("y", -220)
                        .html("Partition of Different Pokemons Group by "+keys)
                }
                dropdownButton.on("change", function(d) {

                    // recover the option that has been chosen
                    var selectedOption = d3.select(this).property("value")

                    // run the updateChart function with this selected option
                    updateChart(selectedOption)
                })
            });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Pie;
