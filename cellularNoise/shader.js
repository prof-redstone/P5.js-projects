
let myShader;

var recording = false;
var gif;

function preload() {
    myShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    console.log(width, height)
    pixelDensity(1);
}

function draw() {
    background(220);
    myShader.setUniform('resolution', [width, height]);
    myShader.setUniform('mouse', [map(mouseX, 0, width, 0, 1), map(mouseY, 0, height, 0, 1)]);
    myShader.setUniform('time', millis() / 1000.0);

    shader(myShader);
    rect(0, 0, width, height);
}