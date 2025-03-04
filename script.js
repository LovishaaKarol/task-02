let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const gameBoard = document.getElementById("game-board");
const gameStatus = document.getElementById("game-status");

function initializeBoard() {
    gameBoard.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.setAttribute("data-index", index);
        cellElement.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");
    
    if (board[index] !== "" || !gameActive) return;
    
    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    
    if (checkWinner()) {
        gameStatus.innerText = `${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.innerText = `${currentPlayer}'s turn`;
    
    if (currentPlayer === "O" && gameActive) {
        aiMove();
    }
}

function aiMove() {
    let availableMoves = board.map((cell, index) => (cell === "" ? index : null)).filter(item => item !== null);
    
    if (availableMoves.length === 0) return;
    
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    
    board[randomMove] = "O";
    document.querySelector(`[data-index='${randomMove}']`).innerText = "O";
    
    if (checkWinner()) {
        gameStatus.innerText = "O Wins! 🎉";
        gameActive = false;
        return;
    }
    
    currentPlayer = "X";
    gameStatus.innerText = `${currentPlayer}'s turn`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    gameStatus.innerText = `${currentPlayer}'s turn`;
    initializeBoard();
}

initializeBoard();


