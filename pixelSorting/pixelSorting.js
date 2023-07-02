let img;
let res;
let width = 400;
let height = 400;
bruit.seed(Math.random());


function preload() {
    img = loadImage("img/rain.jpg");
}

function setup() {
    width = img.width;
    height = img.height;
    createCanvas(width, height);

    res = createImage(img.width, img.height);
    res = img.get();


    sortImage()
}


function draw() {
    background(0);
    image(res, 0, 0);
    noStroke();
    fill(255);
}

function sortImage() {

    res.loadPixels();

    let dir = "up";
    let inv = true;
    let maxLen = 20;
    let minLen = 1;
    let strokeSize = 1;

    if (dir == "left") {
        for (let i = 0; i < height; i++) { // i la ligne principale

            let str = phase(floor(i / strokeSize), minLen, maxLen, width + maxLen); //min et max de la longueur des tries
            let tot = -maxLen;
            for (let m = 0; m < str.length + 1; m++) { //petite ligne
                let start = max(0, tot);
                let end = min(width, str[m + 1] + tot);
                tot += str[m + 1]

                for (let j = start; j < end; j++) {
                    let indmin = j;
                    let valmin = getPix(i, j);

                    for (let k = j + 1; k < end; k++) {
                        if (comp(getPix(i, k), valmin, "green") == inv) {
                            valmin = getPix(i, k);
                            indmin = k;
                        }
                    }
                    //swap
                    swapPix(i, j, i, indmin);
                }
            }
        }
    } else {
        for (let i = 0; i < width; i++) { // i la ligne principale

            let str = phase(floor(i / strokeSize), minLen, maxLen, height + maxLen); //min et max de la longueur des tries
            let tot = -maxLen;
            for (let m = 0; m < str.length + 1; m++) { //petite ligne
                let start = max(0, tot);
                let end = min(height, str[m + 1] + tot);
                tot += str[m + 1]

                for (let j = start; j < end; j++) {
                    let indmin = j;
                    let valmin = getPix(j, i);

                    for (let k = j + 1; k < end; k++) {
                        if (comp(getPix(k,i), valmin, "green") == inv) {
                            valmin = getPix(k,i);
                            indmin = k;
                        }
                    }
                    //swap
                    swapPix(j,i, indmin, i);
                }
            }
        }
    }


    res.updatePixels();
}

function phase(i, min, max, widthLine) {
    let nbs = [0]
    let tot = 0;
    while (tot < widthLine) {
        let nb = min + floor(getRND(i, tot) * (max - min));
        tot += nb;
        append(nbs, nb)
    }
    return nbs;
}

function getPix(i, j) {
    return [
        res.pixels[i * width * 4 + j * 4 + 0],
        res.pixels[i * width * 4 + j * 4 + 1],
        res.pixels[i * width * 4 + j * 4 + 2]
    ];
}

function swapPix(i, j, a, b) {
    let temp = [
        res.pixels[i * width * 4 + j * 4 + 0],
        res.pixels[i * width * 4 + j * 4 + 1],
        res.pixels[i * width * 4 + j * 4 + 2]
    ];

    res.pixels[i * width * 4 + j * 4 + 0] = res.pixels[a * width * 4 + b * 4 + 0];
    res.pixels[i * width * 4 + j * 4 + 1] = res.pixels[a * width * 4 + b * 4 + 1];
    res.pixels[i * width * 4 + j * 4 + 2] = res.pixels[a * width * 4 + b * 4 + 2];

    res.pixels[a * width * 4 + b * 4 + 0] = temp[0];
    res.pixels[a * width * 4 + b * 4 + 1] = temp[1];
    res.pixels[a * width * 4 + b * 4 + 2] = temp[2];
}

function comp(a, b, mode) { //comparaison de 2 pixels
    switch (mode) {
        case "hue":
            return hue(color(a[0], a[1], a[2])) > hue(color(b[0], b[1], b[2]))
        case "blue":
            return a[2] > b[2];
        case "green":
            return a[1] > b[1];
        case "red":
            return a[1] > b[1];
    }
    return a[0] + a[1] + a[2] > b[0] + b[1] + b[2];//light
}

function getRND(seed1, seed2) {
    return Math.abs(bruit.simplex2(seed1 / 1, seed2 / 1));
}

function keyTyped() {
    if (key === 's') {
        res.save('img-' + Date.now(), 'png');
    }
}