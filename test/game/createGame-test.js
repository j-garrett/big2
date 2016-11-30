import { expect } from 'chai';

import helpers from '../../server/config/helpers';

// TODO: This work is now done by gameController.createGame
xdescribe('New game instance', () => {
  // const game = createGame();
  it('should be created by a function', () => {
    expect(createGame).to.be.a('function');
  });
  it('should be an object', () => {
    expect(game).to.be.an('object');
  });
  xit('should have hands for each player', () => {
    expect(game.player1).to.be.instanceOf(Array);
    expect(game.player2).to.be.instanceOf(Array);
    expect(game.player3).to.be.instanceOf(Array);
    expect(game.player4).to.be.instanceOf(Array);
  });
  it('should have a pot array to track rounds', () => {
    expect(game.pot).to.be.instanceOf(Array);
  });
  it('should use objects to represent a round', () => {
    expect(game.pot[0]).to.be.an('object');
  })
  xit('should track whose turn it is with an array', () => {
    expect(game.turnOrder).to.be.instanceOf(Array);
    expect(game.turnOrder.length).to.be(4)
  });
  it('should track who started the round', () => {
    expect(game.turn).to.be.a('string');
  });
});

