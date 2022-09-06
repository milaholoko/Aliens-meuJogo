var bg,bgImg;
var player, shooterImg, alienImg;
var skateImg;


function preload(){
  
  shooterImg = loadAnimation("assets/Shooter/1.png","assets/Shooter/22.png")
  alienImg = loadAnimation("assets/Alien/1.png","assets/Alien/15.png")
  skateImg = loadImage('assets/skate/skate3.png')


  bgImg = loadImage("assets/BackGround.jpg")
  buImg = loadImage("assets/bullet1.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

//adicionando a imagem de fundo
    bg = createSprite(displayWidth/2+100,displayHeight/2,20,20)
    bg.addImage(bgImg)
    bg.scale = 2.9
  

//criando o sprite do jogador
    player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
    player.addAnimation('player',shooterImg)
    player.debug = true
    player.setCollider("circle",0,30,110)
    base= createSprite(player.x-10,player.y+130,100,10)
    base.addImage(skateImg)
    base.scale = 0.4

   alienGroup = new Group()


}

function draw() {
  background(0); 




  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
  base.y-=30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
 base.y+=30
}

if(keyDown("space")){
bullet = createSprite(player.x+120,player.y+25,40,10)
bullet.addImage("bullet",buImg)
bullet.velocityX = 10
bullet.scale = 0.08
bullet.depth = player.depth
bullet.depth-=1
}

if(alienGroup.isTouching(player)){
  for(var i=0;i< alienGroup.length;i++){
    if(alienGroup[i].isTouching(player)){
      alienGroup[i].destroy()
    }
  }
}


AlienGenerator();
drawSprites();

}
function AlienGenerator(){
  if(frameCount%50===0){
  alien = createSprite(width,random(100,height-100),40,40)
  alien.addAnimation("alien",alienImg)
  alien.velocityX = -5
  alienGroup.add(alien)
  alien.setCollider("circle",0,0,90)
  }
}