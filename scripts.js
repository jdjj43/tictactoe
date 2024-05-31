let players = [];
let board = {
  1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null,
};
let turn = '';
const allSquares = document.querySelectorAll('.square');

function Player(playerName) {
  let score = 0;
  const getScore = () => score;
  const giveScorePoint = () => score++;
  return { getScore, giveScorePoint }
}


const createPlayer = (playerName) => {
  const { getScore, giveScorePoint, } = Player(playerName);
  if(players.length === 0) {
    players.push({ name: playerName, getScore, giveScorePoint, piece: "X" });
    const player1Name = document.getElementById('player1Name');
    player1Name.innerText = `${playerName}(X)`
    return { name: playerName, getScore, giveScorePoint }
  } else if(players.length === 1) {
    players.push({ name: playerName, getScore, giveScorePoint, piece: "O"});
    const player2Name = document.getElementById('player2Name');
    player2Name.innerText = `${playerName}(O)`
    return { name: playerName, getScore, giveScorePoint }
  } else {
    return
  }
}

const setNames = (e) => {
  e.preventDefault();
  const inputPlayer1 = document.getElementById('inputPlayer1');
  const inputPlayer2 = document.getElementById('inputPlayer2');
  const playersForm = document.getElementById('playersForm');
  const board = document.getElementById('board');
  const resetContainer = document.getElementById('reset-container');
  createPlayer(inputPlayer1.value);
  createPlayer(inputPlayer2.value);
  playersForm.classList.add('hidden');
  board.classList.remove('hidden');
  resetContainer.classList.remove('hidden');
}

const resetGame = () => {
  board = {
    1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null,
  };
  
  allSquares.forEach(square => {
    square.innerHTML = "";
  });
}

const checkGame = () => {
  const winConditions = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],  // Filas
    [1, 4, 7], [2, 5, 8], [3, 6, 9],  // Columnas
    [1, 5, 9], [3, 5, 7]              // Diagonales
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      const winner = board[a];

      resetGame();

      if (winner === 'X') {
        const player1Score = document.getElementById('player1Score');
        players[0].giveScorePoint();
        player1Score.innerText = `Score: ${players[0].getScore()}`;
        const winnerP = document.getElementById('winner');
        winnerP.innerText = `Gana ${players[0].name}!`
      } else if (winner === 'O') {
        const player2Score = document.getElementById('player2Score');
        players[1].giveScorePoint();
        player2Score.innerText = `Score: ${players[1].getScore()}`;
        const winnerP = document.getElementById('winner');
        winnerP.innerText = `Gana ${players[1].name}!`
      }

      return;
    }
  }
};

const selectMove = (boardNumber, playerPiece) => {
  if(boardNumber > 9) {
    return;
  }
  const tableSquare = document.getElementById(boardNumber);
  const piece = document.createElement('p');
  piece.innerHTML = playerPiece;
  tableSquare.appendChild(piece);
  board = {...board, [boardNumber]: playerPiece}
  checkGame();
  setTurn();
}

const setTurn = () => {
  if(turn === '') {
    const random = Math.random() * 2;
    if(parseInt(random) === 1) {
      turn = 'X';
    } else {
      turn = 'O';
    }
  }
  if(turn === 'X') {
    turn = 'O';
  } else {
    turn = 'X';
  }
}


allSquares.forEach(square => {
  square.addEventListener('click', () => {
    if(square.children.length > 0) {
      return;
    }
    if(turn === 'X') {
      selectMove(square.id, "X");
    } else {
      selectMove(square.id, "O");
    }
  })
});

setTurn();

const playersForm = document.getElementById('playersForm');
playersForm.addEventListener('submit', (e) => {
  setNames(e);
})