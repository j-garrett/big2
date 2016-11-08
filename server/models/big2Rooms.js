module.exports = {
  // Room name key is created on room creation
  'example room name': {
    // Add players as they join the room
    players: {
      'first user': 'player1',
      'second user': 'player2',
      'third user': 'player3',
      'fourth user': 'player4',
    },
    // Following keys are created by createGame helper.js function
    hands: {
      player1: '[object]',
      player2: '[object]',
      player3: '[object]',
      player4: '[object]',
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
};
