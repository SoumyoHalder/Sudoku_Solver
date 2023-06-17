var arr = [[]];
var sudokuCopy = [[]];
var solvedBoard = [[]];

function initializeGrid() {
  arr = [];
  sudokuCopy = [];
  for (var i = 0; i < 9; i++) {
    var row = [];
    var copyRow = [];
    for (var j = 0; j < 9; j++) {
      row.push(document.getElementById(i * 9 + j));
      copyRow.push(0);
    }
    arr.push(row);
    sudokuCopy.push(copyRow);
  }
}

function fillBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] !== 0) {
        arr[i][j].innerText = board[i][j];
      } else {
        arr[i][j].innerText = '';
      }
    }
  }
}

function isValid(board, num, r, c) {
  for (let col = 0; col < 9; col++) {
    if (board[r][col] == num) {
      return false;
    }
  }

  for (let row = 0; row < 9; row++) {
    if (board[row][c] == num) {
      return false;
    }
  }

  let box_start_r = Math.floor(r / 3) * 3;
  let box_start_c = Math.floor(c / 3) * 3;

  for (let row = box_start_r; row < box_start_r + 3; row++) {
    for (let col = box_start_c; col < box_start_c + 3; col++) {
      if (board[row][col] == num) {
        return false;
      }
    }
  }

  return true;
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] == 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, num, row, col)) {
            board[row][col] = num;

            if (solve(board)) {
              return true;
            } else {
              board[row][col] = 0;
            }
          }
        }
        return false;
      }
    }
  }
  return true;
}


  //GetPuzzle button
  document.getElementById('GetPuzzle').addEventListener('click', function () {
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.onload = function () {
      var response = JSON.parse(xhrRequest.response);
      console.log(response);
      var board = response.board;
      fillBoard(board);
      // making a copy of the board
      sudokuCopy = JSON.parse(JSON.stringify(board));
    };
    xhrRequest.open(
      'GET',
      'https://sugoku.onrender.com/board?difficulty=easy' //api to fetch the board from, lvl easy
    );
    xhrRequest.send();
  });
  
  // initialize the grid after fetching the puzzle
  initializeGrid();
  
  
  //user inputs
  const boxes = document.querySelectorAll('.sudoku_grid div');
  
  boxes.forEach((box, index) => {
    const rowIndex = Math.floor(index / 9);
    const colIndex = index % 9;
  
    box.addEventListener('click', () => {
      //return if the box originally had non-zero element
      if (sudokuCopy[rowIndex][colIndex] !== 0) {
        return; 
      }
  
      const input = document.createElement('input');
      input.type = 'text';
      input.min = '1';
      input.max = '9';
      input.style.width = '35px';
      input.style.height = '35px';
      input.style.fontSize = '24px';
      input.style.textAlign = 'center';
      input.style.border = 'none';
      input.style.borderRadius = '4px';
      input.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.3)';
      input.style.margin = '0';
      input.style.padding = '0';
      input.style.outline = 'none';
  
      const previousNumber = arr[rowIndex][colIndex].innerText;
      input.value = previousNumber || '';
  
      box.innerHTML = '';
      box.appendChild(input);
  
      input.focus();
  
      input.addEventListener('blur', () => {
        const number = input.value.trim();
        if (number && /^[1-9]$/.test(number)) { //check if the user input is valid 
          box.textContent = number;
        } else {
          box.textContent = previousNumber || '';
        }
  
        if (isBoardFilled()) {
          if (isBoardCorrect()) {
            displayResult('Great!', 'green');
          } else {
            displayResult('Wrong!', 'red');
          }
        }
      });
    });
  });
  
  // Reset button to restore the original puzzle
  document.getElementById('ResetPuzzle').addEventListener('click', function () {
    var originalBoard = JSON.parse(JSON.stringify(sudokuCopy));
    fillBoard(originalBoard);
  });
  
  // SolvePuzzle button
  document.getElementById('SolvePuzzle').addEventListener('click', function () {
    var board = JSON.parse(JSON.stringify(sudokuCopy)); // Create a copy of the stored puzzle
  
    if (solve(board)) {  //call the solve board funtion
      fillBoard(board);
    } else {
      console.log('No solution exists!');
    }
  });

