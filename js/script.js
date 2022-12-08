// inizio funzioni

//creo una nuova partita
function createNewGame(){
    let cellsNumber;
    let cellsRow;

    let arrayBombs = [];

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

    arrayBombs = createBombsArray(1, cellsNumber);
    console.log(arrayBombs.sort(function(a, b){return a-b}));

    generateGrid(arrayBombs, cellsNumber, cellsRow);
}

//creo la griglia dinamica
function generateGrid(arrayBombs, cellsNumber, cellsRow){

    //se è già presente un contenitore, lo cancello
    container.innerHTML = "";

    const grid = document.createElement('div');

    grid.classList.add('grid');

    let count = 0;

    let square_save = cellsNumber - arrayBombs.length;
    
    //creo array delle celle dove è presente la bomba
    const totalBombs = document.getElementsByName('bomb');
    
    for(let i = 1; i <= cellsNumber; i++){
        const square = generateSquare(i, cellsRow, arrayBombs);

        //aggiungo alla griglia il singolo quadrato generato
        grid.appendChild(square);

        square.addEventListener('click', function(){
            //al quadrato cliccato aggiungo la classe
            this.classList.add('checked');

            //controllo se il numero della cella è presente nell'array delle bombe
            if(arrayBombs.includes(parseInt(this.innerText))){
                this.classList.add('checked-bomb');

                //blocco eventi per altre celle nella griglie
                grid.classList.add('event-none');
                
                alert(`Hai perso! Hai totalizzato ${count} punti!`);

                revealBombs(totalBombs);
            }
            
            count++;
            
            if(count == square_save){
                grid.classList.add('event-none');
                alert('Hai vinto!');
            }
        })

        
    }


    //aggiungo al container la griglia generata
    container.appendChild(grid);

}

//creo array di numeri casuali
function createBombsArray(min, max){
    let i = 0;
    let arrayBombs = [];

    while(i < 16){
        let number = Math.floor(Math.random() * (max - min + 1) + min);

        // aggiungo numeri univoci
        if(!(arrayBombs.includes(number))){
            arrayBombs.push(number);
            i++;
        }
    }

    return arrayBombs;
}

//creo il singolo quadrato
function generateSquare(num, cellsRow, arrayBombs){
    const element = document.createElement('div');

    element.classList.add('square');

    //calcolo dinamico in base al numero di celle
    let square_length = `calc(100% / ${cellsRow})`;

    //assegno al singolo quadrato una dimensione in base al numero di celle per riga
    element.style.width = square_length;
    element.style.height = square_length;

    element.innerText = num;

    //assegno alla cella il nome mine se il numero è presente nell'array delle bombe
    for(let i = 0; i < arrayBombs.length; i++){
        if(element.innerText == arrayBombs[i]){
            element.setAttribute('name', 'bomb');
        }
    }

    return element;
}

//rivelo tutte le celle bomba
function revealBombs(totalBombs){
    for(let i = 0; i < totalBombs.length; i++){
        totalBombs[i].classList.add('checked-bomb');
    }
}

//fine funzioni

let container = document.querySelector('.container');

let button = document.getElementById('play');

let difficulty = document.getElementById('difficulty');

button.addEventListener('click', function(){

    createNewGame();
    
});

