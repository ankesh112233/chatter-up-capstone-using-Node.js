import { Message } from '../models/Message.js';

export const saveMessage = async (msg) => {
  try {
    const message = new Message(msg);
    await message.save();
  } catch (err) {
    console.error('Error saving message:', err);
  }
};

export const getMessages = async () => {
  return await Message.find().limit(50).sort({ _id: 1 });
};
