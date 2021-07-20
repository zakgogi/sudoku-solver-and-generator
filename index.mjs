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
    let submitSection = document.getElementById('submitSection');
    submitSection.style.display = "block";
    let solutionSection = document.getElementById('solutionSection');
    solutionSection.innerHTML = "";
})
mediumBtn.addEventListener('click', () => {
    newSudoku('Medium');
    let submitSection = document.getElementById('submitSection');
    submitSection.style.display = "block";
    let solutionSection = document.getElementById('solutionSection');
    solutionSection.innerHTML = "";
})
hardBtn.addEventListener('click', () => {
    newSudoku('Hard');
    let submitSection = document.getElementById('submitSection');
    submitSection.style.display = "block";
    let solutionSection = document.getElementById('solutionSection');
    solutionSection.innerHTML = "";
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
                inputField.id = `${i}${j}`;
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
    let incorrectInputs = [];
    for (let i=0; i<9; i++){
        for (let j=0; j<9; j++){
            if (solvedDoku[i][j] !== userSolution[i][j]){
                incorrectInputs.push([i,j]);
                arraysEqual = false;
            }
        }
        
    }

    if (arraysEqual){
        // alert('Correctly Solved');
        appendCorrect()
    } else {
        // alert('Solution Incorrect!');
        appendIncorrect(incorrectInputs);
    }
}

function appendCorrect(){
    let appendHere = document.getElementById('solutionSection');
    appendHere.innerHTML = "";
    let congratsPara = document.createElement('p');
    let toHide = document.getElementById('submitSection');
    toHide.style.display = "none";
    congratsPara.textContent = 'Congratulations! Your solution was correct!'
    appendHere.append(congratsPara);
    let userInputsNodeList = document.querySelectorAll('input[id]:not([id=""]');
    let inputsArray = Array.from(userInputsNodeList);
    for (let i=0; i<inputsArray.length; i++){
        inputsArray[i].classList.add('correct');
    }
}

function appendIncorrect(incorrectArray){
    let appendHere = document.getElementById('solutionSection');
    appendHere.innerHTML = "";
    let failPara = document.createElement('p');
    let checkWrongButton = document.createElement('button');
    checkWrongButton.textContent = 'Where did I go wrong?';
    checkWrongButton.id = "wrongBtn";
    checkWrongButton.addEventListener('click', () => {
        revealIncorrectInput(incorrectArray);
    });
    failPara.textContent = 'Unfortunately your solution was incorrect, click the button below to see where you went wrong or try again.'
    let lineBreak = document.createElement('br');
    appendHere.append(failPara);
    appendHere.append(lineBreak);
    appendHere.append(checkWrongButton);
}

function revealIncorrectInput(incorrectArray){
    for (let i=0; i<incorrectArray.length; i++){
        let incorrectInputBox = document.getElementById(`${incorrectArray[i][0]}${incorrectArray[i][1]}`);
        incorrectInputBox.classList.add('incorrect');
    };
    let wrongButton = document.getElementById("wrongBtn");
    wrongButton.textContent = 'Hide where I went wrong';
    wrongButton.removeEventListener('click', revealIncorrectInput);
    wrongButton.addEventListener('click', () => {
        hideIncorrectInput(incorrectArray)
    });
}

function hideIncorrectInput(incorrectArray){
    for (let i=0; i<incorrectArray.length; i++){
        let incorrectInputBox = document.getElementById(`${incorrectArray[i][0]}${incorrectArray[i][1]}`);
        incorrectInputBox.classList.remove('incorrect');
    };
    let wrongButton = document.getElementById("wrongBtn");
    wrongButton.textContent = 'Show where I went wrong';
    wrongButton.removeEventListener('click', hideIncorrectInput);
    wrongButton.addEventListener('click', () => {
        revealIncorrectInput(incorrectArray)
    });
}
