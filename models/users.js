import mongoose from 'mongoose';
const { Schema } = mongoose;
import passportLocalMongoose from 'passport-local-mongoose';
const Text = require("../models/texts");
const semester = 7 * 4 * 6;
export const User = new Schema({
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
module.exports = mongoose.model("User", User);
