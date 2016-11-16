const helpers = require('./helpers');
const big2Rooms = require('./../models/big2Rooms');
const gameController = require('./../controllers/gameController');
const roomController = require('./../controllers/roomController');

const rooms = big2Rooms.rooms;

// This is looking like some spaghetti
module.exports = (io, app) => {
  const big2 = io.of('big2');
  big2
  .on('connection', (socket) => {
    socket
    .on('connect to room', (user, room) => {
      roomController
        .joinRoom(user, room, socket.id)
        .then((result) => {
          socket.join(room);
          socket.emit(result.event, result.data);
        })
        .catch(err => console.log('there was an error with big2 connect to room socket: ', err));
    })
    .on('create game', (room) => {
      if (rooms[room] === undefined) {
        return null;
      }
      // TODO: hook up to gameController
      // Now that you have cards dealt to players, emit to each
      const sockets = gameController.createGame(room);
      return Object
        .keys(sockets)
        .map(key => [key, sockets[key]])
        .forEach((player) => {
          big2
            .to(player[0])
            .emit(
              'player cards',
              rooms[room].playerHands[player[1]]
            );
        });
    })
    .on('play cards', (user, room, cards) => {
      if (rooms[room] === undefined) {
        return null;
      }
      gameController
        .playCards(user, room, cards, true)
        .then((played) => {
          big2
            .to(room)
            .emit(
              'hand played to pot',
              played.roundsTuple
            );
          socket
            .emit(
              'player cards',
              played.newHand
            );
        });
    })
    .on('undo played hand', (user, room) => {
      if (rooms[room] === undefined) {
        return null;
      }
      gameController
        .playCards(user, room, null, false)
        .then((played) => {
          big2
            .to(room)
            .emit(
              'hand played to pot',
              played.roundsTuple
            );
          socket
            .emit(
              'player cards',
              played.newHand
            );
        });
    })
    .on('disconnecting', () => {
      // There will be two values in rooms object
      // One will match the socket.id
      // The other will be the game room they are in
      // We'll use socket.id to find user value and remove that value form room they're in
      const room = Object.keys(socket.rooms)[1];
      if (big2Rooms.rooms[room]) {
        const user = big2Rooms.rooms[room].socketMap[socket.id];
        const userIndex = big2Rooms.rooms[room].turnOrder.indexOf(user);
        big2Rooms.rooms[room].turnOrder.splice(userIndex, 1);
      }
    });
  });
};
