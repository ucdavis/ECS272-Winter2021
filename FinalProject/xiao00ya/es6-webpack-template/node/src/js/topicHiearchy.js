import * as d3 from "d3";
import topicData from '../assets/data/topicTree.json';

export async function drawTopicHierarchyAsync(id) { 
    // d3.select(id).select("svg").remove();
    var div = d3.select("body")
		    .append("div")   
    		.attr("class", "tooltip")               
            .style("opacity", 0);
            
    // parse data
    // const data =  await d3.csv(exampleBarData);
    // var data =  await d3.csv(crimeDayData);
    var data = topicData;
    // const max_y = Math.max.apply(Math, data.map(function(d) {return d.count}));
    // data = data.filter(function(d){
    //     console.log(d.category); 
    //     return d.category==type})  
    console.log("In the drawTopicHierarchyAsync function, the data is: ", data)

    // const max_y = Math.max.apply(Math, data.map(function(d) {return d.count}));
    // console.log("Max value: ", max_y)


    // const margin = { top:30, right: 30, bottom: 30, left: 30 };
    var margin = ({top: 10, right: 120, bottom: 10, left: 40})
    // const height = 0.5 * window.innerHeight;
    const width = 0.8 * window.innerWidth;
    // const half_margin_left = 0.5 * margin.left;
    // const half_margin_top = 0.5*margin.top;
    var dx = 12;
    var dy = width/7;
    var tree = d3.tree().nodeSize([dx, dy])
    var diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)

    const root = d3.hierarchy(data);

    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
        d.id = i;
        d._children = d.children;
        if (d.depth && d.data.name.length !== 7) d.children = null;
    });   

    const svg = d3.select(id)
    .append("svg")
    .attr("viewBox", [-margin.left, -margin.top, width, dx])
    .style("font", "10px sans-serif")
    .style("user-select", "none");
 
    const gLink = svg.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5);

    const gNode = svg.append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");

    
    function update(source) {
    const duration = d3.event && d3.event.altKey ? 2500 : 250;
    const nodes = root.descendants().reverse();
    const links = root.links();

    // Compute the new tree layout.
    tree(root);

    let left = root;
    let right = root;
    root.eachBefore(node => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
    });

    const height = right.x - left.x + margin.top + margin.bottom;

    const transition = svg.transition()
        .duration(duration)
        .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

    // Update the nodes…
    const node = gNode.selectAll("g")
        .data(nodes, d => d.id);

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d) => {
            d.children = d.children ? null : d._children;
            update(d);
        });

    nodeEnter.append("circle")
        .attr("r", 2.5)
        .attr("fill", d => d._children ? "#555" : "#999")
        .attr("stroke-width", 10);

    nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d._children ? -6 : 6)
        .attr("text-anchor", d => d._children ? "end" : "start")
        .text(d => d.data.name)
        .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white");

    // Transition nodes to their new position.
    const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

    // Update the links…
    const link = gLink.selectAll("path")
        .data(links, d => d.target.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().append("path")
        .attr("d", d => {
            const o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition)
        .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition(transition).remove()
        .attr("d", d => {
            const o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
        });

    // Stash the old positions for transition.
    root.eachBefore(d => {
        d.x0 = d.x;
        d.y0 = d.y;
    });
    }

    update(root);

    // highlight the two interesting topic
    gNode.selectAll("g").filter(function(d){
    // select(function(d) {
        if (d.data.name === "Food and Entertaining") {
            return true;
        }
        if (d.data.name === "Personal Care and Style") {
            return true;
        }
        return false;
    }).style("font", "14px sans-serif").attr("stroke", "#b5c4b1").attr("stroke-width", 0.5);


//     console.log("The DOM object id is: ", id)
//     var svg = d3.select(id)
//                 .append("svg")
//                 .attr("width", width- margin.left - margin.right)
//                 .attr("height", height- margin.top - margin.bottom)
//                 .attr("viewBox", [0, 0, width-margin.left-margin.right, height+ margin.top])
//                 .attr("transform", "translate(" + half_margin_left+ "," + margin.top + ")")
//                 .style("background-color", 'white');

    
    
//     console.log("The ordered data is: ", data);
//       // X axis
//     var x = d3.scaleBand()
//       .range([ 0, width-margin.left-margin.right ])
//       .domain(data.map(function(d) { return d.dayOfWeek; }))
//       .padding(0.2);
//   // Add Y axis
//     var y = d3.scaleLinear()
//     //   .domain([0, 13000])
//       .domain([0, max_y+50])
//       .range([ height-20, 0]);
//       // .padding(0.1);

    
//     svg.selectAll("rect")
//         .data(data)
//         .join("rect")
//         // .enter()
//         // .append("rect")
//         // .transition() // <---- Here is the transition
//         // .duration(2000)
//         .on("mouseover", function (d, i) {      
//             // d3.select(this).transition()        
//             //      .duration(50)      
//             //    .style("opacity", .9);
//             // console.log("X "+(x(i.dayOfWeek)+400/x(i.dayOfWeek)));
//             // console.log("X "+d.pageX);

//             console.log("y "+(y(i.count)));
//             console.log("y "+d.pageY);
//             div.transition()        
//       	        .duration(200)      
//                 .style("opacity", .9);     
//             div.text(i.count)
//             //    .style("background-color", 'black')
//             //    .style("left", (x(i.dayOfWeek)+400/x(i.dayOfWeek)) + "px") 
//             //    .style("left", (x(i.dayOfWeek)+400/x(i.dayOfWeek)) + "px")    
//                .style("left", (d.pageX-35) + "px")
//                .style("top", (d.pageY-20) + "px")
//             //    .style("top", (y(i.count)+height+80) + "px");     
//         })  
//         .on("mouseout", function(d) { 
//             // d3.select(this).transition()
//             // .duration('50')
//             // .attr('opacity', '1');      
//             div.transition()        
//                .duration(50)      
//                .style("opacity", 0);   
//         })
//         .attr("x", function(d) { return x(d.dayOfWeek); })
//         .attr("y", function(d) { return y(d.count); })
//         .attr("width", x.bandwidth())
//         .attr("height", function(d) { return height - y(d.count)-10; })
//         .attr("fill", "#69b3a2")


//     var xAxis = svg.append("g")
//         .attr("transform", "translate(0," + (height-10) + ")")
//         .call(d3.axisBottom(x))
//         .selectAll("text")
//         // .attr("transform", "translate(-10,0)rotate(-45)")
//         .attr("transform", "translate(10,10)rotate(-15)")
//         .style("text-anchor", "end");
    

//     var yAxis = svg.append("g")
//         .call(d3.axisLeft(y))
//         .attr("transform", "translate(0,10)")
//     svg.append("text")
//         .attr("class", "x label")
//         .attr("text-anchor", "end")
//         .attr("x", width-14)
//         .attr("y", height+14 )
//         .text("dayOfWeek");
//     svg.append("text")
//         .attr("class", "y label")
//         .attr("text-anchor", "end")
//         .attr("y", 20)
//         // .attr("dy", "1.5em")
//         .attr("x", 40)
//         .text("Counts");

}
