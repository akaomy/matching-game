let allCards = document.querySelectorAll(".card");
const cardsParent = document.querySelector(".deck");
const totalTimeSpent = document.querySelector("#total-time-spent");
let popupTransparentBkg = document.querySelector(".congrat-popup-bkg");
let closePopup = document.querySelector(".close-popup");
let resetBtn = document.querySelectorAll(".reset");
// const moves = document.querySelectorAll(".moves");
const moves = document.querySelector(".moves");

let selectedCards = [];
let matchedCardsPairs = [];

let timerCounter = 0;
let timerID = null;
let gameStarted = false;
let openCardsCounter = 0;

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

const closeMatchedCards = (arr) => {
  arr.forEach(card => {
    removeOpenAndShowClasses(card);
    removeMatchClass(card);
  });
}

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
      const randomNum = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomNum]] = [array[randomNum], array[i]];
  }
  return array;
}

const removeUnshuffledCards = () => {
  for (let i = 0; i < allCards.length; i ++) {
      cardsParent.removeChild(allCards[i]);
  }  
}

const removeShuffledCards = () => {
    for (let i = 0; i < shuffledCards.length; i ++) {
    cardsParent.removeChild(shuffledCards[i]);
  } 
}

const addShuffledCards = () => {
  for (let i = 0; i < shuffledCards.length; i ++ ) {
    cardsParent.appendChild(shuffledCards[i]);
  }
}

const addSecondTimeShuffledCards = (arr) => {
  for (let i = 0; i < arr.length; i ++ ) {
    cardsParent.appendChild(arr[i]);
  }
}

const showCongratPopup = () => {
  popupTransparentBkg.style.display = "block";
  // showNumberOfMoves();
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

const showNumberOfMoves = () => {
  openCardsCounter += 1;
  // for (const each of moves) {
  //   each.innerHTML = `${openCardsCounter}`;
  // }
  moves.innerHTML = `${openCardsCounter}`;
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
  openCardsCounter = 0;
  moves.innerHTML = "0";
  matchedCardsPairs = [];
  
  removeShuffledCards();
  shuffle(allCards);
  let newlyShuffledCards = shuffle([...allCards]);
  closeMatchedCards(newlyShuffledCards);

  for (let i = 0; i < newlyShuffledCards.length; i ++ ) {
    cardsParent.appendChild(newlyShuffledCards[i]);
  }

}

resetBtn.forEach(function(button) {
  button.addEventListener('click', resetGame);
});

shuffle(allCards);

// convert NodeList to an array
let shuffledCards = shuffle([...allCards]);

removeUnshuffledCards();

addShuffledCards();

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
          
          showNumberOfMoves();

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

