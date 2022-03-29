const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var monkey, monkeyImg;
var apple, appleImg;
var happy, happyImg;
var sad, sadImg;

function preload() {
  appleImg = loadImage("apple.png");
  monkeyImg = loadImage("monkey.png");
  happyImg = loadImage("Happy.png");
  sadImg = loadImage("Sad.png");
}

function setup() {
  createCanvas(500,500);

  monkey = createSprite(250, 435);
  monkey.addImage(monkeyImg);
  monkey.scale = 0.2;
  monkey.visible = true;
  
  happy = createSprite(monkey.position.x, monkey.position.y);
  happy.addImage(happyImg);
  happy.scale = 0.2;
  happy.visible = false;

  sad = createSprite(monkey.position.x, monkey.position.y);
  sad.addImage(sadImg);
  sad.scale = 0.5;
  sad.visible = false;

  engine = Engine.create();
  world = engine.world;
}


function draw() {
  background(51);
  Engine.update(engine);
  drawSprites();

  textSize(10);
  fill("white");
  stroke("white");

  text("Press The Space Key To Restart.", 20, 41);

  text("Press The Left And Right Arrow Keys To Move.", 20, 61);

  //create multiple apples
  if (frameCount% 120 ==0){
      createApples();
     }

  //if monkey catches the apple he is happy
  if(collide(apple,monkey, 80)==true) {
    World.remove(engine.world,apple);
    apple.remove();
    monkey.changeImage('happy');
    happy.position.x = monkey.position.x;
    happy.position.y = monkey.position.y;
    happy.visible = true;
    monkey.visible = false;
    sad.visible = false;
  }

  //if monkey misses the apple he is sad
  if (apple!=null && apple.position.y >= 405) {
    monkey.changeImage('sad');
    sad.position.x = monkey.position.x;
    sad.position.y = monkey.position.y;
    apple.remove();
    sad.visible = true;
    monkey.visible = false;
    happy.visible = false;
  }

  //move the monkey to the left
  if (keyDown("LEFT_ARROW")){
   // monkey.velocityX = -3;
  // monkey.velocityY = 0;
  monkey.position.x = monkey.position.x - 5
  }

  //move the monket to the right
  if (keyDown("RIGHT_ARROW")){
    //monkey.velocityX = 3;
    //monkey.velocityY = 0;
    monkey.position.x = monkey.position.x + 5
  }

  if (keyDown("SPACE")) {
    happy.visible = false;
    sad.visible = false;
    monkey.visible = true;
  }

  //make the monkey bounce off the edges
  edges = createEdgeSprites();
  monkey.bounceOff(edges);
}

//function to create apples
function createApples() {
  apple = createSprite(random(50, 450), 50);
  apple.addImage(appleImg);
  apple.scale = 0.15;
  apple.velocityY = 3;
}

//function for collide
function collide(body,sprite, distance) {
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=distance)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}
