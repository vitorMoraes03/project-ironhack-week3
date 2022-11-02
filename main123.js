import { start } from "./mainHTML.js";

const cardDivs = document.querySelectorAll('.card');
const frontCards = document.querySelectorAll('.front');
const backCards = document.querySelectorAll('.back');
const imgCards = document.querySelectorAll('.img-card');
// const container = document.querySelector('.container');

const myPromise = new Promise((resolve, reject) => {
   start();
   if(cardDivs != null){
    resolve('working');
   } else {
    reject('not working')
   }
  });



myPromise.then((message) => console.log(message));





// setTimeout(() => {
    
//     console.log(cardDiv);
// }, 5000)






