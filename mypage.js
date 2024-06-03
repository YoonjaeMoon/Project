new fullpage('#fullpage', {
  autoScrolling: true,
  scrollHorizontally: true,
  responsiveWidth: 900,
  afterResponsive: function(isResponsive){
  }
});

// Exercise Calories Section - Mina
// Fetch calories API and handle click events

$(document).ready(function () {
  $("#exerciseSearch").click(function () {
    $.ajax({
      method: "GET",
      url:
        "https://api.api-ninjas.com/v1/caloriesburned?activity=" +
        $("#exerciseInput").val(),
      headers: { "X-Api-Key": "IaGdzq5pIoLI4XCyr1RFTA==SF87FmE9sxHucAPr" },
      contentType: "application/json",
      success: function (result) {
        console.log(result);
        resultList = result;
        caloriesRender();
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });
  });
});

// Render calories
let caloriesRender = () => {
  // Display a random item from the array
  let randomIndex = Math.floor(Math.random() * resultList.length);
  let randomResult = resultList[randomIndex];

  // Generate HTML
  let resultHTML = "";
  if (resultList.length > 0) {
    resultHTML = `
       <div>
        <span class="counter-text">${randomResult.total_calories}</span> <span class="note-text">cal</span>
       </div>
       <div class="message-text-area">
       <span class="note-title">${randomResult.duration_minutes}</span> <span class="note-text">minutes</span> 
       <span class="note-title">${randomResult.name}</span> <span class="note-text">activity</span>
       <span class="note-title">${randomResult.total_calories}</span>  <span class="note-text">calories burned!</span>
       <div class="note-text">Keep challenging yourself! 🙌</div>
    </div>`;
  } else {
    resultHTML =
      '<div class="note-text">Oops! We are still looking into this exercise 🙄</div>'; // When no results found
  }

  document.getElementById("result-area").innerHTML = resultHTML;
};

// Button function
let exerciseSearchButton = document.querySelectorAll(".like-exercise-check-area button");
exerciseSearchButton.forEach(button => button.addEventListener("click", event => getExerciseKeyButton(event)));

let getExerciseKeyButton = (event) => {
  let clickKeyword = event.target.textContent;
  console.log(clickKeyword);
  inputElement.value = `${clickKeyword}`;
}

// Emoji animation
let changingText = document.getElementById("changingText");
let texts = [
  "⛳",  "🤿",  "🎿",  "🏓",  "⚾",  "🏊‍♀️",  "🥊",  
  "🎾",  "🏀",  "🎯",  "🎳",  "⛸",  "🧘‍♀️",  "🏈",
];
let index = 0;
function changeText() {
  changingText.textContent = texts[index];
  index = (index + 1) % texts.length;
}
setInterval(changeText, 700);
changeText();

// Clear input text
let inputElement = document.getElementById("exerciseInput");
function clearInput() {
  inputElement.value = "";
}

// Alert when no input
let searchButton = document.getElementById("exerciseSearch");
searchButton.addEventListener("click", function () {
  if (inputElement.value == "") {
    alert("Please enter an exercise!");
    return;
  }
});

// Recipe Area - Soo

const appId = `35ed5796`;
const recipeId = `fc26eb2e099311839055d866ac9db908`;
let url = new URL(`https://api.edamam.com/api/recipes/v2?type=public&q=tomato&app_id=${appId}&app_key=${recipeId}&random=true&field=label&field=calories&field=image&field=totalNutrients&field=ingredientLines`);
let recipeList = [];
let recipeContent = [];
let inputRecipe = document.getElementById("recipe-search-input");
let recipeSearchButton = document.querySelectorAll(".like-food-check-area button");
recipeSearchButton.forEach(button => button.addEventListener("click", event => getKeybutton(event)));

const sportSearchKey = () => {
  switch (event.key) {
    case "Enter":
      getSearchRecipe();
  }
}

const getRecipe = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.hits.length === 0) {
        throw new Error("No result for this search");
      }
      recipeList = data.hits;
      recipeContent = recipeList.map((item) => item.recipe);
      render();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
}
getRecipe();

const getKeybutton = (event) => {
  const checkKeyword = event.target.textContent;
  console.log(checkKeyword);
  url = new URL(`https://api.edamam.com/api/recipes/v2?type=public&q=${checkKeyword}&app_id=${appId}&app_key=${recipeId}&random=true&field=label&field=calories&field=image&field=totalNutrients&field=ingredientLines`);
  getRecipe();
}

const getSearchRecipe = async () => {
  let recipeKeyword = inputRecipe.value;
  url = new URL(`https://api.edamam.com/api/recipes/v2?type=public&q=${recipeKeyword}&app_id=${appId}&app_key=${recipeId}&random=true&field=label&field=calories&field=image&field=totalNutrients&field=ingredientLines`);
  getRecipe();
  inputRecipe.value = "";
};

const render = () => {
  const recipeCardHTML = recipeContent.map(item => `<button class="recipe-card" id="recipe-button" onclick="clickRecipe(event)">
  <div class="recipe-card-image"><img src="${item.image}"></div>
  <div><h3>${item.label}</h3></div>
</button>`).join('');

  document.getElementById("view-recipecard").innerHTML = recipeCardHTML;
}

const clickRecipe = (event) => {
  console.log(event.target.offsetParent.offsetParent.innerText);
  let recipeText = event.target.offsetParent.offsetParent.innerText;
  let clickRecipe = recipeContent.filter((item) => item.label == `${recipeText}`);
  console.log("ohmy", clickRecipe);
  const clickRecipeHTML = clickRecipe.map(item => `<div class="recipe-alltext">
 <div class="recipe-alltext-img"><img src="${item.image}"></div>
 <div class="recipe-alltext-title"><p><span class="recipe-title">${item.label}</span><br>
 <span class="recipe-blue">${parseInt(item.calories)}</span> <span class="recipe-smalltext">CALORIES</span> | <span class="recipe-blue">${item.ingredientLines.length}</span> <span class="recipe-smalltext">INGREDIENTS</span></p></div>
 <p class="font-boldweight">INGREDIENTS</p><div class="recipe-ingredient"><p> ${item.ingredientLines.join('<br></br>')}</p></div>
 <p class="nutri-font"><span class="recipe-smalltext">🔴</span>PROTEIN &nbsp;<span class="recipe-blue">${parseInt(item.totalNutrients.PROCNT.quantity)}</span>${item.totalNutrients.PROCNT.unit} | 
 <span class="recipe-smalltext">🟡</span>CARB &nbsp;<span class="recipe-blue">${parseInt(item.totalNutrients.CHOCDF.quantity)}</span>${item.totalNutrients.CHOCDF.unit} | 
 <span class="recipe-smalltext">🟢</span>FAT &nbsp;<span class="recipe-blue">${parseInt(item.totalNutrients.FAT.quantity)}</span>${item.totalNutrients.FAT.unit}</p>`);

  document.getElementById("click-recipe-area").innerHTML = clickRecipeHTML;
}

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;
  document.getElementById("view-recipecard").innerHTML = errorHTML;
}


let result;

function makeAjaxCall(type, muscle, difficulty) {
  $.ajax({
    method: 'GET',
    url: `https://api.api-ninjas.com/v1/exercises?type=${type}&muscle=${muscle}&difficulty=${difficulty}`,
    headers: { 'X-Api-Key': '2zEcKZF8xR0B88lSXJRwzQ==nRJtVdNfV0FBKzUn'},
    contentType: 'application/json',
    success: function(result) {
      console.log(result);
      updateResultOnPage(result);  
    },
    error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
    }
  });
}

// Update result on HTML
function updateResultOnPage(results) {
  myHtml = '';

  const result = results[0];
  myHtml += `<div class="exec">
    <div class="linemenuview"><div class="linemenu">Difficulty</div><div name="difficulty">${result.difficulty}</div></div>
    <div class="linemenuview"><div class="linemenu">Equipment</div><div name="equipment">${result.equipment}</div></div>
    <div class="linemenuview"><div class="linemenu">Instructions</div><div name="instructions">${result.instructions}</div></div>
    <div class="linemenuview"><div class="linemenu">Muscle</div><div name="muscle">${result.muscle}</div></div>
    <div class="linemenuview"><div class="linemenu">Exercise Name</div><div name="name">${result.name}</div></div>   
    <div class="linemenuview"><div class="linemenu">Type</div><div name="type">${result.type}</div></div>                                            
  </div>`;

  document.getElementById('result').innerHTML = myHtml;
}


// Function to add plan
const planAdd = () => {
  let userWater = document.getElementById("plan-water").value;
  let waterIcon = "";

  // Validate input
  if (userWater >= 1 && userWater <= 5) {
    for (let i = 0; i < userWater; i++) {
      waterIcon += "💧";
    }
  } else {
    alert("Please enter a number between 1 and 5.");
    return;
  }

  // Create HTML for the new plan item
  let planAddHTML = `<div class="plan-item">
    <div class="plan-date">${moment().format("MMM D")}</div>
    <div class="plan-water">${waterIcon}</div>
    <div><button class="plan-delete-button" onclick="planDelete(event)" id="plan-delete">🗙</button><div>
  </div>`;

  // Append the new plan item to the plan area
  document.getElementById("plan-area").innerHTML += planAddHTML;

  // Clear the input
  document.getElementById("plan-water").value = "";
}

// Function to delete a plan item
const planDelete = (event) => {
  event.target.closest(".plan-item").remove();
}

