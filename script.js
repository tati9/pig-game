'use strict';
// Selecting elements

let rollDiceBtn = document.querySelector('.btn--roll');
let dice = document.querySelector('.dice');
let currentScore = document.querySelectorAll('.current-score');
let player = document.querySelectorAll('.player');
let holdBtn = document.querySelector('.btn--hold');
let newGameBtn = document.querySelector('.btn--new');
let score = document.querySelectorAll('.score');

let diceRendomNumber,
  diceRendomNumberSum,
  scoreSumArray,
  currentPlayer,
  playing;

let init = function () {
  diceRendomNumber = 0;
  diceRendomNumberSum = 0;
  scoreSumArray = [0, 0];
  currentPlayer = 0;
  playing = true;
  dice.classList.add('hidden');

  player[0].classList.remove('player--winner');
  player[1].classList.remove('player--winner');
  player[0].classList.add('player--active');
  player[1].classList.remove('player--active');
  for (let i = 0; i < player.length; i++) {
    currentScore[i].textContent = 0;
    score[i].textContent = 0;
  }
};
init();

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
  if (playing) {
    diceRendomNumber = Math.floor(Math.random() * 6) + 1;
    diceRendomNumberSum = diceRendomNumberSum + diceRendomNumber;
    dice.classList.remove('hidden');
    dice.setAttribute('src', `dice-${diceRendomNumber}.png`);
    activateCurrentPlayer(currentPlayer);

    if (diceRendomNumber === 1) {
      currentPlayer = currentPlayer === 0 ? 1 : 0;
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
  }
});

holdBtn.addEventListener('click', function () {
  if (playing) {
    scoreSumArray[currentPlayer] =
      scoreSumArray[currentPlayer] + diceRendomNumberSum;
    score[currentPlayer].textContent = scoreSumArray[currentPlayer];

    if (scoreSumArray[currentPlayer] >= 20) {
      playing = false;
      player[currentPlayer].classList.add('player--winner');
      dice.classList.add('hidden');
      currentScore[currentPlayer].textContent = diceRendomNumberSum;
    }
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    diceRendomNumberSum = 0;
    activateCurrentPlayer(currentPlayer);
  }
});

newGameBtn.addEventListener('click', init);
