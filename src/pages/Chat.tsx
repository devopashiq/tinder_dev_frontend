import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../utils/store";
import type { Socket } from "socket.io-client";
import axios from "axios";
import { BASE_URL } from "../utils/constans";
import type { UserState } from "../utils/userSlice";

interface chatMessage {
  userId: string;

  username: string;
  text: string;
}

interface Sender {
  _id: string;
  firstName: string;
  lastName: string;
}

interface ServerChatMessage {
  _id: string;
  text: string;
  senderId: Sender;
}
dayjs.extend(relativeTime);
const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState<chatMessage[]>([]);
  const [newmessages, setNewMessages] = useState("");
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [currentChatingUser, setCurrentChatingUser] = useState<
    Partial<UserState>
  >({});
  const user = useSelector((state: RootState) => state.user);
  const lastSeeen: string = "2026-01-28T00:00:00.000Z";

  const userId = user?._id;

  const socketRef = useRef<Socket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  function scrollToBottom() {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }
  const sendChat = () => {
    if (!newmessages.trim()) return;
    socketRef.current?.emit("sendMessage", {
      userId,
      targetUserId,
      username: user?.firstName,
      newmessages,
    });

    setNewMessages("");
  };

  const fetchAllChat = async () => {
    try {
      const res = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
        withCredentials: true,
      });

      console.log(res?.data?.message);

      const messages: ServerChatMessage[] = res?.data?.message;
      if (messages.length > 0) {
        const chatMassages = messages.map((msg) => {
          const { firstName, lastName, _id } = msg?.senderId || {};
          return {
            userId: _id,
            username: `${firstName} ${lastName}`,
            text: msg?.text,
          };
        });

        setMessages(chatMassages);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTargetUserDetails = async () => {
    try {
      const res = await axios.get(BASE_URL + `/user/${targetUserId}`, {
        withCredentials: true,
      });

      setCurrentChatingUser(res?.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (!targetUserId) return;
    fetchTargetUserDetails();
    fetchAllChat();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    socketRef.current = createSocketConnection();
    socketRef.current?.on("online-users", (users) => {
      console.log(users);

      if (users.includes(targetUserId)) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    });
    // socketRef.current?.on("user-online", (id) => {
    //   console.log("logined user id", id);
    //   if (id === targetUserId) {
    //     setIsOnline(true);
    //   }
    // });
    socketRef.current?.emit("joinChat", {
      userId,
      targetUserId,
      username: `${user?.firstName} ${user?.lastName}`,
    });

    socketRef.current?.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current?.off("chatMessage");

      socketRef.current?.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="max-w-4xl m-auto border border-gray-50  flex flex-col min-h-[70vh]">
     <div className="border-b border-gray-500/50 border-opacity-10 p-5">
  <div className="flex items-center gap-3">

    {/* Avatar */}
    <div className="w-10 h-10 rounded-full overflow-hidden">
      <img
        src={currentChatingUser?.photoUrl || "/placeholder.jpg"}
        alt="user avatar"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Text Section */}
    <div className="flex flex-col">

      {/* Name + Status Dot */}
      <div className="flex items-center gap-2">
        <h1 className="font-extrabold text-lg leading-none">
          {currentChatingUser?.firstName} {currentChatingUser?.lastName}
        </h1>

        <span
          className={`w-2 h-2 rounded-full ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </div>

      {/* Online / Last seen */}
      <span className="text-sm text-gray-400">
        {isOnline
          ? "Online"
          : `Last seen: ${dayjs(lastSeeen).fromNow()}`}
      </span>

    </div>

  </div>
</div>

      <div
        className="p-2 flex-1 overflow-y-auto max-h-[60vh] "
        ref={chatContainerRef}
      >
        {messages.map((item, index) => {
          const isMine = item?.userId === userId;
          return isMine ? (
            <div className="chat chat-end" key={index}>
              <div className="flex items-center gap-2 group">
                <time className="text-xs opacity-0  group-hover:opacity-50">
                  12:46
                </time>
                <div className="chat-bubble ">{item?.text}</div>
              </div>

              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
          ) : (
            <div className="chat chat-start" key={index}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={currentChatingUser?.photoUrl}
                  />
                </div>
              </div>
              <div className="chat-header">
                {item?.username}
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">{item?.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-500/50 ">
        <div className="relative">
          <input
            type="text"
            placeholder="Accent"
            className="input input-accent w-full pr-10"
            value={newmessages}
            onChange={(e) => setNewMessages(e.target.value)}
          />
          <FontAwesomeIcon
            title="send"
            icon={faPaperPlane}
            className="absolute  right-3 top-3.5 text-gray-500 cursor-pointer hover:text-cyan-700 transition-colors rotate-44 z-10"
            onClick={() => sendChat()}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
