import React from "react";
import { withWidth } from "@material-ui/core";
import Selector from "./Selector";
import YearSlider from "./YearSlider";
import MultipleSelector from "./MultiSelector";
import TopKSlider from "./TopKSlider";

function GlobalControlPanel({ name, xAxis, fineSelect, topK, yearSlider, ...rest }) {
    return (
        <div id={name}>
            <div className="panel-title">Global Control</div>
            <Selector {...xAxis} />
            <MultipleSelector {...fineSelect} />
            <TopKSlider {...topK} />
            <YearSlider {...yearSlider} />
        </div>
    );
}

export default withWidth()(GlobalControlPanel);
