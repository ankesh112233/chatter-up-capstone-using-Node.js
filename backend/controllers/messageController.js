import Message from '../models/Message.js';

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};
