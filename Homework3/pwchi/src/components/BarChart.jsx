import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const margin = {
  top: 20,
  right: 50,
  bottom: 80,
  left: 50,
};
const defaults = {
  width: 1200,
  height: 700,
  maxBandWidth: 70,
};

function BarChart({ data, xAxisName, fineSelect, topK, yearRange, ...rest }) {
  const ref = useRef();
  const brushRef = useRef();

  const width = rest.width || defaults.width;
  const height = rest.height || defaults.height;
  const focusHeight = 100;

  useEffect(() => {
    const filteredData = getFilteredData(data, {
      xAxisName,
      fineSelect,
      topK,
      yearRange,
    });

    // D3
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Brush
    {
      const brushBandWidth = innerWidth / filteredData.length;
      const defaultSelection = [
        margin.left,
        filteredData.length <= 10 ? width : margin.left + 0.3 * innerWidth, // render 10% of data
      ];

      const brushSvg = d3.select(brushRef.current);
      const brushBarY = d3
        .scaleLog()
        .domain([1, d3.max(filteredData.map((d) => d.count))])
        .range([focusHeight, 0]);

      brushSvg
        .selectAll("rect")
        .data(filteredData, (d) => d)
        .join(
          (enter) =>
            enter
              .append("rect")
              .attr("fill", "#7600C4")
              .attr("opacity", ".5")
              .attr("x", (d, idx) => margin.left + idx * brushBandWidth - 1)
              .attr("y", (d) => brushBarY(d.count))
              .attr("width", brushBandWidth)
              .attr("height", (d) => brushBarY(1) - brushBarY(d.count)),
          (update) =>
            update
              .attr("x", (d, idx) => margin.left + idx * brushBandWidth - 1)
              .attr("width", brushBandWidth),
          (exit) => exit.call((exit) => exit.remove())
        );
      if (filteredData.length === 0) return;

      const brush = d3
        .brushX()
        .extent([
          [margin.left, 1],
          [width - margin.right, focusHeight + 0.5],
        ])
        .on("brush", brushed)
        .on("end", brushended);

      brushSvg.select("#brush-group").remove();
      const brushGroup = brushSvg
        .append("g")
        .attr("id", "brush-group")
        .call(brush)
        .call(brush.move, defaultSelection);
      brushSvg.select(".overlay").attr("fill", "rgba(0, 0, 0, 0)");

      function brushed({ selection }) {
        if (selection) {
          const leftIdx = Math.floor(
            (selection[0] - margin.left) / brushBandWidth
          );
          const rightIdx = Math.floor(
            (selection[1] - margin.left) / brushBandWidth
          );

          const barChartData = filteredData.filter(
            (ele, idx) => leftIdx <= idx && idx <= rightIdx
          );
          drawBarChart(barChartData);
        }
      }

      function brushended({ selection }) {
        if (!selection) {
          brushGroup.call(brush.move, defaultSelection);
        }
      }
    }

    // Bar Chart
    function drawBarChart(barChartData) {
      const svg = d3.select(ref.current);
      const t = svg.transition().duration(1500);
      const fullExpandBandWidth = innerWidth / barChartData.length;
      const bandWidth =
        fullExpandBandWidth < defaults.maxBandWidth
          ? fullExpandBandWidth
          : defaults.maxBandWidth;

      const x = d3
        .scaleBand()
        .domain(barChartData.map((d) => d[xAxisName]))
        .rangeRound([
          margin.left,
          margin.left + bandWidth * barChartData.length,
        ]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(filteredData.map((d) => d.count))])
        .rangeRound([margin.top + innerHeight, margin.top]);

      // const xAxis = (g) =>
      //   g
      //     .attr("transform", `translate(0,${margin.top + innerHeight})`)
      //     .call(d3.axisBottom(x))
      //     .select(".domain")
      //     .remove();

      const yAxis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y))
          .select(".domain")
          .remove();

      const bars = svg
        .selectAll("rect")
        .data(barChartData, (d) => d)
        .join(
          (enter) =>
            enter
              .append("rect")
              .style("mix-blend-mode", "multiply")
              .attr("fill", "#7600C4")
              .attr("opacity", "1.0")
              .attr("x", innerWidth + margin.right)
              .attr("y", (d) => y(d.count))
              .attr("width", bandWidth - 1)
              .attr("height", (d) => y(0) - y(d.count))
              .call((enter) =>
                enter.transition(t).attr("x", (d) => x(d[xAxisName]))
              ),
          (update) =>
            update.attr("width", bandWidth - 1).call((update) =>
              update
                .transition(t)
                .attr("x", (d) => x(d[xAxisName]))
                .attr("y", (d) => y(d.count))
                .attr("height", (d) => y(0) - y(d.count))
            ),
          (exit) =>
            exit.call((exit) =>
              exit
                .transition(t)
                .attr("fill", "tomato")
                .attr("width", 0)
                .attr("height", 0)
                .remove()
            )
        );

      bars
        .on("mouseenter", (event, d) => {
          d3.select(event.currentTarget).attr("opacity", ".5");
          svg
            .append("text")
            .attr("id", "tooltip")
            .attr("x", x(d[xAxisName]) + bandWidth)
            .attr("y", y(d.count))
            .attr("dy", "-.35em")
            .attr("font-size", 20)
            .text(`${xAxisName}: ` + d[xAxisName] + " / Count: " + d.count);
        })
        .on("mouseout mouseleave", (event) => {
          d3.select(event.currentTarget).attr("opacity", "1.0");
          svg.select("#tooltip").remove();
        });

      svg.select("#x-axis-label").remove();
      svg
        .append("text")
        .attr("id", "x-axis-label")
        .attr(
          "transform",
          "translate(" +
            (innerWidth / 2 + margin.left) +
            " ," +
            (innerHeight + margin.top + 40) +
            ")"
        )
        .attr("fill", "#737373")
        .attr("font-family", "sans-serif")
        .attr("font-size", 25)
        .attr("text-anchor", "middle")
        .text(xAxisName);

      svg.select("#y-axis").remove();
      svg
        .append("g")
        .attr("id", "y-axis")
        .call(yAxis)
        .call((g) =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("text-anchor", "end")
            .attr("font-size", 25)
            .attr("x", margin.top)
            .attr("y", -margin.left - 5)
            .attr("transform", `rotate(-90)`)
            .text("Row Count")
        );
    }
  }, [width, height, data, xAxisName, fineSelect, topK, yearRange]);

  return (
    <div style={{ zIndex: 2, backgroundColor: "white" }}>
      <div>Bar Chart</div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`}></g>
      </svg>
      <svg
        viewBox={`0 0 ${width} ${focusHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <g ref={brushRef} transform={`translate(${margin.left}, 0)`}></g>
      </svg>
    </div>
  );
}

const getFilteredData = (data, constraints) => {
  const { xAxisName, fineSelect, topK, yearRange } = constraints;
  return (
    fineSelect.options
      // if no fine selections, every d passes
      // if fine selections exist, return the relevant data
      .filter(
        (d) => fineSelect.value.length === 0 || fineSelect.value.includes(d)
      )
      .map((d) => ({
        [xAxisName]: d,
        count: data.filter(
          (ele) =>
            yearRange[0] <= ele["Release Year"] &&
            ele["Release Year"] <= yearRange[1] &&
            ele[xAxisName] === d
        ).length,
      }))
      .sort((a, b) => {
        var A = a.count;
        var B = b.count;
        if (A < B) {
          return 1;
        }
        if (A > B) {
          return -1;
        }

        return 0; // if equal
      })
      .slice(0, topK)
  );
};

export default React.memo(BarChart);
