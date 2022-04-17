
let drinksArray = [];
let instructionsHtmlElement = document.querySelector("h3");
let ingredientsHtmlElement = document.querySelector(".ingredients");

document.querySelector('button').addEventListener('click', e=> {
  let input = document.querySelector('input').value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
    .then(res=> res.json())
    .then(data => {
      drinksArray = data.drinks;
      displayAllDrinksInDrinksArray();
      addEventListnersToEachImageElement();
    })
    .catch(err => console.log(err));
})

function addEventListnersToEachImageElement(){
  document.querySelectorAll("img").forEach(elem => {
    elem.addEventListener('click', e=> {
      // toggle hidden elements on first click only
      toggleHiddenElements()
      // fill the innerText of the instructions sectionw with that grinks instructions.
      fillInnerTextOfInstructionsElement(elem)
      // fill the innerText of the ingredients section with that drinks ingredients
      fillInnerTextOfIngredientsListElement(elem)
    })
  })
}

function displayAllDrinksInDrinksArray(){
  let imageContainerElement = document.querySelector('.image-container')
  imageContainerElement.innerHTML = '';
  for (let i=0; i < drinksArray.length-1; i++){
    imageContainerElement.innerHTML += `<div><h2>${drinksArray[i].strDrink}</h2><img src="${drinksArray[i].strDrinkThumb}" data-drinkIndex="${i}"></div>`
  }
}

function toggleHiddenElements(){
  let hiddenElements = document.querySelectorAll(".hidden");
  if (hiddenElements) hiddenElements.forEach(e=> e.classList.toggle('hidden'))
}

function fillInnerTextOfInstructionsElement(elem){
  instructionsHtmlElement.innerText = drinksArray[elem.dataset.drinkindex].strInstructions;
}

function fillInnerTextOfIngredientsListElement(elem){
  ingredientsHtmlElement.innerHTML = '';
  for (let i =1; i <= 15; i++){
    let ingredient = drinksArray[elem.dataset.drinkindex]['strIngredient'+i];
    let measure = drinksArray[elem.dataset.drinkindex]['strMeasure'+i]
    // ingredientsHtmlElement.innerText += drinksArray[elem.dataset.drinkindex]['strIngredient'+i];
    if (ingredient !== null) {
      ingredientsHtmlElement.innerHTML += `<li> ${ingredient}, ${measure === null ? '':measure} </li>`
    }
  }
}
