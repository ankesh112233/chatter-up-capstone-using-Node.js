import Message from '../models/Message.js';

export const handleSocketConnection = (socket, io) => {
  console.log('A user connected:', socket.id);

  socket.on('new-user', async (username) => {
    socket.username = username;
    io.emit('user-connected', username);

    // Send chat history
    const messages = await Message.find({});
    socket.emit('chat-history', messages);
  });

  socket.on('chat-message', async (msg) => {
    const message = new Message(msg);
    await message.save();

    io.emit('chat-message', msg);
  });

  socket.on('typing', (username) => {
    socket.broadcast.emit('typing', username);
  });

  socket.on('disconnect', () => {
    io.emit('user-disconnected', socket.username);
  });
};
