const semester = 7 * 4 * 6;

import mongoose, { Schema, Document, Model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { PassportLocalModel } from 'mongoose';

import { IText } from './texts.ts';

export interface IUser extends Document {
	_id: string;
	name: string;
	lastName: string;
	email: string;
	accountCreation: Date;
	lastLogin: Date;
	texts: IText[];
	configs: {
		exercise: mongoose.Schema.Types.ObjectId;
		config: {
			completed: boolean;
			time: number;
			defaultExercise: boolean;
		};
	};
	activity?: {
		index: number;
		dateLastActive: Date;
		activityArray: number[];
	};
	quoteLikes: Map<string, number>;
}

export const User = new Schema<IUser>({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	lastName: String,
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	accountCreation: { type: Date, default: Date.now },
	lastLogin: { type: Date, default: Date.now },
	texts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Text",
		},
	],
	configs: [
		{
			exercise: {
				type: Schema.Types.ObjectId,
				ref: "Exercise",
			},
			config: {
				completed: {
					type: Boolean,
					default: false,
				},
				time: Number,
				defaultExercise: Boolean,
			},
		},
	],
	// stack tracking activity
	activity: {
		index: Number,
		dateLastActive: { type: Date, default: Date.now },
		activityArray: {
			type: Array,
			default: new Array(semester).fill(0)
		},
	},
	quoteLikes: Map
});

// TODO: check how to make methods for models
// TODO: add those activity stack operations defined in the text route 

User.plugin(passportLocalMongoose);

module.exports = mongoose.model<IUser>("User", User);
