let W = 900;
let H = 900;

let size = 50
let zoom = 0.1;
let fusionLength;
let numb = W/size +1



function setup() {
    createCanvas(windowWidth, windowHeight);
    W = windowWidth;
    H = windowHeight;
    noFill()
    noiseSeed(7536155843);

    background(color('#3d2b3d'));

    strokeCap(ROUND);
    stroke(color("#607744"));
    strokeWeight(size/2);
    generate()
    
    strokeCap(ROUND);
    stroke(color("#e8c547"));
    strokeWeight(size/7);
    generate()
}

function generate(){
    let presence = [0,0,0,0,10];
    let total = 0;
    for (let i = 0; i < presence.length; i++) total += presence[i];
    let count = 0
    let order = [];
    for (let i = 0; i < presence.length; i++) {
        count += presence[i]/total;
        order[i] = count;
    }

    for (i = 0; i < numb*4; i++) {
        for (j = 0; j < numb*4; j++) {
          push();
          translate(i * size, j * size);

          rotate(floor(maxNoise(8,i/zoom,j/zoom)) * PI * 0.5);
          type = maxNoise(1,i/zoom,j/zoom); //1,2,2.2

          
          
          if (type < order[0]) { //8
            arc(size / 2, -size / 2, size, size, PI * 0.5, PI);
            arc(-size / 2, size / 2, size, size, -PI * 0.5, 0);
          } else if (type < order[1]) {//crois
            line(-size / 2, 0, size / 2, 0);
            line(0, -size / 2, 0, size / 2);
          } else if (type < order[2]){//single line
            line(-size / 2, 0, size / 2, 0);
          } else if (type < order[3]){//straight 8
            line(-size / 2, 0, 0, size / 2);
            line(0, -size / 2, size / 2, 0);
          }else{
            arc(size / 2, -size / 2, size, size, PI * 0.5, PI);
          }
          
          pop();
        }
      }
}

function maxNoise(val, x,y){
    return noise(x,y)*val;
}


function draw() {
    
}