let allCards = document.querySelectorAll('.card');
const cardsParent = document.querySelector('.deck');


function removeOpenAndShow(card) {
  card.classList.remove("open", "show");
}

function addOpenAndShow(card) {
  card.classList.add("open", "show");
}

function cardsMatched(card) {
  card.classList.add('match');
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomNum = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomNum]] = [array[randomNum], array[i]];
    }
    return array;
}

shuffle(allCards);

//convert NodeList to an array
let shuffledCards = shuffle([...allCards]);

//clearing what's in the DOM by accessing the parent element
for (let i = 0; i < allCards.length; i ++) {
    cardsParent.removeChild(allCards[i]);
}

//re-applying them to the parent in their new order
for (let i = 0; i < shuffledCards.length; i ++ ) {
	cardsParent.appendChild(shuffledCards[i]);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call 
 from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another 
 function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this 
 functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function 
 that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another 
 function that you call from this one)
 */


let selectedCards = [];

shuffledCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    selectedCards.push(card);

    if (selectedCards.length <= 2 ) {
      addOpenAndShow(card);

      // if there are two cards are open
      if (selectedCards.length === 2) {
          let firstSelectedCard = selectedCards[0].firstElementChild.className;
          console.log(firstSelectedCard);
          let secondSelectedCard = selectedCards[1].firstElementChild.className;
          console.log(secondSelectedCard);
          // if cards matched
          // change the color of cards
          // keep them open, but empty the selected cards array 
          // to allow user to continue the game
          if (firstSelectedCard === secondSelectedCard) {
            cardsMatched(selectedCards[0]);
            cardsMatched(selectedCards[1]);
            selectedCards.pop();
            selectedCards.pop();
            } else {
              // if cards didn't match:
              // cards will close 
              // and selectedCards array will be emptied
              setTimeout(function() {
                selectedCards.forEach(function(card) {
                  removeOpenAndShow(selectedCards[0]);
                  removeOpenAndShow(selectedCards[1]); 
                  selectedCards.pop();
                  selectedCards.pop();
                })
              }, 900);
          }
       }
     }
  });
});

