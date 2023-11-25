import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface IText extends mongoose.Document {
  name: string;
  contents: string;
  owner: string;
  creation: Date;
}

export const Text = new Schema({
  name: String, // String is shorthand for {type: String}
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

module.exports = mongoose.model('Text', Text);
