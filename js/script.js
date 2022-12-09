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

                this.innerHTML = '<img src="./img/bomb-png-transparent-background-19.png"></img>';

                //blocco eventi per altre celle nella griglie
                grid.classList.add('event-none');

                const box = createAlertMessage(count, square_save);

                box_message.appendChild(box);

                box.addEventListener('click', function(){
                    box_message.style.display = 'none';
                    revealBombs(totalBombs);
                })
            }
            
            count++;
            
            if(count == square_save){
                const box = createAlertMessage(count, square_save);

                box_message.appendChild(box);

                box.addEventListener('click', function(){
                    box_message.style.display = 'none';
                })

                grid.classList.add('event-none');
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

function createAlertMessage(count, square_save){
    let box_message = document.getElementById('punteggio');

    box_message.style.display = 'block';
    
    const box = document.createElement('span');
    
    box.classList.add('btn-close');
    
    box.innerText = 'X';

    if(count < square_save){
        box_message.innerHTML = `Hai perso! Hai totalizzato ${count} punti`;
    }
    else{
        box_message.innerHTML = `Hai vinto! Hai totalizzato ${count} punti`;
        box_message.style.backgroundColor = 'green';
    }

    return box;
}

//rivelo tutte le celle bomba
function revealBombs(totalBombs){
    for(let i = 0; i < totalBombs.length; i++){
        totalBombs[i].classList.add('checked-bomb');
        totalBombs[i].innerHTML = '<img src="./img/bomb-png-transparent-background-19.png"></img>';
    }
}

//fine funzioni

let container = document.querySelector('.container');

let button = document.getElementById('play');

let difficulty = document.getElementById('difficulty');

let box_message = document.getElementById('box-message');

button.addEventListener('click', function(){

    createNewGame();
    
});