
const apiZooAnimal = 'https://zoo-animal-api.herokuapp.com/animals/rand/';
// const containerHtml = document.querySelector('.container');

async function loadAnimalsApi(){
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

    let duplicateArray = ([...arrayZoo, ...arrayZoo]);
    return duplicateArray;
}

export async function pushToArray(){
    let fullArray = await loadAnimalsApi();
    let arrayAnimals = shuffle(fullArray);
    return arrayAnimals;
}

export function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}






