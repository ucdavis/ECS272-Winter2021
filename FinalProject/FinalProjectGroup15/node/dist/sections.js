

/**
* scrollVis - encapsulates
* all the code for the visualization
* using reusable charts pattern:
* http://bost.ocks.org/mike/chart/
*/
var globalData;
var geoJSON = {};
var countriesOnDisplay = {}
var currProgress = 0;
countriesOnDisplay["NorthEurope"] = {
  countries: new Set(["Norway", "Finland", "Iceland", "Sweden"])
};
countriesOnDisplay["WestEurope"] = {
  countries: new Set(["Austria", "Germany", "Poland", "Latvia"])
};
countriesOnDisplay["SouthEurope"] = {
  countries: new Set(["Italy", "France", "Spain", "Greece"])
};
countriesOnDisplay["Africa"] = {
  countries: new Set(["Eritrea", "Benin", "Ghana"])
};
countriesOnDisplay["Asia"] = {
  countries: new Set(["China", "Tajikistan", "Kazakhstan", "Kyrgyzstan"])
};
countriesOnDisplay["SouthAmerica"] = {
  countries: new Set(["Paraguay", "Brazil", "Venezuela"])
};
countriesOnDisplay["Australia"] = {
  countries: new Set(["Australia"])
};

countriesOnDisplay["USA"] = {
  countries: new Set(["USA"])
};




yearsToPlot = []
for (var y = 1850; y <= 2012; y++) {
  yearsToPlot.push(y);
}

for (var i = 0; i <= 100; i++) {
  d3.select("#barSep").append("br");
}

var scrollVis = function (barChartData, mixedData, donutData, lineChartData) {

  // const COUNT_OF_PARTICLES = 50;
  //
  // d3.select('.flame')
  //     .style('--particles', COUNT_OF_PARTICLES);
  //     d3.select('.flame')
  //         .style('--particles', COUNT_OF_PARTICLES)
  //         .selectAll('span')
  //         .data(d3.range(COUNT_OF_PARTICLES))
  //         .enter()
  //         .append('span')
  //         .style('--n', (d) => d + 1)
  //         .style('--rnd', () => Math.random());


  //const tsParticles = require("tsparticles");
  tsParticles.load("tsparticles", {
    fpsLimit: 60,
    particles: {
      number: {
        value: 0,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#ff0000",
        animation: {
          enable: true,
          speed: 20,
          sync: true
        }
      },
      shape: {
        type: "image",
        options: {
          image: {
            src:
              "https://www.blog.jonnycornwell.com/wp-content/uploads/2012/07/Smoke10.png",
            width: 256,
            height: 256
          }
        }
      },
      opacity: {
        value: 0.3,
        random: false,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0,
          sync: false
        }
      },
      size: {
        value: 64,
        random: { enable: true, minimumValue: 32 },
        animation: {
          enable: false,
          speed: 20,
          minimumValue: 0.1,
          sync: false
        }
      },
      links: {
        enable: false,
        distance: 100,
        color: "#ffffff",
        opacity: 0.4,
        width: 1
      },
      life: {
        duration: {
          value: 20
        },
        count: 1
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
          acceleration: -0.5
        },
        speed: 10,
        direction: "top",
        random: false,
        straight: false,
        outModes: {
          default: "destroy",
          bottom: "none"
        },
        attract: {
          enable: true,
          distance: 300,
          rotate: {
            x: 600,
            y: 1200
          }
        }
      }
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        resize: true
      }
    },
    detectRetina: true,
    background: {
      color: "#000000"
    },
    emitters: {
      direction: "top",
      rate: {
        quantity: 50,
        delay: 0.05
      },
      size: {
        width: 100,
        height: 10
      },
      position: {
        x: 50,
        y: 110
      }
    }
  });




  let totalEmissions = getTotalEmissions(mixedData);

  // constants to define the size
  // and margins of the vis area.
  var width = 850;
  var height = 800;
  var margin = { top: 20, left: 20, bottom: 40, right: 10 };
  let barYears = [1870, 1890, 1910, 1930, 1950, 1970, 1990, 2010];

  // Keep track of which visualization
  // we are on and which was the last
  // index activated. When user scrolls
  // quickly, we want to call all the
  // activate functions that they pass.
  var lastIndex = -1;
  var activeIndex = 0;

  // Sizing for the grid visualization
  var squareSize = 6;
  var squarePad = 2;
  var numPerRow = width / (squareSize + squarePad);

  // main svg used for visualization
  var svg = null;


  // d3 selection that will be used
  // for displaying visualizations
  var g = null;
  let dv = null;

  // We will set the domain when the
  // data is processed.
  // @v4 using new scale names
  var xBarScale = d3.scaleLinear()
    .range([0, width]);

  // The bar chart display is horizontal
  // so we can use an ordinal scale
  // to get width and y locations.
  // @v4 using new scale type
  var yBarScale = d3.scaleBand()
    .paddingInner(0.08)
    .domain([0, 1, 2])
    .range([0, height - 50], 0.1, 0.1);

  // Color is determined just by the index of the bars
  var barColors = { 0: '#008080', 1: '#399785', 2: '#5AAF8C' };

  // The histogram display shows the
  // first 30 minutes of data
  // so the range goes from 0 to 30
  // @v4 using new scale name
  var xHistScale = d3.scaleLinear()
    .domain([0, 30])
    .range([0, width - 20]);

  let x = d3.scaleBand()
    .domain(d3.range(barChartData.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  //let countries = ['United States','China','India'] ;






  let xLineChart = d3.scaleUtc()
    .domain(d3.extent(lineChartData, d => d.date))
    .range([margin.left, width - margin.right]);

  let yLineChart = d3.scaleLinear()
    .domain([0, d3.max(lineChartData, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])




  let keys = ['emission', 'temp'];

  Object.keys(countriesOnDisplay).forEach(function (key) {

    countriesOnDisplay[key].minTemperature = 300;
    countriesOnDisplay[key].maxTemperature = -300;
    countriesOnDisplay[key].minCo2 = 1000000000000
    countriesOnDisplay[key].maxCo2 = 0

    geoJSON.features.forEach((c, i) => {

      if (countriesOnDisplay[key].countries.has(c.properties.name)) {
        tmpMinTemp = d3.min(c.avgTempByYear.filter(v => v != 0))
        tmpMaxTemp = d3.max(c.avgTempByYear.filter(v => v != 0))

        tmpMinCo2 = d3.min(c.co2.map(v => parseInt(v, 10)).filter(v => v != 0))
        tmpMaxCo2 = d3.max(c.co2.map(v => parseInt(v, 10)).filter(v => v != 0))

        console.log(c.properties.name, c.co2.map(v => parseInt(v, 10)).filter(v => v != 0));

        countriesOnDisplay[key].minTemperature = Math.min(countriesOnDisplay[key].minTemperature, tmpMinTemp);
        countriesOnDisplay[key].maxTemperature = Math.max(countriesOnDisplay[key].maxTemperature, tmpMaxTemp);
        countriesOnDisplay[key].minCo2 = Math.min(countriesOnDisplay[key].minCo2, tmpMinCo2);
        countriesOnDisplay[key].maxCo2 = Math.max(countriesOnDisplay[key].maxCo2, tmpMaxCo2);
      }
    });
    countriesOnDisplay[key].maxTemperature += 0.5;

    console.log(countriesOnDisplay[key]);
    countriesOnDisplay[key]['y1'] = d3.scaleLinear()
      .domain([countriesOnDisplay[key].minCo2, countriesOnDisplay[key].maxCo2])
      .rangeRound([height / 2 - margin.bottom, margin.top]);




    countriesOnDisplay[key]['y2'] = d3.scaleLinear()
      .domain([countriesOnDisplay[key].minTemperature, countriesOnDisplay[key].maxTemperature])
      .rangeRound([height / 2 - margin.bottom, margin.top]);

    countriesOnDisplay[key]['x0'] = d3.scaleBand()
      .domain(Array.from(countriesOnDisplay[key].countries))
      .rangeRound([margin.left, width - margin.right])
      .paddingInner(0.1)
    console.log(countriesOnDisplay[key]['x0']("Egypt"));
    countriesOnDisplay[key]['x1'] = d3.scaleBand()
      .domain(keys)
      .rangeRound([0, countriesOnDisplay[key]['x0'].bandwidth()])
      .padding(0.05)

  });


  let color = d3.scaleOrdinal()
    .range(["grey", "red"])


  // @v4 using new scale name
  var yHistScale = d3.scaleLinear()
    .range([height, 0]);

  let y = d3.scaleLinear()
    .domain([0, d3.max(barChartData, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top]);

  // The color translation uses this
  // scale to convert the progress
  // through the section into a
  // color value.
  // @v4 using new scale name
  var coughColorScale = d3.scaleLinear()
    .domain([0, 1.0])
    .range(['#008080', 'red']);

  // You could probably get fancy and
  // use just one axis, modifying the
  // scale, but I will use two separate
  // ones to keep things easy.
  // @v4 using new axis name
  var xAxisBar = d3.axisBottom()
    .scale(xBarScale);

  // @v4 using new axis name
  var xAxisHist = d3.axisBottom()
    .scale(xHistScale)
    .tickFormat(function (d) { return d + ' min'; });

  let xAxis = d3.axisBottom()
    .scale(x)
    .tickFormat(i => barChartData[i].name).tickSizeOuter(0);


  let xAxisLineChart = d3.axisBottom(xLineChart).ticks(15).tickSizeOuter(0);

  let yAxisLineChart = d3.axisLeft(yLineChart).tickFormat(d3.format(".1s"));

  let yAxis = d3.axisLeft()
    .scale(y)
    .ticks(null, barChartData.format).tickFormat(d3.format(".1s"));






  let xAxisCombined = d3.axisBottom(countriesOnDisplay['NorthEurope'].x0).tickSizeOuter(0);
  //let xAxisCombined = d3.axisBottom(x1).tickValues(d3.ticks(...d3.extent(x1.domain()), width / 40).filter(v => x1(v) !== undefined)).tickSizeOuter(0);

  let y1Axis = d3.axisLeft(countriesOnDisplay['NorthEurope'].y1).ticks(null, "s");

  let y2Axis = d3.axisRight(countriesOnDisplay['NorthEurope'].y2);

  /*var root = d3.stratify()
    .id(function (d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function (d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (treeMapData);
  root.sum(function (d) { return +d.value })
  d3.treemap().size([width, height]).padding(4)(root);*/

  /*let pie = d3.pie()
    .padAngle(0.005)
    .sort(null)
    .value(d => d.value);*/
  var pie = d3.pie()
    .value(function (d) { return d.value; })

  const arcs = pie(donutData);

  const radius = Math.min(width, height) / 2;

  let arc = d3.arc().innerRadius(radius * 0.67).outerRadius(radius - 1);
  //let arc = d3.arc().innerRadius(radius).outerRadius(radius);

  let donutColor = d3.scaleOrdinal()
    .domain(donutData.map(d => d.name))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), donutData.length).reverse())


  let line = d3.line()
    .defined(d => !isNaN(d.value))
    .x(d => xLineChart(d.date))
    .y(d => yLineChart(d.value));

  function transition(path) {
    path.transition()
      .duration(5000)
      .attrTween("stroke-dasharray", tweenDash)
      .on("end", () => { d3.select(this).call(transition); });
  }

  function tweenDash() {


    const l = this.getTotalLength(),
      i = d3.interpolateString("0," + l, l + "," + l);
    return function (t) { return i(t) };


  }

  //let date = new Date(2017, 11, 31);
  let targetData = lineChartData.find(d => (d.date.getMonth() + 1) == 12 && d.date.getDate() == 31 && d.date.getFullYear() == 2017);



  // When scrolling to a new section
  // the activation function for that
  // section is called.
  var activateFunctions = [];
  // If a section has an update function
  // then it is called while scrolling
  // through the section with the current
  // progress through the section.
  var updateFunctions = [];

  /**
  * chart
  *
  * @param selection - the current d3 selection(s)
  *  to draw the visualization in. For this
  *  example, we will be drawing it in #vis
  */
  var chart = function (selection) {
    selection.each(function (rawData) {
      // create svg and give it a width and height
      svg = d3.select(this).selectAll('svg').data([wordData]);
      var svgE = svg.enter().append('svg');
      // @v4 use merge to combine enter and existing selection
      svg = svg.merge(svgE);

      svg.attr('width', width + margin.left + margin.right);
      svg.attr('height', height + margin.top + margin.bottom);

      svg.append('g');


      // this group element will be used to contain all
      // other elements.
      g = svg.select('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // perform some preprocessing on raw data
      var wordData = getWords(rawData);
      // filter to just include filler words
      var fillerWords = getFillerWords(wordData);

      // get the counts of filler words for the
      // bar chart display
      var fillerCounts = groupByWord(fillerWords);
      // set the bar scale's domain
      var countMax = d3.max(fillerCounts, function (d) { return d.value; });
      xBarScale.domain([0, countMax]);

      // get aggregated histogram data

      var histData = getHistogram(fillerWords);
      // set histogram's domain
      var histMax = d3.max(histData, function (d) { return d.length; });
      yHistScale.domain([0, histMax]);

      setupVis(wordData, fillerCounts, histData);

      setupSections();
    });
  };


  /**
  * setupVis - creates initial elements for all
  * sections of the visualization.
  *
  * @param wordData - data object for each word.
  * @param fillerCounts - nested data that includes
  *  element for each filler word type.
  * @param histData - binned histogram data
  */
  var setupVis = function (wordData, fillerCounts, histData) {

    // axis
    g.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisBar);
    g.select('.x.axis').style('opacity', 0);

    g.append('g')
      .attr('class', 'y axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis);
    g.select('.y.axis').style('opacity', 0);

    g.append('g')
      .attr('class', 'y2 axis')
      .attr('transform', `translate(${width - margin.right},0)`)
      .call(y2Axis);
    g.select('.y2.axis').style('opacity', 0)


    // count openvis title
    // g.append('text')
    //     .attr('class', 'title openvis-title')
    //     .attr('x', width / 2)
    //     .attr('y', height / 3)
    //     .text('2013');

    g.append('text')
      .attr('class', 'sub-title openvis-title')
      .attr('x', width / 2)
      .attr('y', (height / 3) + (height / 5))
      .text('Climate Change');

    g.selectAll('.openvis-title')
      .attr('opacity', 0);

    g.append('text')
      .attr('class', 'co2EmissionText1')
      .attr('x', 220)
      .attr('y', (height / 2) - 200)
      .text('We emitted')
      .style('font-size', 30)
      .attr('opacity', 0);

    let tmp = [targetData.value];
    g.append('text')
      .data(tmp)
      .attr('class', 'co2EmissionCount')
      .attr('x', 200)
      .attr('y', (height / 2) - 100)
      .style('font-size', 35)
      .style('letter-spacing', 3)
      .style('fill', 'red')
      .text(0)
      .attr('opacity', 0);

    g.append('text')
      .attr('class', 'co2EmissionText2')
      .attr('x', 170)
      .attr('y', (height / 2))
      .text('tonnes of CO2 in 2017')
      .style('font-size', 30)
      .attr('opacity', 0)

    // count filler word count title
    g.append('text')
      .attr('class', 'title count-title highlight')
      .attr('x', width / 2)
      .attr('y', height / 3)
      .text('180');

    g.append('text')
      .attr('class', 'sub-title count-title')
      .attr('x', width / 2)
      .attr('y', (height / 3) + (height / 5))
      .text('Filler Words');

    g.selectAll('.count-title')
      .attr('opacity', 0);


    g.append("path")
      .datum(lineChartData)
      .attr('class', 'linechart')
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr('opacity', 0)
      .attr("d", line);

    brs = Array(50).fill(1)

    d3.select("#barChart")
      .data(brs)
      .enter()
      .append("br");
    // square grid
    // @v4 Using .merge here to ensure
    // new and old data have same attrs applied
    var squares = g.selectAll('.square').data(wordData, function (d) { return d.word; });
    var squaresE = squares.enter()
      .append('rect')
      .classed('square', true);
    squares = squares.merge(squaresE)
      .attr('width', squareSize)
      .attr('height', squareSize)
      .attr('fill', '#fff')
      .classed('fill-square', function (d) { return d.filler; })
      .attr('x', function (d) { return d.x; })
      .attr('y', function (d) { return d.y; })
      .attr('opacity', 0);

    // barchart
    // @v4 Using .merge here to ensure
    // new and old data have same attrs applied
    var bars = g.selectAll('.bar').data(fillerCounts);
    var barsE = bars.enter()
      .append('rect')
      .attr('class', 'bar');
    bars = bars.merge(barsE)
      .attr('x', 0)
      .attr('y', function (d, i) { return yBarScale(i); })
      .attr('fill', function (d, i) { return barColors[i]; })
      .attr('width', 0)
      .attr('height', yBarScale.bandwidth());

    var barText = g.selectAll('.bar-text').data(fillerCounts);
    barText.enter()
      .append('text')
      .attr('class', 'bar-text')
      .text(function (d) { return d.key + '…'; })
      .attr('x', 0)
      .attr('dx', 15)
      .attr('y', function (d, i) { return yBarScale(i); })
      .attr('dy', yBarScale.bandwidth() / 1.2)
      .style('font-size', '110px')
      .attr('fill', 'white')
      .attr('opacity', 0);

    // histogram
    // @v4 Using .merge here to ensure
    // new and old data have same attrs applied


    /*var hist = g.selectAll('.hist').data(histData);
    var histE = hist.enter().append('rect')
    .attr('class', 'hist');
    hist = hist.merge(histE).attr('x', function (d) { return xHistScale(d.x0); })
    .attr('y', height)
    .attr('height', 0)
    .attr('width', xHistScale(histData[0].x1) - xHistScale(histData[0].x0) - 1)
    .attr('fill', barColors[0])
    .attr('opacity', 0);*/


    /*var hist = g.selectAll('.hist').data(barChartData);
    var histE = hist.enter().append('rect')
    .attr('class', 'hist');
    hist = hist.merge(histE).attr('x', (d, i) => x(i))
    .attr('y', d => y(d.value))
    .attr('height', d => y(0) - y(d.value))
    .attr('width', x.bandwidth())
    .attr('fill', "steelblue")
    .attr('opacity', 0);*/

    var hist = g.selectAll('.hist').data(barChartData);
    hist.enter().append('rect')
      .attr('class', 'hist')
      .attr("fill", "steelblue")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth())
      .attr('opacity', 0);

    g.append('text')
      .attr('class', 'lineChartY')
      .attr('x', 0)
      .attr('y', 0)
      .style('font-weight', 'bold')
      .text('Annual CO₂ emissions (tonnes)')
      .attr('opacity', 0);

    g.append('text')
      .attr('class', 'lineChartX')
      .attr('x', width / 2)
      .attr('y', height)
      .style('font-weight', 'bold')
      .text('Years')
      .attr('opacity', 0);

    let  barChartTrackX = g.append('text')
      .attr('class', 'barChartTrackX')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .style('font-weight', 'bold')
      .text('Countries')
      .attr('opacity', 0);

      barChartTrackX.append('tspan').attr('x',width / 2).attr('dy','1.1em').text(' ');
      barChartTrackX.append('tspan').attr('fill','red').attr('x',width / 2-30).attr('dy','1.1em').text('Grey represents CO₂');
      barChartTrackX.append('tspan').attr('fill','grey').attr('x',width / 2-30).attr('dy','1.2em').text('Red represents Temperature');
      /*g.append("rect")
      .attr("class","legendG")
      .attr('x', width / 2)
      .attr('y', height / 2)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", "grey");*/

    g.append('text')
      .attr('class', 'barChartTrackY2')
      .attr('x', width - 150)
      .attr('y', 0)
      .style('font-weight', 'bold')
      .text('Temperature in Celsius')
      .attr('opacity', 0);

    g.append('text')
      .attr('class', 'barChartX')
      .attr('x', width / 2)
      .attr('y', height)
      .style('font-weight', 'bold')
      .text('Countries')
      .attr('opacity', 0);

    //combined bar and linechart
    //var combined = g.selectAll('.combined').data(processedCo2TempData);

    for (var i = 1; i <= 17; i++) {
      d3.select("#img")
        .append("img")
        .attr('class', 'animals')
        .attr('src', 'world/animals' + i + '.png')
        .attr('id', 'animals' + i)
        .style("display", "none")
    }







    g.append('text')
      .attr('class', 'timer')
      .attr('x', 300)
      .attr('y', 20)
      .text('1850')
      .style('font-size', 30)
      .attr('opacity', 0);




    let barheight = (height / 2) - 50;

    d3.select("#countriesToDisplay").style('opacity',0).on("change", function () {
      console.log(currProgress);
      updateCo2TempDataPerYear(currProgress);
    });

    Object.keys(countriesOnDisplay).forEach(function (groupName) {

      var x0 = countriesOnDisplay[groupName].x0;
      var x1 = countriesOnDisplay[groupName].x1;
      var y1 = countriesOnDisplay[groupName].y1;
      var y2 = countriesOnDisplay[groupName].y2;

      co2tempData = getCo2TempDataPerYear(mixedData, 1850, countriesOnDisplay[groupName]["countries"]);
      console.log(groupName, co2tempData);
      minTemperature = countriesOnDisplay[groupName].minTemperature;

      g.append("g")
        .selectAll("g")
        .data(co2tempData)
        .enter().append("g")
        .attr('class', 'outerG' + groupName)
        .attr("transform", d => `translate(${x0(d['country'])},0)`)
        .selectAll("rect")
        .data(d => keys.map(key => ({ key, value: d[key] })))
        .enter().append('rect')
        .attr('class', 'combined')
        .attr("fill", "steelblue")
        .attr("x", d => x1(d.key))
        .attr("width", x1.bandwidth())
        .attr("y", function (d) {
          if (d.key === 'emission') {
            return y1(d.value)
          }
          return y2(d.value)
        })
        .attr("height", function (d) {
          if (d.key === 'emission') {
            return (y1(0) - y1(d.value));
          }
          return (y2(minTemperature) - y2(d.value));
        })
        .attr('opacity', 0)
        .attr("fill", d => color(d.key));

      markers = [];
      countriesOnDisplay[groupName].countries.forEach((country, i) => {
        maximum = -200;
        for (var y = 1850; y <= 2012; y++) {
          item = getCo2TempDataPerYear(mixedData, y, new Set([country]))[0];
          //console.log(item.temp - maximum );
          if (item.temp - maximum > 0.25) {
            markers.push(item);
            maximum = item.temp;

          }
        }

      });

      g.append("g")
        .selectAll(".marker")
        .data(markers)
        .enter()
        .append('line')
        .attr('class', d => 'marker' + d.year)
        .attr('id', d => 'marker' + d.year + d.country)
        .attr("transform", d => `translate(${x0(d['country'])},0)`)
        .attr("stroke-width", 2)
        .attr("stroke", "black")
        .text(d => d.year)
        .attr("x1", function (d) { console.log(x0(d.country)); return x1("temp") })
        .attr("y1", d => (y2(d.temp)))
        .attr("x2", d => x1("temp") + x1.bandwidth())
        .attr("y2", d => (y2(d.temp)))
        .attr('opacity', 0);

      g.selectAll(".text")
        .data(markers)
        .enter()
        .append("text")
        .attr('class', d => 'marker' + d.year)
        .attr('id', d => 'marker' + d.year + d.country)
        .attr("transform", d => `translate(${x0(d['country'])},0 )`)
        .attr("x", function (d) { return x1("temp") })
        .attr("y", d => (y2(d.temp) - 5))
        .style('font-size', 20)
        .text(d => "" + d.year)
        .attr('opacity', 0);

    });

    // cough title
    /*g.append('text')
    .attr('class', 'sub-title cough cough-title')
    .attr('x', width / 2)
    .attr('y', 60)
    .text('cough')
    .attr('opacity', 0);

    // arrowhead from
    svg.append('defs').append('marker')
    .attr('id', 'arrowhead')
    .attr('refY', 2)
    .attr('markerWidth', 6)
    .attr('markerHeight', 4)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M 0,0 V 4 L6,2 Z');

    g.append('path')
    .attr('class', 'cough cough-arrow')
    .attr('marker-end', 'url(#arrowhead)')
    .attr('d', function () {
    var line = 'M ' + ((width / 2) - 10) + ' ' + 80;
    line += ' l 0 ' + 230;
    return line;
    })
    .attr('opacity', 0);*/

    /*let treeMap = g.append('g').attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

    let rootDiv = treeMap.selectAll('.tree').data(root.leaves());
    rootDiv.enter().append("rect")
      .attr('class', 'tree')
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "#69b3a2")
      .attr('opacity', 0);

    // and to add the text labels
    let treeText = treeMap.selectAll("textTree").data(root.leaves())
    treeText.enter().append("text")
      .attr('class', 'treeTxt')
      .attr("x", function (d) { return d.x0 + 10 })    // +10 to adjust position (more right)
      .attr("y", function (d) { return d.y0 + 20 })    // +20 to adjust position (lower)
      .text(function (d) { return d.data.name })
      .attr("font-size", "15px")
      .attr("fill", "white")
      .attr('opacity', 0);

    g.append('text')
      .attr('class', 'percent')
      .attr('x', width / 2)
      .attr('y', height / 3)
      .style('font-size', 'xxx-large')
      .text('>50%')
      .attr('opacity', 0);*/




    let donuts = g.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')').attr('class', 'donut').attr('opacity', 0);

    donuts.selectAll(".donut")
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", d => donutColor(d.data.name))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    donuts.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .enter()
      .append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .call(text => text.append("tspan")
        .attr("y", "-0.4em")
        .attr("font-size", "medium")
        .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .attr("font-weight", "bold")
        .attr("font-size", "large")
        .text(d => d.data.value.toLocaleString() + '%'));


    //map-world

    var projection = d3.geoNaturalEarth()
      .scale(width / 1.3 / Math.PI)
      .translate([width / 2, height / 2]);

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', zoomed);


    min = -0.001076
    max = 0.019911

    var colorScale = d3.scaleLinear()
      .domain([0.0001, max])
      .range(["red", "brown"])
      .interpolate(d3.interpolateRgb.gamma(2.2))

    const expScale = d3.scalePow()
      .exponent(Math.E)
      .domain([1, 112728388])
    const colorScaleExp = d3.scaleSequential(
      (d) => d3.interpolateReds(expScale(d))
    )

    const logScale = d3.scaleLog()
      .domain([1, 112728388])
    const colorScaleLog = d3.scaleSequential(
      (d) => d3.interpolateReds(logScale(d))
    )
    // Draw the map

    function zoomed() {
      g.selectAll('path') // To prevent stroke width from scaling
        .attr('transform', d3.event.transform);
    }

    function updateMAP() {
      g.selectAll("#map").remove()
      period = d3.select("#map_period").node().value;
      display = d3.select("#map_display").node().value;

      var maximum = 0;
      g.append("g")
        .call(zoom)
        .selectAll("path")
        .data(geoJSON.features)
        .enter().append("path")
        .attr("id", "map")
        .attr("fill", function (d) {
          if ("trend" in d) {
            //return colorScale(d["trend"][month]);
            if (!("trend" in d) ||
              !(display in d["trend"]) ||
              !(period in d["trend"][display]) ||
              !("m" in d["trend"][display][period])
            ) {
              return "grey"
            }

            t = d["trend"][display][period]['m'];
            if (display == "temperature") {
              if (t < -0.000001)
                return "blue";
              if (t >= -0.000001 && t <= 0.008)
                return "green";
              else {
                return "red";
                //return colorScale(t);
              }
            }
            else {
              maximum = Math.max(maximum, t);
              if (t == 0)
                return "grey";
              else if (t < 0)
                return "blue"
              else {
                return colorScaleLog(t);
              }
            }

          }
          else {
            return "grey";
          }
        })
        .attr("d", d3.geoPath()
          .projection(projection)
        )
        .style("stroke", "#fff")
        .attr('opacity', 1);
      console.log(maximum);
      if (display == "temperature") {
        g.append("circle")
          .attr("id", "map")
          //.attr("cx",200)
          //.attr("cy",130)
          .attr("r", 10)
          .style("fill", "blue")

        g.append("text")
          .attr("x", 25)
          .attr("id", "map")
          //.attr("y", 130)
          .text("Temperature is decreasing")
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle");

        g.append("circle")
          .attr("id", "map")
          //.attr("cx",200)
          .attr("cy", 30)
          .attr("r", 10)
          .style("fill", "green")

        g.append("text")
          .attr("x", 25)
          .attr("id", "map")
          .attr("y", 30)
          .text("Temperature is stable")
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle");

        g.append("circle")
          .attr("id", "map")
          //.attr("cx",200)
          .attr("cy", 60)
          .attr("r", 10)
          .style("fill", "red")

        g.append("text")
          .attr("x", 25)
          .attr("id", "map")
          .attr("y", 60)
          .text("Temperature is increasing")
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle");

        g.append("circle")
          .attr("id", "map")
          //.attr("cx",200)
          .attr("cy", 90)
          .attr("r", 10)
          .style("fill", "grey")

        g.append("text")
          .attr("x", 25)
          .attr("id", "map")
          .attr("y", 90)
          .text("Data unavailable")
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle");

      }
      else {
        const barHeight = 20;
        const barWidth = 20;
        const start = 1;
        const end = (112728388);
        const points = d3.range(start, end, 11272800)

        g.append("text")
          .attr("x", 0)
          .attr("id", "map")
          .attr("y", 10)
          .text("Co2 values(log scale) darker is more")
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle");

        g.append('g')
          .attr('id', 'map')
          //.attr('transform', 'translate(' + margin + ',' +  (2 * margin + i * 3 * barHeight) + ')')
          .selectAll('bars').data(points).enter()
          .append('rect')
          .attr('y', 0)
          .attr('x', (d, i) => i * barWidth + 250)
          .attr('width', barWidth)
          .attr('height', barHeight)
          .attr('fill', colorScaleLog)

        g.append("text")
          .attr("x", 0)
          .attr("id", "map")
          .attr("y", 40)
          .text("Co2 values is decreasing")
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle");

        g.append("circle")
          .attr("id", "map")
          .attr("cx", 250)
          .attr("cy", 40)
          .attr("r", 10)
          .style("fill", "blue")


        g.append("text")
          .attr("x", 0)
          .attr("id", "map")
          .attr("y", 80)
          .text("Data unavailable")
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle");

        g.append("circle")
          .attr("id", "map")
          .attr("cx", 250)
          .attr("cy", 80)
          .attr("r", 10)
          .style("fill", "grey")
      }


    }
    updateMAP();
    d3.select("#map_period").on("change", updateMAP);
    d3.select("#map_display").on("change", updateMAP);

    g.selectAll('#map')
      .transition()
      .duration(1000)
      .attr('opacity', 0);

    g.append('g')
      .append('image')
      .attr('class', 'conclusion')
      .attr('x', 0)
      .attr('y', 0)
      .attr('height', height)
      .attr('width', width)
      .attr('xlink:href', 'renewable_Energy.jpg')
      .attr('opacity', 0);
  };



  /**
  * setupSections - each section is activated
  * by a separate function. Here we associate
  * these functions to the sections based on
  * the section's index.
  *
  */
  var setupSections = function () {
    // activateFunctions are called each
    // time the active section changes
    activateFunctions[0] = showTitle;
    activateFunctions[1] = showCo2numbers;
    activateFunctions[2] = showLineChart;
    activateFunctions[3] = showBarChart;
    activateFunctions[4] = showTopEmitterChart;
    activateFunctions[5] = showPieChart;
    activateFunctions[6] = showMAP;
    activateFunctions[7] = showConclusion;
    //activateFunctions[4] = showHistAll;

    // updateFunctions are called while
    // in a particular section to update
    // the scroll progress in that section.
    // Most sections do not need to be updated
    // for all scrolling and so are set to
    // no-op functions.
    for (var i = 0; i < 9; i++) {
      updateFunctions[i] = function () { };
    }
    updateFunctions[3] = updateCo2TempDataPerYear;

  };

  /**
  * ACTIVATE FUNCTIONS
  *
  * These will be called their
  * section is scrolled to.
  *
  * General pattern is to ensure
  * all content for the current section
  * is transitioned in, while hiding
  * the content for the previous section
  * as well as the next section (as the
    * user may be scrolling up or down).
    *
    */

  /**
  * showTitle - initial title
  *
  * hides: count title
  * (no previous step to hide)
  * shows: intro title
  *
  */
  function showTitle() {
    g.selectAll('.count-title')
      .transition()
      .duration(0)
      .attr('opacity', 0);

    g.selectAll('.openvis-title')
      .transition()
      .duration(600)
      .attr('opacity', 1.0);

    hideyAxis();
    hidexAxis();

    g.selectAll('.hist')
      .transition()
      .duration(1000)
      .attr('opacity', 0)
      .style('opacity', 0);

    g.selectAll('.co2EmissionText1')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('.co2EmissionCount')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('.co2EmissionText2')
      .transition()
      .duration(600)
      .attr('opacity', 0);
  }

  function showCo2numbers() {

    //console.log("showCo2numbers");
    g.selectAll('.openvis-title')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('.linechart').transition().attr('opacity', 0);

    hidexAxis();
    hideyAxis();

    g.selectAll('.co2EmissionText1').transition().duration(600).attr('opacity', 1);

    g.selectAll('.co2EmissionCount').text(0);
    g.selectAll('.co2EmissionCount')
      .attr('opacity', 1)
      .transition()
      .delay(500)
      .duration(1000)
      .tween("text", function (d) {
        var node = this;
        var i = d3.interpolate(node.textContent, d);
        return function (t) {
          node.textContent = i(t);
        };
      });

    g.selectAll('.co2EmissionText2').transition().duration(600).attr('opacity', 1);


    g.selectAll('.lineChartY')
      .transition()
      .duration(600)
      .attr('opacity', 0);


    g.selectAll('.lineChartX')
      .transition()
      .duration(600)
      .attr('opacity', 0);
  }

  /**
  * showFillerTitle - filler counts
  *
  * hides: intro title
  * hides: square grid
  * shows: filler count title
  *
  */
  function showFillerTitle() {

    g.selectAll('.openvis-title')
      .transition()
      .duration(0)
      .attr('opacity', 0);

    g.selectAll('.square')
      .transition()
      .duration(0)
      .attr('opacity', 0);

    g.selectAll('.count-title')
      .transition()
      .duration(600)
      .attr('opacity', 1);

    /*g.selectAll('.myDiv')
    .duration(600)
    .style('background', '#00aced')
    .attr('opacity', 0)
    .attr('height', height)
    .attr('width', width)*/

  }

  /**
  * showGrid - square grid
  *
  * hides: filler count title
  * hides: filler highlight in grid
  * shows: square grid
  *
  */
  function showGrid() {
    g.selectAll('.count-title')
      .transition()
      .duration(0)
      .attr('opacity', 0);

    g.selectAll('.square')
      .transition()
      .duration(600)
      .delay(function (d) {
        return 5 * d.row;
      })
      .attr('opacity', 1.0)
      .attr('fill', '#ddd');
  }

  /**
  * highlightGrid - show fillers in grid
  *
  * hides: barchart, text and axis
  * shows: square grid and highlighted
  *  filler words. also ensures squares
  *  are moved back to their place in the grid
  */
  function highlightGrid() {
    hidexAxis();
    g.selectAll('.bar')
      .transition()
      .duration(600)
      .attr('width', 0);

    g.selectAll('.bar-text')
      .transition()
      .duration(0)
      .attr('opacity', 0);


    g.selectAll('.square')
      .transition()
      .duration(0)
      .attr('opacity', 1.0)
      .attr('fill', '#ddd');

    // use named transition to ensure
    // move happens even if other
    // transitions are interrupted.
    g.selectAll('.fill-square')
      .transition('move-fills')
      .duration(800)
      .attr('x', function (d) {
        return d.x;
      })
      .attr('y', function (d) {
        return d.y;
      });

    g.selectAll('.fill-square')
      .transition()
      .duration(800)
      .attr('opacity', 1.0)
      .attr('fill', function (d) { return d.filler ? '#008080' : '#ddd'; });
  }

  /**
  * showBar - barchart
  *
  * hides: square grid
  * hides: histogram
  * shows: barchart
  *
  */
  function showBar() {
    // ensure bar axis is set
    showAxis(xAxisBar);
    hideyAxis();

    g.selectAll('.square')
      .transition()
      .duration(800)
      .attr('opacity', 0);

    g.selectAll('.fill-square')
      .transition()
      .duration(800)
      .attr('x', 0)
      .attr('y', function (d, i) {
        return yBarScale(i % 3) + yBarScale.bandwidth() / 2;
      })
      .transition()
      .duration(0)
      .attr('opacity', 0);

    g.selectAll('.hist')
      .transition()
      .duration(600)
      .attr('height', function () { return 0; })
      .attr('y', function () { return height; })
      .style('opacity', 0);

    g.selectAll('.bar')
      .transition()
      .delay(function (d, i) { return 300 * (i + 1); })
      .duration(600)
      .attr('width', function (d) { return xBarScale(d.value); });

    g.selectAll('.bar-text')
      .transition()
      .duration(600)
      .delay(1200)
      .attr('opacity', 1);
  }

  function showLineChart() {

    g.selectAll('.openvis-title')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('.co2EmissionText1')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('.co2EmissionCount')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('.co2EmissionText2')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    hidexAxis();
    hideyAxis();
    hidey2Axis();
    g.selectAll('.timer').transition().attr('opacity', 0);
    g.selectAll('.combined')
      .transition()
      .duration(600)
      .attr('opacity', 0)

    yearsToPlot.forEach((y, i) => {
      d3.selectAll(".marker" + y).attr('opacity', 0);
    });


    d3.selectAll(".animals").style("display", "none");


    showXandYAxis(xAxisLineChart, yAxisLineChart, null, "Years", "CO2 Emission");

    //console.log("Showing line chart");
    g.selectAll('.linechart')
      //.transition()
      //.duration(600)
      .call(transition)
      .attr('opacity', 1);

    g.selectAll('.lineChartY')
      .transition()
      .duration(600)
      //.call(transition)
      .attr('opacity', 1);

    g.selectAll('.lineChartX')
      .transition()
      .duration(600)
      //.call(transition)
      .attr('opacity', 1);

    g.selectAll('.barChartTrackX')
      .transition()
      .duration(600)
      //.call(transition)
      .attr('opacity', 0);

    g.selectAll('.barChartTrackY2')
      .transition()
      .duration(600)
      //.call(transition)
      .attr('opacity', 0);


    g.selectAll('.hist')
      .transition()
      .duration(1000)
      .attr('opacity', 0)
      .style('opacity', 0);

  }

  /**
  * showHistPart - shows the first part
  *  of the histogram of filler words
  *
  * hides: barchart
  * hides: last half of histogram
  * shows: first half of histogram
  *
  */
  function showTopEmitterChart() {

    // switch the axis to histogram one
    g.selectAll('.timer').transition().attr('opacity', 0);
    hidey2Axis();
    showXandYAxis(xAxis, yAxis, null);


    g.selectAll('.linechart')
      .transition()
      .attr('opacity', 0);

    g.selectAll('.openvis-title')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('.combined')
      .transition()
      .duration(1000)
      .attr('opacity', 0)

    g.selectAll('.bar-text')
      .transition()
      .duration(0)
      .attr('opacity', 0);

    g.selectAll('.bar')
      .transition()
      .duration(600)
      .attr('width', 0);


    g.selectAll('.donut')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    yearsToPlot.forEach((y, i) => {
      d3.selectAll(".marker" + y).attr('opacity', 0);
    });



    d3.selectAll(".animals").style("display", "none");


    g.selectAll('.combined')
      .transition()
      .duration(1000)
      .attr('opacity', 0);

    // here we only show a bar if
    // it is before the 15 minute mark
    /*g.selectAll('.hist')
    .transition()
    .duration(600)
    .attr('y', function (d) {
    console.log("Print d.x0" + JSON.stringify(d.x0));
    return (d.x0 < 15) ? yHistScale(d.length) : height;
  })
  .attr('height', function (d) { return (d.x0 < 15) ? height - yHistScale(d.length) : 0; })
  .style('opacity', function (d) { return (d.x0 < 15) ? 1.0 : 1e-6; });*/
    g.selectAll('.hist')
      .transition()
      .duration(600)
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .style('opacity', 1.0);


    g.selectAll('.barChartTrackX')
      .transition()
      .duration(600)
      //.call(transition)
      .attr('opacity', 0);

    g.selectAll('.barChartTrackY2')
      .transition()
      .duration(600)
      //.call(transition)
      .attr('opacity', 0);

    g.selectAll('.barChartX')
      .transition()
      .duration(600)
      //.call(transition)
      .attr('opacity', 1);

    g.selectAll('.lineChartY')
      .transition()
      .duration(600)
      //.call(transition)
      .attr('opacity', 1);

    g.selectAll('.lineChartX')
      .transition()
      .duration(600)
      //.call(transition)
      .attr('opacity', 0);
  }

  /**
  * showBarChart - show all histogram
  *
  * hides: cough title and color
  * (previous step is also part of the
    *  histogram, so we don't have to hide
    *  that)
    * shows: all histogram bars
    *
    */
  function showBarChart() {

    g.selectAll('.tree')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('.percent')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('.treeTxt')
      .transition()
      .duration(600)
      .attr('opacity', 0);
    g.selectAll('.linechart')
      .transition()
      .duration(600)
      .attr('opacity', 0);



    // ensure the axis to histogram one
    //  showXAxisCombined(xAxisCombined);
    //  showXandYAxis(null, y1Axis, y2Axis);

    g.selectAll('.hist')
      .transition()
      .duration(1000)
      .attr('opacity', 0)
      .style('opacity', 0);

    g.selectAll('.donut').attr('opacity', 0);


    d3.selectAll("#animals1").style("display", "block");
    d3.selectAll("#countriesToDisplay").style("display", "block").style("opacity", 1);

    g.selectAll('.timer').transition().attr('opacity', 1);

    // g.selectAll('.combined')
    //   .transition()
    //   .duration(1000)
    //   .attr("y", function (d) {
    //     //  console.log("Displaying For Key: " + d.key)
    //     if (d.key === 'emission') {
    //       return y1(d.value)
    //     }
    //     return y2(d.value);
    //   })
    //   .attr("height", function (d) {
    //
    //     if (d.key === 'emission') {
    //       return (y1(0) - y1(d.value));
    //     }
    //     return (y2(15) - y2(d.value));
    //   })
    //   .attr('opacity', 1);

    g.selectAll('.barChartX')
      .transition()
      .duration(600)
      //.call(transition)
      .attr('opacity', 0);

    g.selectAll('.barChartTrackX')
      .transition()
      .duration(600)
      //.call(transition)
      .attr('opacity', 1);

    g.selectAll('.barChartTrackY2')
      .transition()
      .duration(600)
      //.call(transition)
      .attr('opacity', 1);

    /*g.selectAll('.cough')
    .transition()
    .duration(0)
    .attr('opacity', 0);

    // named transition to ensure
    // color change is not clobbered
    g.selectAll('.hist')
    .transition('color')
    .duration(500)
    .style('fill', '#008080');

    g.selectAll('.hist')
    .transition()
    .duration(1200)
    .attr('y', function (d) { return yHistScale(d.length); })
    .attr('height', function (d) { return height - yHistScale(d.length); })
    .style('opacity', 1.0);*/


  }


  function showMAP() {
    g.selectAll('#map')
      .transition()
      .duration(1000)
      .attr('opacity', 1);
    g.selectAll('.donut')
      .transition()
      .duration(600)
      .attr('opacity', 0);
    g.selectAll('.conclusion').attr('opacity', 0);

  }

  function showConclusion() {
    g.selectAll('#map')
      .transition()
      .duration(1000)
      .attr('opacity', 0);

    g.selectAll('.conclusion').transition()
      .duration(1000).attr('opacity', 1);
  }

  /**
  * showCough
  *
  * hides: nothing
  * (previous and next sections are histograms
    *  so we don't have to hide much here)
    * shows: histogram
    *
    */
  function showPieChart() {
    // ensure the axis to histogram one
    //showAxis(xAxisHist);


    hidexAxis();
    hideyAxis();
    hidey2Axis();
    g.selectAll('.timer').transition().attr('opacity', 0);
    g.selectAll('.combined')
      .transition()
      .duration(600)
      .attr('opacity', 0)

    g.selectAll('.stroke')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('.linechart')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('#map')
      .transition()
      .duration(600)
      .attr('opacity', 0);
    yearsToPlot.forEach((y, i) => {
      d3.selectAll(".marker" + y).attr('opacity', 0);
    });

    g.selectAll('.barline').transition(600).attr('opacity', 0);

    d3.selectAll(".animals").style("display", "none");

    g.selectAll('.hist')
      .transition()
      .duration(1000)
      .attr('opacity', 0)
      .style('opacity', 0);

    g.selectAll('.donut').data(arcs).transition()
      .duration(600)
      .attrTween("d", tweenPie)
      .attr('opacity', 1);

    function tweenPie(b) {
      console.log("pie d: " + JSON.stringify(b))
      b.innerRadius = 0;
      var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
      return function (t) { return arc(i(t)); };
    }

    /*g.selectAll('.hist')
    .transition()
    .duration(600)
    .attr('y', function (d) { return yHistScale(d.length); })
    .attr('height', function (d) { return height - yHistScale(d.length); })
    .style('opacity', 1.0);*/

    /*g.selectAll('.tree')
      .transition()
      .duration(600)
      .attr('height', function (d) {

        if ((d.y1 - d.y0) > 150) {
          return d.y1 - d.y0;
        }
        return 0;
      })
      .attr('opacity', 1);


    g.selectAll('.treeTxt')
      .transition()
      .duration(600)
      .attr('opacity', 1);

    g.selectAll('.percent')
      .transition()
      .duration(600)
      .attr('opacity', 1);*/




    for (let i = 1850; i <= 2012; i = i + 20) {
      g.selectAll('.barline_' + i).transition(600).attr('opacity', 0);
      g.selectAll('.time_' + i).transition(600).attr('opacity', 0);
    }

    g.selectAll('.barChartX')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('.lineChartY')
      .transition()
      .duration(600)
      .attr('opacity', 0);

  }

  function showTreeFull() {
    g.selectAll('.tree')
      .transition()
      .duration(600)
      .attr('height', function (d) {
        return d.y1 - d.y0;
      })
      .attr('opacity', 1);

    g.selectAll('.percent')
      .transition()
      .duration(600)
      .attr('opacity', 0);

    g.selectAll('#map')
      .transition()
      .duration(1000)
      .attr('opacity', 0);
  }

  /**
  * showAxis - helper function to
  * display particular xAxis
  *
  * @param axis - the axis to show
  *  (xAxisHist or xAxisBar)
  */
  function showAxis(axis) {
    g.select('.x.axis')
      .call(axis)
      .transition().duration(500)
      .style('opacity', 1);
  }

  function showXAxisCombined(xAxis) {
    g.select('.x.axis')
      .call(xAxis)
      .transition().duration(0)
      .attr("transform", `translate(0,${height / 2 - margin.bottom})`)
      .style('opacity', 1);
  }

  function showXandYAxis(xAxis, yAxis, yAxis2, xAxisName, yAxisName) {
    if (xAxis != null) {
      g.select('.x.axis')
        .call(xAxis)
        .transition().duration(0)
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .style('opacity', 1)
    }

    g.select('.y.axis')
      .call(yAxis)
      .transition().duration(0)
      .style('opacity', 1);

    if (yAxis2 != null) {
      g.select('.y2.axis')
        .call(yAxis2)
        .transition().duration(0)
        .style('opacity', 1);
    }
  }

  /**
  * hidexAxis - helper function
  * to hide the axis
  *
  */
  function hidexAxis() {
    g.select('.x.axis')
      .transition().duration(500)
      .style('opacity', 0);
  }

  function hideyAxis() {
    g.select('.y.axis')
      .transition().duration(500)
      .style('opacity', 0);
  }

  function hidey2Axis() {
    g.select('.y2.axis')
      .transition().duration(500)
      .style('opacity', 0);
  }

  /**
  * UPDATE FUNCTIONS
  *
  * These will be called within a section
  * as the user scrolls through it.
  *
  * We use an immediate transition to
  * update visual elements based on
  * how far the user has scrolled
  *
  */

  /**
  * updateCough - increase/decrease
  * cough text and color
  *
  * @param progress - 0.0 - 1.0 -
  *  how far user has scrolled in section
  */
  function updateCough(progress) {

    //    console.log("Calling Progress Cough: " + progress);
    g.selectAll('.cough')
      .transition()
      .duration(0)
      .attr('opacity', progress);

    g.selectAll('.hist')
      .transition('cough')
      .duration(0)
      .style('fill', function (d) {
        return (d.x0 >= 14) ? coughColorScale(progress) : '#008080';
      });
  }

  function updateHistPart(progress) {

    //      console.log("Calling Progress UpdateHistPart: " + progress);

    g.selectAll('.hist')
      .transition()
      .duration(600)
      .attr("y", d => y(d.value))
      //.attr("height", d => {console.log("Height bar: "+y(0) - y(d.value)); return (y(0) - y(d.value));})
      .attr("height", function (d) {
        //console.log(d.name+" y0 = "+y(0));
        //console.log(d.name+" yd.value = "+y(progress));
        //console.log(d.name+" y0 - yd.value = "+y(0) - y(d.value));
        return (y(0) - y(d.value));
      })
      .style('opacity', 1.0);

  }

  function updateFiller(progress) {
    g.selectAll('.fillingDiv')
      .transition()
      .duration(600)
      .style('background', '#00aced')
      .style('height', progress * 100)
      .style('width', width)
  }

  function updateCo2TempDataPerYear(progress) {
    currProgress = progress;
    name = d3.select("#countriesToDisplay").node().value;
    currentCountries = countriesOnDisplay[name];
    imageIndex = Math.ceil(progress * 17);
    d3.selectAll(".animals").style("display", "none");
    d3.selectAll("#animals" + imageIndex).style("display", "block");
    d3.selectAll("#countriesToDisplay").style("display", "block");
    let p = progress * 163;
    if (p > 1) {
      let year = Math.floor(1850 + p);
      co2tempData = getCo2TempDataPerYear(mixedData, year, currentCountries["countries"]);

      g.selectAll('.timer').text(year);

      var x0 = countriesOnDisplay[name].x0;
      var x1 = countriesOnDisplay[name].x1;
      var y1 = countriesOnDisplay[name].y1;
      var y2 = countriesOnDisplay[name].y2;
      var minTemperature = countriesOnDisplay[name].minTemperature;
      var minCo2 = countriesOnDisplay[name].minCo2;
      y1Axis = d3.axisLeft(y1).ticks(null, "s");

      y2Axis = d3.axisRight(y2);

      xAxisCombined = d3.axisBottom(x0).tickSizeOuter(0);

      //y1Axis = d3.axisLeft(y1).ticks(null, "s");

      //y2Axis = d3.axisRight(y2);
      hideyAxis();
      hidey2Axis();
      hidexAxis();
      showXAxisCombined(xAxisCombined);
      showXandYAxis(null, y1Axis, y2Axis);

      d3.selectAll("rect").attr('opacity', 0);
      g.selectAll('.outerG' + name).data(co2tempData)
        .selectAll("rect")
        .data(d => keys.map(key => ({ key, value: d[key] })))
        .transition()
        .duration(100)
        .attr("y", function (d) {
          if (d.key === 'emission') {
            return y1(d.value)
          }
          return y2(d.value)
        })
        .attr("height", function (d) {
          if (d.key === 'emission') {
            return (y1(minCo2) - y1(d.value));
          }
          return (y2(minTemperature) - y2(d.value));
        })
        .attr('opacity', 1);


      yearsToPlot.forEach((y, i) => {
        d3.selectAll(".marker" + y).attr('opacity', 0);
      });
      yearsToPlot.forEach((y, i) => {
        if (y <= parseInt(year, 10)) {
          currentCountries.countries.forEach((c, i) => {
            d3.selectAll("#marker" + y + c).attr('opacity', 1);
          });
        }
      });

      if (d3.set(barYears).has(year)) {
        g.selectAll('.barline_' + year).transition(600).attr('opacity', 1);
        g.selectAll('.time_' + year).transition(600).attr('opacity', 1);
      }

      /*
      >>>>>>> 04a06a807165945df1b9732f3a4c4591a0d75a83
      g.selectAll('.combined')
      .transition()
      .duration(100)
      .attr("y", function (d) {
      <<<<<<< HEAD
      console.log("Displaying For Key: " + d.key +" "+d.value)
      =======
      //    console.log("Displaying For Key: " + d.key)
      >>>>>>> 04a06a807165945df1b9732f3a4c4591a0d75a83
      if (d.key === 'emission') {
      return y1(d.value)
    }
    return y2(d.value)
  })
  .attr("height", function (d) {
  console.log("Plotting For Key: " + d.key +" "+(y2(0) - y2(d.value)))
  if (d.key === 'emission') {
  return (y1(0) - y1(d.value));
}
return (y2(0) - y2(d.value));
})
.attr('opacity', 1);
*/


    }


  }

  function updateTreeFull(progress) {
    console.log("Progress: " + progress);
  }

  /**
  * DATA FUNCTIONS
  *
  * Used to coerce the data into the
  * formats we need to visualize
  *
  */

  /**
  * getWords - maps raw data to
  * array of data objects. There is
  * one data object for each word in the speach
  * data.
  *
  * This function converts some attributes into
  * numbers and adds attributes used in the visualization
  *
  * @param rawData - data read in from file
  */
  function getWords(rawData) {
    return rawData.map(function (d, i) {
      // is this word a filler word?
      d.filler = (d.filler === '1') ? true : false;
      // time in seconds word was spoken
      d.time = +d.time;
      // time in minutes word was spoken
      d.min = Math.floor(d.time / 60);

      // positioning for square visual
      // stored here to make it easier
      // to keep track of.
      d.col = i % numPerRow;
      d.x = d.col * (squareSize + squarePad);
      d.row = Math.floor(i / numPerRow);
      d.y = d.row * (squareSize + squarePad);
      return d;
    });
  }

  /**
  * getFillerWords - returns array of
  * only filler words
  *
  * @param data - word data from getWords
  */
  function getFillerWords(data) {
    return data.filter(function (d) { return d.filler; });
  }

  /**
  * getHistogram - use d3's histogram layout
  * to generate histogram bins for our word data
  *
  * @param data - word data. we use filler words
  *  from getFillerWords
  */
  function getHistogram(data) {
    // only get words from the first 30 minutes
    var thirtyMins = data.filter(function (d) { return d.min < 30; });
    // bin data into 2 minutes chuncks
    // from 0 - 31 minutes
    // @v4 The d3.histogram() produces a significantly different
    // data structure then the old d3.layout.histogram().
    // Take a look at this block:
    // https://bl.ocks.org/mbostock/3048450
    // to inform how you use it. Its different!
    return d3.histogram()
      .thresholds(xHistScale.ticks(10))
      .value(function (d) { return d.min; })(thirtyMins);
  }

  /**
  * groupByWord - group words together
  * using nest. Used to get counts for
  * barcharts.
  *
  * @param words
  */
  function groupByWord(words) {
    return d3.nest()
      .key(function (d) { return d.word; })
      .rollup(function (v) { return v.length; })
      .entries(words)
      .sort(function (a, b) { return b.value - a.value; });
  }

  /**
  * activate -
  *
  * @param index - index of the activated section
  */
  chart.activate = function (index) {
    activeIndex = index;
    var sign = (activeIndex - lastIndex) < 0 ? -1 : 1;
    var scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(function (i) {
      activateFunctions[i]();
    });
    lastIndex = activeIndex;
  };

  /**
  * update
  *
  * @param index
  * @param progress
  */
  chart.update = function (index, progress) {
    updateFunctions[index](progress);
  };

  // return chart function
  return chart;
};


/**
* display - called once data
* has been loaded.
* sets up the scroller and
* displays the visualization.
*
* @param data - loaded tsv data
*/
async function display(data, co2CSV, tempCSV) {

  //let csvData = await d3.csv('co2_emission.csv');

  let processedData = await getProcessData(co2CSV);
  let mixedData = await getMixedChartData(tempCSV);
  let donutData = await getDonutData(co2CSV);
  let lineChartData = await getLineChartData(co2CSV);

  // create a new plot and
  // display it
  var plot = scrollVis(processedData, mixedData, donutData, lineChartData);
  d3.select('#vis')
    .datum(data)
    .call(plot);

  // setup scroll functionality
  var scroll = scroller()
    .container(d3.select('#graphic'));

  // pass in .step selection as the steps
  scroll(d3.selectAll('.step'));

  // setup event handling
  scroll.on('active', function (index) {
    // highlight current step text
    //console.log("Active Index: " + index);
    d3.selectAll('.step')
      .style('opacity', function (d, i) { return i === index ? 1 : 0.1; });

    // activate current section
    plot.activate(index);
  });

  scroll.on('progress', function (index, progress) {
    //console.log("Progress Index | Progress: " + index + " | " + progress);
    plot.update(index, progress);
  });
}

function loadTempCSV(dataTSV, co2CSV) {
  d3.json("world-110m.trends.geojson", function (tempJSON) {
    display(dataTSV, co2CSV, tempJSON);
    geoJSON = tempJSON;

  })
}

function loadCo2CSV(dataTSV) {
  d3.csv("co2_emission.csv", function (co2CSV) {
    loadTempCSV(dataTSV, co2CSV);
  })
}

// load data and display
d3.tsv('words.tsv', loadCo2CSV);

var getBarChartData = async function (data) {

  let processedData = await getProcessData(data);
  //console.log("Test: " + JSON.stringify(processedData[0]));

  return processedData;
}

getCo2TempDataPerYear = function (data, year, countries) {

  let yearData = data.get(year);
  let co2TempData = [];

  yearData.forEach(item => {

    if (countries.has(item.country)) {

      if (year == 1950) {
        //console.log("co2Temp for " + item.country + " " + JSON.stringify(item));
      }
      co2TempData.push(item);
    }
  })
  return co2TempData;
}

getTotalEmissions = function (data) {

  let year2017 = data.get(2012);
  /*year2017.forEach(item=>{
  if(item.country == "China"){
  console.log("China 2017 emission: "+item.emission);
}
})*/

  let totalEmissions = [];
  for (let i = 1850; i <= 2012; i++) {

    let yearData = data.get(i);
    yearData.forEach(item => {
      totalEmissions.push(item.emission);
    })
  }

  //let index  = totalEmissions.findIndex(d=>d == 9633899303);
  //console.log("Max val: "+d3.extent(totalEmissions));
  return totalEmissions;

}
