require('dotenv').config();
const express = require('express');
const path = require('path');

const middleware = require('./config/middleware');
const routes = require('./config/routes');

const app = express();
middleware(app, express);

app.use('/cards', routes);

if (app.get('env') === 'development') {
  console.log('app environment set to development');
}

const home = path.join(__dirname, './../dist/index.html');
app.get('/*', (req, res) => {
  res.sendFile(home);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('app listening on port ', port);
});
