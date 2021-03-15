import React, {Component} from 'react';
import * as d3 from "d3";
import 'd3-transition';
import 'd3-brush';

class Scatter extends Component{

    componentDidMount(){
        this.drawChart();
    }

    componentDidUpdate(){
      this.drawChart();
    }

    drawChart(){
      if(document.getElementById('up1').innerHTML.valueOf() != "Update"){
          return;
      }
      document.getElementById('up1').innerHTML = "No";

        var xcolumn = this.props.xcol;
        var ycolumn = this.props.ycol;

        d3.csv( this.props.data)
        .then(csv => {
        csv = csv.filter(d => { return Math.floor(Math.random() * 20) === 0;});

        var data = csv.map(row => {
          return {
            xcol: Number(row[this.props.xcol]),
            ycol: Number(row[this.props.ycol]),
            ccol: Number(row[this.props.ccol]),
            explicit: Number(row['explicit']),
            name: row["name"]
          }
        })

       var width = 800;
       var height = 400;
       var margin = {left: 60, right: 20, top: 20, bottom: 60}

       d3.select('#bar').selectAll("svg.svg1").remove();

       var svg = d3.select('#bar')
         .append('svg')
           .attr('width', "38vw")
           .attr('height', "19vw")
           .attr('viewBox', "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
           .attr('class', 'svg1')
           .call(zoom)

       svg.selectAll("*").remove();

       var view = svg.append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
        var xl = d3.min(data, d => d.xcol);
        var xh = d3.max(data, d => d.xcol);
        var yl = d3.min(data, d => d.ycol);
        var yh = d3.max(data, d => d.ycol);

       var x = d3.scaleLinear()
         .domain([xl, xh])
         .range([0, width]);
         
       var y = d3.scaleLinear()
         .domain([yl, yh])
         .range([height, 30]);

      var col = d3.scaleLinear()
         .domain([d3.min(data, d => d.ccol), d3.max(data, d => d.ccol)])
         .range([0, 255]);
 
       
       var scatterPlot = view.selectAll('circle')
         .data(data)
         .join('circle')
           .attr('cx', d => x(d.xcol))
           .attr('cy', d => y(d.ycol))
           .attr('data-x', d => d.xcol)
           .attr('data-y', d => d.ycol)
           .attr("r", 6)
           .attr('opacity', 0.3)
           .attr("fill", d => "rgb(" + (255 - col(d.ccol)) + ",0," + col(d.ccol) + ")")
           .attr("class", d => d.ccol)
           .attr("name", d => d.name);

        var gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "50%")
        .attr("x2", "100%")
        .attr("y2", "50%");
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "Red")
        .attr("stop-opacity", 1);
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "Blue")
        .attr("stop-opacity", 1);
    
    var g = svg.append("rect")
      .attr("fill", "url(#gradient)")
      .attr("x", width/2 - 50)
      .attr("y", 0)
      .attr("width", 200)
      .attr("height", 25)

    var mn = d3.min(data, d => d.ccol);
    var mns = Math.abs(mn) < 10 ? mn.toFixed(3) : mn.toFixed(0);

    svg.append("text")
      .attr('x', width/2 - 50 - 10*mns.length)
      .attr("y", 20)
      .attr('fill', "Black")
      .text(mns);

    var mx = d3.max(data, d => d.ccol);
    var mxs = Math.abs(mx) < 10 ? mx.toFixed(3) : mx.toFixed(0);
  
      svg.append("text")
        .attr('x', width/2 + 155)
        .attr("y", 20)
        .attr('fill', "Black")
        .text(mxs);

       var xc = this.props.xcol;
       var yc = this.props.ycol;
       var cc = this.props.ccol;

       var prev_op = 0;

       var tooltip = document.getElementById('tooltip')
       scatterPlot
         .on('mouseenter', function(d) {
           prev_op = d3.select(this).attr("opacity");
           d3.select(this).style('opacity', 1);
           d3.select(this).style('stroke', "black");
           d3.select(this).style('stroke-width', 2);
           tooltip.innerHTML = d3.select(this).attr("name") + ": " + xc + ' = ' + d.target.dataset.x + ', ' + yc + ' = ' + d.target.dataset.y + ', ' + cc + " = " + d3.select(this).attr("class");
         })
         .on('mouseleave', function(d) {
           d3.select(this).style('opacity', prev_op)
           d3.select(this).style('stroke', "none");
           tooltip.innerHTML = "";
         })
 
       var xAxis = view.append("g")	
         .attr("transform", "translate(0," + height + ")")
         .style("font-size", "1em")
         .attr("class", "x-axis")
         .call((xcolumn == "year") ? (d3.axisBottom(x).ticks(6).tickFormat(d3.format("d"))) : (d3.axisBottom(x).ticks(6)))
           .append("text")
           .attr("fill", "#000")
           .attr("x", width / 2)
           .attr('y', margin.bottom / 2)
           .attr("dy", "0.71em")
           .attr("text-anchor", "end")
           .text(this.props.xcol);
 
       var yAxis = view.append("g")
         .style("font-size", "1em")
         .attr("class", "y-axis")
         .call((ycolumn == "year") ? (d3.axisLeft(y).ticks(6).tickFormat(d3.format("d"))) : (d3.axisLeft(y).ticks(6)))
         .append("text")
           .attr("fill", "#000")
           .attr("transform", "rotate(-90)")
           .attr("x", - height / 2)
           .attr("y", - margin.left)
           .attr("dy", "0.71em")
           .attr("text-anchor", "end")
           .text(this.props.ycol);


      function zoom(svg) {
          const extent = [[margin.left, margin.top], [width - margin.right, height - margin.top]];
        
          svg.call(d3.zoom()
              .scaleExtent([1, 8])
              .translateExtent(extent)
              .extent(extent)
              .on("zoom", zoomed));
        
          function zoomed(event) {
            x.range([0, width].map(d => event.transform.applyX(d)));
            y.range([height, margin.top].map(d => event.transform.applyY(d)));
            svg.selectAll("circle")
              .transition()
              .duration(750)
              .ease(d3.easeLinear)
              .attr("cx", d => x(d.xcol))
              .attr("cy", d => y(d.ycol))
              .attr('opacity', d => (x(d.xcol) < 0 || x(d.xcol) >= width || y(d.ycol) < 0 || y(d.ycol) >= height)? .01 : .3);

            svg.selectAll(".x-axis")
              .transition()
              .duration(750)
              .ease(d3.easeLinear)
              .attr("transform", `translate(0,${height})`)
              .call((xcolumn == "year") ? (d3.axisBottom(x).ticks(6).tickFormat(d3.format("d"))) : (d3.axisBottom(x).ticks(6)));

            svg.selectAll(".y-axis")
              .transition()
              .duration(750)
              .ease(d3.easeLinear)
              .call((ycolumn == "year") ? (d3.axisLeft(y).ticks(6).tickFormat(d3.format("d"))) : (d3.axisLeft(y).ticks(6)))
              
          }
      }

 
     });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default Scatter;