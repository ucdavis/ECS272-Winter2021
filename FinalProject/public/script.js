students = [];
student_indices = {};
butterflies = [];
groups = [];
phase = 1;
cur_tree = 1;
color_category = 'gender';
background_colors = ["#E4DBCF", "#A3ADA4", "D9DBDB"];
view_box_x = 0;
tree_type = 'sat';
width_offset = 10000;

filters = {
    gender: {
        Male: true,
        Female: true,
        Other: true
    }
}

var tree_1 = document.getElementById("tree_1");
var tree_2 = document.getElementById("tree_2");
var tree_3 = document.getElementById("tree_3");

trees_x = [0, 10000, -10000];
UpdateWidthOffset();
UpdateTreesX();
PlaceTrees();

document.getElementById("inner").style.backgroundColor = background_colors[0];

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

    var rgb = {r: Math.ceil(rgb_src.r + (rgb_dest.r - rgb_src.r) * 0.1), g: Math.ceil(rgb_src.g + (rgb_dest.g - rgb_src.g) * 0.1), b: Math.ceil(rgb_src.b + (rgb_dest.b - rgb_src.b)*0.1)}

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

function ToggleGenderFilter(key) {
    if(filters.gender[key] == true) {
        filters.gender[key] = false;
        document.getElementById('button-' + key).style.backgroundColor = "#eeeeee";
        document.getElementById('button-' + key).style.color = "#747474";
        UpdateButterfliesVisibility('gender', key, false);
    } else {
        filters.gender[key] = true;
        document.getElementById('button-' + key).style.backgroundColor = color_scheme.gender[key].left;
        document.getElementById('button-' + key).style.color = "#ffffff";
        UpdateButterfliesVisibility('gender', key, true);
    }
}

function UpdateButterfliesVisibility(type, key, visibility) {
    for(var i=0; i<butterflies.length; i++) {
        var butterfly = butterflies[i];
        var student = GetStudentById(butterfly.id);
        if(type == 'gender') {
            if(student.gender == key) {
                if(visibility) {
                    const year_factor = Math.sqrt(student.year) * 0.5;
                    butterfly.setAttributeNS(null, 'r', 23 * Math.sqrt(year_factor));
                    butterfly.setAttributeNS(null, 'visibility', 'visible');
                } else {
                    butterfly.setAttributeNS(null, 'r', 0);
                    butterfly.setAttributeNS(null, 'visibility', 'hidden');
                }
            }
        }
    }
}

tree_1.addEventListener("mouseenter", (e)=>{
    UpdateTreeHint(1, true);
});

tree_1.addEventListener("mouseleave", (e)=>{
    UpdateTreeHint(1, false);
});

// tree_2.addEventListener("click", (e)=>{
//     SwitchTree(2);
// });

// tree_3.addEventListener("click", (e)=>{
//     SwitchTree(3);
// });

function UpdateTreeHint(tree, hint) {
    document.getElementById('hint_' + tree).setAttributeNS(null, 'opacity', hint?1:0.4);
}