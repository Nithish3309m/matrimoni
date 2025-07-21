import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import socket from "../socket"; // your configured socket from socket.js

export default function Chat() {
  const { id: receiverId } = useParams(); // person you're chatting with
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const token = localStorage.getItem("token");
  const userId = JSON.parse(atob(token.split(".")[1])).id;

  // 🧠 Join user room and fetch messages
  useEffect(() => {
    // join room with your own user ID
    socket.emit("join", userId);

    // fetch existing chat history
    const fetchMessages = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_CHAT_URL}/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data.chats || []);
    };

    fetchMessages();

    // 🧲 Real-time listener for new messages
    socket.on("receiveMessage", (msg) => {
      if (msg.sender === receiverId || msg.receiver === receiverId) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    // cleanup
    return () => {
      socket.off("receiveMessage");
    };
  }, [receiverId, token, userId]);

  // 📤 Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. Save in DB
    await axios.post(`${import.meta.env.VITE_API_CHAT_URL}/send`, {
      receiver: receiverId,
      message: input
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const sentMessage = {
      sender: userId,
      receiver: receiverId,
      message: input
    };

    // 2. Send via socket
    socket.emit("sendMessage", sentMessage);

    // 3. Add locally
    setMessages((prev) => [...prev, sentMessage]);
    setInput("");
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">💬 Chat</h4>
      <div className="border rounded p-3 mb-3" style={{ height: "400px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex mb-2 ${msg.sender === userId ? "justify-content-end" : "justify-content-start"}`}
          >
            <div className={`px-3 py-2 rounded-pill text-white ${msg.sender === userId ? "bg-primary" : "bg-secondary"}`}>
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="btn btn-success" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
