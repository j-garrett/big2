import { expect } from 'chai';

import deckController from '../../server/controllers/deckController';

const buildCardDeck = deckController.buildCardDeck;
const shuffleCardDeck = deckController.shuffleCardDeck;

describe('Deck shuffler', () => {
  it('should be a function', () => {
    expect(shuffleCardDeck).to.be.a('function');
  });

  it('should return an array', () => {
    expect(shuffleCardDeck()).to.be.an('array');
  });

  it('should have correct # of cards', () => {
    expect(shuffleCardDeck()).length.to.be(52);
  });

  it('should randomize the cards', () => {
    const orderedDeck = buildCardDeck();
    const shuffled = shuffleCardDeck(buildCardDeck());
  });

  it('should not produce same randomization twice', () => {

  });

  it('should contain one of every card', () => {

  });

  it('should not be a biased shuffle', () => {

  });
});

