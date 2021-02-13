import React from "react";
import withWidth from "@material-ui/core/withWidth";
import Donut from "./Donut";

const margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};
const padAngle = 0.015;
const cornerRadius = 3;

const DonutsPanel = ({ data, constraints, ...rest }) => {
    const { xAxisName, yearRange, target, selections } = constraints;

    const filteredData = data.filter(
        (ele) =>
            yearRange[0] <= ele["Release Year"] &&
            ele["Release Year"] <= yearRange[1] &&
            ele[xAxisName] === target
    );
    const donutsData = selections.map((selectedName) => {
        let counts = {};
        for (const d of filteredData) {
            counts[d[selectedName]] = 1 + (counts[d[selectedName]] || 0);
        }

        return Object.keys(counts).map((key) => ({
            [selectedName]: key,
            count: counts[key],
        }));
    });

    return (
        <React.Fragment>
            <div>Donuts</div>
            <div>
                {target === ""
                    ? ""
                    : selections.map((ele, idx) => (
                          <Donut
                              id={`donut-${idx}`}
                              key={ele}
                              title={ele}
                              category={ele}
                              data={donutsData[idx]}
                              margin={margin}
                              padAngle={padAngle}
                              cornerRadius={cornerRadius}
                          />
                      ))}
            </div>
        </React.Fragment>
    );
};

export default withWidth()(DonutsPanel);
