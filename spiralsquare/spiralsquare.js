

let W = 900;
let H = 900;
let time = 0;


function setup() {
    createCanvas(W, H);
    frameRate(30);
    strokeWeight(3);
    let c = color(255, 240, 180);
    stroke(c);
}


function draw() {
    background(100);
    let s = 10;
    let nb = 30;
    let amp = 80;
    
    spi(  300 +cos(time/100)*amp,  300 +sin(time/50)*amp,  s,nb);
    spi(  600 -cos(time/100)*amp,  300 +sin(time/50)*amp,  s,nb);
    spi(  300 +cos(time/100)*amp,  600 -sin(time/50)*amp,  s,nb);
    spi(  600 -cos(time/100)*amp,  600 -sin(time/50)*amp,  s,nb);
    
    time++;
}

function spi(cx,cy,s,nb){
  for(let i = 0; i < nb; i++){
      line(cx, cy-i*s, cx+i*s, cy);
      line(cx+i*s, cy, cx, cy+i*s);
      line(cx, cy-i*s, cx-i*s, cy);
      line(cx-i*s, cy, cx, cy+i*s);
    }
}
