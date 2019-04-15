let allCards = document.querySelectorAll('.card');
const cardsParent = document.querySelector('.deck');

const removeOpenAndShow = card => {
  card.classList.remove("open", "show");
}

const addOpenAndShow = card => {
  card.classList.add("open", "show");
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
  let showPopup = document.querySelector("#show-popup");
  let popupTransparentBkg = document.querySelector(".congrat-popup-bkg");
  popupTransparentBkg.style.display = "block";
}

const closeCongratPopup = () => {
  let popupTransparentBkg = document.querySelector(".congrat-popup-bkg");
  let closePopup = document.querySelector("#close-popup");
  closePopup.addEventListener('click', function() {
    popupTransparentBkg.style.display = "none";
  });
}

// starts time counter,
// starts opened pairs of cards counter
const startGame = () => {
  return true;
}

// counts how many pair of cards have been open 
const scoreCounter = () => {
  return true;
}

// stops time counter once all cards has been matched
// output in pop up window: how much time left, score 
const gameOver = () => {
  return true;
}

const resetGame = () => {
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

    if (selectedCards.indexOf(card) === -1) {selectedCards.push(card)}

      if (selectedCards.length <= 2 ) {
        addOpenAndShow(card);

        if (selectedCards.length === 2) {
          let firstSelectedCard = selectedCards[0].firstElementChild.className;
          let secondSelectedCard = selectedCards[1].firstElementChild.className;

          if (firstSelectedCard === secondSelectedCard) {
            cardsMatched(selectedCards[0]);
            cardsMatched(selectedCards[1]);
            // put matched cards into an array of matched cards pairs
            matchedCardsPairs.push(selectedCards[0]);
            matchedCardsPairs.push(selectedCards[1]);  

              if (matchedCardsPairs.length === 16) {
                  showCongratPopup();
                  closeCongratPopup();
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
       } 
     }
  });
});

