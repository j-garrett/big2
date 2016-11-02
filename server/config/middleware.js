const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

module.exports = (app) => {
  app.use(express.static('dist'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
  })
  );
};
