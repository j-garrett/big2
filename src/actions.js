import io from 'socket.io-client';

import * as t from './actionTypes';

const room = 'hostname with hash';
const big2 = io('http://localhost:3000/big2');

big2.on('connected', (data) => {
  console.log('connected: ', data);
});
big2.emit('connect to room', room);

export const changeUsername = username => ({
  type: t.USERNAME_CHANGE,
  username,
});

export const example = 'example';
