var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy;
var ground, invisibleGround, groundImage;

var city, cityImage;
var obstaclesGroup, cone, bush, obstacle1, trash;

var score=0;

var gameOver, restart;

function preload(){
boy = loadAnimation("boy.png");

groundImage = loadImage("ground.png");

cone = loadImage("cone.png");
bush = loadImage("bush.png");
obstacle = loadImage("obstacle1.png");
trash = loadImage("trash.png");

gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");

}

function setup() {
    createCanvas(600,200);

    boy = createSprite(50,180,20,50);
    boy.scale = 0.8;

    ground = createSprite(200,180,400,30);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -(6 + 3*score/100);

    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);

    restart = createSprite(300,140);
    restart.addImage(restartImg);

    gameOver.scale = 0.5;
    restart.scale = 0.5;

    gameOver.visible = false;
    restart.visible = false;

    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;

    obstaclesGroup = new Group();

    score = 0;
}

function draw() {
    background(255);
    text("Pontuação: "+ score, 500,50);

    if(gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);

       if(keyDown("space")&& boy.y >=159) {
        boy.velocityY = -12;
       } 

       boy.velocityY = boy.velocityY + 0.8

       if(ground.x < 0){
        ground.x = ground.width/2;
       }

       boy.collide(invisibleGround);
       spawnObstacles();

       if(obstaclesGroup.isTouching(boy)){
         gameState = END;
       }
    }
else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    boy.velocityY = 0;
    obstaclesGroup.setVelocityXEach(-1);

    if(mousePressedOver(restart)) {
        reset();
    }
}
    drawSprites();
}

function spawnObstacles() {
if(frameCount % 60 === 0) {
    var obstacle = createSprite(600.165,10,40);
    obstacle.velocityX = -(6 +3*score/100);

    var rand = Math.round(random(1,6));
    switch(rand) {
        case 1: obstacle.addImage(cone);
        break;
        case 2: obstacle.addImage(bush);
        break;
        case 3: obstacle.addImage(obstacle1);
        break;
        case 4: obstacle.addImage(trash);
        break;
    }

    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
}

}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    obstaclesGroup.destroyEach();

    score = 0;
}