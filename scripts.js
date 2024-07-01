function createBoard() {
    let board = Array(9).fill(null);

    const display = () => {
        for(let i = 0; i < board.length; i += 3) {
            console.log(board.slice(i, i + 3).map(cell => cell || '_').join(' '));
        }
    }

    const update = (index, marker) => {
        if (board[index] == null) {
            board[index] = marker;
            return true;
        }
        return false;
    }

    const getBoard = () => board;

    return { display, update, getBoard };

};

function createPlayer(marker) {
    const getMarker = () => marker;

    return { getMarker };
}
