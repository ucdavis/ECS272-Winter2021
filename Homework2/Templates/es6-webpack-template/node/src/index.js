
import testData from "./assets/data/test.json"; /* Example of reading in data */
import dataByYear from "./assets/data/spotify_data/data_by_year.csv"; /* Example of reading in data */

import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */
import {drawBarChart, drawBarFromCsvAsync} from "./js/barchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import {drawLineChart, drawLineFromCsvAsync} from "./js/linechart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import {drawScatterChart, drawScatterFromCsvAsync} from "./js/scatterchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import {drawBarddChart, drawBarddFromCsvAsync} from "./js/barchart_dropdown"; 
import { svg } from "d3";

let x = 2;
console.log(dataByYear);
// drawBarChart(testData["data"], "#bar");
// drawBarChart(dataByYear["data"], "#bar");
drawScatterFromCsvAsync();
drawBarddFromCsvAsync();
drawBarFromCsvAsync();

// drawLineFromCsvAsync();
// const width = 960
// const height = 500
// const circleX = width / 2
// const circleY = height / 2
// const circleRadius = 30
//  const handleMouseMove = () => {
//      console.log('Mouse Moved!')
//  }


// const App = () => 
//     <svg width={900} height={height} onMouseMove = {handleMouseMove} >
//         <circle
//             cx={circleX}
//             cy={circleY}
//             r={circleRadius}
//         />
//     </svg>

/* 
    TODO: all the other logic for implementing your charts + adding in some basic filters 
    (e.g. dropdown menus for seeing different aspects of the data)
*/