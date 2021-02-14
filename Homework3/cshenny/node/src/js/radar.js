//References: https://observablehq.com/@palewire/radar-chart, http://bl.ocks.org/mbostock/7555321
//https://www.w3schools.com/jsref/event_onmouseover.asp
//VisualCinnamon.com: Alangrafu and Nadieh Bremer --> inspired idea

import * as d3 from "d3v4";

const max = Math.max;
const sin = Math.sin;
const cos = Math.cos;
const HALF_PI = Math.PI / 2;

export const RadarChart = function RadarChart(parent_selector, data, options) {
  //wrap SVG text
  const wrap = (text, width) => {
    text.each(function () {
      var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.4,
        y = text.attr("y"),
        x = text.attr("x"),
        dy = parseFloat(text.attr("dy")),
        tspan = text
          .text(null)
          .append("tspan")
          .attr("x", x)
          .attr("y", y)
          .attr("dy", dy + "em");

      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      }
    });
  };

  const cfg = {
    w: 100, //width of circle
    h: 200, //height of circle
    margin: { top: 20, right: 20, bottom: 20, left: 10 }, //margins of SVG
    levels: 3, //levels or inner circles
    maxValue: 0, //value representing biggest circle
    labelFactor: 1.25, //label placement from radius
    wrapWidth: 60, //# of pixels after which a new line is given to label
    opacityArea: 0.35,
    dotRadius: 4,
    opacityCircles: 0.1,
    strokeWidth: 2,
    roundStrokes: false, //cardinal-closed
    color: d3.scaleOrdinal(d3.schemeCategory10), //color scheme
    format: ".2%",
    unit: "",
    legend: false,
  };

  //put all of the options into cfg
  if ("undefined" !== typeof options) {
    for (var i in options) {
      if ("undefined" !== typeof options[i]) {
        cfg[i] = options[i];
      }
    }
  }

  let maxValue = 100;
  maxValue = max(cfg.maxValue, maxValue);

  const allAxis = data[0].axes.map((i, j) => i.area),
    total = allAxis.length,
    radius = Math.min(cfg.w / 2, cfg.h / 2),
    Format = d3.format(cfg.format),
    angleSlice = (Math.PI * 2) / total;

  const rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

  const parent = d3.select(parent_selector);

  parent.select("svg").remove();
  let svg = parent
    .append("svg")
    .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
    .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
    .attr("class", "radar");

  let g = svg
    .append("g")
    .attr(
      "transform",
      "translate(" +
      (cfg.w / 2 + cfg.margin.left) +
      "," +
      (cfg.h / 2 + cfg.margin.top) +
      ")"
    );

  //filter for the outside glow
  let filter = g.append("defs").append("filter").attr("id", "glow"),
    feGaussianBlur = filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "coloredBlur"),
    feMerge = filter.append("feMerge"),
    feMergeNode_1 = feMerge.append("feMergeNode").attr("in", "coloredBlur"),
    feMergeNode_2 = feMerge.append("feMergeNode").attr("in", "SourceGraphic");

  //drawing the Circular grid
  svg
    .append("text")
    .attr("transform", "translate(55,25)")
    .style("text-anchor", "left")
    .style("font-weight", "bold")
    .text("Music Characteristics  by Decade");
  //Wrapper for the grid & axes
  let axisGrid = g.append("g").attr("class", "axisWrapper");

  //drawing the background circles
  axisGrid
    .selectAll(".levels")
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append("circle")
    .attr("class", "gridCircle")
    .attr("r", (d) => (radius / cfg.levels) * d)
    .style("fill", "#CDCDCD")
    .style("stroke", "#CDCDCD")
    .style("fill-opacity", cfg.opacityCircles)
    .style("filter", "url(#glow)");

  axisGrid
    .selectAll(".axisLabel")
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append("text")
    .attr("class", "axisLabel")
    .attr("x", 4)
    .attr("y", (d) => (-d * radius) / cfg.levels)
    .attr("dy", "0.4em")
    .style("font-size", "10px")
    .attr("fill", "#737373")
    .text((d) => Format((maxValue * d) / cfg.levels) + cfg.unit);

  //axis
  var axis = axisGrid
    .selectAll(".axis")
    .data(allAxis)
    .enter()
    .append("g")
    .attr("class", "axis");

  axis
    .append("line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr(
      "x2",
      (d, i) => rScale(maxValue * 1.1) * cos(angleSlice * i - HALF_PI)
    )
    .attr(
      "y2",
      (d, i) => rScale(maxValue * 1.1) * sin(angleSlice * i - HALF_PI)
    )
    .attr("class", "line")
    .style("stroke", "white")
    .style("stroke-width", "2px");

  function angleToCoordinate(angle, value) {
    let x = Math.cos(angle) * rScale(value);
    let y = Math.sin(angle) * rScale(value);
    return { x: x, y: y };
  }

  axis
    .append("text")
    .attr("class", "legend lolo")
    .style("font-size", "11px")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .attr(
      "x",
      (d, i) =>
        rScale(maxValue * cfg.labelFactor) * cos(angleSlice * i - HALF_PI)
    )
    .attr(
      "y",
      (d, i) =>
        rScale(maxValue * cfg.labelFactor) * sin(angleSlice * i - HALF_PI)
    )
    .text((d) => d)
    .call(wrap, cfg.wrapWidth)
    .attr("transform", "translate(0,-15)");

  //drawing the radar chart blobs
  const radarLine = d3
    .radialLine()
    .curve(d3.curveLinearClosed)
    .radius((d) => rScale(d.value))
    .angle((d, i) => i * angleSlice);

  if (cfg.roundStrokes) {
    radarLine.curve(d3.curveCardinalClosed);
  }

  //wrapper for the blobs
  const blobWrapper = g
    .selectAll(".radarWrapper")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "radarWrapper");

  //backgrounds
  blobWrapper
    .append("path")
    .attr("class", "radarArea")
    .attr("d", (d) => radarLine(d.axes))
    .style("fill", (d, i) => cfg.color(i))
    .style("fill-opacity", cfg.opacityArea)
    .on("mouseover", function (d, i) {
      //dim all blobs
      parent
        .selectAll(".radarArea")
        .transition()
        .duration(200)
        .style("fill-opacity", 0.1);
      //bring back the hovered over blob
      d3.select(this).transition().duration(200).style("fill-opacity", 0.7);
    })
    .on("mouseout", () => {
      //bring back all blobs
      parent
        .selectAll(".radarArea")
        .transition()
        .duration(200)
        .style("fill-opacity", cfg.opacityArea);
    });

  //outlines
  blobWrapper
    .append("path")
    .attr("class", "radarStroke")
    .attr("d", function (d, i) {
      return radarLine(d.axes);
    })
    .style("stroke-width", cfg.strokeWidth + "px")
    .style("stroke", (d, i) => cfg.color(i))
    .style("fill", "none")
    .style("filter", "url(#glow)");

  //append circles
  blobWrapper
    .selectAll(".radarCircle")
    .data((d) => d.axes)
    .enter()
    .append("circle")
    .attr("class", "radarCircle")
    .attr("r", cfg.dotRadius)
    .attr("cx", (d, i) => rScale(d.value) * cos(angleSlice * i - HALF_PI))
    .attr("cy", (d, i) => rScale(d.value) * sin(angleSlice * i - HALF_PI))
    .style("fill", (d) => cfg.color(d.id))
    .style("fill-opacity", 0.8)
    .style("stroke", "navy")
    .style("stroke-width", "1px")

    //Hovering mode
    .on("mouseover", function (d, i) {
      d3.select(this).attr("r", 10).style("cursor", "pointer");
      svg
        .append("circle")
        .attr("r", 11)
        .attr("class", "boxRadarLabel")
        .attr(
          "transform",
          "translate(" +
          (rScale(d.value) * cos(angleSlice * i - HALF_PI) + 200) +
          "," +
          (rScale(d.value) * sin(angleSlice * i - HALF_PI) + 120) +
          ")"
        )
        .style("fill", "#fff")
        .style("fill-opacity", "0.8");
      svg
        .append("text")
        .attr("class", "textRadarLabel")
        .text(Math.floor(d.value))
        .attr(
          "transform",
          "translate(" +
          (rScale(d.value) * cos(angleSlice * i - HALF_PI) + 191) +
          "," +
          (rScale(d.value) * sin(angleSlice * i - HALF_PI) + 125) +
          ")"
        );
    })
    .on("mouseout", function () {
      d3.select(this).attr("r", cfg.dotRadius).style("cursor", "default");
      svg.selectAll(".textRadarLabel").remove();
      svg.selectAll(".boxRadarLabel").remove();
    });

  const tooltip = g
    .append("text")
    .attr("class", "tooltip")
    .attr("x", 0)
    .attr("y", 0)
    .style("font-size", "12px")
    .style("display", "none")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em");

  if (cfg.legend !== false && typeof cfg.legend === "object") {
    let legendZone = svg.append("g");
    let names = data.map((el) => el.name);
    if (cfg.legend.title) {
      let title = legendZone
        .append("text")
        .attr("class", "title")
        .attr(
          "transform",
          `translate(${cfg.legend.translateX - 16},${cfg.legend.translateY - 20
          })`
        )
        .attr("x", cfg.w - 70)
        .attr("y", 10)
        .attr("font-size", "15px")
        .attr("font-weight", "bold")
        .attr("fill", "#404040")
        .text(cfg.legend.title);
    }
    let legend = legendZone
      .append("g")
      .attr("class", "legend")
      .attr("height", 100)
      .attr("width", 200)
      .attr(
        "transform",
        `translate(${cfg.legend.translateX - 20},${cfg.legend.translateY})`
      );

    legend
      .selectAll("rect")
      .data(names)
      .enter()
      .append("rect")
      .attr("x", cfg.w - 65)
      .attr("y", (d, i) => i * 20)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", (d, i) => cfg.color(i));

    legend
      .selectAll("text")
      .data(names)
      .enter()
      .append("text")
      .attr("x", cfg.w - 52)
      .attr("y", (d, i) => i * 20 + 9)
      .attr("font-size", "11px")
      .attr("fill", "#000000")
      .text((d) => d);
  }
  return svg;
};
