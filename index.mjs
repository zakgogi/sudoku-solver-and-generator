// import { generateOutputDoku } from "./boardGenerator.mjs";

const sectionToAppend = document.getElementById('dokuSection');
window.onload = function(){
    newSudoku('Easy'); 
}
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', compareSolution);
const easyBtn = document.getElementById('easyButton');
const mediumBtn = document.getElementById('mediumButton');
const hardBtn = document.getElementById('hardButton');
easyBtn.addEventListener('click', () => {
    newSudoku('Easy');
})
mediumBtn.addEventListener('click', () => {
    newSudoku('Medium');
})
hardBtn.addEventListener('click', () => {
    newSudoku('Hard');
})

function newSudoku(difficulty){
    sectionToAppend.innerHTML = "";
    let originalOutput = generateOutputDoku(difficulty);
    let dokuToTranslate = originalOutput[0];
    for (let i=0; i<dokuToTranslate.length; i++){
        let row = document.createElement('section');
        if (i%3 === 0){
            row.classList.add('boldRow');
        } else if (i%8 === 0){
            row.classList.add('finalRow');
        }
        for (let j=0; j<dokuToTranslate[0].length; j++){            
            if (dokuToTranslate[i][j] === 0){
                let inputField = document.createElement('input');
                inputField.type = "text";
                if (j%3 === 0){
                    inputField.classList.add('boldCol');
                } else if (j%8 === 0){
                    inputField.classList.add('finalCol');
                }
                row.append(inputField);
            } else {
                let inputField = document.createElement('input');
                inputField.type = "text";
                inputField.placeholder = dokuToTranslate[i][j];
                inputField.disabled = true;
                if (j%3 === 0){
                    inputField.classList.add('boldCol');
                } else if (j%8 === 0){
                    inputField.classList.add('finalCol');
                };
                row.append(inputField);
            }
        }
        sectionToAppend.append(row);
    }
    
};


function compareSolution(){
    let inputs = document.querySelectorAll('input');
    let inputArray = Array.from(inputs);
    let initialDoku = inputArray.map(i => i.placeholder ? parseInt(i.placeholder) : 0);
    console.log(initialDoku);
    let wholeSolution = inputArray.map(i =>  i.value ? parseInt(i.value) : parseInt(i.placeholder));
    let compareDoku = [];
    let userSolution = [];
    for (let i=0; i<9; i++){
        let userRow = wholeSolution.slice(i*9,(i+1)*9);
        let toSolve = initialDoku.slice(i*9, (i+1)*9);
        userSolution.push(userRow);
        compareDoku.push(toSolve);
    }
    let solvedDoku = solve(compareDoku);

    let arraysEqual = true;
    for (let i=0; i<9; i++){
        for (let j=0; j<9; j++){
            if (solvedDoku[i][j] !== userSolution[i][j]){
                arraysEqual = false;
            }
        }
        
    }

    if (arraysEqual){
        alert('Correctly Solved');
    } else {
        alert('Solution Incorrect!');
    }
}

