import env from "@/configs/env-config";
import { socket } from "@/socket";
import React, { useEffect, useState } from "react";

const NotificationsPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [message, ...prev]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  const handleSendMessage = () => {
    socket.emit("sendMessage", value);
  };
  return (
    <div>
      <div>NotificationsPage</div>
      <input
        className="border px-4 py-2"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleSendMessage}>send</button>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <span>{message?.user}: </span>
            <span>{message?.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
