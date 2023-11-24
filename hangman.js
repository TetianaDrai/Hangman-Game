function startGame() {
const elements = {
  lives: document.querySelector(".lives b"),
  keyboard:document.querySelector(".alphabet"),
  hangmanImg: document.querySelector(".hangmanBox img"),
  alphabet: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
}

let correctLetter = "";
let currentWord, wrongLetter = 0;
const maxLives = 6;
let word = "";
const api = "https://random-word-api.herokuapp.com/word?length=5"

// API
fetch(api)
    .then((response) => response.json())
    .then((response) => {
      //Setting default word in case of api doesn't work
       word = response?.[0] || 'graal';
       correctLetter = word;
       document.title = word;
       console.log(word); 
});


// Drawing keyboard
const initGame = (button, clickedLetter) => {
  console.log(clickedLetter);
let currentWord = word.split("");
console.log(word);

  if(currentWord.includes(clickedLetter)) {
    currentWord.forEach((inputLetter, index) => {
      if(inputLetter === clickedLetter) {
        document.body.querySelectorAll("li")[index].innerText = inputLetter;
        document.body.querySelectorAll("li")[index].classList.add("correct");
        correctLetter = correctLetter.replace(inputLetter, "");
      }
    }) 
    if(correctLetter.length ===0) {
      setTimeout(() => {
        alert ("Game Win");
        window.location.reload();
      }, 1000);
    }
  } else{
    wrongLetter++;
    if(wrongLetter >= maxLives) {
      setTimeout(() => {
        alert ("Game Over");
        window.location.reload();
      }, 1000); 
    }
    elements.hangmanImg.src = `images/hangman-${wrongLetter}.svg`;
    button.setAttribute('disabled', true);
    elements.lives.innerText = `${wrongLetter} / ${maxLives}`;
  }
}

for (let i = 0; i <= elements.alphabet.length - 1; i++) {
  const button = document.createElement("button");
  button.innerText = elements.alphabet[i];
  elements.keyboard.appendChild(button);
  button.addEventListener("click", e=> initGame(e.target, elements.alphabet[i] ));
}

}

