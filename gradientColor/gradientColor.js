let colP = [];
let sizeCel = 1
let divGarde = 0.1

let colorList = [
    "#ff5e5b",
    "#ffd5ff",
    "#2a4747",
    "#00cecb",
    "#ffed66"
]

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 50; i++) {
        colP[i] = new Point(random(0,width), random(0,height), color(colorList[floor(random(0,5))]) /*color(random(0,255),random(0,255),random(0,255))*/)
    }
    noLoop();
    noStroke()
}


function draw() {
    for (let i = 0; i < width / sizeCel; i++) {
        for (let j = 0; j < height / sizeCel; j++) {
            let tab = [];
            for (let k = 0; k < colP.length; k++) {
                let dist = 1 / (divGarde + sqrt((colP[k].x - i*sizeCel) ** 2 + (colP[k].y - j*sizeCel) ** 2))**3
                tab[k] = [
                    colP[k].col.levels[0], colP[k].col.levels[1], colP[k].col.levels[2], dist
                ]
            }
            let red = 0;
            let green = 0;
            let blue = 0;
            let coef = 0;
            let maxCoef = 0;
            let indice =0;
            for (let k = 0; k < tab.length; k++) {
                red += tab[k][0] * tab[k][3];
                green += tab[k][1] * tab[k][3];
                blue += tab[k][2] * tab[k][3];
                coef += tab[k][3] ;

                if (tab[k][3] > maxCoef) {
                    maxCoef = tab[k][3];
                    indice = k
                }
            }

            red /= coef;
            green /= coef;
            blue /= coef;

            fill(color(red, green, blue))

            fill(color(tab[indice][0],tab[indice][1],tab[indice][2]))

            rect(i*sizeCel, j*sizeCel, sizeCel, sizeCel);


            if (i == 0 && j == 0) {
                //console.log(tab)
            }
        }
    }
}


function Point(x, y, col) {
    this.x;
    this.y;
    this.col;
    this.pow = 1;


    this.setup = function(x = -1, y = -1, col = color("#FFF")) {
        if (x != 1) {
            this.x = x;
        } else {
            this.x = random(0, width);
        }
        if (y != 1) {
            this.y = y;
        } else {
            this.y = random(0, height);
        }

        this.col = col;
    }


    this.setup(x, y, col);
}