const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");
const Text = require("../models/texts");

const semester = 7 * 4 * 6;

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
				completed: {
					type: Boolean,
					default: false,
				},
				time: Number,
				defaultExercise: Boolean,
			},
		},
	],
	// stack tracking activity
	activity: {
		index: Number,
		dateLastActive: { type: Date, default: Date.now },
		activityArray: {
			type: Array,
			default: new Array(semester).fill(0)
		},
	},
	quote_likes: Map
});

// TODO: check how to make methods for models
// TODO: add those activity stack operations defined in the text route 

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", User);
