import io from 'socket.io-client';

import * as t from './actionTypes';

// If additional games are implemented, handle it here:
const chosenGame = 'big2';
const big2 = io(`/${chosenGame}`);

// Move to listener when room is dynamic

/*------------ SOCKET LISTENERS ---------------*/
// These will dispatch actions when server sends data
export const socketDispatchers = (store) => {
  big2.on('player cards', (cards) => {
    console.log('cards dealt: ', cards);
    store.dispatch(updatePlayerHand(cards));
  });
  big2.on('Room is full', (message) => {
    console.log(message);
  });
}

/*------------ SOCKET EMITTERS ---------------*/
// These will send data to server when client dispatches actions
export const connectToRoom = room => (
  big2.emit('connect to room', room, user)
);
// Hardcoded setup
const room = 'hostname with hash';
const user = `player${Math.random()}`;
const cards = ['4 of clubs'];
connectToRoom(room);

export const playSelectedCards = cards => (
  big2.emit('play cards', room, user, cards)
);

/*------------ REGULAR ACTIONS ---------------*/

export const changeUsername = username => ({
  type: t.USERNAME_CHANGE,
  username,
});

export const addCardToSelection = card => ({
  type: t.ADD_CARD_TO_SELECTED,
  card,
})

export const updatePlayerHand = cards => ({
  type: t.UPDATE_PLAYER_HAND,
  cards,
});
