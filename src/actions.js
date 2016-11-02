import * as t from './actionTypes';
import io from 'socket.io-client';

const big2 = io.connect('http://localhost:3000/big2');

big2.emit('other event');

export const changeUsername = username => ({
  type: t.USERNAME_CHANGE,
  username,
});

export const example = 'example';
