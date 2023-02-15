let spriteSheet, insideX, insideY;
let killCount = 0;
let bugTimer = 30;
let screenWidth = 1200;
let screenHeight = 400;
let speed =  Math.floor(Math.random() * 3) + 1;
let buggy = [];
let totalBugs = 5;
let frame = 0;
let v = 0;
let animationLength = 8;
let currentFrame = 0;
let sw = 53;
let sh = 53;
let sx = 0;
let sy = 0;


//bug class
class Bugs {
  constructor() {
    this.height = 53;
    this.width = 53;
    this.x = Math.floor(Math.random() * (1200 - this.width));
    this.y = Math.floor(Math.random() * (400 - this.height));
    this.xVelocity = Math.random() < 0.5 ? -speed : speed;
    this.yVelocity = Math.random() < 0.5 ? -speed : speed;
    this.alive = true;
    this.pressed = false;
    this.ss = spriteSheet;
    this.dir = Math.random() < 0.5 ? 1 : -1;
    if (this.dir == 0) {
      this.dir = -1;
    }
  }
    draw() {
    image(this.ss, this.x, this.y, sh, sw, frame*sh, v*sw, sh, sw);
    }

    dead() {
      image(this.ss, this.x, this.y, this.width, this.height, 424, 0, sh, sw);
    }
    
    update(){
      if(this.alive){
      this.draw();
      
      this.x += this.xVelocity;
      this.y += this.yVelocity;
      frame = (currentFrame) % animationLength;
      currentFrame = currentFrame  + 1;
      //teleport if they go off screen
      if (this.x > screenWidth) {
        this.x = 0-this.width;
      }
      if (this.x < 0-this.width) {
        this.x = screenWidth;
      }
      if (this.y > screenHeight ) {
        this.y = 0-this.height;
      }
      if (this.y <0-this.height) {
        this.y = screenHeight
      }
    } else if(!this.alive) {
      this.dead();
    }

    }
    
    stop() {
      this.xVelocity = 0;

    }
    }

function setup() {
  createCanvas(screenWidth, screenHeight);
}

function preload() {
  spriteSheet = loadImage("buggy.png");
  for(let i=0; i <= totalBugs; i++) {
    buggy[i] = new Bugs();
    if(buggy[i].alive != true) {
      totalBugs++;
    }
  }
}

//main
function draw() {
  background(220);
  rectMode(CORNER);
  imageMode(CENTER);
  text('Time remaining: ' + bugTimer, 0, 10);
  text('Bugs killed: ' + killCount, 0,20);
  if (bugTimer > 0) {
    for(let i=0; i <= totalBugs; i++) {
      buggy[i].update();
      }
    }
    else {
      push();
        background('red');
        textAlign(CENTER);
        noStroke();
        fill('white');
        text('GAME OVER!', screenWidth/2, screenHeight/2,);
        text('Your score was: ' + killCount + ' bugs squished', screenWidth/2, screenHeight/2 + 60);
      pop();
    }
  }
  // for(let i=0; i <= totalBugs; i++) {
  //   buggy[i].update();
  // }


//Game timer
let timer = setInterval(()=>{
  if (bugTimer > 0) {
    bugTimer--;
  }
  else {
    clearInterval(timer);
  }
}, 1000)

//Killcount, kill, new spawn on kill
function mousePressed(){
  for(let i=0; i <= totalBugs; i++) {
    if((mouseX >= buggy[i].x- 27) && (mouseX<= buggy[i].x +27)  && 
    (mouseY >= buggy[i].y - 27) && (mouseY <= buggy[i].y +27)){
      if(!buggy[i].pressed){
        speed += .5;
        killCount +=1;
        buggy[i].pressed = true;
        buggy[i].alive = false;
        buggy[i].stop();
      }
      setTimeout(()=>{
        buggy[i] = new Bugs();
      }, 200)
    } 

  }
}

