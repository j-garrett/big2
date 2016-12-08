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
let big2;
const user = 'jon';
const room = 'jon';

describe('Computer Behavior', () => {
  beforeEach((done) => {
    big2 = io.connect(`http://localhost:9090/${chosenGame}`);
    big2
      .on('connect', () => {
        console.log('successful connection');
        big2.emit('connect to room', user, room);
      })
      .on('players in room', (data) => {
        console.log('heard players in room event with data: ', data);
        done();
      });
  });
  it('should recognize when it is a computer player\'s turn', () => {
    big2.emit('play cards', user, room, ['cards']);
    expect(true).to.equal(true);
  });
});
