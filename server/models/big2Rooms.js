// Example change to playersObj where data is grouped by player
const playerHands = {
  user: [],
};
// When someone disconnects, we look up their socket id
// Should we use their socketId as their key?
// We could create a socket map...
// We don't NEED constant time lookup
// Number of players won't be enough for linear to be bad
const socketMap = {
  '/big2#BcXhq7G1rnvehh7gAAAA': 'user name',
  socketId: 'second user\'s name',
};

// Then we can use a turn order array to loop through
const turnOrder = [
  'user1',
  'user2',
  'user3',
  'user4',
];

// Number tracking index that is set to 0 when it hits array length
const turn = 0;

const model = {
  roomName: {
    playerHands,
    socketMap,
    turnOrder,
    turn,
    pot: [],
  },
};

module.exports = {
  rooms: {
    // Room name key is created on room creation
    'example room name': {
      // Add players as they join the room
      players: {
        'first user': '1',
        'second user': '2',
        'third user': '3',
        'fourth user': '4',
      },
      // Following keys are created by createGame helper.js function
      hands: {
        1: '[object]',
        2: '[object]',
        3: '[object]',
        4: '[object]',
      },
      // Each hand played will increment a counter to track which round
      pot: [
        {
          user: 'first user',
          cards: [],
        },
      ],
      // Track whose turn it is so others can't play out of turn
      turn: 'player1',
      // Track who started the round to know when they gain control
      roundStartedBy: 'player1',
    },
  },
  model,
};
