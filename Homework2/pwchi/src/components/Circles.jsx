import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

export default function Circles(props) {
    const [dataset, setDataset] = useState(generateDataset());
    const ref = useRef();

    useEffect(
        () => {
            const id = setInterval(() => {
                const newDataset = generateDataset();
                setDataset(newDataset);
            }, 2000);
            return () => {
                clearInterval(id);
            };
        },
        [] // empty dependency array
    );

    useEffect(() => {
        const svgElement = d3.select(ref.current);
        const t = svgElement.transition().duration(750);
        svgElement
            .selectAll("circle")
            .data(dataset, (d) => d)
            .join(
                (enter) =>
                    enter
                        .append("circle")
                        .attr("cx", (d) => d[0])
                        .attr("cy", -10)
                        .attr("r", 3)
                        .attr("fill", "blue")
                        .call((enter) => enter.transition(t).attr("cy", (d) => d[1])),
                (update) => update.call((update) => update.transition(t).attr("fill", "grey")),
                (exit) =>
                    exit
                        .attr("fill", "red")
                        .call((exit) => exit.transition(t).attr("r", 0).remove())
            );
    }, [dataset]);
    return <svg viewBox="0 0 100 100" ref={ref} />;
}

function generateDataset() {
    return [
        [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
        [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
        [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
        [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)],
    ];
}
