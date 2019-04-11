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


let selectedCards = [];

shuffledCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    if (selectedCards.indexOf(card) === -1) {selectedCards.push(card)}

      if (selectedCards.length <= 2 ) {
        addOpenAndShow(card);

        if (selectedCards.length === 2) {
          let firstSelectedCard = selectedCards[0].firstElementChild.className;
          let secondSelectedCard = selectedCards[1].firstElementChild.className;

          if (firstSelectedCard === secondSelectedCard) {
            cardsMatched(selectedCards[0]);
            cardsMatched(selectedCards[1]);
            selectedCards.pop();
            selectedCards.pop();

            } else {

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

