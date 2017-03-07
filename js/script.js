// module that wraps JavaScript into a single global variable
var moduleTicTacToe = +function () {
  'use strict';

  // general variables
  var gameBoard = document.getElementsByClassName('board')[0];
  var startButton = document.getElementById('start-button');
  var startDiv = document.getElementById('start');
  var win1Div = document.getElementsByClassName('screen-win-one')[0];
  var win2Div = document.getElementsByClassName('screen-win-two')[0];
  var tieDiv = document.getElementsByClassName('screen-win-tie')[0];
  var playerLI1 = document.getElementById('player1');
  var playerLI2 = document.getElementById('player2');
  var winGame1 = document.getElementsByClassName('button-win-1')[0];
  var winGame2 = document.getElementsByClassName('button-win-2')[0];
  var tieGame = document.getElementsByClassName('button-draw')[0];

  // Upon loading, start screen appears and other screen is hidden.
  document.onload = function () {
    board.style.display = 'none';
    win1Div.style.display = 'none';
    win2Div.style.display = 'none';
    tieDiv.style.display = 'none';
  };

  // display the board when the start button is clicked by the user
  startButton.addEventListener('click', function (event) {
    // start screen is hidden
    startDiv.style.display = 'none';
    // display board and add player
    gameBoard.style.display = 'block';
  
  });


} ();
