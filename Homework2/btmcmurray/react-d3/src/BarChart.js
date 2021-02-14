import React, { Component } from 'react';
import * as d3 from "d3";
import { axisBottom, format, line } from 'd3';

class BarChart extends Component {

  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    d3.csv(this.props.data)
      .then(csv => {
        // log csv in browser console


        // create data by selecting two columns from csv 
        var data = csv.map(row => {
          return {
            yes: Number(row['Yes Votes']),
            no: Number(row['No Votes']),
            passFail: row['Pass or Fail'],
            percent: Number(row['Percent']),
            keyword: row['Key Word'],
            year: Number(row['Year'])
          }
        })

        console.log(data)
        /********************************* 
       * Visualization codes start here
       * ********************************/
        var width = 1800;
        var height = 400;
        var s_width = width / 3;

        var margin = { left: 60, right: 20, top: 40, bottom: 60 }

        //groupby function made by Keshav Dasu (you mentioned we could use this in lecture)
        function groupBy(objectArray, property) {
          return objectArray.reduce(function (acc, obj) {
            let key = obj[property]
            if (!acc[key]) {
              acc[key] = []
            }
            acc[key].push(obj)
            return acc
          }, {})
        }

        var groupByYear = groupBy(csv, "Year");
        var groupByYear_multi = groupBy(data, "year")
        var groupByMonth = groupBy(csv, "Month")




        //------------------------------------------------------------------------------------
        //formatted data for leftmost histogram
        let formattedData = [];
        Object.keys(groupByYear).forEach(d => {
          let initialValue = 0;
          let count = groupByYear[d].reduce((acc, curvalue) => acc + 1, initialValue);


          let processedObj = {
            year: d,
            count: count
          }
          formattedData.push(processedObj);
        });

        //------------------------------------------------------------------------------------
        //formatted data for rightmost linechart
        let formatted_months = [];
        Object.keys(groupByMonth).forEach(d => {
          let initialValue = 0;
          let count = groupByMonth[d].reduce((acc, curvalue) => acc + 1, initialValue);


          let processedObj = {
            month: d,
            count: count
          }
          formatted_months.push(processedObj);
        });

        formattedData.sort(function (a, b) {
          if (a.year < b.year) { return -1; }
          if (a.year > b.year) { return 1; }
          return 0;
        })

        var svg = d3.select('#container')
          .append('svg')
          .attr('width', width + 7 * margin.left + 7 * margin.right)
          .attr('height', 2 * height + 3 * margin.top + 3 * margin.bottom)


        var hist_by_year = svg.append("g")
          .attr("transform", `translate(${margin.left},${margin.top + margin.bottom})`);

        hist_by_year.append('text')
          .attr('x', (s_width / 2))
          .attr('y', 0)
          .attr('text-anchor', 'middle')
          .style('font-size', '16px')
          .style('text-decoration', 'underline')
          .text('Number of Ballot Measures Per Year in San Francisco')

        let middle = 2 * margin.left + 2 * margin.right + s_width;


        //6 scatter plots for multicharts
        var multiples = svg.append("g")
          .attr("transform", `translate(${middle - margin.right},${margin.top + height / 2})`)

        multiples.append('text')
          .attr('text-anchor', 'middle')
          .text('Small Multiples: All Ballot Measures For Specific Years by No Votes For Each Measure')
          .attr('x', 5 * margin.left + 2 * margin.right)
          .attr('y', -margin.top)
          .style('text-decoration', 'underline')

        multiples.append('text')
          .attr('text-anchor', 'middle')
          .text('Total Ballots For Specific Year')
          .attr('x', 5 * margin.left + 2 * margin.right)
          .attr('y', height + 2*margin.bottom - margin.top)

        multiples.append('text')
          .attr('text-anchor', 'middle')
          .text('No Votes For Ballot')
          .attr("transform", "rotate(-90)")
          .attr('x', -height/2)
          .attr('y', -margin.left)

        var hist_1 = multiples.append("g")

        let pos_upper_right = s_width / 2 + margin.right

        var hist_2 = multiples.append("g")
          .attr("transform", `translate(${pos_upper_right},0)`);

        let pos_middle_y = height / 3;

        var hist_3 = multiples.append("g")
          .attr("transform", `translate(0,${pos_middle_y})`);

        var hist_4 = multiples.append("g")
          .attr("transform", `translate(${pos_upper_right},${pos_middle_y})`);

        let pos_bottom_y = 2 * pos_middle_y + margin.top;

        var hist_5 = multiples.append("g")
          .attr("transform", `translate(0,${pos_bottom_y})`);

        var hist_6 = multiples.append("g")
          .attr("transform", `translate(${pos_upper_right},${pos_bottom_y})`);

        let far_right = 2 * s_width + 2 * margin.left + 2 * margin.right;

        //------------------------------------------------------------------------------------
        //group object for line chart
        var lineChart = svg.append("g")
          .attr("transform", `translate(${far_right - margin.right},${margin.top + margin.bottom})`);

        //scale for distribution of yes scores
        var x_yes_dist = d3.scaleLinear()
          .domain([1961, 2010])
          .range([0, s_width - margin.right]);

        var y_yes_dist = d3.scaleLinear()
          .domain([0, 40])
          .range([height, 0]);

        /*Axes for small multiples*/

        //------------------------------------------------upper left------------------------------------------------
        var x_1 = d3.scaleLinear()
          .domain([0, groupByYear_multi[1972].length])
          .range([0, width / 6]);

        var y_1 = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.yes)])
          .range([height, 2 * height / 3]);

        //------------------------------------------------upper right------------------------------------------------
        var x_2 = d3.scaleLinear()
          .domain([0, groupByYear_multi[2010].length])
          .range([0, width / 6]);

        var y_2 = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.yes)])
          .range([height, 2 * height / 3]);

        //------------------------------------------------middle left------------------------------------------------
        var x_3 = d3.scaleLinear()
          .domain([0, groupByYear_multi[1970].length])
          .range([0, width / 6]);

        var y_3 = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.yes)])
          .range([height, 2 * height / 3]);

        //------------------------------------------------middle right------------------------------------------------
        var x_4 = d3.scaleLinear()
          .domain([0, groupByYear_multi[1975].length])
          .range([0, width / 6]);

        var y_4 = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.yes)])
          .range([height, 2 * height / 3]);

        //------------------------------------------------lower left------------------------------------------------
        var x_5 = d3.scaleLinear()
          .domain([0, groupByYear_multi[1988].length])
          .range([0, width / 6]);

        var y_5 = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.yes)])
          .range([height, 2 * height / 3]);

        //------------------------------------------------lower right------------------------------------------------
        var x_6 = d3.scaleLinear()
          .domain([0, groupByYear_multi[2008].length])
          .range([0, width / 6]);

        var y_6 = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.yes)])
          .range([height, 2 * height / 3]);


        //------------------------------------------------------------------------------------------------
        var month = d3.scaleBand()
          .domain(formatted_months.map(d => d.month))
          .range([0, s_width])

        var no_votes = d3.scaleLinear()
          .domain([0, d3.max(formatted_months, d => d.count)])
          .range([height, 0])


        //------------------------------------------------------------------------------------------------
        //legend for multiples
        const colorScale = d3.scaleOrdinal()
          .domain(["1972", "2010", "1970", "1975", "1988", "2008"])
          .range(["darkblue", "green", "orange", "purple", "red", "pink"])

        var legend = svg.append("g")
          .attr("transform", `translate(${width / 2},${margin.top + margin.bottom})`);


        var circles = legend.selectAll('circle')
          .data(colorScale.domain())
          .join('circle')
          .attr('r', 12)
          .attr('fill', d => { return colorScale(d) })
          .attr('cx', (d, i) => i * 4 * (margin.right))
          .attr('cy', 0)



        legend.append('text')
          .attr('text-anchor', 'middle')
          .text('1972')
          .attr('x', 0)
          .attr('y', margin.top)

        legend.append('text')
          .attr('text-anchor', 'middle')
          .text('2010')
          .attr('x', 4 * (margin.right))
          .attr('y', margin.top)

        legend.append('text')
          .attr('text-anchor', 'middle')
          .text('1970')
          .attr('x', 8 * (margin.right))
          .attr('y', margin.top)

        legend.append('text')
          .attr('text-anchor', 'middle')
          .text('1975')
          .attr('x', 12 * (margin.right))
          .attr('y', margin.top)

        legend.append('text')
          .attr('text-anchor', 'middle')
          .text('1988')
          .attr('x', 16 * (margin.right))
          .attr('y', margin.top)

        legend.append('text')
          .attr('text-anchor', 'middle')
          .text('2008')
          .attr('x', 20 * (margin.right))
          .attr('y', margin.top)








        var g_hist = hist_by_year.selectAll('rect')
          .data(formattedData)
          .join('rect')
          .attr('width', (s_width - margin.right) / formattedData.length)
          .attr('height', d => {
            return (height - y_yes_dist(d.count));
          })
          .attr('fill', 'steelblue')
          .attr('x', d => x_yes_dist(d.year))
          .attr('y', d => y_yes_dist(d.count))



        //----------------------------------------------------------------------
        var upper_left = hist_1.selectAll('circle')
          .data(groupByYear_multi[1972])
          .join('circle')
          .attr('r', 5)
          .attr('fill', 'darkblue')
          .attr('cx', (d, i) => {
            return ((width / 6) / groupByYear[1972].length + i * (width / 6) / groupByYear[1972].length);
          })
          .attr('cy', d => height - y_1(d3.max(data, d => d.yes) - d.yes))
          .attr('stroke', 'gray')
        //----------------------------------------------------------------------
        var upper_right = hist_2.selectAll('circle')
          .data(groupByYear_multi[2010])
          .join('circle')
          .attr('r', 5)
          .attr('fill', 'green')
          .attr('cx', function (d, i) { return (margin.left + (width / 6) / groupByYear[2010].length + i * (width / 6) / groupByYear[2010].length) })
          .attr('cy', d => height - y_2(d3.max(data, d => d.yes) - d.yes))
        //----------------------------------------------------------------------
        console.log("1970", groupByYear_multi[1970])
        var middle_left = hist_3.selectAll('circle')
          .data(groupByYear_multi[1970])
          .join('circle')
          .attr('r', 5)
          .attr('fill', 'orange')
          .attr('cx', (d, i) => {
            return ((width / 6) / groupByYear[1970].length + i * (width / 6) / groupByYear[1970].length);
          })
          .attr('cy', d => height - y_3(d3.max(data, d => d.yes) - d.yes))
        //----------------------------------------------------------------------
        var middle_right = hist_4.selectAll('circle')
          .data(groupByYear_multi[1975])
          .join('circle')
          .attr('r', 5)
          .attr('fill', 'purple')
          .attr('cx', (d, i) => {
            return (margin.left + (width / 6) / groupByYear[1975].length + i * (width / 6) / groupByYear[1975].length);
          })
          .attr('cy', d => height - y_4(d3.max(data, d => d.yes) - d.yes))
        //----------------------------------------------------------------------
        var bot_left = hist_5.selectAll('circle')
          .data(groupByYear_multi[1988])
          .join('circle')
          .attr('r', 5)
          .attr('fill', 'red')
          .attr('cx', (d, i) => {
            return ((width / 6) / groupByYear[1988].length + i * (width / 6) / groupByYear[1988].length);
          })
          .attr('cy', d => height - y_5(d3.max(data, d => d.yes) - d.yes))
        //----------------------------------------------------------------------
        var bot_right = hist_6.selectAll('circle')
          .data(groupByYear_multi[2008])
          .join('circle')
          .attr('r', 5)
          .attr('fill', 'pink')
          .attr('cx', (d, i) => {
            return (margin.left + (width / 6) / groupByYear[2008].length + i * (width / 6) / groupByYear[2008].length);
          })
          .attr('cy', d => height - y_6(d3.max(data, d => d.yes) - d.yes))
        //----------------------------------------------------------------------
        var dots = lineChart.selectAll('circle')
          .data(formatted_months)
          .join('circle')
          .attr('r', 5)
          .attr('fill', 'silver')
          .attr('cx', d => month(d.month))
          .attr('cy', d => no_votes(d.count))
          .attr("transform", (d, i) => `translate(${margin.right + 3 * margin.left}, 0)`)

        var lines = lineChart
          .append('path')
          .datum(formatted_months)
          .attr('fill', 'none')
          .attr("stroke", "silver")
          .attr('stroke-width', 1.5)
          .attr('d', line()
            .x(function (d) { return month(d.month) })
            .y(function (d) { return no_votes(d.count) }))
          .attr("transform", (d, i) => `translate(${margin.right + 3 * margin.left}, 0)`)

        //axes for first 
        hist_1.append("g")
          .attr("transform", (d, i) => `translate(0, ${height / 3})`)
          .call(d3.axisBottom(x_1))

        hist_1.append("g")
          .attr("transform", (d, i) => `translate(0, ${-2 * height / 3})`)
          .call(d3.axisLeft(y_1).ticks(5))


        //----------------------------------------------------------------------
        hist_2.append("g")
          .attr("transform", (d, i) => `translate(${margin.left}, ${height / 3})`)
          .call(d3.axisBottom(x_2))

        hist_2.append("g")
          .attr("transform", (d, i) => `translate(${margin.left}, ${-2 * height / 3})`)
          .call(d3.axisLeft(y_2).ticks(5))
        //----------------------------------------------------------------------
        hist_3.append("g")
          .attr("transform", (d, i) => `translate(0, ${height / 3 - margin.top + margin.bottom})`)
          .call(d3.axisBottom(x_3))

        hist_3.append("g")
          .attr("transform", (d, i) => `translate(0, ${-2 * height / 3 - margin.top + margin.bottom})`)
          .call(d3.axisLeft(y_3).ticks(5))


        //----------------------------------------------------------------------
        hist_4.append("g")
          .attr("transform", (d, i) => `translate(${margin.left}, ${height / 3 - margin.top + margin.bottom})`)
          .call(d3.axisBottom(x_4))



        hist_4.append("g")
          .attr("transform", (d, i) => `translate(${margin.left}, ${-2 * height / 3 - margin.top + margin.bottom})`)
          .call(d3.axisLeft(y_4).ticks(5))

        //----------------------------------------------------------------------
        hist_5.append("g")
          .attr("transform", (d, i) => `translate(0, ${height / 3 + margin.bottom - margin.top - 20})`)
          .call(d3.axisBottom(x_5).ticks(7))


        hist_5.append("g")
          .attr("transform", (d, i) => `translate(0, ${-2 * height / 3 - margin.top + margin.bottom - 20})`)
          .call(d3.axisLeft(y_5).ticks(5))

        //----------------------------------------------------------------------
        hist_6.append("g")
          .attr("transform", (d, i) => `translate(${margin.left}, ${height / 3 - margin.top + margin.bottom - 20})`)
          .call(d3.axisBottom(x_6))

        hist_6.append("g")
          .attr("transform", (d, i) => `translate(${margin.left}, ${-2 * height / 3 - margin.top + margin.bottom - 20})`)
          .call(d3.axisLeft(y_6).ticks(5))


        //----------------------------------------------------------------------
        const axisTickFormatter = number => format('')(number)

        hist_by_year.append("g")
          .attr("transform", (d, i) => `translate(0, ${height})`)
          .call(d3.axisBottom(x_yes_dist).ticks(10).tickFormat(axisTickFormatter))

        hist_by_year.append('text')
          .attr('text-anchor', 'middle')
          .text('Year')
          .attr('x', s_width / 2)
          .attr('y', height + margin.top)

        // y axis
        hist_by_year.append("g")
          .call(d3.axisLeft(y_yes_dist))
          .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("x", - height / 2 + 20)
          .attr("y", -2.5 * margin.right)
          .attr("dy", "2em")
          .attr("text-anchor", "end")
          .text('Number of Ballots')


        lineChart.append("g")
          .attr("transform", (d, i) => `translate(${2 * margin.left + 2 * margin.right}, ${height})`)
          .call(d3.axisBottom(month))
          .attr("fill", "#000")
          .attr("x", 0)
          .attr('y', margin.bottom)
          .attr("dy", "2em")
          .append('text')
          .attr("x", s_width / 2)
          .attr("y", margin.top)
          .text('Month')


        lineChart.append("g")
          .attr("transform", (d, i) => `translate(${2 * margin.left + 2 * margin.right}, 0)`)
          .call(d3.axisLeft(no_votes))
          .append("text")
          .attr("fill", "#000")
          .attr("transform", "rotate(-90)")
          .attr("x", -s_width / 6 - margin.top)
          .attr("y", - margin.left + margin.right)
          .attr("dy", "0.71em")
          .attr("text-anchor", "end")
          .text('Number of Ballots Across All Years')








      });

  }

  render() {
    return <div id={"#" + this.props.id}></div>
  }
}

export default BarChart;