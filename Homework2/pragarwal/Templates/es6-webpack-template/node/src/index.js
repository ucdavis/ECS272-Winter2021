
//import testData from "./assets/data/test.json"; /* Example of reading in data */
import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */
//import {drawBarChart, drawBarFromCsvAsync} from "./js/barchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import {drawScatterPlot} from "./js/scatterplot"
import {drawBubbleChart} from "./js/bubblechart"
import {drawLineChart} from "./js/linechart"
import {drawStackedBarChart} from "./js/stackedbarchart"

let x = 2;
//console.log(testData);
//drawBarChart(testData["data"], "#bar");
//drawBarFromCsvAsync();
//drawScatterPlot();
drawBubbleChart();
drawLineChart();
drawStackedBarChart();

/* 
    TODO: all the other logic for implementing your charts + adding in some basic filters 
    (e.g. dropdown menus for seeing different aspects of the data)
*/