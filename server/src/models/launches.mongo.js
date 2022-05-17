const mongoose = require("mongoose");

const launchesSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
  },
  customers: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
    default: true,
  },
});

/** first param should always be the singular name of the collection that this model represents ('LaunchesSchema')
Mongoose will take in this name, lower-case it, make it plural and talk to the collection with that lowercased plural name.
Connects launchesSchema with the "launches" collection
*/
module.exports = mongoose.model("Launch", launchesSchema);
