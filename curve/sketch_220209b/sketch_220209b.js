let frame = 0;
let count = 0;

function setup() {
    createCanvas(windowWidth, windowHeight)
    background(0)
}


function draw() {
    /*if(count%100 == 0){

        background("rgba(0,0,0,0.51)");
    }*/
    noFill()
    //col = color("#FFF")
    let col = LerpPalette([color("#ffae03"),color("#e67f0d"),color("#fe4e00"),color("#e9190f")], mod(frame/3,1));
    col.setAlpha(30)
    stroke(col)

    bezier(Get(10)*windowWidth,Get(20)*windowHeight,Get(30)*windowWidth,Get(40)*windowHeight,Get(50)*windowWidth,Get(60)*windowHeight,Get(70)*windowWidth,Get(80)*windowHeight)

    frame += 0.002
    count ++
}

function Get(offset){
    return map(noise(frame+offset),0,1,0,1)
}


function LerpPalette(pal = [], x = 0, loop = true){
    let col = color("#000");
    if(pal.length == 0){return color("#000");} //pas de couleur renvoi noir
    if(pal.length == 1){return color(pal[0]);} //si 1 couleur la renvoi

    let len = pal.length;//min 2
    let interpPal = x * (len);
    let col1 = floor(interpPal)
    let col2;
    if (loop) {
        col2 = (col1+1)%(len)
    }else{
        col2 = (col1+1)
        if(col2 >= len){col2 = len-1};
    }
    
    if(col1 == col2){return color(pal[col1]);}

    let interIndex = interpPal - col1

    col = color(
        pal[col1].levels[0] + (pal[col2].levels[0] - pal[col1].levels[0]) * interIndex,
        pal[col1].levels[1] + (pal[col2].levels[1] - pal[col1].levels[1]) * interIndex,
        pal[col1].levels[2] + (pal[col2].levels[2] - pal[col1].levels[2]) * interIndex
    )

    return col
}

function mod(x,y){
    while(x > y){
        x -= y;
    }
    return x
}