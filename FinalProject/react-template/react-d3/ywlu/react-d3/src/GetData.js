import * as d3 from "d3";
import data from './datasets/owid-covid-data.csv';
import data2 from './datasets/country_vaccinations.csv';
import data3 from './datasets/countries_codes_and_coordinates.csv';
export var pack = {};

export function getData_for_country(dpack, iso) {

    var outp = dpack.filter(function (data) {

        return data.iso === iso;
    });

    return outp

}

export function getData_old(_callback) {

    pack = require('./datasets/demodata.json');

    _callback()

}

export async function getData( _callback) {
    Promise.all([
        d3.csv(data),
        d3.csv(data2),
        d3.csv(data3)
    ]).then(([csv1, csv2, csvgeo]) => {

        function getnum(x) {
            var t = Number(x)
            return (t<=0 || t===null) ? 0 : t
        }
        var data = csv1.map(row => {
            return {
                iso: row['iso_code'],
                date: Date.parse(row['date']),
                total_case: Number(row['total_cases']),
                total_deaths: Number(row['total_deaths']),
                new_cases: getnum(Number(row['new_cases'])),
                new_deaths: getnum(Number(row['new_deaths'])),
                population: Number(row['population'])

            }
        })
        var data2 = csv2.map(row => {
            return {
                iso: row['iso_code'],
                date: Date.parse(row['date']),
                daily_vaccinated: Number(row['daily_vaccinations']),
                total_vaccinated: Number(row['total_vaccinations'])
            }
        })
        var datag = csvgeo.map(row => {
            return {
                name: row['Country'],
                iso: row['Alpha-3 code'].substring(2, 5),
                lat: Number(row['Latitude (average)'].substring(2, row['Latitude (average)'].length - 1)),
                lng: Number(row['Longitude (average)'].substring(2, row['Longitude (average)'].length - 1))
            }
        })

        data2.forEach(function (rv) {
            var result = data.filter(function (rc) {
                return rc.iso === rv.iso && rc.date === rv.date;
            });

            rv.total_case = (result[0] !== undefined) ? result[0].total_case : null;
            rv.total_deaths = (result[0] !== undefined) ? result[0].total_deaths : null;
            rv.new_cases = (result[0] !== undefined) ? result[0].new_cases : null;
            rv.new_deaths = (result[0] !== undefined) ? result[0].new_deaths : null;
            rv.population = (result[0] !== undefined) ? result[0].population : null;

            var result = datag.filter(function (rc) {
                return rc.iso === rv.iso;
            });
            rv.name = (result[0] !== undefined) ? result[0].name : null;
            rv.lng = (result[0] !== undefined) ? result[0].lng : null;
            rv.lat = (result[0] !== undefined) ? result[0].lat : null;
        });

        //console.log(data2);
        // console.log(data)
        /**
         var filtered = data.filter(function (el) {
                    return (el.gname != "Unknown");
                });
         */
        var holderC = {};
        var holderD = {};

        data.forEach(function (d) {
            if (holderC.hasOwnProperty(d.iso)) {
                holderC[d.iso] = holderC[d.iso] + d.new_cases;
            } else {
                holderC[d.iso] = d.new_cases;
            }
            if (holderD.hasOwnProperty(d.gname)) {
                holderD[d.iso] = holderD[d.iso] + d.new_deaths;
            } else {
                holderD[d.iso] = d.new_deaths;
            }
        });

        var filteredC = [];

        datag.forEach(function (d) {
            filteredC.push({
                name: d.name,
                iso: d.iso,
                population:(data.find(x => x.iso === d.iso) !== undefined) ? data.find(x => x.iso === d.iso).population : 0,
                total_deaths:holderD[d.iso],
                total_case: holderC[d.iso],
                total_vac: (data2.find(x => x.iso === d.iso) !== undefined) ? data2.reverse().find(x => x.iso === d.iso).total_vaccinated : 0,
                lat: d.lat,
                lng: d.lng
            });
        })
        data.reverse()
        data2.reverse()
        filteredC = filteredC.filter(function (rc) {
            return rc.total_case !== undefined && rc.population !== 0;
        });
        //console.log(filteredC)
        filteredC.forEach(function (d) {
            var l = []

            filteredC.forEach(function (d1) {

                l.push({iso: d1.iso, dis: Math.sqrt(Math.pow(d1.lat - d.lat, 2) + Math.pow(d1.lng - d.lng, 2))})
            })
            l = l.sort(function (a, b) {
                return a.dis - b.dis
            }).slice(1, 6)
            //console.log(l)
            d.close = l
        })

        //console.log(filteredC);

        //data = filtered2
        console.log("good");

        data2 = data2.filter(function (data) {
            return data.date !== null && data.iso !== "";
        });
        /**
        var c = datag[Math.floor(Math.random() * Math.floor(datag.length))].iso
        while (filteredC.find(x => x.iso === c) === undefined || filteredC.find(x => x.iso === c).total_case === 0) {
            c = datag[Math.floor(Math.random() * Math.floor(datag.length))].iso;
        }

        var c = get_iso

        data = data2.filter(function (data) {

            return data.iso === c;
        });
         */
        data = data2

        //console.log(data)
        data.sort((a, b) => a.date - b.date || a.iso - b.iso)
        pack = {data: data, CList: filteredC}
        console.log(pack);

        _callback();
    })

}
