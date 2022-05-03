/*  express is just middleware that we add on top of the built-in node http server. We can organize our code better this way and also use more functions such as websockets now.

We've now seperated all of our express middleware from our server functions.
*/

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('combined'));

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;