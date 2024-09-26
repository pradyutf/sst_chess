// Rook Class
var Rook = function(config) {
    this.type = 'rook';
    Piece.call(this, config);
};

Rook.prototype = Object.create(Piece.prototype);
Rook.prototype.constructor = Rook;

Rook.prototype.moveTo = function(targetPosition) {
    let newCol = targetPosition.col.charCodeAt(0) - 65;
    let newRow = parseInt(targetPosition.row);
    let oldCol = this.position.charCodeAt(0) - 65;
    let oldRow = parseInt(this.position[1]);

    // Check if the move is along a rank or file
    if (newCol === oldCol || newRow === oldRow) {
        let colStep = newCol === oldCol ? 0 : (newCol > oldCol ? 1 : -1);
        let rowStep = newRow === oldRow ? 0 : (newRow > oldRow ? 1 : -1);
        let steps = Math.max(Math.abs(newCol - oldCol), Math.abs(newRow - oldRow));

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

    console.log("Invalid move for Rook");
    return false;
};