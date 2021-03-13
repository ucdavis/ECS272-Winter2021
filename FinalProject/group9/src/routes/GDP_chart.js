import React, { Component } from 'react';
import gdpdb from '../datasets/merge_df.csv';
import * as d3 from "d3";

/****************************************/
/* Data was prepocessed using python
/****************************************/

class GDP_chart extends Component {

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    //d3.csv(this.props.data)
    d3.csv(gdpdb)
      .then(csv => {

        console.log(csv);

        // Mapping data
        var init_data = csv.map(row => {
          return {
            gdp: Number(row['gdp']),
            expenditure: Number(row['expenditure']),
            year: Number(row['year']),
            country: row['country']
          }
        })

        var years = d3.extent(init_data, d => d.year);
        var dataInitial = init_data.filter(d => d.year === years[0]);

        /********************************* 
       * Visualization codes start here
       * ********************************/
        var width = 700;
        var height = 500;
        var margin = { left: 120, right: 20, top: 20, bottom: 60 }

        var svg = d3.select('#container')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

        var g = svg.append("g")  // creat g tag in SVG
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");   
          
        var x = d3.scaleLinear()
          .domain([0, d3.max(init_data, d => d.gdp)])
          .range([0, width]);

        var y = d3.scaleLinear()
          .domain([0, d3.max(init_data, d => d.expenditure)])
          .range([height, 0]);


          // draw grid, based on https://observablehq.com/@d3/scatterplot
  
        const grid = g.append('g')
          .attr('class', 'grid');

        grid.append('g')
        .selectAll('line')
        .data(y.ticks())
        .join('line')
          .attr('stroke', '#d3d3d3')
          .attr("stroke-opacity", 0.1)
          .attr('x1', 0)
          .attr('x2', width)
          .attr('y1', d => 0.5 + y(d))
          .attr('y2', d => 0.5 + y(d));

        grid.append('g')
        .selectAll('line')
        .data(x.ticks())
        .join('line')
          .attr('stroke', '#d3d3d3')
          .attr("stroke-opacity", 0.1)
          .attr('x1', d => 0.5 + x(d))
          .attr('x2', d => 0.5 + x(d))
          .attr('y1', d => 0)
          .attr('y2', d => height);

          const zoom = d3.zoom()
          .extent([[0, 0], [width, height]])
          // determine how much you can zoom out and in
          .scaleExtent([1, 300])
          .on('zoom', onZoom);

        function onZoom(event) {
          // get updated scales
          const xNew = event.transform.rescaleX(x);
          const yNew = event.transform.rescaleY(y);

        scatterPlot
          .attr('cx', d => xNew(d.gdp))
          .attr('cy', d => yNew(d.expenditure));


        // update the axes
        xAxisGroup.call(xAxis.scale(xNew));
        //.call(g => g.selectAll('.domain').remove());

        yAxisGroup.call(yAxis.scale(yNew))
        //.call(g => g.selectAll('.domain').remove());  
        }
        
        // create a scatter plot
        var scatterPlot = g.selectAll('circle.country') // select all circles in SVG tag
          .data(dataInitial, d => d.country)
          .join('circle')
          .attr('cx', d => x(d.gdp))
          .attr('cy', d => y(d.expenditure))
          .attr('data-x', d => d.gdp)
          .attr('data-y', d => d.expenditure)
          .attr("r", 7)  
          .attr('opacity', 0.5)
          .attr("fill", '#FFFFB5');
          
        svg.call(zoom);

        // Year Label 
        const yearLabel = g.append('text')
          .attr('class', 'year')
          .attr('x', 40)
          .attr('y', height - margin.bottom - 20)
          .attr('fill', '#ccc')
          .attr('font-family', 'Helvetica Neue, Arial')
          .attr('font-weight', 500)
          .attr('font-size', 80)
          .text(years[0]);

        // Animation
        d3.select("#nyears").on("input", function () {
          update(+this.value);
        });
        update(1955);

        //Update elements
        function update(nyears) {
          d3.select("#nyears-value").text(nyears);
          d3.select("#nyears").property("value", nyears);
          yearLabel.text(nyears);
          //Update circle Radius
          scatterPlot
            .data(init_data.filter(d => d.year === nyears), d => d.country)
            .attr('cx', d => x(d.gdp))
            .attr('cy', d => y(d.expenditure))
            .attr('data-x', d => d.gdp)
            .attr('data-y', d => d.expenditure)
            .attr('data-z', d => d.country)
            .attr("r", 8)  
            .attr('opacity', 0.8)
            .attr("fill", '#FFFFB5')
        }

        var myTimer;
        d3.select("#start").on("click", function () {
          clearInterval(myTimer);
          myTimer = setInterval(function () {
            var b = d3.select("#nyears");
            var t = (+b.property("value") + 1) % (+b.property("max") + 1);
            if (t === 0) { t = +b.property("min"); }
            b.property("value", t);
            update(t);
            if (t === 2018) { clearInterval(myTimer); } // stop if it's done.
          }, 100);
        });

        d3.select("#stop").on("click", function () {
          clearInterval(myTimer);
        });

        var tooltip = document.getElementById('tooltip')
        scatterPlot
          .on('mouseenter', function (d) {
            d3.select(this).style('fill', 'pink')
            tooltip.innerHTML = 'GDP = ' + d.target.dataset.x + ', Military expenditure = ' + d.target.dataset.y + ', Country = ' + d.target.dataset.z
          })
          .on('mouseleave', function (d) {
            d3.select(this).style('fill', 'lightblue')
          })


        var xAxis = d3.axisBottom(x).ticks(6);

        var xAxisGroup = g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .call(g => g.selectAll('.domain').remove());
        // x axis
        xAxisGroup
          .call(d3.axisBottom(x).ticks(6))
          .append("text")
          .attr("fill", "#e3ebeb")
          .attr("x", width / 2)
          .attr('y', margin.bottom / 2)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("GDP ($)");

      
        var yAxis = d3.axisLeft(y);
        // y axis
        var yAxisGroup = g.append("g")
        .call(yAxis)
        .call(g => g.selectAll('.domain').remove());

        yAxisGroup
          .call(d3.axisLeft(y).ticks(6))
          .append("text")
          .attr("fill", "#e3ebeb")
          .attr("transform", "rotate(-90)")
          .attr("x", - height / 2)
          .attr("y", - margin.left)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("Military expenditure ($)");

      });

  }

  render() {
    return <div id={"#" + this.props.id}></div>
  }
}

export default GDP_chart;