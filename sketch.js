let spriteSheet;
let killCount = 0;
let insideX;
let insideY;
let bugTimer = 30;
let screenWidth = 400;
let speed =  Math.floor(Math.random() * 10) + 1;
let buggy = [];
let totalBugs = 3;

function setup() {
  createCanvas(screenWidth, 400);
  
}

function preload() {
  for(let i=0; i < totalBugs; i++) {
    buggy[i] = new Bugs();
  }
}

function draw() {
  background(220);
  text('Time remaining: ' + bugTimer, 0, 10);
  text('Bugs killed: ' + killCount, 0,20);
  for(let i=0; i < totalBugs; i++) {
    buggy[i].update();
  }
}

//timer
let timer = setInterval(()=>{
  if (bugTimer > 0) {
    bugTimer--;
  }
  else {
    clearInterval(timer);
  }
}, 1000)

//killcount and kill
function mousePressed(){
  for(let i=0; i < totalBugs; i++) {
    let contains = buggy[i].contains(mouseX,mouseY);
    if (contains == true){
      killCount +=1;
      for(let i=0; i < totalBugs; i++) {
        if (buggy.xVelocity != 0) {
          buggy[i].stop();
        }
      }
    }
  }
}

//bug class
class Bugs {
  constructor() {
    this.height = 50;
    this.width = 50;
    this.x = Math.floor(Math.random() * (400 - this.width));
    this.y = Math.floor(Math.random() * (400 - this.height));
    this.xVelocity =Math.random() < 0.5 ? (Math.floor(Math.random() * 10) + 1) : -(Math.floor(Math.random() * 10) + 1);
    this.alive = true;
    //this.ss = ss;
    this.dir = Math.random() < 0.5 ? 1 : -1;
    if (this.dir == 0) {
      this.dir = -1;
    }
    
  }
    draw() {
    push();
      scale(this.dir,1);
      rect(this.dir*this.x,this.y,this.height,this.width);
    pop();
    fill('red');
    }
    
    update(){
      this.draw()
      this.x += this.xVelocity;
      if (this.x >= screenWidth) {
        this.x = 1;
      }
      if (this.x <= 0) {
        this.x = screenWidth - 1;
      }
    }
    
    //checker for bug
    contains(x,y) {
      insideX = x >= this.x && x<= this.x + this.width;
      insideY = y >= this.y && y <= this.y + this.height;
      return insideX && insideY;
    }
    
    stop() {
      this.xVelocity = 0;
    }
    }
