butterflies = []
mouse = {x:960,  y:300};
var svgns = "http://www.w3.org/2000/svg";
container = document.getElementById("container");

color_scheme = {
    gender: {
        Male: {left: "#7497b2", right: "#94B7D2"},
        Female: {left: "#b77375", right: "#d79395"},
        Other: {left: "#747474", right: "#949494"}
    },
    major: {
        Design: {left: "#ac97b2", right:"#ccb7d2"},
        NonDesign: {left: "#959faa", right: "#b5bfca"}
    }
};

function ShowStudentInfo(id) {
    if(!id.includes('R')) {
        id = cur_show_id;
    }
    const student = GetStudentById(id);
    console.log(id);
    document.getElementById("student-gender-text").textContent = student.gender;
    document.getElementById("student-gender-text").style.color = color_scheme.gender[student.gender].left;

    var year = "";
    if(student.year == 1) {
        year = "Freshman";
    } else if(student.year == 2) {
        year = "Sophomore ";
    } else if(student.year == 3) {
        year = "Junior";
    } else if(student.year == 4) {
        year = "Senior";
    } else {
        year = "Undisclosed";
    }
    document.getElementById("student-year-text").textContent = year;


    document.getElementById("student-major-text").textContent = student.major=="Design"?"Design":"Non-Design";
    document.getElementById("student-major-text").style.color = color_scheme.major[student.major].left;
    document.getElementById("student-ethnicity-text").textContent = student.race;

    var tool = student.tool;
    
    if(tool.includes("Others (Please specify)")) {
        console.log("GSDFD");
        tool = tool.replace("Others (Please specify)", student.tool_text);
        
    }

    tool = tool.replaceAll(',', ' ');

    console.log(tool);

    document.getElementById("student-tool-text").textContent = tool;

    document.getElementById("student-left-wing").setAttributeNS(null, 'fill', color_scheme[color_category][student[color_category]].left);
    document.getElementById("student-right-wing").setAttributeNS(null, 'fill', color_scheme[color_category][student[color_category]].right);

    var overlay = document.getElementById("student-overlay");
    overlay.style.display = "flex";
    overlay.style.backgroundColor = 'rgba(255,255,255,0.95)';
    overlay.style.opacity = 0;

    var info_boxes = document.getElementsByClassName("student-info-box");
    for(var i=0; i<info_boxes.length; i++) {
        info_boxes[i].style.transform = "translateY(20px)";
        info_boxes[i].style.opacity = "0";
    }
    
    setTimeout(() => { ShowStudentInfoDelay();  }, 100);
    // overlay.style.opacity = 0.8;
}

function ShowStudentInfoDelay() {
    document.getElementById("student-overlay").style.opacity = 1;
    var info_boxes = document.getElementsByClassName("student-info-box");
    for(var i=0; i<info_boxes.length; i++) {
        info_boxes[i].style.transform = "translateY(0px)";
        info_boxes[i].style.opacity = "1";
    }
}

function HideStudentInfo() {
    var info_boxes = document.getElementsByClassName("student-info-box");
    for(var i=0; i<info_boxes.length; i++) {
        document.getElementsByClassName("student-info-box")[i].style.transform = "translateY(20px)";
        document.getElementsByClassName("student-info-box")[i].style.opacity = "0";
    }
    document.getElementById("student-overlay").style.opacity = 0;
    setTimeout(() => { HideStudentInfoDelay();  }, 1000);
}

function HideStudentInfoDelay() {
    document.getElementById("student-overlay").style.display = "none";
}

function ShowStudentComment(id, x, y) {
    cur_show_id = id;
    const student = GetStudentById(id);
    console.log(student);
    var info_box = document.getElementById("comment-box");
    info_box.textContent = student.com[phase-1];
    info_box.style.top = y + 10;
    info_box.style.left = x + 10;
    info_box.style.display = "flex";
}

function HideStudentComment() {
    var info_box = document.getElementById("comment-box");
    info_box.style.display = "none";
}

function CreateButterflies(students) {
    butterflies = [];
    for(let i=0; i<students.length; i++) {
        const student = students[i];
        const year_factor = Math.sqrt(student.year) * 0.5;
        var butterfly = document.createElementNS(svgns, "g");
        butterfly.setAttributeNS(null, 'id', student.id);
        butterfly.setAttributeNS(null, 'class', 'butterfly');
        butterfly.setAttributeNS(null, 'r', 23 * Math.sqrt(year_factor));
        butterfly.setAttributeNS(null, 'vx', 0);
        butterfly.setAttributeNS(null, 'vy', 0);
        // butterfly.setAttributeNS(null, 'transform', 'translate(36 45.5) scale(0.1 0.1)');
        butterfly.setAttributeNS(null, 'transform', 'translate(' + Math.random()*1920 + ' ' + Math.random()*600 + ') scale(' + 0.1 * year_factor + ' ' + 0.1 * year_factor + ') rotate(' + (Math.random() * 100 - 50) + ')');
        
        butterfly.addEventListener("click", (event)=>{
            ShowStudentInfo(event.target.id);
        });

        butterfly.addEventListener("mouseenter", (event)=>{
            ShowStudentComment(event.target.id, event.pageX, event.pageY);
        });

        butterfly.addEventListener("mouseleave", (event)=>{
            HideStudentComment();
        });

        var animation = document.createElementNS(svgns, "animateTransform");
        animation.setAttributeNS(null, 'attributeName', "transform");
        animation.setAttributeNS(null, "type", "scale");
        animation.setAttributeNS(null, "additive", "sum");
        animation.setAttributeNS(null, "values", "0.7 1;1 1;0.7 1");
        animation.setAttributeNS(null, "begin", Math.random() + "s");
        animation.setAttributeNS(null, "dur", (Math.random() * 0.5 + 1) + "s");
        animation.setAttributeNS(null, "repeatCount", "indefinite");

        butterfly.appendChild(animation);

        var left_wing = document.createElementNS(svgns, "path");
        var right_wing = document.createElementNS(svgns, "path");
    
        left_wing.setAttributeNS(null, 'class', 'cls-2');
        left_wing.setAttributeNS(null, 'd', "M1101.12,619.08a160.86,160.86,0,0,0-23.25-24.86c-9.33-8.07-20.76-16.06-66.22-35.93-44.12-19.28-49-18.58-52.44-16.2-16.35,11.29,1.29,58.85,2.72,62.7,3.92,10.57,16.15,43.53,37,44.58,5.82.3,10.86-2,14.59-4.32-5.15,4.91-13.73,14.67-15.39,28.38-2.17,17.81,8.65,31.48,22.44,48.91,17.65,22.3,29.28,37,42.17,35.12,19.6-2.85,29.75-42.23,35.93-66.23a221.37,221.37,0,0,0,5.93-33.51Q1102.89,638.4,1101.12,619.08Z");
        left_wing.setAttributeNS(null, 'transform', "translate(-952.31 -533.8)");
        left_wing.setAttributeNS(null, 'fill', color_scheme.gender[student.gender].left);
    
        right_wing.setAttributeNS(null, 'class', 'cls-3');
        right_wing.setAttributeNS(null, 'd', "M1098.74,619.6a161.51,161.51,0,0,0,2.42,33.95c2.17,12.14,6,25.55,28.84,69.6,22.14,42.75,26.36,45.27,30.54,45.59,19.81,1.52,36-46.53,37.36-50.43,3.6-10.67,14.85-44-.72-57.95-4.33-3.89-9.67-5.31-14.06-5.82,7.1-.58,19.9-2.76,29.83-12.36,12.89-12.48,13.09-29.91,13.35-52.14.32-28.44.53-47.18-10.66-53.83-17-10.13-49.69,14.09-69.6,28.84a221.6,221.6,0,0,0-25.71,22.3Z")
        right_wing.setAttributeNS(null, 'transform', "translate(-952.31 -533.8)");
        right_wing.setAttributeNS(null, 'fill', color_scheme.gender[student.gender].right);
        right_wing.setAttributeNS(null, 'transition', 'fill .4s ease');
    
        butterfly.appendChild(left_wing);
        butterfly.appendChild(right_wing);
    
        container.appendChild(butterfly);
    
        butterflies.push(butterfly);
    }
    return butterflies;
}

function GetColor(side, student) {
    if(color_category == "gender") {
        return 
    }
}


function UpdateButterflies() {
    for(let i=0; i<butterflies.length; i++) {
        var butterfly_i = butterflies[i];
        var student_i = GetStudentById(butterfly_i.getAttributeNS(null, 'id'));
        var drag_center = drag_centers[student_i[tree_type][phase - 1] - 1];

        splitted = butterfly_i.getAttributeNS(null, 'transform').split(')');

        xy_i = splitted[0].split('(')[1].split(' ');
        scale_i = splitted[1].split('(')[1].split(' ');
        rotate_i = parseFloat(splitted[2].split('(')[1].split(' '));
        splitted.shift();

        x_i = parseFloat(xy_i[0]);
        y_i = parseFloat(xy_i[1]);
        r = parseFloat(butterfly_i.getAttributeNS(null, 'r'));
        drag_force = {x:0, y:0};
        repulsive_force = {x:0, y:0};
        threshold = 10;
        isBelow = true;

        for(let j=0; j<butterflies.length; j++) {
            if(i!=j) {
                butterfly_j = butterflies[j];
                xy_j = butterfly_j.getAttributeNS(null, 'transform').split(')')[0].split('(')[1].split(' ');
                x_j = parseFloat(xy_j[0]);
                y_j = parseFloat(xy_j[1]);
                dx = x_i - x_j;
                dy = y_i - y_j;
                d = Math.sqrt(dx*dx + dy*dy);
                
                if(dx == 0) {
                    dx = (Math.random() - 0.5) * 2 * r;
                }

                if(dy == 0) {
                    dy = (Math.random() - 0.5) * 2 * r;
                }
                
                diff = r + parseFloat(butterfly_j.getAttributeNS(null, 'r')) - d;
                
                if(diff > 0) {
                    repulsive_force.x += dx * diff * diff;
                    repulsive_force.y += dy * diff * diff;
                }
            }
        }

        repulsive_magnitude = Math.sqrt(repulsive_force.x * repulsive_force.x + repulsive_force.y * repulsive_force.y);
        if(repulsive_magnitude > 0) {
            repulsive_force.x = repulsive_force.x * 0.001 * (Math.random() * 0.8 + 0.2);
            repulsive_force.y = repulsive_force.y * 0.001 * (Math.random() * 0.8 + 0.2);
        }

        
        var dx = drag_center[0] - x_i;
        var dy = drag_center[1] - y_i;
        var d = Math.sqrt(dx*dx+dy*dy);

        if(d > 50) {
            drag_force.x = dx;
            drag_force.y = dy;
        } else if (d < 40){
            drag_force.x = -dx * 3;
            drag_force.y = -dy * 3;
            repulsive_force.x *= 0.1;
            repulsive_force.y *= 0.1;
        } else {
            drag_force.x = 0;
            drag_force.y = 0;
            repulsive_force.x *= 0.1;
            repulsive_force.y *= 0.1;
        }
        



        drag_magnitude = Math.sqrt(drag_force.x * drag_force.x + drag_force.y * drag_force.y);
        if(drag_magnitude > 0) {
            drag_force.x = drag_force.x * 0.05 * (Math.random() * 0.8 + 0.2);
            drag_force.y = drag_force.y * 0.05 * (Math.random() * 0.8 + 0.2);  
        }

        x_i += parseFloat(butterfly_i.getAttributeNS(null, 'vx')) * 0.1;
        y_i += parseFloat(butterfly_i.getAttributeNS(null, 'vy')) * 0.1;

        // console.log(Math.atan2(y_i, x_i) / Math.PI * 180);

        
        var vx_i = butterfly_i.getAttributeNS(null, 'vx');
        var vy_i = butterfly_i.getAttributeNS(null, 'vy');

        var angle = -Math.atan2(vy_i, vx_i) / Math.PI * 180;

        butterfly_i.setAttributeNS(null, 'transform', 'translate(' + x_i + ' ' + y_i + ') scale(' + scale_i[0] + ' ' + scale_i[1] + ') rotate(' + ((angle - rotate_i) * 0.01 + rotate_i) + ')');


        butterfly_i.setAttributeNS(null, 'vx', parseFloat(butterfly_i.getAttributeNS(null, 'vx')) * 0.8 + drag_force.x + repulsive_force.x);
        butterfly_i.setAttributeNS(null, 'vy', parseFloat(butterfly_i.getAttributeNS(null, 'vy')) * 0.8 + drag_force.y + repulsive_force.y);

        
    }
}



// setTimeout(() => { CreateButterflies(); Draw();  }, 1000);


container.addEventListener("mousemove", (e)=>{
    mouse.x = e.clientX;
    mouse.y = e.offsetY;
});

container.addEventListener("click", (e)=>{
    pt = container.createSVGPoint();
    pt.x = e.offsetX;
    pt.y = e.offsetY;

    pt_new = pt.matrixTransform(container.getCTM().inverse());
    pt_new.x = Math.round(pt_new.x);
    pt_new.y = Math.round(pt_new.y);
    console.log(pt_new);
});


