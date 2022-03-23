var inc = 0.13;
var scl = 10;
var cols, rows;
var zoff = 0
//var fr;

var particles = [];
var flowfield = [];


function setup() {
    createCanvas(500, 500);
    cols = floor(width / scl);
    rows = floor(height / scl);

    //fr = createP("")

    flowfield = new Array(cols * rows)

    for (let i = 0; i < 1500; i++) {
        particles[i] = new Particle()
    }

    background(17,75,95)
}


function draw() {
    //background(255)
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(0.05)
            flowfield[index] = v;
            xoff += inc;
            /*stroke(0);
            push();
            translate(x * scl, y * scl);
            rotate(v.heading());
            //line(0, 0, scl, 0);
            pop();*/
        }
        yoff += inc;
    }

    for (let i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield)
        particles[i].update()
        particles[i].show();
        particles[i].edges();
        
    }


    zoff += 0.002

    //fr.html(floor(frameRate()));
}