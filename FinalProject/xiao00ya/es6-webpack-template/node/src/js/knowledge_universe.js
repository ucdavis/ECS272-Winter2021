import * as d3 from "d3";
// https://observablehq.com/@xianwu/force-directed-graph-network-graph-with-arrowheads-and-lab
// multiple shape encoding
// https://www.d3-graph-gallery.com/graph/arc_highlight.html

// export async function drawKnowledgeUniverse(id, data) {
//     console.log('draw Knowledge universe');
//     var height = 0.8 * window.innerHeight;
//     var width = 0.8 * window.innerWidth;
//     var color = d3.scaleOrdinal(d3.schemeCategory10);
    
//     // return d => scale(d.group);

//     const links = data.links.map(d => Object.create(d));
//     const nodes = data.nodes.map(d => Object.create(d));
    
//     const simulation = d3.forceSimulation(nodes)
//         .force("link", d3.forceLink(links).id(d => d.id))
//         .force("charge", d3.forceManyBody())
//         .force("x", d3.forceX())
//         .force("y", d3.forceY());

//     var drag = simulation => {
//         function dragstarted(event, d) {
//             if (!event.active) simulation.alphaTarget(0.3).restart();
//             d.fx = d.x;
//             d.fy = d.y;
//         }
        
//         function dragged(event,d) {
//             d.fx = event.x;
//             d.fy = event.y;
//         }
        
//         function dragended(event,d) {
//             if (!event.active) simulation.alphaTarget(0);
//             d.fx = null;
//             d.fy = null;
//         }
        
//         return d3.drag()
//             .on("start", dragstarted)
//             .on("drag", dragged)
//             .on("end", dragended);
//     }
    
//     const svg = d3.select(id).append("svg")
//         .attr("viewBox", [-width / 2, -height / 2, width, height]);
    
//     const link = svg.append("g")
//         .attr("stroke", "#999")
//         .attr("stroke-opacity", 0.6)
//       .selectAll("line")
//       .data(links)
//       .join("line")
//         .attr("stroke-width", d => Math.sqrt(d.value));
    
//     const node = svg.append("g")
//         .attr("stroke", "#fff")
//         .attr("stroke-width", 1.5)
//       .selectAll("circle")
//       .data(nodes)
//       .join("circle")
//         .attr("r", 5)
//         // .attr("fill", function(d) { 
//         //     return d => color(d.group)})
//         // .call(drag(simulation));
    
//     node.append("title")
//         .text(d => d.id);
    
//     simulation.on("tick", () => {
//       link
//           .attr("x1", d => d.source.x)
//           .attr("y1", d => d.source.y)
//           .attr("x2", d => d.target.x)
//           .attr("y2", d => d.target.y);
    
//       node
//           .attr("cx", d => d.x)
//           .attr("cy", d => d.y);
//     });
    
//     // invalidation.then(() => simulation.stop());     

// }

export async function drawKnowledgeUniverse(id, data){
    // function dragstarted(event, d) {
    //     if (!event.active) simulation.alphaTarget(0.3).restart();
    //     d.fx = d.x;
    //     d.fy = d.y;
    // }
    
    // function dragged(event,d) {
    //     d.fx = event.x;
    //     d.fy = event.y;
    // }
    
    // function dragended(event,d) {
    //     if (!event.active) simulation.alphaTarget(0);
    //     d.fx = null;
    //     d.fy = null;
    // }

    var width = 2 * window.innerWidth;
    var height = 2 * window.innerHeight;
    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));
    // var color = d3.scaleOrdinal(d3.schemeCategory10);
    // color = d3.scaleLinear().domain([1,100]).range(["white", "blue"]);
    // var color = d3.scaleDiverging(t=> d3.interpolateRdBu(1-t)).domain([0,50, 100]);
    // var color = d3.scaleSequential(t=> d3.interpolateRdBu(1-t)).domain([0, 100]);
    var color = d3.scaleLinear()
    .domain([0, 50, 100])
    .range(["#1d19fc", "white", "#fa231b"])

    // color = {
    //     const scale = d3.scaleOrdinal(d3.schemeCategory10);
    //     return d => scale(d.group);
    //   }

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        // .force("charge", d3.forceManyBody().strength(-200))
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX())
        .force("y", d3.forceY());
        // .force("collide", d3.forceCollide(d=>20));
        // .force("center", d3.forceCenter(width/2, height/2));


    var drag = d3.drag()
    .on("start", function(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    })
    .on("drag", function (event,d) {
        d.fx = event.x;
        d.fy = event.y;
    })
    .on("end", function (event,d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    });

    const margin = ({top: 20, right: 10, bottom: 30, left: 10});
    const svg = d3.select(id).append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height]);
        // .attr("viewBox", [0, 0, width - margin.left - margin.right, height]);

    svg.append("defs").selectAll("marker")
        .data(id)
        .join("marker")
        .attr("id", d => `arrow-${d}`)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 38)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("fill", color)
        .attr("d", 'M0,-5L10,0L0,5');
    const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        // .attr("stroke-width", 1.5)
        // .selectAll("path")
        .data(links)
        .join("line");
        // .attr("stroke-width", d => Math.sqrt(d.value));
        // .join("path")
            // .attr("stroke", "#999")
            // .attr("marker-end", d => `url(${new URL(`#arrow-${d.id}`, location)})`);
            // .attr("marker-end", "url(#triangle)");
            // .attr("stroke", d => color(d.type))
            // .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`);
        

    const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 7)
        .attr("fill", function(d) { 
            return color(d.rate)}
            // return color(d.group)}
            )
        .call(drag);
        
    
        node.on('mouseover', function (d, i) {
            // Highlight the nodes: every node is green except of him
            // node.attr("r", 8);
            node.attr('fill', "#999")
            
            // Highlight the connections
            link
              .attr('stroke', function (link_d) { 
                if (link_d.source.__proto__.id === i.__proto__.id ||link_d.target.__proto__.id === i.__proto__.id){
                    console.log("Find targets!");
                    var color_nodes = d3.selectAll("circle").select(function(nod_d) {
                        if (nod_d.id === link_d.target.__proto__.id) {
                            return this;
                        }
                        else {
                            if (nod_d.id === link_d.source.__proto__.id) {
                                return this;
                            }
                            else{
                                return null;
                            }
            
                        }
                    })
                    
                    color_nodes.attr('fill', function(nod_d) { 
                        return color(nod_d.rate)})
                }
                // if (link_d.target.__proto__.id === i.__proto__.id) {
                //     node.attr('fill', function(nod_d) { 
                //         if (nod_d.id === link_d.source.__proto__.id) {
                //             var color_value = color(nod_d.rate);
                //         }
                //         // else{
                //         //     var color_value = "#999";
                //         // }
                //         return color_value})
                // }
                return link_d.source.__proto__.id === i.__proto__.id || link_d.target.__proto__.id === i.__proto__.id ? '#5EA1A0' : "#fff";
            })
              .attr('stroke-width', function (link_d) { return link_d.source.__proto__.id === i.__proto__.id || link_d.target.__proto__.id === i.__proto__.id ? 3 : 1.5;})
            
            d3.select(this).attr('r', 12).attr("fill", function(d) { 
                return color(d.rate)});  
          })
          .on('mouseout', function (d, i) {
            node.attr("r", 7);
            // node.style('fill', "#69b3a2")
            node
              .attr("fill", function(d, i) { 
                return color(d.rate)})
            //   .attr("stroke", "#999")
            link
              .attr("stroke", "#999")
              .attr("stroke-width", 1.5)
              .attr("stroke-opacity", 0.6);
          })
          .on("click", function (d, i){
            let url = "http://www.wikihow.com/" + i.__proto__.id; //or whatever your URL field is called in the data
            // window.open(url, "_self");
            window.open(url);
        });

    node.append("title")
        .text(d => d.id);

    simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        // .attr("xlink:href", function(d) {
            // var url ="http://www.wikihow.com/" + d.id
            // console.log("Url is: ", url);
            // return url})
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
        
  
    });

    // d3.invalidation.then(() => simulation.stop());
}