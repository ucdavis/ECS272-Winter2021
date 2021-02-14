export const itemMouseOver = (selectedTerminal) => {
    d3.selectAll(".myStreamArea").style("opacity", .3);
    d3.selectAll(".myArea2").style("opacity", .3);
    d3.selectAll(".myBar").style("opacity", .3);
    d3.selectAll(".myStreamArea")
        .each(function (d) {
            if (d.key === selectedTerminal) {
                d3.select(this)
                    .style("stroke", "black")
                    .style("opacity", 1);
            }
        });
    d3.selectAll(".myArea2")
        .each(function (d) {
            if (d.data.name === selectedTerminal) {
                d3.select(this)
                    .style("stroke", "black")
                    .style("opacity", 1);
            }
        });
    d3.selectAll(".myBar")
        .each(function (d) {
            if (d.name === selectedTerminal) {
                d3.select(this)
                    .style("stroke", "black")
                    .style("opacity", 1);
            }
        });
};

export const itemMouseLeave = () => {
    d3.selectAll(".myStreamArea")
        .style("opacity", 1)
        .style("stroke", "none");
    d3.selectAll(".myArea2")
        .style("opacity", 1)
        .style("stroke", "none");
    d3.selectAll(".myBar")
        .style("opacity", 1)
        .style("stroke", "none");
};