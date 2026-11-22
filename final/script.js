'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const winnerMessage = document.getElementById('winner-message');

// Variables
let scores, currentScore, activePlayer, playing;

// Initialize game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  diceEl.src = 'dice-5.png';

  player0El.classList.remove('player--winner', 'winner-animation');

  player1El.classList.remove('player--winner', 'winner-animation');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  winnerMessage.classList.add('hidden');
  winnerMessage.textContent = '';
};

// Finish game
const finishGame = function () {
  playing = false;

  diceEl.classList.add('hidden');

  const winner = document.querySelector(`.player--${activePlayer}`);

  winner.classList.add('player--winner');
  winner.classList.add('winner-animation');
  winner.classList.remove('player--active');

  winnerMessage.textContent = `🏆 Player ${activePlayer + 1} Wins! 🏆`;

  winnerMessage.classList.remove('hidden');
};

// Switch player
const switchPlayer = function () {
  currentScore = 0;

  activePlayer = activePlayer === 0 ? 1 : 0;

  current0El.textContent = scores[0];
  current1El.textContent = scores[1];

  score0El.textContent = 0;
  score1El.textContent = 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Start game
init();

// Roll dice
btnRoll.addEventListener('click', function () {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;

  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // Show latest dice number
  document.getElementById(`score--${activePlayer}`).textContent = dice;

  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;

    // Calculate total
    const total = scores[activePlayer] + currentScore;

    // Show current score
    document.getElementById(`current--${activePlayer}`).textContent = total;

    // Check winner immediately at 50
    if (total >= 50) {
      scores[activePlayer] = total;

      finishGame();
    }
  } else {
    // Switch player
    switchPlayer();
  }
});

// Hold button
btnHold.addEventListener('click', function () {
  if (!playing) return;

  // Save current score
  scores[activePlayer] += currentScore;

  // Show saved score
  document.getElementById(`current--${activePlayer}`).textContent =
    scores[activePlayer];

  // Check winner
  if (scores[activePlayer] >= 50) {
    finishGame();
  } else {
    switchPlayer();
  }
});

// New game
btnNew.addEventListener('click', init);
