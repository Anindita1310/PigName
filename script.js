'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //1)Generating a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check for rolled 1 ,
    if (dice !== 1) {
      //add dice to current player score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //if true switch to next player
      switchPlayer();
    }
  }
});

//Hold button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if score is atleast 100,finish the game

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3.switch the player
      switchPlayer();
    }
  }
});
//to reset the game
btnNew.addEventListener('click', function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
});
