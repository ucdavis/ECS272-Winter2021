import * as d3 from "d3";
import artistData from "./assets/data/data_by_artist.json";
import allData from "./assets/data/data.json";
import './css/style.scss';
import './css/styles.css'; /* Example of connecting a style-sheet */
import {drawBarChart} from "./js/barchart"; /* Example of importing one function from a js file for multiple {f(x), f(y), f(z)}*/
import {drawScatterplot} from "./js/scatterplot";


/** Helper functions for bar chart **/
var n1 = 0; var n2 = 0; var n3 = 0; var n4 = 0; var n5 = 0;
var n6 = 0; var n7 = 0; var n8 = 0; var n9 = 0; var n10 = 0;
var counts = [];
function calculateNumArtists(startVal, isAll) {
  if (isAll) {
    for (var i = 0; i < artistData.data.length; i++) {
      if (artistData.data[i].popularity <= startVal) {n1++;}
      else if (artistData.data[i].popularity > startVal && artistData.data[i].popularity <= startVal+10) {n2++;}
      else if (artistData.data[i].popularity > startVal+10 && artistData.data[i].popularity <= startVal+20) {n3++;}
      else if (artistData.data[i].popularity > startVal+20 && artistData.data[i].popularity <= startVal+30) {n4++;}
      else if (artistData.data[i].popularity > startVal+30 && artistData.data[i].popularity <= startVal+40) {n5++;}
      else if (artistData.data[i].popularity > startVal+40 && artistData.data[i].popularity <= startVal+50) {n6++;}
      else if (artistData.data[i].popularity > startVal+50 && artistData.data[i].popularity <= startVal+60) {n7++;}
      else if (artistData.data[i].popularity > startVal+60 && artistData.data[i].popularity <= startVal+70) {n8++;}
      else if (artistData.data[i].popularity > startVal+70 && artistData.data[i].popularity <= startVal+80) {n9++;}
      else {n10++;}
    }
  }
  else if (!isAll) {
    for (var i = 0; i < artistData.data.length; i++) {
      if (artistData.data[i].popularity > startVal-1 && artistData.data[i].popularity <= startVal) {n1++;}
      else if (artistData.data[i].popularity > startVal && artistData.data[i].popularity <= startVal+1) {n2++;}
      else if (artistData.data[i].popularity > startVal+1 && artistData.data[i].popularity <= startVal+2) {n3++;}
      else if (artistData.data[i].popularity > startVal+2 && artistData.data[i].popularity <= startVal+3) {n4++;}
      else if (artistData.data[i].popularity > startVal+3 && artistData.data[i].popularity <= startVal+4) {n5++;}
      else if (artistData.data[i].popularity > startVal+4 && artistData.data[i].popularity <= startVal+5) {n6++;}
      else if (artistData.data[i].popularity > startVal+5 && artistData.data[i].popularity <= startVal+6) {n7++;}
      else if (artistData.data[i].popularity > startVal+6 && artistData.data[i].popularity <= startVal+7) {n8++;}
      else if (artistData.data[i].popularity > startVal+7 && artistData.data[i].popularity <= startVal+8) {n9++;}
      else if (artistData.data[i].popularity > startVal+8 && artistData.data[i].popularity <= startVal+9) {n10++;}
    }
  }
  counts.push(n1);
  counts.push(n2);
  counts.push(n3);
  counts.push(n4);
  counts.push(n5);
  counts.push(n6);
  counts.push(n7);
  counts.push(n8);
  counts.push(n9);
  counts.push(n10);
}

calculateNumArtists(10, true);
var numArtistPopularity_All = [
  {popularityrange: "0-10", numartists:counts[0]},
  {popularityrange: "10-20", numartists:counts[1]},
  {popularityrange: "20-30", numartists:counts[2]},
  {popularityrange: "30-40", numartists:counts[3]},
  {popularityrange: "40-50", numartists:counts[4]},
  {popularityrange: "50-60", numartists:counts[5]},
  {popularityrange: "60-70", numartists:counts[6]},
  {popularityrange: "70-80", numartists:counts[7]},
  {popularityrange: "80-90", numartists:counts[8]},
  {popularityrange: "90-100", numartists:counts[9]}
]

n1 = 0; n2 = 0; n3 = 0; n4 = 0; n5 = 0;
n6 = 0; n7 = 0; n8 = 0; n9 = 0; n10 = 0;
counts = [];
calculateNumArtists(1, false);
var numArtistPopularity_0to10 = [
  {popularityrange: "0-1", numartists:counts[0]},
  {popularityrange: "1-2", numartists:counts[1]},
  {popularityrange: "2-3", numartists:counts[2]},
  {popularityrange: "3-4", numartists:counts[3]},
  {popularityrange: "4-5", numartists:counts[4]},
  {popularityrange: "5-6", numartists:counts[5]},
  {popularityrange: "6-7", numartists:counts[6]},
  {popularityrange: "7-8", numartists:counts[7]},
  {popularityrange: "8-9", numartists:counts[8]},
  {popularityrange: "9-10", numartists:counts[9]}
]


n1 = 0; n2 = 0; n3 = 0; n4 = 0; n5 = 0;
n6 = 0; n7 = 0; n8 = 0; n9 = 0; n10 = 0;
counts = [];
calculateNumArtists(11, false);
var numArtistPopularity_10to20 = [
  {popularityrange: "10-11", numartists:counts[0]},
  {popularityrange: "11-12", numartists:counts[1]},
  {popularityrange: "12-13", numartists:counts[2]},
  {popularityrange: "13-14", numartists:counts[3]},
  {popularityrange: "14-15", numartists:counts[4]},
  {popularityrange: "15-16", numartists:counts[5]},
  {popularityrange: "16-17", numartists:counts[6]},
  {popularityrange: "17-18", numartists:counts[7]},
  {popularityrange: "18-19", numartists:counts[8]},
  {popularityrange: "19-20", numartists:counts[9]}
]


n1 = 0; n2 = 0; n3 = 0; n4 = 0; n5 = 0;
n6 = 0; n7 = 0; n8 = 0; n9 = 0; n10 = 0;
counts = [];
calculateNumArtists(21, false);
var numArtistPopularity_20to30 = [
  {popularityrange: "20-21", numartists:counts[0]},
  {popularityrange: "21-22", numartists:counts[1]},
  {popularityrange: "22-23", numartists:counts[2]},
  {popularityrange: "23-24", numartists:counts[3]},
  {popularityrange: "24-25", numartists:counts[4]},
  {popularityrange: "25-26", numartists:counts[5]},
  {popularityrange: "26-27", numartists:counts[6]},
  {popularityrange: "27-28", numartists:counts[7]},
  {popularityrange: "28-29", numartists:counts[8]},
  {popularityrange: "29-30", numartists:counts[9]}
]

n1 = 0; n2 = 0; n3 = 0; n4 = 0; n5 = 0;
n6 = 0; n7 = 0; n8 = 0; n9 = 0; n10 = 0;
counts = [];
calculateNumArtists(31, false);
var numArtistPopularity_30to40 = [
  {popularityrange: "30-31", numartists:counts[0]},
  {popularityrange: "31-32", numartists:counts[1]},
  {popularityrange: "32-33", numartists:counts[2]},
  {popularityrange: "33-34", numartists:counts[3]},
  {popularityrange: "34-35", numartists:counts[4]},
  {popularityrange: "35-36", numartists:counts[5]},
  {popularityrange: "36-37", numartists:counts[6]},
  {popularityrange: "37-38", numartists:counts[7]},
  {popularityrange: "38-39", numartists:counts[8]},
  {popularityrange: "39-40", numartists:counts[9]}
]

n1 = 0; n2 = 0; n3 = 0; n4 = 0; n5 = 0;
n6 = 0; n7 = 0; n8 = 0; n9 = 0; n10 = 0;
counts = [];
calculateNumArtists(41, false);
var numArtistPopularity_40to50 = [
  {popularityrange: "40-41", numartists:counts[0]},
  {popularityrange: "41-42", numartists:counts[1]},
  {popularityrange: "42-43", numartists:counts[2]},
  {popularityrange: "43-44", numartists:counts[3]},
  {popularityrange: "44-45", numartists:counts[4]},
  {popularityrange: "45-46", numartists:counts[5]},
  {popularityrange: "46-47", numartists:counts[6]},
  {popularityrange: "47-48", numartists:counts[7]},
  {popularityrange: "48-49", numartists:counts[8]},
  {popularityrange: "49-50", numartists:counts[9]}
]

n1 = 0; n2 = 0; n3 = 0; n4 = 0; n5 = 0;
n6 = 0; n7 = 0; n8 = 0; n9 = 0; n10 = 0;
counts = [];
calculateNumArtists(51, false);
var numArtistPopularity_50to60 = [
  {popularityrange: "50-51", numartists:counts[0]},
  {popularityrange: "51-52", numartists:counts[1]},
  {popularityrange: "52-53", numartists:counts[2]},
  {popularityrange: "53-54", numartists:counts[3]},
  {popularityrange: "54-55", numartists:counts[4]},
  {popularityrange: "55-56", numartists:counts[5]},
  {popularityrange: "56-57", numartists:counts[6]},
  {popularityrange: "57-58", numartists:counts[7]},
  {popularityrange: "58-59", numartists:counts[8]},
  {popularityrange: "59-60", numartists:counts[9]}
]

n1 = 0; n2 = 0; n3 = 0; n4 = 0; n5 = 0;
n6 = 0; n7 = 0; n8 = 0; n9 = 0; n10 = 0;
counts = [];
calculateNumArtists(61, false);
var numArtistPopularity_60to70 = [
  {popularityrange: "60-61", numartists:counts[0]},
  {popularityrange: "61-62", numartists:counts[1]},
  {popularityrange: "62-63", numartists:counts[2]},
  {popularityrange: "63-64", numartists:counts[3]},
  {popularityrange: "64-65", numartists:counts[4]},
  {popularityrange: "65-66", numartists:counts[5]},
  {popularityrange: "66-67", numartists:counts[6]},
  {popularityrange: "67-68", numartists:counts[7]},
  {popularityrange: "68-69", numartists:counts[8]},
  {popularityrange: "69-70", numartists:counts[9]}
]

n1 = 0; n2 = 0; n3 = 0; n4 = 0; n5 = 0;
n6 = 0; n7 = 0; n8 = 0; n9 = 0; n10 = 0;
counts = [];
calculateNumArtists(71, false);
var numArtistPopularity_70to80 = [
  {popularityrange: "70-71", numartists:counts[0]},
  {popularityrange: "71-72", numartists:counts[1]},
  {popularityrange: "72-73", numartists:counts[2]},
  {popularityrange: "73-74", numartists:counts[3]},
  {popularityrange: "74-75", numartists:counts[4]},
  {popularityrange: "75-76", numartists:counts[5]},
  {popularityrange: "76-77", numartists:counts[6]},
  {popularityrange: "77-78", numartists:counts[7]},
  {popularityrange: "78-79", numartists:counts[8]},
  {popularityrange: "79-80", numartists:counts[9]}
]

n1 = 0; n2 = 0; n3 = 0; n4 = 0; n5 = 0;
n6 = 0; n7 = 0; n8 = 0; n9 = 0; n10 = 0;
counts = [];
calculateNumArtists(81, false);
var numArtistPopularity_80to90 = [
  {popularityrange: "80-81", numartists:counts[0]},
  {popularityrange: "81-82", numartists:counts[1]},
  {popularityrange: "82-83", numartists:counts[2]},
  {popularityrange: "83-84", numartists:counts[3]},
  {popularityrange: "84-85", numartists:counts[4]},
  {popularityrange: "85-86", numartists:counts[5]},
  {popularityrange: "86-87", numartists:counts[6]},
  {popularityrange: "87-88", numartists:counts[7]},
  {popularityrange: "88-89", numartists:counts[8]},
  {popularityrange: "89-90", numartists:counts[9]}
]

n1 = 0; n2 = 0; n3 = 0; n4 = 0; n5 = 0;
n6 = 0; n7 = 0; n8 = 0; n9 = 0; n10 = 0;
counts = [];
calculateNumArtists(91, false);
var numArtistPopularity_90to100 = [
  {popularityrange: "90-91", numartists:counts[0]},
  {popularityrange: "91-92", numartists:counts[1]},
  {popularityrange: "92-93", numartists:counts[2]},
  {popularityrange: "93-94", numartists:counts[3]},
  {popularityrange: "94-95", numartists:counts[4]},
  {popularityrange: "95-96", numartists:counts[5]},
  {popularityrange: "96-97", numartists:counts[6]},
  {popularityrange: "97-98", numartists:counts[7]},
  {popularityrange: "98-99", numartists:counts[8]},
  {popularityrange: "99-100", numartists:counts[9]}
]

/** Helper functions for scatterplot **/
var dance_All = [];
for (var i = 0; i < artistData.data.length; i++) {
  dance_All.push({popularity: artistData.data[i].popularity, danceability: artistData.data[i].danceability});
}

var dance_0to10 = []; var dance_10to20 = []; var dance_20to30 = []; var dance_30to40 = []; 
var dance_40to50 = []; var dance_50to60 = []; var dance_60to70 = []; var dance_70to80 = []; 
var dance_70to80 = []; var dance_80to100 = [];
for (var i = 0; i < artistData.data.length; i++) {
  if (artistData.data[i].popularity > 0 && artistData.data[i].popularity <= 10) {
    dance_0to10.push({popularity: artistData.data[i].popularity, danceability: artistData.data[i].danceability});
  }
  else if (artistData.data[i].popularity > 10 && artistData.data[i].popularity <= 20) {
    dance_10to20.push({popularity: artistData.data[i].popularity, danceability: artistData.data[i].danceability});
  }
  else if (artistData.data[i].popularity > 20 && artistData.data[i].popularity <= 30) {
    dance_20to30.push({popularity: artistData.data[i].popularity, danceability: artistData.data[i].danceability});
  }
  else if (artistData.data[i].popularity > 30 && artistData.data[i].popularity <= 40) {
    dance_30to40.push({popularity: artistData.data[i].popularity, danceability: artistData.data[i].danceability});
  }
  else if (artistData.data[i].popularity > 40 && artistData.data[i].popularity <= 50) {
    dance_40to50.push({popularity: artistData.data[i].popularity, danceability: artistData.data[i].danceability});
  }
  else if (artistData.data[i].popularity > 50 && artistData.data[i].popularity <= 60) {
    dance_50to60.push({popularity: artistData.data[i].popularity, danceability: artistData.data[i].danceability});
  }
  else if (artistData.data[i].popularity > 60 && artistData.data[i].popularity <= 70) {
    dance_60to70.push({popularity: artistData.data[i].popularity, danceability: artistData.data[i].danceability});
  }
  else if (artistData.data[i].popularity > 70 && artistData.data[i].popularity <= 80) {
    dance_70to80.push({popularity: artistData.data[i].popularity, danceability: artistData.data[i].danceability});
  }
  else if (artistData.data[i].popularity > 80 && artistData.data[i].popularity <= 100) {
    dance_80to100.push({popularity: artistData.data[i].popularity, danceability: artistData.data[i].danceability});
  }
}

/** Helper functions for stream graph **/
var allYears = [];
for (var i = 0; i < allData.data2.length; i++) {
   allYears.push(allData.data2[i].year);
}

var uniqueYears = []; var countPerYear = [];
var yearCounts = allYears.reduce(function (acc, curr) {
  if (typeof acc[curr] == 'undefined') {
    acc[curr] = 1;
  } else {
    acc[curr] += 1;
  }
  acc[curr] += 1;

  return acc;
}, {});

uniqueYears = Object.keys(yearCounts);
countPerYear = Object.values(yearCounts);

var numKey0 = 0; var numKey1 = 0; var numKey2 = 0; var numKey3 = 0; 
var numKey4 = 0; var numKey5 = 0; var numKey6 = 0; var numKey7 = 0; 
var numKey8 = 0; var numKey9 = 0; var numKey10 = 0; var numKey11 = 0;
var key0 = []; var key1 = []; var key2 = []; var key3= []; var key4 = [];
var key5 = []; var key6 = []; var key7 = []; var key8 = []; var key9 = [];
var key10 = []; var key11 = [];

for (var j = 0; j < uniqueYears.length; j++ ) {
  for (var i = 0; i < allData.data2.length; i++) {
    if (allData.data2[i].year == uniqueYears[j]) {
      if (allData.data2[i].key == "0") {
        numKey0++;
      } else if (allData.data2[i].key == "1") {
        numKey1++;
      } else if (allData.data2[i].key == "2") {
        numKey2++;
      } else if (allData.data2[i].key == "3") {
        numKey3++;
      } else if (allData.data2[i].key == "4") {
        numKey4++;
      } else if (allData.data2[i].key == "5") {
        numKey5++;
      } else if (allData.data2[i].key == "6") {
        numKey6++;
      } else if (allData.data2[i].key == "7") {
        numKey7++;
      } else if (allData.data2[i].key == "8") {
        numKey8++;
      } else if (allData.data2[i].key == "9") {
        numKey9++;
      } else if (allData.data2[i].key == "10") {
        numKey10++;
      } else if (allData.data2[i].key == "11") {
        numKey11++;
      } 
    }
  }
  key0.push(numKey0); key1.push(numKey1); key2.push(numKey2); key3.push(numKey3);
  key4.push(numKey4); key5.push(numKey5); key6.push(numKey6); key7.push(numKey7);
  key8.push(numKey8); key9.push(numKey9); key10.push(numKey10); key11.push(numKey11);

  numKey0 = 0; numKey1 = 0; numKey2 = 0; numKey3 = 0; 
  numKey4 = 0; numKey5 = 0; numKey6 = 0; numKey7 = 0; 
  numKey8 = 0; numKey9 = 0; numKey10 = 0; numKey11 = 0;
}


var key_All = [];
for (var i = 0; i < uniqueYears.length; i++) {
  key_All.push({year: uniqueYears[i], C: key0[i], C_sharpD_flat: key1[i], D: key2[i], D_sharpE_flat: key3[i], E: key4[i], F: key5[i],
                F_sharpG_flat: key6[i], G: key7[i], G_sharpA_flat: key8[i], A: key9[i], A_sharpB_flat: key10[i], B: key11[i]});
}

/*** Default charts ***/
/** Drawing bar chart **/
new drawBarChart(numArtistPopularity_All, "#bar").updateBars(numArtistPopularity_All);

/** Drawing line chart **/
drawScatterplot(dance_All, "#scatter");

/** Streamgraph drawn in index.html **/


/* Reference: https://bl.ocks.org/syncopika/f1c9036b0deb058454f825238a95b6be */
function changeBar(value) {
  if (value == 'All') {
    d3.select("#barchart").remove();
    new drawBarChart(numArtistPopularity_All, "#bar").updateBars(numArtistPopularity_All);
  } else if (value == '0-10') {
    d3.select("#barchart").remove();
    new drawBarChart(numArtistPopularity_0to10, "#bar").updateBars(numArtistPopularity_0to10);
  } else if (value == '10-20') {
    d3.select("#barchart").remove();
    new drawBarChart(numArtistPopularity_10to20, "#bar").updateBars(numArtistPopularity_10to20);
  } else if (value == '20-30') {
    d3.select("#barchart").remove();
    new drawBarChart(numArtistPopularity_20to30, "#bar").updateBars(numArtistPopularity_20to30);
  } else if (value == '30-40') {
    d3.select("#barchart").remove();
    new drawBarChart(numArtistPopularity_30to40, "#bar").updateBars(numArtistPopularity_30to40);
  } else if (value == '40-50') {
    d3.select("#barchart").remove();
    new drawBarChart(numArtistPopularity_40to50, "#bar").updateBars(numArtistPopularity_40to50);
  } else if (value == '50-60') {
    d3.select("#barchart").remove();
    new drawBarChart(numArtistPopularity_50to60, "#bar").updateBars(numArtistPopularity_50to60);
  } else if (value == '60-70') {
    d3.select("#barchart").remove();
    new drawBarChart(numArtistPopularity_60to70, "#bar").updateBars(numArtistPopularity_60to70);
  } else if (value == '70-80') {
    d3.select("#barchart").remove();
    new drawBarChart(numArtistPopularity_70to80, "#bar").updateBars(numArtistPopularity_70to80);
  } else if (value == '80-90') {
    d3.select("#barchart").remove();
    new drawBarChart(numArtistPopularity_80to90, "#bar").updateBars(numArtistPopularity_80to90);
  } else if (value == '90-100') {
    d3.select("#barchart").remove();
    new drawBarChart(numArtistPopularity_90to100, "#bar").updateBars(numArtistPopularity_90to100);
  } 
}
window.changeBar = changeBar;

/** Drawing scatterplot **/
function changeScatter(value) {
  if (value == 'All') {
    d3.select("#scatterplot").remove();
    drawScatterplot(dance_All, "#scatter");
  } else if (value == '0-10') {
    d3.select("#scatterplot").remove();
    drawScatterplot(dance_0to10, "#scatter");
  } 
  else if (value == '10-20') {
    d3.select("#scatterplot").remove();
    drawScatterplot(dance_10to20, "#scatter");
  } else if (value == '20-30') {
    d3.select("#scatterplot").remove();
    drawScatterplot(dance_20to30, "#scatter");
  } else if (value == '30-40') {
    d3.select("#scatterplot").remove();
    drawScatterplot(dance_30to40, "#scatter");
  } else if (value == '40-50') {
    d3.select("#scatterplot").remove();
    drawScatterplot(dance_40to50, "#scatter");
  } else if (value == '50-60') {
    d3.select("#scatterplot").remove();
    drawScatterplot(dance_50to60, "#scatter");
  } else if (value == '60-70') {
    d3.select("#scatterplot").remove();
    drawScatterplot(dance_60to70, "#scatter");
  } else if (value == '70-80') {
    d3.select("#scatterplot").remove();
    drawScatterplot(dance_70to80, "#scatter");
  } else if (value == '80-100') {
    d3.select("#scatterplot").remove();
    drawScatterplot(dance_80to100, "#scatter");
  }
}
window.changeScatter = changeScatter;
