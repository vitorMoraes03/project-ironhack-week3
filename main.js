const apiZooAnimal = 'https://zoo-animal-api.herokuapp.com/animals/rand/';

async function loadAnimals(){
    let arrayPromisses = [];
    let arrayZoo = [];

    for (let i = 0; i < 10; i++) {  
        const res = fetch(apiZooAnimal);
        arrayPromisses.push(res);
    }

    const responses = await Promise.all(arrayPromisses);
    const data = await Promise.all(responses.map(element => element.json()));
    arrayZoo.push(data);
}

loadAnimals();