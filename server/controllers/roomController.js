const big2Rooms = require('./../models/big2Rooms');
const helpers = require('./../config/helpers');

const rooms = big2Rooms.rooms;
const roomModel = big2Rooms.model;

const roomController = {
  createRoom() {
    return Object.assign({}, roomModel);
  },
  joinRoom(user, room, socketId) {
    // If room doesn't exist we create it
    if (rooms[room] === undefined) {
      rooms[room] = this.createRoom();
    }
    // If it does exist, we do some checks before adding
    // Check if username is taken
    if (rooms[room].playerHands[user] !== undefined) {
      return {
        event: 'Room is full',
        data: 'That name is already taken. Please pick another.',
      };
    }
    // Check if we already have 4 players
    if (rooms[room].turnOrder.length >= 4) {
      return {
        event: 'Room is full',
        data: 'This room is already full. Please pick another.',
      };
    }
    // And add a player if there is an open spot
    rooms[room].playerHands[user] = [];
    rooms[room].socketMap[socketId] = user;
    rooms[room].turnOrder.push(user);
    return {
      event: 'players in room',
      data: rooms[room].turnOrder,
    };
  },
};

module.exports = roomController;
