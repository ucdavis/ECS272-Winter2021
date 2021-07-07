
getProcessData = async function (data) {

    //let data = await d3.csv('co2_emission');
    let groupBycntry = d3.group(data, d => d['Year']);

    let years = Array.from(groupBycntry.keys());
    let dataFor2017 = [];
    years.forEach(year => {

        if (+[year] == 2017) {
            dataFor2017 = groupBycntry.get(year);
        }


    })
    /*dataFor2017.forEach(item => {
    if (item['Entity'] == "World" || item['Entity'] == "Middle East" || item['Entity'] == "Americas (other)" || item['Entity'] == "Europe (other)"
    || item['Entity'] == "Asia and Pacific (other)") {
    let index = dataFor2017.find(d => d['Entity'] == )
    dataFor2017.splice()
  }
  })*/
    for (let i = 0; i < dataFor2017.length; i++) {
        if (dataFor2017[i].Entity == "World" || dataFor2017[i].Entity == "Middle East" || dataFor2017[i].Entity == "Americas (other)" || dataFor2017[i].Entity == "Europe (other)"
            || dataFor2017[i].Entity == "Asia and Pacific (other)" || dataFor2017[i].Entity.startsWith('International')) {
            dataFor2017.splice(i, 1);

        }
    }


    let topData = dataFor2017.sort(function (a, b) {
        return d3.descending(+a['Annual CO₂ emissions (tonnes )'], +b['Annual CO₂ emissions (tonnes )']);
    }).slice(0, 10);
    //console.log("Sorted Data: " + JSON.stringify(topData));

    let processedData = [];
    topData.forEach(yearObj => {
        let cntryObj = {
            name: yearObj.Entity,
            value: yearObj['Annual CO₂ emissions (tonnes )']
        }
        processedData.push(cntryObj);
    })

    return processedData;

}

getMixedChartData = function (tempData) {

    // let tempRawItr1 = [];
    // tempData.forEach(item => {
    //     let dateStr = item['dt'];
    //     let dateArr = dateStr.split('-');
    //     if (+dateArr[0] >= 1900) {
    //         tempRawItr1.push(item);
    //     }
    // })
    //
    // let groupTempcntry = d3.group(tempRawItr1, d => d['Country']);
    // let cntryKeys = Array.from(groupTempcntry.keys());
    // let yearsRange = d3.range(1900, 2013);
    //
    // let averageTemp = [];
    // cntryKeys.forEach(cntryName => {
    //
    //     let cntryTempRawData = groupTempcntry.get(cntryName);
    //     yearsRange.forEach(year => {
    //         let totalTemp = 0;
    //         cntryTempRawData.forEach(item => {
    //             let dateStr = item['dt'];
    //             let dateArr = dateStr.split('-');
    //             if (+dateArr[0] === year) {
    //                 totalTemp = totalTemp + (+item['AverageTemperature']);
    //             }
    //         })
    //         let avgTemp = totalTemp / 12;
    //         let tempObj = {
    //             year: year,
    //             country: cntryName,
    //             temp: avgTemp
    //         }
    //         averageTemp.push(tempObj);
    //     })
    // })


    let co2TempArray = [];
    tempData["features"].forEach((item, j) => {
        if ('avgTempByYear' in item && 'co2' in item) {
            item['avgTempByYear'].forEach((temp, i) => {
                co2TempArray.push({
                    year: 1850 + i,
                    country: item["properties"]["name"],
                    emission: item['co2'][i],
                    temp: temp
                });
            });
        }
    });

    let countryMap = d3.group(co2TempArray, d => d.country);
    let cntrykeys = Array.from(countryMap.keys());

    cntrykeys.forEach(key => {
        let cntryArray = countryMap.get(key);

        for (let i = 1; i < cntryArray.length; i++) {

            let tempDiff = cntryArray[i].temp - cntryArray[i - 1].temp;
            if (isNaN(tempDiff) || tempDiff < 0) {
                tempDiff = 0;
            }
            cntryArray[i].tempDiff = tempDiff;
        }
    })

    let groupByYear = d3.group(co2TempArray, d => d.year);

    return groupByYear;
}

getDonutData = function (data) {

    let grpByCntry = d3.group(data, d => d['Entity']);
    let keys = Array.from(grpByCntry.keys());

    let chUSEu = 0;
    let world = 0;
    let IndRus = 0
    keys.forEach(key => {

        if (key == "China" || key == "United States" || key == "EU-28") {
            let cntryArr = grpByCntry.get(key);
            cntryArr.forEach(item => {

                if (+item['Year'] == 2017) {

                    chUSEu = chUSEu + (+item['Annual CO₂ emissions (tonnes )']);
                }

            })
        } else if (key == "India" || key == "Russia") {
            let cntryArr = grpByCntry.get(key);
            cntryArr.forEach(item => {

                if (+item['Year'] == 2017) {

                    IndRus = IndRus + (+item['Annual CO₂ emissions (tonnes )']);
                }

            })
        } else if (key == "World") {
            let cntryArr = grpByCntry.get(key);
            cntryArr.forEach(item => {

                if (+item['Year'] == 2017) {

                    world = +item['Annual CO₂ emissions (tonnes )'];
                }

            })
        }


    })

    //console.log("chUSEu: " + chUSEu + " world: " + world);
    let chUSEuPer = (chUSEu * 100) / world;
    let IndRusPer = (IndRus * 100) / world;
    //console.log("China Us Eu " + chUSEuPer);
    let others = 100 - (chUSEuPer + IndRusPer);


    let donutData = [];
    donutData.push({
        name: "US China EU",
        value: chUSEuPer
    })
    donutData.push({
        name: "India Russia",
        value: IndRusPer
    })
    donutData.push({
        name: "Others",
        value: others
    })

    /*let treemap = [];
    let parentObj = {

        name: 'Country',
        parent: '',
        value: ''
    }
    treemap.push(parentObj);

    data.forEach(item => {

        let treeObj = {

            name: item.name,
            parent: 'Country',
            value: item.value

        }
        treemap.push(treeObj);

    })*/

    return donutData;
}

getLineChartData = function (co2Data) {

    var dateArray = d3.timeDays(new Date(1849, 11, 32), new Date(2017, 11, 32));
    let groupBycntry = d3.group(co2Data, d => d['Entity']);


    //console.log("Target Date: "+getTargetDate);
    /*dateArray.forEach(item => {

        //console.log("Item: "+item.getMonth());
        if ((item.getMonth() + 1) == 12 && item.getDate() == 31) {
            getTargetDate = item;
        }
    })*/

    let worldEmission = groupBycntry.get('World');
    let worldCo2Emission = [];
    worldEmission.forEach(item => {

        if (+item['Year'] >= 1850) {

            let getTargetDate = dateArray.find(d => (d.getMonth() + 1) == 12 && d.getDate() == 31 && d.getFullYear() == +item['Year']);
            let worldObj = {
                date: getTargetDate,
                value: +item['Annual CO₂ emissions (tonnes )']
            }

            worldCo2Emission.push(worldObj);
        }
    })
    return worldCo2Emission;
}
