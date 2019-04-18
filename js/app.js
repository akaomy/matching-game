let allCards = document.querySelectorAll(".card");
const cardsParent = document.querySelector(".deck");
const totalTimeSpent = document.querySelector("#total-time-spent");
let popupTransparentBkg = document.querySelector(".congrat-popup-bkg");
let closePopup = document.querySelector(".close-popup");
let resetBtn = document.querySelectorAll(".reset");

let selectedCards = [];
let matchedCardsPairs = [];

let timerCounter = 0;
let timerID = null;
let gameStarted = false;

const removeOpenAndShowClasses = card => {
  card.classList.remove("open", "show", "disabled");
}

const addOpenAndShowClasses = card => {
  card.classList.add("open", "show", "disabled");
}

const addMatchClass = card => {
  card.classList.add('match');
}

const removeMatchClass = card => {
  card.classList.remove('match');
}

const matchCards = () => {
  addMatchClass(selectedCards[0]);
  addMatchClass(selectedCards[1]);
  matchedCardsPairs.push(selectedCards[0]);
  matchedCardsPairs.push(selectedCards[1]); 
}

const closeUnmatchedCards = () => {
  removeOpenAndShowClasses(selectedCards[0]);
  removeOpenAndShowClasses(selectedCards[1]); 
  selectedCards.pop();
  selectedCards.pop();
}

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
      const randomNum = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomNum]] = [array[randomNum], array[i]];
  }
  return array;
}

const showCongratPopup = () => {
  popupTransparentBkg.style.display = "block";
}

const closeCongratPopup = () => {
  popupTransparentBkg.style.display = "none";
}

closePopup.addEventListener('click', function() {
  closeCongratPopup();
});

const startGame = () => {
  gameStarted = true;
  timerID = setInterval(function() {
    timerCounter += 1;
  }, 1000); 
}

const scoreCounter = () => {
  // start score counter to count how many pair of cards have been open 
  return true;
}

const stopGame = () => {
  totalTimeSpent.innerHTML = `${timerCounter}`;
  clearInterval(timerID);
  timerCounter = 0;
  gameStarted = false;
}

const resetGame = () => {
  clearInterval(timerID); 
  timerCounter = 0; 
  gameStarted = false; 
  closeCongratPopup(); 

  for (let i = 0; i < shuffledCards.length; i++) {
    removeOpenAndShowClasses(shuffledCards[i]);
    removeMatchClass(shuffledCards[i]);
  } 

}

resetBtn.forEach(function(button) {
  button.addEventListener('click', resetGame);
});

shuffle(allCards);

// convert NodeList to an array
let shuffledCards = shuffle([...allCards]);

// remove unshuffled cards from the parent container
for (let i = 0; i < allCards.length; i ++) {
    cardsParent.removeChild(allCards[i]);
}

// add shuffled cards to parent container 
for (let i = 0; i < shuffledCards.length; i ++ ) {
  cardsParent.appendChild(shuffledCards[i]);
}

openCardsCounter = 0;

shuffledCards.forEach(function(card) {
  card.addEventListener('click', function() {

    if (!gameStarted) {
      startGame();
    }

    if (selectedCards.indexOf(card) === -1) {
      selectedCards.push(card); 
    }

      if (selectedCards.length <= 2 ) {
        addOpenAndShowClasses(card);

        if (selectedCards.length === 2) {
          let firstSelectedCard = selectedCards[0].firstElementChild.className;
          let secondSelectedCard = selectedCards[1].firstElementChild.className;
          openCardsCounter += 1;
          document.querySelector(".moves").innerHTML = `${openCardsCounter}`;

          if (firstSelectedCard === secondSelectedCard) {
            matchCards();

              if (matchedCardsPairs.length === 16) {
                  stopGame(); 
                  showCongratPopup();
              }
                selectedCards.pop();
                selectedCards.pop();

              } else {

              setTimeout(function() {
                selectedCards.forEach(function() {
                  closeUnmatchedCards();
                })
              }, 500);
          }
        }
     }
  });
});

