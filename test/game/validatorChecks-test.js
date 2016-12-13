import { expect } from 'chai';

import computer from '../../server/config/computerPlayer';

// Set up hands to test
const testHand1 = ['3♦'];
const testHand2 = ['3♣'];
const testHand3 = ['4♦'];
const validPair = ['4♦', '4♣'];
const largerValidPair = ['8♦', '8♣'];
const invalidPair = ['4♦', '2♣'];
const validTrip = ['4♦', '4♣', '4♠'];
const invalidTrip = ['4♦', '2♣', '4♠'];
const quadHand = ['4♦', '4♣', '4♠', '4♥'];
const straight = ['3♦', '4♣', '5♠', '6♥', '7♥'];
const flush = ['4♥', '8♥', '9♥', '11♥', '13♥'];
const fullHouse = ['4♦', '4♣', '4♠', '5♥', '5♠'];
const fourOfKind = ['4♦', '4♣', '4♠', '4♥', '5♥'];
const straightFlush = ['3♥', '4♥', '5♥', '6♥', '7♥'];
const royalFlush = ['10♥', '11♥', '12♥', '13♥', '1♥'];

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
    it('should return true if card value is higher and suit value is lower', () => {
      expect(computer.cardIsLarger('1♦', '13♠')).to.equal(true);
    });
    it('should correctly identify Ace as higher than King', () => {
      expect(computer.cardIsLarger('1♦', '13♦')).to.equal(true);
    });
    it('should correctly identify 2 as higher than Ace', () => {
      expect(computer.cardIsLarger('2♦', '1♦')).to.equal(true);
    });
  });
  describe('handIsLarger', () => {
    describe('single card played', () => {
      it('returns true if first card is larger', () => {
        expect(computer.handIsLarger(testHand3, testHand2)).to.equal(true);
      });
      it('returns false if first card is smaller', () => {
        expect(computer.handIsLarger(testHand2, testHand3)).to.equal(false);
      });
    });
    describe('pair played', () => {
      it('returns true if first pair is larger', () => {
        expect(computer.handIsLarger(largerValidPair, validPair)).to.equal(true);
      });
      it('returns false if first pair is smaller', () => {
        expect(computer.handIsLarger(validPair, largerValidPair)).to.equal(false);
      });
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
    it('should return a boolean', () => {
      const checkSingle = computer.handPatternCheck(testHand1);
      expect(checkSingle).to.be.a('boolean');
    });
    it('should return true if hand is a single card', () => {
      const checkSingle = computer.handPatternCheck(testHand1);
      expect(checkSingle).to.equal(true);
    });
    it('should return true if hand is two cards with same number value', () => {
      const checkDouble = computer.handPatternCheck(validPair);
      expect(checkDouble).to.equal(true);
    });
    it('should return false if hand is two cards with different number value', () => {
      const checkDouble = computer.handPatternCheck(invalidPair);
      expect(checkDouble).to.equal(false);
    });
    it('should return true if hand is three cards with same number value', () => {
      const checkTriple = computer.handPatternCheck(validTrip);
      expect(checkTriple).to.equal(true);
    });
    it('should return false if hand is three cards with different number value', () => {
      const checkTriple = computer.handPatternCheck(invalidTrip);
      expect(checkTriple).to.equal(false);
    });
    it('should return false if hand is four cards', () => {
      const checkQuad = computer.handPatternCheck(quadHand);
      expect(checkQuad).to.equal(false);
    });
    it('should return false if hand is more than five cards', () => {
      const checkDoubleQuad = computer.handPatternCheck(quadHand.concat(quadHand));
      expect(checkDoubleQuad).to.equal(false);
    });
    xit('should return true if hand is a straight', () => {
      const checkStraight = computer.handPatternCheck(straight);
      expect(checkStraight).to.equal(true);
    });
    xit('should return true if hand is a flush', () => {
      const checkFlush = computer.handPatternCheck(flush);
      expect(checkFlush).to.equal(true);
    });
    xit('should return true if hand is a full house', () => {
      const checkFullHouse = computer.handPatternCheck(fullHouse);
      expect(checkFullHouse).to.equal(true);
    });
    xit('should return true if hand is a four of a kind', () => {
      const checkFourOfKind = computer.handPatternCheck(fourOfKind);
      expect(checkFourOfKind).to.equal(true);
    });
    xit('should return true if hand is a straight flush', () => {
      const checkStraightFlush = computer.handPatternCheck(straightFlush);
      expect(checkStraightFlush).to.equal(true);
    });
    xit('should return true if hand is a royal flush', () => {
      const checkroyalFlush = computer.handPatternCheck(royalFlush);
      expect(checkroyalFlush).to.equal(true);
    });
  });
});
