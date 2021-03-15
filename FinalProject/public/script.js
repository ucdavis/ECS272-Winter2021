students = [];
student_indices = {};
butterflies = [];
groups = [];
phase = 1;
cur_tree = 1;
color_category = 'gender';
background_colors = ["#E4DBCF", "#d3dDd4", "D9DBDB"];
view_box_x = 0;
tree_type = 'sat';
width_offset = 10000;
cur_show_id = 0;
intro_page = 0;

filters = {
    gender: {
        Male: true,
        Female: true,
        Other: true
    }, 
    major: {
        Design: true,
        NonDesign: true
    }
}

var tree_1 = document.getElementById("tree_1");
var tree_2 = document.getElementById("tree_2");
var tree_3 = document.getElementById("tree_3");

trees_x = [0, 10000, -10000];
UpdateWidthOffset();
UpdateTreesX();
PlaceTrees();
UpdateTreeHint(1, false);


document.getElementById("inner").style.backgroundColor = background_colors[0];

drag_centers_original = [[485, 506],[1450, 404],[677, 342],[1228, 225],[927, 111]];
drag_centers = [[485, 506],[1450, 404],[677, 342],[1228, 225],[927, 111]];

// Retrieve Data
fetch(window.location.href + 'data')
.then(response => response.json())
.then(data => {
    console.log(data);
    students = data;
    for(let i=0; i<students.length; i++) {
        student_indices[students[i].id] = i;
    }
    console.log(student_indices);
    butterflies = CreateButterflies(students);

    // groups = GroupButterflies('sat');
    setTimeout(() => { Draw();  }, 1000);
});

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


function GetIndexById(id) {
    return student_indices[id];
}

function GetStudentById(id) {
    return students[student_indices[id]];
}

function NextPhase() {
    phase += 1;
    if(phase == 4) {
        phase = 1;
    }
}

function GoToPhase(i) {
    phase = i;
    document.getElementById("phase-text-1").style.color = "#ffffff";
    document.getElementById("phase-text-2").style.color = "#ffffff";
    document.getElementById("phase-text-3").style.color = "#ffffff";
    document.getElementById("phase-text-" + i).style.color = "#000000";
    if(i == 1) {
        document.getElementById("phase-box-overlay").style.marginLeft = -10;
    } else if(i == 2) {
        document.getElementById("phase-box-overlay").style.marginLeft = 254;
    } else if(i == 3) {
        document.getElementById("phase-box-overlay").style.marginLeft = 520;
    }
    

}




function UpdateViewBox() {
    vb_dx = view_box_x - container.viewBox.baseVal.x;

    if(vb_dx > 1) {
        container.viewBox.baseVal.x += Math.sqrt(vb_dx);
    } else if (vb_dx < -1) {
        container.viewBox.baseVal.x -= Math.sqrt(-vb_dx);
    } else {
        container.viewBox.baseVal.x = view_box_x;
    }
}

function UpdateBackgroundColor() {
    var matches = document.getElementById("inner").style.backgroundColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    var rgb_src = {r: parseInt(matches[1]), g:parseInt(matches[2]), b:parseInt(matches[3])};
    var rgb_dest = hexToRgb(background_colors[phase - 1]);

    var rgb = {r: Math.ceil(rgb_src.r + (rgb_dest.r - rgb_src.r) * 0.25), g: Math.ceil(rgb_src.g + (rgb_dest.g - rgb_src.g) * 0.25), b: Math.ceil(rgb_src.b + (rgb_dest.b - rgb_src.b)*0.25)}

    document.getElementById("inner").style.backgroundColor = "rgb("+rgb.r+','+rgb.g+','+rgb.b+")";
}

function Draw() {
    setTimeout(() => { Draw();  }, 1000 / 60);
    UpdateButterflies();
    UpdateViewBox();
    UpdateBackgroundColor();
    // container.viewBox.baseVal.x += 10;
}

tree_1.addEventListener("click", (e)=>{
    SwitchTree(1);
});

tree_2.addEventListener("click", (e)=>{
    SwitchTree(2);
});

tree_3.addEventListener("click", (e)=>{
    SwitchTree(3);
});

function SwitchTree(tree) {
    if(tree == 1) {
        tree_type = "sat";
    } else if(tree == 2) {
        tree_type = "eff";
    } else if(tree == 3) {
        tree_type = "sig";
    }

    if(tree == 2 && cur_tree == 1) {
        view_box_x += width_offset;
    } else if(tree == 3 && cur_tree == 1) {
        view_box_x -= width_offset;
    } else if(tree == 1 && cur_tree == 2) {
        view_box_x -= width_offset;
    } else if(tree == 3 && cur_tree == 2) {
        view_box_x += width_offset;
    } else if(tree == 1 && cur_tree == 3) {
        view_box_x += width_offset;
    } else if(tree == 2 && cur_tree == 3) {
        view_box_x -= width_offset;
    } else {
        return null;
    }

    cur_tree = tree;
    UpdateTreesX();
    PlaceTreeTimer();

    for(var i=0; i<drag_centers.length; i++) {
        drag_centers[i][0] = drag_centers_original[i][0] + view_box_x;
    }

    // view_box_x = width_offset;
    // tree_type = 'eff';
}

function PlaceTreeTimer() {
    if(Math.abs(view_box_x - container.viewBox.baseVal.x) < width_offset / 2) {
        PlaceTrees();
    } else {
        setTimeout(() => { PlaceTreeTimer();  }, 1000 / 10);
    }
}

function UpdateWidthOffset() {
    width_height = container.clientWidth / container.clientHeight;
    console.log(width_height);
    if(width_height < 2) {
        width_height = 2;
    }
    width_offset = width_height * 494 + 186;
}

function UpdateTreesX() {
    if(cur_tree == 1) {
        trees_x = [trees_x[0], trees_x[0]+width_offset, trees_x[0]-width_offset];
    } else if(cur_tree == 2) {
        trees_x = [trees_x[1]-width_offset, trees_x[1], trees_x[1]+width_offset];
    } else if(cur_tree == 3) {
        trees_x = [trees_x[2]+width_offset, trees_x[2]-width_offset, trees_x[2]];
    }
}

function PlaceTrees() {
    tree_1.setAttributeNS(null, 'transform', 'translate(' + trees_x[0] + ' 0)');
    tree_2.setAttributeNS(null, 'transform', 'translate(' + trees_x[1] + ' 0)');
    tree_3.setAttributeNS(null, 'transform', 'translate(' + trees_x[2] + ' 0)');
}

window.addEventListener('resize', (e)=>{
    // console.log(container.clientWidth / container.clientHeight);
    PlaceTrees();
});



function ChangeColor(type) {
    if(type == 'major') {
        color_category = 'major';
        document.getElementById("major-filter-box").style.display = "flex";
        document.getElementById("gender-filter-box").style.display = "none";
    } else if(type == 'gender') {
        color_category = 'gender';
        document.getElementById("major-filter-box").style.display = "none";
        document.getElementById("gender-filter-box").style.display = "flex";
    }
    ChangeColorTimer(type);
}

function ChangeColorTimer(type) {
    var button_gender = document.getElementById("button-gender");
    var button_major = document.getElementById("button-major");
    if(type == 'major') {
        for(var i=0; i<butterflies.length; i++) {
            var butterfly = butterflies[i];
            var student = GetStudentById(butterfly.id);

            butterfly.children[1].setAttributeNS(null, 'fill', color_scheme.major[student.major].left);
            butterfly.children[2].setAttributeNS(null, 'fill', color_scheme.major[student.major].right);
        }
        
        button_major.style.backgroundImage = "linear-gradient(to right, #ac97b2, #959faa)";
        button_major.style.color = "#ffffff";
        button_gender.style.backgroundImage = "linear-gradient(to right, #eeeeee, #eeeeee)";
        button_gender.style.color = "#747474";

    } else if(type == 'gender') {
        for(var i=0; i<butterflies.length; i++) {
            var butterfly = butterflies[i];
            var student = GetStudentById(butterfly.id);

            butterfly.children[1].setAttributeNS(null, 'fill', color_scheme.gender[student.gender].left);
            butterfly.children[2].setAttributeNS(null, 'fill', color_scheme.gender[student.gender].right);
        }
        
        button_gender.style.backgroundImage = "linear-gradient(to right, #7497b2, #b77375)";
        button_gender.style.color = "#ffffff";
        button_major.style.backgroundImage = "linear-gradient(to right, #eeeeee, #eeeeee)";
        button_major.style.color = "#747474";
    }
}

function ToggleGenderFilter(key) {
    if(filters.gender[key] == true) {
        filters.gender[key] = false;
        document.getElementById('button-' + key).style.backgroundColor = "#eeeeee";
        document.getElementById('button-' + key).style.color = "#747474";
    } else {
        filters.gender[key] = true;
        document.getElementById('button-' + key).style.backgroundColor = color_scheme.gender[key].left;
        document.getElementById('button-' + key).style.color = "#ffffff";
    }
    UpdateButterfliesVisibility();
}

function ToggleMajorFilter(key) {
    if(filters.major[key] == true) {
        filters.major[key] = false;
        document.getElementById('button-' + key).style.backgroundColor = "#eeeeee";
        document.getElementById('button-' + key).style.color = "#747474";
    } else {
        filters.major[key] = true;
        document.getElementById('button-' + key).style.backgroundColor = color_scheme.major[key].left;
        document.getElementById('button-' + key).style.color = "#ffffff";
    }
    UpdateButterfliesVisibility();
}

function UpdateButterfliesVisibility() {
    for(var i=0; i<butterflies.length; i++) {
        var butterfly = butterflies[i];
        var student = GetStudentById(butterfly.id);
        if(filters.gender[student.gender] && filters.major[student.major]) {
            const year_factor = Math.sqrt(student.year) * 0.5;
            butterfly.setAttributeNS(null, 'r', 23 * Math.sqrt(year_factor));
            butterfly.setAttributeNS(null, 'visibility', 'visible');
        } else {
            butterfly.setAttributeNS(null, 'r', 0);
            butterfly.setAttributeNS(null, 'visibility', 'hidden');
        }
    }
}

tree_1.addEventListener("mouseenter", (e)=>{
    UpdateTreeHint(1, true);
});

tree_1.addEventListener("mouseleave", (e)=>{
    UpdateTreeHint(1, false);
});

tree_2.addEventListener("mouseenter", (e)=>{
    UpdateTreeHint(2, true);
});

tree_2.addEventListener("mouseleave", (e)=>{
    UpdateTreeHint(2, false);
});

tree_3.addEventListener("mouseenter", (e)=>{
    UpdateTreeHint(3, true);
});

tree_3.addEventListener("mouseleave", (e)=>{
    UpdateTreeHint(3, false);
});

function UpdateTreeHint(tree, hint) {
    for(var i=1; i<=3; i++) {
        if(i == cur_tree) {
            document.getElementById('hint_' + i).setAttributeNS(null, 'opacity', 0.2);
        } else {
            document.getElementById('hint_' + i).setAttributeNS(null, 'opacity', 0);
        }
    }
    if(tree == cur_tree) {
        document.getElementById('hint_' + tree).setAttributeNS(null, 'opacity', hint?0.7:0.2);
    }
}

function IntroButton() {
    if(intro_page == 0) {
        document.getElementById("intro-title").style.transform = "translateY(-20px)";
        document.getElementById("intro-title").style.opacity = "0";
        document.getElementById("intro-subtitle").style.transform = "translateY(-20px)";
        document.getElementById("intro-subtitle").style.opacity = "0";
    
        
        setTimeout(() => {
            document.getElementById("intro-title").style.display = "none";
            document.getElementById("intro-subtitle").style.display = "none";
            document.getElementById("help-box").style.display = "flex";
            document.getElementById("help-box").style.transform = "translateY(20px)";
            document.getElementById("help-box").style.opacity = "0";
            setTimeout(() => {
                document.getElementById("help-box").style.transform = "translateY(0px)";
                document.getElementById("help-box").style.opacity = "1";
            }, 100);
            intro_page = 1;
        }, 500);
    } else {
        document.getElementById("help-box").style.transform = "translateY(-20px)";
        document.getElementById("help-box").style.opacity = "0";
        document.getElementById("intro-overlay").style.opacity = "0";
        setTimeout(() => {
            document.getElementById("intro-overlay").style.display = "none";
        }, 500);
    }
}

function ShowHelp() {
    document.getElementById("intro-overlay").style.display = "flex";
    
    setTimeout(() => {
        document.getElementById("intro-overlay").style.opacity = "1";
        document.getElementById("help-box").style.transform = "translateY(0px)";
        document.getElementById("help-box").style.opacity = "1";
    }, 100);
}

document.getElementById("corner-help-box").addEventListener("mouseenter", (e)=>{
    document.getElementById("corner-help-box").style.width = "100px";
    document.getElementById("corner-help-box-hidden").style.width = "59px";
});

document.getElementById("corner-help-box").addEventListener("mouseleave", (e)=>{
    document.getElementById("corner-help-box").style.width = "40px";
    document.getElementById("corner-help-box-hidden").style.width = "0px";
});
