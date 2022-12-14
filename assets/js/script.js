const container = document.querySelector ('.container');
const scrittaOutput = document.getElementById('output');

let elementsPerRow;
let arrayNumber = [];
let bombs = [];
let counterClick = 0;
let win;

const btn = document.getElementById('play');
btn.addEventListener('click', function(){
    const difficultyChosen = document.getElementById('selectDifficulty').value;
    elementsPerRow = difficulty(difficultyChosen);
    reset();
    init(elementsPerRow);
    createBomb();
});

function reset(){
    container.innerHTML = '';
    container.classList.remove('untouchable');
    output.innerHTML = '';
    counterClick = '';
    arrayNumber = [];
}

function difficulty(difficultyChosen){
    if (difficultyChosen === "easy") {
        return 10;
    }
    else if (difficultyChosen === "medium") {
        return 9;
    }
    else {
        return 7;
    }
}

function init(numElements){
    const totalSqares = Math.pow(numElements, 2);

    for (let i = 0; i < totalSqares; i++){
        createSquare(i);
        arrayNumber.push(i + 1);
    }
}

function createSquare(maxSquares){
    square = document.createElement('div');
    square.className = 'square';
    square.innerHTML = maxSquares + 1;
    square.idElement = maxSquares + 1;
    square.style.width = generateCalcCss();
    square.style.height = generateCalcCss();
    square.addEventListener('click', clickSquare, {once:true})
    container.append(square);
}

function generateCalcCss(){
    return `calc(100% / ${elementsPerRow}`;
}

function clickSquare(){
    console.log(this.idElement);
    this.innerHTML = this.idElement;
    this.classList.add('square-colored');
    counterClick++;

    if (counterClick === win){
        scrittaOutput.innerHTML = `HAI VINTO`;
    }
    if (bombs.includes(this.idElement)){
        console.log("BOMBA");
        this.classList.add('bomb');
        gameover();
    }
}

function createBomb(){
        // Shuffle arrayNumber
        const shuffled = arrayNumber.sort(() => 0.5 - Math.random());
        // Get sub-arrayNumber of first n elements after shuffled
        bombs = shuffled.slice(0, 16);
        console.log("BOMBE ->",bombs);

        win = arrayNumber.length - bombs.length;
}

function gameover(){
    scrittaOutput.innerHTML = `HAI PERSO<br>Hai cliccato in totale "${counterClick - 1}" celle che non erano bombe`;
    showAllBombs();
    container.classList.add('untouchable');
}

function showAllBombs(){
    const square = document.getElementsByClassName('square');
    for(let i = 0; i < square.length; i++){
        const checkBomb = square[i];
        if(bombs.includes(parseInt(checkBomb.innerText))){
            square[i].classList.add('bomb');
        }
    }
}