import bardata from "./assets/data/bar.json"; /* Example of reading in data */
import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */
import {drawPieChart, drawBarChart, parallelChart } from "./js/main"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/

let x = 2;
console.log(bardata);


drawPieChart(bardata, "#bar");
drawBarChart(bardata, "#pie");
parallelChart(bardata, "#parallel"); 