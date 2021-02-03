
import testData from "./assets/data/test.json"; /* Example of reading in data */
import dataByYear from "./assets/data/spotify_data/data_by_year.csv"; /* Example of reading in data */
import dataByGenres from "./assets/data/spotify_data/data_by_genres_updated.csv"; /* Example of reading in data */

import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */
import {drawScatterChart, drawScatterFromCsvAsync} from "./js/scatterchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import {drawLineddChart, drawLineddFromCsvAsync} from "./js/linechartdd"; 
// import {drawHeatChart, drawHeatFromCsvAsync} from "./js/heatmapchart"; 
import {drawHeatChart, drawHeatFromCsvAsync} from "./js/heatmapleg"; 
import { svg } from "d3";

let x = 2;
console.log(dataByYear);
console.log(dataByGenres);
drawScatterFromCsvAsync();
drawHeatFromCsvAsync();
drawLineddFromCsvAsync();


/* 
    TODO: all the other logic for implementing your charts + adding in some basic filters 
    (e.g. dropdown menus for seeing different aspects of the data)
*/