// Knight Class
var Knight = function(config) {
    this.type = 'knight';
    Piece.call(this, config);
};

Knight.prototype = Object.create(Piece.prototype);
Knight.prototype.constructor = Knight;

Knight.prototype.moveTo = function(targetPosition) {
    let newCol = targetPosition.col.charCodeAt(0) - 65;
    let newRow = parseInt(targetPosition.row);
    let oldCol = this.position.charCodeAt(0) - 65;
    let oldRow = parseInt(this.position[1]);

    let colDiff = Math.abs(newCol - oldCol);
    let rowDiff = Math.abs(newRow - oldRow);

    // Knight moves in an L-shape: 2 squares in one direction and 1 square perpendicular to that
    if ((colDiff === 2 && rowDiff === 1) || (colDiff === 1 && rowDiff === 2)) {
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

    console.log("Invalid move for Knight");
    return false;
};