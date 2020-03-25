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
  const playerChoice = e.target.getAttribute('data-choice');
  // const outcome = document.querySelector('.results__outcome');
  const result = playRound(playerChoice, computerPlay());
  updateScore(result);
}

function updateScore(result) {
  const outcome = document.querySelector('.results__outcome');
  const playerScore = document.querySelector('.player-score');
  const computerScore = document.querySelector('.computer-score');

  outcome.textContent = result.message;
  if (result.playerWin) {
    score.player++;
  } else if (result.computerWin) {
    score.computer++;
  }

  playerScore.textContent = `Player: ${score.player}`;
  computerScore.textContent = `Computer: ${score.computer}`;
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => btn.addEventListener('click', playChoice));



// Obsolete code, repalced by GUI implementation

// function promptSelection() {
//   let isValid = false;
//   let playerSelection;

//   while (!(isValid === true)) {
//     playerSelection = prompt(
//       `What's your choice? Rock, Paper, or Scissors`,
//       'Rock'
//     );

//     if (playerSelection === null) {
//       return `cancel`;
//     }

//     switch (playerSelection.toLowerCase()) {
//       case 'rock':
//         isValid = true;
//         break;
//       case 'paper':
//         isValid = true;
//         break;
//       case 'scissors':
//         isValid = true;
//         break;
//     }
//   }
//   return playerSelection;
// }

// function game() {
//   let playerSelection = promptSelection();

//   if (playerSelection === 'cancel') {
//     return `Cancelled`;
//   }

//   let computerScore = 0;
//   let playerScore = 0;

//   for (round = 1; round <= 5; round++) {
//     let result = playRound(playerSelection, computerPlay());

//     console.log(result.message);
//     if (result.playerWin) {
//       playerScore++;
//     } else if (result.computerWin) {
//       computerScore++;
//     }
//     console.log(`Player: ${playerScore}   Computer: ${computerScore}`);
//   }

//   console.log('\n\n');

//   if (playerScore === computerScore) {
//     console.log(
//       `It's a draw! Play again!\nFinal Score - Player: ${playerScore}   Computer: ${computerScore}`
//     );
//   } else if (playerScore > computerScore) {
//     console.log(
//       `You win the game!!\nFinal Score - Player: ${playerScore}   Computer: ${computerScore}`
//     );
//   } else {
//     console.log(
//       `You lose.\nFinal Score - Player: ${playerScore}   Computer: ${computerScore}`
//     );
//   }
// }
