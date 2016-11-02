
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

const shuffleCardDeck = () => {
  const deck = createCardDeck();
  for (let i = 0; i < deck.length; i += 1) {
    const swapCardIndex = Math.floor(Math.random() * (deck.length - i)) + i;
    const newCard = deck[swapCardIndex];
    deck[swapCardIndex] = deck[i];
    deck[i] = newCard;
  }
  return deck;
};

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

const createGame = () => {
  const deck = shuffleCardDeck();
  const hands = dealCards(deck, 4);
  return {
    hands,
    pot: {
      r1: [],
    },
    turn: 'player1',
    roundStartedBy: 'player1',
  };
};

const helpers = {
  createCardDeck,
  shuffleCardDeck,
  dealCards,
  createGame,
};

export default helpers;
