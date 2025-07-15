import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatBox from './components/ChatBox';
import OnlineUsers from './components/OnlineUsers';
import TypingIndicator from './components/TypingIndicator';
import UserInput from './components/UserInput';
import './styles/ChatApp.css';

const socket = io('http://localhost:3000'); // Adjust if backend is deployed
const avatars = [
  "/avatars/avatar1.png",
  "/avatars/avatar2.png",
  "/avatars/avatar3.png",
  "/avatars/avatar4.png"
];

function App() {
  const [user, setUser] = useState(null);

  const handleJoin = (name) => {
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setUser({ name, avatar: randomAvatar });
  };

  if (!user) {
    return (
      <div className="onboarding">
        <h2>Welcome to ChatterUp</h2>
        <input
          type="text"
          placeholder="Enter your name"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              handleJoin(e.target.value.trim());
            }
          }}
        />
      </div>
    );
  }

  return <ChatBox user={user} />;
}

function App() {
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState('');

  useEffect(() => {
    const user = prompt("Enter your name");
    setName(user);
    socket.emit('newUser', user);

    socket.on('message', msg => setMessages(prev => [...prev, msg]));
    socket.on('onlineUsers', users => setOnlineUsers(users));
    socket.on('typing', user => setTypingUser(user));
    socket.on('stopTyping', () => setTypingUser(''));

    return () => socket.disconnect();
  }, []);

  return (
    <div className="app-container">
      <div className="chat-section">
        <div className="welcome-msg">👋 welcome {name}</div>
        <TypingIndicator typingUser={typingUser} />
        <ChatBox messages={messages} currentUser={name} />
        <UserInput socket={socket} name={name} />
      </div>
      <OnlineUsers users={onlineUsers} />
    </div>
  );
}

export default App;
