import mongoose from 'mongoose';
const { Schema } = mongoose;
const User = require('../models/users');
export const exerciseSchema = new Schema({
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
module.exports = mongoose.model('Exercise', exerciseSchema);
