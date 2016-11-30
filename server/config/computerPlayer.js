const big2Rooms = require('./../models/big2Rooms');

const suitValue = {
  '♦': 1,
  '♣': 2,
  '♥': 3,
  '♠': 4,
};

const selectHand = () => {
  // Return hand that is valid
};

const getValue = (card) => {
  const value = parseInt(card.slice(0, card.length - 1));
  const suit = card[card.length - 1];
  const suitValue = suitValue[suit];
  return {
    value,
    suitValue
  };
};

const cardIsLarger = (card1, card2) => {
  const card1Val = getValue(card1);
  const card2Val = getValue(card2);
  return card1Val.value > card2Val.value
        && card1Val.suitValue > card1Val.suitVale;
};

const suitIsMatch = (card1, card2) =>
  getValue(card1).suitValue === getValue(card2).suitValue;

const valueIsMatch = (card1, card2) =>
  getValue(card1).value === getValue(card2).value;

// only worry about singles, pairs, and trips for now
// TODO: Make this function check for legal poker hands
const handPatternCheck = hand => {

}
//   hand.reduce((acc, val) =>
//     acc && valueIsMatch(acc, val) ? val : false,
//     hand[0]);
// }

const handIsLarger = (hand, previousHand) =>
  hand.length === previousHand.length
  && hand.reduce((acc, val, idx) =>
    cardIsLarger(val, previousHand[idx]),
    false);

// TODO: Make sure hands are properly sorted for index compares
const validCheck = (hand, previousHand) =>
  handPatternCheck(hand)
      && handPatternCheck(previousHand)
      && handIsLarger(hand, previousHand);

module.exports = {
  selectHand,
  validCheck,
}
