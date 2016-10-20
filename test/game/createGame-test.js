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
    expect(game.p1).to.be.an('array');
    expect(game.p2).to.be.an('array');
    expect(game.p3).to.be.an('array');
    expect(game.p4).to.be.an('array');
  });
  it('should have a pot object to track rounds', () => {
    expect(game.pot).to.be.an('array');
    expect(game.pot.r1).to.be.an('array');
  });
  it('should track whose turn it is', () => {
    expect(game.turn).to.be.a('string');
  });
  it('should track who started the round', () => {
    expect(game.control).to.be.a('string');
  });
});

