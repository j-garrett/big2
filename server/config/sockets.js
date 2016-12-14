const helpers = require('./helpers');
const big2Rooms = require('./../models/big2Rooms');
const gameController = require('./../controllers/gameController');
const roomController = require('./../controllers/roomController');
const computerPlayerController = require('./../controllers/computerPlayerController');

const rooms = big2Rooms.rooms;

// This is looking like some spaghetti
// TODO: always check that user submitting turn matches socketMap val
module.exports = (io, app) => {
  const big2 = io.of('big2');
  big2
  .on('connection', (socket) => {
    socket
    .on('connect to room', (user, room) => {
      const joinResult = roomController.joinRoom(user, room, socket.id);
      socket
        .join(room, () => {
          big2
            .to(room)
            .emit(joinResult.event, joinResult.data);
        });
    })
    .on('create game', (user, room) => {
      // TODO: a user can only create a game for the room they are in
      // console.log('create game heard');
      if (rooms[room] === undefined || rooms[room].turnOrder.indexOf(user) === -1) {
        return null;
      }
      // ensure four people are connected
      // TODO: UNCOMMENT BELOW CHECK FOR PROD
      if (rooms[room].turnOrder.length !== 4) {
        for (let i = rooms[room].turnOrder.length; i < 4; i += 1) {
          roomController.joinRoom(`computer${i}`, room, `computer${i}`);
        }
      }
      const sockets = gameController.createGame(room);
      console.log('room with bots: ', rooms[room]);
      Object
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
      big2
        .to(room)
        .emit(
          'player turn',
          rooms[room].turnOrder[rooms[room].turn]
        );
    })
    .on('play cards', (user, room, cards) => {
      if (rooms[room] === undefined) {
        return null;
      }
      if (user !== rooms[room].turnOrder[rooms[room].turn]) {
        // If it is not that user's turn
        // Return cards to hand and give back to user
        // TODO: Find a way to combine this portion with next in robust manner
        const returnCardsToHand = helpers.getPlayersHand(user, room);
        socket
          .emit(
            'player cards',
            returnCardsToHand
          );
        return null;
      }
      const played = gameController.playCards(user, room, cards, true);
      big2
        .to(room)
        .emit(
          'hand played to pot',
          played.roundsTuple
        );
      socket
        .emit(
          'player cards',
          played.updateHand.newPlayerHand
        );
      let turnOrder = rooms[room].turnOrder;
      let turn = rooms[room].turn;
      rooms[room].turn = turn >= turnOrder.length - 1 ? 0 : turn + 1;
      big2
        .to(room)
        .emit(
          'player turn',
          rooms[room].turnOrder[rooms[room].turn]
        );
      if (rooms[room].turnOrder[rooms[room].turn] === 'computer1') {
        const computerPlayed = computerPlayerController.computerPlayCards('computer1', room, cards, true);
        big2
          .to(room)
          .emit(
            'hand played to pot',
            computerPlayed.roundsTuple
          );
        turnOrder = rooms[room].turnOrder;
        turn = rooms[room].turn;
        rooms[room].turn = turn >= turnOrder.length - 1 ? 0 : turn + 1;
        big2
          .to(room)
          .emit(
            'player turn',
            rooms[room].turnOrder[rooms[room].turn]
          );
      }
    })
    .on('undo played hand', (user, room) => {
      if (rooms[room] === undefined || rooms[room].pot.length < 1) {
        return null;
      }
      const played = gameController.playCards(user, room, null, false);
      big2
        .to(room)
        .emit(
          'hand played to pot',
          played.roundsTuple
        );
      big2
        .to(played.updateHand.previousPlayerSocket)
        .emit(
          'player cards',
          played.updateHand.newPlayerHand
        );
      const turnOrder = rooms[room].turnOrder;
      const turn = rooms[room].turn;
      rooms[room].turn = turn <= 0 ? turnOrder.length - 1 : turn - 1;
      big2
        .to(room)
        .emit(
          'player turn',
          rooms[room].turnOrder[rooms[room].turn]
        );
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
        delete rooms[room].playerHands[user];
        delete big2Rooms.rooms[room].socketMap[socket.id];
      }
    });
  });
};
