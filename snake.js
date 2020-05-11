function Snake() {
  this.x = (columns/2)*scale;
  this.y = (rows/2)*scale;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.total = 0;
  this.tail = [];
  

  this.draw = function() {
    ctx.strokeStyle="black";
    ctx.fillStyle = "#FFFFFF";
    for (let i=0; i<this.tail.length; i++) {
      /*if(i==this.tail.length-1){
        ctx.fillStyle = "black";
      }
      else{
        ctx.fillStyle = "#FFFFFF";
      }*/
      ctx.strokeRect(this.tail[i].x,
        this.tail[i].y, scale, scale);
      ctx.fillRect(this.tail[i].x,
        this.tail[i].y, scale, scale);
    }
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, scale, scale);
  }

  this.update = function() {
    for (let i=0; i<this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i+1];
    }

    this.tail[this.total - 1] =
      { x: this.x, y: this.y };

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > canvas.width) {
      this.x = 0;
    }

    if (this.y > canvas.height) {
      this.y = 0;
    }

    if (this.x < 0) {
      this.x = canvas.width;
    }

    if (this.y < 0) {
      this.y = canvas.height;
    }
  }

  let prev;
  this.changeDirection = function(direction) {
/*    switch(direction) {
      case 'Up':
        this.xSpeed = 0;
        this.ySpeed = -scale * 1;
        break;
      case 'Down':
        this.xSpeed = 0;
        this.ySpeed = scale * 1;
        break;
      case 'Left':
        this.xSpeed = -scale * 1;
        this.ySpeed = 0;
        break;
      case 'Right':
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        break;
    }*/
    if(direction=="Up" && prev!="Up" && prev!="Down"){
      this.xSpeed = 0;
      this.ySpeed = -scale * 1;
      prev="Up";
      up.play();
    }
    else if(direction=="Down" && prev!="Up" && prev!="Down"){
      this.xSpeed = 0;
      this.ySpeed = scale * 1;
      prev="Down";
      down.play();
    }
    else if(direction=="Left" && prev!="Right" && prev!="Left"){
      this.xSpeed = -scale * 1;
      this.ySpeed = 0;
      prev="Left";
      left.play();
    }
    else if(direction=="Right" && prev!="Right" && prev!="Left"){
      this.xSpeed = scale * 1;
      this.ySpeed = 0;
      prev="Right";
      right.play();
    }
  }

  this.detectswipe=function() {
  swipe_det = new Object();
  swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  var min_x = 30;  //min x swipe for horizontal swipe
  var max_x = 30;  //max x difference for vertical swipe
  var min_y = 50;  //min y swipe for vertical swipe
  var max_y = 60;  //max y difference for horizontal swipe
  var direction = "";
  window.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX; 
    swipe_det.sY = t.screenY;
  },false);
  window.addEventListener('touchmove',function(e){
    e.preventDefault();
    var t = e.touches[0];
    swipe_det.eX = t.screenX; 
    swipe_det.eY = t.screenY;    
  },false);
  window.addEventListener('touchend',function(e){
    //horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
      if(swipe_det.eX > swipe_det.sX) direction = "Right";
      else direction = "Left";
    }
    //vertical detection
    else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
      if(swipe_det.eY > swipe_det.sY) direction = "Down";
      else direction = "Up";
    }

    if (direction != "") {
      if(direction=="Up" && prev!="Up" && prev!="Down"){
        this.xSpeed = 0;
        this.ySpeed = -scale * 1;
        prev="Up";
        up.play();
      }
      else if(direction=="Down" && prev!="Up" && prev!="Down"){
        this.xSpeed = 0;
        this.ySpeed = scale * 1;
        prev="Down";
        down.play();
      }
      else if(direction=="Left" && prev!="Right" && prev!="Left"){
        this.xSpeed = -scale * 1;
        this.ySpeed = 0;
        prev="Left";
        left.play();
      }
      else if(direction=="Right" && prev!="Right" && prev!="Left"){
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        prev="Right";
        right.play();
      }
    }
    direction = "";
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  },false);  
}

  this.eat = function(fruit) {
    if (this.x === fruit.x &&
      this.y === fruit.y) {
      this.total++;
      eat.play();
      return true;
    }

    return false;
  }

  this.checkCollision = function() {
    for (var i=0; i<this.tail.length; i++) {
      if (this.x === this.tail[i].x &&
        this.y === this.tail[i].y) {
        this.total = 0;
        this.tail = [];
      }
    }
    if (this.x==0 || this.x==(rows-1)*scale || this.y==0 || this.y==(columns-1)*scale) {
      this.total = 0;
      dead.play();
      this.tail = [];
      this.x=(columns/2)*scale;
      this.y=(rows/2)*scale;
      this.xSpeed=0;
      this.ySpeed=0;
      prev="Null";
    }

/*    while(this.tail[this.tail.length-1].y==(rows/2-3)*scale || this.tail[this.tail.length-1].y==(rows/2+3)*scale){
      for(var k=0;k<8;k++){
        if(this.tail[this.tail.length-1].x==(columns/2-4+k)*scale){
          this.total = 0;
          console.log("hit");
          dead.play();
          this.tail = [];
          this.x=(columns/2)*scale;
          this.y=(rows/2)*scale;
          break;
        }
      }
    }*/
    for(var k=0;k<8;k++){
      var overlap=false;
      if((this.x==(columns/2-4+k)*scale) && (this.y==(rows/2-3)*scale || this.y==(rows/2+3)*scale)){
        this.total = 0;
        console.log("hit");
        dead.play();
        this.tail = [];
        this.x=(columns/2)*scale;
        this.y=(rows/2)*scale;
        this.xSpeed=0;
        this.ySpeed=0;
        prev="Null";
        break;
      }
    }
  }
}
