import * as d3 from "d3";


export async function drawSF(data, id) {
// ref: http://bl.ocks.org/sudeepdas/5167276
// https://gist.github.com/cdolek/d08cac2fa3f6338d84ea
// https://observablehq.com/@floledermann/drawing-maps-from-geodata-in-d3
// http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922
// https://opencagedata.com/reverse-geocoding/tutorial-building-a-reverse-geocoder
// https://medium.com/@kj_schmidt/show-data-on-mouse-over-with-d3-js-3bf598ff8fc2
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
    		.attr("class", "tooltip")               
    		.style("opacity", 0);
    // var div = d3.select("body").append("div")
    //  .attr("class", "tooltip-donut")
    //  .style("opacity", 0);

    let svg = d3.select(id).append("svg:svg", "h2")
    // .attr("width", width)
    // .attr("height", height);
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width - margin.left - margin.right )
    .attr("height", height );

    svg.append("rect")
        .attr("width", width- margin.left - margin.right)
        .attr("height", height)
        .attr("fill", "white");

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
        return d3.interpolateOranges(d.properties.WEAPON_LAWS/100);})
    .on("mouseover", function (d, i) {      
            // d3.select(this).transition()        
            //      .duration(50)      
            //    .style("opacity", .9);  
            div.transition()        
      	        .duration(200)      
                .style("opacity", .9);     
            div.text("Crime Counts: " + i.properties.WEAPON_LAWS)
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