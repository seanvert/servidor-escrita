const mongoose = require('mongoose');
const { Schema } = mongoose;

const textSchema = new Schema({
	name:  String, // String is shorthand for {type: String}
	contents: String,
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	creation: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Text', textSchema);
