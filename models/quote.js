const mongoose = require('mongoose');
const { Schema } = mongoose;
const Quote = new Schema({
	quote: String,
	source: {
		author: {
			type: Schema.Types.ObjectId,
			ref: 'Author'
		},
		work: {
			type: Schema.Types.ObjectId,
			ref: 'Work'
		}
	}
	
});

module.exports = mongoose.model('Quote', Quote);
