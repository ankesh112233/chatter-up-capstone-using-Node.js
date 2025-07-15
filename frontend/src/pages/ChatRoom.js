import React, { useEffect, useState } from 'react';
import socket from '../socket';
import axios from 'axios';
import ChatBox from '../components/ChatBox';
import OnlineUsers from '../components/OnlineUsers';
import TypingIndicator from '../components/TypingIndicator';

const ChatRoom = () => {
  const [name, setName] = useState('');
  const [inputName, setInputName] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState('');

  useEffect(() => {
    socket.on('chat-message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('chat-history', (msgs) => {
      setMessages(msgs);
    });

    socket.on('user-connected', (username) => {
      setOnlineUsers((prev) => [...new Set([...prev, username])]);
    });

    socket.on('user-disconnected', (username) => {
      setOnlineUsers((prev) => prev.filter((user) => user !== username));
    });

    socket.on('typing', (username) => {
      setTypingUser(username);
      setTimeout(() => setTypingUser(''), 2000);
    });

    return () => {
      socket.off();
    };
  }, []);

  const handleLogin = () => {
    setName(inputName);
    socket.emit('new-user', inputName);
  };

  if (!name) {
    return (
      <div className="onboarding">
        <h2>Enter your name</h2>
        <input value={inputName} onChange={(e) => setInputName(e.target.value)} />
        <button onClick={handleLogin}>Join</button>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <ChatBox
        name={name}
        messages={messages}
        onTyping={() => socket.emit('typing', name)}
        onSend={(msg) =>
          socket.emit('chat-message', {
            name,
            text: msg,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            avatar: `/avatars/${name.toLowerCase()}.png`, // defaulted
          })
        }
      />
      <div className="sidebar">
        <h4>Connected Users {onlineUsers.length}</h4>
        <OnlineUsers users={onlineUsers} />
        <TypingIndicator username={typingUser} />
      </div>
    </div>
  );
};

export default ChatRoom;
