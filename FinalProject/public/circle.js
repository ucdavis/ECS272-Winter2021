circles = []
mouse = {x:960,  y:300};
var svgns = "http://www.w3.org/2000/svg";
container = document.getElementById("container");

for(let i=0; i<100; i++) {
    circle = document.createElementNS(svgns, "circle");
    
    circle.setAttributeNS(null, 'cx', Math.random()*1920);
    circle.setAttributeNS(null, 'cy', Math.random()*600);
    circle.setAttributeNS(null, 'vx', 0);
    circle.setAttributeNS(null, 'vy', 0);
    circle.setAttributeNS(null, 'r', Math.random()*5 + 5);
    circles.push(circle);
    container.appendChild(circle)
}

function Draw() {
    drag_center = mouse;

    for(let i=0; i<circles.length; i++) {
        circle_i = circles[i];
        // console.log(circle_i.getAttributeNS(null, 'cx'));
        r = parseFloat(circle_i.getAttributeNS(null, 'r'));
        drag_force = {x:0, y:0};
        repulsive_force = {x:0, y:0};
        threshold = 10;
        isBelow = true;

        for(let j=0; j<circles.length; j++) {
            if(i!=j) {
                circle_j = circles[j];
                dx = parseFloat(circle_i.getAttributeNS(null, 'cx')) - parseFloat(circle_j.getAttributeNS(null, 'cx'));
                dy = parseFloat(circle_i.getAttributeNS(null, 'cy')) - parseFloat(circle_j.getAttributeNS(null, 'cy'));
                d = Math.sqrt(dx*dx + dy*dy);
                
                if(dx == 0) {
                    dx = (Math.random() - 0.5) * 2 * r;
                }

                if(dy == 0) {
                    dy = (Math.random() - 0.5) * 2 * r;
                }

                if(d < parseFloat(circle_i.getAttributeNS(null, 'r')) + parseFloat(circle_j.getAttributeNS(null, 'r')) + 5) {
                    repulsive_force.x += dx;
                    repulsive_force.y += dy;
                }
                // if(d - parseFloat(circle_i.getAttributeNS(null, 'r')) + parseFloat(circle_j.getAttributeNS(null, 'r')) < threshold) {
                //     isBelow = false;
                // }
            }
        }

        repulsive_magnitude = Math.sqrt(repulsive_force.x * repulsive_force.x + repulsive_force.y * repulsive_force.y);
        if(repulsive_magnitude > 0) {
            // repulsive_force.x = repulsive_force.x / repulsive_magnitude * 5;
            // repulsive_force.y = repulsive_force.y / repulsive_magnitude * 5;
            repulsive_force.x = repulsive_force.x * 0.2;
            repulsive_force.y = repulsive_force.y * 0.2;
            // repulsive_force.x = repulsive_force.x * repulsive_magnitude / 100;
            // repulsive_force.y = repulsive_force.y * repulsive_magnitude / 100;
        }

        
        drag_force.x = drag_center.x - parseFloat(circle_i.getAttributeNS(null, 'cx'));
        drag_force.y = drag_center.y - parseFloat(circle_i.getAttributeNS(null, 'cy'));
        drag_magnitude = Math.sqrt(drag_force.x * drag_force.x + drag_force.y * drag_force.y);
        if(drag_magnitude > 0) {
            drag_force.x = drag_force.x / 60;
            drag_force.y = drag_force.y / 60;  
            // drag_force.x = drag_force.x / drag_magnitude * Math.sqrt(drag_magnitude) / 3;
            // drag_force.y = drag_force.y / drag_magnitude * Math.sqrt(drag_magnitude) / 3;   
            // drag_force.x = drag_force.x / drag_magnitude / Math.sqrt(drag_magnitude) * 10;
            // drag_force.y = drag_force.y / drag_magnitude / Math.sqrt(drag_magnitude) * 10; 
        }

        // if(repulsive_magnitude > parseFloat(circle_i.getAttributeNS(null, 'r')) / 2) {
        //     // drag_force.x = 0;
        //     // drag_force.y = 0;
        //     drag_force.x /= 10;
        //     drag_force.y /= 10;
        // }
        
        circle_i.setAttributeNS(null, 'vx', parseFloat(circle_i.getAttributeNS(null, 'vx')) * 0.8 + drag_force.x + repulsive_force.x);
        circle_i.setAttributeNS(null, 'vy', parseFloat(circle_i.getAttributeNS(null, 'vy')) * 0.8 + drag_force.y + repulsive_force.y);

        // if(length > 0) {
        //     displacement.x = displacement.x  / length * 2;
        //     displacement.y = displacement.y  / length * 2;
        // }


        circle_i.setAttributeNS(null, 'cx', parseFloat(circle_i.getAttributeNS(null, 'cx')) + parseFloat(circle_i.getAttributeNS(null, 'vx') * 0.1));
        circle_i.setAttributeNS(null, 'cy', parseFloat(circle_i.getAttributeNS(null, 'cy')) + parseFloat(circle_i.getAttributeNS(null, 'vy') * 0.1));
    }
    setTimeout(() => { Draw();  }, 1000 / 60);
}

setTimeout(() => { Draw();  }, 1000);


container.addEventListener("mousemove", (e)=>{
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
});