var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var playerMarker = "X";
var cpuMarker = "O";
var CORNERSQUARES = [0, 2, 6, 8];
var SIDESQUARES = [1, 3, 5, 7];
var cpuChoice = null;
var yourScore = 0;
var cpuScore = 0;
var winCondition = false;
var cpuStreak = 0;

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
	squareToChange.innerHTML = cpuMarker;
	board[cpuChoice] = cpuMarker;
	checkIfWin(cpuMarker, board);
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

function checkIfCpuCanWin(isAvailable, copyOfBoard, blankCpuChoice) {		
	for (i = 0; i < isAvailable.length; i++) {
		copyOfBoard[isAvailable[i]] = cpuMarker;
		checkIfWin(cpuMarker, copyOfBoard);
		if (winCondition == true) {
			cpuChoice = isAvailable[i];
			winCondition = false;
			return;
		}
		copyOfBoard = board.slice();	
	}
}

function checkIfPlayerCanWin(isAvailable, copyOfBoard, blankCpuChoice) {
	for (i = 0; i < isAvailable.length; i++) {
		copyOfBoard[isAvailable[i]] = playerMarker;
		checkIfWin(playerMarker, copyOfBoard);
		if (winCondition == true) {
			cpuChoice = isAvailable[i];
			winCondition = false;
			return;
		}
			copyOfBoard = board.slice();
	}
}

function checkCorners(isAvailable, openCorners, blankCpuChoice) {		
	for (i = 0; i < isAvailable.length; i++) {
		for (n = 0; n < CORNERSQUARES.length; n++) {
			if (isAvailable[i] == CORNERSQUARES[n]) {
				openCorners.push(isAvailable[i]);
			}
		}
	}						
	if (openCorners.length > 0) {
		cpuChoice = openCorners[Math.floor(Math.random() * openCorners.length)];
		return;
	}
}

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
	cpuChoice = openSides[Math.floor(Math.random() * openSides.length)];
	return;
	}
}		

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

function playerTurn(choice) {	
	var squareToChange = document.getElementById(choice);
	squareToChange.innerHTML = playerMarker;
	board[choice] = playerMarker;
	checkIfWin(playerMarker, board);
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

function randomPlayer() {
	var x = Math.floor(Math.random() * 10)
	if (x % 2 == 0) {
		setTimeout("cpuTurn()", 500);
	}
	else {
		return;
	}
};
