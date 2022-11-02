import { pushToArray } from "./array.js";

const gameHtml = document.querySelector('#game');
let arrayZoo;
let firstPick = [];
let secondPick = [];


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
        // console.log(firstPick);
        // console.log(secondPick);
    }

    comparision(){
        if(!secondPick.length) return
        console.log('oi');
        if(firstPick[0].id === secondPick[0].id){
            console.log('equal');
            this.clearPicks();
        }
        else {
            console.log('diferente');
            setTimeout(() => {
                // let a1 = firstPick[1];
                // let a2 = firstPick[2];

                // console.log(a1);
                // console.log(a2);

               firstPick[1].classList.toggle('rotated');
               secondPick[1].classList.toggle('rotated');
               this.clearPicks();
             }, 1000);
             

    };
        console.log(firstPick);
        console.log(secondPick);
        

    }

    clearPicks(){
        firstPick = [];
        secondPick = [];
    }

   


}

start();