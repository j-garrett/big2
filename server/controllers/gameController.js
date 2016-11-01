import deckController from './deckController';

const dealCards = (deck, numPlayers) => {
  const handSize = deck.length / numPlayers;
  const hands = {};
  for (let i = 0; i < numPlayers; i += 1) {
    const startIndex = i * handSize;
    const endIndex = startIndex + handSize;
    hands[`player${i + 1}`] = deck.slice(startIndex, endIndex);
  }

  return hands;
};

const gameController = {

  createGame() {
    const deck = deckController.shuffleCardDeck();
    const game = dealCards(deck, 4);
    return game;
  },

};

export default gameController;
