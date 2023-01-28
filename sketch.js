var score =0;
var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;

var redBubbleGroup, redBubbleGroup, bulletGroup;
var bgPic;

var life = 3;
var score=0;
var gameState=1;
var lifeD, hearts, hearts_2, hearts_1, hearts_0;
var playM, popS, loseS, failS;

function preload(){
  bgPic= loadImage("bg.jpg");
  gunImg = loadImage("gun1.png");
  blastImg = loadImage("blast.png");
  bulletImg = loadImage("bullet1.jpg");
  blueBubbleImg = loadImage("waterBubble.png");
  redBubbleImg = loadImage("redbubble.png");
  backBoardImg= loadImage("back2.jpg");
  hearts= loadAnimation("lifeFull.png");
  hearts_2= loadAnimation("twoLife.png");
  hearts_1= loadAnimation("oneLife.png");
  hearts_0= loadAnimation("zeroLife.png");
  playM= loadSound("play.mp3");
  popS= loadSound("pop.mp3");
  loseS= loadSound("lost.mp3");
  failS= loadSound("over.mp3");
}
function setup() {

  playM.loop();
  playM.setVolume(0.2);

  createCanvas(windowWidth-25, windowHeight-30);

  backBoard= createSprite(-250, height/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup(); 
  
  lifeD= createSprite(400, 60);
  lifeD.addAnimation("hearts", hearts);
  lifeD.addAnimation("hearts_2", hearts_2);
  lifeD.addAnimation("hearts_1", hearts_1);
  lifeD.addAnimation("hearts_0", hearts_0);
  lifeD.scale= 0.4
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(bgPic);

  scoreboard.html("SCORE: "+score)
  scoreboard.style('color:red'); 
  scoreboard.style("font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif");
  scoreboard.style("background-color:rgba(255, 1, 1, 0.178 )");
  scoreboard.style("border-radius: 10px");
  scoreboard.position(width-200,20);

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 250 === 0) {
      drawblueBubble();
    }

    if (frameCount % 350 === 0) {
      drawredBubble();
    }

    if(keyWentDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }
    livesDestroy();
    drawSprites();
  }
    
  
}

function drawblueBubble(){
  bluebubble = createSprite(width,random(height-50,height-500),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -(6 + 3* score/100); 
  bluebubble.lifetime = 500;
  blueBubbleGroup.add(bluebubble);
}
function drawredBubble(){
  redbubble = createSprite(width,random(height-50,height-500),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -(5 + 3* score/100);
  redbubble.lifetime = 500;
  redBubbleGroup.add(redbubble);
}

function shootBullet(){
  bullet= createSprite(200, width/2, 50,20)
  bullet.y= gun.y-5 
  bullet.addImage(bulletImg)
  bullet.scale=0.4
  bullet.velocityX= 10;
  bullet.lifetime= 500;
  bulletGroup.add(bullet);
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+5;
       popS.play();
    }

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg); 
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function livesDestroy() {
  if(life == 2){
    lifeD.changeAnimation("hearts_2");
    lifeD.scale=0.28;
  }
  if(life == 1){
    lifeD.changeAnimation("hearts_1");
    lifeD.scale=0.28;
  }
  if(life == 0){
    lifeD.changeAnimation("hearts_0");
    lifeD.scale=0.28;
  }
}

function handleGameover(bubbleGroup){
  
    loseS.play();
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2

      playM.stop();
      failS.play(); 
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/403-broken-heart.svg/2048px-403-broken-heart.svg.png",
        imageSize: "200x200",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}