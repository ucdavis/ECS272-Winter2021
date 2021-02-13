import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const margin = {
    top: 20,
    right: 50,
    bottom: 150,
    left: 50,
};
const defaults = {
    width: 1200,
    height: 800,
    bandwidth: 24,
};

function BarChart({ data, xAxisName, fineSelect, topK, yearRange, ...rest }) {
    const ref = useRef();

    const width = rest.width || defaults.width;
    const height = rest.height || defaults.height;

    useEffect(() => {
        const filteredData = getFilteredData(data, { xAxisName, fineSelect, topK, yearRange });

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(ref.current);

        const t = svg.transition().duration(1500);
        const bandwidth = defaults.bandwidth;

        const x = d3
            .scaleBand()
            .domain(filteredData.map((d) => d[xAxisName]))
            .rangeRound([margin.left, margin.left + bandwidth * filteredData.length]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(filteredData.map((d) => d.count))])
            .rangeRound([margin.top + innerHeight, margin.top]);

        const bars = svg
            .selectAll("rect")
            .data(filteredData, (d) => d)
            .join(
                (enter) =>
                    enter
                        .append("rect")
                        .style("mix-blend-mode", "multiply")
                        .attr("fill", "cornflowerblue")
                        .attr("opacity", ".8")
                        .attr("x", innerWidth + margin.right)
                        .attr("y", (d) => y(d.count))
                        .attr("width", x.bandwidth() - 1)
                        .attr("height", (d) => y(0) - y(d.count))
                        .call((enter) => enter.transition(t).attr("x", (d) => x(d[xAxisName]))),
                (update) => update,
                // .attr("width", x.bandwidth() - 1)
                // .call((update) => update.transition(t).attr("x", (d) => x(d[xAxisName]))),
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

        bars.on("mouseenter", (event, d) => {
            d3.select(event.currentTarget).attr("opacity", "1.");
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", x(d[xAxisName]) + x.bandwidth() / 2)
                .attr("y", y(d.count))
                .attr("dy", "-.35em")
                .attr("font-size", 20)
                .text(`${xAxisName}: ` + d[xAxisName] + " / Count: " + d.count);
        }).on("mouseout mouseleave", (event) => {
            d3.select(event.currentTarget).attr("opacity", ".8");
            svg.select("#tooltip").remove();
        });

        const xAxis = (g) =>
            g
                .attr("transform", `translate(0,${margin.top + innerHeight})`)
                .call(d3.axisBottom(x))
                .select(".domain")
                .remove();

        const yAxis = (g) =>
            g
                .attr("transform", `translate(${margin.left},0)`)
                .call(d3.axisLeft(y))
                .select(".domain")
                .remove();

        svg.select("#x-axis-label").remove();
        svg.append("text")
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
        svg.append("g")
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
    }, [width, height, data, xAxisName, fineSelect, topK, yearRange]);

    return (
        <React.Fragment>
            <div>Bar Chart</div>
            <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
                <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`}></g>
            </svg>
        </React.Fragment>
    );
}

const getFilteredData = (data, constraints) => {
    const { xAxisName, fineSelect, topK, yearRange } = constraints;
    return (
        fineSelect.options
            // if no fine selections, every d passes
            // if fine selections exist, return the relevant data
            .filter((d) => fineSelect.value.length === 0 || fineSelect.value.includes(d))
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
