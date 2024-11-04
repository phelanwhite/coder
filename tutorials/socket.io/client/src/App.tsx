import { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

const serverUrl = `http://localhost:5000`;
const serverUrl1 = `http://localhost:5001`;

const socketClient = io(serverUrl);

function App() {
  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socketClient.on("receive-messages", (data) => {
      setMessages((prev) => [data, ...prev]);
    });
    socketClient.on("receive-messages-except-sender", (data) => {
      setMessages((prev) => [data, ...prev]);
    });
    socketClient.on("notification", (data) => {
      console.log({ data });
      setNotification(true);
    });
    return () => {
      socketClient.off("receive-messages");
      socketClient.off("receive-messages-except-sender");
      socketClient.off("notification");
    };
  }, []);

  const sendMessage = () => {
    socketClient.emit("send-message", message);
    setMessage("");
  };

  const sendMessageExceptSender = () => {
    socketClient.emit("send-message-except-sender", message);
    setMessage("");
  };

  const sendMessageWithRouter = () => {
    fetch(serverUrl1 + `/create-message`, {
      method: "POST",
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((value) => {
        setMessages((prev) => [value, ...prev]);
        setMessage("");
      });
  };

  return (
    <div className="max-w-[1200px] p-4 mx-auto space-y-8 text-sm h-screen">
      <div className="font-medium text-xl">Chat app</div>
      {notification && (
        <div className="text-red-600 font-medium">
          A new message has been received from another member!
        </div>
      )}

      <div className="">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
            <div className="flex-1">
              <div className="font-medium text-gray-700 space-x-4">
                <span>{msg.id}</span>
                <span>-</span>
                <span>{new Date(msg?.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="text-gray-500">{msg.message}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <input
          placeholder="Chat now..."
          className="border-blue-500 border rounded px-4 py-2 w-full"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex flex-wrap items-stretch gap-2">
          <button
            onClick={sendMessage}
            className="text-xs rounded bg-blue-500 text-white px-3 py-1.5"
          >
            Send Message to all members
          </button>
          <button
            onClick={sendMessageExceptSender}
            className="text-xs rounded bg-blue-500 text-white px-3 py-1.5"
          >
            Send Message to all members except sender
          </button>
          <button
            onClick={sendMessageWithRouter}
            className="text-xs rounded bg-blue-500 text-white px-3 py-1.5"
          >
            Send Message to all members with router
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
