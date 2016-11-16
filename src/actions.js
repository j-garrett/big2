import io from 'socket.io-client';

import * as t from './actionTypes';

// If additional games are implemented, handle it here:
const chosenGame = 'big2';
const big2 = io(`/${chosenGame}`);

// const testRoom = 'hostname with hash';
// const user = `player${Math.random()}`;
// Move to listener when room is dynamic

/* ------------ REGULAR ACTIONS ---------------*/

export const changeUsername = username => ({
  type: t.USERNAME_CHANGE,
  username,
});

export const changeRoom = room => ({
  type: t.ROOM_CHANGE,
  room,
});

export const addCardToSelection = card => ({
  type: t.ADD_CARD_TO_SELECTED,
  card,
});

export const clearCardsFromSelection = () => ({
  type: t.CLEAR_CARDS_FROM_SELECTION,
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
  big2.on('problem joining room', (message) => {
    console.log(message);
  });
  big2.on('hand played to pot', (cards) => {
    console.log('hand played to pot received from server: ', cards);
    store.dispatch(updateCardsInPot(cards));
  });
  big2.on('hand removed from pot', (cards) => {
    console.log('hand removed from pot received from server: ', cards);
    store.dispatch(updateCardsInPot(cards));
  });
  big2.on('players in room', (turnOrder => console.log('turnOrder needs dispatch: ', turnOrder)));
};

/* ------------ SOCKET EMITTERS ---------------*/
// These will send data to server when client dispatches actions
export const connectToRoom = (user, room) => (
  big2.emit('connect to room', user, room)
);
// Hardcoded setup
// connectToRoom(testRoom);

export const playSelectedCards = (user, room, cards) => (
  big2.emit('play cards', user, room, cards)
);

export const undoPlayedHand = (user, room) => (
  big2.emit('undo played hand', user, room)
);

export const beginGame = room => (
  big2.emit('create game', room)
);
