import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  contactNumber: String,
  question: String,
  rating: Number,
  Reply: String
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);

