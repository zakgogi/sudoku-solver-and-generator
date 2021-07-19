// import { solve } from "./solver.mjs";

function generateInitialDoku(){
    let emptydoku = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
    ];
    let finalBoard = emptydoku;
    let rowNumList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i=0; i<emptydoku[0].length; i++){
        let randInt = Math.floor(Math.random() * rowNumList.length);
        finalBoard[0][i] = rowNumList[randInt];
        rowNumList = rowNumList.filter(n => (n !== rowNumList[randInt]));
    }
    let colNumList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    colNumList = colNumList.filter(n => (n !== finalBoard[0][0]));
    for (let j=1; j<emptydoku.length; j++){
        let randInt = Math.floor(Math.random() * colNumList.length);
        finalBoard[j][0] = colNumList[randInt];
        colNumList = colNumList.filter(n => (n !== colNumList[randInt]));
    }

    return finalBoard;
}


function deleteUnique(board, x, y){
    let outputBoard = board;
    if (board[x][y] !== 0){
        outputBoard[x][y] = 0;
        return outputBoard;
    } else {
        return false; 
    }
    
    
}

function generateOutputDoku(difficulty){
    let fullBoard = solve(generateInitialDoku());
    let solvedBoard = fullBoard;
    while (!fullBoard){
        fullBoard = solve(generateInitialDoku());
    }
    switch (difficulty){
        case 'Easy':
            for (let i=0; i<38; i++){
                let randInt1 = Math.floor(Math.random() * fullBoard[0].length);
                let randInt2 = Math.floor(Math.random() * fullBoard[0].length);
                let newBoard = deleteUnique(fullBoard, randInt1, randInt2);
                if (newBoard === false){
                    let newRandInt1 = Math.floor(Math.random() * fullBoard[0].length);
                    let newRandInt2 = Math.floor(Math.random() * fullBoard[0].length);
                    newBoard = deleteUnique(fullBoard, newRandInt1, newRandInt2);
                } else {
                    fullBoard = newBoard;
                }
            
            }
            break;
        case 'Medium':
            for (let i=0; i<48; i++){
                let randInt1 = Math.floor(Math.random() * fullBoard[0].length);
                let randInt2 = Math.floor(Math.random() * fullBoard[0].length);
                let newBoard = deleteUnique(fullBoard, randInt1, randInt2);
                if (newBoard === false){
                    let newRandInt1 = Math.floor(Math.random() * fullBoard[0].length);
                    let newRandInt2 = Math.floor(Math.random() * fullBoard[0].length);
                    newBoard = deleteUnique(fullBoard, newRandInt1, newRandInt2);
                } else {
                    fullBoard = newBoard;
                }
            
            }
            break;
        case 'Hard':
            for (let i=0; i<58; i++){
                let randInt1 = Math.floor(Math.random() * fullBoard[0].length);
                let randInt2 = Math.floor(Math.random() * fullBoard[0].length);
                let newBoard = deleteUnique(fullBoard, randInt1, randInt2);
                if (newBoard === false){
                    let newRandInt1 = Math.floor(Math.random() * fullBoard[0].length);
                    let newRandInt2 = Math.floor(Math.random() * fullBoard[0].length);
                    newBoard = deleteUnique(fullBoard, newRandInt1, newRandInt2);
                } else {
                    fullBoard = newBoard;
                }
            
            }
            break;
            
    }

    return [fullBoard, solvedBoard];
}
//console.log(solve(generateInitialDoku()));
// console.log(generateOutputDoku('Easy'));

// export { generateOutputDoku };