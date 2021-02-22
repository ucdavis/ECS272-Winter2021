import React from "react";
import Chord from "./Chord";

const OverviewPage = (props) => {
    const { data, visible } = props;
    return visible ? (
        <div id="overview-page">
            <Chord data={data} />
        </div>
    ) : null;
};

export default OverviewPage;
