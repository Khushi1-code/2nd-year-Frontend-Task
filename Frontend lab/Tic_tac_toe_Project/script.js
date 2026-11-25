// 1. Game data
var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var gameOver = false;
var moves = 0;

// NEW: score data
var xWins = 0;
var oWins = 0;
var draws = 0;

var winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// 2. Get elements from the HTML
var cells = document.getElementsByClassName("cell");
var statusText = document.getElementById("status");
var newGameBtn = document.getElementById("newGame");

// NEW: score elements and reset button
var xScoreText = document.getElementById("scoreX");
var oScoreText = document.getElementById("scoreO");
var drawScoreText = document.getElementById("scoreDraw");
var resetScoresBtn = document.getElementById("resetScores");

// 3. What happens when a cell is clicked
function playMove(index) {
  if (board[index] != "" || gameOver == true) {
    return;
  }

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  moves = moves + 1;

  if (currentPlayer == "X") {
    cells[index].classList.add("x");
  } else {
    cells[index].classList.add("o");
  }

  if (checkWin() == true) {
    statusText.textContent = "Player " + currentPlayer + " wins!";
    gameOver = true;

    // NEW: add 1 to the winner's score
    if (currentPlayer == "X") {
      xWins = xWins + 1;
    } 
    else {
      oWins = oWins + 1;
    }
    updateScores();
  } 
   else if (moves == 9) {
    statusText.textContent = "It's a draw!";
    gameOver = true;

    // NEW: add 1 to draws
    draws = draws + 1;
    updateScores();
  } 
  else {
    if (currentPlayer == "X") {
      currentPlayer = "O";
    } 
    else {
      currentPlayer = "X";
    }
    statusText.textContent = "Player " + currentPlayer + "'s turn";
  }
}

// 4. Check if the current player has won
function checkWin() {
  for (var i = 0; i < winningCombos.length; i++) {
    var a = winningCombos[i][0];
    var b = winningCombos[i][1];
    var c = winningCombos[i][2];

    if (board[a] != "" && board[a] == board[b] && board[b] == board[c]) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      return true;
    }
  }
  return false;
}

// NEW: show the scores on the screen
function updateScores() {
  xScoreText.textContent = xWins;
  oScoreText.textContent = oWins;
  drawScoreText.textContent = draws;
}

// 5. Start a new game (scores are NOT reset here)
function newGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  moves = 0;
  statusText.textContent = "Player X's turn";

  for (var i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
    cells[i].classList.remove("x");
    cells[i].classList.remove("o");
    cells[i].classList.remove("win");
  }
}

// NEW: reset the scores to 0 and start fresh
function resetScores() {
  xWins = 0;
  oWins = 0;
  draws = 0;
  updateScores();
  newGame();
}

// 6. Connect buttons to functions
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    playMove(i);
  });
}

newGameBtn.addEventListener("click", newGame);
resetScoresBtn.addEventListener("click", resetScores); // NEW