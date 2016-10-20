import { expect } from 'chai';
//TODO: Import deck code here!
const buildCardDeck = () => {
  // console.log('buildCardDeck is a test function for testing');
  const deck = [];
  const suits = ['♥', '♣', '♠', '♦'];
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  suits.forEach((suit) => {
    values.forEach((value) => {
      deck.push(suit+value);
    })
  })
  console.log('deck built by buildCardDeck: ', deck);
  return deck;
};

const shuffleDeck = (deck) => {

};

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

describe('Deck shuffler', () => {
  it('should exist', () => {
    expect(shuffleDeck).to.exist;
  });

  it('should be a function', () => {
    expect(shuffleDeck).to.be.a('function');
  });

  it('should return an array', () => {
    expect(buildCardDeck()).to.be.an('array');
  });

  it('should have correct # of cards', () => {
    expect(buildCardDeck()).length.to.be(52);
  });

  it('should randomize the cards', () => {
    const orderedDeck = buildCardDeck();
    const shuffled = shuffleDeck(buildCardDeck());
  });

  it('should not produce same randomization twice', () => {

  });

  it('should contain one of every card', () => {

  });

  it('should not be a biased shuffle', () => {

  });
});
