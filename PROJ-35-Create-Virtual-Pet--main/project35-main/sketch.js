//Create variables here
var Dog, HappyDogImg, DogImg, database;
var FoodS, FoodStock, food;
var button, button2;
var start = 0, play = 1;
var gameState = 0;
var fedTime, lastFed;

function preload()
{
  //load images here
  DogImg = loadImage("images/dogImg.png");
  HappyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(1000, 500);
  
  database = firebase.database();

  food = new Food();

  Dog = createSprite(850, 300, 50, 50);
  Dog.addImage(DogImg);
  Dog.scale = 0.2;

  fedTime = database.ref('feedTime');
  fedTime.on("value", function(data)
  {
    lastFed = data.val();
  });

  if(gameState === start)
{
  var heading = createElement("h2");
  heading.html("VIRTUAL PET");
  heading.position(750, 100);
  var Name = createInput("Write Your Dog's Name");
  Name.position(750, 300);
  var on = createButton(" start game ");
  on.position(795, 400);
  on.mousePressed(function()
    {
      heading.hide();
      Name.hide();
      on.hide();
      gameState = play;
    })
}

}


function draw() {
background("green");

if(gameState === play)
{
  food.display();

  button = createButton(" Feed Your Dog ");
  button.position(900, 70);

  button2 = createButton(" Increase Your Food Stock ");
  button2.position(1100, 70);

  button.mousePressed(function ()
  {
    Dog.addImage(HappyDogImg);
    food.writeStock();
    lastFed = hour();
    frameCount = 0;
  })

  if(frameCount % 80 === 0)
  {
    Dog.addImage(DogImg);
  }

  button2.mousePressed(function ()
  {
    food.addStock();
  })

  drawSprites();
  //add styles here

  textSize(15);
  fill("white");
  text("YOUR FOOD STOCK IS " + FoodStock, 150, 150);
  fill(255, 255, 254);
  textSize(15)


  if(lastFed >= 12)
  {
    text("Last Fed : " + lastFed % 12 + " PM", 350, 30);
  }
  else if(lastFed === 0)
  {
    text("Last Fed : 12 AM", 350, 30);
  }
  else if(lastFed <= 12)
  {
    text("Last Fed : " + lastFed + " AM", 350, 30);
  }
}
}

function readStock(data)
{
  FoodStock = data.val();
}

function defaultStock()
{
  database.ref('/').update(
    {
      'food' : 20
    }
  )
}