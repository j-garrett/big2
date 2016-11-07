const big2Rooms = require('./../models/big2Rooms');

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
    round: 1,
    players: {

    },
    hands,
    pot: [[]],
    turn: 'player1',
    roundStartedBy: 'player1',
  };
};

const playHandToRoom = (room, playerNum, updatedHand) => {
  // const
  big2Rooms[room].hands[playerNum] = updatedHand;
};

const updatePlayerHand = (room, user, cards) => {
  // Grab players hand from room object
  const roomObj = big2Rooms[room];
  const playerNum = roomObj.players[user];
  const playerHand = roomObj.hands[playerNum];
  const newPlayerHand = [];
  // Iterate over old hand
  playerHand.forEach((val) => {
    // If old hand's card is not in played cards array
    // push it to hand array
    if (cards.indexOf(val)) {
      newPlayerHand.push(val);
    }
  });
  playHandToRoom(room, playerNum, newPlayerHand);
  return newPlayerHand;
};

module.exports = {
  createCardDeck,
  shuffleCardDeck,
  dealCards,
  createGame,
  updatePlayerHand,
  playHandToRoom,
};
