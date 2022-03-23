let gride = []
let nbwidth = 80;
let nbheight = 80;
let space = 8;
let time = 0
let size = 50
let repulseCol = []

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke()

    for (let i = 0; i < nbwidth; i++) {
        gride[i] = []
        for (let j = 0; j < nbheight; j++) {
            gride[i][j] = new Point(i*space, j*space);
        }
    }

    for (let i = 0; i < 2; i++) {
        repulseCol[i] = new Repulse(random(0,nbwidth*space), random(0, nbheight*space)) 
    }
}


function draw() {
    background(0)
    for (let i = 0; i < nbwidth; i++) {
        for (let j = 0; j < nbheight; j++) {
            /*gride[i][j].movx = 2.71**map(noise(i/size, j/size, time/200), 0,1,0,8)
            gride[i][j].movy = 2.81**map(noise(i/size, j/size, time/200 +1000), 0,1,0,7)*/
            let repForce = createVector(0,0);


            for (let k = 0; k < repulseCol.length; k++) {
                let dist = sqrt((repulseCol[k].x - i*space)**2 + (repulseCol[k].y - j*space)**2)
                let force = Math.log10(10000/(dist**0.1 +5)+1)*20
                let angle = atan2(repulseCol[k].y - j*space, repulseCol[k].x - i*space)
                let vect = createVector(force*cos(angle),force*sin(angle))
                repForce.add(vect);
                
            }
            gride[i][j].movx = repForce.x*-1
            gride[i][j].movy = repForce.y*-1
        
            ellipse(gride[i][j].x + gride[i][j].movx, gride[i][j].y + gride[i][j].movy, 5, 5)
        }
    }

    for (let i = 0; i < repulseCol.length; i++) {
        repulseCol[i].move()
    
    }

    time++
}


function Point(x, y) {
    this.x = x
    this.y = y

    this.movx = 0;
    this.movy = 0;
}

function Repulse(x,y){
    this.x = x
    this.y = y
    this.dir = 0
    this.speed = 0.2

    this.move = function(){
        this.dir += map(noise(this.x,this.y, time/1000), 0,1 , -0.1 , 0.1);
        this.x += cos(this.dir)* this.speed;
        this.y += sin(this.dir)* this.speed;
    }
}