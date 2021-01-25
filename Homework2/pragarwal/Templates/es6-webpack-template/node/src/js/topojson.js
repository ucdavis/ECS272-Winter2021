import * as d3 from "d3";
import * as topojson from "topojson";

export function drawTopojson(data, id){


    albersProjection = d3.geoAlbers()
    .scale( 80000 )
    .rotate( [85.7585,0] )
    .center( [0, 38.2527] )
    .translate( [wid/2,hei/2] );

    path2 = d3.geoPath()
        .projection( albersProjection );

    wid = 700;
    hei = 580;

    format = d => `${d}%`

    lv = FileAttachment("Jefferson_County_KY_ZIP_Codes 2_Updated.geojson").json() 

    topojson = require("topojson-client@3")

    
}