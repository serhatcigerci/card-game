import Deck from "./deck.js"

const CARD_VALUE_MAP = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14,
}

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

  updateDeckCount()

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = 'Win'
    playerDeck.push(playerCard)
    playerDeck.push(computerCard)
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = 'Lose'
    computerDeck.push(computerCard)
    computerDeck.push(playerCard)
  } else {
    text.innerText = 'Draw'
    computerDeck.push(computerCard)
    playerDeck.push(playerCard)
  }
}

function updateDeckCount() {
  computerDeckElem.innerText = computerDeck.numberOfCards
  playerDeckElem.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}