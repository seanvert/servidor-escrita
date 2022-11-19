const mongoose = require('mongoose');
const { Schema } = mongoose;

const textSchema = new Schema({
	name:  String, // String is shorthand for {type: String}
	contents: String,
	owner: Schema.Types.ObjectId,
	creation: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Text', textSchema);
