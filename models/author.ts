import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IAuthor extends mongoose.Document {
	name: string;
	wikipediaLink: string;
	portrait: Buffer;
}

export const Author = new Schema({
	name: String,
	wikipediaLink: String,
	portrait: Buffer,
});


module.exports = mongoose.model('Author', Author);
