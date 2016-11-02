const helpers = require('./helpers');
const big2Rooms = require('./big2Rooms');

module.exports = (io) => {
  io
    .of('big2')
    .on('connection', (socket) => {
      console.log('new big2 game socket connected');
      socket.emit('connected', { hello: 'world' });
      socket.on('connect to room', (room) => {
        console.log('requested to join room: ', room);
        socket.join(room);
        // TODO: Check if room has open spot
        // For now, we will create a room key/ value on the rooms object
        big2Rooms[room] = helpers.createGame();
        console.log('new room created: ', big2Rooms);
      });
    });
};
