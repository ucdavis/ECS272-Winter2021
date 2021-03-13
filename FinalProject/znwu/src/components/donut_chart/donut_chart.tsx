import * as d3 from "d3";
import { schemeGnBu } from "d3";
import { useEffect, useRef } from "react";
import { victimTypeColor, victimTypes } from "../side_panel/side_panel";

export const DonutChart = (props: { data: { [key: string]: number } }) => {
  const ref = useRef(null);

  useEffect(() => {
    var width = 450;
    var height = 450;
    var margin = 20;

    var radius = Math.min(width, height) / 2 - margin;

    var svg = d3
      .select(ref.current)
      .append("svg")
      .attr("preserveAspectRatio", "xMidYMid")
      .attr("viewBox", "-100 0 " + (width + 200) + " " + height);
    //   .attr("width", width)
    //   .attr("height", height);

    var g = svg
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3
      .scaleOrdinal()
      .domain(Object.keys(props.data))
      .range(d3.schemeDark2);

    if (
      Object.keys(props.data).every((key) => victimTypes.indexOf(key) !== -1)
    ) {
      color = victimTypeColor;
    }

    var pie = d3
      .pie()
      //   .sort((a: any, b: any) => a.key.localCompare(b.key))
      .value(function (d) {
        return (d as any).value;
      });
    var data_ready = pie(
      Object.entries(props.data).map((entry) => ({
        key: entry[0],
        value: entry[1],
        valueOf: () => entry[1],
      }))
    );

    var arc = d3
      .arc()
      .innerRadius(radius * 0.5) // This is the size of the donut hole
      .outerRadius(radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    var outerArc = d3
      .arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    g.selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc as any)
      .attr("fill", function (d) {
        return color((d.data as any).key) as any;
      })
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.7);

    // Add the polylines between chart and labels:
    g.selectAll("allPolylines")
      .data(data_ready)
      .enter()
      .append("polyline")
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr("points", function (d: any) {
        var posA = arc.centroid(d); // line insertion in the slice
        var posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC] as any;
      });

    g.selectAll("allLabels")
      .data(data_ready)
      .enter()
      .append("text")
      .text(function (d: any) {
        return d.data.key + " " + d.data.value;
      })
      .attr("transform", function (d: any) {
        var pos = outerArc.centroid(d);
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return "translate(" + pos + ")";
      })
      .style("text-anchor", function (d) {
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? "start" : "end";
      });

    return function () {
      svg.remove();
    };
  }, [props]);
  return <div ref={ref} />;
};
