import mongoose from 'mongoose';
const { Schema } = mongoose;
export const Work = new Schema({
    name: String,
    bookstoreLink: String,
});
module.exports = mongoose.model('Work', Work);
