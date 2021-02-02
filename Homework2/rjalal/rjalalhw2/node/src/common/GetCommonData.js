import * as d3 from "d3";
import csvPath from '../assets/data/globalterrorismdb_0718dist.csv';

export async function getData(visualizationType) {

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

    if (visualizationType == "barChart" || visualizationType == "worldMap") {


        //console.log("New Data: " + JSON.stringify(newData));

        let yearMap = new Map();
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
                console.log("Incident Map for " + item.year + " : " + JSON.stringify(incidentPerYearMap));
                yearMap.set(item.year, incidentPerYearMap);
                //yearMap[item.year] = incidentPerYearMap;
            }
        })

        return yearMap;

    } else {


        let countries = [];
        newData.forEach(item => {
            //console.log(JSON.stringify(item));
            if ((countries.findIndex(cntry => cntry == item.cntry_name)) == -1) {
                countries.push(item.cntry_name);
            }
        })
        console.log("Countries: " + countries);

        let attackMapPerCntry = new Map();

        countries.forEach(country => {

            let attackData = []
            newData.forEach(item => {

                if (item.cntry_name == country) {

                    let found = attackData.findIndex(d => d.year == item.year);
                    let attackType = item.attack_code;
                    if (found == -1) {

                        let attackIncident = {
                            year: item.year,
                            Assassination: 0,
                            ArmedAssault: 0,
                            BombingOrExplosion: 0,
                            Hijacking: 0,
                            HostageOrBarricade: 0,
                            HostageKidnapping: 0,
                            FacilityOrInfraAttack: 0,
                            UnarmedAssault: 0,
                            Unknown: 0
                        }
                        setAttackType(attackType, attackIncident);
                        attackData.push(attackIncident);
                    } else {

                        setAttackType(attackType, attackData[found]);

                    }
                }
            })
            attackMapPerCntry.set(country,attackData);
        })

        console.log("Attack Map Per Country: " + attackMapPerCntry);
        //year++;
        //console.log("Attack data array: " + JSON.stringify(attackData));
        return attackMapPerCntry;

    }

}

function setAttackType(attackType, attackIncident) {

    if (attackType == 1) {
        attackIncident.Assassination++;
    } else if (attackType == 2) {
        attackIncident.ArmedAssault++;
    } else if (attackType == 3) {
        attackIncident.BombingOrExplosion++;
    } else if (attackType == 4) {
        attackIncident.Hijacking++;
    } else if (attackType == 5) {
        attackIncident.HostageOrBarricade++;
    } else if (attackType == 6) {
        attackIncident.HostageKidnapping++;
    } else if (attackType == 7) {
        attackIncident.FacilityOrInfraAttack++;
    } else if (attackType == 8) {
        attackIncident.UnarmedAssault++;
    } else if (attackType == 9) {
        attackIncident.Unknown++;
    }

}