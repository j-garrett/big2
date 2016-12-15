const rooms = require('./../models/big2Rooms').rooms;

const suitValueMap = {
  '♦': 1,
  '♣': 2,
  '♥': 3,
  '♠': 4,
};

const handTypeMap = {
  straight: 1,
  flush: 2,
  fullHouse: 3,
  fourOfKind: 4,
  straightFlush: 5,
  royalFlush: 6,
};

const selectHand = (user, room) => {
  // Return hand that is valid
  const previousHand = rooms[room].pot.slice(-1, 1);
  return previousHand;
};

const getValue = (card) => {
  let value = parseInt(card.slice(0, card.length - 1), 10);
  value = value === 1 ? 14 : value;
  value = value === 2 ? 15 : value;
  const suit = card[card.length - 1];
  const suitValue = suitValueMap[suit];
  return {
    value,
    suitValue,
  };
};

// Returns true if card1 is larger than card2
const cardIsLarger = (card1, card2) => {
  const card1Val = getValue(card1);
  const card2Val = getValue(card2);
  if (card1Val.value > card2Val.value) {
    return true;
  } else if (card1Val.value === card2Val.value && card1Val.suitValue >= card2Val.suitValue) {
    return true;
  }
  return false;
};

const suitIsMatch = (card1, card2) =>
  getValue(card1).suitValue === getValue(card2).suitValue;

const valueIsMatch = (card1, card2) =>
  getValue(card1).value === getValue(card2).value;

// only worry about singles, pairs, and trips for now
// TODO: Make this function check for legal poker hands
const handPatternCheck = (hand) => {
  let result = true;
  if (hand.length === 4 || hand.length > 5) {
    return false;
  }
  if (hand.length < 4) {
    for (let i = 1; i < hand.length; i += 1) {
      result = valueIsMatch(hand[i - 1], hand[i]) && result;
    }
  } else {
    // TODO: Check for 5 card hand patterns here
  }
  return result;
};

const handIsLarger = (hand, previousHand) =>
  hand.length === previousHand.length
    && hand.reduce((acc, val, idx) => cardIsLarger(val, previousHand[idx]), false);

const validCheck = (hand, previousHand) =>
  handPatternCheck(hand)
    && handIsLarger(hand, previousHand);

const organizeComputerHand = (dealtCards) => {
  let newHand;
  const organized = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };
  const finalGroup = dealtCards.reduce((acc, cur) => {
    const newRun = [cur];
    if (acc.length === 0) {
      return newRun;
    }
    if (valueIsMatch(acc[0], newRun[0])) {
      return acc.concat(newRun);
    }
    organized[acc.length].push(acc);
    return newRun;
  }, []);
  organized[finalGroup.length].push(finalGroup);
  // Check for four of a kind
  if (organized['4'].length > 0) {
    newHand = organized['4'].shift().concat(organized['1'].shift());
    organized['5'].push(newHand);
  }
  // Check for full house
  if (organized['3'].length > 0 && organized['2'].length > 0) {
    newHand = organized['3'].shift().concat(organized['2'].shift());
    organized['5'].push(newHand);
  }
  // Check for straights

  // Check for flushes <-- wait until it won't break apart better options

  return organized;
};

const chooseResponse = (cardsPlayed, sortedCompHand) => {
  // console.log('chooseResponse sortedCompHand: ', sortedCompHand);
  // console.log('chooseResponse cardsPlayed: ', cardsPlayed);
  let played = ['PASS'];

  // We are slicing so we will only get pass if ALL other players passed
  if (cardsPlayed[0] === 'PASS') {
    // Loop through possible cards to play and play the lowest
    // Keys are based on number of cards able to play
    // We will play our lowest single, but play bigger hands if no singles
    for (let i = 1; i < 6; i += 1) {
      if (sortedCompHand[i].length > 0) {
        // set lowest card to played variable
        played = sortedCompHand[i][0];
        // remove it from the player hand
        sortedCompHand[i].shift();
        // return tuple of played and sortedHand
        return [played, sortedCompHand];
      }
    }
  }

  const options = sortedCompHand[cardsPlayed.length];
  for (let i = 0; i < options.length; i += 1) {
    if (handIsLarger(options[i], cardsPlayed)) {
      played = options[i];
      sortedCompHand[cardsPlayed.length].splice(i, 1);
      break;
    }
  }
  return [played, sortedCompHand];
};

module.exports = {
  suitValueMap,
  handTypeMap,
  selectHand,
  getValue,
  cardIsLarger,
  suitIsMatch,
  valueIsMatch,
  handPatternCheck,
  handIsLarger,
  validCheck,
  organizeComputerHand,
  chooseResponse,
};
