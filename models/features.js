const mongoose = require('mongoose');
const { Schema } = mongoose;

const Feature = new Schema({
	name: String,
	author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
	description: String
});

module.exports = mongoose.model('Feature', Feature);