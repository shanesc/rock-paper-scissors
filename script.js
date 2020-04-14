const playChoices = ['rock', 'paper', 'scissors'];

const score = {
  player: 0,
  computer: 0
}

function randomInteger(lowerBound, upperBound) {
  return lowerBound + Math.floor(Math.random() * (1 + upperBound - lowerBound));
}

function randomElement(array) {
  let index = randomInteger(0, array.length - 1);
  return array[index];
}

function computerPlay() {
  return randomElement(playChoices);
}

function playRound(playerSelection, computerSelection) {
  playerSelection =
    playerSelection
      .toLowerCase()
      .charAt(0)
      .toUpperCase() + playerSelection.toLowerCase().slice(1);
  computerSelection =
    computerSelection
      .toLowerCase()
      .charAt(0)
      .toUpperCase() + computerSelection.toLowerCase().slice(1);

  let result = {
    selections: {
      playerSelection: playerSelection,
      computerSelection: computerSelection
    },
    playerWin: false,
    computerWin: false
  };

  if (playerSelection === computerSelection) {
  } else if (
    (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
    (playerSelection === 'Scissors' && computerSelection === 'Paper') ||
    (playerSelection === 'Paper' && computerSelection === 'Rock')
  ) {
    result.playerWin = true;
  } else {
      (result.computerWin = true);
  }
  return result;
}

function playChoice(e) {
  const playerChoice = e.currentTarget.getAttribute('data-choice');
  const result = playRound(playerChoice, computerPlay());
  updateScore(result);
}

function resetGame() {
  score.player = 0;
  score.computer = 0;
  document.querySelector('.score__player').textContent = score.player;
  document.querySelector('.score__computer').textContent = score.computer;
  buttons.forEach(btn => btn.addEventListener('click', playChoice));
  toggleModal();
}

function announceWinner(winner) {
  const winnerDisplay = document.querySelector('.result');
  switch (winner) {
    case 'player':
      winnerDisplay.textContent = 'You win the game!';
      break;
    case 'computer':
      winnerDisplay.textContent = 'The computer wins the game...';
      break;
  }
  toggleModal();
}

function createIconClass(selection) {
  let classList = '';
  switch (selection) {
    case 'Rock':
      classList = 'far fa-hand-rock';
      break;
    case 'Paper':
      classList = 'far fa-hand-paper';
      break;
    case 'Scissors':
      classList = 'far fa-hand-scissors';
      break;
  }

  return classList;
}

function updateScore(result) {
  const outcome = document.querySelector('.round-outcome');
  const playerScore = document.querySelector('.score__player');
  const computerScore = document.querySelector('.score__computer');

  if (result.playerWin) {
    score.player++;
    outcome.innerHTML = `<i class="${createIconClass(result.selections.playerSelection)}"></i> > <i class="${createIconClass(result.selections.computerSelection)}"></i>`;
  } else if (result.computerWin) {
    score.computer++;
    outcome.innerHTML = `<i class="${createIconClass(result.selections.playerSelection)}"></i> < <i class="${createIconClass(result.selections.computerSelection)}"></i>`;
  } else {
    outcome.innerHTML = `<i class="${createIconClass(result.selections.playerSelection)}"></i> & <i class="${createIconClass(result.selections.computerSelection)}"></i>`;
  }

  if (score.player === 5 || score.computer === 5) {
    score.player > score.computer ? announceWinner('player') : announceWinner('computer');
  }

  playerScore.textContent = score.player;
  computerScore.textContent = score.computer;
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => btn.addEventListener('click', playChoice));
buttons.forEach(btn => btn.addEventListener('click', (e) => {
  e.currentTarget.blur();
}))

const modal = document.querySelector('.modal');
const modalCloseBtn = document.querySelector('.modal__close-btn');
// const modalOpenBtn = document.querySelector('.modal__open-btn');

function toggleModal() {
  modal.classList.toggle('modal--hidden');
}

function outsideClick(e) {
  if (e.target == modal) {
    resetGame();
  }
}
// modalOpenBtn.addEventListener('click', toggleModal);

modalCloseBtn.addEventListener('click', resetGame);

window.addEventListener('click', outsideClick);