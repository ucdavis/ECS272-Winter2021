import * as d3 from "d3";



export function drawPieChart(id, data) {

    var carCharc = ["mpg", "cyl", "disp", "hp", "dart", "wt", "qsec", "gear", "carb"];

    d3.csv(fileName, function(error, data) {
        var carNames = {};
        data.forEach(function(d) {
            var name = d.name;
            carNames[name] = [];
            carCharc.forEach(function(field) {
                carNames[name].push( +d[field] );
            });
        });
        makeVis(carNames); 
    });

    var makeVis = function(cerealMap) {
        // Define dimensions of vis
        var width = 960,
            height = 500,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.category20();    

        // Make x scale
        var xScale = d3.scale.ordinal()
            .domain(nutritionFields)
            .rangeRoundBands([0, width], 0.1);

        // Make y scale, the domain will be defined on bar update
        var yScale = d3.scale.linear()
            .range([height, 0]);

        // Create canvas
        var canvas = d3.select("#vis-container")
          .append("svg")
            .attr("width",  width  + margin.left + margin.right)
            .attr("height", height + margin.top  + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Make x-axis and add to canvas
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        canvas.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Make y-axis and add to canvas
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        var yAxisHandleForUpdate = canvas.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        yAxisHandleForUpdate.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Value");

        var updateBars = function(data) {
            // First update the y-axis domain to match data
            yScale.domain( d3.extent(data) );
            yAxisHandleForUpdate.call(yAxis);

            var bars = canvas.selectAll(".bar").data(data);

            // Add bars for new data
            bars.enter()
              .append("rect")
                .attr("class", "bar")
                .attr("x", function(d,i) { return xScale( nutritionFields[i] ); })
                .attr("width", xScale.rangeBand())
                .attr("y", function(d,i) { return yScale(d); })
                .attr("height", function(d,i) { return height - yScale(d); });

            // Update old ones, already have x / width from before
            bars
                .transition().duration(250)
                .attr("y", function(d,i) { return yScale(d); })
                .attr("height", function(d,i) { return height - yScale(d); });

            // Remove old ones
            bars.exit().remove();
        };

        // Handler for dropdown value change
        var dropdownChange = function() {
            var newCereal = d3.select(this).property('value'),
                newData   = cerealMap[newCereal];

            updateBars(newData);
        };

        // Get names of cereals, for dropdown
        var cereals = Object.keys(cerealMap).sort();

        var dropdown = d3.select("#vis-container")
            .insert("select", "svg")
            .on("change", dropdownChange);

        dropdown.selectAll("option")
            .data(cereals)
          .enter().append("option")
            .attr("value", function (d) { return d; })
            .text(function (d) {
                return d[0].toUpperCase() + d.slice(1,d.length); // capitalize 1st letter
            });

        var initialData = cerealMap[ cereals[0] ];
        updateBars(initialData);
    };













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

export function drawBarChart(data, id) {
    var datasetBarChart = [

    ]







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




export function parallelChart(data, id) {
    var margin = { top: 30, right: 40, bottom: 20, left: 200 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var dimensions = [{
            name: "name",
            scale: d3.scale.ordinal().rangePoints([0, height]),
            type: "string"
        },
        {
            name: "mpg",
            scale: d3.scale.linear().range([0, height]),
            type: "number"
        },
        {
            name: "cyl",
            scale: d3.scale.linear().range([height, 0]),
            type: "number"
        },
        {
            name: "disp",
            scale: d3.scale.linear().range([height, 0]),
            type: "number"
        },
        {
            name: "hp",
            scale: d3.scale.linear().range([height, 0]),
            type: "number"
        },
        {
            name: "dart",
            scale: d3.scale.linear().range([height, 0]),
            type: "number"
        },
        {
            name: "wt",
            scale: d3.scale.linear().range([height, 0]),
            type: "number"
        },
        {
            name: "qsec",
            scale: d3.scale.linear().range([height, 0]),
            type: "number"
        },
        {
            name: "vs",
            scale: d3.scale.linear().range([height, 0]),
            type: "number"
        },
        {
            name: "am",
            scale: d3.scale.linear().range([height, 0]),
            type: "number"
        },
        {
            name: "gear",
            scale: d3.scale.linear().range([height, 0]),
            type: "number"
        },
        {
            name: "carb",
            scale: d3.scale.linear().range([height, 0]),
            type: "number"
        },
    ];


    var x = d3.scale.ordinal()
        .domain(dimensions.map(function(d) { return d.name; }))
        .rangePoints([0, width]);

    var line = d3.svg.line()
        .defined(function(d) { return !isNaN(d[1]); });

    var yAxis = d3.svg.axis()
        .orient("left");

    var svg = d3.select(id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dimension = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function(d) { return "translate(" + x(d.name) + ")"; });

    dimensions.forEach(function(dimension) {
        dimension.scale.domain(dimension.type === "number" ?
            d3.extent(data, function(d) { return +d[dimension.name]; }) :
            data.map(function(d) { return d[dimension.name]; }).sort());

        svg.append("g")
            .attr("class", "background")
            .selectAll("path")
            .data(data)
            .enter().append("path")
            .attr("d", draw);

        svg.append("g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(data)
            .enter().append("path")
            .attr("d", draw);

        dimension.append("g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(yAxis.scale(d.scale)); })
            .append("text")
            .attr("class", "title")
            .attr("text-anchor", "middle")
            .attr("y", -9)
            .text(function(d) { return d.name; });

        var ordinal_labels = svg.selectAll(".axis text")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);

        var projection = svg.selectAll(".background path,.foreground path")
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);

        function mouseover(d) {
            svg.classed("active", true);

            // this could be more elegant
            if (typeof d === "string") {
                projection.classed("inactive", function(p) { return p.name !== d; });
                projection.filter(function(p) { return p.name === d; }).each(moveToFront);
                ordinal_labels.classed("inactive", function(p) { return p !== d; });
                ordinal_labels.filter(function(p) { return p === d; }).each(moveToFront);
            } else {
                projection.classed("inactive", function(p) { return p !== d; });
                projection.filter(function(p) { return p === d; }).each(moveToFront);
                ordinal_labels.classed("inactive", function(p) { return p !== d.name; });
                ordinal_labels.filter(function(p) { return p === d.name; }).each(moveToFront);
            }
        }

        function mouseout(d) {
            svg.classed("active", false);
            projection.classed("inactive", false);
            ordinal_labels.classed("inactive", false);
        }

        function moveToFront() {
            this.parentNode.appendChild(this);
        }
    });

    function draw(d) {
        return line(dimensions.map(function(dimension) {
            return [x(dimension.name), dimension.scale(d[dimension.name])];
        }));
    }
}