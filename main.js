const apiZooAnimal = 'https://zoo-animal-api.herokuapp.com/animals/rand/';


async function loadAnimals(){
    let arrayZoo = [];

    for (let i = 0; i < 10; i++) {  
        const res = await fetch(apiZooAnimal);
        const data = await res.json();
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
    console.log(currentIndex);
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

async function start(){
    let arr = await loadAnimals();
    const duplicateArray = ([...arr, ...arr]);
    let res= shuffle(duplicateArray);
    console.log(res);
}

start();