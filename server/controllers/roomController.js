const big2Rooms = require('./../models/big2Rooms');
const helpers = require('./../config/helpers');

// const RoomController = {
//   createRoom(user, room) {
//     console.log('inside createRoom controller args');
//     console.log('user: ', user);
//     console.log('room: ', room);0
//   },
// };

var createRoom = function(data) {
  console.log('creaetRoom called in new structure');
  console.log('creaetRoom called in new structure data; ', data);
  this.socket.emit('player cards', 'test');
};

var RoomController = function(socket, app) {
  this.socket = socket;
  this.app = app;
  this.handler = {
    'connect to room': createRoom.bind(this),
  };
};

module.exports = RoomController;
