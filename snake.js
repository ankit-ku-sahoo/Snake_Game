function Snake() {
  this.x = (columns/2)*scale;
  this.y = (rows/2)*scale;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.speedfactor=1;
  this.total = 0;
  this.tail = [];
  

  this.draw = function() {
    ctx.strokeStyle="white";
    ctx.fillStyle = "black";
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
    ctx.fillStyle = "green";
    ctx.strokeStyle="black";
    ctx.fillRect(this.x, this.y, scale, scale);
    ctx.strokeRect(this.x, this.y, scale, scale);
    ctx.strokeRect(this.x, this.y, scale, scale);
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

      if(direction=="Up" && prev!="Up" && prev!="Down"){
        this.xSpeed = 0;
        this.ySpeed = -scale * this.speedfactor;
        prev="Up";
        up.play();
      }
      else if(direction=="Down" && prev!="Up" && prev!="Down"){
        this.xSpeed = 0;
        this.ySpeed = scale * this.speedfactor;
        prev="Down";
        down.play();
      }
      else if(direction=="Left" && prev!="Right" && prev!="Left"){
        this.xSpeed = -scale * this.speedfactor;
        this.ySpeed = 0;
        prev="Left";
        left.play();
      }
      else if(direction=="Right" && prev!="Right" && prev!="Left"){
        this.xSpeed = scale * this.speedfactor;
        this.ySpeed = 0;
        prev="Right";
        right.play();
      }
  }

  this.eat = function(fruit) {
    var diffx=this.x - fruit.x;
    var diffy=this.y - fruit.y;
    if(diffx<0) diffx=(-1)*diffx;
    if(diffy<0) diffy=(-1)*diffy;

    if (diffx<0.85*scale &&
      diffy<0.85*scale) {
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
    if (this.x<0.25*scale || this.x>(rows-2)*scale || this.y<0.25*scale || this.y>(columns-2)*scale) {
      this.total = 0;
      dead.play();
      this.tail = [];
      this.x=(columns/2)*scale;
      this.y=(rows/2)*scale;
      this.xSpeed=0;
      this.ySpeed=0;
      prev="Null";
    }

/*
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
    }*/
      var diffxi,diffyi,diffxf,diffyf;
    for(var i=4;i<rows/2-1;i++){
      diffxi=this.x-(i-1)*scale;
      diffyi=this.y-(i-1)*scale;
      diffxf=this.x-(columns-i)*scale;
      diffyf=this.y-(rows-i)*scale;

      if(diffxi<0) diffxi=(-1)*diffxi;
      if(diffyi<0) diffyi=(-1)*diffyi;
      if(diffxf<0) diffxf=(-1)*diffxf;
      if(diffyf<0) diffyf=(-1)*diffyf;
      if((diffxi<0.8*scale && diffyi<0.8*scale) || (diffxf<0.8*scale && diffyi<0.8*scale) || (diffxi<0.8*scale && diffyf<0.8*scale) || (diffxf<0.8*scale && diffyf<0.8*scale)){
        this.total = 0;
      dead.play();
      this.tail = [];
      this.x=(columns/2)*scale;
      this.y=(rows/2)*scale;
      this.xSpeed=0;
      this.ySpeed=0;
      prev="Null";
      }
    }
  }
}
