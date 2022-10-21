const container = document.querySelector ('.container');
let elementsPerRow;
let arrayNumber = [];
let bombs = [];

const btn = document.getElementById('play');
btn.addEventListener('click', function(){
    const difficultyChosen = document.getElementById('selectDifficulty').value;
    elementsPerRow = difficulty(difficultyChosen);
    console.log("----------");
    document.getElementById('play')
    container.innerHTML = '';
    init(elementsPerRow);
    createBomb();
    arrayNumber = [];
});

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
    console.log(arrayNumber);
}

function createSquare(maxSquares){
    const square = document.createElement('div');
    square.className = 'square';
    square.innerHTML = maxSquares + 1;
    square.idElement = maxSquares + 1;
    square.style.width = generateCalcCss();
    square.style.height = generateCalcCss();
    square.addEventListener('click', clickSquare)
    container.append(square);
}

function generateCalcCss(){
    return `calc(100% / ${elementsPerRow}`;
}

function clickSquare(){
    console.log(this.idElement);
    this.innerHTML = this.idElement;
    this.classList.add('square-colored');

    if (bombs.includes(this.idElement)){
        console.log("GAME OVER");
        this.classList.add('bomb');
    }
}

function createBomb(){
        // Shuffle arrayNumber
        const shuffled = arrayNumber.sort(() => 0.5 - Math.random());
        // Get sub-arrayNumber of first n elements after shuffled
        bombs = shuffled.slice(0, 16);
        console.log("BOMBE",bombs);
}