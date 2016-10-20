/* eslint-env mocha */

import { expect } from 'chai';

import deckController from '../../server/controllers/deckController';

const buildCardDeck = deckController.buildCardDeck;

describe('Playing card\'s deck builder', () => {
  it('should be a function', () => {
    expect(buildCardDeck).to.be.a('function');
  });

  it('should return a deck array', () => {
    expect(buildCardDeck()).to.be.an('array');
  });

  it('should have correct # of cards', () => {
    expect(buildCardDeck()).length.to.be(52);
  });
});

