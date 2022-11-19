import { Schema } from "mongoose";
const mongoose = require('mongoose');

const Author = new Schema({
	name: String,
	wikipediaLink: String,
	portrait: Blob,
});


module.exports = mongoose.model('Author', Author);
