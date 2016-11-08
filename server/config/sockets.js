const helpers = require('./helpers');
const big2Rooms = require('./../models/big2Rooms');

// This is looking like some spaghetti
module.exports = (io) => {
  const big2 = io
    .of('big2')
    .on('connection', (socket) => {
      // console.log('new big2 game socket connected');
      socket.on('connect to room', (user, room) => {
        console.log('connect to room attempted with room, user: ', room, user);
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
          console.log('new room created: ', big2Rooms);
          // Emit hand to player
          socket.emit('player cards', roomKey.hands[roomKey.players[user]]);
          // TODO: Make rooms decided by server and...
          // Emit room value to player for future client emits
        } else {
          socket.emit('Room is full',
            'The room you\'re trying to join is full.'
          );
        }
      })
      .on('play cards', (user, room, cards) => {
        // console.log('user passed to socket\'s play cards func: ', user);
        // console.log('room passed to socket\'s play cards func: ', room);
        const roomObj = big2Rooms[room];
        const pot = roomObj.pot;
        const newHand = helpers.updatePlayerHand(room, user, cards);
        // move current round to previous and update current
        pot.push({ user, cards });
        const prevRound = pot[pot.length - 2];
        const curRound = pot[pot.length - 1];
        const roundsTuple = [prevRound, curRound];
        big2.to(room).emit('hand played to pot', roundsTuple);
        socket.emit('player cards', newHand);
        console.log('big2Rooms[room] play cards func: ', big2Rooms[room]);
      })
      .on('undo played hand', (user, room) => {
        // find room and grab last hand played
      })
      .on('disconnect', () => {
        // TODO: track socket.id to remove players from room?
        // console.log('user disconnected: ', socket.id);
      });
    });
};
