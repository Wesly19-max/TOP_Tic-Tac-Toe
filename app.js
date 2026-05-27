function GameBoard() {
  const rows=3;
  const columns=3;
  const board=[];

  //create 3x3 gameBoard
  for (let i=0;i<rows;i++) {
    board[i] = [];
    for (let j=0;j<columns;j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  //place the player's mark for his turn
  const writeMark = (row,col,player) => {
    board[row][col].addMark(player);
  }

  const printBoard =() => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
  );

    console.log(boardWithCellValues);
  };

  return {getBoard,writeMark,printBoard};
}

function Cell() {
  let value = '';

  const addMark = (player) => {
    if (value == '') {
      value = player;
    }else {
      console.log("This cell has already been marked by another player.Please choose another cell.");
    }
    
  }

  const getValue = () => value;

  return {addMark,getValue};
}

const GameController = ((
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) => {

  const board = GameBoard();

  const Players = [
    {
      name:playerOneName,
      token:"X"
    },
    {
      name:playerTwoName,
      token:"O"
    }
  ];

  let activePlayer = Players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === Players[0] ? Players[1] :Players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn `);
  };

  const playRound =(row,col) => {
    console.log(
      `Writing ${getActivePlayer().name}'s mark into row ${row}, column ${col}...`
    );

    board.writeMark(row,col,getActivePlayer().token);

    const currentToken = getActivePlayer().token;
    const currentBoard = board.getBoard();
    
    //win condition logic for horizontal axis

    let totalMatches = 1; 

    //  SCAN LEFT

    let leftCol = col - 1; 

    //while we are still on the board 
    while (leftCol >= 0) {
      // and the cell matches the active player's token, not an empty cell
      if (currentBoard[row][leftCol].getValue() === currentToken) {
        totalMatches++;
      } else {
        break; // Stop scanning this direction if a different mark or empty cell is hit
      }
      leftCol--;
    }

    // SCAN RIGHT 

    let rightCol = col + 1;
    //while we are still on the board
    while (rightCol <= 2) {
      // and the cell matches the active player's token, not an empty cell
      if (currentBoard[row][rightCol].getValue() === currentToken) {
        totalMatches++;
      } else {
        break; // Stop scanning this direction if a different mark or empty cell is hit
      }
      rightCol++;
    }

    if (totalMatches<=2) {
      totalMatches = 1;
    };
    //win condition logic for vertical axis

    //SCAN UP
    let upRow = row-1;
      //while we are still on the board
      while (upRow >= 0) {
        //ensure token matches active player
        if (currentBoard[upRow][col].getValue() === currentToken) {
          totalMatches++;
        } else {
          break;
        }
        upRow--; //go up another cell
      }
        
      
    //SCAN DOWN
    let downRow = row+1;
      while (downRow<=2) {
        if(currentBoard[downRow][col].getValue() === currentToken) {
          totalMatches++;
        }else {
          break;
        }
      downRow ++; //go down another cell  
      }

    if (totalMatches<=2) {
      totalMatches = 1;
    };
    //win condition logic for diagonal axis
    //scan lower diagonal
    let lowerRow = row +1;
    let upperRow = row -1;
    let upperCol = col +1;
    let lowerCol = col-1;
    
    while (lowerRow<=2 && lowerCol>=0) {
      if(currentBoard[lowerRow][lowerCol].getValue() === currentToken) {
        totalMatches++;
      }else {
        break;
      }

      lowerRow ++;
      lowerCol --;
    }
    //scan upper diagonal
    while (upperRow>=0 && upperCol<=2) {
      if (currentBoard[upperRow][upperCol].getValue() === currentToken) {
        totalMatches++;
      }else {
        break;
      }

      upperRow--;
      upperCol ++;
    }

    //scan anti-diagonal
    while (upperRow>=0 && lowerCol>=0) {
      if(currentBoard[upperRow][lowerCol].getValue() === currentToken) {
        totalMatches++;
      }else {
        break;
      }

      upperRow --;
      lowerCol --;
    }
    //scan upper diagonal
    while (lowerRow<=2 && upperCol<=2) {
      if (currentBoard[lowerRow][upperCol].getValue() === currentToken) {
        totalMatches++;
      }else {
        break;
      }

      lowerRow++;
      upperCol ++;
    }

    //  EVALUATE WIN CONDITION 
    if (totalMatches === 3) {
      console.log(`${getActivePlayer().name} wins!`);
      board.printBoard();
      return;
    }
    switchPlayerTurn();
    printNewRound();
  };

  //initial game message
  printNewRound();

  
  return {
    playRound,
    getActivePlayer,
  };
})();