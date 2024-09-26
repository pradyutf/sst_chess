// King Class
var King = function (config) {
  this.type = "king";
  Piece.call(this, config);
};

King.prototype = Object.create(Piece.prototype);
King.prototype.constructor = King;

King.prototype.moveTo = function (targetPosition) {
  let newCol = targetPosition.col.charCodeAt(0) - 65;
  let newRow = parseInt(targetPosition.row);
  let oldCol = this.position.charCodeAt(0) - 65;
  let oldRow = parseInt(this.position[1]);

  let colDiff = Math.abs(newCol - oldCol);
  let rowDiff = Math.abs(newRow - oldRow);

  // King can move one square in any direction
  if (colDiff <= 1 && rowDiff <= 1) {
    let targetPiece = this.board.getPieceAt(targetPosition);
    if (targetPiece && targetPiece.color === this.color) {
      console.log("Cannot capture own piece");
      return false;
    }

    if (targetPiece) {
      this.kill(targetPiece);
    }

    this.updatePosition(targetPosition);
    this.board.changeTurns();
    return true;
  }

  console.log("Invalid move for King");
  return false;
};
