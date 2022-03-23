let width = 700;
let height = 700;
let time = 0
let nbPar = 500;
let par = []
let fadeSpeed = 3

function setup() {
    canvas = createCanvas(width, height);
    canvas.parent('canvasContainer');

    for (let i = 0; i < nbPar; i++) {
        par[i] = new Par(random(0, 1)+PI, random(0, PI));
    }
    background(0)
}


function draw() {
    //background(0)
    for (let i = 0; i < par.length; i++) {
        par[i].draw();
    }


    loadPixels();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let index = (x + y * width) * 4;
            if(pixels[index + 0] > 0){
                pixels[index + 0] -= fadeSpeed;
                pixels[index + 1] -= fadeSpeed;
                pixels[index + 2] -= fadeSpeed;

            }
        }
    }
    updatePixels();

    time += 0.01
}

function Par(x, y) {
    this.x = x
    this.y = y
    this.t = random(0, PI * 0.8);


    this.draw = function() {
        stroke(255)
        point(map(sin(this.x + (time + this.t)), -1, 1, 0.1, 0.9) * width, map(sin(this.y + (time + this.t)), -1, 1, 0.1, 0.9) * height)
    }
}



function Screen(){
    console.log(canvas)
    saveCanvas(canvas, Date.now().toString() , "jpg")
}