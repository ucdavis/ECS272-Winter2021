import React from "react";
import { withWidth } from "@material-ui/core";
import Selector from "./Selector";
import MultipleSelector from "./MultiSelector";

function DonutControlPanel({ name, donutTarget, donutTopic }) {
  return (
    <div id={name}>
      <div>Donut Control</div>
      <Selector {...donutTarget} />
      <MultipleSelector {...donutTopic} />
    </div>
  );
}

export default withWidth()(DonutControlPanel);
