const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema User
const ServicesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Services = mongoose.model("Services", ServicesSchema);
