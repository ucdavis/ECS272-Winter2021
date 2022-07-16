import React, {Component} from 'react';
import legend from 'd3-svg-legend';
import * as d3 from "d3";

class ContextView extends Component{

    componentDidMount(){
        this.drawChart();
    }

    drawChart(){
      d3.csv(this.props.data)
      .then(csv => {      

        // Preprocessing
        var years = {};

        csv.forEach(d => {
          var yearMonth = d.ReportPeriod.substr(6,4) + "/" + d.ReportPeriod.substr(0,2);
          var pc = parseInt(d.Passenger_Count)
          if(yearMonth in years){
            if (d.Terminal == "Terminal 1"){
              years[yearMonth].Terminal_1 += pc;
            } else if(d.Terminal == "Terminal 2"){
              years[yearMonth].Terminal_2 += pc;
            } else if(d.Terminal == "Terminal 3"){
              years[yearMonth].Terminal_3 += pc;
            } else if(d.Terminal == "Terminal 4"){
              years[yearMonth].Terminal_4 += pc;
            } else if(d.Terminal == "Terminal 5"){
              years[yearMonth].Terminal_5 += pc;
            } else if(d.Terminal == "Terminal 6"){
              years[yearMonth].Terminal_6 += pc;
            } else if(d.Terminal == "Terminal 7"){
              years[yearMonth].Terminal_7 += pc;
            } else if(d.Terminal == "Terminal 8"){
              years[yearMonth].Terminal_8 += pc;
            } else if(d.Terminal == "Imperial Terminal"){
              years[yearMonth].Imperial_Terminal += pc;
            } else if(d.Terminal == "Misc. Terminal"){
              years[yearMonth].Misc_Terminal += pc;
            } else if(d.Terminal == "Tom Bradley International Terminal"){
              years[yearMonth].TB_Int_Terminal += pc;
            }
          }else{
            var year = {
              Year: yearMonth,
              Terminal_1: 0,
              Terminal_2: 0,
              Terminal_3: 0,
              Terminal_4: 0,
              Terminal_5: 0,
              Terminal_6: 0,
              Terminal_7: 0,
              Terminal_8: 0,
              Imperial_Terminal: 0,
              Misc_Terminal: 0,
              TB_Int_Terminal: 0
            }
            if (d.Terminal == "Terminal 1"){
              year.Terminal_1 = pc;
            } else if(d.Terminal == "Terminal 2"){
              year.Terminal_2 = pc;
            } else if(d.Terminal == "Terminal 3"){
              year.Terminal_3 = pc;
            } else if(d.Terminal == "Terminal 4"){
              year.Terminal_4 = pc;
            } else if(d.Terminal == "Terminal 5"){
              year.Terminal_5 = pc;
            } else if(d.Terminal == "Terminal 6"){
              year.Terminal_6 = pc;
            } else if(d.Terminal == "Terminal 7"){
              year.Terminal_7 = pc;
            } else if(d.Terminal == "Terminal 8"){
              year.Terminal_8 = pc;
            } else if(d.Terminal == "Imperial Terminal"){
              year.Imperial_Terminal = pc;
            } else if(d.Terminal == "Misc. Terminal"){
              year.Misc_Terminal = pc;
            } else if(d.Terminal == "Tom Bradley International Terminal"){
              year.TB_Int_Terminal = pc;
            }
            years[yearMonth] = year;
          }
        })

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

        console.log(chartdata);

        /*****************
         * Define Function
         *****************/

        function re_rendering(keys, lgd_keys) {
          var series = d3.stack()
          .keys(keys)
          (chartdata).map(d => (d.forEach(v => v.key = d.key), d));

          console.log(series);

          /********************************* 
          * Repeatitive visualization codes start here
          * ********************************/    
          
          // size of stacked bar
          const height = 250;
          const width = 1000;

          const color = d3.scaleOrdinal()
          .domain(series.map(d => d.key))
          .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), series.length).reverse())
          .unknown("#ccc")

          // Legend
          var svg_l = d3.select("#stk_legend")
            .append("svg")
            .attr("viewBox", [20, 10, 120, 200]);

          var colorLegend = legend.legendColor()
              .scale(color)
              .labels(lgd_keys);

          svg_l.append("g")
              .attr("class", "legend_Color")
              .style('font-size', 12)
              .style('font-family', 'sans-serif')
              .attr("transform", "translate(20,20)");
            
            
          svg_l.select(".legend_Color")
              .call(colorLegend);

          // Stacked bar
          const svg = d3.select("#stkBar")
            .append("svg")
            .attr("viewBox", [-30, 0, width+50, height +30]);

          const margin = ({top: 10, right: 10, bottom: 20, left: 30})
          
          // Scale
          const x = d3.scaleBand()
            .domain(chartdata.map(d => d.Year))
            .range([30, width - margin.right])
            .padding(0.3)
          const y = d3.scaleLinear()
            .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
            .rangeRound([height - margin.bottom, margin.top])
          
          // Add bars
          svg.append("g")
            .selectAll("g")
            .data(series)
            .join("g")
              .attr("fill", d => color(d.key))
            .selectAll("rect")
            .data(d => d)
            .join("rect")
              .attr("x", (d, i) => x(d.data.Year))
              .attr("y", d => y(d[1]))
              .attr("height", d => y(d[0]) - y(d[1]))
              .attr("width", x.bandwidth())
        
          // Draw axis
          const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(x => {if (x.substr(5,2) == "01") return x.substr(0,4); else return "";}))
            .call(g => g.selectAll(".domain").remove())
          const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, "s"))
            .call(g => g.selectAll(".domain").remove())
          
          svg.append("g")
            .call(xAxis);
          svg.append("g")
            .call(yAxis);
          
          // x label
          svg.select("g").append("text")             
            .attr("transform", `translate(${(width/2)}, ${(height + margin.top + 3)})`)
            .style("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .text("Year");

          // y label
          svg.select("g").append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left -20)
            .attr("x", 0 - (height / 2))
            .attr("dy", "3em")
            .style("text-anchor", "middle")
            .text("Passenger Count");
          
          // Title
          svg.append("text")
            .attr("transform", `translate(${(width + margin.left + margin.right)/2},20)`)
            .style("text-anchor", "middle")
            .style("font-weight", 700)
            .text("LAX passenger traffic over years");
          }

        /***********
         * On check
         **********/
        
        // Get values from checkboxes
        d3.selectAll("input[name='terminal']").on("click", function() {
          d3.selectAll("svg").remove();

          var keys = [];
          var lgd_keys = [];
          var check_count = document.getElementsByName("terminal").length;
  
          for (var i=0; i<check_count; i++) {
              if (document.getElementsByName("terminal")[i].checked == true) {
                  keys.push(document.getElementsByName("terminal")[i].value);
                  lgd_keys.push(document.getElementsByName("terminal")[i].value.replace(/_/gi," "));
              }
          }

          keys.sort(function(a, b){
            if(a.Year < b.Year) { return -1; }
            if(a.Year > b.Year) { return 1; }
            return 0;
          })        
          console.log(keys);

          // Re-render context view
          re_rendering(keys, lgd_keys);

          //end of onChange
        })

        console.log(chartdata);

        /********************************* 
        * Initial visualization codes start here
        * ********************************/  
       
        var series = d3.stack()
        .keys(["Terminal_1", "Terminal_2", "Terminal_3", 
        "Terminal_4", "Terminal_5", "Terminal_6", 
        "Terminal_7", "Terminal_8", "Imperial_Terminal", 
        "Misc_Terminal", "TB_Int_Terminal"])
        (chartdata).map(d => (d.forEach(v => v.key = d.key), d));

        console.log(series);
        
        // size of stacked bar
        const height = 250;
        const width = 1000;

        const color = d3.scaleOrdinal()
        .domain(series.map(d => d.key))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), series.length).reverse())
        .unknown("#ccc")

        // Legend
        var svg_l = d3.select("#stk_legend")
          .append("svg")
          .attr("viewBox", [20, 10, 120, 200]);

        var colorLegend = legend.legendColor()
            .scale(color)
            .labels(["Terminal 1", "Terminal 2", "Terminal 3", 
            "Terminal 4", "Terminal 5", "Terminal 6", 
            "Terminal 7", "Terminal 8", "Imperial Terminal", 
            "Misc Terminal", "TB Int Terminal"]);

        svg_l.append("g")
            .attr("class", "legend_Color")
            .style('font-size', 12)
            .style('font-family', 'sans-serif')
            .attr("transform", "translate(20,20)");
          
          
        svg_l.select(".legend_Color")
            .call(colorLegend);

        // Stacked bar
        const svg = d3.select("#stkBar")
          .append("svg")
          .attr("viewBox", [-30, 0, width+50, height +30]);

        const margin = ({top: 10, right: 10, bottom: 20, left: 30})
        
        // Scale
        const x = d3.scaleBand()
          .domain(chartdata.map(d => d.Year))
          .range([30, width - margin.right])
          .padding(0.3)
        const y = d3.scaleLinear()
          .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
          .rangeRound([height - margin.bottom, margin.top])
        
        // Add bars
        svg.append("g")
          .selectAll("g")
          .data(series)
          .join("g")
            .attr("fill", d => color(d.key))
          .selectAll("rect")
          .data(d => d)
          .join("rect")
            .attr("x", (d, i) => x(d.data.Year))
            .attr("y", d => y(d[1]))
            .attr("height", d => y(d[0]) - y(d[1]))
            .attr("width", x.bandwidth())
      
        // Draw axis
        const xAxis = g => g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(x => {if (x.substr(5,2) == "01") return x.substr(0,4); else return "";}))
          .call(g => g.selectAll(".domain").remove())
        const yAxis = g => g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).ticks(null, "s"))
          .call(g => g.selectAll(".domain").remove())
        
        svg.append("g")
          .call(xAxis);
        svg.append("g")
          .call(yAxis);
        
        // x label
        svg.select("g").append("text")             
          .attr("transform", `translate(${(width/2)}, ${(height + margin.top + 3)})`)
          .style("text-anchor", "middle")
          .style("font-family", "sans-serif")
          .text("Year");

        // y label
        svg.select("g").append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left -20)
          .attr("x", 0 - (height / 2))
          .attr("dy", "3em")
          .style("text-anchor", "middle")
          .text("Passenger Count");
        
        // Title
        svg.append("text")
          .attr("transform", `translate(${(width + margin.left + margin.right)/2},20)`)
          .style("text-anchor", "middle")
          .style("font-weight", 700)
          .text("LAX passenger traffic over years");

        //end of main function
     });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }
}

export default ContextView;