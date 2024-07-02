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

    const play = () => {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        const promptMove = () => {
            board.display();
            rl.question(`Player ${currentPlayer.getMarker()}, enter you move (0-8): `, (input) => {
                const index = parseInt(input);
                if(index >= 0 && index <= 8 && board.update(index, currentPlayer.getMarker())) {
                    if(checkWin(board.getBoard())) {
                        board.display();
                        console.log(`Player ${currentPlayer.getMarker()} wins!`);
                        rl.close();
                    }
                    else if(checkDraw(board.getBoard())) {
                        board.display();
                        console.log('Draw!');
                        rl.close();
                    }
                    else {
                        switchPlayer();
                        promptMove();
                    }
                }
                else {
                    console.log('Invalid move. Try again.');
                    promptMove();
                }
            })
        }
        promptMove();
    }
    return { play };
}

const game = createGame();
game.play();