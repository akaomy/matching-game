let allCards = document.querySelectorAll('.card');
const cardsParent = document.querySelector('.deck');
const totalTimeSpent = document.querySelector('#total-time-spent');
let popupTransparentBkg = document.querySelector(".congrat-popup-bkg");
let closePopup = document.querySelector(".close-popup");

const removeOpenAndShow = card => {
  card.classList.remove("open", "show", "disabled");
}

const addOpenAndShow = card => {
  card.classList.add("open", "show", "disabled");
}

const cardsMatched = card => {
  card.classList.add('match');
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

// close congrat popup
closePopup.addEventListener('click', function() {
    popupTransparentBkg.style.display = "none";
});

let counter = 0;
let timerID = null;

const startGame = () => {
  let counter = 0;
  timerID = setInterval(function() {
    counter += 1;
  }, 1000); 
}

const gameOver = () => {
  totalTimeSpent.innerHTML = `${counter}`;
  clearInterval(timerID);
  counter = 0;
  //return counter; 
}

// when clicking on the button on pop up window 'PLAY AGAIN'
// or when clicking on restart icon under the game title '.restart'
const resetGame = () => {
  // clear timer
  // timeCounter = 0;
  // clear score
  // gameScore = 0;
  // clear opened and matched cards
  return true;
}

const scoreCounter = () => {
  // start score counter to count how many pair of cards have been open 
  return true;
}


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
let selectedCards = [];
let matchedCardsPairs = [];

shuffledCards.forEach(function(card) {
  card.addEventListener('click', function() {

    // start timer
    startGame();

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
            // put each matched card onto a selected cards array
            cardsMatched(selectedCards[0]);
            cardsMatched(selectedCards[1]);
            // and put matched cards into an array of matched cards pairs
            matchedCardsPairs.push(selectedCards[0]);
            matchedCardsPairs.push(selectedCards[1]);  

              if (matchedCardsPairs.length === 16) {
                  // stop timer
                  gameOver(); 
                  showCongratPopup();
              }
                selectedCards.pop();
                selectedCards.pop();

              } else {

              setTimeout(function() {
                selectedCards.forEach(function() {
                  removeOpenAndShow(selectedCards[0]);
                  removeOpenAndShow(selectedCards[1]); 
                  selectedCards.pop();
                  selectedCards.pop();
                })
              }, 500);
          }
        } else { // if the cards don't match

        }
     }
  });
});

