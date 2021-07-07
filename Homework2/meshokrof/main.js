var allData=[];
var plotData=[];
var selectedGenres=['florida rap', 'comedy rap', 'jazz rap', 'country rap'];
var allGenres=[];
var genresFill={'':"black"};
var windowHeight=720;
var windowWidth=1080;
var pWidth=0;
var pHeight=0;
var hWidth=0;
var hHeight=0;
var tWidth=0;
var tHeight=0;
//write a function to get the color of the selected genres from the array and use it in the parallel coordinate
function getColor(genres)
{
  var g='';
  genres.forEach((item, i) => {
    if(selectedGenres.includes(item))
      g=item;
  });

  return genresFill[g];

}
function plotTreeMap() {
  d3.select("#treeMap").select("svg").remove();
  // set the dimensions and margins of the graph
  var marginUnitW=10,
  marginUnitH=10;
  var margin = {top: 10, right: 10, bottom: 10, left: 10};
  var width= tWidth;
  var height= tHeight;
  //  width = width - margin.left - margin.right;
  //  height = height - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#treeMap")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");
  var genres= {};
  selectedGenres.forEach((item, i) => {
    genres[item]=0;
  });

  plotData.forEach((item, i) => {
    item['genres'].forEach((item2, i2) => {
      if(item2 in genres)
      genres[item2]+=1;
    });

  });
  genres=Object.keys(genres).map(function(key) {
    return [key, genres[key]];
  });
  genres.sort(function (a, b) {
    return b[1] - a[1];
  });

  myWords=[{word:"Origin",parent: ""}];
  //myWords=[{word:"Origin",parent: ""},{word:"Rest",parent: "Origin", size: ""+others}];
  genres.forEach((item, i) => {
    myWords.push({
      word : item[0],
      size : ""+item[1],
      parent : "Origin"
    })
  });
  // stratify the data: reformatting for d3.js
  var root = d3.stratify()
  .id(function(d) { return d.word; })   // Name of the entity (column name is name in csv)
  .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
  (myWords);
  root.sum(function(d) { return +d.size });   // Compute the numeric value for each entity


  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3.treemap()
  .size([width, height])
  .padding(2)
  (root);

  var fill =  d3.scaleSequential()
  .domain([0,myWords.length])
  .interpolator(d3.interpolateMagma);

  fill=d3.scaleSequential(d3.interpolateSinebow).domain([0,myWords.length]);
  myWords.forEach((item, i) => {
    genresFill[item.word]=fill(i-1);
  });

  // use this information to add rectangles:
  svg
  .selectAll("rect")
  .data(root.leaves())
  .enter()
  .append("rect")
  .attr('x', function (d) { return d.x0; })
  .attr('y', function (d) { return d.y0; })
  .attr('width', function (d) { return d.x1 - d.x0; })
  .attr('height', function (d) { return d.y1 - d.y0; })
  .style("stroke", "black")
  .style("fill", function(d, i) { return fill(i); });

  // and to add the text labels
  svg
  .selectAll("text")
  .data(root.leaves())
  .enter()
  .append("text")
  .attr("x", function(d){ return d.x0+10})    // +10 to adjust position (more right)
  .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
  .text(function(d){ return d.data.word})
  .attr("font-size", "9px")
  .attr("fill", "white");


}

function plotParallelCoordinate () {
  // set the dimensions and margins of the graph
  var margin = {top: 30, right: 10, bottom: 10, left: 0};
  var width= pWidth;
  var height= pHeight;


  width = width - margin.left - margin.right,
  height = height - margin.top - margin.bottom;

  // append the svg object to the body of the page
  // var svg = d3.select("#Parallel")
  // .append("svg")
  // .attr("width", width + margin.left + margin.right)
  // .attr("height", height + margin.top + margin.bottom)
  // .append("g")
  // .attr("transform",
  // "translate(" + margin.left + "," + margin.top + ")");

  function updateParallel(){
    d3.select("#Parallel").select("svg").remove();
    var svg = d3.select("#Parallel")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");
    dimensions = ['acousticness', 'danceability', 'energy', 'instrumentalness','liveness'];
    dimensions[0] = d3.select("#parallel_coordinate_1").node().value;
    dimensions[1] = d3.select("#parallel_coordinate_2").node().value;
    dimensions[2] = d3.select("#parallel_coordinate_3").node().value;
    dimensions[3] = d3.select("#parallel_coordinate_4").node().value;
    dimensions[4] = d3.select("#parallel_coordinate_5").node().value;
    // For each dimension, I build a linear scale. I store all in a y object
    var y = {}
    for (i in dimensions) {
      name = dimensions[i]
      y[name] = d3.scaleLinear()
      .domain( d3.extent(plotData, function(d) { return +d[name]; }) )
      .range([height, 0])
    }

    // Build the X scale -> it find the best position for each Y axis
    x = d3.scalePoint()
    .range([0, width])
    .padding(1)
    .domain(dimensions);

    // The path function take a row of the csv as input, and return x and y coordinates of the line to draw for this raw.
    function path(d) {
      return d3.line()(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

    // Draw the lines
    svg
    .selectAll("myPath")
    .data(plotData)
    .enter().append("path")
    .attr("d",  path)
    .style("fill", "none")
    .style("stroke",function(d) {return getColor(d.genres); })
    .style("opacity", 0.5)

    // Draw the axis:
    svg.selectAll("myAxis")
    // For each dimension of the dataset I add a 'g' element:
    .data(dimensions).enter()
    .append("g")
    // I translate this element to its right position on the x axis
    .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
    // And I build the axis with the call function
    .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
    // Add axis title
    .append("text")
    .style("text-anchor", "middle")
    .attr("y", -9)
    .text(function(d) { return d; })
    .style("fill", "black")
  }
  updateParallel();
  d3.select("#parallel_coordinate_1").on("change", updateParallel);
  d3.select("#parallel_coordinate_2").on("change", updateParallel);
  d3.select("#parallel_coordinate_3").on("change", updateParallel);
  d3.select("#parallel_coordinate_4").on("change", updateParallel);
  d3.select("#parallel_coordinate_5").on("change", updateParallel);


}

function plotHistogram() {
  d3.select("#histogram").select("svg").remove();
  var margin = {top: 10, right: 30, bottom: 30, left: 40};
  var width= hWidth;
  var height= hHeight;
  width = width - margin.left - margin.right;
  height = height - margin.top - margin.bottom;
  //

  // var tooltip = d3.select("#histogram")
  // .append("div")
  // .style("opacity", 0)
  // .attr("class", "tooltip")
  // .style("background-color", "black")
  // .style("color", "white")
  // .style("border-radius", "5px")
  // .style("padding", "10px")

  // append the svg object to the body of the page
  var svg = d3.select("#histogram")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");


  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Count");  
  // X axis: scale and draw:

  // X axis: scale and draw:
  var x = d3.scaleLinear()
  .domain([0,1])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
  .range([0, width]);
  var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

  // Y axis: initialization
  var y = d3.scaleLinear()
  .range([height, 0]);
  var yAxis = svg.append("g")

  // A function that builds the graph for a specific value of bin
  function update() {
    attribute=d3.select("#Hist_attribute").node().value;
    nBin=d3.select("#nBin").node().value;
    wholeData=d3.select("#histWholeData").property("checked");
    histData=plotData;
    if(wholeData)
    histData=allData;
    x.domain([0, d3.max(histData, function(d) { return +d[attribute];})])
    // set the parameters for the histogram
    var histogram = d3.histogram()
    .value(function(d) { return d[attribute]; })   // I need to give the vector of value
    .domain(x.domain())  // then the domain of the graphic
    .thresholds(x.ticks(nBin)); // then the numbers of bins

    // And apply this function to data to get the bins
    var bins = histogram(histData);


    // Y axis: update now that we know the domain
    y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously

    xAxis
    .transition()
    .duration(1000)
    .call(d3.axisBottom(x));
    yAxis
    .transition()
    .duration(1000)
    .call(d3.axisLeft(y));

    // Join the rect with the bins data
    var u = svg.selectAll("rect")
    .data(bins)

    // Manage the existing bars and eventually the new ones:
    u
    .enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u) // get the already existing elements as well
    .transition() // and apply changes to all of them
    .duration(1000)
    .attr("x", 1)
    .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
    .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
    .attr("height", function(d) { return height - y(d.length); })
    .style("fill", "#69b3a2")



    // If less bar in the new histogram, I delete the ones not in use anymore
    u
    .exit()
    .remove()

  }


  // Initialize with 20 bins
  update(20,"acousticness");


  // Listen to the button -> update if user change it
  d3.select("#nBin").on("input", update);
  d3.select("#Hist_attribute").on("change", update);
  d3.select("#histWholeData").on("change", update);

}


function plot(){
  d3.selectAll("#genres").select("ul").remove();
  d3.selectAll("#genres")
  .append("ul")
  .selectAll("li")
  .data(selectedGenres)
  .enter()
  .append()
  .text(function(d,i) {return d; })
  .append("button")
  .attr("id",function(d,i) { return d; })
  .style("padding", 1)
  .style("border", "none")
  .style("background", "none")
  .style("background", "none")
  .on("click",function (d){
    selectedGenres=selectedGenres.filter(function(a){return a!=d;});
    plot();
  })
  .append("i")
  .style("color","red")
  .attr("class","fa fa-close");

  d3.select("#newGenre").attr("value",function(){
    for(var i=0;i<allGenres.length;i++)
    {
      if(!selectedGenres.includes(allGenres[i]))
          return allGenres[i];
    }
  });
  d3.select("#genresAdd").on("click",function(){
    newgenre = d3.select("#newGenre").node().value;
    if(!selectedGenres.includes(newgenre))
      selectedGenres.push(newgenre);
    plot();
  });
  plotData=[];
  allData.forEach((row, i) => {
    var include= false;
    row['genres'].forEach((genre, i) => {
      if(selectedGenres.includes(genre))
      {
        include=true;
      }
    });
    if(include)
    {
      plotData.push(row);
    }

  });
  plotTreeMap();
  plotParallelCoordinate();
  plotHistogram();
}
(function() {
  var w = window,
  d = document,
  e = d.documentElement,
  g = d.getElementsByTagName('body')[0];

  pWidth= parseInt(d3.select('#Parallel').style('width'), 10);
  pHeight= parseInt(d3.select('#Parallel').style('height'), 10);

  hWidth= parseInt(d3.select('#histogram').style('width'), 10);
  hHeight= parseInt(d3.select('#histogram').style('height'), 10);

  tWidth= parseInt(d3.select('#treeMap').style('width'), 10);
  tHeight= parseInt(d3.select('#treeMap').style('height'), 10);

  windowWidth = w.innerWidth || e.clientWidth || g.clientWidth,
  windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;
  d3.csv('https://raw.githubusercontent.com/shokrof/ECS272-Winter2021/main/Homework2/meshokrof/data_w_genres.csv', function(data) {
    data.forEach((item, i) => {
      var str=item['genres'];
      str=str.replace("['","[\"");
      str=str.replace("']","\"]");
      str=str.replaceAll("', ","\", ");
      str=str.replaceAll(", '",", \"");
      arr=JSON.parse(str);
      item['genres']=arr;
    });
    allData=data;
    genresSet={};
    allData.forEach((row, i) => {
      var include= false;
      row['genres'].forEach((genre, i) => {
        genresSet[genre]=1;
        if(selectedGenres.includes(genre))
        {
          include=true;
        }
      });
      if(include)
      {
        plotData.push(row);
      }

    });
    allGenres=Object.keys(genresSet);



    plot();

  });
})();




// (function () {
//
//
//   var margin = {top: 10, right: 30, bottom: 30, left: 40},
//       width = 460 - margin.left - margin.right,
//       height = 400 - margin.top - margin.bottom;
//
//
//     // get the data
//     d3.csv('datasets/archive/data_w_genres.csv', function(data) {
//       var genres= {};
//       data.forEach((item, i) => {
//         var str=item['genres'];
//         str=str.replace("['","[\"");
//         str=str.replace("']","\"]");
//         str=str.replaceAll("', ","\", ");
//         str=str.replaceAll(", '",", \"");
//         arr=JSON.parse(str);
//         arr.forEach((item2, i2) => {
//           if(!(item2 in genres))
//             genres[item2]=0;
//           genres[item2]+=1;
//         });
//
//       });
//       genres=Object.keys(genres).map(function(key) {
//         return [key, genres[key]];
//       });
//        genres.sort(function (a, b) {
//          return b[1] - a[1];
//        });
//        genres=genres.slice(0,50);
//        myWords=[]
//        genres.forEach((item, i) => {
//          myWords.push({
//            word : item[0],
//            size : ""+item[1]/10
//          })
//        });
//     //   var myWords = [{word: "Running", size: "10"}, {word: "Surfing", size: "20"}, {word: "Climbing", size: "50"}, {word: "Kiting", size: "30"}, {word: "Sailing", size: "20"}, {word: "Snowboarding", size: "60"} ]
//
//        console.log(myWords);
//
//        // set the dimensions and margins of the graph
// //  var margin = {top: 10, right: 10, bottom: 10, left: 10},
// //      width = 450 - margin.left - margin.right,
// //      height = 450 - margin.top - margin.bottom;
// // var fill =  d3.scaleSequential()
// //   .domain([0,myWords.length])
// //   .interpolator(d3.interpolateRainbow);
// //  // append the svg object to the body of the page
// //  var svg = d3.select("#wordCount").append("svg")
// //      .attr("width", width + margin.left + margin.right)
// //      .attr("height", height + margin.top + margin.bottom)
// //    .append("g")
// //      .attr("transform",
// //            "translate(" + margin.left + "," + margin.top + ")");
// //
// //  // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// //  // Wordcloud features that are different from one word to the other must be here
// //  // var layout = d3.layout.cloud()
// //  //   .size([width, height])
// //  //   .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
// //  //   .padding(5)        //space between words
// //  //   .rotate(function() { return (~~(Math.random() * 6) - 3) * 30; })
// //  //   .fontSize(function(d) { return d.value; })      // font size of words
// //  //   .on("end", draw);
// //
// //  var layout = d3.layout.cloud()
// //   .size([width, height])
// //   .words(myWords.map(function(d) { return {text: d.word}; }))
// //   .padding(5)
// //   .fontSize(function(d) { return d.value; })
// //
// //   .on("end", draw);
// // layout.start();
// //
// //  // This function takes the output of 'layout' above and draw the words
// //  // Wordcloud features that are THE SAME from one word to the other can be here
// //  function draw(words) {
// //    svg
// //      .append("g")
// //        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
// //        .selectAll("text")
// //          .data(words)
// //        .enter().append("text")
// //          .style("font-size", function(d) { return d.value; })
// //          .style("fill", function(d, i) { return fill(i); })
// //          .attr("text-anchor", "middle")
// //          .style("font-family", "Impact")
// //          .attr("transform", function(d) {
// //            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
// //          })
// //          .text(function(d) { return d.text; });
// //  }
//  // set the dimensions and margins of the graph
//  var fill =  d3.scaleSequential()
//     .domain([0,myWords.length])
//    .interpolator(d3.interpolateRainbow);
//  var margin = {top: 10, right: 10, bottom: 10, left: 10},
//      width = 450 - margin.left - margin.right,
//      height = 450 - margin.top - margin.bottom;
//
//  // append the svg object to the body of the page
//  var svg = d3.select("#wordCount").append("svg")
//      .attr("width", width + margin.left + margin.right)
//      .attr("height", height + margin.top + margin.bottom)
//    .append("g")
//      .attr("transform",
//            "translate(" + margin.left + "," + margin.top + ")");
//
//  // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
//  // Wordcloud features that are different from one word to the other must be here
//  var layout = d3.layout.cloud()
//    .size([width, height])
//    .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
//    .padding(2)        //space between words
//   // .rotate(function() { return ~~(Math.random() * 2) * 90; })
//   .rotate(function() {return (~~(Math.random() * 6) - 3) * 30;})
//    .fontSize(function(d) { return d.size; })      // font size of words
//    .on("end", draw);
//  layout.start();
//
//  // This function takes the output of 'layout' above and draw the words
//  // Wordcloud features that are THE SAME from one word to the other can be here
//  function draw(words) {
//    svg
//      .append("g")
//        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
//        .selectAll("text")
//          .data(words)
//        .enter().append("text")
//          .style("font-size", function(d) { return d.size; })
//          .style("fill", "#69b3a2")
//          .attr("text-anchor", "middle")
//          .style("font-family", "Impact")
//          .style("fill", function(d, i) { return fill(i); })
//          .attr("transform", function(d) {
//            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//          })
//          .text(function(d) { return d.text; });
//  }
//
//
//   });
// })()
