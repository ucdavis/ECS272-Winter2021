var formatAsPercentage = d3.format("%"),
    formatAsPercentage1Dec = d3.format(".1%"),
    formatAsInteger = d3.format(","),
    fsec = d3.time.format("%S s"),
    fmin = d3.time.format("%M m"),
    fhou = d3.time.format("%H h"),
    fwee = d3.time.format("%a"),
    fdat = d3.time.format("%d d"),
    fmon = d3.time.format("%b");

/*
############# PIE CHART ###################
-------------------------------------------
*/
function dsPieChart() {
    var dataset = [{
        category: "MPG",
        measure: 1,
        ex: "MILES PER GALLON, FUEL EFFICIENCY"
    }, {
        category: "CYL",
        measure: 1,
        ex: "CYLINDER, THE POWER UNIT OF CARS' ENGINE"
    }, {
        category: "DISP",
        measure: 1,
        ex: "DISPLACEMENT, ENGINE CAPACITY"
    }, {
        category: "HP",
        measure: 1,
        ex: "HOURSE POWER, ENGINE POWER"
    }, {
        category: "DRAT",
        measure: 1,
        ex: "REAR AXLE RATIO, NUMBER OF TURNS OF DRIVE SHAFT FOR ONE ROTATION"
    }, {
        category: "WT",
        measure: 1,
        ex: "WEIGHT, WEIGHT OF CAR"
    }, {
        category: "QSEC",
        measure: 1,
        ex: "ACCERELATION, PRIMARILY ACCERELATION"
    }, {
        category: "GEAR",
        measure: 1,
        ex: "TRANSMITTING, GEAR TRANSMIT POWER OF CAR"
    }, {
        category: "CARB",
        measure: 1,
        ex: "CARBURETOR, MIXES AIR AND FUEL FOR INTERNAL COMBUSSTION RATIO"
    }];

    var width = 360,
        height = 360,
        outerRadius = Math.min(width, height) / 2,
        innerRadius = outerRadius * 0.999,
        // for animation
        innerRadiusFinal = outerRadius * 0.5,
        innerRadiusFinal3 = outerRadius * 0.45,
        color = d3.scale.category20() //builtin range of colors
    ;

    var vis = d3.select("#pieChart")
        .append("svg:svg") //create the SVG element inside the <body>
        .data([dataset]) //associate our data with the document
        .attr("width", width) //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", height)
        .append("svg:g") //make a group to hold our pie chart
        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")") //move the center of the pie chart from 0, 0 to radius, radius
    ;

    var arc = d3.svg.arc() //this will create <path> elements for us using arc data
        .outerRadius(outerRadius).innerRadius(innerRadius);

    // for animation
    var arcFinal = d3.svg.arc().innerRadius(innerRadiusFinal).outerRadius(outerRadius);
    var arcFinal3 = d3.svg.arc().innerRadius(innerRadiusFinal3).outerRadius(outerRadius);

    var pie = d3.layout.pie() //this will create arc data for us given a list of values
        .value(function(d) {
            return d.measure;
        }); //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice") //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie) //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter() //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g") //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice") //allow us to style things in the slices (like text)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("click", up);

    arcs.append("svg:path")
        .attr("fill", function(d, i) {
            return d.data.ex, color(i);
        }) //set the color for each slice to be chosen from the color function defined above
        .attr("d", arc) //this creates the actual SVG path using the associated data (pie) with the arc drawing function
        .append("svg:title")
        .attr("fill", "#69b3a2") //mouseover title showing the figures
        .text(function(d) {
            return d.data.ex;
        });

    d3.selectAll("g.slice").selectAll("path").transition()
        .duration(750)
        .delay(3)
        .attr("d", arcFinal);

    // Add a label to the larger arcs, translated to the arc centroid and rotated.
    // source: http://bl.ocks.org/1305337#index.html
    arcs.filter(function(d) {
            return d.endAngle - d.startAngle > 0.2;
        })
        .append("svg:text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + arcFinal.centroid(d) + ")rotate(" + angle(d) + ")";
        })
        //.text(function(d) { return formatAsPercentage(d.value); })
        .text(function(d) {
            return d.data.category;
        });

    // Computes the label angle of an arc, converting from radians to degrees.
    function angle(d) {
        var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a - 180 : a;
    }

    // Pie chart title			
    vis.append("svg:text")
        .attr("dy", ".25em")
        .attr("text-anchor", "middle")
        .text("Car Spare Parts")
        .attr("class", "title");

    function mouseover() {
        d3.select(this).select("path").transition()
            .duration(750)
            .attr("d", arcFinal3);
    }

    function mouseout() {
        d3.select(this).select("path").transition()
            .duration(750)
            .attr("d", arcFinal);
    }

    function up(d, i) {

        updateBarChart(d.data.category, color(i));

    }
}

dsPieChart();

/*
############# BAR CHART ###################
-------------------------------------------
*/
var datasetBarChart = [{
    group: "MPG",
    category: "Mazda",
    measure: 21
}, {
    group: "MPG",
    category: "Duster",
    measure: 14.3
}, {
    group: "MPG",
    category: "Benz",
    measure: 15.2
}, {
    group: "MPG",
    category: "Toyota",
    measure: 21.5
}, {
    group: "MPG",
    category: "AMC",
    measure: 15.2
}, {
    group: "MPG",
    category: "Ferrari",
    measure: 19.7
}, {
    group: "MPG",
    category: "Maserati",
    measure: 15
}, {
    group: "CYL",
    category: "Mazda",
    measure: 6
}, {
    group: "CYL",
    category: "Duster",
    measure: 8
}, {
    group: "CYL",
    category: "Benz",
    measure: 8
}, {
    group: "CYL",
    category: "Toyota",
    measure: 4
}, {
    group: "CYL",
    category: "AMC",
    measure: 8
}, {
    group: "CYL",
    category: "Ferrari",
    measure: 6
}, {
    group: "CYL",
    category: "Maserati",
    measure: 8
}, {
    group: "DISP",
    category: "Mazda",
    measure: 160
}, {
    group: "DISP",
    category: "Duster",
    measure: 360
}, {
    group: "DISP",
    category: "Benz",
    measure: 275.8
}, {
    group: "DISP",
    category: "Toyota",
    measure: 120.1
}, {
    group: "DISP",
    category: "AMC",
    measure: 304
}, {
    group: "DISP",
    category: "Ferrari",
    measure: 145
}, {
    group: "DISP",
    category: "Maserati",
    measure: 301
}, {
    group: "HP",
    category: "Mazda",
    measure: 110
}, {
    group: "HP",
    category: "Duster",
    measure: 245
}, {
    group: "HP",
    category: "Benz",
    measure: 180
}, {
    group: "HP",
    category: "Toyota",
    measure: 97
}, {
    group: "HP",
    category: "AMC",
    measure: 150
}, {
    group: "HP",
    category: "Ferrari",
    measure: 175
}, {
    group: "HP",
    category: "Maserati",
    measure: 335
}, {
    group: "DRAT",
    category: "Mazda",
    measure: 3.9
}, {
    group: "DRAT",
    category: "Duster",
    measure: 3.21
}, {
    group: "DRAT",
    category: "Benz",
    measure: 3.07
}, {
    group: "DRAT",
    category: "Toyota",
    measure: 3.7
}, {
    group: "DRAT",
    category: "AMC",
    measure: 3.15
}, {
    group: "DRAT",
    category: "Ferrari",
    measure: 3.62
}, {
    group: "DRAT",
    category: "Maserati",
    measure: 3.54
}, {
    group: "WT",
    category: "Mazda",
    measure: 2.87
}, {
    group: "WT",
    category: "Duster",
    measure: 3.57
}, {
    group: "WT",
    category: "Benz",
    measure: 3.78
}, {
    group: "WT",
    category: "Toyota",
    measure: 2.46
}, {
    group: "WT",
    category: "AMC",
    measure: 3.43
}, {
    group: "WT",
    category: "Ferrari",
    measure: 2.77
}, {
    group: "WT",
    category: "Maserati",
    measure: 3.57
}, {
    group: "QSEC",
    category: "Mazda",
    measure: 17.02
}, {
    group: "QSEC",
    category: "Duster",
    measure: 15.84
}, {
    group: "QSEC",
    category: "Benz",
    measure: 18
}, {
    group: "QSEC",
    category: "Toyota",
    measure: 20.01
}, {
    group: "QSEC",
    category: "AMC",
    measure: 17.3
}, {
    group: "QSEC",
    category: "Ferrari",
    measure: 15.5
}, {
    group: "QSEC",
    category: "Maserati",
    measure: 14.6
}, {
    group: "GEAR",
    category: "Mazda",
    measure: 4
}, {
    group: "GEAR",
    category: "Duster",
    measure: 3
}, {
    group: "GEAR",
    category: "Benz",
    measure: 3
}, {
    group: "GEAR",
    category: "Toyota",
    measure: 3
}, {
    group: "GEAR",
    category: "AMC",
    measure: 3
}, {
    group: "GEAR",
    category: "Ferrari",
    measure: 5
}, {
    group: "GEAR",
    category: "Maserati",
    measure: 5
}, {
    group: "CARB",
    category: "Mazda",
    measure: 4
}, {
    group: "CARB",
    category: "Duster",
    measure: 4
}, {
    group: "CARB",
    category: "Benz",
    measure: 3
}, {
    group: "CARB",
    category: "Toyota",
    measure: 1
}, {
    group: "CARB",
    category: "AMC",
    measure: 2
}, {
    group: "CARB",
    category: "Ferrari",
    measure: 6
}, {
    group: "CARB",
    category: "Maserati",
    measure: 8
}];

// set initial group value
var group = "MPG";

function datasetBarChosen(group) {
    var ds = [];
    for (var x in datasetBarChart) {
        if (datasetBarChart[x].group == group) {
            ds.push(datasetBarChart[x]);
        }
    }
    return ds;
}




function dsBarChartBasics() {
    var margin = {
            top: 30,
            right: 5,
            bottom: 20,
            left: 30
        },
        width = 600 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom,
        colorBar = d3.scale.category20(),
        barPadding = 1;

    return {
        margin: margin,
        width: width,
        height: height,
        colorBar: colorBar,
        barPadding: barPadding
    };
}

function dsBarChart() {

    var firstDatasetBarChart = datasetBarChosen(group);
    var basics = dsBarChartBasics();
    var margin = basics.margin,
        width = basics.width,
        height = basics.height,
        colorBar = basics.colorBar,
        barPadding = basics.barPadding;

    var xScale = d3.scale.linear()
        .domain([0, firstDatasetBarChart.length])
        .range([0, width]);

    // Create linear y scale 
    // Purpose: No matter what the data is, the bar should fit into the svg area; bars should not
    // get higher than the svg height. Hence incoming data needs to be scaled to fit into the svg area.  
    var yScale = d3.scale.linear()
        // use the max funtion to derive end point of the domain (max value of the dataset)
        // do not use the min value of the dataset as min of the domain as otherwise you will not see the first bar
        .domain([0, d3.max(firstDatasetBarChart, function(d) {
            return d.measure;
        })])
        // As coordinates are always defined from the top left corner, the y position of the bar
        // is the svg height minus the data value. So you basically draw the bar starting from the top. 
        // To have the y position calculated by the range function
        .range([height, 0]);

    //Create SVG element

    var svg = d3.select("#barChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("id", "barChartPlot");

    var plot = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    plot.selectAll("rect")
        .data(firstDatasetBarChart)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("width", width / firstDatasetBarChart.length - barPadding)
        .attr("y", function(d) {
            return yScale(d.measure);
        })
        .attr("height", function(d) {
            return height - yScale(d.measure);
        })
        .attr("fill", "gray");


    // Add y labels to plot	

    plot.selectAll("text")
        .data(firstDatasetBarChart)
        .enter()
        .append("text")
        .text(function(d) {
            return formatAsInteger(d3.round(d.measure));
        })
        .attr("text-anchor", "middle")
        // Set x position to the left edge of each bar plus half the bar width
        .attr("x", function(d, i) {
            return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
        })
        .attr("y", function(d) {
            return yScale(d.measure) + 14;
        })
        .attr("class", "yAxis");

    // Add x labels to chart	
    var xLabels = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")");



    xLabels.selectAll("text.xAxis")
        .data(firstDatasetBarChart)
        .enter()
        .append("text")
        .text(function(d) {
            return d.category;
        })
        .style("text-anchor", "middle")
        // Set x position to the left edge of each bar plus half the bar width
        .attr("x", function(d, i) {
            return (i * (width / firstDatasetBarChart.length)) + ((width / firstDatasetBarChart.length - barPadding) / 2);
        })
        .attr("y", 15)
        .attr("dx", "-1.5em")
        .attr("class", "xAxis")
        .attr("style", "font-size: 12; font-family: Helvetica, sans-serif");
    // Title

    svg.append("text")
        .attr("x", (width + margin.left + margin.right) / 2)
        .attr("y", 15)
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text("CARS' MPG INFORMATION COMPARISON");
}

dsBarChart();

/* ** UPDATE CHART ** */

/* updates bar chart on request */

function updateBarChart(group, colorChosen) {
    var currentDatasetBarChart = datasetBarChosen(group);

    var basics = dsBarChartBasics();

    var margin = basics.margin,
        width = basics.width,
        height = basics.height,
        colorBar = basics.colorBar,
        barPadding = basics.barPadding;

    var xScale = d3.scale.linear()
        .domain([0, currentDatasetBarChart.length])
        .range([0, width]);


    var yScale = d3.scale.linear()
        .domain([0, d3.max(currentDatasetBarChart, function(d) {
            return d.measure;
        })])
        .range([height, 0]);

    var svg = d3.select("#barChart svg");

    var plot = d3.select("#barChartPlot")
        .datum(currentDatasetBarChart);

    /* Note that here we only have to select the elements - no more appending! */
    plot.selectAll("rect")
        .data(currentDatasetBarChart)
        .transition()
        .duration(750)
        .attr("x", function(d, i) {
            return xScale(i);
        })
        .attr("width", width / currentDatasetBarChart.length - barPadding)
        .attr("y", function(d) {
            return yScale(d.measure);
        })
        .attr("height", function(d) {
            return height - yScale(d.measure);
        })
        .attr("fill", colorChosen);

    plot.selectAll("text.yAxis") // target the text element(s) which has a yAxis class defined
        .data(currentDatasetBarChart)
        .transition()
        .duration(750)
        .attr("text-anchor", "middle")
        .attr("x", function(d, i) {
            return (i * (width / currentDatasetBarChart.length)) + ((width / currentDatasetBarChart.length - barPadding) / 2);
        })
        .attr("y", function(d) {
            return yScale(d.measure) + 14;
        })
        .text(function(d) {
            return formatAsInteger(d3.round(d.measure));
        })
        .attr("class", "yAxis");


    svg.selectAll("text.title") // target the text element(s) which has a title class defined
        .attr("x", (width + margin.left + margin.right) / 2)
        .attr("y", 15)
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .text("CARS' " + group + " INFORMATION COMPARISON");
}






var data = [{
    NAME: "MAZDA",
    MPG: 21,
    CYL: 6,
    DISP: 160,
    HP: 110,
    DRAT: 3.9,
    WT: 2.875,
    QSEC: 17.02,
    GEAR: 4,
    CARB: 4
}, {
    NAME: "DUSTER",
    MPG: 14.3,
    CYL: 8,
    DISP: 360,
    HP: 245,
    DRAT: 3.21,
    WT: 3.57,
    QSEC: 15.84,
    GEAR: 3,
    CARB: 4
}, {
    NAME: "BENZ",
    MPG: 15.2,
    CYL: 8,
    DISP: 275.8,
    HP: 180,
    DRAT: 3.07,
    WT: 3.78,
    QSEC: 18,
    GEAR: 3,
    CARB: 3
}, {
    NAME: "TOYOTA",
    MPG: 21.5,
    CYL: 4,
    DISP: 120.1,
    HP: 97,
    DRAT: 3.7,
    WT: 2.465,
    QSEC: 20.01,
    GEAR: 3,
    CARB: 1
}, {
    NAME: "AMC",
    MPG: 15.2,
    CYL: 8,
    DISP: 304,
    HP: 150,
    DRAT: 3.15,
    WT: 3.435,
    QSEC: 17.3,
    GEAR: 3,
    CARB: 2
}, {
    NAME: "FERRARI",
    MPG: 19.7,
    SYL: 6,
    DISP: 145,
    HP: 175,
    DRAT: 3.62,
    WT: 2.77,
    QSEC: 15.5,
    GEAR: 5,
    CARB: 6
}, {
    NAME: "MASERATI",
    MPG: 15,
    CYL: 8,
    DISP: 301,
    HP: 335,
    DRAT: 3.54,
    WT: 3.57,
    QSEC: 14.6,
    GEAR: 5,
    CARB: 8
}];


var pc1 = d3.parcoords()("#example1")
    .data(data)
    .composite("darken")
    .margin({ top: 100, left: 50, bottom: 20, right: 0 })
    .alpha(0.35)
    .render()
    .brushMode("1D-axes") // enable brushing
    .interactive(); // command line mode

var explore_count = 0;
var exploring = {};
var explore_start = false;
pc1.svg
    .selectAll(".dimension")
    .style("cursor", "pointer")
    .on("click", function(d) {
        exploring[d] = d in exploring ? false : true;
        event.preventDefault();
        if (exploring[d]) d3.timer(explore(d, explore_count));
    });

function explore(dimension, count) {
    if (!explore_start) {
        explore_start = true;
        d3.timer(pc1.brush);
    }
    var speed = (Math.round(Math.random()) ? 1 : -1) * (Math.random() + 0.5);
    return function(t) {
        if (!exploring[dimension]) return true;
        var domain = pc1.yscale[dimension].domain();
        var width = (domain[1] - domain[0]) / 4;

        var center = width * 1.5 * (1 + Math.sin(speed * t / 1200)) + domain[0];

        pc1.yscale[dimension].brush.extent([
            d3.max([center - width * 0.01, domain[0] - width / 400]),
            d3.min([center + width * 1.01, domain[1] + width / 100])
        ])(pc1.g()
            .filter(function(d) {
                return d == dimension;
            })
        );
    };
}