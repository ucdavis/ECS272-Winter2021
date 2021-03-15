import React, {Component} from 'react';
import * as d3 from "d3";

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

       var view = svg.append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
       var x = d3.scaleLinear()
         .domain([this.props.startyear, maxyr])
         .range([0, width]);
         
       var y = d3.scaleLinear()
         .domain([0, 2400])
         .range([height, 0]);
 

        var curve = d3.curveLinear;

        var area = d3.area()
            .curve(curve)
            .x((d, ind) => x(+this.props.startyear + +ind))
            .y0(y(0))
            .y1(d => y(d));
       
        var colors = ["Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Teal", "Black", "Brown", "Cyan", "Grey", "Crimson"];

        transpose.reverse();

       var areaPlot = view.selectAll('path')
         .data(transpose)
         .join('path')
         .attr("fill", (d, i) => colors[i])
         .attr("d", area)
         .attr("class", (d, i) => i)

        var tooltip = document.getElementById('tooltip')
            areaPlot
             .on('mouseenter', function(d) {
               tooltip.innerHTML = orders[d3.select(this).attr("class")] + " Key";
             })
             .on('mouseleave', function(d) {
               tooltip.innerHTML = "";
             })
         
        var orders = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];

        view.selectAll('text')
            .data(orders)
            .join('text')
            .attr('x', (_, i) => (i % 6) * 100)
            .attr('y', (_, i) => Math.floor(i/6) * 40)
            .attr('fill', (d, i) => colors[i])
            .text(d => d + ' key')

       view.append("g")	
         .attr("transform", "translate(0," + height + ")")
         .style("font-size", "1em")
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

           
    });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }

}

export default Area;
