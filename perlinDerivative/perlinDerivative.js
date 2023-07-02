var gride = [];
var zoom = 2000;
var vecZoom = 5;
var vecSize = 10;
let width = 3141/2;
let height = 1000;

var canvas;

var par = [];
var nbPar = 250
for (let i = 0; i < nbPar-1; i++) {
    par[i] = new Particle(i*(width/nbPar),height-5)
}

function setup() {
    canvas = createCanvas(width,height);
    canvas.parent('canvasContainer');
    background(255)
    for (let i = 0; i < width/vecZoom; i++) {
        gride[i] = []
        for (let j = 0; j < height/vecZoom; j++) {
            gride[i][j] = [];

        }
    }
    noStroke();
    /*for (let i = 0; i < width/20; i++) {
        for (let j = 0; j < height/20; j++) {
            fill(map(noise(i/zoom,j/zoom),0,1,0,255));
            rect(i*20,j*20,1*20,1*20);
        }
    }*/

    stroke(0);
    for (let i = 0; i < width/vecZoom; i++) {
        for (let j = 0; j < height/vecZoom; j++) {
            let x = map(noise(i/zoom*vecZoom,j/zoom*vecZoom) - noise((i+1)/zoom*vecZoom,(j)/zoom*vecZoom) , -1,1,-vecZoom*vecSize,vecZoom*vecSize);
            let y = map(noise(i/zoom*vecZoom,j/zoom*vecZoom) - noise((i)/zoom*vecZoom,(j+1)/zoom*vecZoom) , -1,1,-vecZoom*vecSize,vecZoom*vecSize);
            gride[i][j] = [x,y];
            //line(i*vecZoom, j*vecZoom, i*vecZoom + x, j*vecZoom + y);

        }
    }
    for (let i = 0; i < par.length; i++) {
        par[i].update();
        par[i].update();
    }
}


function draw() {
    strokeWeight(2)
    for (let i = 0; i < par.length; i++) {
        par[i].update();
        par[i].draw();
    }
}

function Particle(x,y){
    this.Ix = x;
    this.Iy = y;
    this.x = x;
    this.y = y;
    

    this.lastx = x;
    this.lasty = y;

    this.update = function(){
        this.lastx = this.x;
        this.lasty = this.y;
        let speedConstX = 7 * 100;
        let speedConstY = 3 *10;
        let speedX = sin(this.y/50)*sin(this.x/500)*80 //V(floor(this.x/vecZoom),floor(this.y/vecZoom))[0] * speedConstX;
        let speedY = -2.5//  V(floor(this.x/vecZoom),floor(this.y/vecZoom))[1] * speedConstY;
        this.x = this.Ix + speedX;
        this.y += -5 //this.Iy + speedY;
    }

    this.draw = function(){
        line(this.lastx,this.lasty, this.x, this.y);
    }
}

function V(x,y){
    if(x >= 0 && x < gride.length && y >= 0 && y < gride[0].length){
        return gride[x][y]
    }else{
        return [0,0]
    }
}

function Screen(){
    console.log(canvas)
    saveCanvas(canvas, Date.now().toString() , "jpg")
}


function newNoise(){
    for (let i = 0; i < width/vecZoom; i++) {
        for (let j = 0; j < height/vecZoom; j++) {
            gride[i][j] = [];
        }
    }
    for (let i = 0; i < width/vecZoom; i++) {
        for (let j = 0; j < height/vecZoom; j++) {
            let x = map(noise(i/zoom*vecZoom,j/zoom*vecZoom) - noise((i+1)/zoom*vecZoom,(j)/zoom*vecZoom) , -1,1,-vecZoom*vecSize,vecZoom*vecSize);
            let y = map(noise(i/zoom*vecZoom,j/zoom*vecZoom) - noise((i)/zoom*vecZoom,(j+1)/zoom*vecZoom) , -1,1,-vecZoom*vecSize,vecZoom*vecSize);
            gride[i][j] = [x,y];
            //line(i*vecZoom, j*vecZoom, i*vecZoom + x, j*vecZoom + y);

        }
    }
}