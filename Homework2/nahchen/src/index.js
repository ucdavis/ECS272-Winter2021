
import testData from "./assets/data/test.json"; /* Example of reading in data */
import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */
import {drawBarChart, drawBarChart2, drawBarFromCsvAsync} from "./js/barchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import {drawScatter} from "./js/figure1"
import {drawLine} from "./js/figure2"
import {drawScatter2} from './js/figure3'
import bootstrap from 'bootstrap'

//let x = 2;
//console.log(testData);
//drawBarChart(testData["data"], "#bar1");
//drawBarChart2("#bar");
//drawBarChart2("#bar1")
drawScatter("#bar1", 600, 300)
drawLine("#bar2", 600, 300)
drawScatter2("#scatter2", 800, 400)


