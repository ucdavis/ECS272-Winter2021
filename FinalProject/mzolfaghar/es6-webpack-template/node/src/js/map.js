import * as d3 from "d3";
import pop from  '../../../../populations.csv';
import span from  '../../../../spanning.csv';
import perc from  '../../../../small_gdp_perc.csv';
import strs from '../../../../stories.csv';
import regeneratorRuntime from "regenerator-runtime";

export async function drawMap(){

    var countries = ["AFG", "AGO", "ARG", "AUS", "BGD", "BRA", "CAN", "CHN", "CIV", "CMR", "COD", "COL", "DEU", "DZA", "EGY", "ESP", "ETH", "FRA", "GBR", "GHA", "IDN", "IND", "IRN", "IRQ", "ITA", "JPN", "KEN", "KOR", "MAR", "MDG", "MEX", "MMR", "MOZ", "MYS", "NGA", "NPL", "PAK", "PER", "PHL", "POL", "PRK", "RUS", "SAU", "SDN", "THA", "TUR", "TZA", "UGA", "UKR", "USA", "UZB", "VEN", "VNM", "YEM", "ZAF"];

    var d = await d3.csv(pop);

    var codes = [];

    var strng = "";

    var ct = 0;
    for(let i = 0; i < d.length; i++){
        if(parseInt(d[i]["2019"]) > 25000000){
            ct += 1;
            strng += d[i]["Country Code"] + ", ";
            codes.push(d[i]["Country Code"]);
        }
    }


    var Victor = require('victor');
    var vec = new Victor(42, 1337);

    var width = window.innerWidth;
    var height = window.innerHeight;

    var zoomwidth = width / (2 * Math.PI);
    var zoomed = false;
    var point_rad = 3;

    var canvas = d3.select("body").append("canvas")
        .attr("width", "100%")
        .attr("height", "100%")
        .on("click", click)
        .on("dblclick", dblclick)

    var projection = d3.geoNaturalEarth1().translate([width / 2, height / 2]).center([0, 0]).rotate([0, 0, 0]).scale(width / (2 * Math.PI));

    var ctx = canvas.node().getContext('2d');

    var pathGenerator = d3.geoPath(projection, ctx);

    var data = await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");

    var ids = [];

    for(let i = 0; i < data.features.length; i++){
        if(codes.includes(data.features[i]["id"])){
            ids.push(i);
        }
    }

    ctx.beginPath();

    pathGenerator(data);

    ctx.fillStyle = "#999";
    ctx.fill();

    ctx.strokeStyle = "#69b3a2";
    ctx.stroke()

    var c0 = pathGenerator.centroid(data.features[0]);

    var ks = Object.keys(data.features);

    class particle{
        constructor(pos, vel, life, color, priority = 0){
            this.pos = pos;
            this.vel = vel;
            this.id = -1;
            this.life = life;
            this.color = color;
            this.priority = priority;
        }
    }

    var numpart;
    var particles;
    var stack;

    function init_parts(){
        numpart = 1000;
        particles = new Array(numpart);
        stack = [];

        for(let i = 0; i < particles.length; i++){
            particles[i] = null;
            stack.push(i);
        }
    }
    
    init_parts();

    function addp(p){
        if(stack.length == 0) return;

        let ind = stack.pop();
        p.id = ind;
        particles[ind] = p;
    }

    function killp(p){
        stack.push(p.id);
        particles[p.id] = null;
    }

    function killp_id(id){
        stack.push(id);
        particles[id] = null;
    }

    function update(p){
        if(p == null) return;

        p.pos.add(p.vel);
        
        p.life -= 1;
        if(p.life <= 0){
            killp(p);
        }
    }

    function draw(p, priority = 0){
        if(p == null || p.priority != priority) return;

        ctx.beginPath();

        ctx.arc(p.pos.x, p.pos.y, point_rad, 0, 2 * Math.PI);

        ctx.fillStyle = p.color;
        ctx.fill();

        ctx.strokeStyle = "#000000";
        ctx.stroke();

    }

    class emitter{

        constructor(loc, dst, flow, priority = 0){

            this.src = loc;
            this.dst = dst;
            this.flow = flow;

            var mx = 7.5;
            var score = (mx - Math.log10(Math.abs(this.flow)))/mx;
            var un = 7.5 - Math.log10(Math.abs(this.flow));

            this.color = "rgb(0, 0, 0)";

            let r = 0;
            let g = 0;
            let b = 0;

            this.priority = priority;

            if(un < 1){
                let w1 = 1 - un;
                let w2 = un;

                r = 255;
                g = w1 * 255 + w2 * 125;
                b = w1 * 255;
            }
            else if(un < 2){
                let w1 = 2 - un;
                let w2 = un - 1;

                r = 255;
                g = w1 * 125;
                b = w2 * 255;
            }
            else if(un < 3){
                let w1 = 3 - un;
                let w2 = un - 2;

                r = w1 * 255;
                g = 0;
                b = 255;
            }
            else if(un < 4){
                let w1 = 4 - un;
                let w2 = un - 3;

                r = 0;
                g = 0;
                b = w1 * 255
            }
            else{
                r = 0;
                g = 0;
                b = 0;
            }

            this.color = "rgb(" + String(r) + ", " + String(g) + ", " + String(b) + ")";

            this.cap = Math.ceil(score * mx * 40 + 18);

            this.charge = Math.floor(this.cap / 2);
        }
    }

    var emitters = new Array(3);

    var t1 = pathGenerator.centroid(data.features[150]);
    var t2 = pathGenerator.centroid(data.features[30]);
    var t3 = pathGenerator.centroid(data.features[70]);

    var sp = await d3.csv(span);


    var startyear = parseInt(sp[0]["year"]);
    var endyear = parseInt(sp[sp.length - 1]["year"]);

    var years = Math.floor((endyear - startyear) / 5) + 1;
    var per_year = Math.floor(sp.length / years);

    var dict = {};

    function centroid_to_vic(ct){
        return new Victor(ct[0], ct[1]);
    }

    var pr = await d3.csv(perc);

    var stories = await d3.csv(strs);

    console.log(stories);

    function make_dict(pg){
        dict = {};

        for(let i = 0; i < data.features.length; i++){
            if(data.features[i]["id"] == "FRA"){
                let deu = pg.centroid(data.features[41]);
                let esp = pg.centroid(data.features[49]);
                dict[data.features[i]["id"]] = new Victor((deu[0] + esp[0])/ 2, (deu[1] + esp[1])/ 2);
                continue;
            }

            let temp = pg.centroid(data.features[i])
            dict[data.features[i]["id"]] = new Victor(temp[0], temp[1]);
        }

        let usa = pg.centroid(data.features[167]);
        let can = pg.centroid(data.features[27]);
        let chn = pg.centroid(data.features[30]);
        let jpn = pg.centroid(data.features[82]);

        dict["LEF"] = new Victor(usa[0] - ((can[0] - usa[0]) * 3), (usa[1] + jpn[1])/ 2);
        dict["RIG"] = new Victor(jpn[0] + ((jpn[0] - chn[0]) * 1), (usa[1] + jpn[1])/ 2);
    }

    var selected = parseInt(stories[0]["selected"]);
    var year = parseInt(stories[0]["year"]);

    var stage = 0;
    var stages = stories.length;

    var year_pos = new Victor(220, height * .85);

    function create_emmiters_for_year(yr){
        make_dict(pathGenerator);

        var year_pos = new Victor(220, height * .85);

        emitters = new Array(0);

        let lo = Math.floor((yr - startyear) / 5) * per_year;
        let hi = lo + per_year - 1;

        for(let i = lo; i <= hi; i++){
            if((sp[i]["orig"] == "LEF" && sp[i]["dest"] == "RIG") || (sp[i]["dest"] == "LEF" && sp[i]["orig"] == "RIG")){
                continue;
            }

            let flow = 0;

            if(selected == -1){
                flow = parseInt(sp[i]["flow"]);
            }
            else if(parseInt(stories[stage]["only"]) == 0){
                flow = parseInt(sp[i]["flow"]);
            }
            else{
                flow = parseInt(sp[i][countries[selected]]);
                console.log(countries[selected]);
            }

            let src = dict[sp[i]["orig"]];
            let dst = dict[sp[i]["dest"]];

            emitters.push(new emitter(src, dst, flow));
        }

        let def = 3000;
        for(let i = 0; i < 5; i++){
            emitters.push(new emitter(new Victor(0, year_pos.y - 290 - (30 * i)), new Victor(year_pos.x - 20, year_pos.y - 290 - (30 * i)), def, 1));
            def *= 10;
        }
    }

    create_emmiters_for_year(year);

    function click(e){
        var pt = d3.pointer(e);

        console.log("clicked at " + String(pt));

        let mousev = new Victor(pt[0], pt[1]);
        let right_arrow = new Victor(year_pos.x + 90, year_pos.y - 10);
        let left_arrow = new Victor(year_pos.x - 20, year_pos.y - 10);

        let right_arrow2 = new Victor(width/2 + 60, year_pos.y - 10);
        let left_arrow2 = new Victor(width/2 - 50, year_pos.y - 10);

        let rad = 20;

        if(mousev.clone().subtract(right_arrow2).length() < rad){
            // right click
            console.log("right arrow 2");
            if(stage < stages - 1){
                stage += 1;
            }
            year = parseInt(stories[stage]["year"]);
            selected = parseInt(stories[stage]["selected"]);
            create_emmiters_for_year(year);
        }

        if(mousev.clone().subtract(left_arrow2).length() < rad){
            // left click
            console.log("left arrow 2");
            if(stage > 0){
                stage -= 1;
            }
            year = parseInt(stories[stage]["year"]);
            selected = parseInt(stories[stage]["selected"]);
            create_emmiters_for_year(year);

            if(zoomed){
                zoomed = false;
                point_rad = 3;
                zoomwidth = width / (2 * Math.PI)
                projection = d3.geoNaturalEarth1().translate([width / 2, height / 2]).center([0, 0]).rotate([0, 0, 0]).scale(zoomwidth);
                pathGenerator = d3.geoPath(projection, ctx);
                create_emmiters_for_year(year);
                init_parts();   
            }
        }

        let change_year = false;

        if(mousev.clone().subtract(right_arrow).length() < rad){
            if(year < endyear){
                year += 5;
            }
            change_year = true;
            create_emmiters_for_year(year);
        }

        if(mousev.clone().subtract(left_arrow).length() < rad){
            if(year > startyear){
                year -= 5;
            }
            change_year = true;
            create_emmiters_for_year(year);
        }

        if(stage < stages - 1){
            return;
        }

        if(pt[0] < 540 && pt[1] >= year_pos.y - 420 && pt[1] <= year_pos.y + 20){
            return;
        }

        let changed = false;

        for(let i = 0; i < ids.length; i++){
            let ind = ids[i];
            if(d3.geoContains(data.features[ind], projection.invert(pt))){
                selected = i;
                changed = true;
                init_parts();

                console.log(i);
                console.log(countries[i]);

                create_emmiters_for_year(year);

                break;
            }
        }

        if(!changed && !change_year && selected != -1){
            selected = -1;
            init_parts();
            create_emmiters_for_year(year);
        }

    }

    function dblclick(e){
        if(stage < stages - 1){
            return;
        }

        ctx.rect(0, year_pos.y - 420, 540, 440);

        console.log("double");

        var pt = d3.pointer(e);

        if(pt[0] < 540 && pt[1] >= year_pos.y - 420 && pt[1] <= year_pos.y + 20){
            return;
        }

        let mousev = new Victor(pt[0], pt[1]);

        let right_arrow2 = new Victor(width/2 + 60, year_pos.y - 10);
        let left_arrow2 = new Victor(width/2 - 50, year_pos.y - 10);

        let rad = 20;

        if(mousev.clone().subtract(right_arrow2).length() < rad){
            return;
        }

        if(mousev.clone().subtract(left_arrow2).length() < rad){
            return;
        }

        let offx = (width/2 - pt[0]) * -3;
        let offy = (height/2 - pt[1]) * -3;

        zoomed = !zoomed;

        if(zoomed){
            point_rad = 4.5;
            zoomwidth = 3 * width / (2 * Math.PI);
            projection = d3.geoNaturalEarth1().translate([width/2 - offx, height/2 - offy]).center([0, 0]).rotate([0, 0, 0]).scale(zoomwidth);
        }
        else{
            point_rad = 3;
            zoomwidth = width / (2 * Math.PI)
            projection = d3.geoNaturalEarth1().translate([width / 2, height / 2]).center([0, 0]).rotate([0, 0, 0]).scale(zoomwidth);
        }


        console.log("translate " + String([width - pt[0], height - pt[1]]));
        console.log("width 15: " + String(width * 1.5));
        console.log("height 15: " + String(height * 1.5));

        pathGenerator = d3.geoPath(projection, ctx);
        create_emmiters_for_year(year);
        init_parts();
    }

    var speed = .75;

    function update_em(em){
        if(em.charge == 0 && em.flow != 0){
            var vel = em.dst.clone();

            vel.subtract(em.src);                

            var dist = vel.length();

            vel.normalize();

            vel.multiply(new Victor(speed, speed));

            var life = Math.floor(dist / speed);

            if(em.flow > 0){
                addp(new particle(em.src.clone(), vel, life, em.color, em.priority));
            }
            else{
                addp(new particle(em.dst.clone(), vel.multiply(new Victor(-1, -1)), life, em.color, em.priority));
            }
        }
        em.charge = (em.charge + 1) % em.cap;
    }

    var thresh = 3;

    function wrap_lines(text, boxwidth) {
        ctx.fillStyle = "#000000";
        ctx.font = "20px Courier New";

        var words = text.split(" ");
        var lines = [];
        var currentLine = words[0];
    
        for (var i = 1; i < words.length; i++) {
            var word = words[i];

            if(word == "|"){
                lines.push(currentLine);
                currentLine = "";
                continue;
            }

            var width = ctx.measureText(currentLine + " " + word).width;
            if (width < boxwidth) {
                if(currentLine == ""){
                    currentLine = word;
                }
                else{
                    currentLine += " " + word;
                }
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    // main loop
    d3.interval(function() {
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        pathGenerator(data);

        ctx.fillStyle = "#999";
        ctx.fill();
        ctx.strokeStyle = "#000000";
        ctx.stroke()

        ctx.clearRect(0, 0, width, height);

        for(let i = 0; i < data.features.length; i++){
            ctx.beginPath();
            pathGenerator(data.features[i]);
            ctx.fillStyle = "#FFFFFF";
            ctx.strokeStyle = "#D0D0D0";
            ctx.fill();
            ctx.stroke();
        }

        for(let i = 0; i < ids.length; i++){
            ctx.beginPath();
            pathGenerator(data.features[ids[i]]);
            if(i == selected){
                ctx.fillStyle = "rgb(198, 163, 136)";
            }
            else{

                if(parseFloat(pr[i][year]) > thresh){
                    ctx.fillStyle = "#F0FFF0";    
                }
                if(parseFloat(pr[i][year]) < -thresh){
                    ctx.fillStyle = "#FFF0F0";    
                }
                if(parseFloat(pr[i][year]) > thresh * 2){
                    ctx.fillStyle = "#D0FFD0";
                }
                if(parseFloat(pr[i][year]) < thresh * -2){
                    ctx.fillStyle = "#FFD0D0";    
                }
                if(parseFloat(pr[i][year]) >= -thresh && parseFloat(pr[i][year]) <= thresh){
                    ctx.fillStyle = "#EAEAEA";
                }
                if(isNaN(parseFloat(pr[i][year]))){
                    ctx.fillStyle = "#C0C0C0";
                }
            }
            ctx.fill();
            ctx.strokeStyle = "#000000";
            ctx.stroke()

            let v = dict[data.features[ids[i]]["id"]];
            let c = [v.x, v.y];

            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.arc(c[0], c[1], 3, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        }

        for(let i = 0; i < emitters.length; i++){
            update_em(emitters[i]);
        }

        for(let i = 0; i < particles.length; i++){
            let p = particles[i]
            update(p);

            draw(p);
        }

        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "E0E0E0";
        ctx.rect(0, year_pos.y - 420, 540, 440);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#000000";
        ctx.font = "30px Courier New";
        ctx.fillText(year,year_pos.x, year_pos.y);

        if(year < endyear){
            // right arrow
            ctx.beginPath();
            ctx.moveTo(year_pos.x + 80, year_pos.y - 20);
            ctx.lineTo(year_pos.x + 80, year_pos.y);
            ctx.lineTo(year_pos.x + 100, year_pos.y - 10);
            ctx.fill();
        }

        if(year > startyear){
            // left arrow
            ctx.beginPath();
            ctx.moveTo(year_pos.x - 10, year_pos.y - 20);
            ctx.lineTo(year_pos.x - 10, year_pos.y);
            ctx.lineTo(year_pos.x - 30, year_pos.y - 10);
            ctx.fill();
        }

        ctx.font = "18px Courier New";
        ctx.beginPath();
        ctx.fillStyle = "#C0C0C0";
        ctx.strokeStyle = "#000000";
        ctx.rect(year_pos.x - 30, year_pos.y - 60, 20, 20);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.fillText("No GDP data", year_pos.x, year_pos.y - 45);

        // small countries
        ctx.font = "18px Courier New";
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        ctx.rect(year_pos.x - 30, year_pos.y - 90, 20, 20);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.fillText("Population < 25M", year_pos.x, year_pos.y - 75);

        ctx.beginPath();
        ctx.fillStyle = "rgb(198, 163, 136)";
        ctx.strokeStyle = "#000000";
        ctx.rect(year_pos.x - 30, year_pos.y - 120, 20, 20);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.fillText("Selected", year_pos.x, year_pos.y - 105);

        ctx.beginPath();
        ctx.fillStyle = "#FFD0D0";
        ctx.strokeStyle = "#000000";
        ctx.rect(year_pos.x - 30, year_pos.y - 150, 20, 20);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.fillText("GDP decreased by more than " + String(thresh * 2) + "%", year_pos.x, year_pos.y - 135);

        ctx.beginPath();
        ctx.fillStyle = "#FFF0F0";
        ctx.strokeStyle = "#000000";
        ctx.rect(year_pos.x - 30, year_pos.y - 180, 20, 20);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.fillText("GDP decreased by more than " + String(thresh) + "%", year_pos.x, year_pos.y - 165);

        ctx.beginPath();
        ctx.fillStyle = "#EAEAEA";
        ctx.strokeStyle = "#000000";
        ctx.rect(year_pos.x - 30, year_pos.y - 210, 20, 20);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.fillText("GDP change within +/- " + String(thresh) + "%", year_pos.x, year_pos.y - 195);

        ctx.beginPath();
        ctx.fillStyle = "#F0FFF0";
        ctx.strokeStyle = "#000000";
        ctx.rect(year_pos.x - 30, year_pos.y - 240, 20, 20);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.fillText("GDP grew by more than " + String(thresh) + "%", year_pos.x, year_pos.y - 225);

        ctx.beginPath();
        ctx.fillStyle = "#D0FFD0";
        ctx.strokeStyle = "#000000";
        ctx.rect(year_pos.x - 30, year_pos.y - 270, 20, 20);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.fillText("GDP grew by more than " + String(thresh * 2) + "%", year_pos.x, year_pos.y - 255);

        var strs = ["3K", "30K", "300K", "3M", "30M"]

        let def = 3000;
        for(let i = 0; i < 5; i++){
            ctx.fillStyle = "#000000";
            ctx.fillText("Net movement of " + strs[i] + " people", year_pos.x, year_pos.y - 285 - (30 * i));

            def *= 10;
        }

        for(let i = 0; i < particles.length; i++){
            let p = particles[i]
            draw(p, 1);
        }

        ctx.fillStyle = "#FFFFFF";
        ctx.rect(width - 300, height * .15, 250, height * .7);
        ctx.fill();

        let txt = String(stories[stage]["message"]);

        let lines = wrap_lines(txt, 240);

        for(let i = 0; i < lines.length; i++){
            ctx.fillText(lines[i], width - 300 + 10, height * .15 + 30 + 20 * i);
        }

        ctx.fillStyle = "#0000FF";
        ctx.font = "30px Courier New";
        ctx.fillText(String(stage + 1) + "/" + String(stages),width/2 - 30, year_pos.y);

        if(stage < stages - 1){
            ctx.beginPath();
            ctx.moveTo(width/2 + 50, year_pos.y - 20);
            ctx.lineTo(width/2 + 50, year_pos.y);
            ctx.lineTo(width/2 + 70, year_pos.y - 10);
            ctx.fill();
        }

        if(stage > 0){
            ctx.beginPath();
            ctx.moveTo(width/2 - 40, year_pos.y - 20);
            ctx.lineTo(width/2 - 40, year_pos.y);
            ctx.lineTo(width/2 - 60, year_pos.y - 10);
            ctx.fill();
        }

    }, 20);

    
}