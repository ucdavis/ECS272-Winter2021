import testData2 from "./data/test2.json"; /* Example of reading in data */
import testData5 from "./data/test5.json"; /* Example of reading in data */
import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */
import {drawBarChart} from "./js/barchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import {drawplot} from "./js/scatterplot";




let x = 2;
console.log(testData5);
drawBarChart(testData5["data"], "#bar"); // ID 
drawplot(testData2["data"], "#do"); // ID 
/* 
    TODO: all the other logic for implementing your charts + adding in some basic filters 
    (e.g. dropdown menus for seeing different aspects of the data)
*/