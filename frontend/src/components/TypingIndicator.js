// src/components/TypingIndicator.js
import React from 'react';

const TypingIndicator = ({ username }) => {
  if (!username) return null;
  return <div className="typing-indicator">{username} is typing...</div>;
};

export default TypingIndicator;
