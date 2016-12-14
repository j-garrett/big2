// Example change to playersObj where data is grouped by player
const playerHands = {};
// When someone disconnects, we look up their socket id
// Should we use their socketId as their key?
// We could create a socket map...
// We don't NEED constant time lookup
// Number of players won't be enough for linear to be bad
const socketMap = {};

// Then we can use a turn order array to loop through
const turnOrderExample = [
  'user1',
  'user2',
  'user3',
  'user4',
];

const turnOrder = [];

// Number tracking index that is set to 0 when it hits array length
const turn = 0;

const model = {
  playerHands,
  socketMap,
  turnOrder,
  turn,
  pot: [],
};

class Big2Room {
  constructor() {
    this.playerHands = {};
    this.sortedComputerHands = {};
    this.socketMap = {};
    this.turnOrder = [];
    this.turn = 0;
    this.pot = [];
  }
}

module.exports = {
  rooms: {},
  model,
  Big2Room,
};
