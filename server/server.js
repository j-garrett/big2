require('dotenv').config();

const app = require('express')();
const http = require('http');
const path = require('path');

const server = new http.Server(app);
const io = require('socket.io')(server);

const middleware = require('./config/middleware');
const routes = require('./config/routes');
const big2 = require('./config/sockets');

const home = path.join(__dirname, './../dist/index.html');
const port = process.env.PORT || 9090;

server.listen(port, () => {
  console.log('app listening on port ', port);
  if (app.get('env') === 'development') {
    console.log('app environment set to development');
  }
});

middleware(app);
app.use('/cards', routes);
app.get('/*', (req, res) => {
  res.sendFile(home);
});
big2(io, app);
