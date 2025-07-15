// src/components/Message.js
import React from 'react';

const Message = ({ message, currentUser }) => {
  const isCurrentUser = message.name === currentUser;

  return (
    <div className={`message ${isCurrentUser ? 'own' : ''}`}>
      <img src={message.avatar || '/avatars/default.png'} alt="avatar" />
      <div className="text-content">
        <div className="name-time">
          <strong>{message.name}</strong> • <span>{message.time}</span>
        </div>
        <div className="text">{message.text}</div>
      </div>
    </div>
  );
};

export default Message;
