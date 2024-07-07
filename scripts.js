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

    const update = (row, col, marker) => {
        if (board[row][col] === '') {
            board[row][col] = marker;
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

    const getCurrentPlayer = () => currentPlayer;

    const checkWin = () => {
        const gameBoard = board.getBoard();
        const winningCombo = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],

            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],

            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for(const combo of winningCombo) {
            const [a, b, c] = combo;
            if(gameBoard[a[0]][a[1]] && gameBoard[a[0]][a[1]] === gameBoard[b[0]][b[1]] && gameBoard[a[0]][a[1]] === gameBoard[c[0]][c[1]]) {
                return true;
            }
        }
        return false;
    }

    const checkDraw = () => {
        const gameBoard = board.getBoard();
        return gameBoard.flat().every(cell => cell !== '');
    }

    return { switchPlayer, checkDraw, checkWin, getCurrentPlayer, board };
}

const display = () => {
    const gameState = document.querySelector('.gameState');
    const boardContainer = document.querySelector('.board_container');
    const game = createGame();

    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => {
                if(game.checkWin())
                {
                    return;
                }
                if(game.board.update(i, j, game.getCurrentPlayer().getMarker()))
                {
                    cell.textContent = game.getCurrentPlayer().getMarker();
                    if(game.checkWin())
                    {
                        gameState.textContent = `Player ${game.getCurrentPlayer().getMarker()} wins`;
                    }
                    else if(game.checkDraw())
                    {
                        gameState.textContent = "It's a Draw";
                    }
                    else
                    {
                        game.switchPlayer();
                        gameState.textContent = `Player ${game.getCurrentPlayer().getMarker()}'s turn`
                    }
                }
            });
            boardContainer.appendChild(cell);
        }
    }
}

display();