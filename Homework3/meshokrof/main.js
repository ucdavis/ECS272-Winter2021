var allData=[];
var plotData=[];
var subsetData={};
var columns=[];
var numericColumns=[];
var selected="noSelection";


var windowHeight=720;
var windowWidth=1080;
var pWidth=0;
var pHeight=0;
var hWidth=0;
var hHeight=0;
var tWidth=0;
var tHeight=0;
//write a function to get the color of the selected genres from the array and use it in the parallel coordinate
function getColor(genres)
{
  var g='';
  genres.forEach((item, i) => {
    if(selectedGenres.includes(item))
    g=item;
  });

  return genresFill[g];

}
function plotScatter() {
//  d3.select("#treeMap").select("svg").remove();

  // append the svg object to the body of the page


  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 25, bottom: 30, left: 40},
  width = tWidth - margin.left - margin.right,
  height = tHeight - margin.top - margin.bottom;



  //Read the data
  function update() {
    d3.select("#treeMap").select("svg").remove();
    // append the svg object to the body of the page
    var svg = d3.select("#treeMap")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g").call( d3.brush()                 // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
    );


    // d3.select("#treeMap")
    //   .call( d3.brush()                     // Add the brush feature using the d3.brush function
    //     .extent( [ [0,0], [400,400] ] )       // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
    //   );
    xaxis=d3.select("#scatter_x_v").node().value;
    yaxis=d3.select("#scatter_y_v").node().value;

    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    xaxis_min=d3.min(plotData, function(d) { return +d[xaxis];});
    xaxis_max=d3.max(plotData, function(d) { return +d[xaxis];});
    yaxis_min=d3.min(plotData, function(d) { return +d[yaxis];});
    yaxis_max=d3.max(plotData, function(d) { return +d[yaxis];});

    var myGroups = Array(yaxis_max-yaxis_min).fill().map((element, index) => index + yaxis_min+1);
    var myVars = Array(xaxis_max-xaxis_min).fill().map((element, index) => index + xaxis_min+1);


    // Build X scales and axis:
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(myGroups)
    .padding(0.05);
    svg.append("g")
    .style("font-size", 15)
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

    // Build Y scales and axis:
    var y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(myVars)
    .padding(0.05);
    svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

    // Build color scale


    // create a tooltip
    // var tooltip = d3.select("#treeMap")
    //   .append("div")
    //   .style("opacity", 0)
    //   .attr("class", "tooltip")
    //   .style("background-color", "white")
    //   .style("border", "solid")
    //   .style("border-width", "2px")
    //   .style("border-radius", "5px")
    //   .style("padding", "5px")

    // // Three function that change the tooltip when user hover / move / leave a cell
    // var mouseover = function(d) {
    //   tooltip
    //     .style("opacity", 1)
    //   d3.select(this)
    //     .style("stroke", "black")
    //     .style("opacity", 1)
    // }
    // var mousemove = function(d) {
    //   tooltip
    //     .html("The exact value of<br>this cell is: " + d.value)
    //     .style("left", (d3.mouse(this)[0]+70) + "px")
    //     .style("top", (d3.mouse(this)[1]) + "px")
    // }
    // var mouseleave = function(d) {
    //   tooltip
    //     .style("opacity", 0)
    //   d3.select(this)
    //     .style("stroke", "none")
    //     .style("opacity", 0.8)
    // }
    map={};

    plotData.forEach((item, i) => {
      if(item[xaxis]!="" && item[yaxis]!=""){
        var key=[item[xaxis],item[yaxis]];
        if(!(key in map))
        map[key]=0;
        map[key]+=1;
      }
    });

    data=[];
    maxValue=0;
    Object.entries(map).forEach(([k,v]) => {
      var s=k.split(",");
      maxValue=d3.max([maxValue,v]);
      data.push({
        group: s[0],
        variable: s[1],
        value: v
      });
    });


    var myColor = d3.scaleSequential()
    .interpolator(d3.interpolateYlOrRd)
    .domain([0,maxValue])

    // add the squares
    squares=svg.selectAll()
    .data(data, function(d) {return d.group+':'+d.variable;})
    .enter()
    .append("rect")
    .attr("x", function(d) { return x(d.group) })
    .attr("y", function(d) { return y(d.variable) })
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", x.bandwidth() )
    .attr("height", y.bandwidth() )
    .style("fill", function(d) { return myColor(d.value)} )
    .style("stroke-width", 4)
    .style("stroke", "none")
    .style("opacity", 0.8);
    // .on("mouseover", mouseover)
    // .on("mousemove", mousemove)
    // .on("mouseleave", mouseleave)


  function updateChart() {
    console.log("Brushed");
   extent = d3.event.selection
   squares.classed("selected", function(d){ return isBrushed(extent, x(d.group), y(d.variable) ) } )
 }
  // A function that return TRUE or FALSE according if a dot is in the selection or not
function isBrushed(brush_coords, cx, cy) {
     var x0 = brush_coords[0][0],
         x1 = brush_coords[1][0],
         y0 = brush_coords[0][1],
         y1 = brush_coords[1][1];
    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    // This return TRUE or FALSE depending on if the points is in the selected area
}



  }
  update();
  d3.select("#scatter_x_v").on("change", update);
  d3.select("#scatter_y_v").on("change", update);





}


function plotSankey(){

  var nodes=[];
  var links=[];
  var nodesSet={};
  function split(data,columns,columns_index,source_name)
  {
    var c=columns[columns_index];
    map={};
    data.forEach((item, i) => {
      var key=item[c];
      if(key!= ""){
        if(! (key in map))
        map[key]=[];
        map[key].push(item);
      }
    });


    Object.entries(map).forEach(([k,v]) => {
      nodesSet[k]=0;
      if(k in subsetData)
      subsetData[k].push(...v);
      else
      subsetData[k]=v;
      if(source_name!="begin"){
        links.push({
          source:source_name,
          target:k,
          value:v.length
        });

      }
      if(columns_index < columns.length -1)
      {
        split(v,columns,columns_index+1,k);
      }
    });

  }

  columnsSankey=["Gender","Education", "Alcohol","Smoking"];
  split(plotData,columnsSankey,0,"begin");

  Object.keys(nodesSet).forEach((item, i) => {
    nodes.push({
      name:item,
      sourceLinks:[],
      targetLinks:[]
    });
  });



  var units = "Widgets";

  var margin = {top: 10, right: 10, bottom: 10, left: 10},
  width = pWidth - margin.left - margin.right,
  height = pHeight - margin.top - margin.bottom;

  var formatNumber = d3.format(",.0f"),    // zero decimal places
  format = function(d) { return formatNumber(d) + " " + units; },
  color = d3.scaleOrdinal(d3.schemeCategory20);

  // append the svg canvas to the page
  var svg = d3.select("#Parallel").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");

  // Set the sankey diagram properties
  var sankey = d3.sankey()
  .nodeWidth(36)
  .nodePadding(10)
  .size([width, height]);

  var path = sankey.link();

  // load the data
  graph={
    nodes:nodes,
    links:links
  }

  var nodeMap = {};
  graph.nodes.forEach(function(x) { nodeMap[x.name] = x; });
  graph.links = graph.links.map(function(x) {
    return {
      source: nodeMap[x.source],
      target: nodeMap[x.target],
      value: x.value
    };
  });

  sankey
  .nodes(graph.nodes)
  .links(graph.links)
  .layout(32);



  function setDash(d) {
    var d3this = d3.select(this);
    var totalLength = d3this.node().getTotalLength();
    d3this
    .attr('stroke-dasharray', totalLength + ' ' + totalLength)
    .attr('stroke-dashoffset', totalLength)
  }

  function branchAnimate(nodeData) {
    var links = svg.selectAll(".gradient-link")
    .filter(function(gradientD) {
      return nodeData.sourceLinks.indexOf(gradientD) > -1
    });
    var nextLayerNodeData = [];
    links.each(function(d) {
      nextLayerNodeData.push(d.target);
    });

    links
    .style("opacity", null)
    .transition()
    .duration(400)
    .ease(d3.easeLinear)
    .attr('stroke-dashoffset', 0)
    .on("end", function() {
      nextLayerNodeData.forEach(function(d) {
        branchAnimate(d);
      });
    });
  } //end branchAnimate

  var gradientLink = svg.append("g").selectAll(".gradient-link")
  .data(graph.links)
  .enter().append("path")
  .attr("class", "gradient-link")
  .attr("d", path)
  .style("stroke-width", function(d) {
    return Math.max(1, d.dy);
  })
  .sort(function(a, b) {
    return b.dy - a.dy;
  })
  .each(setDash)
  .style('stroke', function(d) {
    var sourceColor = color(d.source.name.replace(/ .*/, "")).replace("#", "");
    var targetColor = color(d.target.name.replace(/ .*/, "")).replace("#", "");
    var id = 'c-' + sourceColor + '-to-' + targetColor;

    //if (!svg.select(id)[0][0])
    {
      //append the gradient def
      //append a gradient
      var gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', id)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')
      .attr('spreadMethod', 'pad');

      gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', "#" + sourceColor)
      .attr('stop-opacity', 1);

      gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', "#" + targetColor)
      .attr('stop-opacity', 1);
    }
    return "url(#" + id + ")";
  });



  // add in the links
  var link = svg.append("g").selectAll(".link")
  .data(graph.links)
  .enter().append("path")
  .attr("class", "link")
  .attr("d", path)
  .style("stroke-width", function(d) { return Math.max(1, d.dy); })
  .sort(function(a, b) { return b.dy - a.dy; })
  .attr("id", function (d){
    var sourceColor = color(d.source.name.replace(/ .*/, "")).replace("#", "");
    var targetColor = color(d.target.name.replace(/ .*/, "")).replace("#", "");
    return 'c-' + sourceColor + '-to-' + targetColor;

  });

  // add the link titles
  link.append("title")
  .text(function(d) {
    return d.source.name + " → " +
    d.target.name + "\n" + format(d.value); });

    // add in the nodes
    var node = svg.append("g").selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")"; })
      .on("click", function(dd) {
        console.log("here");
        if(selected != "noSelection"){
          //cancel all transitions by making a new one
          gradientLink.transition();
          gradientLink
          .style("opacity", 0)
          .each(function(d) {
            setDash.call(this, d);
          });
          if(selected== dd.name){
            selected="noSelection";
            plotData=allData;
          }
          else{
            selected=dd.name;
            branchAnimate(dd)
            plotData=subsetData[dd.name];
          }

        }
        else{
          branchAnimate(dd);
          selected=dd.name;
          plotData=subsetData[dd.name];
        }
        plot();
      });
      // .call(d3.drag()
      // .subject(function(d) { return d; })
      // .on("start", function() {
      //   this.parentNode.appendChild(this); })
      //   .on("drag", dragmove)
      //   );

      // add the rectangles for the nodes
      node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) {
        return d.color = color(d.name.replace(/ .*/, "")); })
        .style("stroke", function(d) {
          return d3.rgb(d.color).darker(2); })
          .append("title")
          .text(function(d) {
            return d.name + "\n" + format(d.value); });

            // add in the title for the nodes
            node.append("text")
            .attr("x", -6)
            .attr("y", function(d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function(d) { return d.name; })
            .filter(function(d) { return d.x < width / 2; })
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start");

            // the function for moving the nodes
            function dragmove(d) {
              d3.select(this).attr("transform",
              "translate(" + (
                d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
              ) + "," + (
                d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
              ) + ")");
              sankey.relayout();
              link.attr("d", path);
            }

          }

          function plotHistogram() {
            d3.select("#histogram").select("svg").remove();
            var margin = {top: 10, right: 30, bottom: 30, left: 40};
            var width= hWidth;
            var height= hHeight;
            width = width - margin.left - margin.right;
            height = height - margin.top - margin.bottom;
            //

            // var tooltip = d3.select("#histogram")
            // .append("div")
            // .style("opacity", 0)
            // .attr("class", "tooltip")
            // .style("background-color", "black")
            // .style("color", "white")
            // .style("border-radius", "5px")
            // .style("padding", "10px")

            // append the svg object to the body of the page
            var svg = d3.select("#histogram")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");



            svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Count");
            // X axis: scale and draw:

            // X axis: scale and draw:
            var x = d3.scaleLinear()
            .domain([0,1])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
            .range([0, width]);
            var xAxis = svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

            // Y axis: initialization
            var y = d3.scaleLinear()
            .range([height, 0]);
            var yAxis = svg.append("g")

            // A function that builds the graph for a specific value of bin
            function update() {
              attribute=d3.select("#Hist_attribute").node().value;
              nBin=d3.select("#nBin").node().value;
              histData=plotData;

              x.domain([0, d3.max(histData, function(d) { return +d[attribute];})])
              // set the parameters for the histogram
              var histogram = d3.histogram()
              .value(function(d) { return d[attribute]; })   // I need to give the vector of value
              .domain(x.domain())  // then the domain of the graphic
              .thresholds(x.ticks(nBin)); // then the numbers of bins

              // And apply this function to data to get the bins
              var bins = histogram(histData);


              // Y axis: update now that we know the domain
              y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously

              xAxis
              .transition()
              .duration(1000)
              .call(d3.axisBottom(x));
              yAxis
              .transition()
              .duration(1000)
              .call(d3.axisLeft(y));

              // Join the rect with the bins data
              var u = svg.selectAll("rect")
              .data(bins)

              // Manage the existing bars and eventually the new ones:
              u
              .enter()
              .append("rect") // Add a new rect for each new elements
              .merge(u) // get the already existing elements as well
              .transition() // and apply changes to all of them
              .duration(1000)
              .attr("x", 1)
              .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
              .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
              .attr("height", function(d) { return height - y(d.length); })
              .style("fill", "#69b3a2")



              // If less bar in the new histogram, I delete the ones not in use anymore
              u
              .exit()
              .remove()

              d3.select("histogram").append("g").attr("class", "brush").call( d3.brushX()                     // Add the brush feature using the d3.brush function
          .extent( [ [0,0], [200,200] ] )       // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
            );

            }


            // Initialize with 20 bins
            update();


            // Listen to the button -> update if user change it
            d3.select("#nBin").on("input", update);
            d3.select("#Hist_attribute").on("change", update);


          }


          function plot(){


            plotHistogram();
            plotScatter();

          }
          function isNumeric(value) {
            return /^-?\d+$/.test(value);
          }
          (function() {
            var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0];

            pWidth= parseInt(d3.select('#Parallel').style('width'), 10);
            pHeight= parseInt(d3.select('#Parallel').style('height'), 10);

            hWidth= parseInt(d3.select('#histogram').style('width'), 10);
            hHeight= parseInt(d3.select('#histogram').style('height'), 10);

            tWidth= parseInt(d3.select('#treeMap').style('width'), 10);
            tHeight= parseInt(d3.select('#treeMap').style('height'), 10);

            windowWidth = w.innerWidth || e.clientWidth || g.clientWidth,
            windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;
            d3.csv('https://raw.githubusercontent.com/shokrof/ECS272-Winter2021/main/Homework3/meshokrof/responses.csv', function(data) {
              allData=data;
              genresSet={};
              plotData=data;
              columns=Object.keys(data[0]);
              columns.forEach((item, i) => {
                if(isNumeric(data[0][item]))
                {
                  xaxis_max=d3.max(data, function(d) { return +d[item];});

                  if(xaxis_max==5)
                  numericColumns.push(item);
                }
              });

              d3.select("#Hist")
              .append("select")
              .attr("id","Hist_attribute")
              .selectAll("option")
              .data(numericColumns)
              .enter()
              .append("option")
              .text(function(d,i) {return d; })
              .attr("value",function(d,i) {return d; });


              d3.select("#scatter_x")
              .append("select")
              .attr("id","scatter_x_v")
              .selectAll("option")
              .data(numericColumns)
              .enter()
              .append("option")
              .text(function(d,i) {return d; })
              .attr("value",function(d,i) {return d; })
              .attr("id",function(d,i) {return "scatter_x_v_"+d; })

              d3.select("#scatter_y")
              .append("select")
              .attr("id","scatter_y_v")
              .selectAll("option")
              .data(numericColumns)
              .enter()
              .append("option")
              .text(function(d,i) {return d; })
              .attr("value",function(d,i) {return d; })
              .attr("id",function(d,i) {return "scatter_y_v_"+d; });

              randX=Math.floor(Math.random() * numericColumns.length) -1;
              randY=randX+1;
              d3.select("#scatter_y_v_"+numericColumns[randY])
              .attr("selected","");

              d3.select("#scatter_x_v_"+numericColumns[randX])
              .attr("selected","");

              plot();
              plotSankey();

            });
          })();
