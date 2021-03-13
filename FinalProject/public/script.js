students = [];
student_indices = {};
butterflies = [];
groups = [];
phase = 1;
color_category = 'gender';
background_colors = ["#E4DBCF", "#FFFFFF"];
view_box_x = 0;
tree_type = 'sat';

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

