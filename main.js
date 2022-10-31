const apiZooAnimal = 'https://zoo-animal-api.herokuapp.com/animals/rand/';

async function loadAnimals(){
    let arrayZoo = [];

    for (let i = 0; i < 50; i++) {  
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

console.log(arrayZoo);
        
}


loadAnimals();