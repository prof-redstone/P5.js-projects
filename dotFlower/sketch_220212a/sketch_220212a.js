var c = 5
var p = 1.61803398875
var highlight = 34
var highlightOff = 13
var exp = 0.5

function setup() {
    createCanvas(windowWidth,windowHeight);
    //angleMode(DEGREES);
}


function draw() {  
    background("#FFF")
    strokeWeight(5)
    for (let i = 0; i < 4000; i++) {
        var col = color('#000')
        let r = i/5 //c*sqrt((i))
        let x = cos(i*p*TAU) * r
        let y= sin(i*p*TAU) * r
        
        if ((i + highlightOff) % highlight == 0) {
            //col = color('#F00')
        }
        fill(col)
        noStroke()
        ellipse(x + width/2, y+ height/2, 5, 5)
    }
    p+=0.00005
    exp+=0.01
}
