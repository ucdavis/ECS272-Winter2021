import React from "react";
import { withWidth } from "@material-ui/core";
import Selector from "./Selector";
import MultipleSelector from "./MultiSelector";

function DonutControlPanel({ name, donutsTarget, donutsSelect }) {
    return (
        <div id={name}>
            <div>Donut Control</div>
            <Selector {...donutsTarget} />
            <MultipleSelector {...donutsSelect} />
        </div>
    );
}

export default withWidth()(DonutControlPanel);
