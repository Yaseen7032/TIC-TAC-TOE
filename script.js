const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
themeToggle.addEventListener("click", toggleTheme);

function handleCellClick(event) {
    const index = event.target.dataset.index;
    
    if (board[index] !== "" || !isGameActive) return;
    
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    
    if (checkWinner()) {
        statusText.textContent = `${currentPlayer} Wins! 🎉`;
        highlightWinner();
        isGameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    return winningConditions.some(combination => {
        if (combination.every(index => board[index] === currentPlayer)) {
            combination.forEach(index => cells[index].classList.add("win"));
            return true;
        }
        return false;
    });
}

function highlightWinner() {
    winningConditions.forEach(combination => {
        if (combination.every(index => board[index] === currentPlayer)) {
            combination.forEach(index => cells[index].classList.add("win"));
        }
    });
}

function resetGame() {
    board.fill("");
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
    currentPlayer = "X";
    isGameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function toggleTheme() {
    body.classList.toggle("dark-mode");
    themeToggle.textContent = body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log("Service Worker Registered"));
}
