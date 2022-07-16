import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart4 extends Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {
        d3.csv(this.props.data)
            .then(csv => {
                // log csv in browser console
                //console.log(csv);

                // create data by selecting two columns from csv
                var data = csv.map(row => {
                    return {
                        iyear: Number(row['iyear']),
                        nkill: Number(row['nkill']),
                        nwound: Number(row['nwound']),
                        region: Number(row['region']),
                        attacktype1: Number(row['attacktype1']),
                        weaptype1: Number(row['weaptype1'])
                    }
                })

                var filtered = data.filter(function (el) {
                    return (el.nkill > 5) || (el.nwound > 5);
                });

                data = filtered;

                var ndict = {
                    "iyear": "Time(year)",
                    "region": "Region",
                    "weaptype1": "Weapon Type",
                    "attacktype1": "Type of Attack",
                    "nkill": "Victim Killed",
                    "nwound": "Victim Wounded"

                };

                var atkdict = {
                    1: "Assassination",
                    2: "Armed Assault",
                    3: "Bombing/Explosion",
                    4: "Hijacking",
                    5: "Hostage Taking I",
                    6: "Hostage Taking II",
                    7: "Facility Attack",
                    8: "Unarmed Assault",
                    9: "Unknown"
                };

                var regdict = {
                    1: "North America",
                    2: "Central America & C",
                    3: "South America",
                    4: "East Asia",
                    5: "Southeast Asia",
                    6: "South Asia",
                    7: "Central Asia",
                    8: "Western Europe",
                    9: "Eastern Europe",
                    10:"ME & North Africa",
                    11:"Sub-Saharan Africa",
                    12:"Australasia & Oceania"

                };

                var weapdict = {
                    1: "Biological",
                    2: "Chemical",
                    3: "Radiological",
                    4: "???",
                    5: "Firearms",
                    6: "Explosives",
                    7: "Fake Weapons",
                    8: "Incendiary",
                    9: "Melee",
                    10:"Vehicle",
                    11:"Sabotage Equipment",
                    12:"other",
                    13:"unknown"

                };


                /*********************************
                 * Visualization codes start here
                 * ********************************/
                var width = 800;
                var height = 500;
                var margin = {left: 10, right: 10, top: 40, bottom: 40}

                var svg = d3.select('#container2b')
                    .append('svg')
                    .attr('width', width + margin.left + margin.right)
                    .attr('height', height + margin.top + margin.bottom)

                var view = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


               // console.log(data[3]);

                var dimensions = [
                    'iyear',
                    'region',
                    'weaptype1',
                    'attacktype1',
                    'nkill',
                    'nwound'];

                var y = {}
                var i = 0;

                for (i in dimensions) {
                    var name = dimensions[i]
                  //  console.log(name)
                    y[name] = d3.scaleLinear()
                        .domain(d3.extent(data, d => {
                            return d[name];
                        }))
                        .range([height, 0])

                }

                var x = d3.scalePoint()
                    .range([0, width])
                    .padding(1)
                    .domain(dimensions);

                function path(d) {
                    return d3.line()(dimensions.map(d1 => {
                        return [x(d1), y[d1](d[d1])];
                    }));
                }

                view
                    .selectAll("myPath")
                    .data(data)
                    .enter().append("path")
                    .attr("d", path)
                    .style("fill", "none")
                    .style("stroke", d => {
                        var cs = d3.scaleLinear()
                            .domain([0, 250, 1500])
                            .range(["lightyellow", "red", "black"]);

                        return cs(d.nkill)
                    })
                    .style("opacity", 0.1)
                    .attr("stroke-width", 2)
                    .attr("stroke-linecap", "round")

                view.selectAll("myAxis")
                    .data(dimensions).enter()
                    .append("g")
                    .attr("transform", d => {
                        return "translate(" + x(d) + ")";
                    })
                    .each(function (d) {
                        if(d == "iyear"){
                            d3.select(this).call(d3.axisLeft().scale(y[d])
                                .tickFormat(function(d) { return d; })
                            );
                        }
                        else if(d == "region"){
                            d3.select(this).call(d3.axisLeft().scale(y[d])
                                .tickFormat(function(d) { return regdict[d]; })
                            );
                        }
                        else if(d == "attacktype1"){
                            d3.select(this).call(d3.axisLeft().scale(y[d])
                                .tickFormat(function(d) { return atkdict[d]; })
                            );
                        }
                        else if(d == "weaptype1"){
                            d3.select(this).call(d3.axisLeft().scale(y[d])
                                .tickFormat(function(d) { return weapdict[d]; })
                            );
                        }
                        else
                        {
                            d3.select(this).call(d3.axisLeft().scale(y[d]));
                        }

                    })

                    .append("text")
                    .style("text-anchor", "middle")
                    .attr("y", -10)
                    .text(function (d) {
                        console.log(d)
                        return ndict[d];
                    })
                    .style("fill", "black")

            });

    }

    render() {
        return <div id={"#" + this.props.id}></div>
    }
}

export default BarChart4;