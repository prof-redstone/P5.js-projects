let posBH;
let partCol = [];
let nbPart = 200;
let G = 10000; //mass BH et const gravitationnel
let marge = 10

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    //noStroke();
    posBH = createVector(width / 2, height / 2);

    for (let i = 0; i < nbPart; i++) {
        partCol[i] = new Particle(width - 10, height / 2 - i * 6 + nbPart*1.5);
    }
}


function draw() {
    //background(200);
    fill(color("#000"))
    //circle(posBH.x, posBH.y, 50);
    fill(color("#F00"))
    for (const p of partCol) {
        
        let dist = sqrt((posBH.x - p.pos.x) ** 2 + (posBH.y - p.pos.y) ** 2);
        let force = G / (dist * dist + marge);
        let angle = atan2((posBH.y- p.pos.y), (posBH.x- p.pos.x))
        p.vel = createVector(cos(angle) * force, sin(angle) * force);


        p.show();
        p.update();

    }
}

function Particle(x, y) {
    this.pos = createVector(x, y);
    this.speed = createVector(-1, 0);
    this.vel = createVector(0, 0);

    this.lastPos = createVector(x, y);

    
    this.update = function() {
        this.speed.add(this.vel).normalize().mult(10);

        this.lastPos.set(this.pos);
        this.pos.add(this.speed);
    }
    this.show = function() {
        line(this.lastPos.x, this.lastPos.y, this.pos.x, this.pos.y)
        //circle(this.pos.x, this.pos.y, 5);
        //rect(this.pos.x, this.pos.y, 5, 5)
    }
}