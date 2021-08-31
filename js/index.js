const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

class MemoryGame {
  constructor(cards) {
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards(cards) {
    if (!this.cards) {
      return undefined;
    }

    for (var i = this.cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
    return this.cards;
  }

  checkIfPair(card1, card2) {
    this.pairsClicked++;
    if (card1 === card2) {
      this.pairsGuessed++;
      return true;
    } else {
      return false;
    }
  }

  checkIfFinished() {
    let totalPairs = this.cards.length / 2;
    if (this.pairsGuessed >= totalPairs) {
      return true;
    } else {
      return false;
    }
  }
}

const memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards(cards);

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });


  document.querySelector('#memory-board').innerHTML = html;


  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      if (memoryGame.pickedCards.length < 2) {

        card.classList.add('turned');
      }
      memoryGame.pickedCards.push(card);
      if (memoryGame.pickedCards.length === 2) {

        let cardOne = memoryGame.pickedCards[0].getAttribute('data-card-name');
        let cardTwo = memoryGame.pickedCards[1].getAttribute('data-card-name');

        let result = memoryGame.checkIfPair(cardOne, cardTwo);
        // if matched
        if (!result) {
          setTimeout(function () {
            memoryGame.pickedCards[0].classList.remove('turned');
            memoryGame.pickedCards[1].classList.remove('turned');
            memoryGame.pickedCards.splice(0, 2);
          }, 800);
        } else {
          memoryGame.pickedCards.splice(0, 2);
        }
      }

      //Check if finished
      if (memoryGame.checkIfFinished() === true) {
        document.querySelector('body > div > h1').innerHTML = 'You Won!!!';
        setTimeout(function () {
          window.location.reload();
        }, 4000);
      }
      const pairsClicked = document.getElementById('pairs-clicked');
      const pairsGuessed = document.getElementById('pairs-guessed');
      pairsClicked.innerHTML = memoryGame.pairsClicked;
      pairsGuessed.innerHTML = memoryGame.pairsGuessed;
      console.log(`Card clicked: ${card}`);
    });
  });
});
