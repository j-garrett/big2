const big2Rooms = require('./../models/big2Rooms');
const helpers = require('./../config/helpers');
const computerPlayer = require('./../config/computerPlayer');

const computerPlayerController = {
  computerPlayCards(user, room, cards, remove) {

    // TODO: we need to validate every card being played was in players hand
    const pot = big2Rooms.rooms[room].pot;
    // We need to check if previous player passed
    // If previous did pass, we need to continue looking for last played cards
    // If all players passed we will let computer play lowest single
    console.log('pot value on first play to computerPlayCards: ', pot);
    const cardsToBeat = pot.slice(-3).reverse().reduce((acc, val) => {
      if (acc === 'PASS' && val.cards[0] !== 'PASS') {
        return val.cards;
      }
      return acc;
    }, 'PASS');
    console.log('reduced array for pot to find cardsToBeat in computerPlayCards: ', cardsToBeat);
    const currentSortedCompHand = big2Rooms.rooms[room].sortedComputerHands[user];
    // pick hand using computer helpers then call updateHand with result
    const computerResponse = computerPlayer.chooseResponse(cardsToBeat, currentSortedCompHand);
    big2Rooms.rooms[room].sortedComputerHands[user] = computerResponse[1];
    // console.log('computerPlayCards computerResponse: ', computerResponse);
    const updateHand = helpers.updatePlayerHand(user, room, computerResponse[0], remove);
    // console.log('big2Rooms.rooms[room]: ', big2Rooms.rooms[room]);
    // console.log('pot from room: ', pot);
    // const prevRound = pot[pot.length - 2] || { user: '', cards: [] };
    // const curRound = pot[pot.length - 1] || { user: '', cards: [] };
    const roundsTuple = pot.slice(pot.length - 4 > 0 ? pot.length - 4 : 0);
    return ({
      updateHand,
      roundsTuple,
    });
  },
};

module.exports = computerPlayerController;
