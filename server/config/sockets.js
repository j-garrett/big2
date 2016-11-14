const helpers = require('./helpers');
const big2Rooms = require('./../models/big2Rooms');

// This is looking like some spaghetti
module.exports = (io, app) => {
  const big2 = io.of('big2');
  big2.on('connection', (socket) => {
    socket.on('connect to room', (user, room) => {

      if (!big2Rooms[room]) {
        big2Rooms[room] = helpers.createGame();
      }
      const numOfPlayers = Object.keys(big2Rooms[room].players).length;
      if (numOfPlayers < 4) {
        socket.join(room);
        const roomKey = big2Rooms[room];
        // Make sure user is not already connected
        // Assign them value in rotation if they aren't
        roomKey.players[user] = roomKey.players[user] || numOfPlayers;
        // Add user name to socket map so we can remove them on disconnect
        roomKey.socketMap[socket.id] = user;
        // console.log('rooms vals at connect to room event: ', big2Rooms);
        // Emit hand to player
        socket.emit('player cards', roomKey.hands[roomKey.players[user]]);
        const roomObj = big2Rooms[room];
        const pot = roomObj.pot;
        // move current round to previous and update current
        const prevRound = pot[pot.length - 2];
        const curRound = pot[pot.length - 1];
        const roundsTuple = [prevRound, curRound];
        socket.emit('hand played to pot', roundsTuple);
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
      const newHand = helpers.updatePlayerHand(room, user, cards, true);
      // move current round to previous and update current
      pot.push({ user, cards });
      const prevRound = pot[pot.length - 2];
      const curRound = pot[pot.length - 1];
      const roundsTuple = [prevRound, curRound];
      big2.to(room).emit('hand played to pot', roundsTuple);
      socket.emit('player cards', newHand);
      // console.log('big2Rooms[room] play cards func: ', big2Rooms[room]);
    })
    .on('undo played hand', (user, room) => {
      console.log('undo played hand event received');
      // find room and grab last hand played
      if (big2Rooms[room]) {
        const pot = big2Rooms[room].pot;
        const cards = pot[pot.length - 1].cards;
        // Check that that value matches user submitted to undo played hand
        // and that the socket.id and user match as well
        console.log('user: ', user);
        console.log('pot: ', pot[pot.length - 1].user);
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
      // console.log('user disconnecting: ', socket.id);
      // console.log('socket.rooms disconnecting: ', socket.rooms);
      const gameRoomKey = Object.keys(socket.rooms)[1];
      if (big2Rooms[gameRoomKey]) {
        // console.log('gameRoomKey: ', gameRoomKey);
        // console.log('user at disconnecting event: ', user);
        const user = big2Rooms[gameRoomKey].socketMap[socket.id];
        delete big2Rooms[gameRoomKey].players[user];
      }
      // console.log('room values at disconnecting event: ', big2Rooms);
    });
  });
};
