import { expect } from 'chai';

import helpers from '../../server/config/helpers';
import computer from '../../server/config/computerPlayer';
import gameController from '../../server/controllers/gameController';
import roomController from '../../server/controllers/roomController';
import big2Rooms from '../../server/models/big2Rooms';

for (var i = 0; i < 4; i +=1) {
  roomController.joinRoom(`testUser${i}`, 'testRoom', `testSocket${i}`);
}
gameController.createGame('testRoom');
const testRoom = big2Rooms.rooms['testRoom'];
// console.log('test room: ', testRoom);
const testHand1 = ['1♦'];
const testHand2 = ['1♣'];
const testHand3 = ['2♦'];
const invalidHand = ['1♦', '2♦'];

describe('Validator Checks', () => {
  describe('getValue', () => {
    const cardValue = computer.getValue(testHand1[0]);
    const diffCardValue = computer.getValue('13♠');
    it('should find suit value for card', () => {
      expect(cardValue).to.be.an('object');
      expect(cardValue.value).to.equal(1);
      expect(diffCardValue.value).to.equal(13);
    });
    it('should find A - K value for card', () => {
      expect(cardValue).to.be.an('object');
      expect(cardValue.suitValue).to.equal(1);
      expect(diffCardValue.suitValue).to.equal(4);
    });
  });
  describe('cardIsLarger', () => {
    const notLarger = computer.cardIsLarger(testHand1[0], testHand3[0]);
    const isLarger = computer.cardIsLarger(testHand2[0], testHand1[0]);
    it('should return false if first param is smaller', () => {
      expect(notLarger).to.be.a('boolean');
      expect(notLarger).to.equal(false);
    });
    it('should return true if first param is larger', () => {
      expect(isLarger).to.be.a('boolean');
      expect(isLarger).to.equal(true);
    });
  });
});

xdescribe('Computer Behavior', () => {

});
