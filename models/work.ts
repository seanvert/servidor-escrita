import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IWork extends mongoose.Document {
	name: string;
	bookstoreLink: string;
}

export const Work = new Schema({
	name: String,
	bookstoreLink: String,
});

module.exports = mongoose.model('Work', Work);
