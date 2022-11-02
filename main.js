const apiZooAnimal = 'https://zoo-animal-api.herokuapp.com/animals/rand/';
const containerHtml = document.querySelector('.container');
const gameHtml = document.querySelector('#game');

let firstCard;
let currentCard;
let firstCardHtml;
let currentCardHtml;
let countPlays = 0;
let arrayRender;
let duplicateArray;

async function start(){
    let arr = await loadAnimals();
    duplicateArray = ([...arr, ...arr]);
    let res = shuffle(duplicateArray);
    displayHtml(res);
    // console.log(res);
}

async function loadAnimals(){
    let arrayZoo = [];

    for (let i = 0; i < 9; i++) {  
        const res = await fetch(apiZooAnimal);
        const data = await res.json();
        // Check for repetition
        let state = true;
        if(arrayZoo.length != 0){
            arrayZoo.forEach(element => {
                if(element.name === data.name){
                    i--;
                    state = false;
                }; 
            })
        }
        if(state === true){arrayZoo.push(data)};       
    }   

    return arrayZoo;
}

function shuffle(array) {
    let currentIndex = array.length;
    // console.log(currentIndex);
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function displayHtml(array){
    arrayRender = array.forEach(element => {
        new Card(element);
    });
}

function resetSameCards(){
    arrayRender = [];
    let res = shuffle(duplicateArray);
    displayHtml(res);
}

class Card {
    constructor(element){
        this.element = element;
        this.div = document.createElement('div');
        this.divFront = document.createElement('div');
        this.divBack = document.createElement('div');
        this.img = document.createElement('img');
        this.div.setAttribute('class', 'card');
        this.divFront.setAttribute('class', 'front');
        this.divBack.setAttribute('class', 'back rotated');
        this.img.setAttribute('class', 'img-card');
        this.img.src = element.image_link;
        gameHtml.append(this.div);
        this.div.append(this.divFront);
        this.div.append(this.divBack);
        this.divBack.append(this.img);

        this.div.addEventListener('click', () => {
            if(!this.divBack.classList.contains('rotated')) return;
            if(currentCard) return;
            this.divBack.classList.toggle('rotated');
            

            if(firstCard){
            
            currentCard = this.element;
            currentCardHtml = this.divBack;
            
                if(currentCard.name === firstCard.name){
                    this.resetCard();
              } else {
                   countPlays++;
                   setTimeout(() => {
                   this.toggleCards();
                   this.resetCard();
                }, 1000);
              } 
            }
            else{
                firstCard = this.element;
                firstCardHtml = this.divBack;
            }  

            console.log(countPlays);

            if(countPlays > 3) {
                // window.location.reload();
                this.resetCard();
                resetSameCards();
                
                
            }; 
        })

    }

    toggleCards(){
        if(!firstCardHtml & !currentCardHtml) return;
        firstCardHtml.classList.toggle('rotated');
        currentCardHtml.classList.toggle('rotated');
        
    }

    resetCard(){
        firstCard = undefined;
        currentCard = undefined;
        firstCardHtml = undefined;
        currentCardHtml = undefined;
    }




}

start();
