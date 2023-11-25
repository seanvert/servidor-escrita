import mongoose from 'mongoose';
const { Schema } = mongoose;
const User = require('../models/users');

export interface IExercise extends mongoose.Document {
	name: string;
	contents: string;
	type: number;
	creationDate: Date;
	creator: mongoose.Schema.Types.ObjectId;
	defaultConfigs: {
		time: number;
		defaultExercise: boolean;
	};
}

export const Exercise = new Schema({
	name: String, 
	contents: String,
	type: Number,
	creationDate: { type: Date, default: Date.now },
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	defaultConfigs: {
		time: Number,
		defaultExercise: {
			type: Boolean,
			default: false
		}
	}
});


module.exports = mongoose.model('Exercise', Exercise);
