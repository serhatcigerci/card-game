import Deck from "./deck.js"

const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const computerDeckElem = document.querySelector('.computer-deck')
const playerDeckElem = document.querySelector('.player-deck')
const text = document.querySelector('.text')

let playerDeck, computerDeck, inRound


document.addEventListener('click', () => {
  if (inRound) {
    cleanBeforeRound()
  } else {
    flipCards()
  }
})

startGame()
function startGame() {
  const deck = new Deck()
  deck.shuffle()

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
  inRound = false
  
  cleanBeforeRound()
}

function cleanBeforeRound() {
  computerCardSlot.innerHTML = ''
  playerCardSlot.innerHTML = ''
  text.innerText = ''
  inRound = false

  updateDeckCount()
}

function flipCards() {
  inRound = true

  const playerCard = playerDeck.pop()
  const computerCard = computerDeck.pop()

  playerCardSlot.appendChild(playerCard.getHTML())
  computerCardSlot.appendChild(computerCard.getHTML())
}

function updateDeckCount() {
  computerDeckElem.innerText = computerDeck.numberOfCards
  playerDeckElem.innerText = playerDeck.numberOfCards
}
