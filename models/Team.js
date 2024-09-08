const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema User
const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  shortBio: {
    type: String,
  },
  fullBio: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Y", "N", "D"],
    default: "Y",
  },
  services: [
    {
      title: {
        type: String,
      },
      summary: {
        type: String,
      },
    },
  ],
  social: {
    facebook: {
      type: String,
    },

    twitter: {
      type: String,
    },

    linkedin: {
      type: String,
    },
  },
});

module.exports = Team = mongoose.model("teams", TeamSchema);
