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


let selectedCards = [];

shuffledCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    selectedCards.push(card);

     if (selectedCards.length <= 2 ) {
       addOpenAndShow(card);

       if (selectedCards.length === 2) {
          let firstSelectedCard = selectedCards[0].firstElementChild.className;
          console.log(firstSelectedCard);
          let secondSelectedCard = selectedCards[1].firstElementChild.className;
          console.log(secondSelectedCard);
          if (firstSelectedCard === secondSelectedCard) {
            cardsMatched(selectedCards[0]);
            cardsMatched(selectedCards[1]);
            } else {
              console.log('cards did not matched');
              setTimeout(function() {
                selectedCards.forEach(function(card) {
                  removeOpenAndShow(card);
                })
              }, 1000);
          }
       }
     }
  });
});

