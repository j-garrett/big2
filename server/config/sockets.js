const helpers = require('./helpers');
const big2Rooms = require('./big2Rooms');

// This is looking like some spaghetti
module.exports = (io) => {
  io
    .of('big2')
    .on('connection', (socket) => {
      // console.log('new big2 game socket connected');
      socket.on('connect to room', (room, user) => {
        // If there is no room, then create it and join
        if (!big2Rooms[room]) {
          // For now, we will create a room key/ value on the rooms object
          big2Rooms[room] = helpers.createGame();
        }
        const numOfPlayers = Object.keys(big2Rooms[room].players).length;
        if (numOfPlayers < 4) {
          socket.join(room);
          const roomKey = big2Rooms[room];
          // Make sure user is not already connected
          // Assign them value in rotation if they aren't
          roomKey.players[user] = roomKey.players[user] || `player${numOfPlayers + 1}`;
          // console.log('new room created: ', big2Rooms);
          // Emit hand to player
          socket.emit('player cards', roomKey.hands[roomKey.players[user]]);
          // TODO: Make rooms decided by server and...
          // Emit room value to player for future client emits
        } else {
          socket.emit('Room is full',
            'The room you\'re trying to join is full.'
          );
        }
      });
      socket.on('play cards', (room, user, cards) => {
        const roomKey = big2Rooms[room];
        socket.emit('player cards', roomKey.hands[roomKey.players[user]]);
        socket.to(room).emit('cards played', cards);
      });
      socket.on('disconnect', () => {
        // TODO: track socket.id to remove players from room?
        // console.log('user disconnected: ', socket.id);
      });
    });
};
