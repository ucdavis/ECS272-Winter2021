import testData from "./assets/data/test.json"; /* Example of reading in data */
import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */
import {drawLine} from "./js/line"
import {chord} from "./js/chord"
import {flightCountryLine} from "./js/multiline2"

drawLine("#main")
flightCountryLine("#country")
chord("#chord")

