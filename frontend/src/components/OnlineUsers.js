import React from "react";
import "./OnlineUsers.css";

const OnlineUsers = ({ users }) => {
  return (
    <div className="online-users">
      <h4>Connected Users {users.length}</h4>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>
            <img src={user.avatar} alt="avatar" className="avatar" />
            <span>{user.name}</span>
            <span className="status-dot green"></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;
