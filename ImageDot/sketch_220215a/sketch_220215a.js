let img;
let canvas;
let nbPointMax = 100000;
let nbPoint = 0;
let collect = [];
let scale = 2
let minVal = 255;
let maxVal = 0

let folder = "img/";
let nom = "mouette.jpg"

function preload() {
    img = loadImage(folder + nom);
}


function setup() {
    scale = 3
    canvas = createCanvas(img.width * scale, img.height * scale);
    img.loadPixels();
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let px = img.get(x, y);
            let r = px[0];
            let g = px[1];
            let b = px[2];
            let bright = ((0.2126 * r) + (0.7152 * g) + (0.0722 * b));

            if (bright < minVal) {
                minVal = floor(bright)
            }
            if (bright > maxVal) {
                maxVal = ceil(bright)
            }

            img.set(x, y, color(bright));
        }
    }
    img.updatePixels();
    //image(img, 0, 0);
    background(0);
    fill(255)
    noStroke()
}


function draw() {

    if (nbPoint < nbPointMax) {
        let tryPoint = 1000;
        for (let i = 0; i < tryPoint; i++) {
            let x = random(0, img.width);
            let y = random(0, img.height);
            let dismin = map(img.get(x, y)[0], minVal, maxVal, 10, 4) *scale;
            let flag = true;
            for (let j = 0; j < collect.length; j++) {
                let dis = sqrt(pow(collect[j].x - x, 2) + pow(collect[j].y - y, 2)) *scale ;
                if (dis < dismin) {
                    flag = false;
                    j = collect.length;
               }
            }
            if (flag) {
                nbPoint++;
                let size = map(img.get(x, y)[0], minVal, maxVal, -2, 4.5);
                size = size < 1 ? 1 : size
                circle(x * scale, y * scale, size*scale);
                collect[collect.length] = new Dot(x, y);
            }
        }
    }else{console.log("fini")}
}

function Dot(x, y) {
    this.x = x;
    this.y = y;
}

function Save(t=""){
    if (t == "") {
        saveCanvas(canvas, nom, 'jpg')
        
    }else{
        saveCanvas(canvas, t, 'jpg')
    }
}