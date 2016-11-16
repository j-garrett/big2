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

const getPlayerSocket = (user, room) => {
  const socketMap = big2Rooms.rooms[room].socketMap;
  return Object.keys(socketMap).reduce((acc, val) => {
    if (socketMap[val] === user) {
      return acc + val;
    }
    return acc;
  }, '');
};

const shuffleCardDeck = () => {
  const deck = createCardDeck();
  for (let i = 0; i < deck.length; i += 1) {
    let swapCardIndex = Math.floor(Math.random() * (deck.length - i)) + i;
    let newCard = deck[swapCardIndex];
    deck[swapCardIndex] = deck[i];
    deck[i] = newCard;
  }
  return deck;
};

const dealCards = (numPlayers) => {
  const deck = shuffleCardDeck();
  const handSize = deck.length / numPlayers;
  let hands = [];
  for (let i = 0; i < numPlayers; i += 1) {
    let startIndex = i * handSize;
    let endIndex = startIndex + handSize;
    hands.push(deck.slice(startIndex, endIndex));
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
    socketMap: {

    },
    pot: [{ user: '', cards: [] }, { user: '', cards: [] }],
    turn: 'player1',
    roundStartedBy: 'player1',
  };
};

// const playHandToRoom = (room, playerNum, updatedHand) => {
//   // const
//   big2Rooms.rooms[room].hands[playerNum] = updatedHand;
// };

const updatePlayerHand = (user, room, cards, remove) => {
  // Grab players hand from room object
  let previousPlayerSocket = '';
  let newPlayerHand = [];
  const playerHand = big2Rooms.rooms[room].playerHands[user];
  const validatedHand = [];
  let prevUserSocket = '';
  // console.log('attempted to play bad cards: ', cards);
  // Iterate over old hand
  if (remove === true) {
    playerHand.forEach((val) => {
      // If old hand's card is not in played cards array
      // push it to hand array
      if (cards.indexOf(val) === -1) {
        newPlayerHand.push(val);
      } else {
        // console.log('val ', val);
        validatedHand.push(val);
      }
    });
    big2Rooms.rooms[room].playerHands[user] = newPlayerHand;
    big2Rooms.rooms[room].pot.push({ user, cards: validatedHand });
  } else {
    const previousPot = big2Rooms.rooms[room].pot;
    const previousHand = previousPot.pop();
    const previousPlayer = previousHand.user;
    const previousCards = previousHand.cards;
    previousPlayerSocket = getPlayerSocket(previousPlayer, room);
    const curHand = big2Rooms.rooms[room].playerHands[previousPlayer];
    big2Rooms.rooms[room].playerHands[previousPlayer] = curHand.concat(previousCards);
    newPlayerHand = big2Rooms.rooms[room].playerHands[previousPlayer];
  }
  return {
    previousPlayerSocket,
    newPlayerHand,
  };
};

module.exports = {
  createCardDeck,
  shuffleCardDeck,
  dealCards,
  createGame,
  updatePlayerHand,
};
