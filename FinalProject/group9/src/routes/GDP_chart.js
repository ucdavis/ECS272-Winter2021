import React, { Component } from 'react';
import gdpdb from '../datasets/merge_df.csv';
import * as d3 from "d3";


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
        var height = 400;
        var margin = { left: 120, right: 20, top: 20, bottom: 60 }

        var svg = d3.select('#container')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)

        var view = svg.append("g")  // creat g tag in SVG
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleLinear()
          .domain([0, d3.max(init_data, d => d.gdp)])
          .range([0, width]);

        var y = d3.scaleLinear()
          .domain([0, d3.max(init_data, d => d.expenditure)])
          .range([height, 0]);

        // create a scatter plot
        var scatterPlot = view.selectAll('circle.country') // select all circles in SVG tag
          .data(dataInitial, d => d.country)
          .join('circle')
          .attr('cx', d => x(d.gdp))
          .attr('cy', d => y(d.expenditure))
          .attr('data-x', d => d.gdp)
          .attr('data-y', d => d.expenditure)
          .attr("r", 7)  
          .attr('opacity', 0.5)
          .attr("fill", "lightblue");

        // Year Label 
        const yearLabel = view.append('text')
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
            .attr("fill", "lightblue")
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
            d3.select(this).style('fill', '#FFFFB5')
          })

        // x axis
        view.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).ticks(6))
          .append("text")
          .attr("fill", "#e3ebeb")
          .attr("x", width / 2)
          .attr('y', margin.bottom / 2)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text("GDP ($)");

        // y axis
        view.append("g")
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