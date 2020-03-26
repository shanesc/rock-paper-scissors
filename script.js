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
    message: ``,
    playerWin: false,
    computerWin: false
  };

  if (playerSelection === computerSelection) {
    result.message = `Draw! ${playerSelection} and ${computerSelection}`;
  } else if (
    (playerSelection === 'Rock' && computerSelection === 'Scissors') ||
    (playerSelection === 'Scissors' && computerSelection === 'Paper') ||
    (playerSelection === 'Paper' && computerSelection === 'Rock')
  ) {
    result.message = `You win! ${playerSelection} beats ${computerSelection}!`;
    result.playerWin = true;
  } else {
    (result.message = `You lose... ${computerSelection} beats ${playerSelection}...`),
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
  document.querySelector('.results__winner').textContent = '';
  document.querySelector('.results__outcome').textContent = 'Make a selection to play...';
  document.querySelector('.score__player').textContent = '';
  document.querySelector('.score__computer').textContent = '';
  document.querySelector('.results').removeChild(document.querySelector('.results').lastChild);
  buttons.forEach(btn => btn.addEventListener('click', playChoice));
}

function announceWinner(winner) {
  const winnerDisplay = document.querySelector('.results__winner');
  switch (winner) {
    case 'player':
      winnerDisplay.textContent = 'You win the game!';
      break;
    case 'computer':
      winnerDisplay.textContent = 'The computer wins the game...';
      break;
  }

  buttons.forEach(btn => btn.removeEventListener('click', playChoice));
  const resultsContainer = document.querySelector('.results');
  let resetButton = document.createElement('button');
  resetButton.textContent = 'Reset';
  resultsContainer.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function updateScore(result) {
  const outcome = document.querySelector('.results__outcome');
  const playerScore = document.querySelector('.score__player');
  const computerScore = document.querySelector('.score__computer');

  outcome.textContent = result.message;
  if (result.playerWin) {
    score.player++;
  } else if (result.computerWin) {
    score.computer++;
  }

  if (score.player === 5 || score.computer === 5) {
    score.player > score.computer ? announceWinner('player') : announceWinner('computer');
  }

  playerScore.textContent = `Player: ${score.player}`;
  computerScore.textContent = `Computer: ${score.computer}`;
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => btn.addEventListener('click', playChoice));
buttons.forEach(btn => btn.addEventListener('click', (e) => {
  e.currentTarget.blur();
}))