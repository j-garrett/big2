import io from 'socket.io-client';

import * as t from './actionTypes';

const chosenGame = 'big2';
const big2 = io(`/${chosenGame}`);

const room = 'hostname with hash';
const user = `player${Math.random()}`;
const cards = ['4 of clubs'];

// TODO: these socket emitters will be contained in actions
// That will link them to the client side
big2.emit('connect to room', room, user);
big2.emit('play cards', room, user, cards);

big2.on('player cards', (data) => {
  console.log('cards dealt: ', data);
});
big2.on('client id', (data) => {
  console.log('client id: ', data);
});
big2.on('Room is full', (message) => {
  console.log(message);
});

export const changeUsername = username => ({
  type: t.USERNAME_CHANGE,
  username,
});

export const example = 'example';
