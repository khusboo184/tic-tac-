const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);

function handleCellClick() {
    const index = this.getAttribute("data-index");

    if (board[index] !== "" || !isGameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add(currentPlayer);

    checkWinner();
}

function checkWinner() {
    let won = false;

    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;

        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            won = true;
            break;
        }
    }

    if (won) {
        statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
        isGameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw 🤝";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    isGameActive = true;
    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
    });
}
