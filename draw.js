const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 30;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var snake;
var d;
var refresh_rate=100;
var count=0;

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0;i<rows;i++){
      for(var j=0;j<columns;j++){
        if((i+j)%2==0){
          ctx.fillStyle="yellow";
          ctx.fillRect(i*scale,j*scale,scale,scale);
        }
        else{
          ctx.fillStyle="lightgreen";
          ctx.fillRect(i*scale,j*scale,scale,scale);
        }
      }
    }

    fruit.draw();
    snake.update();
    snake.draw();

    for(var i=0;i<rows;i++){
      for(var j=0;j<columns;j++){
        if(i==0 || i==rows-1 || j==0 || j==columns-1 ){
          ctx.fillStyle="brown";
          ctx.fillRect(i*scale,j*scale,scale,scale);
        }
      }
    }

    for(var i=0;i<columns;i++){
      for(var j=0;j<rows;j++){
        for(var k=0;k<8;k++){
          if((j==rows/2-3 || j==rows/2+3) && i==columns/2-4+k){
            ctx.fillStyle="brown";
            ctx.fillRect(i*scale,j*scale,scale,scale);
          }
        }
      }
    }

    if (snake.eat(fruit)) {
      fruit.pickLocation();
      console.log((rows/2-3)*scale);
    }
    for(var i=0;i<snake.tail.length;i++){
      if(fruit.x==snake.tail[i].x && fruit.y==snake.tail[i].y){
        fruit.pickLocation();
      }
    }

      
      for(var k=0;k<8;k++){
        var overlap=false;
        while((fruit.x==(columns/2-4+k)*scale) && (fruit.y==(rows/2-3)*scale || fruit.y==(rows/2+3)*scale)){
          overlap=true;
          fruit.pickLocation();
          break;
        }
      }
      snake.checkCollision();
//    fruit.checkmaze();
      
    document.querySelector('.score')
      .innerText = snake.total;

      snake.detectswipe();

  }, refresh_rate);
}());

document.getElementById("speed-tab").onclick=function(){
  count++;
    if(count%3==0){
        this.innerHTML="Normal";
        refresh_rate=100;
        console.log(refresh_rate);
        setInterval(setup,refresh_rate);
    }
    else if(count%3==1){
        this.innerHTML="Hard";
        refresh_rate=50;
        console.log(refresh_rate);
        setInterval(setup,refresh_rate);
    }
    else if(count%3==2){
        this.innerHTML="Slow";
        refresh_rate=500;
        console.log(refresh_rate);
        setInterval(setup,refresh_rate);
    }
}

if(screen.width>800){
window.addEventListener('keydown', ((evt) => {
  var direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
}));
}