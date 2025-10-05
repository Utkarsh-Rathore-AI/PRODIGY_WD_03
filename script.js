let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;
let numPlayers = 2;

function showPlayerSelect() {
  document.getElementById('welcome-screen').classList.remove('active');
  document.getElementById('player-select').classList.add('active');
}

function startGame(players) {
  numPlayers = players;
  document.getElementById('player-select').classList.remove('active');
  document.getElementById('game').classList.add('active');
  createBoard();
}

function createBoard() {
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = "";
  board = ["", "", "", "", "", "", "", "", ""];
  isGameOver = false;
  currentPlayer = "X";
  updateTurnText();

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    boardDiv.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || isGameOver) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    document.getElementById('turn-text').textContent = `Player ${currentPlayer} Wins!`;
    isGameOver = true;
    return;
  }

  if (!board.includes("")) {
    document.getElementById('turn-text').textContent = "It's a Draw!";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateTurnText();
}

function updateTurnText() {
  document.getElementById('turn-text').textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern => 
    pattern.every(index => board[index] === currentPlayer)
  );
}

function resetGame() {
  createBoard();
}
