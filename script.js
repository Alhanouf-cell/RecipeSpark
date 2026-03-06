const API_KEY = "YOUR_API_KEY";

async function generateRecipe(){

let ingredients = document.getElementById("ingredients").value;
let result = document.getElementById("result");
let loading = document.getElementById("loading");

if(ingredients.trim() === ""){
result.innerHTML="Please enter ingredients";
return;
}

result.innerHTML="";
loading.classList.remove("hidden");

try{

const response = await fetch("https://api.openai.com/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + API_KEY
},
body: JSON.stringify({
model:"gpt-4.1-mini",
messages:[
{
role:"system",
content:"You are a helpful AI chef."
},
{
role:"user",
content:`Create a recipe using these ingredients: ${ingredients}.
Include recipe name and steps.`
}
],
temperature:0.8
})
});

const data = await response.json();

loading.classList.add("hidden");

let recipeText = data.choices[0].message.content;

typeWriter(recipeText,result);

}
catch(error){

loading.classList.add("hidden");
result.innerHTML="Error generating recipe.";

}

}

function createFoodBackground(){

const foods=["🍕","🍔","🌮","🥞","🧇","🍣","🍜","🍰","🧁","🍛","🥪","🌭","🥙","🍝","🍡","🎂","✨"];

const bg=document.getElementById("foodBg");

for(let i=0;i<120;i++){

let emoji=document.createElement("div");

emoji.className="food-emoji";

emoji.innerText=foods[Math.floor(Math.random()*foods.length)];

emoji.style.left=Math.random()*100+"vw";

emoji.style.top=Math.random()*200+"vh";

bg.appendChild(emoji);

}

}

createFoodBackground();

function surpriseMe(){

const randomIngredients = [
"chocolate, milk",
"egg, cheese, bread",
"rice, chicken",
"tuna, pasta",
"potato, cheese",
"tomato, onion, egg",
"banana, milk",
"avocado, toast"
];

let random = randomIngredients[Math.floor(Math.random()*randomIngredients.length)];

document.getElementById("ingredients").value = random;

foodConfetti();

generateRecipe();

}

function foodConfetti(){

const foods = ["🍕","🍔","🌮","🥞","🧇","🍣","🍜","🍰","🧁","🍛","🥪","🌭","🥙","🍝","🍡","🎂"];

for(let i=0;i<25;i++){

let food = document.createElement("div");

food.className="food-confetti";
food.innerText = foods[Math.floor(Math.random()*foods.length)];

food.style.left = Math.random()*100 + "vw";

food.style.animationDuration = (Math.random()*1+1)+"s";

document.body.appendChild(food);

setTimeout(()=>{
food.remove();
},1500);

}

}

function typeWriter(text, element){

let i = 0;
element.innerHTML="";

function typing(){
if(i < text.length){
element.innerHTML += text.charAt(i);
i++;
setTimeout(typing,10);
}
}

typing();


}
