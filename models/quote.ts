import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IQuote extends mongoose.Document {
	quote: string;
	source: {
		author: mongoose.Schema.Types.ObjectId;
		work: mongoose.Schema.Types.ObjectId;
	};
}

export const Quote = new Schema({
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
