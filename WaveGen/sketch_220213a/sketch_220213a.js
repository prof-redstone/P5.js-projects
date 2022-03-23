var size = 15;
var collecGen = []
var nbGen = 2;
var time = 0;
var constS = 15;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < nbGen; i++) {
        collecGen[i] = new Gen((i+1)*5);
        collecGen[i].Setup()
    }
}


function draw() {
    background(255)
    //fill(200)
    noStroke()

    for (let i = 0; i < width/size; i++) {
        for (let j = 0; j < height/size; j++) {
            let val = 1;    
            let col = Calcule(i,j) 
            fill(col)
            ellipse(i*size,j*size, val*constS,val*constS)
            //fill(val*100)
            //rect(i*size,j*size, size, size)
        }    
    }

    time++;
}

function Calcule(x,y){
    let val = 1;
    let col = color("#FFF")
    for (let i = 0; i < collecGen.length; i++) {
        let d = sqrt(pow(collecGen[i].x - x*size, 2) + pow(collecGen[i].y - y*size, 2));
        let f = collecGen[i].freq;
        let off =  collecGen[i].offset;
        let t = time/20
        //for angle
        let X =  x*size - collecGen[i].x;
        let Y =  y*size - collecGen[i].y;
        let angle = atan2(Y,X);
        col.levels[i] = 126 - sin(d*f*-0.005 + off + t + (angle))*126
        //val *= sin(d*f*-0.005 + off + t)
    }
    return col
}


function Gen(f){
    this.x;
    this.y;
    this.freq= f;
    this.offset;

    this.Setup = function(){
        this.x = random(0,width);
        this.y = random(0,height);
        //this.freq = random(1,15)/5;
        this.offset = random(0, TAU);
    }

}