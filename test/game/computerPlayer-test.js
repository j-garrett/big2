import { expect } from 'chai';

import helpers from '../../server/config/helpers';
import computer from '../../server/config/computerPlayer';
import gameController from '../../server/controllers/gameController';
import roomController from '../../server/controllers/roomController';
import big2Rooms from '../../server/models/big2Rooms';

for (let i = 0; i < 4; i +=1) {
  roomController.joinRoom(`testUser${i}`, 'testRoom', `testSocket${i}`);
}
gameController.createGame('testRoom');
const testRoom = big2Rooms.rooms['testRoom'];
// console.log('test room: ', testRoom);
const testHand1 = ['3♦'];
const testHand2 = ['3♣'];
const testHand3 = ['4♦'];
const testPair = ['4♦', '4♣'];
const invalidPair = ['4♦', '2♣'];

describe('Validator Checks', () => {
  describe('getValue', () => {
    const cardValue = computer.getValue(testHand1[0]);
    const diffCardValue = computer.getValue('13♠');
    it('should find number value for card', () => {
      expect(cardValue).to.be.an('object');
      expect(cardValue.value).to.equal(3);
      expect(diffCardValue.value).to.equal(13);
    });
    it('should find suit value for card', () => {
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
    it('should return true if card value is same and suit value is higher', () => {
      expect(isLarger).to.equal(true);
    });
    it('should return true if card value is higher and suit value is same', () => {
      expect(computer.cardIsLarger('1♦', '13♦')).to.equal(true);
    });
    it('should correctly identify Ace as higher than King', () => {
      expect(computer.cardIsLarger('1♦', '13♦')).to.equal(true);
    });
    it('should correctly identify 2 as higher than Ace', () => {
      expect(computer.cardIsLarger('2♦', '1♦')).to.equal(true);
    });
  });
  describe('suitIsMatch', () => {
    const matchedSuit = computer.suitIsMatch(testHand1[0], testHand3[0]);
    const notMatched = computer.suitIsMatch(testHand2[0], testHand1[0]);
    it('should return true if cards have same suit', () => {
      expect(matchedSuit).to.be.a('boolean');
      expect(matchedSuit).to.equal(true);
    });
    it('should return false if cards have different suit', () => {
      expect(notMatched).to.be.a('boolean');
      expect(notMatched).to.equal(false);
    });
  });
  describe('handPatternCheck', () => {
    it('should return true if hand is a single card', () => {
      const checkSingle = computer.handPatternCheck(testHand1);
      expect(checkSingle).to.be.a('boolean');
      expect(checkSingle).to.equal(true);
    });
    it('should return true if hand is two cards with same number value', () => {
      const checkDouble = computer.handPatternCheck(testPair)
      expect(checkDouble).to.be.a('boolean');
      expect(checkDouble).to.equal(true);
    });
    it('should return false if hand is two cards with different number value', () => {
      const checkDouble = computer.handPatternCheck(invalidPair)
      expect(checkDouble).to.be.a('boolean');
      expect(checkDouble).to.equal(false);
    });
    it('should return true if hand is three cards with same number value', () => {
      expect().to.be.a('boolean');
      expect().to.equal(true);
    });
    it('should return false if hand is three cards with different number value', () => {
      expect().to.be.a('boolean');
      expect().to.equal(false);
    });
    it('should return false if hand is four cards', () => {
      expect().to.be.a('boolean');
      expect().to.equal(false);
    });
    it('should return true if hand is a straight', () => {
      expect().to.be.a('boolean');
      expect().to.equal(true);
    });
    it('should return true if hand is a flush', () => {
      expect().to.be.a('boolean');
      expect().to.equal(true);
    });
    it('should return true if hand is a full house', () => {
      expect().to.be.a('boolean');
      expect().to.equal(true);
    });
    it('should return true if hand is a four of a kind', () => {
      expect().to.be.a('boolean');
      expect().to.equal(true);
    });
  });
});

xdescribe('Computer Behavior', () => {

});
