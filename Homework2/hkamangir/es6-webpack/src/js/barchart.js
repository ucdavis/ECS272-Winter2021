import * as d3 from "d3";
import csvPath from '../assets/data/cars.csv';


function drawBarFromCsv() {
    //async method
    d3.csv(csvPath).then((data) => {
        // array of objects
        console.log(data.length);
        console.log(data);
        // do something with the data (e.g process and render chart)
        //  const pData = processData();
        //  drawBarChart(pData, id);
        //(data will only exist inside here since it is an async call to read in data) so all rendering and processsing with data has to occur inside the "then"
    });
}
/* 
    Same as the one above but we made the function itself asynch so we can use await
    The two do the same thing essentially but it is cleaner to read
*/
export async function drawBarFromCsvAsync() {
    const data = await d3.csv(csvPath);
    console.log(data);
    //process data()
    //draw chart ()
    //There will be some delay in console before it prints the array
}


export function drawPieChart(id, data) {

    //const data = {a: 9, b: 20, c:30, d:8, e:12}
    // set the dimensions and margins of the graph
    const margin = 40;
    const height = 450;
    const width = 450;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    const radius = 300;

    // append the svg object to the div called 'my_dataviz'
    const svg = d3.select(id).append("svg")
        .attr("background", black)
        .attr("width", width)
        .attr("height", height);


    const g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")


    // set the color scale
    const color = d3.scaleOrdinal()
        .domain(data)
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

    // Compute the position of each group on the pie:
    const pie = d3.pie()
        .value(d => d.value)

    //const data_ready = pie(d3.entries(data))
    const path = d3.arc().outerRadius(radius).innerRadius(50);
    const pies = g.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');


    pies.append('path').attr('d', path).attr('fill', d => color(d.data.value));

}

export function drawBarChartE(data, id) {

    const margin = { top: 40, right: 40, bottom: 120, left: 40 };
    const height = 300;
    const width = 700;

    const x = d3.scaleBand().domain(data.map(d => d.x))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.x))
        .attr("y", d => y(d.y))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.y) - margin.bottom)
        .attr("fill", "green");

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        .attr("font-weight", "bold");

    svg.append("g")
        .call(yAxis)
        .call(g => g.select(".tick:last-of-type text")
            .clone()
            .attr("transform", `rotate(-90)`)
            .attr("text-anchor", "middle")
            .attr("x", -(15 - margin.top - margin.bottom) / 2)
            .attr("y", -80)
            .attr("font-weight", "bold"))
}


export function drawBarChartSecond(data, id) {

    const margin = { top: 40, right: 40, bottom: 120, left: 40 };
    const height = 300;
    const width = 700;

    const x = d3.scaleBand().domain(data.map(d => d.x))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).nice()
        .rangeRound([height - margin.bottom, margin.top]);

    let svg = d3.select(id).append("svg")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", d => x(d.x))
        .attr("y", d => y(d.y))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.y) - margin.bottom)
        .attr("fill", "green");

    const xAxis = g => g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))

    const yAxis = g => g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        .attr("font-weight", "bold");

    svg.append("g")
        .call(yAxis)
        .call(g => g.select(".tick:last-of-type text")
            .clone()
            .attr("transform", `rotate(-90)`)
            .attr("text-anchor", "middle")
            .attr("x", -(15 - margin.top - margin.bottom) / 2)
            .attr("y", -80)
            .attr("font-weight", "bold"))
}