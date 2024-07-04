function createBoard() {
    let board = [];
    const rows = 3;
    const columns = 3;

    for(let i = 0; i < rows; i++)
        {
            board[i] = [];
            for(let j = 0; j < columns; j++){
                board[i].push('');
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

    return { update, getBoard };

};

function createPlayer(marker) {
    const getMarker = () => marker;

    return { getMarker };
}

const createGame = () => {
    const board = createBoard();
    const player1 = createPlayer('X');
    const player2 = createPlayer('O');
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
    }

    const checkWin = (board) => {
        const winningCombo = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
            [0, 4, 8], [2, 4, 6]             //diagonals
        ];

        for(const combo of winningCombo) {
            const [a, b, c] = combo;
            if(board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    }

    const checkDraw = (board) => {
        return board.every(cell => cell !== null);
    }

    return { switchPlayer, checkDraw, checkWin };
}

const display = () => {
    
}
