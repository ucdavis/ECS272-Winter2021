import React from "react";
import Chord from "./Chord";

const OverviewPage = (props) => {
  const { data, visible, setOverviewSelectInfo, isFocusUpdate } = props;

  const returnClickedItems = (clickedItems) => {
    const { parent, children } = clickedItems;
    setOverviewSelectInfo((overviewSelectInfo) => ({
      ...overviewSelectInfo,
      column: parent,
      rows: children,
    }));
  };

  return visible ? (
    <div id="overview-page">
      <Chord
        data={data}
        returnClickedItems={returnClickedItems}
        toCleanClickedItems={isFocusUpdate}
      />
    </div>
  ) : null;
};

export default OverviewPage;
