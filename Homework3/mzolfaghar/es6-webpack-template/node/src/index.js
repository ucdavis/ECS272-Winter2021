
import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */
import {drawScatterFromCsvAsync} from "./js/scatterplot"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import {drawLineddFromCsvAsync} from "./js/linechart"; 
import {drawHeatFromCsvAsync} from "./js/heatmap"; 
import {drawParallelFromCsvAsync} from "./js/parallel2"; 

drawScatterFromCsvAsync();
drawHeatFromCsvAsync();
drawLineddFromCsvAsync();
// drawParallelFromCsvAsync();

