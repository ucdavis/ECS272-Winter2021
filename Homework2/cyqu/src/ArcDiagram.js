import React, {Component} from 'react';
import * as d3 from "d3";

class ArcDiagram extends Component{

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

                var sortedData=count.slice(1,20);

                var set=new Set();

                var i;

                let map=new Map();
                const node=[]
                for(i=1;i<sortedData.length;i++){
                    map[sortedData[i].Keyword]=i;
                    set.add(sortedData[i].Keyword)
                    const dataString = {
                        id: i,
                        name: count[i].Keyword
                    }
                    node.push(dataString)
                }


                const links=[]
                data.forEach(d => {
                    if(d.Keyword1!==""&&d.Keyword2!==""&&set.has(d.Keyword1)&&set.has(d.Keyword2)){
                        const dataString = {
                            source: map[d.Keyword1],
                            target: map[d.Keyword2]
                        }
                        links.push(dataString)
                    }

                    if(d.Keyword1!==""&&d.Keyword3!==""&&set.has(d.Keyword1)&&set.has(d.Keyword3)){
                        const dataString = {
                            source: map[d.Keyword1],
                            target: map[d.Keyword3]
                        }
                        links.push(dataString)
                    }

                    if(d.Keyword1!==""&&d.Keyword4!==""&&set.has(d.Keyword1)&&set.has(d.Keyword4)){
                        const dataString = {
                            source: map[d.Keyword1],
                            target: map[d.Keyword4]
                        }
                        links.push(dataString)
                    }

                    if(d.Keyword1!==""&&d.Keyword5!==""&&set.has(d.Keyword1)&&set.has(d.Keyword5)){
                        const dataString = {
                            source: map[d.Keyword1],
                            target: map[d.Keyword5]
                        }
                        links.push(dataString)
                    }

                    if(d.Keyword2!==""&&d.Keyword3!==""&&set.has(d.Keyword2)&&set.has(d.Keyword3)){
                        const dataString = {
                            source: map[d.Keyword2],
                            target: map[d.Keyword3]
                        }
                        links.push(dataString)
                    }

                    if(d.Keyword2!==""&&d.Keyword4!==""&&set.has(d.Keyword2)&&set.has(d.Keyword4)){
                        const dataString = {
                            source: map[d.Keyword2],
                            target: map[d.Keyword4]
                        }
                        links.push(dataString)
                    }

                    if(d.Keyword2!==""&&d.Keyword5!==""&&set.has(d.Keyword2)&&set.has(d.Keyword5)){
                        const dataString = {
                            source: map[d.Keyword2],
                            target: map[d.Keyword5]
                        }
                        links.push(dataString)
                    }
                    if(d.Keyword3!==""&&d.Keyword4!==""&&set.has(d.Keyword3)&&set.has(d.Keyword4)){
                        const dataString = {
                            source: map[d.Keyword3],
                            target: map[d.Keyword4]
                        }
                        links.push(dataString)
                    }

                    if(d.Keyword3!==""&&d.Keyword5!==""&&set.has(d.Keyword3)&&set.has(d.Keyword5)){
                        const dataString = {
                            source: map[d.Keyword3],
                            target: map[d.Keyword5]
                        }
                        links.push(dataString)
                    }
                    if(d.Keyword4!==""&&d.Keyword5!==""&&set.has(d.Keyword4)&&set.has(d.Keyword5)){
                        const dataString = {
                            source: map[d.Keyword4],
                            target: map[d.Keyword5]
                        }
                        links.push(dataString)
                    }
                })
                /*********************************
                 * Visualization codes start here
                 * ********************************/
                var width = 1500;
                var height = 770;
                var margin = {left: 100, right: 20, top: 20, bottom: 60}
                // append the svg object to the body of the page
                var svg = d3.select("#container")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");



                    // List of node names
                    var allNodes = node.map(function(d){return d.name})

                    // A linear scale to position the nodes on the X axis
                    var x = d3.scalePoint()
                        .range([0, width])
                        .domain(allNodes)

                    // Add the circle for the nodes
                    var nodes = svg
                        .selectAll("mynodes")
                        .data(node)
                        .enter()
                        .append("circle")
                        .attr("cx", function(d){ return(x(d.name))})
                        .attr("cy", height-30)
                        .attr("r", 8)
                        .style("fill", "#69b3a2")

                    // And give them a label
                    var labels = svg
                        .selectAll("mylabels")
                        .data(node)
                        .enter()
                        .append("text")
                        .attr("x", function(d){ return(x(d.name))})
                        .attr("y", height-10)
                        .text(function(d){ return(d.name)})
                        .style("text-anchor", "middle")


                    var idToNode = {};
                    node.forEach(function (n) {
                        idToNode[n.id] = n;
                    });


                    // Add the links
                    var Links = svg
                        .selectAll('mylinks')
                        .data(links)
                        .enter()
                        .append('path')
                        .attr('d', function (d) {
                            var start = x(idToNode[d.source].name)    // X position of start node on the X axis
                            var end = x(idToNode[d.target].name)      // X position of end node
                            return ['M', start, height-30,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
                                'A',                            // This means we're gonna build an elliptical arc
                                (start - end)/2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
                                (start - end)/2, 0, 0, ',',
                                start < end ? 1 : 0, end, ',', height-30] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
                                .join(' ');
                        })
                        .style("fill", "none")
                        .attr("stroke", "black")

                    // Add the highlighting functionality
                    nodes
                        .on('mouseover', function (d) {
                            // Highlight the nodes: every node is green except of him
                            nodes.style('fill', "#B8B8B8")
                            d3.select(this).style('fill', '#69b3b2')
                            // Highlight the connections
                            Links
                                .style('stroke', function (link_d) { return link_d.source === d.id || link_d.target === d.id ? '#69b3b2' : '#69b3b2';})
                                .style('stroke-width', function (link_d) { return link_d.source === d.id || link_d.target === d.id ? 4 : 1;})
                        })
                        .on('mouseout', function (d) {
                            nodes.style('fill', "#69b3a2")
                            Links
                                .style('stroke', 'black')
                                .style('stroke-width', '1')
                        })
               // })

                svg
                    .append("text")
                    .attr("text-anchor", "middle")
                    .style("fill", "#B8B8B8")
                    .style("font-size", "17px")
                    .attr("x", 50)
                    .attr("y", 10)
                    .html("Arc Diagram of relations of Keywords")



                return svg.node();


            });
    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default ArcDiagram;
