var Queen = function(config) {
    this.type = 'queen';
    Piece.call(this, config); 
};

Queen.prototype = Object.create(Piece.prototype);
Queen.prototype.constructor = Queen;

Queen.prototype.moveTo = function(targetPosition) {
    let newCol = targetPosition.col.charCodeAt(0) - 65;
    let newRow = parseInt(targetPosition.row);
    let oldCol = this.position.charCodeAt(0) - 65;
    let oldRow = parseInt(this.position[1]);

    let colDiff = Math.abs(newCol - oldCol);
    let rowDiff = Math.abs(newRow - oldRow);

    // Queen can move like a rook or a bishop
    if (newCol === oldCol || newRow === oldRow || colDiff === rowDiff) {
        let colStep = newCol === oldCol ? 0 : (newCol > oldCol ? 1 : -1);
        let rowStep = newRow === oldRow ? 0 : (newRow > oldRow ? 1 : -1);
        let steps = Math.max(colDiff, rowDiff);

        // Check if the path is clear
        for (let i = 1; i < steps; i++) {
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

    console.log("Invalid move for Queen");
    return false;
};
