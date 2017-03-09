// module that wraps JS into single global variable
var moduleTicTacToe = +function () {
    'use strict';

    // general variables
    var board = document.getElementsByClassName('board')[0];
    var startButton = document.getElementById('start-button');
    var startDiv = document.getElementById('start');
    var win1Div = document.getElementsByClassName('screen-win-one')[0];
    var win2Div = document.getElementsByClassName('screen-win-two')[0];
    var tieDiv = document.getElementsByClassName('screen-win-tie')[0];
    var playerLI1 = document.getElementById("player1");
    var playerLI2 = document.getElementById("player2");
    var winGame1 = document.getElementsByClassName('button-win-1')[0];
    var winGame2 = document.getElementsByClassName('button-win-2')[0];
    var tieGame = document.getElementsByClassName('button-draw')[0];

      // Upon loading, start screen appears and other screen is hidden.
    window.onload = function () {
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
      board.style.display = 'block';
      playerLI1.classList.add('active');
    });

    //create object for player
    function Player(name) {
        this.name = name;
        this.turn = false;
    }

    function player1(name) {
        Player.call(this, name);
    }

    function player2(name) {
        Player.call(this, name);
    }

    //prototypes/instantiation//arrays associated with players
    player1.prototype = Object.create(Player.prototype);
    player2.prototype = Object.create(Player.prototype);

    var xPlayer = new player1("X", "player1");
    var oPlayer = new player2("O", "player2");

    var xPlayerPicks = [];
    var oPlayerPicks = [];

    // setup player turns
    xPlayer.turn = true;

    var picks = Array.prototype.slice.call(document.getElementsByClassName("box"));

    // winning boxes
    var winningBoxes = [
        // Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        // Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonally
        [0, 4, 8],
        [2, 4, 6]
    ];



    // Hover and click functions
    var playerHover = function () {
        if (xPlayer.turn && playerLI1.className == 'players active' && this.className != 'box box-filled-2' && this.className != 'box box-filled-1') {
            this.classList.add('xSVG');
        }
        if (oPlayer.turn && playerLI2.className == 'players active' && this.className != 'box box-filled-2' && this.className != 'box box-filled-1') {
            this.classList.add('oSVG');
        }
    };


    var noHover = function () {
        if (this.className != 'box-filled-2' || this.className != 'box-filled-1') {
            this.classList.remove('xSVG');
            this.classList.remove('oSVG');
        }
    };

    var playerPick = function () {
        if (xPlayer.turn && playerLI1.className == 'players active') {
            if (this.className != 'box box-filled-2' && this.className != 'box box-filled-1') {
                // add the symbol by adding the CSS class
                this.classList.add('box-filled-1');
                // remove SVG hover so user cannot click same box again without mousing out
                this.classList.remove('xSVG');
                // switch active players
                playerLI1.classList.remove('active');
                playerLI2.classList.add('active');
                xPlayer.turn = false;
                oPlayer.turn = true;
                xPlayerPicks.push(picks.indexOf(this));
                gameOver();
            }
        } else if (oPlayer.turn && playerLI2.className == 'players active') {
            if (this.className != 'box box-filled-1' && this.className != 'box box-filled-2') {
                // add the symbol by adding the CSS class
                this.classList.add('box-filled-2');
                // remove SVG hover so user cannot click same box again without mousing out
                this.classList.remove('oSVG');
                // switch active players
                playerLI2.classList.remove('active');
                playerLI1.classList.add('active');
                oPlayer.turn = false;
                xPlayer.turn = true;
                oPlayerPicks.push(picks.indexOf(this));
                gameOver();
            }
        }
    };

        for (var i = 0; i < picks.length; i++) {
        var box = picks[i];
        box.addEventListener('mouseover', playerHover, false);
        box.addEventListener('mouseout', noHover, false);
        box.addEventListener('click', playerPick, false);
    }

    // New Game function
    var newGame = function () {
        for (i = 0; i < picks.length; i++) {
            var pickFilled = picks[i];
            if (pickFilled.classList) {
                pickFilled.classList.remove("box-filled-1");
                pickFilled.classList.remove("box-filled-2");
            }
        }
        playerLI1.classList.add('active');
        playerLI2.classList.remove('active');
        xPlayer.turn = true;
        oPlayer.turn = false;
        board.style.display = 'block';
        win1Div.style.display = 'none';
        win2Div.style.display = 'none';
        tieDiv.style.display = 'none';
        xPlayerPicks = [];
        oPlayerPicks = [];
    };

    // Function checks that board is full
    var boardFilled = function () {
        var isFull = xPlayerPicks.length + oPlayerPicks.length == 9;
        return isFull;
    };

    // Function checks if game is over
    var gameOver = function () {
        var winningPlayer = false;
        // Loop through the winning combinations and select one to match against player's selected box array
        for (var i = 0; i < winningBoxes.length; i++) {
            var winningMatch = winningBoxes[i];
            var xPlayerCounter = 0;
            var oPlayerCounter = 0;

            // Loop through the players checkedpicks array and see if the index matches one of the indexes for
            // a winning combo. If it does, increment the counter by 1. Then if the length of the counter is
            // equal to the length of the winning combo, the player wins and game ends
            for (var j = 0; j < xPlayerPicks.length; j++) {
                var player1SelectedBox = xPlayerPicks[j];
                if (winningMatch.includes(player1SelectedBox)) {
                    xPlayerCounter++;
                }
                if (xPlayerCounter == 3) {
                    // player wins
                    winningPlayer = true;
                    board.style.display = 'none';
                    win1Div.style.display = 'block';
                }
            }

            for (var n = 0; n < oPlayerPicks.length; n++) {
                var player2SelectedBox = oPlayerPicks[n];
                if (winningMatch.includes(player2SelectedBox)) {
                    oPlayerCounter++;
                }
                if (oPlayerCounter == 3) {
                    // player wins
                    winningPlayer = true;
                    board.style.display = 'none';
                    win2Div.style.display = 'block';
                }
            }
        }

        // If all of the squares are filled and no players have three in a row, the game is a tie
        if (boardFilled() && !winningPlayer) {
            // display draw screen
            tieDiv.style.display = 'block';
        }
    };

    // When user clicks on new game button, new game begins
    winGame1.addEventListener('click', function (event) {
        newGame();
    });

    winGame2.addEventListener('click', function (event) {
        newGame();
    });

    tieGame.addEventListener('click', function (event) {
        newGame();
    });
} ();
