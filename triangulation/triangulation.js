dotCol = [];
lineCol = [];
nbDot = 20;
marge = 10;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < nbDot; i++) {
        let x = random(marge, width - marge);
        let y = random(marge, height - marge);
        append(dotCol, [x, y]);
    }
    noLoop();
}


function draw() {
    background(0)
    strokeWeight(1)
    stroke(255);
    lineCol = []
    for (let i = 0; i < nbDot; i++) {
        point(dotCol[i][0], dotCol[i][1]);
        for (let j = i + 1; j < nbDot; j++) {
            let cross = false;
            for (let k = 0; k < lineCol.length; k++) {
                if (lineLine(dotCol[lineCol[k][0]][0], dotCol[lineCol[k][0]][1], dotCol[lineCol[k][1]][0], dotCol[lineCol[k][1]][1],
                        dotCol[i][0], dotCol[i][1], dotCol[j][0], dotCol[j][1])) {
                    cross = true;
                } 
            }
            if (!cross) {
                line(dotCol[i][0], dotCol[i][1], dotCol[j][0], dotCol[j][1]);
                append(lineCol, [i, j])
            }
        }
    }
}

function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {

    // calculate the distance to intersection point
    let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    let marge = 0.001;

    // if uA and uB are between 0-1, lines are colliding
    if (uA >= marge && uA <= 1-marge && uB >= marge && uB <= 1-marge) {
        return true;
    }
    return false;
}

function legalise(line){ //indice line  
    let p1 = lineCol[line][0];
    let p2 = lineCol[line][1];

    for (let i = 0; i < array.length; i++) {
        
    }

}

function isTriang(p1, p2, p3){

}