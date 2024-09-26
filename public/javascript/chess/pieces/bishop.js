// Bishop Class
var Bishop = function(config) {
    this.type = 'bishop';
    Piece.call(this, config);
};

Bishop.prototype = Object.create(Piece.prototype);
Bishop.prototype.constructor = Bishop;

Bishop.prototype.moveTo = function(targetPosition) {
    let newCol = targetPosition.col.charCodeAt(0) - 65;
    let newRow = parseInt(targetPosition.row);
    let oldCol = this.position.charCodeAt(0) - 65;
    let oldRow = parseInt(this.position[1]);

    let colDiff = Math.abs(newCol - oldCol);
    let rowDiff = Math.abs(newRow - oldRow);

    // Check if the move is diagonal
    if (colDiff === rowDiff) {
        // Check if the path is clear
        let colStep = newCol > oldCol ? 1 : -1;
        let rowStep = newRow > oldRow ? 1 : -1;
        for (let i = 1; i < colDiff; i++) {
            let checkPos = {
                col: String.fromCharCode(oldCol + i * colStep + 65),
                row: (oldRow + i * rowStep).toString()
            };
            if (this.board.getPieceAt(checkPos)) {
                console.log("Path is not clear");
                return false;
            }
        }

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

    console.log("Invalid move for Bishop");
    return false;
};
