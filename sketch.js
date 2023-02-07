let spriteSheet;
let killCount = 0;
let insideX;
let insideY;
let bugTimer = 30;

function setup() {
  createCanvas(400, 400);
  bug1 = new Bugs(20,20,50,50,true);
}

function draw() {
  background(220);
  text('Time remaining: ' + bugTimer, 0, 10);
  text('Bugs killed: ' + killCount, 0,20);
  bug1.update();

}

let timer = setInterval(()=>{
  if (bugTimer > 0) {
    bugTimer--;
  }
  else {
    clearInterval(timer);
  }
}, 1000)

function mousePressed(){
  let contains = bug1.contains(mouseX,mouseY);
  if (contains == true){
    killCount +=1;
  }
}

class Bugs {
  constructor(x,y,height,width,alive) {
    this.height = height;
    this.width = width;
    this.x = Math.floor(Math.random() * (400 - this.width));
    this.y = Math.floor(Math.random() * (400 - this.height));
    this.xVelocity = 0;
    this.alive = alive;
    //this.ss = ss;
    //this.dir = dir;
    //this.alive = alive; 

  }
    draw() {
    // push();
    //   scale(this.dir,1);
    //   image(this.ss, this.dir*this.x,this.y,sh,sw,u*sh,v*sw,sh,sw);
    // pop();
    // }
    fill('red');
    rect(this.x,this.y,this.height,this.width);
    }
    
    update(){
      this.draw()
      //this.x += this.xVelocity;
    }
    contains(x,y) {
      insideX = x >= this.x && x<= this.x + this.width;
      insideY = y >= this.y && y <= this.y + this.height;
      return insideX && insideY;
    }
    }
