const GameBoard = () => {
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
    const boardWithCellValues = board.map((row) => {
      row.map((cell) => cell.getValue());
    })
  }

  return {getBoard,writeMark,printBoard};
}

function Cell() {
  let value = 0;

  const addMark = (player) => {
    value = player
  }

  const getValue = () => value;

  return {addMark,getValue};
}
