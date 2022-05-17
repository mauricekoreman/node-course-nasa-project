const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-api:s1HbWs8YZ4V49GAk@nasacluster.md35h.mongodb.net/nasa?retryWrites=true&w=majority";

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
