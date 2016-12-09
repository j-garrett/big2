import { expect } from 'chai';
import io from 'socket.io-client';

import computer from '../../server/config/computerPlayer';
import gameController from '../../server/controllers/gameController';
import roomController from '../../server/controllers/roomController';

for (let i = 0; i < 4; i += 1) {
  roomController.joinRoom(`testUser${i}`, 'testRoom', `testSocket${i}`);
}
gameController.createGame('testRoom');
// Set up socket.io connection for tests
const chosenGame = 'big2';
let socket;
const user = 'jon';
const room = 'jon';
const playerHands = {
  jon: [
    '1♦',
    '1♣',
    '1♥',
    '2♠',
    '3♥',
    '5♦',
    '6♠',
    '7♥',
    '8♣',
    '8♥',
    '10♣',
    '12♠',
    '13♣',
  ],
  computer1: [
    '1♠',
    '2♥',
    '4♣',
    '5♥',
    '7♠',
    '9♥',
    '9♣',
    '10♠',
    '11♥',
    '11♠',
    '12♥',
    '13♠',
    '13♦',
  ],
  computer2: [
    '3♠',
    '4♠',
    '4♥',
    '6♥',
    '6♣',
    '7♣',
    '8♠',
    '9♠',
    '9♦',
    '10♦',
    '10♥',
    '12♣',
    '12♦',
  ],
  computer3: [
    '2♣',
    '2♦',
    '3♣',
    '3♦',
    '4♦',
    '5♠',
    '5♣',
    '6♦',
    '7♦',
    '8♦',
    '11♦',
    '11♣',
    '13♥',
  ],
};
/*
These tests will emulate a player playing and then see if the computer plays in response.

First we will test the functions that will take in previous hand and respond with the computer's played cards.
*/

describe('Computer Behavior', () => {
  beforeEach((done) => {
    socket = io.connect(`http://localhost:9090/${chosenGame}`);
    socket
      .on('connect', () => {
        console.log('successful connection');
        socket.emit('connect to room', user, room);
      })
      .on('players in room', (data) => {
        console.log('heard players in room event with data: ', data);
        done();
      });
  });
  afterEach((done) => {
    // Cleanup
    if (socket.connected) {
      console.log('disconnecting...');
      socket.disconnect();
    } else {
      // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...)
      console.log('no connection to break...');
    }
    done();
  });
  it('should recognize when it is a computer player\'s turn', () => {
    socket.emit('play cards', user, room, ['cards']);
    expect(true).to.equal(true);
  });
  describe('emulate playing a hand', () => {
    it('should receive cards', (done) => {
      socket.emit('create game', room);
      socket.on('player cards', (cards) => {
        console.log('player cards received: ', cards);
        expect(true).to.equal(true);
        done();
      });
    });
    it('should play the lowest possible single to beat previous', () => {
      const playerCards = ['3♣'];
      const computerCards = playerHands.computer1;
      const handPlayed = computer.chooseResponse(playerCards, computerCards);
      expect(handPlayed[0]).to.equal('4♣');
    });
  });
});
