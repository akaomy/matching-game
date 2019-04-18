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

const removeOpenAndShow = card => {
  card.classList.remove("open", "show", "disabled");
}

const addOpenAndShow = card => {
  card.classList.add("open", "show", "disabled");
}

const addMatchClass = card => {
  card.classList.add('match');
}

const matchCards = () => {
  // add match class to selected cards
  addMatchClass(selectedCards[0]);
  addMatchClass(selectedCards[1]);
  // and put them into an array of matchedCards pairs
  matchedCardsPairs.push(selectedCards[0]);
  matchedCardsPairs.push(selectedCards[1]); 
  console.log(matchedCardsPairs.length)
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
// close congrat popup
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

// not finished
const resetGame = () => {
  clearInterval(timerID); // stop counter
  timerCounter = 0; // reset counter
  gameStarted = false; // revert back gameStarted boolean
  matchedCardsPairs.length = 0; // ? // clear opened, showed and matched cards
  closeCongratPopup(); // close popup
  console.log(`stop counter`);
  console.log(`timecounter = ${timerCounter}`);
  console.log(`gameStarted = ${gameStarted}`);
  console.log(`matched cards pairs = ${matchedCardsPairs}`);
}

resetBtn.forEach(function(button) {
  button.addEventListener('click', resetGame);
});

shuffle(allCards);

// convert NodeList to an array
let shuffledCards = shuffle([...allCards]);

//remove unshuffled cards from the parent container
for (let i = 0; i < allCards.length; i ++) {
    cardsParent.removeChild(allCards[i]);
}

// add shuffled cards to parent container 
for (let i = 0; i < shuffledCards.length; i ++ ) {
  cardsParent.appendChild(shuffledCards[i]);
}

/*
Main game logic:
Upon initial click check if the array selectedCards contains any cards(items) in it:
- if there are no open cards: add one
Upon each next click check if there are 1 or 2 cards are opened:
- open them, and check if they have same class
When two cards are opened check if they have same class:
- if they are: add class 'match'
- put them into an array of matched cards
*/

const closeUnmatchedCards = () => {
  removeOpenAndShow(selectedCards[0]);
  removeOpenAndShow(selectedCards[1]); 
  selectedCards.pop();
  selectedCards.pop();
}


shuffledCards.forEach(function(card) {
  card.addEventListener('click', function() {

    if (!gameStarted) {
      startGame();
    }

    // if this card is already inside the array, it will return index of it
    // if it's not, it will push the card in the array
    if (selectedCards.indexOf(card) === -1) {
      selectedCards.push(card); 
    }

      if (selectedCards.length <= 2 ) {
        addOpenAndShow(card);

        if (selectedCards.length === 2) {
          let firstSelectedCard = selectedCards[0].firstElementChild.className;
          let secondSelectedCard = selectedCards[1].firstElementChild.className;

          if (firstSelectedCard === secondSelectedCard) {
            matchCards();

              if (matchedCardsPairs.length === 16) {
                  // stop timer
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

