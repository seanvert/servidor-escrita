const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../models/users');

const exerciseSchema = new Schema({
	name: String, 
	contents: String,
	creation_date: { type: Date, default: Date.now },
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	defaultConfigs: {
		time: Number,
	}
});


module.exports = mongoose.model('Exercise', exerciseSchema);
