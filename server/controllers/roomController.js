const big2Rooms = require('./../models/big2Rooms');
const helpers = require('./../config/helpers');

const RoomModel = big2Rooms.Big2Room;

const roomController = {
  joinRoom(user, room, socketId) {
    // If room doesn't exist we create it
    if (big2Rooms.rooms[room] === undefined) {
      big2Rooms.rooms[room] = new RoomModel();
    }
    // If it does exist, we do some checks before adding
    // Check if username is taken
    if (big2Rooms.rooms[room].playerHands[user] !== undefined) {
      return ({
        event: 'problem joining room',
        data: 'That name is already taken. Please pick another.',
      });
    }
    // Check if we already have 4 players
    if (big2Rooms.rooms[room].turnOrder.length >= 4) {
      return ({
        event: 'problem joining room',
        data: 'This room is already full. Please pick another.',
      });
    }
    // And add a player if there is an open spot
    big2Rooms.rooms[room].playerHands[user] = [];
    big2Rooms.rooms[room].socketMap[socketId] = user;
    big2Rooms.rooms[room].turnOrder.push(user);
    return ({
      event: 'players in room',
      data: big2Rooms.rooms[room].turnOrder,
    });
  },
};

module.exports = roomController;
