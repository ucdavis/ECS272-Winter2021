import { dawD3barchart } from "./js/barchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import { radar_render, myFunction_radar } from "./js/radar_front";
import { line_render,myFunction_line } from "./js/line";


document
  .getElementById("mySelect_radar")
  .addEventListener("change", myFunction_radar);
document
  .getElementById("mySelect_line")
  .addEventListener("change", myFunction_line);

dawD3barchart();
radar_render("radar_all");
line_render(1);
