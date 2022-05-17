/*  express is just middleware that we add on top of the built-in node http server. We can organize our code better this way and also use more functions such as websockets now.

We've now seperated all of our express middleware from our server functions.
*/

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const v1Router = require("./routes/v1");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/v1", v1Router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;