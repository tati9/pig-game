'use strict';

let rollDiceBtn = document.querySelector('.btn--roll');
let dice = document.querySelector('.dice');
let currentScore = document.querySelectorAll('.current-score');
let player = document.querySelectorAll('.player');
let holdBtn = document.querySelector('.btn--hold');
let score = document.querySelectorAll('.score');
let diceRendomNumber = 0;
let diceRendomNumberSum = 0;
let scoreSumArray = [0, 0];
let currentPlayer = 0;
let getRendonNumber = function () {
  return (diceRendomNumber = Math.floor(Math.random() * 6) + 1);
};
let activateCurrentPlayer = function (currentPlayer) {
  if (currentPlayer === 1) {
    player[0].classList.remove('player--active');
    player[1].classList.add('player--active');
  } else if (currentPlayer === 0) {
    player[1].classList.remove('player--active');
    player[0].classList.add('player--active');
  }
};

rollDiceBtn.addEventListener('click', function () {
  getRendonNumber();
  diceRendomNumberSum = diceRendomNumberSum + diceRendomNumber;
  dice.classList.remove('hidden');
  dice.setAttribute('src', `dice-${diceRendomNumber}.png`);
  activateCurrentPlayer(currentPlayer);

  if (diceRendomNumber === 1) {
    currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
    activateCurrentPlayer(currentPlayer);
    diceRendomNumberSum = 0;
  }
  for (let i = 0; i < player.length; i++) {
    if (player[i].classList.contains('player--active')) {
      currentScore[i].textContent = diceRendomNumberSum;
    } else {
      currentScore[i].textContent = 0;
    }
  }
});

holdBtn.addEventListener('click', function () {
  scoreSumArray[currentPlayer] =
    scoreSumArray[currentPlayer] + diceRendomNumberSum;
  score[currentPlayer].textContent = scoreSumArray[currentPlayer];

  if (scoreSumArray[currentPlayer] >= 100) {
    player[currentPlayer].classList.add('player--winner');
    dice.classList.add('hidden');
    currentScore[currentPlayer].textContent = diceRendomNumberSum;
  }
  currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  diceRendomNumberSum = 0;
  activateCurrentPlayer(currentPlayer);
});
