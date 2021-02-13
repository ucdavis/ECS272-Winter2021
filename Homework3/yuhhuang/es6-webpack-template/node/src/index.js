
import song_data from "./assets/data/popular_song.json";
import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */
import {LineChart,ScatterPlot,SpiderChart,StreamChart} from "./js/barchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
//import 'bootstrap';

ScatterPlot("#violinchart")
StreamChart('#linechart');
SpiderChart(song_data,'#radarchart')
//ScatterPlot("#linechart")
//ScatterZoomNew("#radarchart")