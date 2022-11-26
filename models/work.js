const mongoose = require('mongoose');
const { Schema } = mongoose;

const Work = new Schema({
	name: String,
	bookstoreLink: String,
});

module.exports = mongoose.model('Work', Work);
