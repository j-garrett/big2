import io from 'socket.io-client';

import * as t from './actionTypes';

// If additional games are implemented, handle it here:
const chosenGame = 'big2';
const big2 = io(`/${chosenGame}`);

const testRoom = 'hostname with hash';
const user = `player${Math.random()}`;
// Move to listener when room is dynamic

/* ------------ REGULAR ACTIONS ---------------*/

export const changeUsername = username => ({
  type: t.USERNAME_CHANGE,
  username,
});

export const addCardToSelection = card => ({
  type: t.ADD_CARD_TO_SELECTED,
  card,
});

export const updatePlayerHand = cards => ({
  type: t.UPDATE_PLAYER_HAND,
  cards,
});

export const updateCardsInPot = cards => ({
  type: t.UPDATE_CARDS_IN_POT,
  cards,
});

/* ------------ SOCKET LISTENERS ---------------*/
// These will dispatch actions when server sends data
export const socketDispatchers = (store) => {
  big2.on('player cards', (cards) => {
    console.log('cards dealt: ', cards);
    store.dispatch(updatePlayerHand(cards));
  });
  big2.on('Room is full', (message) => {
    console.log(message);
  });
  big2.on('hand played to pot', (cards) => {
    store.dispatch(updateCardsInPot(cards));
  });
};

/* ------------ SOCKET EMITTERS ---------------*/
// These will send data to server when client dispatches actions
export const connectToRoom = room => (
  big2.emit('connect to room', room, user)
);
// Hardcoded setup
connectToRoom(testRoom);

export const playSelectedCards = cards => (
  big2.emit('play cards', testRoom, user, cards)
);
