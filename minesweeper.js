document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {};
board.cells = []
// function to add cells to board
function addCells (num) {
  if(isSquare(num)) {
    for(i = 0; i < num; i++) {
      board.cells[i] = {row: 0, col: 0}
    }
  } else {console.log("number of cells must be square!")}
}
// call addCells with desired number of cells
var numCells = 36;
addCells(numCells);

// get number of cells
var len = board.cells.length

// function to assign row values based on the number of cells
function addRowValues () {
  //loop through cells. Use Math.sqrt to assign the correct row number
  board.cells.forEach(cell => {
    if(board.cells.indexOf(cell) < Math.sqrt(len)) {
      cell.row = 0
    } else if(board.cells.indexOf(cell) < Math.sqrt(len) * 2) {
      cell.row = 1
    } else if(board.cells.indexOf(cell) < Math.sqrt(len) * 3) {
      cell.row = 2
    } else if(board.cells.indexOf(cell) < Math.sqrt(len) * 4) {
      cell.row = 3
    } else if(board.cells.indexOf(cell) < Math.sqrt(len) * 5) {
      cell.row = 4
    } else if(board.cells.indexOf(cell) < Math.sqrt(len) * 6) {
      cell.row = 5
    }
  })
}
//call addRowValues
addRowValues()

// function for asigning col values 
function addColValues () {
  // modulo of dividing cell index number by sqrt of number of cells. Assign result as col value.
  board.cells.forEach(cell => {
    cell.col = board.cells.indexOf(cell) % Math.sqrt(len)
  })
}
//call adColValues
addColValues()

//add isMine property to all cells
function addIsMineProperty() {
  board.cells.forEach(cell => {
    cell.isMine = false
  })
}
//call addIsMineProperty
addIsMineProperty()

//console.log(board.cells)

//set number of mines
var numMines = 5;

//set array to add cell index's to
var mineArray = []


function buildMineArray () {
    // add as many cell index's to mineArray as numMines is set to
    mineArray = []
    for(i=0; i < numMines; i++){
      var cellIndex = Math.ceil(Math.random() * numCells) - 1
      console.log("cellIndex: " + cellIndex)
      mineArray.push(cellIndex)
    }
}


function addMines() {
  buildMineArray()
  console.log("mineArray: " + mineArray)
  // check for duplicates in mineArray. If duplicates exist call addMines to get a new array.
  let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
  duplicateArray = []
  duplicateArray = findDuplicates(mineArray)
  console.log('duplicateArray Length: ' + duplicateArray.length)
  if(duplicateArray.length > 0) {
    buildMineArray()
    addMines()
  } else{
      for(i=0;i<mineArray.length;i++) {
        var index = mineArray[i] 
        console.log("index: " + index)
        board['cells'][index].isMine = true
      }
  }   
}

//Call addMines
addMines()

//hidden and isMarked properties added to cells
board.cells.forEach(cell => cell.hidden = true)
board.cells.forEach(cell => cell.isMarked = false)

function startGame () {
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (let i = 0; i < board['cells'].length; i++) {
    if(board.cells[i].isMine && !board.cells[i].isMarked) {
      return;
    }
    if(board.cells[i].hidden && !board.cells[i].isMine){
      return;
    }
  }
    // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!)
  lib.displayMessage('You win!');
}
 

// call checkForWin()
checkForWin()

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
   
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines (cell) {
  var mineCount = 0
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  surrounding.forEach(cell => {
    if(cell.isMine) {
      mineCount += 1
    }
  })
  return mineCount
}

board.cells.forEach(cell => {
  cell.surroundingMines = countSurroundingMines({row: cell.row, col: cell.col})
})
