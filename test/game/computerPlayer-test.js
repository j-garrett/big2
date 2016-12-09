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
    '9♦',
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
    '10♠',
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
        socket.emit('connect to room', user, room);
      })
      .on('players in room', () => done());
  });
  afterEach((done) => {
    if (socket.connected) {
      socket.disconnect();
    } else {
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
      // TODO: Build out connection test more specifically
      socket.emit('create game', room);
      socket.on('player cards', (cards) => {
        expect(cards).to.be.instanceOf(Array);
        done();
      });
    });
    it('should play the lowest possible single to beat previous', () => {
      const playerCards = ['3♣'];
      const computerCards = playerHands.computer1;
      const handPlayed = computer.chooseResponse(playerCards, computerCards);
      expect(handPlayed[0]).to.equal('4♣');
    });
    it('should play the lowest possible double to beat previous pair', () => {
      const playerCards = ['3♣', '3♥'];
      const computerCards = playerHands.computer1;
      const handPlayed = computer.chooseResponse(playerCards, computerCards);
      expect(handPlayed).to.eql(['9♥', '9♣']);
    });
    it('should play the lowest possible trip to beat previous trip', () => {
      const playerCards = ['3♣', '3♥', '3♦'];
      const computerCards = playerHands.computer1;
      const handPlayed = computer.chooseResponse(playerCards, computerCards);
      expect(handPlayed).to.eql(['9♥', '9♣', '9♦']);
    });
    it('should play the lowest possible hand to beat previous hand', () => {
      const playerCards = ['3♣', '3♥', '3♦', '9♥', '9♣'];
      const computerCards = playerHands.computer1;
      const handPlayed = computer.chooseResponse(playerCards, computerCards);
      expect(handPlayed).to.eql(['9♥', '9♣', '9♦', '11♥', '11♠']);
    });
    it('should pass when it can\'t beat the previous hand', () => {
      const playerCards = ['2♠'];
      const computerCards = playerHands.computer1;
      const handPlayed = computer.chooseResponse(playerCards, computerCards);
      expect(handPlayed).to.eql(['pass']);
    });
  });
});
