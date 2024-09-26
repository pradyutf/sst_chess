
var Pawn = function(config){
    this.type = 'pawn';
    this.firstMove = true;
    Piece.call(this, config);
};

Pawn.prototype = Object.create(Piece.prototype);
Pawn.prototype.constructor = Pawn;

Pawn.prototype.moveTo = function(targetPosition) {
    let newCol = targetPosition.col.charCodeAt(0) - 65; // Convert column letter to number (A=0, B=1, etc.)
    let newRow = parseInt(targetPosition.row);
    let oldCol = this.position.charCodeAt(0) - 65;
    let oldRow = parseInt(this.position[1]);

    let colDiff = Math.abs(newCol - oldCol);
    let rowDiff = this.color === 'white' ? newRow - oldRow : oldRow - newRow;

    let targetPiece = this.board.getPieceAt(targetPosition);

    // Check for valid move
    if (colDiff === 0 && rowDiff === 1 && !targetPiece) {
        // Regular forward move
        this.updatePosition(targetPosition);
    } else if (colDiff === 0 && rowDiff === 2 && this.firstMove && !targetPiece) {
        // First move - two squares forward
        let intermediateRow = this.color === 'white' ? oldRow + 1 : oldRow - 1;
        let intermediatePosition = {col: this.position[0], row: intermediateRow.toString()};
        if (!this.board.getPieceAt(intermediatePosition)) {
            this.updatePosition(targetPosition);
        } else {
            console.log("Invalid move: piece in the way");
            return false;
        }
    } else if (colDiff === 1 && rowDiff === 1 && targetPiece && targetPiece.color !== this.color) {
        // Capture diagonally
        this.kill(targetPiece);
        this.updatePosition(targetPosition);
    } else {
        console.log("Invalid move");
        return false;
    }

    this.firstMove = false;
    this.board.changeTurns();
    return true;
};

Pawn.prototype.updatePosition = function(targetPosition) {
    this.position = targetPosition.col + targetPosition.row;
    this.render();
};

Pawn.prototype.kill = function(targetPiece) {
    Piece.prototype.kill.call(this, targetPiece);
    // Additional logic specific to Pawn, if needed
};