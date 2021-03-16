
//import './css/styles.css'; /* Example of connecting a style-sheet */
import {displayZoomChart} from '../src/js/zoomChart'
import {displayBeeswarm} from '../src/js/beeswarm'
import {barChartRace} from '../src/js/barChartRace'
import {getBarChart} from '../src/js/barchart';
import {getBarChartVertical} from '../src/js/barChartVerical';
import 'bootstrap';
import './scss/app.scss';
import { get } from "jquery";

//getWorldMap("#bar");
//getBarChart("#barChart1");
//getStreamGraph("#streamGraph");
//console.log("Hello World");
displayZoomChart("#zoomChart");
displayBeeswarm("#beeswarm");
//barChartRace("#barChartRace");
//getBarChart("#barChart");
getBarChartVertical("#barChart");


