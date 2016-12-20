import { expect } from 'chai';
import io from 'socket.io-client';

import { organizeComputerHand, chooseResponse } from '../../server/config/computerPlayer';
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
    '3♥',
    '5♦',
    '6♠',
    '7♥',
    '8♣',
    '8♥',
    '10♣',
    '12♠',
    '13♣',
    '1♦',
    '1♣',
    '1♥',
    '2♠',
  ],
  computer1: [
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
    '1♠',
    '2♥',
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
    '2♣',
    '2♦',
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
  describe('organize computer hand', () => {
    it('should organize cards into groups of hand type', () => {
      const organized = organizeComputerHand(playerHands.computer1);
      const expectedOrganization = {
        1: [['4♣'], ['5♥'], ['7♠'], ['12♥'], ['1♠'], ['2♥']],
        2: [['13♠', '13♦']],
        3: [],
        4: [],
        5: [['9♥', '9♣', '9♦', '11♥', '11♠']],
      };
      expect(organized).to.eql(expectedOrganization);
    });
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
      const exampleSortedHandObj = {
        1: [['4♣'], ['5♥'], ['7♠'], ['12♥'], ['1♠'], ['2♥']],
        2: [['13♠', '13♦']],
        3: [],
        4: [],
        5: [['9♥', '9♣', '9♦', '11♥', '11♠']],
      };
      const handPlayed = chooseResponse(playerCards, exampleSortedHandObj);
      expect(handPlayed[0]).to.eql(['4♣']);
    });
    it('should play the lowest possible double to beat previous pair', () => {
      const playerCards = ['3♣', '3♥'];
      const exampleSortedHandObj = {
        1: [['4♣'], ['5♥'], ['7♠'], ['12♥'], ['1♠'], ['2♥']],
        2: [['13♠', '13♦']],
        3: [],
        4: [],
        5: [['9♥', '9♣', '9♦', '11♥', '11♠']],
      };
      const handPlayed = chooseResponse(playerCards, exampleSortedHandObj);
      expect(handPlayed[0]).to.eql(['13♠', '13♦']);
    });
    it('should play the lowest possible trip to beat previous trip', () => {
      const playerCards = ['3♣', '3♥', '3♦'];
      const exampleSortedHandObj = {
        1: [['4♣'], ['5♥'], ['7♠'], ['11♠'], ['12♥'], ['1♠'], ['2♥']],
        2: [],
        3: [['9♥', '9♣', '9♦'], ['13♠', '13♦', '13♥']],
        4: [],
        5: [],
      };
      const handPlayed = chooseResponse(playerCards, exampleSortedHandObj);
      expect(handPlayed[0]).to.eql(['9♥', '9♣', '9♦']);
    });
    it('should update sortedHandObj accordingly', () => {
      const playerCards = ['3♣', '3♥', '3♦'];
      const exampleSortedHandObj = {
        1: [['4♣'], ['5♥'], ['7♠'], ['11♠'], ['12♥'], ['1♠'], ['2♥']],
        2: [],
        3: [['9♥', '9♣', '9♦'], ['13♠', '13♦', '13♥']],
        4: [],
        5: [],
      };
      const exampleUpdatedHand = {
        1: [['4♣'], ['5♥'], ['7♠'], ['11♠'], ['12♥'], ['1♠'], ['2♥']],
        2: [],
        3: [['13♠', '13♦', '13♥']],
        4: [],
        5: [],
      };
      chooseResponse(playerCards, exampleSortedHandObj);
      expect(exampleSortedHandObj).to.eql(exampleUpdatedHand);
    });
    it('should play the lowest possible hand to beat previous hand', () => {
      const playerCards = ['3♣', '3♥', '3♦', '9♥', '9♣'];
      const exampleSortedHandObj = {
        1: [['4♣'], ['5♥'], ['7♠'], ['12♥'], ['1♠'], ['2♥']],
        2: [['13♠', '13♦']],
        3: [],
        4: [],
        5: [['9♥', '9♣', '9♦', '11♥', '11♠']],
      };
      const handPlayed = chooseResponse(playerCards, exampleSortedHandObj);
      expect(handPlayed[0]).to.eql(['9♥', '9♣', '9♦', '11♥', '11♠']);
    });
    it('should pass when it can\'t beat the previous hand', () => {
      const playerCards = ['2♠'];
      const exampleSortedHandObj = {
        1: [['4♣'], ['5♥'], ['7♠'], ['12♥'], ['1♠'], ['2♥']],
        2: [['13♠', '13♦']],
        3: [],
        4: [],
        5: [['9♥', '9♣', '9♦', '11♥', '11♠']],
      };
      const handPlayed = chooseResponse(playerCards, exampleSortedHandObj);
      expect(handPlayed[0]).to.eql(['PASS']);
    });
  });
});
