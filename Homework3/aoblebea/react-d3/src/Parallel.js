import React, {Component} from 'react';
import * as d3 from "d3";
import 'd3-transition';
import 'd3-brush';

class Parallel extends Component{
    componentDidMount(){
        this.drawChart();
    }

    componentDidUpdate(){
      this.drawChart();
    }

    drawChart(){

        var features = ["valence", "acousticness", "danceability", "duration_ms", "energy", "explicit", "instrumentalness", "liveness", "loudness", "popularity", "speechiness", "key"];

        var data;

        var dict = [];

        var arr = [];

        d3.csv( this.props.data)
        .then(csv => {
            csv = csv.filter(d => { return Math.floor(Math.random() * 1) === 0;});

            data = csv.map(row => {
                var obj = [];

                var temp = row["artists"].replace(/['"]+/g, '');
                var artists = temp.replace(/[\[\]']+/g, '').split(", ");

                for(var i = 0; i < artists.length; i++){
                    var a = artists[i];

                    dict[a] += 1;
                    if(isNaN(dict[a])){
                        dict[a] = 1;
                    }

                }

                for(var k in Object.keys(features)){
                    var ft = features[k];
                    obj[ft] = Number(row[ft]);
                }

                obj["artists"] = artists;

                return obj;
              })

            for (var a in dict) {
                arr.push([a, dict[a]]);
            }

            arr.sort(function(a, b) {
                return b[1] - a[1];
            });

            arr = arr.slice(0, this.props.artists);

            var copy = [];
            for(var i = 0; i < data.length; i++){
                var r = data[i];

                var ind = -1;

                for(var j = 0; j < arr.length; j++){
                    if(r["artists"].includes(arr[j][0])){
                        ind = j;
                        break;
                    }
                }

                if(ind == -1){
                    continue;
                }

                delete r["artists"];

                r["artist"] = j;
                r["count"] = arr[j][1];

                copy.push(r);
            }

            features.push("artist");
            features.push("count");

            data = copy;

        }).then(csv => {

        var counts = new Array(arr.length).fill(0);

        var averages = new Array(arr.length);
        for(var i = 0; i < arr.length; i++){
            averages[i] = new Array(features.length).fill(0.0);
        }

        for(var i = 0; i < data.length; i++){
            var r = data[i];
            var k = +r["artist"];

            counts[k] += 1;

            for(var j = 0; j < Object.keys(r).length; j++){
                averages[k][j] += +r[Object.keys(r)[j]];
            }
        }

        for(var i = 0; i < averages.length; i++){
            for(var j = 0; j < features.length; j++){
                averages[i][j] /= counts[i];
            }
        }

       var width = 1600;
       var height = 400;
       var margin = {left: 60, right: 20, top: 20, bottom: 60}

       d3.select('#parallel').selectAll("svg.svg3").remove();

       var svg = d3.select('#parallel')
         .append('svg')
         .attr('width', "76vw")
         .attr('height', "19vw")
         .attr('viewBox', "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
         .attr('class', 'svg3')
 
       svg.selectAll("*").remove();

       var view = svg.append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
       var x = d3.scaleLinear()
         .domain([0, features.length - 1])
         .range([0, width - 0]);

        var ys = [];

        var mins = [];
        var maxs = [];

        for(var i = 0; i < features.length; i++){
            ys[i] = d3.scaleLinear()
            .domain([d3.min(data, d => d[features[i]]), d3.max(data, d => d[features[i]])])                    
            .range([height - 20, 100]);

            mins.push(d3.min(data, d => d[features[i]]));
            maxs.push(d3.max(data, d => d[features[i]]));
        }
       
        var colors = ["Red", "Green", "Blue", "Black", "Purple", "Orange", "Teal", "Cyan", "Brown", "Yellow", "Grey", "Crimson"];

        if(this.props.showonly == false){
            for(var ind = 0; ind < data.length; ind++){
                var row = data[ind];

                var col = colors[Number(row["artist"])];

                svg.append("path")
                .datum(Object.values(row))
                .attr("id", "p" + String(ind))
                .attr("class", "song")
                .attr("stroke", (d, i) => col)
                .attr("stroke-width", 1)
                .attr("fill", "none")
                .attr("opacity", .008)
                .attr("d", d3.line()
                .x(function(d, i) { return x(i) + width/26})
                .y(function(d, i) { return ys[i](d)}))
            }
        }

        for(var ind = 0; ind < averages.length; ind++){
            var row = averages[ind];

            var col = colors[ind];

            svg.append("path")
            .datum(Object.values(row))
            .attr("stroke", (d, i) => col)
            .attr("stroke-width", 3)
            .attr("fill", "none")
            .attr("opacity", 1)
            .attr("name", arr[ind][0])
            .attr("class", "average")
            .attr("d", d3.line()
            .x(function(d, i) { return x(i) + width/26})
            .y(function(d, i) { return ys[i](d)}))
        }

        var brush = d3.brush()
        .extent([[0,0], [width,height]])
        .on("end", brushChart)

        svg
         .call(brush)


        var showonly = this.props.showonly;

        function brushChart({selection}) {
            if(!selection || showonly){
                return;
            }

            svg.selectAll(".average").attr("display", "none");
            svg.selectAll(".song").attr("opacity", .008).attr("display", "1");

            var low = Math.max(0, Math.ceil(x.invert(selection[0][0] - width/26))); 
            var high = Math.floor(x.invert(selection[1][0] - width/26)); 

            var match = true;

            for(var ind = 0; ind < data.length; ind++){
                var row = data[ind];

                match = high >= low;

                for(var j = low; j <= high; j++){
                    match = match && (row[features[j]] <= ys[j].invert(selection[0][1]) && row[features[j]] >= ys[j].invert(selection[1][1]));
                }

                if(match){
                    svg.selectAll("#p" + ind).attr("opacity", .05);
                }
                else{
                    svg.selectAll("#p" + ind).attr("display", "none");
                }
            }
        }

        svg.on("dblclick",function(){

            svg.selectAll(".song").attr("opacity", .008).attr("display", "1");
            svg.selectAll(".average").attr("display", "1");
        });

        var tooltip = document.getElementById('tooltip')
        svg.selectAll("path")
        .on('mouseenter', function(d) {
            d3.select(this).style('stroke-width', '9')
            tooltip.innerHTML = d3.select(this).attr("name");
          })
          .on('mouseleave', function(d) {
            d3.select(this).style('stroke-width', '3')
            tooltip.innerHTML = "";
          })

        view.selectAll('text')
            .data(arr)
            .join('text')
            .attr('x', (_, i) => (i % 7) * 230)
            .attr('y', (_, i) => Math.floor(i/7) * 40)
            .attr('fill', (d, i) => colors[i])
            .attr('font-weight', "bold")
            .text(d => d[0])

        var t = view.append("g");

        t.selectAll('text')
            .data(mins)
            .join('text')
            .attr('x', (_, i) => x(i))
            .attr('y', (_, i) => height - 10)
            .attr('fill', "Black")
            .text((d, i) => { var n = mins[i]; return Math.abs(n) < 10 ? n.toFixed(3) : n.toFixed(0);})

        var t2 = view.append("g");

            t2.selectAll('text')
                .data(maxs)
                .join('text')
                .attr('x', (_, i) => x(i))
                .attr('y', (_, i) => 70)
                .attr('fill', "Black")
                .text((d, i) => { var n = maxs[i]; return Math.abs(n) < 10 ? n.toFixed(3) : n.toFixed(0);})

       var t3 = view.append("g")	
         .attr("transform", "translate(0," + height + ")")
         .style("font-size", "1em")
         .call(d3.axisBottom(x).ticks(features.length).tickFormat(function(d, i) { return features[i]; }))
           .append("text")
           .attr("fill", "#000")
           .attr("x", width / 2)
           .attr('y', margin.bottom / 2)
           .attr("dy", "0.71em")
           .attr("text-anchor", "end")
           .text(this.props.xcol);

        t3.selectAll("text")
            .attr("font-size", "10em");

       view.append("g")
         .append("text")
           .attr("fill", "#000")
           .attr("transform", "rotate(-90)")
           .attr("x", - height / 2)
           .attr("y", - margin.left)
           .attr("dy", "0.71em")
           .attr("font-size", "1em")
           .attr("text-anchor", "end")
           .text(this.props.ycol);
           
    });

    }

    render(){
        return <div id={"#" + this.props.id}></div>
    }

}

export default Parallel;
