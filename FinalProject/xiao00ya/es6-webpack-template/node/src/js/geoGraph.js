import * as d3 from "d3";
// for test
import locations from '../assets/data/location_test.csv';

// import locations from '../assets/data/Police_Department_Incidents_-_Previous_Year__2016_.csv';
import detail_to_coarse_map from  "../assets/data/detail_to_coarse_category_map.json";
import coarse_to_detail_map from  "../assets/data/coarse_to_detail_category_map.json";
import index from "../../src/util"

export async function drawSF(data, crime_type, id) {
    d3.select(id).select("svg").remove();
    console.log("mapping: ", detail_to_coarse_map);
    console.log("mapping: ", coarse_to_detail_map);

// ref: http://bl.ocks.org/sudeepdas/5167276
// https://gist.github.com/cdolek/d08cac2fa3f6338d84ea
// https://observablehq.com/@floledermann/drawing-maps-from-geodata-in-d3
// http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922
// https://opencagedata.com/reverse-geocoding/tutorial-building-a-reverse-geocoder
// https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2
// https://bl.ocks.org/d3noob/c056543aff74a0ac45bef099ee6f5ff4
// legend https://observablehq.com/@d3/choropleth
    
    var spots =  await d3.csv(locations);
    if(Object.keys(detail_to_coarse_map).includes(crime_type)) {
        spots = spots.filter(function(d){
            console.log(d.Category); 
            return d.Category==crime_type}) 
    }
    else {
        var type_list = coarse_to_detail_map[crime_type];
        spots = spots.filter(function(d){
            console.log(d.Category); 
            return type_list.includes(d.Category)}) 
    }

    var i;
    var max_value = 0;
    for (i = 0; i < data.features.length; i++) {
        if (data.features[i].properties[crime_type] >max_value) {
            max_value = data.features[i].properties[crime_type];
        }
    }

    const height = 0.5 * window.innerHeight;
    const width = 0.5 * window.innerWidth;
    const margin = ({top: 20, right: 10, bottom: 30, left: 10});

    // var width = 960,
    // height = 600,
    var scale = 170000,
    // var scale = 135000,
    latitude = 37.7750,
    longitude = -122.4183;
    var div = d3.select("body")
            .append("div")
            // .call(  
            //     d3.behavior.zoom() 
            //         .scaleExtent([1, 10])  
            //         .on("zoom", zoom)  
            // )   
    		.attr("class", "tooltip")               
    		.style("opacity", 0);
    // var div = d3.select("body").append("div")
    //  .attr("class", "tooltip-donut")
    //  .style("opacity", 0);
    // function zoom() {
    //     svg.attr("transform", "translate(" 
    //         + d3.event.translate 
    //         + ")scale(" + d3.event.scale + ")");
            
    let svg = d3.select(id).append("svg:svg", "h2")
    //  handleZoom(event) { svg.attr("transform",event.transform; }
    // .call(d3.behavior.zoom().on("zoom", function () {
    //     svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    //   }))
    // .attr("width", width)
    // .attr("height", height);
    .attr("viewBox", [0, 0, width - margin.left - margin.right, height])
    .attr("width", width - margin.left - margin.right )
    .attr("height", height );

    svg.append("rect")
        .attr("width", width- margin.left - margin.right)
        .attr("height", height)
        .attr("fill", "white");
    
    // var zoom = d3.zoom()
    //   .scaleExtent([1, 8])
    //   .on('zoom', function(event) {
    //       g.selectAll('path')
    //        .attr('transform', event.transform);
    //       g.selectAll("circle")
    //        .attr('transform', event.transform);
    //     });

    // svg.call(zoom);
    svg.call(d3.zoom().scaleExtent([1, 8]).on("zoom", function (event) {
        // svg.attr("transform", event.transform)
        svg.selectAll('path').attr('transform', event.transform);
        svg.selectAll('circle').attr('transform', event.transform);
        // svg.attr("transform", "translate(" + event.translate + ")" + " scale(" + event.scale + ")")
     }));

    var hoods = svg.append("svg:g")
    .attr("id", "hoods");

    var circles = svg.append("svg:g")
    .attr("id", "circles");
    

    // Map and projection
    
    var xym = d3.geoAlbers()
    .scale(scale) 
    .rotate([-longitude-0.03, 0]) 
    .center([0, latitude-0.046])  
    //.parallels([24.6, 43.6]);
    // var xym = d3.geoMercator().fitExtent([[40, 40], [width - 40, height - 40]], data.features)
    
    var path = d3.geoPath().projection(xym);
    // xym.origin([134, 25])
    // xym.translate([350, 745])
    // xym
    // xym.scale(1980)
    // translate([width / 2, height / 2]) 
    //   .scale(scale) 
    //   .rotate([-longitude, 0]) 
    //   .center([0, latitude]);
    
    // var data = d3.json(data);
    // Load external data and boot

    // Filter data
    // data.features = data.features.filter(function(d){console.log(d.properties.name) ; return d.properties.name=="Germany"})
    console.log("The geo data is: ", data.features);
    // var xy1 = xym([-122.38573, 37.78354])
    // console.log("!@@@@@@@!!Projection: ", xy1)

    // todo: dynamic change domain
    var color = d3.scaleLinear().domain([1,100]).range(["white", "blue"]);

    // Draw the map
    hoods.selectAll("path").data(data.features)
    .enter().append("svg:path")
    .attr("d", path)
    // .style("fill", function() { return "teal" })
    .style("fill", function(d) { 
        // return color(d.properties.WEAPON_LAWS); })
        return d3.interpolateOranges(d.properties[crime_type]/max_value);})
    .on("mouseover", function (d, i) {      
            // d3.select(this).transition()        
            //      .duration(50)      
            //    .style("opacity", .9);  
            div.transition()        
      	        .duration(200)      
                .style("opacity", .9);     
            div.text("Crime Counts: " + i.properties[crime_type])
            //    .style("background-color", 'black')
               .style("left", (d.pageX) + "px")     
               .style("top", (d.pageY - 28) + "px");    
        })  
    .on("mouseout", function(d) { 
            // d3.select(this).transition()
            // .duration('50')
            // .attr('opacity', '1');      
            div.transition()        
               .duration(50)      
               .style("opacity", 0);   
        })
    // .on("mouseover", function(e){d3.select(this).style("fill", "gray")})
    // .on("mouseout", function(e){d3.select(this).style("fill", "teal")})
    .attr("stroke","gray")
    .attr("stroke-width", 1)

    // draw spots
    circles.selectAll("circle")
           .data(spots)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                   return xym([d.X, d.Y])[0];
           })
           .attr("cy", function(d) {
                   return xym([d.X, d.Y])[1];
           })
           .attr("r", 0.5)
           .style("fill", "black");
    document.getElementById("showLocation").checked = true;
    // var color = d3.interpolateOranges;
    var color = d3.scaleSequential([0, max_value], d3.interpolateOranges);
    svg.append(() => legend({id: id, color, title: "Crime Counts", width: 260}))
    .attr("transform", "translate(15,15)");
        // .attr("transform", "rotate(-90)")
    //     .attr("class", "legend")
        // .attr("transform", "translate(15,15)")
    //     .style("font-size", "12px")
    //     .call(d3.legend)
        
        
    // svg.append("g")
    //     .attr("transform", "translate(610,20)")
    //     .append(() => legend({color, title: data.title, width: 260}));

    var xy = xym([longitude,latitude])
    console.log(xy)
    var xy1 = xym([-122.38573, 37.78354])
    console.log("!!Projection: ", xy1)

    // hoods.append('text')
    //             .attr('x', 960)
    //             .attr('y', 30)
    //             .text('Movies and San Francisco')
    //             .attr('fill','tomato')
    //             .attr('font-family','sans-serif')
    //             .attr('font-size',32)
    //             .transition().duration(1000)
    //             .attr('x',10);         


}

// todo: debug update function
export async function updateLocations(data, id) {
    console.log("data! ", data);
    console.log("The global crime type is: ", index.global_crime_type);
    var crime_type = index.global_crime_type;
    // d3.select(id).select("svg").remove();
    console.log("mapping: ", detail_to_coarse_map);
    console.log("mapping: ", coarse_to_detail_map);

// ref: http://bl.ocks.org/sudeepdas/5167276
// https://gist.github.com/cdolek/d08cac2fa3f6338d84ea
// https://observablehq.com/@floledermann/drawing-maps-from-geodata-in-d3
// http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922
// https://opencagedata.com/reverse-geocoding/tutorial-building-a-reverse-geocoder
// https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2
// https://bl.ocks.org/d3noob/c056543aff74a0ac45bef099ee6f5ff4
// legend https://observablehq.com/@d3/choropleth
    
    var spots =  await d3.csv(locations);
    var type_list;
    if(Object.keys(detail_to_coarse_map).includes(crime_type)) {
        spots = spots.filter(function(d){
            console.log(d.Category); 
            return d.Category==crime_type}) 
    }
    else {
        type_list = coarse_to_detail_map[crime_type];
        console.log("list is !!! ", type_list);
        spots = spots.filter(function(d){
            console.log(d.Category); 
            return type_list.includes(d.Category)}) 
    }

    // var i;
    // var max_value = 0;
    // for (i = 0; i < data.features.length; i++) {
    //     if (data.features[i].properties[crime_type] >max_value) {
    //         max_value = data.features[i].properties[crime_type];
    //     }
    // }

    const height = 0.5 * window.innerHeight;
    const width = 0.5 * window.innerWidth;
    const margin = ({top: 20, right: 10, bottom: 30, left: 10});

    // var width = 960,
    // height = 600,
    var scale = 170000,
    // var scale = 135000,
    latitude = 37.7750,
    longitude = -122.4183;
    

    // svg.call(zoom);
    var svg = d3.select(id);
    var circles = svg.append("g").attr("id", "circles");
    

    // Map and projection
    
    var xym = d3.geoAlbers()
    .scale(scale) 
    .rotate([-longitude-0.03, 0]) 
    .center([0, latitude-0.046])  
    //.parallels([24.6, 43.6]);
    // var xym = d3.geoMercator().fitExtent([[40, 40], [width - 40, height - 40]], data.features)
    
    var path = d3.geoPath().projection(xym);
    

    // todo: dynamic change domain
    var color = d3.scaleLinear().domain([1,100]).range(["white", "blue"]);

    // // Draw the map
    // hoods.selectAll("path").data(data.features)
    // .enter().append("svg:path")
    // .attr("d", path)
    // // .style("fill", function() { return "teal" })
    // .style("fill", function(d) { 
    //     // return color(d.properties.WEAPON_LAWS); })
    //     return d3.interpolateOranges(d.properties[crime_type]/max_value);})
    // .on("mouseover", function (d, i) {      
    //         // d3.select(this).transition()        
    //         //      .duration(50)      
    //         //    .style("opacity", .9);  
    //         div.transition()        
    //   	        .duration(200)      
    //             .style("opacity", .9);     
    //         div.text("Crime Counts: " + i.properties[crime_type])
    //         //    .style("background-color", 'black')
    //            .style("left", (d.pageX) + "px")     
    //            .style("top", (d.pageY - 28) + "px");    
    //     })  
    // .on("mouseout", function(d) { 
    //         // d3.select(this).transition()
    //         // .duration('50')
    //         // .attr('opacity', '1');      
    //         div.transition()        
    //            .duration(50)      
    //            .style("opacity", 0);   
    //     })
    // // .on("mouseover", function(e){d3.select(this).style("fill", "gray")})
    // // .on("mouseout", function(e){d3.select(this).style("fill", "teal")})
    // .attr("stroke","gray")
    // .attr("stroke-width", 1)

    // draw spots
    circles.selectAll("circle")
           .data(spots)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                   return xym([d.X, d.Y])[0];
           })
           .attr("cy", function(d) {
                   return xym([d.X, d.Y])[1];
           })
           .attr("r", 5)
           .style("fill", "black");
    
    // var color = d3.scaleSequential([0, max_value], d3.interpolateOranges);
    // svg.append(() => legend({id: id, color, title: "Crime Counts", width: 260}))
    // .attr("transform", "translate(15,15)");
    
    var xy = xym([longitude,latitude])
    console.log(xy)
    var xy1 = xym([-122.38573, 37.78354])
    console.log("!!Projection: ", xy1)

    // hoods.append('text')
    //             .attr('x', 960)
    //             .attr('y', 30)
    //             .text('Movies and San Francisco')
    //             .attr('fill','tomato')
    //             .attr('font-family','sans-serif')
    //             .attr('font-size',32)
    //             .transition().duration(1000)
    //             .attr('x',10);         


}


export async function earaseLocations(data, id) {
    console.log("data! ", data);
    console.log("The global crime type is: ", index.global_crime_type);
    var crime_type = index.global_crime_type;
    // d3.select(id).select("svg").remove();
    console.log("mapping: ", detail_to_coarse_map);
    console.log("mapping: ", coarse_to_detail_map);


  

    // svg.call(zoom);
    d3.select(id).selectAll("circle").remove();
         


}








// //d3.json("zctas_sanfrancisco.json", function(data) {
// d3.json("SFN.geojson", function(data) {
//     hoods.selectAll("path").data(data.features)
//     .enter().append("svg:path")
//     .attr("d", path)
//     .style("fill", function() { return "teal" })
//     .on("mouseover", function(e){d3.select(this).style("fill", "gray")})
//     .on("mouseout", function(e){d3.select(this).style("fill", "teal")})
//     .attr("stroke","white")
//     .attr("stroke-width", 1)
//   });

// var xy = xym([longitude,latitude])
// console.log(xy)
// hoods.append('text')
//             .attr('x', 960)
//             .attr('y', 30)
//             .text('Movies and San Francisco')
//             .attr('fill','tomato')
//             .attr('font-family','sans-serif')
//             .attr('font-size',32)
//             .transition().duration(1000)
//             .attr('x',10);

// var positions = []
// var form_add = []
// var title = []
// var lonlat = []

// //var mData

// var tip = d3.select('#tip')
// var lpic = d3.select('#lpic')

// d3.csv("sfmovies.csv", function(loadedRows) {
//     //var positions = [];
//         //mData = loadedRows;     
//  loadedRows.forEach(function(row){
//         //console.log(row)
//         row.lat =   parseFloat(row.lat)
//         row.lon = parseFloat(row.lon)
//         //console.log(row.lon)
//         positions.push(xym([row.lon,row.lat]));
//         form_add.push(row.form_add)
//         title.push(row.Title)
//         lonlat.push([row.lon,row.lat])
//         //console.log(row.form_add);
        
//         //
//         })
//  //title[0] = 'Dirty Harry';
 
//  console.log(title);
    

// circles.selectAll("cicle")
//     .data(positions)
//     .enter().append("svg:circle")
//     .attr("cx", function(d,i){return positions[i][0];})
//     //.transition().duration(10000).attr("cx", function(d,i){return positions[i][0];})
//     .attr("cy", function(d,i) {return positions [i][1];})
//     //.transition().duration(1000).attr("cy", function(d,i){return positions[i][1];})
//     .attr("r",2.5)
//     .attr("stroke","black")
//     .style("fill", "orange")
//     .attr("id", function(d,i) {return title[i];})
//     .on("mouseover",function(d,i){
//             d3.select(this).style("fill"," lawngreen")
//                                 .transition(100).attr('r',10)
//             //d3.select(circles).circle.style('fill','lawngreen')
//             cy = this.cy.baseVal.value;
//                console.log(form_add[i]);
//             tip.style('display','block')
//                 .style('left', 650 + 'px')
//                 .style('top', 30 + 'px')
//                 //.select(".hoods").text(form_add[i])  //form_add[i];})
//                 //.select("#tip .zip").text(function(){return 'Vertigo';})
//                 //.select('img').attr("src",'http://imgc.allpostersimages.com/images/P-473-488-90/56/5667/H35UG00Z/posters/dirty-harry-italian-style.jpg')
                
//             //tip.select(".hoods").text(form_add[i]);
//             $.getJSON("http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=9gfm9nggrw4t9sj29uqyfcet"
//                 +"&q=" + encodeURI(title[i])+"&callback=?", function(json) {
//                    console.log(json.movies[0])
//                    //tip.select(".zip").text('<img src ='+ json.movies[0].posters.profile+ '/>'+title[i]);
//                    tip.select(".zip img").attr("src", json.movies[0].posters.profile);
//                    tip.select(".ziphead").html(title[i] + "</br> <hr>")
//                    tip.select(".zipactors").text(json.movies[0].abridged_cast[0].name
//                     +', '+  json.movies[0].abridged_cast[1].name + ', '+
//                      json.movies[0].abridged_cast[2].name )
//                    tip.select(".ziprating").text(json.movies[0].ratings.critics_score + '% '+ 
//                     json.movies[0].ratings.critics_rating)
//                    /*tip.select(".ziptext").html(title[i] + "</br> <hr>"+ 
//                     json.movies[0].abridged_cast[0].name
//                     +', '+  json.movies[0].abridged_cast[1].name
//                     + "</br>" + json.movies[0].ratings.critics_score+  "% "
//                     + "<img src ="+json.movies[0].ratings.critics_rating+".png height = 20px width=20px/>") */
                
//                 lpic.style('display','block')
//                 .style('left', 650 + 'px')
//                 .style('top', 275 + 'px')
//                 .select('img').attr("src", "http://maps.googleapis.com/maps/api/streetview?size=640x300&location="+lonlat[i][1]
//                     +","+lonlat[i][0]+"&sensor=false&heading=50&fov=120");
//                 lpic.select(".hoods").text(form_add[i]);
//             });
//             circles.selectAll("circle")
//                  .style("fill", function(){
//                     if(this.id == title[i])
//                         //this.parentNode.appendChild(this);
//                         return "red";
//                     else 
//                          return "orange" ;
//                 })
//                  .transition(100).attr("r", function(){
//                     if(this.id == title[i]) 
//                         return 10
//                     else
//                         return 2.5;
//                 })
//                 .transition(100).attr(
//                     "r",function(){
//                         if(this.id == title[i])
//                      return 4.5;
//                     else 
//                      return 2.5;});
//                 //.sort(this.id == title[i]);
//                 //.parentNode.appendChild(this);
//                 //element.parentNode.appendChild(element)
//                 // circles.selectAll("circle .vertigo").style("fill","lawngreen");
//         })
//     .on("mouseout",function(){
//         d3.select(this).style("fill","red").transition(100).attr('r',4.5)
//         tip.style('display', 'none');
//         lpic.style('display', 'none');
//        // circles.selectAll('circle').transition(100).attr("r",3);
//         });

//    /* circles.selectAll("circle")
//     .style("fill", function(){
//         if(this.id == 'vertigo')
//          return "orange" 
//         else 
//          return "black" ;
//     });*/

//     var film = "Vertigo";
//     console.log(film);
//     //$.getJSON("http://api.themoviedb.org/3/Movie.search/en/json/a10ba46be51e867f47557ee65a295cdb/" + film + "?callback=?", function(json) {
//     //console.log(json);
//    // $.getJSON("http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=9gfm9nggrw4t9sj29uqyfcet"
//    //     +"&q=" + encodeURI(film)+"&callback=?", function(json) {
//    //         console.log(json.movies[0].posters)
//    //                 });
// });

function legend({
    id,
    // canvas,
    color,
    title,
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 20,
    ticks = width / 64,
    tickFormat,
    tickValues
  } = {}) {
    // svg = d3.select(id).append("svg:svg", "h2")
    // let svg = d3.select(id).select("svg")
    // select(id).append("svg:svg", "h2")
    let svg = d3.select(id).select("svg").append("svg:svg", "h3");
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("viewBox", [0, 0, width, height])
    //   .style("overflow", "visible")
    //   .style("display", "block");
  
    let tickAdjust = g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
    let x;
  
    // Continuous
    if (color.interpolate) {
      const n = Math.min(color.domain().length, color.range().length);
  
      x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));
  
      svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
    }
  
    // Sequential
    else if (color.interpolator) {
      x = Object.assign(color.copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)), {
          range() {
            return [marginLeft, width - marginRight];
          }
        });
  
      svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.interpolator()).toDataURL());
  
      // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
      if (!x.ticks) {
        if (tickValues === undefined) {
          const n = Math.round(ticks + 1);
          tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
        }
        if (typeof tickFormat !== "function") {
          tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
        }
      }
    }
  
    // Threshold
    else if (color.invertExtent) {
      const thresholds = color.thresholds ? color.thresholds() // scaleQuantize
        :
        color.quantiles ? color.quantiles() // scaleQuantile
        :
        color.domain(); // scaleThreshold
  
      const thresholdFormat = tickFormat === undefined ? d => d :
        typeof tickFormat === "string" ? d3.format(tickFormat) :
        tickFormat;
  
      x = d3.scaleLinear()
        .domain([-1, color.range().length - 1])
        .rangeRound([marginLeft, width - marginRight]);
  
      svg.append("g")
        .selectAll("rect")
        .data(color.range())
        .join("rect")
        .attr("x", (d, i) => x(i - 1))
        .attr("y", marginTop)
        .attr("width", (d, i) => x(i) - x(i - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", d => d);
  
      tickValues = d3.range(thresholds.length);
      tickFormat = i => thresholdFormat(thresholds[i], i);
    }
  
    // Ordinal
    else {
      x = d3.scaleBand()
        .domain(color.domain())
        .rangeRound([marginLeft, width - marginRight]);
  
      svg.append("g")
        .selectAll("rect")
        .data(color.domain())
        .join("rect")
        .attr("x", x)
        .attr("y", marginTop)
        .attr("width", Math.max(0, x.bandwidth() - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", color);
  
      tickAdjust = () => {};
    }
  
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues))
      .call(tickAdjust)
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", marginLeft)
        .attr("y", marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(title));
  
    return svg.node();
  }
  
  function ramp(color, n = 256) {
    var canvas = document.createElement('canvas');
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }
  
