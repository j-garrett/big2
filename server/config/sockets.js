const helpers = require('./helpers');
const big2Rooms = require('./big2Rooms');

module.exports = (io) => {
  io
    .of('big2')
    .on('connection', (socket) => {
      console.log('new big2 game socket connected');
      socket.on('connect to room', (room, user) => {
        // If there is no room, then create it and join
        if (!big2Rooms[room]) {
          // For now, we will create a room key/ value on the rooms object
          big2Rooms[room] = helpers.createGame();
        }
        if (Object.keys(big2Rooms[room].players).length < 4) {
          socket.join(room);
          // Make sure user is not already connected
          // Assign them value in rotation if they aren't
          big2Rooms[room].players[user] = big2Rooms[room].players[user] || 'player2';
          console.log('new room created: ', big2Rooms);
          // Emit hand to player
          socket.emit('player cards',
            big2Rooms[room].hands[big2Rooms[room].players[user]]
          );
          // TODO: Make rooms decided by server and...
          // Emit room value to player for future client emits
        } else {
          socket.emit('error',
            'The room you\'re trying to join is full.'
          );
        }
      });
    });
};
