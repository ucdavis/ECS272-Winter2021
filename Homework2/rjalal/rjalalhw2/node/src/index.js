
//import './css/styles.css'; /* Example of connecting a style-sheet */
import { drawBarChart } from "./js/barchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import { getWorldMap } from "./js/worldMap";
import { getBarChart } from "./js/barchart";
import { getStreamGraph } from "./js/streamGraph";
import 'bootstrap';
import './scss/app.scss';
import { get } from "jquery";

getWorldMap("#bar");
getBarChart("#barChart1");
getStreamGraph("#streamGraph");



