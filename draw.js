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
        /*if((i+j)%2==0 && i%2==0){
          ctx.fillStyle="white";
          ctx.fillRect(i*scale,j*scale,scale,scale);
        }
        else if((i+j)%2==0 && i%2!=0){
          ctx.fillStyle="orange";
          ctx.fillRect(i*scale,j*scale,scale,scale);
        }
        else{
          ctx.fillStyle="gold";
          ctx.fillRect(i*scale,j*scale,scale,scale);
        }*/
        ctx.fillStyle="#f7e697";
        ctx.fillRect(i*scale,j*scale,scale,scale);
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

    for(var i=4;i<rows/2-1;i++){
      ctx.fillStyle="brown";
      ctx.fillRect((i-1)*scale,(i-1)*scale,scale,scale);
      ctx.fillRect((columns-i)*scale,(i-1)*scale,scale,scale);
      ctx.fillRect((i-1)*scale,(rows-i)*scale,scale,scale);
      ctx.fillRect((columns-i)*scale,(rows-i)*scale,scale,scale);
    }

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }
    for(var i=0;i<snake.tail.length;i++){
      if(fruit.x==snake.tail[i].x && fruit.y==snake.tail[i].y){
        fruit.pickLocation();
      }
    }

    for(var i=3;i<rows/2-1;i++){
      while(fruit.x==(i-1)*scale && fruit.y==(i-1)*scale){
        fruit.pickLocation();
      }
      while(fruit.x==(columns-i)*scale && fruit.y==(i-1)*scale){
        fruit.pickLocation();
      }
      while(fruit.x==(i-1)*scale && fruit.y==(rows-i)*scale){
        fruit.pickLocation();
      }
      while(fruit.x==(columns-i)*scale && fruit.y==(rows-i)*scale){
        fruit.pickLocation();
      }
    }

    snake.checkCollision();
//    fruit.checkmaze();
      
    document.querySelector('.score')
      .innerText = snake.total;

//      snake.detectswipe();

  }, refresh_rate);
}());

document.getElementById("speed-tab").onclick=function(){
  count++;
    if(count%3==0){
      this.innerHTML="Normal";
      snake.speedfactor=1;
    }
    else if(count%3==1){
      this.innerHTML="Hard";
      snake.speedfactor=1.25;
    }
    else if(count%3==2){
      this.innerHTML="Slow";
      snake.speedfactor=0.5;
    }
}

if(screen.width>800){
  window.addEventListener('keydown', ((evt) => {
    var direction = evt.key.replace('Arrow', '');
    console.log(direction);
    snake.changeDirection(direction);
}));
}
else{
/*  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;

  const file=document.getElementById("canvas");

  file.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

  file.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
}, false);

  var changeX,changeY;
  changeX = touchendX - touchstartX;
  changeY = touchendY - touchstartY;

  var changeX_new=changeX,changeY_new=changeY;
  if(changeX<0) changeX_new=(-1)*changeX_new;
  if(changeY<0) changeY_new=(-1)*changeY_new;

  if (changeX_new>changeY_new && changeX<0) {
    console.log('Swiped left');
    direction="Left";
  }

  if (changeX_new>changeY_new && changeX>0) {
    console.log('Swiped right');
    direction="Right";
  }

  if (changeY_new>changeX_new && changeY<0) {
    console.log('Swiped up');
    direction="Up";
  }

  if (changeY_new>changeX_new && changeY>0) {
   console.log('Swiped down');
   direction="Down";
  }
  snake.changeDirection(direction);
*/
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
          direction="Left";
        } else {
          direction="Right";
        }                       
    } else {
        if ( yDiff > 0 ) {
          direction="Up";
        } else { 
            direction="Down";
        }                                                                 
    }
    snake.changeDirection(direction);
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
}