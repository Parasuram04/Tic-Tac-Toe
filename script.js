const cells = document.querySelectorAll('.cell');
const xScoreElement = document.getElementById('xScore');
const oScoreElement = document.getElementById('oScore');
const resetButton = document.getElementById('reset');
const onePlayerButton = document.getElementById('onePlayer');
const twoPlayerButton = document.getElementById('twoPlayer');
let isXTurn = true;
let xScore = 0;
let oScore = 0;
let isOnePlayerMode = true;
let isGameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');
    if (gameState[cellIndex] !== '' || !isGameActive) return;

    cell.textContent = isXTurn ? 'X' : 'O';
    gameState[cellIndex] = isXTurn ? 'X' : 'O';

    if (checkWin()) {
        updateScore(isXTurn ? 'X' : 'O');
        resetBoard();
        return;
    }

    isXTurn = !isXTurn;

    if (isOnePlayerMode && !isXTurn && isGameActive) {
        setTimeout(makeComputerMove, 500);
    }
}

function makeComputerMove() {
    const emptyCells = Array.from(cells).filter(cell => cell.textContent === '');
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = 'O';
    const cellIndex = randomCell.getAttribute('data-index');
    gameState[cellIndex] = 'O';

    if (checkWin()) {
        updateScore('O');
        resetBoard();
        return;
    }

    isXTurn = !isXTurn;
}

function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function updateScore(winner) {
    isGameActive = false;
    if (winner === 'X') {
        xScore++;
        xScoreElement.textContent = xScore;
    } else {
        oScore++;
        oScoreElement.textContent = oScore;
    }
    setTimeout(resetBoard, 1000);
}

function resetBoard() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    isXTurn = true;
    isGameActive = true;
}

function resetGame() {
    xScore = 0;
    oScore = 0;
    xScoreElement.textContent = xScore;
    oScoreElement.textContent = oScore;
    resetBoard();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

onePlayerButton.addEventListener('click', () => {
    isOnePlayerMode = true;
    onePlayerButton.classList.add('selected');
    twoPlayerButton.classList.remove('selected');
    resetGame();
});

twoPlayerButton.addEventListener('click', () => {
    isOnePlayerMode = false;
    twoPlayerButton.classList.add('selected');
    onePlayerButton.classList.remove('selected');
    resetGame();
});