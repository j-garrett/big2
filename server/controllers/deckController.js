
const createCardDeck = () => {
  const deck = [];
  const suits = ['♥', '♣', '♠', '♦'];
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push(suit + value);
    });
  });
  return deck;
};

const deckController = {

  createCardDeck,

  shuffleCardDeck() {
    const deck = createCardDeck();
    for (let i = 0; i < deck.length; i += 1) {
      const swapCardIndex = Math.floor(Math.random() * (deck.length - i)) + i;
      const newCard = deck[swapCardIndex];
      deck[swapCardIndex] = deck[i];
      deck[i] = newCard;
    }
    return deck;
  },

};

export default deckController;

