const cells = document.querySelectorAll("[data-cell]");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const playAgainButton = document.getElementById("play-again");
const resetButton = document.getElementById("reset-game");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");

let currentPlayer = "X";
let board = Array(9).fill(null);
let scores = { X: 0, O: 0 };

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (board[cellIndex] || popup.classList.contains("visible")) return;

  board[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWinner()) {
    endGame(`${currentPlayer} Wins! 🎉`);
    updateScore();
  } else if (board.every((cell) => cell)) {
    endGame("It's a Draw! 🤝");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWinner() {
  return winningPatterns.some((pattern) =>
    pattern.every((index) => board[index] === currentPlayer)
  );
}

function endGame(message) {
  popupMessage.textContent = message;
  popup.classList.remove("hidden");
}

function updateScore() {
  scores[currentPlayer]++;
  scoreX.textContent = scores["X"];
  scoreO.textContent = scores["O"];
}

function resetGame() {
  board.fill(null);
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  popup.classList.add("hidden");
  currentPlayer = "X";
}

function fullReset() {
  resetGame();
  scores = { X: 0, O: 0 };
  scoreX.textContent = "0";
  scoreO.textContent = "0";
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
playAgainButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", fullReset);
