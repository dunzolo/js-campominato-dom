// inizio funzioni

//creo il tag div con relativa classe
function generateSquare(num){
    const element = document.createElement('div');

    element.classList.add('square');

    element.innerText = num;

    return element;
}

//fine funzioni

let grid = document.getElementById('grid');

let button = document.getElementById('play');

let difficulty = document.getElementById('difficulty');

button.addEventListener('click', function(){

    //se è presente la griglia, la cancella
    if(grid){
        grid.innerHTML="";
    }

    if(difficulty[0].selected){
        // creo un ciclo for per aggiungere le caselle all'interno della griglia
        for(let i = 1; i <= 100; i++){
        
            // assegno alla variabile, l'elemento generato dalla funzione
            let square = generateSquare(i);
        
            square.classList.add('square-100');

            square.addEventListener('click',function(){
                this.classList.add('checked');
                
                console.log(`La casella selezionata contiene il numero: ${this.innerText}`);
            });
            
            // aggiungo gli elementi alla griglia in HTML
            grid.appendChild(square);
        }
    }
    else if(difficulty[1].selected){
        // creo un ciclo for per aggiungere le caselle all'interno della griglia
        for(let i = 1; i <= 81; i++){
        
            // assegno alla variabile, l'elemento generato dalla funzione
            let square = generateSquare(i);
        
            square.classList.add('square-81');

            square.addEventListener('click',function(){
                this.classList.add('checked');
                
                console.log(`La casella selezionata contiene il numero: ${this.innerText}`);
            });
            
            // aggiungo gli elementi alla griglia in HTML
            grid.appendChild(square);
        }
    }
    else{
        // creo un ciclo for per aggiungere le caselle all'interno della griglia
        for(let i = 1; i <= 49; i++){
        
            // assegno alla variabile, l'elemento generato dalla funzione
            let square = generateSquare(i);
        
            square.classList.add('square-49');

            square.addEventListener('click',function(){
                this.classList.add('checked');
                
                console.log(`La casella selezionata contiene il numero: ${this.innerText}`);
            });
            
            // aggiungo gli elementi alla griglia in HTML
            grid.appendChild(square);
        }
    }
    
});

