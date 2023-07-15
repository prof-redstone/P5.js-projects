let img;
let mask;
let res;
let width = 400;
let height = 400;
bruit.seed(Math.random());


function preload() {
    img = loadImage("img/cloudLow.jpg");
    mask = loadImage("img/tree3LowMask.jpg");
}

function setup() {
    width = img.width;
    height = img.height;
    createCanvas(width, height);

    res = createImage(img.width, img.height);
    res = img.get();


    sortImage()
    //sortImageMask()
}


function draw() {
    background(0);
    image(res, 0, 0);
    noStroke();
    fill(255);
}

function sortImage() {

    res.loadPixels();

    let dir = "left";
    let inv = false;
    let maxLen = 300;
    let minLen = 200;
    let strokeSize = 2;
    let mode = "hue";

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
                        if (comp(getPix(k, i), valmin, mode) == inv) {
                            valmin = getPix(k, i);
                            indmin = k;
                        }
                    }
                    //swap
                    swapPix(j, i, indmin, i);
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

function sortImageMask() {
    //up
    res.loadPixels();
    mask.loadPixels();
    let inv = true;
    let maxLen = 200;
    let minLen = 50;
    let cut = true;
    let mode = "red"
    let strokeWeight = 50;

    for (let i = 0; i < width; i++) { // i la ligne principale

        let str = phaseMask(i, minLen, maxLen, cut, strokeWeight);

        for (let m = 0; m < str.length; m++) { //petite ligne
            let start = str[m][0];
            let end = str[m][1];

            for (let j = start; j < end; j++) {
                let indmin = j;
                let valmin = getPix(j, i);

                for (let k = j + 1; k < end; k++) {
                    if (comp(getPix(k, i), valmin, mode) == inv) {
                        valmin = getPix(k, i);
                        indmin = k;
                    }
                }
                //swap
                swapPix(j, i, indmin, i);
            }
        }
    }
    res.updatePixels();
    mask.updatePixels();
}

function phaseMask(i, min, max, cut, strokeWeight) { //juste la ligne
    let colstrTemp = [] // collection de string a sort dans la colonne

    let start = null;
    for (let j = 0; j < height; j++) {
        if (mask.pixels[j * width * 4 + i * 4 + 0] > 255 / 2) { //si pixel rouge et avant noire
            if (start == null) {
                start = j
            }
        } else {
            if (start != null) {
                append(colstrTemp, [start, j - 1]);
                start = null;
            }
        }
    }
    if (start != null) {
        append(colstrTemp, [start, height - 1]);
    }

    //recouper les lignes
    if(!cut){
        return colstrTemp;
    }

    let colstr = [];
    for (let j = 0; j < colstrTemp.length; j++) {
        let start = colstrTemp[j][0];
        let tot = start;
        while (tot < colstrTemp[j][1]) {
            //let nb = min + floor(getRND(i, tot) * (max - min));
            let nb = 1 + floor(getRND(floor(i / strokeWeight), tot) * (max - min));//+1 pour eviter les while true
            if(tot != colstrTemp[j][0]){//pour éviter les patterne sur les bords
                nb += min;
            }
            tot += nb;
            if(tot > colstrTemp[j][1]){
                append(colstr, [start, colstrTemp[j][1]])
            }else{
                append(colstr, [start, tot])
                start = tot;
            }
            
        }
    }
    return colstr
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
        case "light":
            return a[0] + a[1] + a[2] > b[0] + b[1] + b[2]; //light
    }

}

function getRND(seed1, seed2) {
    return Math.abs(bruit.simplex2(seed1 / 1, seed2 / 1));
}

function keyTyped() {
    if (key === 's') {
        res.save('img-' + Date.now(), 'jpg');
    }
}