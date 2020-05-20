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
this.eat = function(fruit) {
  var dx=this.x - fruit.x;
  var dy=this.y - fruit.y;
  if(dx<0) dx=(-1)*dx;
  if(dy<0) dy=(-1)*dy;

  if (dx<0.85*scale &&
    dy<0.85*scale) {
    this.total++;
    eat.play();
    return true;
  }

  return false;
}
var dirx=1;
var diry=0;
this.move= function(x,y){
  diffx=x - this.x;
  diffy=y - this.y;

  if(dirx>0){  //initially right
    if(diffx>=0){
      var newdiffy=diffy;
      if(diffy<0) newdiffy=(-1)*diffy;

      if(diffx==0 && diffy>=0){
          if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
          else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.xSpeed = scale * this.speedfactor;
            this.ySpeed = 0;
            dirx=1;
            diry=0;
          }
          else{
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
      }

      else if(diffx==0 && diffy<0){
          if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
          else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.xSpeed = scale * this.speedfactor;
            this.ySpeed = 0;
            dirx=1;
            diry=0;
          }
          else{
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
      }   //sec 1 done

      else if(diffy==0){
          if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.xSpeed = scale * this.speedfactor;
            this.ySpeed = 0;
            dirx=1;
            diry=0;
          }
          else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
          else{
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
      }   //sec 2 done

      else if(diffx<newdiffy && diffx<diffy){
        if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
          this.xSpeed = 0;
          this.ySpeed = scale * this.speedfactor;
          dirx=0;
          diry=1;
        }
        else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
          this.xSpeed = scale * this.speedfactor;
          this.ySpeed = 0;
          dirx=1;
          diry=0;
        }
        else{
          this.xSpeed = 0;
          this.ySpeed = (-1)*scale * this.speedfactor;
          dirx=0;
          diry=-1;
        }
      }   //sec 3 done

      else if(diffx<newdiffy && diffx>diffy){
        if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
          this.xSpeed = 0;
          this.ySpeed = (-1)*scale * this.speedfactor;
          dirx=0;
          diry=-1;
        }
        else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
          this.xSpeed = scale * this.speedfactor;
          this.ySpeed = 0;
          dirx=1;
          diry=0;
        }
        else{
          this.xSpeed = 0;
          this.ySpeed = scale * this.speedfactor;
          dirx=0;
          diry=1;
        }
      }   //sec 4 done

      else if(diffx>=newdiffy){
        if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
          this.xSpeed = scale * this.speedfactor;
          this.ySpeed = 0;
          dirx=1;
          diry=0;
        }
        else if(newdiffy==diffy){
          if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
          else if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
        }
        else{
          if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
          else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
        }
      }   //sec 5 done
    }

    else{
      var newdiffy=diffy;
      if(diffy<0) newdiffy=(-1)*diffy;
      diffx=(-1)*diffx;

      if(diffy==0){
        if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
        else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
        else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.xSpeed = scale * this.speedfactor;
            this.ySpeed = 0;
            dirx=1;
            diry=0;
        }
      }   //sec 6 done

      else if(diffx<newdiffy && diffx<diffy){
        if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
          this.xSpeed = 0;
          this.ySpeed = scale * this.speedfactor;
          dirx=0;
          diry=1;
        }
        else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
          this.xSpeed = scale * this.speedfactor;
          this.ySpeed = 0;
          dirx=1;
          diry=0;
        }
        else{
          this.xSpeed = 0;
          this.ySpeed = (-1)*scale * this.speedfactor;
          dirx=0;
          diry=-1;
        }
      }   //sec 7 done

      else if(diffx<newdiffy && diffx>diffy){
        if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
          this.xSpeed = 0;
          this.ySpeed = (-1)*scale * this.speedfactor;
          dirx=0;
          diry=-1;
        }
        else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
          this.xSpeed = scale * this.speedfactor;
          this.ySpeed = 0;
          dirx=1;
          diry=0;
        }
        else{
          this.xSpeed = 0;
          this.ySpeed = scale * this.speedfactor;
          dirx=0;
          diry=1;
        }
      }   //sec 8 done

      else if(diffx>=newdiffy){
        if(newdiffy!=diffy){
          if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
          else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
        }
        else if(newdiffy==diffy){
          if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
          else if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
        }
        else{
          this.xSpeed = scale * this.speedfactor;
          this.ySpeed = 0;
          dirx=1;
          diry=0;
        }

      }   //sec 9 done
    }
  }

  else if(dirx<0){   //initially left
    if(diffx<=0){
      var newdiffy=diffy;
      if(diffy<0) newdiffy=(-1)*diffy;
      diffx=(-1)*diffx;

      if(diffx==0 && diffy>=0){
          if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
          else if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.xSpeed = (-1)*scale * this.speedfactor;
            this.ySpeed = 0;
            dirx=-1;
            diry=0;
          }
          else{
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
      }

      else if(diffx==0 && diffy<0){
          if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
          else if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.xSpeed = (-1)*scale * this.speedfactor;
            this.ySpeed = 0;
            dirx=-1;
            diry=0;
          }
          else{
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
      }   //sec 1 done

      else if(diffy==0){
          if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.xSpeed = (-1)*scale * this.speedfactor;
            this.ySpeed = 0;
            dirx=-1;
            diry=0;
          }
          else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
          else{
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
      }   //sec 2 done

      else if(diffx<newdiffy && diffx<diffy){
        if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
          this.xSpeed = 0;
          this.ySpeed = scale * this.speedfactor;
          dirx=0;
          diry=1;
        }
        else if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
          this.xSpeed = (-1)*scale * this.speedfactor;
          this.ySpeed = 0;
          dirx=-1;
          diry=0;
        }
        else{
          this.xSpeed = 0;
          this.ySpeed = (-1)*scale * this.speedfactor;
          dirx=0;
          diry=-1;
        }
      }   //sec 3 done

      else if(diffx<newdiffy && diffx>diffy){
        if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
          this.xSpeed = 0;
          this.ySpeed = (-1)*scale * this.speedfactor;
          dirx=0;
          diry=-1;
        }
        else if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
          this.xSpeed = (-1)*scale * this.speedfactor;
          this.ySpeed = 0;
          dirx=-1;
          diry=0;
        }
        else{
          this.xSpeed = 0;
          this.ySpeed = scale * this.speedfactor;
          dirx=0;
          diry=1;
        }
      }   //sec 4 done

      else if(diffx>=newdiffy){
        if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
          this.xSpeed = (-1)*scale * this.speedfactor;
          this.ySpeed = 0;
          dirx=-1;
          diry=0;
        }
        else if(newdiffy==diffy){
          if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
          else if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
        }
        else{
          if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
          else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
        }
      }   //sec 5 done
    }

    else{
      var newdiffy=diffy;
      if(diffy<0) newdiffy=(-1)*diffy;

      if(diffy==0){
        if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
        else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
        else{
            this.xSpeed = (-1)*scale * this.speedfactor;
            this.ySpeed = 0;
            dirx=-1;
            diry=0;
          }
      }   //sec 6 done

      else if(diffx<newdiffy && diffx<diffy){
        if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
          this.xSpeed = 0;
          this.ySpeed = scale * this.speedfactor;
          dirx=0;
          diry=1;
        }
        else if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
          this.xSpeed = (-1)*scale * this.speedfactor;
          this.ySpeed = 0;
          dirx=-1;
          diry=0;
          
        }
        else{
          this.xSpeed = 0;
          this.ySpeed = (-1)*scale * this.speedfactor;
          dirx=0;
          diry=-1;
        }
      }   //sec 7 done

      else if(diffx<newdiffy && diffx>diffy){
        if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
          this.xSpeed = 0;
          this.ySpeed = (-1)*scale * this.speedfactor;
          dirx=0;
          diry=-1;
        }
        else if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
          this.xSpeed = (-1)*scale * this.speedfactor;
          this.ySpeed = 0;
          dirx=-1;
          diry=0;
        }
        else{
          this.xSpeed = 0;
          this.ySpeed = scale * this.speedfactor;
          dirx=0;
          diry=1;
        }
      }   //sec 8 done

      else if(diffx>=newdiffy){
        if(newdiffy!=diffy){
          if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
          else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
        }
        else if(newdiffy==diffy){
          if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = scale * this.speedfactor;
            dirx=0;
            diry=1;
          }
          else if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.xSpeed = 0;
            this.ySpeed = (-1)*scale * this.speedfactor;
            dirx=0;
            diry=-1;
          }
        }
        else{
          this.xSpeed = (-1)*scale * this.speedfactor;
          this.ySpeed = 0;
          dirx=-1;
          diry=0;
        }
      }   //sec 9 done
    }

  }

  else if(diry>0){   //initially down
    if(diffy>=0){
      var newdiffx=diffx;
      if(diffx<0) newdiffx=(-1)*diffx;

      if(diffy==0 && diffx>0){
          if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
          else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.ySpeed = scale * this.speedfactor;
            this.xSpeed = 0;
            diry=1; dirx=0;
          }
          else{
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
      }

      else if(diffy==0 && diffx<0){
          if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
          else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.ySpeed = scale * this.speedfactor;
            this.xSpeed = 0;
            diry=1; dirx=0;
          }
          else{
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
      }   //sec 1 done

      else if(diffx==0){
          if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.ySpeed = scale * this.speedfactor;
            this.xSpeed = 0;
            diry=1; dirx=0;
          }
          else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
          else{
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
      }   //sec 2 done

      else if(diffy<newdiffx && diffy<diffx){
        if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
          this.ySpeed = 0;
          this.xSpeed = scale * this.speedfactor;
          diry=0; dirx=1;
        }
        else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
          this.ySpeed = scale * this.speedfactor;
          this.xSpeed = 0;
          diry=1; dirx=0;
        }
        else{
          this.ySpeed = 0;
          this.xSpeed = (-1)*scale * this.speedfactor;
          diry=0; dirx=-1;
        }
      }   //sec 3 done

      else if(diffy<newdiffx && diffy>diffx){
        if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
          this.ySpeed = 0;
          this.xSpeed = (-1)*scale * this.speedfactor;
          diry=0; dirx=-1;
        }
        else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
          this.ySpeed = scale * this.speedfactor;
          this.xSpeed = 0;
          diry=1; dirx=0;
        }
        else{
          this.ySpeed = 0;
          this.xSpeed = scale * this.speedfactor;
          diry=0; dirx=1;
        }
      }   //sec 4 done

      else if(diffy>=newdiffx){
        if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
          this.ySpeed = scale * this.speedfactor;
          this.xSpeed = 0;
          diry=1; dirx=0;
        }
        else if(newdiffx==diffx){
          if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
          else if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
        }
        else{
          if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
          else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
        }
      }   //sec 5 done
    }

    else{
      var newdiffx=diffx;
      if(diffx<0) newdiffx=(-1)*diffx;
      diffy=(-1)*diffy;

      if(diffx==0){
        if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
        else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
        else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
            this.ySpeed = scale * this.speedfactor;
            this.xSpeed = 0;
            diry=1; dirx=0;
        }
      }   //sec 6 done

      else if(diffy<newdiffx && diffy<diffx){
        if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
          this.ySpeed = 0;
          this.xSpeed = scale * this.speedfactor;
          diry=0; dirx=1;
        }
        else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
          this.ySpeed = scale * this.speedfactor;
          this.xSpeed = 0;
          diry=1; dirx=0;
          
        }
        else{
          this.ySpeed = 0;
          this.xSpeed = (-1)*scale * this.speedfactor;
          diry=0; dirx=-1;
        }
      }   //sec 7 done

      else if(diffy<newdiffx && diffy>diffx){
        if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
          this.ySpeed = 0;
          this.xSpeed = (-1)*scale * this.speedfactor;
          diry=0; dirx=-1;
        }
        else if(this.checkCollisionAdv(this.x,this.y+scale * this.speedfactor)){
          this.ySpeed = scale * this.speedfactor;
          this.xSpeed = 0;
          diry=1; dirx=0;
        }
        else{
          this.ySpeed = 0;
          this.xSpeed = scale * this.speedfactor;
          diry=0; dirx=1;
        }
      }   //sec 8 done

      else if(diffy>=newdiffx){
        if(newdiffx!=diffx){
          if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
          else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
        }
        else if(newdiffx==diffx){
          if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
          else if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
        }
        else{
          this.ySpeed = scale * this.speedfactor;
          this.xSpeed = 0;
          diry=1; dirx=0;
        }

      }   //sec 9 done
    }
  }

  else if(diry<0){   //initially up
    if(diffy<=0){
      var newdiffx=diffx;
      if(diffx<0) newdiffx=(-1)*diffx;
      diffy=(-1)*diffy;

      if(diffy==0 && diffx>0){
          if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
          else if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.ySpeed = (-1)*scale * this.speedfactor;
            this.xSpeed = 0;
            diry=-1; dirx=0;
          }
          else{
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
      }

      else if(diffy==0 && diffx<0){
          if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
          else if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.ySpeed = (-1)*scale * this.speedfactor;
            this.xSpeed = 0;
            diry=-1; dirx=0;
          }
          else{
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
      }   //sec 1 done

      else if(diffx==0){
          if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
            this.ySpeed = (-1)*scale * this.speedfactor;
            this.xSpeed = 0;
            diry=-1; dirx=0;
          }
          else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
          else{
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
      }   //sec 2 done

      else if(diffy<newdiffx && diffy<diffx){
        if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
          this.ySpeed = 0;
          this.xSpeed = scale * this.speedfactor;
          diry=0; dirx=1;
        }
        else if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
          this.ySpeed = (-1)*scale * this.speedfactor;
          this.xSpeed = 0;
          diry=-1; dirx=0;
        }
        else{
          this.ySpeed = 0;
          this.xSpeed = (-1)*scale * this.speedfactor;
          diry=0; dirx=-1;
        }
      }   //sec 3 done

      else if(diffy<newdiffx && diffy>diffx){
        if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
          this.ySpeed = 0;
          this.xSpeed = (-1)*scale * this.speedfactor;
          diry=0; dirx=-1;
        }
        else if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
          this.ySpeed = (-1)*scale * this.speedfactor;
          this.xSpeed = 0;
          diry=-1; dirx=0;
        }
        else{
          this.ySpeed = 0;
          this.xSpeed = scale * this.speedfactor;
          diry=0; dirx=1;
        }
      }   //sec 4 done

      else if(diffy>=newdiffx){
        if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
          this.ySpeed = (-1)*scale * this.speedfactor;
          this.xSpeed = 0;
          diry=-1; dirx=0;
        }
        else if(newdiffx==diffx){
          if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
          else if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
        }
        else{
          if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
          else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
        }
      }   //sec 5 done
    }

    else{
      var newdiffx=diffx;
      if(diffx<0) newdiffx=(-1)*diffx;

      if(diffx==0){
        if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
        else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
        else{
            this.ySpeed = (-1)*scale * this.speedfactor;
            this.xSpeed = 0;
            diry=-1; dirx=0;
          }
      }   //sec 6 done

      else if(diffy<newdiffx && diffy<diffx){
        if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
          this.ySpeed = 0;
          this.xSpeed = scale * this.speedfactor;
          diry=0; dirx=1;
        }
        else if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
          this.ySpeed = (-1)*scale * this.speedfactor;
          this.xSpeed = 0;
          diry=-1; dirx=0;
          
        }
        else{
          this.ySpeed = 0;
          this.xSpeed = (-1)*scale * this.speedfactor;
          diry=0; dirx=-1;
        }
      }   //sec 7 done

      else if(diffy<newdiffx && diffy>diffx){
        if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
          this.ySpeed = 0;
          this.xSpeed = (-1)*scale * this.speedfactor;
          diry=0; dirx=-1;
        }
        else if(this.checkCollisionAdv(this.x,this.y-scale * this.speedfactor)){
          this.ySpeed = (-1)*scale * this.speedfactor;
          this.xSpeed = 0;
          diry=-1; dirx=0;
        }
        else{
          this.ySpeed = 0;
          this.xSpeed = scale * this.speedfactor;
          diry=0; dirx=1;
        }
      }   //sec 8 done

      else if(diffy>=newdiffx){
        if(newdiffx!=diffx){
          if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
          else if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
        }
        else if(newdiffx==diffx){
          if(this.checkCollisionAdv(this.x+scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = scale * this.speedfactor;
            diry=0; dirx=1;
          }
          else if(this.checkCollisionAdv(this.x-scale * this.speedfactor,this.y)){
            this.ySpeed = 0;
            this.xSpeed = (-1)*scale * this.speedfactor;
            diry=0; dirx=-1;
          }
        }
        else{
          this.ySpeed = (-1)*scale * this.speedfactor;
          this.xSpeed = 0;
          diry=-1; dirx=0;
        }
      }   //sec 9 done
    }
  }
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

this.checkCollisionAdv = function(x,y){
  var result=1;
  for (var i=0; i<this.tail.length; i++) {
    if (x === this.tail[i].x &&
      y === this.tail[i].y) {
      result=0;
    }
  }
  if (x<0.25*scale || x>(rows-2)*scale || y<0.25*scale || y>(columns-2)*scale) {
    result=0;
  }

  var diffxi,diffyi,diffxf,diffyf;
  for(var i=4;i<rows/2-1;i++){
    diffxi=x-(i-1)*scale;
    diffyi=y-(i-1)*scale;
    diffxf=x-(columns-i)*scale;
    diffyf=y-(rows-i)*scale;

    if(diffxi<0) diffxi=(-1)*diffxi;
    if(diffyi<0) diffyi=(-1)*diffyi;
    if(diffxf<0) diffxf=(-1)*diffxf;
    if(diffyf<0) diffyf=(-1)*diffyf;
    if((diffxi<0.8*scale && diffyi<0.8*scale) || (diffxf<0.8*scale && diffyi<0.8*scale) || (diffxi<0.8*scale && diffyf<0.8*scale) || (diffxf<0.8*scale && diffyf<0.8*scale)){
      result=0;
    }
  }
  return result;
}

}