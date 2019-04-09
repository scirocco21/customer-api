'use strict';

var SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const path = require('path');

module.exports = app; // for testing

app.use(express.static(path.join(__dirname, 'public')));

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  // install middleware
  swaggerExpress.register(app);
  app.listen(10010);
});

app.get('/', (req, res) => res.render('index.html'));
