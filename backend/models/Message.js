import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  timestamp: String,
  profilePic: String // optional: if you add profile pic
});

export const Message = mongoose.model('Message', messageSchema);
