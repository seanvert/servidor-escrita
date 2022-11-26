const mongoose = require('mongoose');
const { Schema } = mongoose;
const Author = new Schema({
	name: String,
	wikipediaLink: String,
	portrait: Buffer,
});


module.exports = mongoose.model('Author', Author);
