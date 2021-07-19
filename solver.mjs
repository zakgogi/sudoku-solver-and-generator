//example sudoku
let example_board = [
    [0,0,0,8,3,0,5,0,4],
    [0,6,0,0,0,0,0,0,3],
    [5,0,0,1,0,9,7,0,0],
    [0,4,0,0,0,0,0,8,1],
    [6,1,5,3,7,0,0,9,2],
    [8,0,3,2,4,1,0,7,5],
    [0,7,6,4,0,3,0,0,0],
    [0,0,0,0,9,0,1,0,0],
    [3,0,9,0,0,0,0,0,7]
]

function solve(board){
    let boardAttempt = board;
    let find = findEmpty(boardAttempt)
    if (!find){
        return true;
    }
    for (let i=1; i<10; i++){
        if (validBoard(boardAttempt, i, find)){
            
            boardAttempt[find[0]][find[1]] = i;

            if (solve(boardAttempt)){
                return boardAttempt;
            }

            boardAttempt[find[0]][find[1]] = 0;
        }
    }
    return false;
    
}


function findEmpty(board){
    for (let row=0; row<board.length; row++){
        for (let col=0; col<board[0].length; col++){
            if (board[row][col] == 0){
                return [row, col];
            }
        }
    }
    return false; 
}

function validBoard(board, num, pos){
    
    //Check row
    for (let colIndex=0; colIndex<board[0].length; colIndex++){
        if (board[pos[0]][colIndex] === num && colIndex !== pos[1]){
            return false;
        }
    }

    //Check col
    for (let rowIndex=0; rowIndex<board.length; rowIndex++){
        if (board[rowIndex][pos[1]] === num && rowIndex !== pos[0]){
            return false;
        }
    }

    //Check box
    //Determine which box we are in
    let box_x = Math.floor(pos[1] / 3);
    let box_y = Math.floor(pos[0] / 3);

    for (let i=box_x*3; i<box_x*3 + 3; i++){
        for (let j=box_y*3; j<box_y*3 + 3; j++){
            if (board[j][i] === num && [i,j] !== pos){
                return false;
            }
        }
    }   

    return true;
    
}

// export { solve };