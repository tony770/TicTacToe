function GameBoard() {
    const rows = 2;
    const columns = 2;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }


}

function Cell() {

}