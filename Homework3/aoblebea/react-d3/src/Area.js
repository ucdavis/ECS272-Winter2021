import React, {Component} from 'react';
import * as d3 from "d3";
import 'd3-transition';
import 'd3-brush';

class Area extends Component{
    componentDidMount(){
        this.drawChart();
    }

    componentDidUpdate(){
      this.drawChart();
    }

    drawChart(){

        if(document.getElementById('up2').innerHTML.valueOf() != "Update"){
            return;
        }
        document.getElementById('up2').innerHTML = "No";

        var minyr;
        var maxyr;
        var transpose;

        d3.csv( this.props.data)
        .then(csv => {
            minyr = d3.min(csv, d => d.year)
            maxyr = d3.max(csv, d => d.year)

            var table = [];

            for(var i = 0; i <= maxyr - minyr; i++){
                table[i] = [];
                for(var j = 0; j < 12; j++){
                    table[i][j] = 0;
                }
            }

            for(var ky in Object.keys(csv)){
                var r = csv[ky];

                try{
                var yr = Number(r["year"]);
                var k = Number(r["key"]);
                table[yr - minyr][k] += 1;
                }
                catch(e){

                }
            }

            table = table.slice(+this.props.startyear - +minyr);

            transpose = table[0].map((_, colIndex) => table.map(row => row[colIndex]));

        }).then(csv => {

        for(var i = 1; i < 12; i++){
            for(var j = 0; j <= +maxyr - +this.props.startyear; j++){
                transpose[i][j] += transpose[i-1][j];                
            }
        }

       var width = 800;
       var height = 400;
       var margin = {left: 60, right: 20, top: 20, bottom: 60}

       d3.select('#area').selectAll("svg.svg2").remove();

       var svg = d3.select('#area')
         .append('svg')
         .attr('width', "38vw")
         .attr('height', "19vw")
         .attr('viewBox', "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
           .attr('class', 'svg2')
 
       svg.selectAll("*").remove();

        

       var clip = svg.append("defs").append("svg:clipPath")
       .attr("id", "clip")
       .append("svg:rect")
       .attr("width", width + 150)
       .attr("height", height * 2 )
       .attr("x", -150)
       .attr("y", -height/2);


       var view = svg.append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
         .attr("clip-path", "url(#clip)");

      var x = d3.scaleTime()
         .domain([new Date(this.props.startyear), new Date(maxyr)])
         .range([0, width]);

       var defx = x;
         
       var y = d3.scaleLinear()
         .domain([0, 2400])
         .range([height, 0]);
 

        var curve = d3.curveLinear;

        var area = d3.area()
            .curve(curve)
            .x((d, ind) => { return x(new Date(String(+this.props.startyear + +ind)))})
            .y0(y(0))
            .y1(d => y(d));
       
        var colors = ["Red", "seagreen", "Blue", "deeppink", "Purple", "Orange", "steelblue", "Black", "Brown", "Cyan", "Grey", "darkgreen"];

        transpose.reverse();

       var areaPlot = view.selectAll('path')
         .data(transpose)
         .join('path')
         .attr("fill", (d, i) => colors[i])
         .attr("d", area)
         .attr("class", (d, i) => i)

        var brush = d3.brushX()
        .extent([[0,0], [width,height]])
        .on("end", brushChart)

        view
         .call(brush)


        var tooltip = document.getElementById('tooltip')
            areaPlot
             .on('mouseenter', function(d) {
               tooltip.innerHTML = orders[d3.select(this).attr("class")] + " Key";
             })
             .on('mouseleave', function(d) {
               tooltip.innerHTML = "";
             })
         
        var orders = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];

       var legend = view.append("g");

       function summarize(ny, xy){
         var counts = new Array(12).fill(0);
         for(var i = 0; i < 12; i++){
            for(var j = ny - minyr; j <= xy - minyr; j++){
              counts[i] += (i < 11) ? +transpose[i][j] - +transpose[i + 1][j] : +transpose[i][j];
            }
         }

         var tot = counts.reduce((a, b) => a + b, 0);

         for(var i = 0; i < 12; i++){
           counts[i] = Math.round(counts[i] * 100 / tot);
         }

         legend.selectAll('text')
            .data(counts)
            .join('text')
            .transition()
            .duration(750)
            .attr('x', (_, i) => (i % 6) * 130)
            .attr('y', (_, i) => Math.floor(i/6) * 40)
            .attr('fill', (d, i) => colors[i])
            .attr('font-weight', "bold")
            .text((d, i) => orders[i] + ' key: ' + d + "%")

       }

       summarize(minyr, maxyr);

        view.append("rect")
            .attr("x", -480)
            .attr("y", 0)
            .attr("width", 480)
            .attr("height", height)
            .attr("fill", "white")
            .attr("stroke-width", "3")
            .attr("stroke", "white")

       var xaxis = view.append("g")	
         .attr("transform", "translate(0," + height + ")")
         .style("font-size", "1em")
         .attr("class", "x-axis")
         .call(d3.axisBottom(x).ticks(6))
           .append("text")
           .attr("fill", "#000")
           .attr("x", width / 2)
           .attr('y', margin.bottom / 2)
           .attr("dy", "0.71em")
           .attr("text-anchor", "end")
           .text("year");
 
       view.append("g")
         .style("font-size", "1em")
         .call(d3.axisLeft(y).ticks(6))
         .append("text")
           .attr("fill", "#000")
           .attr("transform", "rotate(-90)")
           .attr("x", - height / 2)
           .attr("y", - margin.left)
           .attr("dy", "0.71em")
           .attr("text-anchor", "end")
           .text("occurances");

      function brushChart({selection}) {
        if(!selection) return;

         x.domain([ x.invert(selection[0]), x.invert(selection[1]) ])
         view.select(".selection").style("display", "none");
 
         summarize(Math.ceil(x.invert(selection[0]).getFullYear()), Math.floor(x.invert(selection[1]).getFullYear()));

        svg.selectAll(".x-axis")
              .transition()
              .duration(750)
              .ease(d3.easeLinear)
              .attr("transform", `translate(0,${height})`)
              .call(d3.axisBottom(x).ticks(6));

        view.selectAll('path')
              .data(transpose)
              .transition()
              .duration(750)
              .ease(d3.easeLinear)
              .attr("d", area);
       }

      view.on("dblclick",function(){

        x = d3.scaleTime()
         .domain([new Date(minyr), new Date(maxyr)])
         .range([0, width]);

         summarize(minyr, maxyr);

        svg.selectAll(".x-axis")
              .transition()
              .duration(750)
              .ease(d3.easeLinear)
              .attr("transform", `translate(0,${height})`)
              .call(d3.axisBottom(x).ticks(6));

        view.selectAll('path')
              .data(transpose)
              .transition()
              .duration(750)
              .ease(d3.easeLinear)
              .attr("d", area)

      });     


    });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }

}

export default Area;
