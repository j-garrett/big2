const big2Rooms = require('./../models/big2Rooms');
const helpers = require('./../config/helpers');

const returnRoom = (room) => {
  // This function will look for a room
  // If it does not exist it will return a new room object
  // If it does exist then it will return the existing room
  if (big2Rooms[room] === undefined) {
    big2Rooms[room] = helpers.createRoom();
  }
};

const connectToRoom = () => {

};

module.exports = {
  findRoom,
  connectToRoom,
};
