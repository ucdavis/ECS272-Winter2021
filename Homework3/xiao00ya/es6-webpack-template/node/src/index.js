// import testData from "./assets/data/test.json"; /* Example of reading in data */
// import sfGeoData from "./assets/data/san-francisco.json"; /* Example of reading in data */
// import sfGeoData from "./assets/data/san-francisco-test.json"; /* Example of reading in data */
// import sfGeoData from "./assets/data/san-francisco-crime.json";
import sfGeoData from "./assets/data/san-francisco-crime-updated.json";
import detail_to_coarse_map from  "./assets/data/detail_to_coarse_category_map.json";
import coarse_to_detail_map from  "./assets/data/coarse_to_detail_category_map.json";

// import sfGeoData from "./assets/data/world.json"; /* Example of reading in data */
// import sfGeoData from "./assets/data/sf_test.json"; /* Example of reading in data */
import SFgeoData_update from "./assets/data/SFN.json";

import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */

import {drawBarChart} from "./js/barchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import {drawCrimeTimeBarChart} from "./js/barchart";
import {updateBar} from "./js/barchart";
import {updateY} from "./js/barchart";
import {revertY} from "./js/barchart";

// import {drawBarFromCsvAsync} from "./js/line_chart"; 
import {drawStreamFromCsvAsync} from "./js/streamgraph"; 
// import {drawGeo} from "./js/geoTest"
import {drawSF} from "./js/geoGraph"

var menu_history = document.getElementById("change_level");
menu_history.addEventListener("change", changeLevel);

var adjust = document.getElementById("myCheck");
adjust.addEventListener("change", adjustY);
function adjustY(event) {
  if (this.checked) {
    console.log("Checkbox is checked..");
    if (menu.value == '3') {
      // alert(3);
      // drawCrimeTimeBarChart("ROBBERY","#bar1");
      updateY("ROBBERY", "#bar1");
    }
  } else {
    if (menu.value == '3') {
      revertY("ROBBERY", "#bar1");
    }
    console.log("Checkbox is not checked..");
  }
}


function changeLevel(event) {
  if (menu_history.value == '1') {
    // alert(1);
    drawStreamFromCsvAsync("coarse", "#bar");

  } else if (menu_history.value == '2') {
    // alert(2);
    drawStreamFromCsvAsync("detail", "#bar");
  } 
}

var menu = document.getElementById("change_chart");
menu.addEventListener("change", generateData);

function generateData(event) {
  if (menu.value == '1') {
    // alert(1);
    drawCrimeTimeBarChart("WEAPON LAWS","#bar1");
  } else if (menu.value == '2') {
    // alert(2);
    drawCrimeTimeBarChart("WARRANTS","#bar1");
  } else if (menu.value == '3') {
    // alert(3);
    // drawCrimeTimeBarChart("ROBBERY","#bar1");
    updateBar("ROBBERY","#bar1");
  }
  else if (menu.value == '4') {
    // alert(3);
    drawCrimeTimeBarChart("VEHICLE THEFT","#bar1");
  }
  else if (menu.value == '5') {
    // alert(3);
    drawCrimeTimeBarChart("NON-CRIMINAL","#bar1");
  }
}

var menu3 = document.getElementById("change_map");
menu3.addEventListener("change", changeMap);

function changeMap(event) {
  console.log("Get the change!!!!");
  if (menu3.value == '1') {
    // alert(1);
    drawSF(sfGeoData, "property crimes","#bar2");
  } else if (menu3.value == '2') {
    // alert(2);
    drawSF(sfGeoData, "personal crimes","#bar2");
  } else if (menu3.value == '3') {
    // alert(3);
    drawSF(sfGeoData, "statutory crimes","#bar2");
  }
  
}

// function initate()
// {

// document.getElementById("myList").onchange = function() {
//    var sheet=document.getElementById("myList").value;

//    if(sheet=="one"){
//    setActiveStyleSheet("theme1");
//    }
//    else if(sheet=="two"){
//    setActiveStyleSheet("theme2");
//    }
//    else if(sheet="three"){
//    setActiveStyleSheet("theme3");
//    }
//    else{
//    setActiveStyleSheet("default");
//    }
//    return false
// };

// }

// window.onload = initate;



// import {drawStreamFromCsvAsync} from ".js/streamgraph";

let x = 2;
// console.log(testData);
// drawBarChart(testData["data"], "#bar");
drawStreamFromCsvAsync("coarse","#bar");
// drawBarFromCsvAsync("#bar");
// drawBarChart(testData["data"], "#bar1");
// drawGeo(sfGeoData, "#bar1");
drawCrimeTimeBarChart("WEAPON LAWS","#bar1");
// drawCrimeTimeBarChart("#bar1")
// drawSF(SFgeoData_update, "#bar");
drawSF(sfGeoData, "property crimes","#bar2");

// drawBarChart(testData["data"], "#bar2");
// drawBarFromCsvAsync();


/* 
    TODO: all the other logic for implementing your charts + adding in some basic filters 
    (e.g. dropdown menus for seeing different aspects of the data)
*/