import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "../css/Donut.css";

const Donut = ({ id, title, category, data, margin, padAngle, cornerRadius, ...rest }) => {
    const ref = useRef();

    // seems svg will be auto-resized eventually, so the how large they are doesn't matter (only effect text size)
    const width = 90;
    const height = 90;

    useEffect(() => {
        const dataLength = data.length;
        const colorScale = d3
            .scaleOrdinal()
            .domain(data.map((d, idx) => idx))
            .range(data.map((d, idx) => d3.interpolateSinebow(idx / dataLength)));
        const radius = Math.min(width, height) / 2;

        const svg = d3.select(ref.current);
        const pie = d3
            .pie()
            .value((d) => d.count)
            .sort(null);

        // contructs and arc generator. This will be used for the donut. The difference between outer and inner
        // radius will dictate the thickness of the donut
        const arc = d3
            .arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.6)
            .cornerRadius(cornerRadius)
            .padAngle(padAngle);

        // this arc is used for aligning the text labels
        // const outerArc = d3
        //     .arc()
        //     .outerRadius(radius * 0.9)
        //     .innerRadius(radius * 0.9);

        svg.select(`.${id}-slice`)
            .selectAll("path")
            .data(pie(data))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d) => colorScale(d.data[category]))
            .attr("opacity", ".6")
            .attr("transform", `translate(${radius}, ${radius})`)
            .on("mouseover", (event, d) => {
                d3.select(event.currentTarget).transition().duration(50).attr("opacity", "1.");
                //Makes the new div appear on hover:

                svg.append("circle")
                    .attr("class", "tooltip-circle")
                    .attr("r", radius * 0.55) // radius of tooltip circle
                    .attr("fill", colorScale(d.data[category])) // colorScale based on category mouse is over
                    .attr("opacity", 1)
                    .attr("transform", `translate(${radius}, ${radius})`);
                svg.append("text")
                    .attr("class", "tooltip-text")
                    .attr("transform", `translate(${radius}, ${radius})`)
                    .attr("dy", -10) // hard-coded. can adjust this to adjust text vertical alignment in tooltip
                    .html(toolTipHTML(d.data)) // add text to the circle.
                    .style("font-size", "0.4em")
                    .style("text-anchor", "middle"); // centres text in tooltip
            })
            .on("mouseout", (event) => {
                d3.select(event.currentTarget).attr("opacity", ".6");
                d3.selectAll(".tooltip-circle").remove();
                d3.selectAll(".tooltip-text").remove();
            });

        // svg.append("text")
        //     .attr("transform", `translate(${radius}, ${radius})`)
        //     .attr("dy", 5)
        //     .html(`${title}`) // add text to the circle.
        //     .style("font-size", "0.7em")
        //     .style("text-anchor", "middle"); // centres text in tooltip;

        // svg.select(".labelName")
        //     .datum(data)
        //     .selectAll("text")
        //     .data(pie)
        //     .enter()
        //     .append("text")
        //     .attr("dy", ".35em")
        //     .html((d) => d.data[category] + ": <tspan>" + d.data.count + "</tspan>")
        //     .attr("transform", (d) => {
        //         console.log(d);
        //         // effectively computes the centre of the slice.
        //         // see https://github.com/d3/d3-shape/blob/master/README.md#arc_centroid
        //         let pos = outerArc.centroid(d);

        //         // changes the point to be on left or right depending on where label is.
        //         pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
        //         return "translate(" + pos + ")";
        //     })
        //     .style("text-anchor", (d) =>
        //         // if slice centre is on the left, anchor text to start, otherwise anchor to end
        //         midAngle(d) < Math.PI ? "start" : "end"
        //     );

        // svg.select(".lines")
        //     .datum(data)
        //     .selectAll("polyline")
        //     .data(pie)
        //     .enter()
        //     .append("polyline")
        //     .attr("points", (d) => {
        //         // see label transform function for explanations of these three lines.
        //         let pos = outerArc.centroid(d);
        //         pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
        //         return [arc.centroid(d), outerArc.centroid(d), pos];
        //     });
    }, [id, data, category, padAngle, cornerRadius, rest]);

    return (
        <React.Fragment>
            <svg id={id} viewBox={`0 0 ${width} ${height}`}>
                <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`}>
                    <g className={`${id}-slice`} />
                    {/* <g className="labelName" />
                    <g className="lines" /> */}
                </g>
            </svg>
            <div className="donut-title">{title}</div>
        </React.Fragment>
    );
};

// const midAngle = (d) => {
//     return d.startAngle + (d.endAngle - d.startAngle) / 2;
// };
const toolTipHTML = (d) => {
    var tip = "",
        i = 0;
    for (const key in d) {
        const value = d[key];

        // leave off 'dy' attr for first tspan so the 'dy' attr on text element works. The 'dy' attr on
        // tspan effectively imitates a line break.
        if (i === 0) tip += value;
        else tip += " " + key + ": " + value;
        // if (i === 0) tip += '<tspan x="0">' + key + ": " + value + "</tspan>";
        // else tip += '<tspan x="0" dy="1.2em">' + key + ": " + value + "</tspan>";
        i++;
    }

    return tip;
};

export default Donut;
