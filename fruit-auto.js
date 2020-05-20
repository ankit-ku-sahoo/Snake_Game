const food= new Image();
food.src="img/food.png";

function Fruit() {
  this.x;
  this.y;

  this.pickLocation = function() {
    this.x = (Math.floor(Math.random() *
      (columns - 2)) + 1) * scale;
    this.y = (Math.floor(Math.random() *
      (rows - 2)) + 1) * scale;
  }

  this.draw = function() {
    ctx.fillStyle = "#4cafab";
    ctx.drawImage(food,this.x,this.y);
  }
  var result=false;

  this.checkmaze=function(){
    for(let k=0;k<8;k++){
      if((this.x==(rows/2-4+k)*scale) && (this.y==(columns/2+3)*scale||this.y==(columns/2-3)*scale)){
        result=true;
      }
    }
    if(result){
      this.pickLocation();
      this.checkmaze();
      result=false;
    }
  }
}
