//Initialize variables. Constant variables are in CAPS//
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var PLAYERMARKER = "X";
var CPUMARKER = "O";
var CORNERSQUARES = [0, 2, 6, 8];
var SIDESQUARES = [1, 3, 5, 7];
var cpuChoice = null;
var yourScore = 0;
var cpuScore = 0;
var winCondition = false;
var cpuStreak = 0;

//Checks if either the player or CPU has won or can win based on the markerToTest
// parameter.  BoardToTest parameter will be either the actual board or a copy 
//of the board to test if the CPU or player can win.
function checkIfWin(markerToTest, boardToTest) {
    if (boardToTest[0] == markerToTest && boardToTest[1] == markerToTest && boardToTest[2] == markerToTest) {
        return winCondition = true;
    }
    else if (boardToTest[3] == markerToTest && boardToTest[4] == markerToTest && boardToTest[5] == markerToTest) {
        return winCondition = true;
    }
    else if (boardToTest[6] == markerToTest && boardToTest[7] == markerToTest && boardToTest[8] == markerToTest) {
        return winCondition = true;
    }
    else if (boardToTest[0] == markerToTest && boardToTest[3] == markerToTest && boardToTest[6] == markerToTest) {
        return winCondition = true;
    }
    else if (boardToTest[1] == markerToTest && boardToTest[4] == markerToTest && boardToTest[7] == markerToTest) {
        return winCondition = true;
    }
    else if (boardToTest[2] == markerToTest && boardToTest[5] == markerToTest && boardToTest[8] == markerToTest) {
        return winCondition = true;
    }
    else if (boardToTest[0] == markerToTest && boardToTest[4] == markerToTest && boardToTest[8] == markerToTest) {
        return winCondition = true;
    }
    else if (boardToTest[2] == markerToTest && boardToTest[4] == markerToTest && boardToTest[6] == markerToTest) {
        return winCondition = true;
    }   
}

//Create a copy of the current board to test if player or cpu can win.  The CPU
//will test if it can win first, followed by testing to see if it can block the 
//player from winning.  Otherwise the CPU will check if a corner square is available.
//If no corners are available the CPU will select on of the remaining side squares, then
//check if it has won.
function cpuTurn() {
	var isAvailable = [];
	var openCorners = [];
	var openSides = [];
	var copyOfBoard = board.slice();
		for (i = 0; i < copyOfBoard.length; i++) {
			if (isNaN(copyOfBoard[i]) == false) {
				isAvailable.push(copyOfBoard[i]); 
			}
		}
	if (isAvailable.length === 0) {
		var changeTitleBar = document.getElementById("titleBar");
		changeTitleBar.innerHTML = "Tie!";
		return;
	}
	if (cpuChoice == null) {
		checkIfCpuCanWin(isAvailable, copyOfBoard, cpuChoice);
	}
	if (cpuChoice == null) {
		checkIfPlayerCanWin(isAvailable, copyOfBoard, cpuChoice);
	}
	if (cpuChoice == null) {	
		checkCorners(isAvailable, openCorners, cpuChoice);
	}
	if (cpuChoice == null) {
		checkOtherSquares(isAvailable, openSides, cpuChoice);
	}
	var squareToChange = document.getElementById(cpuChoice);
	squareToChange.innerHTML = CPUMARKER;
	board[cpuChoice] = CPUMARKER;
	checkIfWin(CPUMARKER, board);
	if (winCondition == true) {
		var changeTitleBar = document.getElementById("titleBar");
		changeTitleBar.innerHTML = "You Lose!";
		cpuStreak += 1;
		if (cpuStreak >= 4) {
			var changeTitleBar = document.getElementById("titleBar");
			changeTitleBar.innerHTML = "Ouch..."
		}
		cpuScore++;
		var changeScore = document.getElementById("cpuScore");
		changeScore.innerHTML = cpuScore;
		return;
	}
	cpuChoice = null;		
}

//Test all of the available squares if placing the cpu marker on that square
//will allow the CPU to win.  If a true winCondition is returned from the 
//checkIfWin function, the CPU will set that square as its choice.  If not, it
//will reset the copyOfBoard to the current state and test the next available
//square.
function checkIfCpuCanWin(isAvailable, copyOfBoard, blankCpuChoice) {		
	for (i = 0; i < isAvailable.length; i++) {
		copyOfBoard[isAvailable[i]] = CPUMARKER;
		checkIfWin(CPUMARKER, copyOfBoard);
		if (winCondition == true) {
			return cpuChoice = isAvailable[i];
		}
		copyOfBoard = board.slice();	
	}
}

//Test all of the available squares if placing the player marker on that square
//will allow the player to win.  If a true condition is returned the CPU will 
//select that square as its choice in order to block the player from winning.  
//The winConditon will be set back to false, since the player did not acutally win
//yet, it was just a test.  If true is not returned, the copyOfBoard will be 
//reset to the current state of the board and the next available square will be 
//tested.
function checkIfPlayerCanWin(isAvailable, copyOfBoard, blankCpuChoice) {
	for (i = 0; i < isAvailable.length; i++) {
		copyOfBoard[isAvailable[i]] = PLAYERMARKER;
		checkIfWin(PLAYERMARKER, copyOfBoard);
		if (winCondition == true) {
			cpuChoice = isAvailable[i];
			winCondition = false;
			return;
		}
		copyOfBoard = board.slice();
	}
}

//Check if any of the available squares are corner squares.  If a corner square
//is open it is added to an array of openCorners.  Then the CPU will select a 
//random index of the array as its choice.  Picking the first in the array 
//everytime is boring!
function checkCorners(isAvailable, openCorners, blankCpuChoice) {		
	for (i = 0; i < isAvailable.length; i++) {
		for (n = 0; n < CORNERSQUARES.length; n++) {
			if (isAvailable[i] == CORNERSQUARES[n]) {
				openCorners.push(isAvailable[i]);
			}
		}
	}						
	if (openCorners.length > 0) {
		return cpuChoice = openCorners[Math.floor(Math.random() * openCorners.length)];
	}
}

//Check if any of the available squares are the middle squares along each side.  
//If a middle square is open it is added to an array of openSides.  Then the CPU
// will select a random index of the array as its choice.  
function checkOtherSquares(isAvailable, openSides, blankCpuChoice) {
	for (i = 0; i < isAvailable.length; i++) {
		if (isAvailable[i] == 4) {
			cpuChoice = isAvailable[i];
			return;
		}
		else {
			for (n = 0; n < SIDESQUARES.length; n++) {
				if (isAvailable[i] == SIDESQUARES[n]) {
					openSides.push(isAvailable[i]);
				}
			}							
		}
	}
	if (openSides.length > 0) {
		return cpuChoice = openSides[Math.floor(Math.random() * openSides.length)];
	}
}		

//Check if the square the player chooses is actually available.  This prevents
//the player from selecting squares that are already occupied.
function checkIfOpen(choice) {
	if (winCondition == true) {
		return;
	}
	if (board[choice] == "X") {
		alert( "That square is already taken!" );
	}
	else if (board[choice] == "O") {
		alert( "That square is already taken!" );
	}
	else {
		playerTurn(choice);
	}
}

//Update the board with the players choice and check if the player has won.  If
//player has not won, call for CPUs turn.  
function playerTurn(choice) {	
	var squareToChange = document.getElementById(choice);
	squareToChange.innerHTML = PLAYERMARKER;
	board[choice] = PLAYERMARKER;
	checkIfWin(PLAYERMARKER, board);
	if (winCondition == true) {
		var changeTitleBar = document.getElementById("titleBar");
		changeTitleBar.innerHTML = "You Win!";
		yourScore++;
		var changeScore = document.getElementById("yourScore");
		changeScore.innerHTML = yourScore;
		cpuStreak = 0;
		return;
	}
	setTimeout("cpuTurn()", 500);
}

//Reinitialize variables to original valuesif the player would like to play again.
//Call randomPlayer function to select a random player.
function playAgain() {
	board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	cpuChoice = null;
	winCondition = false;
	var changeTitleBar = document.getElementById("titleBar");
		changeTitleBar.innerHTML = "Tic Tac Toe";
	for (x = 0; x < board.length; x++) {
		var squareToChange = document.getElementById(x);
		squareToChange.innerHTML = "";
	}
	randomPlayer();
}

//Select a randomPlayer to start the game.  If the random number is even, the 
//CPU goes first, otherwise the player will start the game. 
function randomPlayer() {
	var x = Math.floor(Math.random() * 10)
	if (x % 2 == 0) {
		setTimeout("cpuTurn()", 500);
	}
	else {
		return;
	}
};
