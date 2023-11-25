import mongoose from 'mongoose';
const { Schema } = mongoose;
export const textSchema = new Schema({
    name: String,
    contents: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    creation: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('Text', textSchema);
