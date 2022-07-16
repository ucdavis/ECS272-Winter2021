import * as d3 from "d3";
import * as fc from "d3fc"

export function legendbar(){
    const domain = [0, 1000]
    const min = domain[0]
    const max = domain[1]
    const width = 30
    const height = 100
    var container= d3.select("#testmove")
    var color =  d3.scaleSequential(d3.interpolateOrRd).domain(domain)
     // Band scale for x-axis
    const xScale = d3
     .scaleBand()
     .domain([0, 1])
     .range([0, width]);
   
    // Linear scale for y-axis
    const yScale = d3
     .scaleLinear()
     .domain(domain)
     .range([height, 0]);



    // An array interpolated over our domain where height is the height of the bar
    const expandedDomain = d3.range(min, max, (max - min) / height);

    // Defining the legend bar
    const svgBar = fc
      .autoBandwidth(fc.seriesSvgBar())
      .xScale(xScale)
      .yScale(yScale)
      .crossValue(0)
      .baseValue((_, i) => (i > 0 ? expandedDomain[i - 1] : 0))
      .mainValue(d => d)
      .decorate(selection => {
        selection.selectAll("path").style("fill", d => color(d));
      });

    // Drawing the legend bar
    const legendSvg = container.append("svg").attr("width", 500).attr("height", 500);
    const legendBar = legendSvg
      .append("g")
      .datum(expandedDomain)
      .call(svgBar)
      .attr("transform", "translate(100," + 50 + ")");

      

      /*
    // Defining our label
    const axisLabel = fc
      .axisRight(yScale)
      .tickValues([...domain, (domain[1] + domain[0]) / 2]);

    // Drawing and translating the label
    const barWidth = Math.abs(legendBar.node().getBoundingClientRect().x);


    // Hiding the vertical line
    legendSvg.append("g")
      //.attr("transform", `translate(${barWidth})`)
      .attr("transform", "translate(" + (100+10)+ "," + 50 + ")")
      .datum(expandedDomain)
      .call(axisLabel)
      .select(".domain")
      .attr("visibility", "hidden");

      */

                  }




                  