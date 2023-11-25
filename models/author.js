import mongoose from 'mongoose';
const { Schema } = mongoose;
export const Author = new Schema({
    name: String,
    wikipediaLink: String,
    portrait: Buffer,
});
module.exports = mongoose.model('Author', Author);
