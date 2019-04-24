let allCards = [...document.querySelectorAll(".card")];
let allStars = [...document.querySelectorAll(".stars li")];
let popupTransparentBkg = document.querySelector(".congrat-popup-bkg");
let closePopup = document.querySelector(".close-popup");
let resetBtn = document.querySelectorAll(".reset");

const cardsParent = document.querySelector(".deck");
const starsParent = document.querySelectorAll('.stars');
const totalTimeSpent = document.querySelector("#total-time-spent");
const moves = document.querySelectorAll(".moves");
const timer = document.querySelector(".show-timer");

let openedCardsArray = [];
let matchedCardsPairs = [];

let timerCounter = 0;
let timerID = null;
let gameStarted = false;
let openCardsCounter = 0;
let movesCounter = 0;

const removeOpenAndShowClasses = card => {
  card.classList.remove("open", "show", "disabled");
};

const addOpenAndShowClasses = card => {
  card.classList.add("open", "show", "disabled");
};

const addMatchClass = card => {
  card.classList.add('match');
};

const removeMatchClass = card => {
  card.classList.remove('match');
};

const matchCards = () => {
  addMatchClass(openedCardsArray[0]);
  addMatchClass(openedCardsArray[1]);
  matchedCardsPairs.push(openedCardsArray[0]);
  matchedCardsPairs.push(openedCardsArray[1]); 
};

const closeUnmatchedCards = () => {
  removeOpenAndShowClasses(openedCardsArray[0]);
  removeOpenAndShowClasses(openedCardsArray[1]); 
  openedCardsArray.pop();
  openedCardsArray.pop();
};

const closeMatchedCards = (arr) => {
  arr.forEach(card => {
    removeOpenAndShowClasses(card);
    removeMatchClass(card);
  });
};

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
      const randomNum = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomNum]] = [array[randomNum], array[i]];
  }
  return array;
};

const removeUnshuffledCards = () => {
  for (let i = 0; i < allCards.length; i ++) {
      cardsParent.removeChild(allCards[i]);
  }  
};

const removeShuffledCards = () => {
    for (let i = 0; i < shuffledCards.length; i ++) {
    cardsParent.removeChild(shuffledCards[i]);
  } 
};

const addShuffledCards = () => {
  for (let i = 0; i < shuffledCards.length; i ++ ) {
    cardsParent.appendChild(shuffledCards[i]);
  }
};

const addSecondTimeShuffledCards = (arr) => {
  for (let i = 0; i < arr.length; i ++ ) {
    cardsParent.appendChild(arr[i]);
  }
};

const showNumberOfMoves = () => {
  openCardsCounter += 1;
  for (const each of moves) {
    each.innerHTML = `${openCardsCounter}`;
  }
};

const removeOneStar = () => {
 starsParent.forEach(function(container){
  starsList = container.querySelectorAll('.fa-star'); // NodeList of stars in the ul
    if (starsList.length) { // if there is at least one, this will be true
      const starToRemove = container.querySelector('li');
      container.removeChild(starToRemove);
    }
 })
};

const resetAllStars = () => {
  starsParent.forEach(function(container){
    container.innerHTML = "";
    for (let i = 0; i < 3; i++) {
      const liElem = document.createElement('li');
      const iElem = document.createElement('i');
      iElem.classList.add('fa', 'fa-star');
      liElem.appendChild(iElem);
      container.appendChild(liElem);
    }
  })
};

const showCongratPopup = () => {
  popupTransparentBkg.style.display = "block";
  showNumberOfMoves();
};

const closeCongratPopup = () => {
  popupTransparentBkg.style.display = "none";
};

closePopup.addEventListener('click', function() {
  closeCongratPopup();
});

const startGame = () => {
  gameStarted = true;
  timerID = setInterval(function() {
    timerCounter += 1;
    timer.innerHTML = `${timerCounter}`;
  }, 1000); 
};

const stopGame = () => {
  totalTimeSpent.innerHTML = `${timerCounter}`;
  clearInterval(timerID);
  timerCounter = 0;
  gameStarted = false;
};

const resetGame = () => {
  clearInterval(timerID);
  timerCounter = 0; 
  timer.innerHTML = "0";
  openCardsCounter = 0;
  openCardsCounter.innerHTML = "0";
  gameStarted = false; 
  moves.innerHTML = "0";
  matchedCardsPairs = [];

  resetAllStars();
  resetAllCards();
  closeCongratPopup(); 
};

const resetAllCards = () => {
  removeShuffledCards();
  let newlyShuffledCards = shuffle([...allCards]);
  closeMatchedCards(newlyShuffledCards);
  for (let i = 0; i < newlyShuffledCards.length; i ++ ) {
    cardsParent.appendChild(newlyShuffledCards[i]);
  }
};

resetBtn.forEach(function(button) {
  button.addEventListener('click', resetGame);
});

removeUnshuffledCards();

let shuffledCards = shuffle(allCards);

addShuffledCards();

shuffledCards.forEach(function(card) {
  card.addEventListener('click', function() {

    if (!gameStarted) {
      startGame();
    }

    if (openedCardsArray.indexOf(card) === -1) {
      openedCardsArray.push(card); 
    }

      if (openedCardsArray.length <= 2 ) {
        addOpenAndShowClasses(card);

        if (openedCardsArray.length === 2) {
          if (movesCounter === 3) {
            removeOneStar();
            movesCounter = 0;
          }
          showNumberOfMoves();
          movesCounter += 1;

          let firstSelectedCard = openedCardsArray[0].firstElementChild.className;
          let secondSelectedCard = openedCardsArray[1].firstElementChild.className;

          if (firstSelectedCard === secondSelectedCard) {
            matchCards();

              if (matchedCardsPairs.length === 16) {
                  stopGame(); 
                  showCongratPopup();
              }
                openedCardsArray.pop();
                openedCardsArray.pop();

              } else {

              setTimeout(function() {
                openedCardsArray.forEach(function() {
                  closeUnmatchedCards();
                })
              }, 500);
          }
        }
     }
  });
});

