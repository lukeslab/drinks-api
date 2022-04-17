//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
function displayDrinkInfo(counter, arr = drinksArray){
  drinksArray = arr;
  drinkName.innerText = arr[counter].strDrink;
  drinkImage.src = arr[counter].strDrinkThumb;
  instructions.innerText = arr[counter].strInstructions;

  ingredients.innerHTML = '';
  for (let i=1; i <= 15; i++){
    console.log(i);
    if (arr[counter]['strIngredient'+i] !== null) {
      ingredients.innerHTML += `<li> ${arr[counter]['strIngredient'+i]}, ${arr[counter]['strMeasure'+i] === null ? '':arr[counter]['strMeasure'+i]} </li>`
    }
  }
}

let drinkCounter = 5;
let drinksArray = [];
let drinkName = document.querySelector('h2')
let drinkImage = document.querySelector('img')
let instructions = document.querySelector("h3")
let ingredients = document.querySelector(".ingredients")

let usersFirstClick = true;
document.querySelector('button').addEventListener('click', e => {

  if (usersFirstClick) {
    document.querySelectorAll('.hidden').forEach(e=> e.classList.toggle('hidden'))
    usersFirstClick = false;
  }

  let input = document.querySelector('input').value
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.drinks)
      drinksArray = data.drinks;
      displayDrinkInfo(drinkCounter)
    })
    .catch(err => `Error ${err}`)
})

document.querySelector('.previous-drink').addEventListener('click', e=>{
  if (drinkCounter !== 0) {
    displayDrinkInfo(--drinkCounter)
  }
})

document.querySelector('.next-drink').addEventListener('click', e=> {
  if (drinkCounter !== drinksArray.length-1){
    displayDrinkInfo(++drinkCounter);
  }
})

// for homework, does it work with spaces? use %20
// push homework: this always does the first drink, can we get a random drink? or select drink from the list of returned drinks? make it cycle through the drinks / carousel
