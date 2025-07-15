

import React, { useState } from 'react';

function UserInput({ socket, name }) {
  const [message, setMessage] = useState('');

  const handleTyping = () => socket.emit('typing', name);
  const stopTyping = () => socket.emit('stopTyping');

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', { text: message, sender: name });
      setMessage('');
    }
    stopTyping();
  };

  return (
    <div className="input-section">
      <input
        type="text"
        placeholder="Enter your message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onFocus={handleTyping}
        onBlur={stopTyping}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default UserInput;
