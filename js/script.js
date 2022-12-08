// inizio funzioni

//creo una nuova partita
function createNewGame(){
    let cellsNumber;
    let cellsRow;

    if(difficulty.value == 'Facile'){
        cellsNumber = 100;
        cellsRow = 10;
    }
    else if(difficulty.value == 'Media'){
        cellsNumber = 81;
        cellsRow = 9;
    }
    else{
        cellsNumber = 49;
        cellsRow = 7;
    }

    generateGrid(cellsNumber, cellsRow);
}

//creo la griglia dinamica
function generateGrid(cellsNumber, cellsRow){

    //se è già presente un contenitore, lo cancello
    container.innerHTML = "";

    const grid = document.createElement('div');

    grid.classList.add('grid');

    for(let i = 1; i <= cellsNumber; i++){
        const square = generateSquare(i, cellsRow);

        //aggiungo alla griglia il singolo quadrato generato
        grid.appendChild(square);

        square.addEventListener('click', function(){
            this.classList.add('checked');
        })
    }

    //aggiungo al container la griglia generata
    container.appendChild(grid);

}

//creo il singolo quadrato
function generateSquare(num, cellsRow){
    const element = document.createElement('div');

    element.classList.add('square');

    //calcolo dinamico in base al numero di celle
    let square_length = `calc(100% / ${cellsRow})`;

    //assegno al singolo quadrato una dimensione in base al numero di celle per riga
    element.style.width = square_length;
    element.style.height = square_length;

    element.innerText = num;

    return element;
}

//fine funzioni

let container = document.querySelector('.container');

let button = document.getElementById('play');

let difficulty = document.getElementById('difficulty');

button.addEventListener('click', function(){

    createNewGame();
    
});

