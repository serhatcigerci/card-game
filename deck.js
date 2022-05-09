const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

export default class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards
  }

  get numberOfCards() {
    return this.cards.length
  }

  shuffle() {
   for (let i = this.numberOfCards - 1; i > 0; i--) {
     const newI = Math.floor(Math.random() * (i + 1))
     const oldValue = this.cards[newI]
     this.cards[newI] = this.cards[i]
     this.cards[i] = oldValue
   }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value    
  }
}

function freshDeck() {
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value)
    })
  })
}