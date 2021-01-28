import React, {Component} from 'react';
import legend from 'd3-svg-legend';
import * as d3 from "d3";

class FocusView extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
        d3.csv(this.props.data)
        .then(csv => {
        
        /********************************* 
        * Visualization codes start here
        * ********************************/
        
        const groupKey = "Year";
        const keys = ["Arrival", "Departure", "Domestic", "International"];
        const margin = ({top: 10, right: 10, bottom: 20, left: 40});
        const height = 300;
        const width = 500;

        // Select terminal
        var select = d3.select("#selectTerminal")
          .append("select")
          .on("change", changeTerminal);

        var options = select.selectAll('option')
          .data(["Terminal 1", "Terminal 2", "Terminal 3", 
          "Terminal 4", "Terminal 5", "Terminal 6", 
          "Terminal 7", "Terminal 8", "Imperial Terminal", 
          "Misc. Terminal", "Tom Bradley International Terminal"]);

        options
          .enter()
          .append("option")
          .attr("value", function(d) {return d;})
          .text(function(d) {return d;});

        // Define action on change
        function changeTerminal() {
          // Remove existing chart
          d3.select("#groupBar").selectAll("svg").remove();
          d3.select("#radarChart").selectAll("svg").remove();
          
          // Preprocessing 
          var years = {};
          
          csv.forEach(d => {
            if (d.Terminal == this.value) {
              var year = d.ReportPeriod.substr(6,4);
              var pc = parseInt(d.Passenger_Count)
              if(year in years){
                if (d.Arrival_Departure == "Arrival"){
                  years[year].Arrival += pc;
                } else {
                  years[year].Departure += pc;
                }
                if (d.Domestic_International == "Domestic"){
                  years[year].Domestic += pc;
                } else {
                  years[year].International += pc;
                }
              }else{
                var Year = {
                  Year: year,
                  Arrival: 0,
                  Departure: 0,
                  Domestic: 0,
                  International: 0,
                }
                if (d.Arrival_Departure == "Arrival"){
                  Year.Arrival += pc;
                } else {
                  Year.Departure += pc;
                }
                if (d.Domestic_International == "Domestic"){
                  Year.Domestic += pc;
                } else {
                  Year.International += pc;
                }
                years[year] = Year;
              }
            }
          });

          const chartdata = []
          Object.keys(years).forEach(d => {
            chartdata.push(years[d])
          })
          
          // Sort by year
          chartdata.sort(function(a, b){
              if(a.Year < b.Year) { return -1; }
              if(a.Year > b.Year) { return 1; }
              return 0;
          })        

          var x0 = d3.scaleBand()
            .domain(chartdata.map(d => d[groupKey]))
            .rangeRound([margin.left, width - margin.right])
            .paddingInner(0.1);
  
          var x1 = d3.scaleBand()
            .domain(keys)
            .rangeRound([0, x0.bandwidth()])
            .padding(0.05);
  
          var y = d3.scaleLinear()
            .domain([0, d3.max(chartdata, d => d3.max(keys, key => d[key]))]).nice()
            .rangeRound([height - margin.bottom, margin.top]);
  
          const color = d3.scaleOrdinal()
            .range(["#ff9999", "#505050","#00cc66", "#00BFFF"]);
          
          var xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x0).tickSizeOuter(0))
            .call(g => g.select(".domain").remove())
  
          var yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, "s"))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 3)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text(chartdata.y))

          // Draw group bar
          var svg = d3.select("#groupBar")
            .append("svg")
            .attr("viewBox", [-10, -10, width + 25, height + 25]);

          svg.append("g")
            .selectAll("g")
            .data(chartdata)
            .join("g")
              .attr("transform", d => `translate(${x0(d[groupKey])},0)`)
            .selectAll("rect")
            .data(d => keys.map(key => ({key, value: d[key]})))
            .join("rect")
              .attr("x", d => x1(d.key))
              .attr("y", d => y(d.value))
              .attr("width", x1.bandwidth())
              .attr("height", d => y(0) - y(d.value))
              .attr("fill", d => color(d.key));

          svg.append("g")
              .call(xAxis);

          svg.append("g")
              .call(yAxis);

          // x label
          svg.select("g").append("text")             
            .attr("transform", `translate(${(width/2)}, ${(height + margin.top+5)})`)
            .style("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .text("Year");

          // y label
          svg.select("g").append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left +27)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Passenger Count");
              
          // Legend
          var svg_l = d3.select("#groupBar")
            .append("svg")
            .attr("viewBox", [0, 8, 100, 200]);

          var colorLegend = legend.legendColor()
              .scale(color)
              .shapeWidth(2.5)
              .shapeHeight(2.5)
              .labels(["Arrival", "Departure", "Domestic", "International"])
              .orient("horizontal")
              .shapePadding(20);


          svg_l.append("g")
              .attr("class", "legend_Color")
              .style('font-size', 2)
              .style('font-family', 'sans-serif')
              .attr("transform", "translate(10,10)");
                     
          svg_l.select(".legend_Color")
              .call(colorLegend); 

          svg_l.selectAll("g").selectAll("g").selectAll("g")
              .selectAll("text")
              .attr("transform", "translate(9.5, 2)");
          
          /*****************************
           * Start drawing Radar chart 
           ****************************/

          // Preprocess data
          var cumData = {
            Arrival: 0,
            Departure: 0,
            Domestic: 0,
            International: 0
          };

          chartdata.forEach(d => {
            cumData.Arrival += d.Arrival;
            cumData.Departure += d.Departure;
            cumData.Domestic += d.Domestic;
            cumData.International += d.International;
          });

          // Get maximum # of passenger for scaling
          const maxCnt = Math.max(cumData.Arrival, cumData.Departure, cumData.Domestic, cumData.International);

          // Radius of radar chart
          const r = 100;
          const r_margin = { left: 30, top: 30, right: 30, bottom: 30 };

          // Create svg
          const r_svg = d3.select("#radarChart")
            .append("svg")
            .attr('viewBox',
              `-${r_margin.left},
              -${r_margin.top},
              ${r * 2 + r_margin.left + r_margin.right},
              ${r * 2 + r_margin.bottom + r_margin.top}`)
          
          const dimensions = ['Arrival', 'Departure', 'Domestic', 'International']
          
          // Line generator for radial lines
          const radialLine = d3.lineRadial()
          
          // Radar chart is a circle, the length of each axis is the radius of the circle
          // Mapping 0 - maxCnt to 0 - r
          const yScale = d3.scaleLinear()
            .range([0, r])
            .domain([0, maxCnt])
          
          // Tick marks
          var tickUnit = maxCnt / 5;
          const ticks = [tickUnit, tickUnit*2, tickUnit*3, tickUnit*4, tickUnit*5];

          // One axis for each dimension
          dimensions.forEach((dimension, i) => {
            // First build an axis at the origin, enclosed inside an "g" element
            // then transform it to the right position and right orientation
            const g = r_svg.append('g')
              .attr('transform', `translate(${r}, ${r}) rotate(${i * 90})`)

            // Combining a left oriented axis with a right oriented axis
            // to make an axis with tick marks on both side
            // Reminded that, these are "g" elements inside the outer "g" element
            // and will be transformed to the right position with its parent element
            g.append('g')
              .call(d3.axisLeft(yScale).tickFormat('').tickValues(ticks))
            g.append('g')
              .call(d3.axisRight(yScale).tickFormat('').tickValues(ticks))

            // Add a text label for each axis, put it at the edge
            // Again, this "text" element is inside the outer "g" element,
            // and will be transformed to the right position with its parent element
            g.append('text')
              .text(dimension)
              .attr('text-anchor', 'middle')
              .attr('transform', `translate(0, -${r + 10})`)
          })
          
          // Line for the cumulative passenger count
          r_svg.append('g')
            .selectAll('path')
            .data([cumData])
            .enter()
            .append('path')
              .attr('d', d =>
                radialLine([
                  d.Arrival,
                  d.Departure,
                  d.Domestic,
                  d.International,
                  d.Arrival // Arrival again to close the loop
                ].map((v, i) => [Math.PI * 2 * i / 4 /* radian */, yScale(v) /* distance from the origin */])) 
              )
              // Move to the center
              .attr('transform', `translate(${r}, ${r})`)
              .attr('stroke', 'SteelBlue')
              .attr('stroke-width', 5)
              .attr('fill', 'rgba(70, 130, 180, 0.3)')
          
          var _ = require('lodash');

          // Gird lines for references
          r_svg.append('g')
            .selectAll('path')
            .data(ticks)
            .enter()
            .append('path')
              .attr('d', d => radialLine(_.range(5).map((v, i) => [Math.PI * 2 * i / 4, yScale(d)])))
              .attr('transform', `translate(${r}, ${r})`)
              .attr('stroke', 'grey')
              .attr('opacity', 0.5)
              .attr('fill', 'none')
        }
        
     });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default FocusView;