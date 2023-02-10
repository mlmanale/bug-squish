let spriteSheet, insideX, insideY;
let killCount = 0;
let bugTimer = 5;
let screenWidth = 1200;
let screenHeight = 400;
let speed =  Math.floor(Math.random() * 3) + 1;
let buggy = [];
let totalBugs = 5;


//bug class
class Bugs {
  constructor() {
    this.height = 50;
    this.width = 50;
    this.x = Math.floor(Math.random() * (400 - this.width));
    this.y = Math.floor(Math.random() * (400 - this.height));
    this.xVelocity = Math.random() < 0.5 ? -speed : speed;
    this.yVelocity = Math.random() < 0.5 ? -speed : speed;
    this.alive = true;
    this.pressed = false;
    //this.ss = ss;
    this.dir = Math.random() < 0.5 ? 1 : -1;
    if (this.dir == 0) {
      this.dir = -1;
    }
    
  }
    draw() {
    push();
      //scale(this.dir,1);
      rect(this.x,this.y,this.height,this.width);
    pop();
    fill('red');
    }
    
    update(){
      
      if(this.alive){
      this.draw()
      
      this.x += this.xVelocity;
      this.y += this.yVelocity;
      
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
    if((mouseX >= buggy[i].x) && (mouseX<= buggy[i].x + buggy[i].width) && 
    (mouseY >= buggy[i].y) && (mouseY <= buggy[i].y + buggy[i].height)){
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

