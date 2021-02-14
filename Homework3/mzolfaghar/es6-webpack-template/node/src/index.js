
import './css/style.scss';
import {drawScatterFromCsvAsync} from "./js/scatterplot"; 
import {drawLineddFromCsvAsync} from "./js/linechart"; 
import {drawHeatFromCsvAsync} from "./js/heatmap"; 
import {drawRadarFromCsvAsync} from "./js/radarchart";

let draw = 0
drawScatterFromCsvAsync();
drawHeatFromCsvAsync();
drawLineddFromCsvAsync(draw);
drawRadarFromCsvAsync();
