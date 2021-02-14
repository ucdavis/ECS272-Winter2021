import * as d3 from "d3";
import csvPath from '../assets/data/time_series_covid_19_confirmed_US.csv';

export async function getData(visualizationType) {

    let data = await d3.csv(csvPath);
    //console.log("GET Data: " + data);

    let dataArray = [];

    data.forEach(item => {
        dataArray.push(item);
    })

    let covidMap = d3.group(dataArray, d => d['Province_State']);
    let columns = [];

    var dateArray = d3.timeDays(new Date(2020, 2, 1), new Date(2020, 11, 32));
    dateArray.forEach(item => {
        let tmpDate = (item.getMonth() + 1) + "/" + item.getDate() + "/" + item.getFullYear().toString().substr(-2);
        columns.push(tmpDate);
    })
    //console.log("Columns: "+JSON.stringify(columns));

    let stateKeys = Array.from(covidMap.keys());
    let stateCovidMap = new Map();
    let totalCovidArray = [];

    //console.log("Alabama Counties: " + JSON.stringify(covidMap.get("Alabama")));
    if (stateCovidMap != null && stateCovidMap.size == 0) {
        stateKeys.forEach(key => {
            if (key != "American Samoa" && key != "Northern Mariana Islands" && key != "Virgin Islands" && key != "Diamond Princess" && key != "Guam"
                && key != "Grand Princess") {
                let covidArrPerDate = covidMap.get(key);
                let covidCount = 0;
                let countyMap = new Map();
                covidArrPerDate.forEach(county => {
                    let countyDateArr = [];
                    columns.forEach(column => {
                        let countyObj = {
                            key: column,
                            covidCases: +county[column],
                            countyNm: county["Admin2"],
                            stateNm: key
                        };
                        countyDateArr.push(countyObj);
                    })
                    countyMap.set(county["Admin2"], countyDateArr);
                })
                stateCovidMap.set(key, countyMap);
            }
        })
    }

    console.log("Alabama Counties: " + JSON.stringify(stateCovidMap.get("Alabama")));

    columns.forEach(column => {
        let covidPerDay = {
            date: column,
            value: 0
        }
        stateKeys.forEach(stateKey => {
            if (stateKey != "American Samoa" && stateKey != "Northern Mariana Islands" && stateKey != "Virgin Islands" && stateKey != "Diamond Princess" && stateKey != "Guam"
                && stateKey != "Grand Princess") {
                let countyMap = stateCovidMap.get(stateKey);
                let countyKeys = Array.from(countyMap.keys());
                countyKeys.forEach(county => {
                    let countyArray = [];
                    countyArray = countyMap.get(county);
                    countyArray.forEach(county => {
                        if (county.key == column) {
                            covidPerDay.value = covidPerDay.value + county.covidCases;
                        }
                    })
                })
            }
        })
        totalCovidArray.push(covidPerDay);
    })

    //Format Date
    var format = d3.timeFormat("%Y-%m-%d");
    dateArray.forEach(item => {
        let oldFormat = (item.getMonth() + 1) + "/" + item.getDate() + "/" + item.getFullYear().toString().substr(-2);
        totalCovidArray.forEach(covidObj => {
            if (covidObj.date == oldFormat) {
                covidObj.date = item;
            }
        })
    })
    console.log("Covid Date: " + JSON.stringify(totalCovidArray[150]));

    if (visualizationType == "zoomChart") {
        return totalCovidArray;
    } else {
        return stateCovidMap;
    }

}