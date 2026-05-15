function GameBoard() {
  const rows=3;
  const columns=3;
  const board=[];

  //create gameBoard
  for (let i=0;i<rows;i++) {
    board[i] = [];
    for (let j=0;j<columns;j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

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
  let value = 0;

  const addMark = (player) => {
    value = player;
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

    //handles win condition logic and message

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

