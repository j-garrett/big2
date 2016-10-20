/* eslint-env mocha */

import { expect } from 'chai';

import deckController from '../../server/controllers/deckController';

const createCardDeck = deckController.createCardDeck;

describe('Playing card\'s deck createer', () => {
  it('should be a function', () => {
    expect(createCardDeck).to.be.a('function');
  });

  it('should return a deck array', () => {
    expect(createCardDeck()).to.be.an('array');
  });

  it('should have correct # of cards', () => {
    expect(createCardDeck()).length.to.be(52);
  });
});

