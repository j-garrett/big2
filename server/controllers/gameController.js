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
};

module.exports = gameController;
