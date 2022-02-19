// No jaló
// Coco Bnl

let sourceText;
let poem;
let hug;
let startIndex = 0;

function preload() {
  hug = loadImage("hugemo40.jpg");
  sourceText = loadStrings("nojalo.txt");
}

function setup() {
  createCanvas(1920/2, 1080/2);
  poem = sourceText.join(' ');
  textFont("Times New Roman");
}

let xoff = 0.0;
let yoff = 100000.0;

function draw() {
  background(0);
  frameRate(8);
  noCursor();
  
  let charIndex = startIndex;
  let w = (width/2) / hug.width;
  let h = height / hug.height;
  hug.loadPixels();
  
  xoff = xoff + 0.015;
  yoff = yoff + 0.015;
  let x1 = noise(xoff) * width;
  let y1 = noise(yoff) * height;
  let x2 = mouseX;
  let y2 = mouseY;

  let d = dist(x1, y1, x2, y2);
  
  for (let j = 0; j < hug.height; j++) {
  for (let i = 0; i < hug.width; i++) {
      const pixelIndex = (i + j * hug.width) * 4;
      const r = hug.pixels[pixelIndex + 0];
      const g = hug.pixels[pixelIndex + 1];
      const b = hug.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const app = map(d, 15, 60, 255-avg, 0)
      noStroke();
      fill(app);
      
      textSize(w*1.2);
      textAlign(CENTER, CENTER);
      if (mouseIsPressed === false){
        text(poem.charAt(charIndex % poem.length), i * w + w * 0.5, j * h + h * 0.5);
        } else {
          for (let k = -12; k < 12; k++){
            text(poem.charAt(charIndex % poem.length), i * w + w * 0.5 + k, j * h + h * 0.5 + k);
          }
        }
      charIndex++;
    }
  }
  
  startIndex++;
  
  textSize(w*2);
  if (mouseIsPressed === false && d > 15){
    text("✋", x1, y1);
    text("🤚",x2, y2);
  } else if (mouseIsPressed === false && d < 15){
    text("🤝", x1, y1);
  } else if (mouseIsPressed === true && d < 20){
    text("👋", x1, y1);
    textAlign(RIGHT);
    fill(30);
    textSize(w);
    text("no jaló.", width-15, height-20);
  }
}

function mousePressed() {
  noLoop();  
}

function mouseReleased() {
  loop();
}
