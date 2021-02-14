//References: https://observablehq.com/@d3/horizontal-bar-chart
//https://www.w3schools.com/jsref/event_onmouseover.asp

import * as d3 from "d3v4";
import varcsv from "../assets/bar.csv";
import { RadarChart } from "./radar";

export async function dawD3barchart() {
  var margin_radar = { top: 55, right: 50, bottom: 50, left: 50 };

  var margin = { top: 0, right: 60, bottom: 50, left: 70 },
    width = 900 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

  var colorArray = [
    "#66FF66",
    "#66FF66",
    "#66FF66",
    "#66FF66",
    "#66FF66",
    "#66FF66",
    "#66FF66",
    "#66FF66",
    "#66FF66",
    "#66FF66",
    "#66FF66",
    "#66FF66",
    "#66FF66",
    "#66FF66",
    "#66FF66",
  ];
  // append svg object
  var bar_svg = d3
    .select("#bar_chart_d3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Parse data
  d3.csv(varcsv, function (data) {
    // X axis
    var x = d3.scaleLinear().domain([0, 100]).range([0, width]);
    bar_svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(5))
      .selectAll("text")
      .attr("transform", "translate(5,0)rotate(-1)")
      .style("text-anchor", "end");

    bar_svg
      .append("text")
      .attr(
        "transform",
        "translate(" + width / 2 + " ," + (height + margin.top + 25) + ")"
      )
      .style("text-anchor", "middle")
      .text("Popularity");

    bar_svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -33)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Artists");
    // Y axis
    var y = d3
      .scaleBand()
      .range([0, height])
      .domain(
        data.map(function (d) {
          return d.artists;
        })
      )
      .padding(0.3);
    bar_svg.append("g").call(d3.axisLeft(y).tickFormat(() => ""));

    //Radar by bar
    function reRenderRadar() {
      RadarChart(
        "#radar_chart_d3_barchart",
        data.map((d) => {
          return {
            name: d.artists,
            axes: [
              { area: "energy", value: d.energy * 100 },
              { area: "liveliness", value: d.liveliness * 100 },
              { area: "explicit", value: d.explicit * 100 },
              { area: "danceability", value: d.danceability * 100 },
              { area: "instrumentalness", value: d.instrumentalness * 100 },
              { area: "speechiness", value: d.speechiness * 100 },
            ],
          };
        }),
        {
          w: 300,
          h: 200,
          margin: margin_radar,
          maxValue: 60,
          levels: 3,
          roundStrokes: true,
          color: d3.scaleOrdinal().range(colorArray),
          format: ".0f",
          legend: false,
          unit: "%",
        }
      );
    }
    reRenderRadar();
    bar_svg
      .selectAll("myRect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", x(0))
      .attr("y", function (d) {
        return y(d.artists);
      })
      .attr("width", function (d) {
        return x(d.popularity);
      })
      .attr("height", "10px")
      .style("fill", function (d, i) {
        return d3.color(colorArray[i]);
      })
      .style("fill-opacity", "1")
      .style("stroke", function (d, i) {
        return d3.color(colorArray[i]);
      })
      .style("skroke-width", "1px")
      .on("dblclick", function (d, i) {
        reRenderRadar();
      })
      
      //Hovering mode
      .on("mousemove", function (d, i) {
        d3.select(this).style("cursor", "pointer").style("fill-opacity", "0.5");
        d3
          .select("#tooltipTest")
          .classed("hidden", false)
          .style("left", d3.event.pageX - 25 + "px")
          .style(
            "top",
            d3.event.pageY - 75 + "px"
          ).html(`<span class='toolTitle'>${d.artists}</span>
                <br/>
                <span class='expanded'>
                  <span><b>Song </b>: ${d.song}</span>
                </span>
          `);
      })
      .on("mouseover", function (d, i) {
        d3.select(this).style("cursor", "pointer").style("fill-opacity", "0.5");
        d3.select("#tooltipTest").classed("hidden", false);
      })
      .on("mouseout", function (d, i) {
        d3.select(this)
          .style("cursor", "pointer")
          .style("fill", d3.color(colorArray[i]))
          .style("fill-opacity", "1");
        d3.select("#tooltipTest").classed("hidden", true);
      });

    bar_svg
      .selectAll(".points")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "points")
      .attr("x", x(0))
      .attr("y", function (d) {
        return y(d.artists);
      })
      .attr("dx", 10)
      .attr("dy", 8)
      .text((d) => d.artists)
      .style("fill", "#111")
      .style("text-anchor", "start")
      .style("font-size", "8")
      .style("font-weight", "bold");
  });
}
