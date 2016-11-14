const helpers = require('./helpers');
const big2Rooms = require('./../models/big2Rooms');
const gameController = require('./../controllers/gameController');

// This is looking like some spaghetti
module.exports = (io, app) => {
  const big2 = io.of('big2');
  big2
  .on('connection', (socket) => {
    socket
      .on('connect to room', (user, room) => {
        if (!big2Rooms[room]) {
          big2Rooms[room] = helpers.createGame();
        }
        const numOfPlayers = Object.keys(big2Rooms[room].players).length;
        if (big2Rooms[room].players[user] !== undefined) {
          socket.emit('Room is full', 'That name is already taken.');
          return;
        }
        if (numOfPlayers < 4) {
          socket.join(room);
          const roomKey = big2Rooms[room];
          // Assign them value in rotation if they aren't
          roomKey.players[user] = numOfPlayers;
          // Add user name to socket map so we can remove them on disconnect
          roomKey.socketMap[socket.id] = user;
          // Emit hand to player
          socket.emit('player cards', roomKey.hands[roomKey.players[user]]);
          const pot = big2Rooms[room].pot;
          const roundsTuple = [
            pot[pot.length - 2],
            pot[pot.length - 1],
          ];
          socket.emit('hand played to pot', roundsTuple);
        } else {
          socket.emit('Room is full',
            'The room you\'re trying to join is full.'
          );
        }
      })
    .on('play cards', (user, room, cards) => {
      const played = gameController.playCards(user, room, cards);
      big2.to(room).emit('hand played to pot', played.roundsTuple);
      socket.emit('player cards', played.newHand);
    })
    .on('undo played hand', (user, room) => {
      // find room and grab last hand played
      if (big2Rooms[room]) {
        const pot = big2Rooms[room].pot;
        const cards = pot[pot.length - 1].cards;
        // Check that that value matches user submitted to undo played hand
        // and that the socket.id and user match as well
        if (user === pot[pot.length - 1].user) {
          // Then add the cards back to hand and update/emit pot and hand
          const newHand = helpers.updatePlayerHand(room, user, cards, false);
          pot.pop();
          const prevRound = pot[pot.length - 2];
          const curRound = pot[pot.length - 1];
          const roundsTuple = [prevRound, curRound];
          big2.to(room).emit('hand removed from pot', roundsTuple);
          socket.emit('player cards', newHand);
        }
      }
    })
    .on('disconnecting', () => {
      // There will be two values in rooms object
      // One will match the socket.id
      // The other will be the game room they are in
      // We'll use socket.id to find user value and remove that value form room they're in
      const gameRoomKey = Object.keys(socket.rooms)[1];
      if (big2Rooms[gameRoomKey]) {
        const user = big2Rooms[gameRoomKey].socketMap[socket.id];
        delete big2Rooms[gameRoomKey].players[user];
      }
    });
  });
};
