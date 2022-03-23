var sizeVec = 10;
var vectorField = [];
var collec = [];
var nbPoint = 4000;
var time = 0;
var speed = 1.3;
var timeToLive = 10;
var img;

var sizeP = 4;
var spreadSizeP = 2;
var directP = 3.1415;
var directSpreadP = 0;


function preload() {
    img = loadImage("img/tree2.jpg");
}


function setup() {
    createCanvas(img.width, img.height);
    noStroke()

    SliderInit()

    

    for (let i = 0; i < width / sizeVec; i++) {
        vectorField[i] = []
        for (let j = 0; j < height / sizeVec; j++) {
            vectorField[i][j] = map(noise(i / 5, j / 5), 0, 1, -1, 1)
        }
    }

    for (let i = 0; i < nbPoint; i++) {
        let x = random(0, width)
        let y = random(0, height)
        let col = img.get(x, y)
        collec[i] = new Point();
        collec[i].reset(x, y, col)
    }
}


function draw() {

    for (let i = 0; i < width / sizeVec; i++) {
        vectorField[i] = []
        for (let j = 0; j < height / sizeVec; j++) {
            vectorField[i][j] = map(noise(i / 5, j / 5, time / 50), 0, 1, -3, 3)
        }
    }

    for (let i = 0; i < collec.length; i++) {
        if (collec[i].time > collec[i].timeToLive) {
            let x = random(0, width)
            let y = random(0, height)
            let col = img.get(x, y)
            collec[i].reset(x,y,col)
        }
        collec[i].update()
        collec[i].render()
    }

    //update slider
    Slider()

    time++
}


function Point() {
    this.x;
    this.y;
    this.col;
    this.size;
    this.angle;
    this.direct;
    this.timeToLive;
    this.time;

    this.reset = function(x, y, col) {
        this.x = x;
        this.y = y;
        this.col = col;
        this.time = 0;
        this.size = random(sizeP - spreadSizeP, sizeP + spreadSizeP);
        this.direct = random(directP - directSpreadP, directP + directSpreadP);
        this.timeToLive = random(12, 5);
    }

    this.update = function() {
        this.angle = vectorField[min(max(floor(this.x / sizeVec), 0), vectorField.length - 1)][min(max(floor(this.y / sizeVec), 0), vectorField[0].length - 1)]
        this.direct += this.angle / 10;
        this.x += cos(this.direct) * speed;
        this.y += sin(this.direct) * speed;


        this.time++

    }
    this.render = function() {
        
        fill(this.col)
        circle(this.x, this.y, this.size)
    }
}


let slSize;
let slSpreadSize;
let slDirectP = 3.1415;
let slDirectSpreadP = 0;

function SliderInit(){
    slSize = createSlider(0,20,4,0);
    slSpreadSize = createSlider(0,10,1,0);
    slDirectP = createSlider(0,2*3.1415,3.1415,0);
    slDirectSpreadP = createSlider(0,3.1415,0.5,0);
}

function Slider(){
    spreadSizeP = slSpreadSize.value();
    sizeP = slSize.value();
    directP = slDirectP.value();
    directSpreadP = slDirectSpreadP.value();
}