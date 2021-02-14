import { dawD3barchart } from "./js/barchart";
import { radar_render, myFunction_radar } from "./js/radar_front";

document
  .getElementById("mySelect_radar")
  .addEventListener("change", myFunction_radar);

dawD3barchart();
radar_render("radar_all");

import "./js/scatter";
