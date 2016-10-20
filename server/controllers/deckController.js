
const deckController = {

  buildCardDeck: () => {
    const deck = [];
    const suits = ['♥', '♣', '♠', '♦'];
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    suits.forEach((suit) => {
      values.forEach((value) => {
        deck.push(suit + value);
      });
    });
    return deck;
  },

  shuffleCardDeck: (deck) => {
    const shuffled = deck;
    return shuffled;
  },

};

export default deckController;
