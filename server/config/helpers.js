const rooms = require('./../models/big2Rooms').rooms;

const createCardDeck = () => {
  const deck = [];
  const suits = ['♥', '♣', '♠', '♦'];
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push(value + suit);
    });
  });
  return deck;
};

const getPlayerSocket = (user, room) => {
  const socketMap = rooms[room].socketMap;
  return Object.keys(socketMap).reduce((acc, val) => {
    if (socketMap[val] === user) {
      return acc + val;
    }
    return acc;
  }, '');
};

const getPlayersHand = (user, room) => rooms[room].playerHands[user];

const sortPlayerHand = (a, b) => {
  let firstNum;
  let secondNum;
  if (a.length === 3) {
    firstNum = a.slice(0, 2);
  } else {
    firstNum = a[0];
  }
  if (b.length === 3) {
    secondNum = b.slice(0, 2);
  } else {
    secondNum = b[0];
  }
  return parseInt(firstNum, 10) - parseInt(secondNum, 10);
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

const dealCards = (numPlayers) => {
  const deck = shuffleCardDeck();
  const handSize = deck.length / numPlayers;
  const hands = [];
  for (let i = 0; i < numPlayers; i += 1) {
    const startIndex = i * handSize;
    const endIndex = startIndex + handSize;
    hands
      .push(
        deck
          .slice(startIndex, endIndex)
          .sort(sortPlayerHand)
      );
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
    pot: [{ user: '', cards: [] }, { user: '', cards: [] }, { user: '', cards: [] }, { user: '', cards: [] }],
    turn: 'player1',
    roundStartedBy: 'player1',
  };
};

// const playHandToRoom = (room, playerNum, updatedHand) => {
//   // const
//   rooms[room].hands[playerNum] = updatedHand;
// };

const updatePlayerHand = (user, room, cards, remove) => {
  // TODO: Separate updating pot from updating player hand
  // Grab players hand from room object
  let previousPlayerSocket = '';
  let newPlayerHand = [];
  const playerHand = rooms[room].playerHands[user];
  const validatedHand = [];
  // console.log('attempted to play bad cards: ', cards);
  // Iterate over old hand
  if (cards[0] === 'PASS') {
    rooms[room].pot.push({ user, cards });
    newPlayerHand = playerHand;
  } else if (remove === true) {
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
    rooms[room].playerHands[user] = newPlayerHand;
    rooms[room].pot.push({ user, cards: validatedHand });
  } else {
    const previousPot = rooms[room].pot;
    const previousHand = previousPot.pop();
    const previousPlayer = previousHand.user;
    const previousCards = previousHand.cards;
    previousPlayerSocket = getPlayerSocket(previousPlayer, room);
    const curHand = rooms[room].playerHands[previousPlayer];
    rooms[room].playerHands[previousPlayer] = curHand.concat(previousCards);
    newPlayerHand = rooms[room].playerHands[previousPlayer];
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
  getPlayersHand,
};
