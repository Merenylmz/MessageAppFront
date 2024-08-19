import { useEffect, useState } from "react";
import io from "socket.io-client";
import { getMessages, sendMessage } from "../../Redux/Actions/Message.action";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:5000"); // Backend'in çalıştığı portu buraya ekleyin

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState<string>("");
  const { token } = useSelector((state: { auth: { isAuth: boolean; token: string } }) => state.auth);
  const {receiverId} = useParams();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await getMessages(receiverId, token);
        setMessages(messages);
        console.log(messages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, [receiverId, token]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket.io server");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, []);

  const handleSend = async (e: any) => {
    e.preventDefault();
    const decodedToken: {userId:string} = jwtDecode(token);
    console.log("Sending message...");
    const messageData = { sender: decodedToken.userId, receiverId, content };
    try {
      await sendMessage(messageData, token);
      socket.emit("sendMessage", messageData);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {messages && messages[0] && messages.map((m: any, index: number) => (
        <div>
          <p style={receiverId == m.receiverId ? {color: "red"} : {}}>{m.content}</p>
        </div>
      ))}
      <br />
      <form method="post" onSubmit={handleSend}>
        <label>Message:</label>
        <input type="text" className="form-control" onChange={(e) => setContent(e.target.value)} value={content} />
        <button className="btn btn-primary btn-sm" type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
