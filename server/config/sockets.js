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
        .then(result => {
          socket.join(room);
          socket.emit(result.event, result.data);
        })
        .catch(err => socket.emit(err.event, err.data));
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
      big2.to(room).emit('hand played to pot',
        [
          { user: 'jon', cards: ['Object'] },
          { user: 'jon', cards: ['adf'] },
        ]);
      // const played = gameController.playCards(user, room, cards);
      // gameController
      //   .playCards(user, room, cards)
      //   .then((played) => {
      //     console.log('played var: ', played);
      //     console.log('room: ', room);
      //     big2
      //       .to(room)
      //       .emit(
      //         'hand played to pot',
      //         played.roundsTuple
      //       );
      //     socket
      //       .emit(
      //         'player cards',
      //         played.newHand
      //       );
      //   });
    })
    .on('undo played hand', (user, room) => {
      if (rooms[room] === undefined) {
        return null;
      }
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
