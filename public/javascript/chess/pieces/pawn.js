var Pawn = function(config){
    this.type = 'pawn';
    this.constructor(config);
};

Pawn.prototype = new Piece({});
Pawn.prototype.moveTo = function(targetPosition){
    console.log(this);
    console.log(targetPosition)

    let newPosition = targetPosition.col + targetPosition.row ;
    
    if (this.color =='black' && newPosition[1] == this.position[1]-1 && newPosition[0] == this.position[0]) {
        this.position = newPosition;}
    else if (this.color =='white' && newPosition[1] == this.position[1]-2+2+1 && newPosition[0] == this.position[0]) {
            this.position = newPosition;}
    else{
        console.log("Invalid Move");
    }
    this.render();
}

Pawn.prototype.kill = function(){

}