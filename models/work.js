import { Schema } from "mongoose";
const mongoose = require('mongoose');

const Work = new Schema({
	name: String,
	bookstoreLink: String,
});

module.exports = mongoose.model('Work', Work);
