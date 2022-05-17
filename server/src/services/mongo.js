const mongoose = require("mongoose");

require("dotenv").config(); // this is placed here so our tests can connect to mongoDB as well!

// Update below to match your own MongoDB connection string.
const MONGO_URL = process.env.MONGO_URL;

// these are event listeners and listen to the event 'open' and 'error' if they occur.
// 'Once' listens only the first time, 'on' listens every time.
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
