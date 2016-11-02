import io from 'socket.io-client';

import * as t from './actionTypes';

const big2 = io('http://localhost:3000/big2');

const room = 'hostname with hash';
const cards = ['4 of clubs'];
const user = 'test user name';

// TODO: these socket emitters will be contained in actions
// That will link them to the client side
big2.on('player cards', (data) => {
  console.log('cards dealt: ', data);
});
big2.emit('connect to room', room, user);
big2.emit('play cards', room, user, cards);

export const changeUsername = username => ({
  type: t.USERNAME_CHANGE,
  username,
});

export const example = 'example';
