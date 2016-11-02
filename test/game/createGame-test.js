import { expect } from 'chai';

import gameController from '../../server/controllers/gameController';

const createGame = gameController.createGame;

describe('New game instance', () => {
  const game = createGame();
  it('should be created by a function', () => {
    expect(createGame).to.be.a('function');
  });
  it('should be an object', () => {
    expect(game).to.be.an('object');
  });
  it('should have hands for each player', () => {
    expect(game.player1).to.be.instanceOf(Array);
    expect(game.player2).to.be.instanceOf(Array);
    expect(game.player3).to.be.instanceOf(Array);
    expect(game.player4).to.be.instanceOf(Array);
  });
  it('should have a pot object to track rounds', () => {
    expect(game.pot).to.be.an('object');
    expect(game.pot.r1).to.be.instanceOf(Array);
  });
  it('should track whose turn it is', () => {
    expect(game.turn).to.be.a('string');
  });
  it('should track who started the round', () => {
    expect(game.control).to.be.a('string');
  });
});

