const apiSpotify = 'https://api.spotify.com/v1'; //fail
const apiPokemon = 'https://pokeapi.co/api/v2/pokemon/1'; //fail
const apiAnimals = 'https://zoo-animal-api.herokuapp.com/animals/rand/';

const divTest = document.querySelector('.test');

const load = async (url) => {
    const res = await fetch(url);
    const real = await res.json();
    return real;  
}

const loadImage = async function(){
    const img = load(apiAnimals);
    const newImg = document.createElement('img');
    let source = await img;
    let aloalo = source.image_link;
    newImg.src = aloalo;
    divTest.appendChild(newImg);
}

loadImage();