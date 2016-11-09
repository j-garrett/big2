const helpers = require('./helpers');
const big2Rooms = require('./../models/big2Rooms');

// This is looking like some spaghetti
module.exports = (io) => {
  const big2 = io
    .of('big2')
    .on('connection', (socket) => {
      // console.log('new big2 game socket connected');
      socket.on('connect to room', (user, room) => {
        // console.log('connect to room attempted with room, user: ', room, user);
        // console.log('connect to room socket.id: ', socket.id);
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
          roomKey.players[user] = roomKey.players[user] || numOfPlayers;
          // Add user name to socket map so we can remove them on disconnect
          roomKey.socketMap[socket.id] = user;
          console.log('rooms vals at connect to room event: ', big2Rooms);
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
        const newHand = helpers.updatePlayerHand(room, user, cards);
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
        // find room and grab last hand played
      })
      .on('disconnecting', (data) => {
        console.log('user disconnecting: ', socket.id);
        console.log('socket.rooms disconnecting: ',
        socket.rooms);
        const gameRoomKey = Object.keys(socket.rooms)[1];
        if(big2Rooms[gameRoomKey]) {
          console.log('gameRoomKey: ', gameRoomKey);
          const user = big2Rooms[gameRoomKey].socketMap[socket.id];
          console.log('user at disconnecting event: ', user);
          delete big2Rooms[gameRoomKey].players[user];
        }
        // There will be two values in rooms object
        // One will match the socket.id
        // The other will be the game room they are in
        // We will eliminate the value that is equal to socket.id
        // And then use the other value to look up their room object
        // And remove the appropriate player
        console.log('room values at disconnecting event: ', big2Rooms);
      })
      .on('disconnect', () => {

      });
    });
};
