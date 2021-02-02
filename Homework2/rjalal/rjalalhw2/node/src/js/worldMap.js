import * as d3 from "d3";
import csvPath from '../assets/data/globalterrorismdb_0718dist.csv';
import countriesJSON from '../data/countries.json';
import { sliderBottom } from 'd3-simple-slider';
import legend from 'd3-svg-legend';

let yearMap = new Map();
let g = null;
let projection = d3.geoEqualEarth();
let path = d3.geoPath(projection);
let topojson = require("topojson");
let countries = topojson.feature(countriesJSON, countriesJSON.objects.countries);
let width = 1600;
let height = 1000;
let svg = null;

export async function getWorldMap(id) {

    console.log("**************** Loading WorldMap ***********************");

    const data = await d3.csv(csvPath);

    console.log((data[0])["eventid"]);

    let newData = [];
    data.forEach(item => {
        let year = +item["iyear"];
        //console.log("Year: "+year);
        if (year >= 2011) {
            const newItem = {
                year: year,
                cntry_code: +item["country"],
                cntry_name: item["country_txt"],
                attack_code: +item["attacktype1"],
                attack_name: item["attacktype1_txt"]
            }
            newData.push(newItem);
        }
    })
    //console.log("New Data: " + JSON.stringify(newData));

    let countryCodeMap = new Map();
    newData.forEach(item => {
        //console.log(JSON.stringify(item));
        if (!(item.cntry_code in countryCodeMap)) {
            countryCodeMap[item.cntry_code] = item.cntry_name;
        }
    })
    console.log("Country Map: " + JSON.stringify(countryCodeMap));


    let cntryCodes = [];
    //console.log("New Data: "+JSON.stringify(newData));
    newData.forEach(item => {

        if (!(yearMap.has(item.year))) {
            let incidentPerYearMap = new Map();
            //let incidentsCount;
            newData.forEach(item2 => {
                //incidentsCount = 0;
                if (item2.year == item.year) {
                    if (!(incidentPerYearMap.has(item2.cntry_name))) {
                        cntryCodes.push(item2.cntry_name);
                        //console.log("Adding country "+item2.cntry_name);
                        incidentPerYearMap.set(item2.cntry_name, 1);
                        //incidentPerYearMap[item2.cntry_name] = 1;
                    } else {
                        let incidentCount = incidentPerYearMap.get(item2.cntry_name);
                        incidentCount++;
                        //console.log("Incrementing for country "+item2.cntry_name+" incidents: "+incidentCount);
                        incidentPerYearMap.set(item2.cntry_name, incidentCount);
                        //incidentPerYearMap[item2.cntry_name]++;
                    }
                }
            })
            //console.log("Incident Map for " + item.year + " : " + JSON.stringify(incidentPerYearMap));
            yearMap.set(item.year, incidentPerYearMap);
            //yearMap[item.year] = incidentPerYearMap;
        }
    })

    //console.log("Year Map: " + JSON.stringify(yearMap));
    let choroDataMap = new Map();
    choroDataMap = yearMap.get(2011);
    d3.select('#value-time').text(2011);
    //console.log("Get Angola: " + choroDataMap.get("Angola"));
    /*let keys = Array.from(choroDataMap.keys());
    let notPresentCntr = [];
    countries.features.forEach(cntry=>{
        if(!choroDataMap.has(cntry.properties.name)){
            console.log("Cntry not present: "+cntry.properties.name);
            notPresentCntr.push(cntry.properties.name);
        }
    })
    keys.forEach(key => {
        notPresentCntr.forEach(cntry => {
            if (cntry.indexOf(key) != -1) {
                console.log("Country substring found: "+key);
            }
        })

    })*/
    if (choroDataMap.has("United States") && choroDataMap.has("Democratic Republic of the Congo")) {
        let incidentCountUS = choroDataMap.get("United States");
        let incidentCountCongo = choroDataMap.get("Democratic Republic of the Congo");
        choroDataMap.delete("United States");
        choroDataMap.delete("Democratic Republic of the Congo");

        choroDataMap.set("United States of America", incidentCountUS);
        choroDataMap.set("Dem. Rep. Congo", incidentCountCongo);
    }

    //console.log("incidents for Syria in 2011 " + choroDataMap.get("Syria"));

    getTimeSlider("#timeSilder");
    createMap(choroDataMap, id);


}


function createMap(choroDataMap, id) {

    let outline = ({ type: "Sphere" });

    let color = createLegend(choroDataMap);

    console.log("Choropleth Has: " + choroDataMap.has("Afghanistan"))

    console.log("TopoJSON: " + topojson);

    svg = d3.select(id).append("svg")
        .style("display", "block")
        .style("padding-left", 300)
        .attr("viewBox", [0, 0, width, height]);

    const defs = svg.append("defs");

    defs.append("path")
        .attr("id", "outline")
        .attr("d", path(outline));

    defs.append("clipPath")
        .attr("id", "clip")
        .append("use")
        .attr("xlink:href", new URL("#outline", location));

    g = svg.append("g")
        .attr("clip-path", `url(${new URL("#clip", location)})`);

    g.append("use")
        .attr("xlink:href", new URL("#outline", location))
        .attr("fill", "white");

    g.append("g")
        .selectAll("path")
        .data(countries.features)
        .join("path")
        .attr("fill", d => color(choroDataMap.get(d.properties.name)))
        .attr("d", path)
        .append("title")
        .text(d => `${d.properties.name}
${choroDataMap.has(d.properties.name) ? choroDataMap.get(d.properties.name) : "N/A"}`);

    g.append("path")
        .datum(topojson.mesh(countriesJSON, countriesJSON.objects.countries, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);

    svg.append("use")
        .attr("xlink:href", new URL("#outline", location))
        .attr("fill", "none")
        .attr("stroke", "black");

    /*var linear = d3.scaleLinear()
        .domain([0, 10])
        .range(["rgb(46, 73, 123)", "rgb(71, 187, 94)"]);*/

}


export function getTimeSlider(id) {

    var dataTime = d3.range(0, 7).map(function (d) {
        return new Date(2011 + d, 10, 3);
    });

    var sliderTime =
        sliderBottom()
            .min(d3.min(dataTime))
            .max(d3.max(dataTime))
            .step(1000 * 60 * 60 * 24 * 365)
            .width(300)
            .tickFormat(d3.timeFormat('%Y'))
            .tickValues(dataTime)
            .default(new Date(2011, 10, 3))
            .on('onchange', val => {
                d3.select('#value-time').text(d3.timeFormat('%Y')(val));
                console.log("New Slider Value: " + val);
                createNewMap(val);
            });

    var gTime = d3
        .select(id)
        .append('svg')
        .attr('width', 500)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(30,30)');

    gTime.call(sliderTime);

}

function createNewMap(value) {

    console.log("*********** Silder Value Changed: " + value + " ****************")
    let date = new Date(value);
    let targetYear = date.getFullYear();
    let choroDataMap = yearMap.get(targetYear);
    console.log("Year: " + targetYear);
    //console.log("incidents for Syria in " + targetYear + choroDataMap.get("Syria"));
    //console.log("Get Angola: " + choroDataMap.get("Angola"));
    if (choroDataMap.has("United States") && choroDataMap.has("Democratic Republic of the Congo")) {
        let incidentCountUS = choroDataMap.get("United States");
        let incidentCountCongo = choroDataMap.get("Democratic Republic of the Congo");
        choroDataMap.delete("United States");
        choroDataMap.delete("Democratic Republic of the Congo");

        choroDataMap.set("United States of America", incidentCountUS);
        choroDataMap.set("Dem. Rep. Congo", incidentCountCongo);
    }
    /*choroDataMap.forEach(item => {
        console.log("choroDataMap on value change: " + JSON.stringify(item));
    })*/
    updateMap(choroDataMap);

}

function updateMap(choroDataMap) {

    let color = createLegend(choroDataMap);

    svg.select("g").select("g").selectAll("path")
        .data(countries.features)
        .join("path")
        .transition()
        .attr("fill", d => color(choroDataMap.get(d.properties.name)))
        .attr("d", path);

    svg.select("g").select("g").selectAll("path").select("title").remove();
    svg.select("g").select("g").selectAll("path")
        .data(countries.features)
        .append("title")
        .text(d => `${d.properties.name}
${choroDataMap.has(d.properties.name) ? choroDataMap.get(d.properties.name) : "N/A"}`);

    /*svg.select("g").append("path")
        .datum(topojson.mesh(countriesJSON, countriesJSON.objects.countries, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);*/


}

function createLegend(choroDataMap) {

    let color = d3.scaleSequential()
        .domain(d3.extent(Array.from(choroDataMap.values())))
        .interpolator(d3.interpolateYlGnBu)
        .unknown("#ccc");

    let legendSvg = d3.select("#worldLegend");

    legendSvg.append("g")
        .attr("class", "legendLinear")
        .attr("transform", "translate(20,20)");

    var legendLinear = legend.legendColor()
        .labelFormat(d3.format(".0f"))
        .shapeWidth(50)
        .title("Number of terror incidents beginning from 2011")
        .titleWidth(350)
        .cells(15)
        .orient('horizontal')
        .scale(color);

    legendSvg.select(".legendLinear")
        .call(legendLinear);

    return color;

}