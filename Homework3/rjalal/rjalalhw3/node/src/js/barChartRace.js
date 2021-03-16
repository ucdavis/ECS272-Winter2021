import * as d3 from "d3";
import { getData } from '../common/GetCommonData';

let svg;
let x, y, next, prev, formatNumber, names;
let margin = ({ top: 16, right: 80, bottom: 6, left: 5 })
let barSize = 42;
let height = margin.top + barSize * n + margin.bottom;
let n = 10;
let color, width = 954, formatDate, keyframes;
export async function barChartRace(id) {

    let rawData = await getData("barChartRace");
    let stateKeys = Array.from(rawData.keys());
    let data = processData(rawData);

    y = d3.scaleBand()
        .domain(d3.range(n + 1))
        .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
        .padding(0.1);

    x = d3.scaleLinear([0, 1], [margin.left, width - margin.right]);


    /*const scale = d3.scaleOrdinal(d3.schemeTableau10);
    if (data.some(d => d.continent !== undefined)) {
        const continentByName = new Map(data.map(d => [d.state, d.continent]))
        scale.domain(Array.from(continentByName.values()));
        color = scale(continentByName.get(d.state));
    }
    color = scale(d.state);

    scale.domain(stateKeys);
    scale(continentByName.get(d.state))*/

    color = d3.scaleOrdinal()
            .domain(stateKeys)
            .range(d3.schemeCategory10);
   


    formatNumber = d3.format(",d");
    formatDate = d3.utcFormat("%d %b %Y")

    let datevalues = Array.from(d3.rollup(data, ([d]) => d.value, d => +d.date, d => d.state))
        .map(([date, data]) => [new Date(date), data])
        .sort(([a], [b]) => d3.ascending(a, b));

    names = new Set(data.map(d => d.state));


    let k = 10
    keyframes = [];
    let ka, a, kb, b;
    for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
        for (let i = 0; i < k; ++i) {
            const t = i / k;
            keyframes.push([
                new Date(ka * (1 - t) + kb * t),
                rank(state => (a.get(state) || 0) * (1 - t) + (b.get(state) || 0) * t)
            ]);
        }
    }
    keyframes.push([new Date(kb), rank(state => b.get(state) || 0)]);

    let stateframes = d3.groups(keyframes.flatMap(([, data]) => data), d => d.state);
    next = new Map(stateframes.flatMap(([, data]) => d3.pairs(data)))
    prev = new Map(stateframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])));

    

    
    let duration = 15;










    svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height]);

    const updateBars = bars(svg);
    const updateAxis = axis(svg);
    const updateLabels = labels(svg);
    const updateTicker = ticker(svg);

    //yield svg.node();

    for (const keyframe of keyframes) {
        const transition = svg.transition()
            .duration(duration)
            .ease(d3.easeLinear);

        // Extract the top bar’s value.
        x.domain([0, keyframe[1][0].value]);

        updateAxis(keyframe, transition);
        updateBars(keyframe, transition);
        updateLabels(keyframe, transition);
        updateTicker(keyframe, transition);

        console.log("Transition: "+transition);
        svg.interrupt()
        //invalidation.then(() => svg.interrupt());
        //await transition.end();

    }
}

function ticker(svg) {
    const now = svg.append("text")
        .style("font", `bold ${barSize}px var(--sans-serif)`)
        .style("font-variant-numeric", "tabular-nums")
        .attr("text-anchor", "end")
        .attr("x", width - 6)
        .attr("y", margin.top + barSize * (n - 0.45))
        .attr("dy", "0.32em")
        .text(formatDate(keyframes[0][0]));

    return ([date], transition) => {
        transition.end().then(() => now.text(formatDate(date)));
    };
}

function axis(svg) {
    const g = svg.append("g")
        .attr("transform", `translate(0,${margin.top})`);

    const axis = d3.axisTop(x)
        .ticks()
        .tickSizeOuter(0)
        .tickSizeInner(-barSize * (n + y.padding()));

    return (_, transition) => {
        g.transition(transition).call(axis);
        g.select(".tick:first-of-type text").remove();
        g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
        g.select(".domain").remove();
    };
}

function textTween(a, b) {
    const i = d3.interpolateNumber(a, b);
    return function (t) {
        this.textContent = formatNumber(i(t));
    };
}

function labels(svg) {
    let label = svg.append("g")
        .style("font", "bold 12px var(--sans-serif)")
        .style("font-variant-numeric", "tabular-nums")
        .attr("text-anchor", "start")
        .selectAll("text");

    return ([date, data], transition) => label = label
        .data(data.slice(0, n), d => d.state)
        .join(
            enter => enter.append("text")
                .attr("transform", d => `translate(${x((prev.get(d) || d).value)},${y((prev.get(d) || d).rank)})`)
                .attr("y", y.bandwidth() / 2)
                .attr("x", 6)
                .attr("dy", "-0.25em")
                .text(d => d.state)
                .call(text => text.append("tspan")
                    .attr("fill-opacity", 0.7)
                    .attr("font-weight", "normal")
                    .attr("x", 6)
                    .attr("dy", "1.15em")),
            update => update,
            exit => exit.transition(transition).remove()
                .attr("transform", d => `translate(${x((next.get(d) || d).value)},${y((next.get(d) || d).rank)})`)
                .call(g => g.select("tspan").tween("text", d => textTween(d.value, (next.get(d) || d).value)))
        )
        .call(bar => bar.transition(transition)
            .attr("transform", d => `translate(${x(d.value)},${y(d.rank)})`)
            .call(g => g.select("tspan").tween("text", d => textTween((prev.get(d) || d).value, d.value))));
}

function bars(svg) {
    let bar = svg.append("g")
        .attr("fill-opacity", 0.8)
        .selectAll("rect");

    return ([date, data], transition) => bar = bar
        .data(data.slice(0, n), d => d.state)
        .join(
            enter => enter.append("rect")
                .attr("fill", color)
                .attr("height", y.bandwidth())
                .attr("x", x(0))
                .attr("y", d => y((prev.get(d) || d).rank))
                .attr("width", d => x((prev.get(d) || d).value) - x(0)),
            update => update,
            exit => exit.transition(transition).remove()
                .attr("y", d => y((next.get(d) || d).rank))
                .attr("width", d => x((next.get(d) || d).value) - x(0))
        )
        .call(bar => bar.transition(transition)
            .attr("y", d => y(d.rank))
            .attr("width", d => x(d.value) - x(0)));
}

function rank(value) {
    //console.log("Names: "+JSON.stringify(names));
    const data = Array.from(names, state => ({ state, value: value(state) }));
    data.sort((a, b) => d3.descending(a.value, b.value));
    for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
    return data;
}



function processData(data) {

    var dateArray = d3.timeDays(new Date(2020, 2, 1), new Date(2020, 12, 31));
    let columns = [];
    dateArray.forEach(item => {
        let tmpDate = (item.getMonth() + 1) + "/" + item.getDate() + "/" + item.getFullYear().toString().substr(-2);
        columns.push(tmpDate);
    })

    let barRaceData = [];
    let stateKeys = Array.from(data.keys());
    stateKeys.forEach(stateName => {

        let countyMap = data.get(stateName);
        let countyKey = Array.from(countyMap.keys());
        columns.forEach(date => {
            let covidCount = 0;
            countyKey.forEach(countyName => {
                let covidArray = countyMap.get(countyName);
                covidArray.forEach(covidObj => {
                    if (covidObj.key == date) {
                        covidCount = covidCount + covidObj.covidCases;
                    }
                }
                )
            })
            let barRaceObj = {
                date: date,
                state: stateName,
                value: covidCount
            }
            barRaceData.push(barRaceObj);
        })

    })
    console.log("Bar Race Data: " + JSON.stringify(barRaceData));

    dateArray.forEach(item => {
        let oldFormat = (item.getMonth() + 1) + "/" + item.getDate() + "/" + item.getFullYear().toString().substr(-2);
        barRaceData.forEach(covidObj => {
            if (covidObj.date == oldFormat) {
                covidObj.date = item;
            }
        })
    })

    console.log("Bar Race Data: " + JSON.stringify(barRaceData));
    return barRaceData;

}