const big2Rooms = require('./../models/big2Rooms');
const helpers = require('./../config/helpers');

const rooms = big2Rooms.rooms;
const roomModel = big2Rooms.model;

const roomController = {
  createRoom(room) {
    rooms[room] = Object.assign({}, roomModel);
  },
  joinRoom(user, room, socketId) {
    // If room doesn't exist we create it
    if (rooms[room] === undefined) {
      this.createRoom();
    }
    // If it does exist, we do some checks before adding
    // Check if username is taken
    if (rooms[room].playerHands[user] !== undefined) {
      return ['Room is full', 'That name is already taken.'];
    }
    if (rooms[room].turnOrder.length < 4) {
      // And add a player if there is an open spot
      rooms[room].playerHands[user] = [];
      rooms[room].socketMap[socketId] = user;
      rooms[room].turnOrder.push(user);
    }
  },
};

const returnRoom = (room) => {
  // This function will look for a room
  // If it does not exist it will return a new room object
  // If it does exist then it will return the existing room
  if (big2Rooms[room] === undefined) {
    return helpers.createRoom();
  }
};

const connectToRoom = () => {

};

module.exports = roomController;
