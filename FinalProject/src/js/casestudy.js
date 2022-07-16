import * as d3 from "d3";
import * as d3g from "d3-geo-voronoi";
import * as topojson from "topojson";
import source_airports from "../assets/airports/airport_detail2.csv"
import source_flight from "../assets/flights/flight_month.csv"
import worldtopo from "../assets/data/world-topo-min.json"
import average_lat_lon from "../assets/country/country_average_latitude_longitude.csv"
import { chord } from "./chord";

export function casestudy(target_cty = "United States"){
        const urls = {
        //source: airports
        airports: source_airports,
      
        // source: https://gist.github.com/mbostock/7608400
        flights: source_flight
        };

        var margin = {top:100, right:10, bottom:100, left:20},
                width = 800 - margin.left - margin.right,
                height = 700 - margin.top - margin.bottom;

        d3.csv(average_lat_lon).then(function(central){
            //filter out the specific country
            central = central.filter(d => d.name_country == target_cty)[0]
            const hypotenuse = Math.sqrt(width * width + height * height);
            //projection to the central longitude and latitude
            const projection = d3.geoMercator().scale(500).center([central.longitude,central.latitude])
            var parseDate = d3.timeParse("%Y%m"); // parse Date to read flight info.
            const scales = {
                // used to scale airport bubbles
                airports: d3.scaleSqrt()
                .range([4, 18]),

                // used to scale number of segments per line
                segments: d3.scaleLinear()
                .domain([0, hypotenuse])
                .range([1, 10])
                };
            // load the airport and flight data together
            const promises = [
            d3.csv(urls.airports, typeAirport),
            d3.csv(urls.flights,  typeFlight)
                ];
            Promise.all(promises).then(function(values){
                console.assert(values.length === 2);
        
                let airports0 = values[0].filter(function(d){
                const cty = d.name_country
                return cty == target_cty
                });
                let flights0  = values[1].filter(function(d){
                const cty = d.name_country
                return cty == target_cty
                });
                //remove all 
                d3.select("#case").selectAll("*").remove()
                var svg = d3.select("#case")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)

                // have these already created for easier drawing
                const g = {
                    basemap:  svg.append("g").attr("id", "basemap").attr("transform", "translate(" + margin.left * 0.1 + "," + margin.top + ")"),
                    flights:  svg.append("g").attr("id", "flights").attr("transform", "translate(" + margin.left * 0.1 + "," + margin.top + ")"),
                    airports: svg.append("g").attr("id", "airports").attr("transform", "translate(" + margin.left * 0.1 + "," + margin.top + ")"),
                    voronoi:  svg.append("g").attr("id", "voronoi").attr("transform", "translate(" + margin.left * 0.1 + "," + margin.top + ")"),
                    slider:   svg.append("g").attr("class", "slider").attr("transform", "translate(" + (margin.left + width / 5) + "," + (margin.top + height/7) + ")")
                };

                const tooltip = svg.append("text").attr("id", "tooltip").style("display", "none").attr("transform", "translate(" + margin.left * 2 + "," + 1 * height + ")");

                //////// slider /////////
                var formatDateIntoMonthOutput = d3.timeFormat("%y/%m");
                var formatDateIntoMonth = d3.timeFormat("%Y%m")
                var formatDate = d3.timeFormat("%b %d %Y");
                
                var startDate = new Date("2019-12-02"),
                    endDate = new Date("2021-01-01");
                
                ////////// slider //////////
                var currentValue = 0;
                var targetValue = width * 0.6;
                    
                var x = d3.scaleTime()
                    .domain([startDate, endDate])
                    .range([0, targetValue])
                    .nice(12)
                    .clamp(true);
                
                
                
                g.slider.append("line")
                    .attr("class", "track")
                    .attr("x1", x.range()[0])
                    .attr("x2", x.range()[1])
                .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
                    .attr("class", "track-inset")
                .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
                    .attr("class", "track-overlay")
                    .call(d3.drag()
                        .on("start.interrupt", function() { g.slider.interrupt(); })
                        .on("start drag", function(event, d) {
                        currentValue = event.x;
                        update(x.invert(currentValue)); 
                        })
                    );
                
                g.slider.insert("g", ".track-overlay")
                    .attr("class", "ticks")
                    .attr("transform", "translate(0," + 18 + ")")
                .selectAll("text")
                    .data(x.ticks(10))
                    .enter()
                    .append("text")
                    .attr("x", x)
                    .attr("y", 10)
                    .attr("text-anchor", "middle")
                    .text(function(d) { return formatDateIntoMonthOutput(d); });
                
                var handle = g.slider.insert("circle", ".track-overlay")
                    .attr("class", "handle")
                    .attr("r", 9);
                
                var label = g.slider.append("text")  
                    .attr("class", "label")
                    .attr("text-anchor", "middle")
                    .text(formatDate(startDate))
                    .attr("transform", "translate(0," + (-25) + ")")

                ///////// draw maps(#1 base map #2 airports #3flight) /////////
                // must be hard-coded to match our topojson projection
                //filter json map from world json map based on target country
                var countries = topojson.feature(worldtopo, worldtopo.objects.countries).features;

                let country = countries.filter(function(d){
                const cty = d.properties.name
                return cty == target_cty && d.geometry!== null
                })[0] //filter specific country


                // load and draw base map
                //d3.json(urls.map).then(drawMap);
                drawMap(country)
                //control the extent w.r.t the date 201912
                const extentAirport = baselineExtent(airports0, flights0.filter(d => d.Date == "201912"))

                function drawAPF(airports, flights){
                    // convert airports array (pre filter) into map for fast lookup
                    let iata = new Map(airports.map(node => [node.iata, node]));
                    // calculate incoming and outgoing degree based on flights
                    // flights are given by airport iata code (not index)
                    flights.forEach(function(link) {
                    link.source = iata.get(link.origin);
                    link.target = iata.get(link.destination);

                    link.source.outgoing = 0;
                    link.target.incoming = 0;
                    });
                    flights.forEach(function(link){
                        link.source.outgoing += link.count;
                        link.target.incoming += link.count;
                    })
                    // remove airports out of bounds
                    let old = airports.length;
                    airports = airports.filter(airport => airport.x >= 0 && airport.y >= 0);
                    console.log(" removed: " + (old - airports.length) + " airports out of bounds");

                    // remove airports with NA state
                    old = airports.length;
                    airports = airports.filter(airport => airport.state !== "NA");
                    console.log(" removed: " + (old - airports.length) + " airports with NA state");

                    // remove airports without any flights
                    old = airports.length;
                    //airports = airports.filter(airport => airport.outgoing > 0 && airport.incoming > 0);
                    console.log(" removed: " + (old - airports.length) + " airports without flights");

                    // sort airports by outgoing degree
                    airports.sort((a, b) => d3.descending(a.outgoing, b.outgoing));

                    // keep only the top airports
                    old = airports.length;
                    airports = airports.slice(0, 50);
                    console.log(" removed: " + (old - airports.length) + " airports with low outgoing degree");

                    // done filtering airports can draw
                    drawAirports(airports);
                    drawPolygons(airports);

                    // reset map to only include airports post-filter
                    iata = new Map(airports.map(node => [node.iata, node]));

                    // filter out flights that are not between airports we have leftover
                    old = flights.length;
                    flights = flights.filter(link => iata.has(link.source.iata) && iata.has(link.target.iata));
                    console.log(" removed: " + (old - flights.length) + " flights");

                    // done filtering flights can draw
                    drawFlights(airports, flights);
                }        


                // draws the underlying map
                function drawMap(map) {
                    // remove non-continental states
                    //map.objects.states.geometries = map.objects.states.geometries.filter(isContinental);

                    // run topojson on remaining states and adjust projection
                    //let land1 = topojson.merge(source_map1, source_map1.objects.states.geometries);
                    //let land = topojson.merge(map, map.objects.nation.geometries)
                    let land = map.geometry
                    console.log("geojson")
                    console.log(countries)
                    console.log(land)
                    //console.log(topojson.merge(map, map.objects.nation.geometries))
                    //console.log(land1)
                    // use null projection; data is already projected
                    let path = d3.geoPath().projection(projection);
                    // draw base map
                    g.basemap.append("path")
                    .datum(land)
                    .attr("class", "land")
                    .attr("d", path);
                    /*
                    // draw interior borders
                    g.basemap.append("path")
                    .datum(topojson.mesh(map, map.objects.states, (a, b) => a !== b))
                    .attr("class", "border interior")
                    .attr("d", path);

                    // draw exterior borders
                    g.basemap.append("path")
                    .datum(topojson.mesh(map, map.objects.states, (a, b) => a === b))
                    .attr("class", "border exterior")
                    .attr("d", path);
                    */
                }

                function drawAirports(airports) {
                    // adjust scale
                    //const extent = d3.extent(airports, d => d.outgoing);
                    console.log(d3.extent(airports, d => d.outgoing))
                    scales.airports.domain(extentAirport);
                    g.airports.selectAll("circle.airport").remove()
                    // draw airport bubbles
                    g.airports.selectAll("circle.airport")
                    .data(airports, d => d.iata)
                    .enter()
                    .append("circle")
                    .attr("r",  d => scales.airports(d.outgoing))
                    .attr("cx", d => d.x) // calculated on load
                    .attr("cy", d => d.y) // calculated on load
                    .attr("class", "airport")
                    .each(function(d) {
                    // adds the circle object to our airport
                    // makes it fast to select airports on hover
                    d.bubble = this;
                    });
                }

                function drawPolygons(airports) {
                    // convert array of airports into geojson format
                    const geojson = airports.map(function(airport) {
                    return {
                    type: "Feature",
                    properties: airport,
                    geometry: {
                    type: "Point",
                    coordinates: [airport.longitude, airport.latitude]
                    }
                    };
                });

                // calculate voronoi polygons
                const polygons = d3g.geoVoronoi().polygons(geojson);
                console.log(polygons);

                g.voronoi.selectAll("path").remove()
                g.voronoi.selectAll("path")
                .data(polygons.features)
                .enter()
                .append("path")
                .attr("d", d3.geoPath(projection))
                .attr("class", "voronoi")
                .on("mouseover", function(event,d) {
                let airport = d.properties.site.properties;
                console.log(airport)
                d3.select(airport.bubble)
                .classed("highlight", true);

                d3.selectAll(airport.flights)
                .classed("highlight", true)
                .raise();

                // make tooltip take up space but keep it invisible
                tooltip.style("display", null);
                tooltip.style("visibility", "hidden");

                // set default tooltip positioning
                tooltip.attr("text-anchor", "middle");
                //tooltip.attr("dy", -scales.airports(airport.outgoing) - 4);
                tooltip.attr("x", 40);
                tooltip.attr("y", 40);

                // set the tooltip text
                tooltip.text(airport.name + " in " + airport.city + ", " + airport.name_country);

                // double check if the anchor needs to be changed
                let bbox = tooltip.node().getBBox();

                if (bbox.x <= 0) {
                tooltip.attr("text-anchor", "start");
                }
                else if (bbox.x + bbox.width >= width) {
                tooltip.attr("text-anchor", "end");
                }

                tooltip.style("visibility", "visible");
                })
                .on("mouseout", function(event,d) {
                let airport = d.properties.site.properties;

                d3.select(airport.bubble)
                .classed("highlight", false);

                d3.selectAll(airport.flights)
                .classed("highlight", false);

                d3.select("text#tooltip").style("visibility", "hidden");
                })
                .on("dblclick", function(d) {
                // toggle voronoi outline
                let toggle = d3.select(this).classed("highlight");
                d3.select(this).classed("highlight", !toggle);
                });
                }

                function drawFlights(airports, flights) {
                    // break each flight between airports into multiple segments
                    let bundle = generateSegments(airports, flights);

                    // https://github.com/d3/d3-shape#curveBundle
                    let line = d3.line()
                    .curve(d3.curveBundle)
                    .x(airport => airport.x)
                    .y(airport => airport.y);

                    g.flights.selectAll("path.flight").remove()
                    let links = g.flights.selectAll("path.flight")
                    .data(bundle.paths)
                    .enter()
                    .append("path")
                    .attr("d", line)
                    .attr("class", "flight")
                    .each(function(d) {
                    // adds the path object to our source airport
                    // makes it fast to select outgoing paths
                    d[0].flights.push(this);
                    });

                    // https://github.com/d3/d3-force
                    let layout = d3.forceSimulation()
                    // settle at a layout faster
                    .alphaDecay(0.1)
                    // nearby nodes attract each other
                    .force("charge", d3.forceManyBody()
                    .strength(10)
                    .distanceMax(scales.airports.range()[1] * 2)
                    )
                    // edges want to be as short as possible
                    // prevents too much stretching
                    .force("link", d3.forceLink()
                    .strength(0.7)
                    .distance(0)
                    )
                    .on("tick", function(d) {
                    links.attr("d", line);
                    })
                    .on("end", function(d) {
                    console.log("layout complete");
                    });

                    layout.nodes(bundle.nodes).force("link").links(bundle.links);
                }

                // Turns a single edge into several segments that can
                // be used for simple edge bundling.
                function generateSegments(nodes, links) {
                    // generate separate graph for edge bundling
                    // nodes: all nodes including control nodes
                    // links: all individual segments (source to target)
                    // paths: all segments combined into single path for drawing
                    let bundle = {nodes: [], links: [], paths: []};

                    // make existing nodes fixed
                    bundle.nodes = nodes.map(function(d, i) {
                    d.fx = d.x;
                    d.fy = d.y;
                    return d;
                    });

                    links.forEach(function(d, i) {
                    // calculate the distance between the source and target
                    let length = distance(d.source, d.target);

                    // calculate total number of inner nodes for this link
                    let total = Math.round(scales.segments(length));

                    // create scales from source to target
                    let xscale = d3.scaleLinear()
                    .domain([0, total + 1]) // source, inner nodes, target
                    .range([d.source.x, d.target.x]);

                    let yscale = d3.scaleLinear()
                    .domain([0, total + 1])
                    .range([d.source.y, d.target.y]);

                    // initialize source node
                    let source = d.source;
                    let target = null;

                    // add all points to local path
                    let local = [source];

                    for (let j = 1; j <= total; j++) {
                    // calculate target node
                    target = {
                    x: xscale(j),
                    y: yscale(j)
                    };

                    local.push(target);
                    bundle.nodes.push(target);

                    bundle.links.push({
                    source: source,
                    target: target
                    });

                    source = target;
                    }

                    local.push(d.target);

                    // add last link to target node
                    bundle.links.push({
                    source: target,
                    target: d.target
                    });

                    bundle.paths.push(local);
                    });

                    return bundle;
                }

                

                

                // calculates the distance between two nodes
                // sqrt( (x2 - x1)^2 + (y2 - y1)^2 )
                function distance(source, target) {
                    const dx2 = Math.pow(target.x - source.x, 2);
                    const dy2 = Math.pow(target.y - source.y, 2);

                    return Math.sqrt(dx2 + dy2);
                }


                function update(h) {
                    // update position and text of label according to slider scale
                    handle.attr("cx", x(h));
                    label
                    .attr("x", x(h))
                    .text(formatDate(h));
            
                    // filter data set and redraw plot
                    //drawRest(promises)
                    // filter data set and redraw plot
                    //drawMap(country)
                    var new_flight = flights0.filter(d => d.Date == formatDateIntoMonth(h))
                    console.log(new_flight)
                    console.log(airports0)
                    drawAPF(airports0, new_flight)
                    chord(target_cty, formatDateIntoMonth(h))
                }

                //extent base
                function baselineExtent(airports, flights){
                    console.log(flights)
                    // convert airports array (pre filter) into map for fast lookup
                    let iata = new Map(airports.map(node => [node.iata, node]));
                    // calculate incoming and outgoing degree based on flights
                    // flights are given by airport iata code (not index)
                    flights.forEach(function(link) {
                    link.source = iata.get(link.origin);
                    link.target = iata.get(link.destination);

                    link.source.outgoing += link.count;
                    link.target.incoming += link.count;
                    });
                    // remove airports out of bounds
                    let old = airports.length;
                    airports = airports.filter(airport => airport.x >= 0 && airport.y >= 0);
                    console.log(" removed: " + (old - airports.length) + " airports out of bounds");

                    // remove airports with NA state
                    old = airports.length;
                    airports = airports.filter(airport => airport.state !== "NA");
                    console.log(" removed: " + (old - airports.length) + " airports with NA state");

                    // remove airports without any flights
                    old = airports.length;
                    //airports = airports.filter(airport => airport.outgoing > 0 && airport.incoming > 0);
                    console.log(" removed: " + (old - airports.length) + " airports without flights");

                    // sort airports by outgoing degree
                    airports.sort((a, b) => d3.descending(a.outgoing, b.outgoing));

                    // keep only the top airports
                    old = airports.length;
                    airports = airports.slice(0, 50);
                    console.log(" removed: " + (old - airports.length) + " airports with low outgoing degree");

                    return d3.extent(airports, d => d.outgoing);

                }
                




            })

            // see airports.csv
            // convert gps coordinates to number and init degree
            function typeAirport(airport) {
                airport.longitude = parseFloat(airport.longitude);
                airport.latitude  = parseFloat(airport.latitude);

                // use projection hard-coded to match topojson data
                const coords = projection([airport.longitude, airport.latitude]);
                airport.x = coords[0];
                airport.y = coords[1];

                airport.outgoing = 0;  // eventually tracks number of outgoing flights
                airport.incoming = 0;  // eventually tracks number of incoming flights

                airport.flights = [];  // eventually tracks outgoing flights

                return airport;
            }

            // see flights.csv
            // convert count to number
            function typeFlight(flight) {
                flight.count = parseInt(flight.count);
                flight.Date = String(flight.date);
                flight.date = parseDate(flight.date);
                return flight;
            }

            
            
            })
  
       
}

