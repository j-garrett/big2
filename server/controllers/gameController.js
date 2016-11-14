const big2Rooms = require('./../models/big2Rooms');
const helpers = require('./../config/helpers');

const gameController = {
  playCards(user, room, cards) {
    const pot = big2Rooms[room].pot;
    const newHand = helpers.updatePlayerHand(room, user, cards, true);
    pot.push({ user, cards });
    const prevRound = pot[pot.length - 2];
    const curRound = pot[pot.length - 1];
    const roundsTuple = [prevRound, curRound];
    return {
      newHand,
      roundsTuple,
    };
  },
  createGame() {
    // TODO: Shuffle deck and deal cards
    // Check for which player has lowest card
    // Change turn value to their index in turnOrder
    // Emit to each socket their cards
  },
};

module.exports = gameController;
