import { pushToArray } from "./array.js";
import { shuffle } from "./array.js";

const gameHtml = document.querySelector('#game');
let arrayZoo;
let firstPick = [];
let secondPick = [];
let count = 0;
let countForWin = 0;
let pauseState = true;

export async function start(){
    await createArray();
    displayHtml(arrayZoo);
}

async function createArray(){
    let res = await pushToArray();
    arrayZoo = res;
    console.log(arrayZoo);
}

function displayHtml(array){
    array.forEach(element => new Card(element));
}

function clearArray(){
    arrayZoo.length = 0;
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
        this.divBack.setAttribute('id', `${element.id}`);
        this.img.setAttribute('class', 'img-card');
        this.img.src = element.image_link;
        gameHtml.append(this.div);
        this.div.append(this.divFront);
        this.div.append(this.divBack);
        this.divBack.append(this.img);  

        this.div.addEventListener('click', () => {
            if(pauseState === false) return;
            if(this.divBack.classList.contains('clicked')){
                console.log('iu');
                return
            };
            this.divBack.classList.add('clicked');
            this.rotateCard();
            this.checkPicks();
            this.comparision();
        })
}

    rotateCard(){
        if(!this.divBack.classList.contains('rotated')) return;
        this.divBack.classList.toggle('rotated');
    }

    checkPicks(){
        if(!firstPick.length){
            firstPick.push(this.element);
            firstPick.push(this.divBack);
        }
        else {
            secondPick.push(this.element);
            secondPick.push(this.divBack);
        }
    }

    comparision(){
    
        if(!secondPick.length) return
        if(firstPick[0].id === secondPick[0].id){
            pauseState = false;
            countForWin++;
            setTimeout(() => {
                this.checkForWin();
                this.clearPicks();
            }, 500);
        }
        else {
            pauseState = false;
            count++;
            setTimeout(() => {
               firstPick[1].classList.toggle('rotated');
               secondPick[1].classList.toggle('rotated');
               this.checkGameOver();
               this.clearPicks();
             }, 1000);
        }
    }

    clearPicks(){
        firstPick[1].classList.remove('clicked');
        secondPick[1].classList.remove('clicked');
        firstPick = [];
        secondPick = [];
        pauseState = true;
    }
    
    checkGameOver(){
        if(count > 12){
            alert('game over');
            this.restartSameGame();
        }
    } 

    checkForWin(){
      if(countForWin === 3){
            countForWin = 0;
            alert('game win');
            this.restartNewGame();
      }
    }

    restartSameGame(){
        gameHtml.replaceChildren('');
        let arrSame = shuffle(arrayZoo);
        setInterval(() => {
            displayHtml(arrSame);
        }, 3000);
        count = 0;
        countForWin = 0;
    }

    restartNewGame(){
        clearArray();
        gameHtml.replaceChildren('');
        start();
        count = 0;
    }
}

start();
