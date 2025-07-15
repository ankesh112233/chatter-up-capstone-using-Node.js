import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Message from "./Message";
import OnlineUsers from "./OnlineUsers";
import TypingIndicator from "./TypingIndicator";
import "./ChatBox.css";

const socket = io("http://localhost:5000"); // Replace with your backend URL if different
const notificationSound = new Audio("/notification.mp3");

function ChatBox({ user }) {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");
  const [message, setMessage] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.emit("user-joined", user);

    socket.on("chat-history", (chatHistory) => {
      setMessages(chatHistory);
    });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      if (msg.sender !== user.name) {
        notificationSound.play();
      }
    });

    socket.on("update-users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("typing", (userTyping) => {
      setTypingUser(userTyping);
    });

    socket.on("stop-typing", () => {
      setTypingUser("");
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = {
        sender: user.name,
        avatar: user.avatar,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      socket.emit("message", msgData);
      setMessages((prev) => [...prev, msgData]);
      setMessage("");
      socket.emit("stop-typing");
    }
  };

  const handleTyping = () => {
    socket.emit("typing", user.name);
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="header">Welcome <strong>{user.name}</strong></div>
        <div className="messages">
          {messages.map((msg, idx) => (
            <Message key={idx} msg={msg} isOwn={msg.sender === user.name} />
          ))}
          <div ref={messageEndRef}></div>
        </div>
        {typingUser && typingUser !== user.name && (
          <TypingIndicator user={typingUser} />
        )}
        <div className="input-area">
          <input
            type="text"
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
              else handleTyping();
            }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
      <OnlineUsers users={onlineUsers} />
    </div>
  );
}

export default ChatBox;
