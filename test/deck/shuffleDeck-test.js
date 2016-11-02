import { expect } from 'chai';

import helpers from '../../server/config/helpers';

const createCardDeck = helpers.createCardDeck;
const shuffleCardDeck = helpers.shuffleCardDeck;
const checkCards = (deck) => {
  const controlDeck = createCardDeck();
  for (let i = 0; i < deck.length; i += 1) {
    if (deck.indexOf(controlDeck[i]) === -1) {
      return false;
    }
  }
  return true;
};
const shuffled1 = shuffleCardDeck();
const orderedDeck = createCardDeck();

describe('Deck shuffler', () => {
  it('should be a function', () => {
    expect(shuffleCardDeck).to.be.a('function');
  });

  it('should return an array', () => {
    expect(shuffled1).to.be.an('array');
  });

  it('should have correct # of cards', () => {
    expect(shuffled1).length.to.be(52);
  });

  it('should randomize the cards', () => {
    expect(shuffled1).to.not.eql(orderedDeck);
  });

  it('should not produce same randomization twice', () => {
    const shuffled2 = shuffleCardDeck();
    expect(shuffled1).to.not.eql(shuffled2);
  });

  it('should contain one of every card', () => {
    expect(checkCards(shuffled1)).to.equal(true);
  });

  it('should not be a biased shuffle', () => {
    expect(false).to.equal(true);
  });
});

