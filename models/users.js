const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");
const Text = require("../models/texts");

const User = new Schema({
  name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  account_creation: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now },
  texts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Text",
    },
  ],
  configs: [
    {
      exercise: {
        type: Schema.Types.ObjectId,
        ref: "Exercise",
      },
      config: {
        time: Number,
        default: Boolean,
      },
    },
  ],
  activity: [],
});

// TODO: colocar um vetor de inteiros no activity
// renderizar ele "de trás pra frente"
User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
