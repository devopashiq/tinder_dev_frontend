import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

import { createSocketConnection } from "../utils/socket";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../utils/store";
import type { Socket } from "socket.io-client";
import axios from "axios";
import { BASE_URL } from "../utils/constans";
import type { UserState } from "../utils/userSlice";
import { toast } from "react-toastify";

interface chatMessage {
  userId: string;

  text: string;
  seenAt: Date | null;
  createdAt: Date | null;
  status: string;
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
  seenAt: Date;
  createdAt: Date;
  status: string;
}
dayjs.extend(relativeTime);
const Chat = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<chatMessage[]>([]);
  const [newmessages, setNewMessages] = useState("");
  const [lastSeen, setLastSeen] = useState<string>("");
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [currentChatingUser, setCurrentChatingUser] = useState<
    Partial<UserState>
  >({});

  const [typingStatus, setTypingStatus] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.user);

  const userId = user?._id;

  const socketRef = useRef<Socket | null>(null);
  const typingTimeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

      const messages: ServerChatMessage[] = res?.data?.message;
      if (messages.length > 0) {
        const chatMassages = messages.map((msg) => {
          const { firstName, lastName, _id } = msg?.senderId || {};
          return {
            userId: _id,
            username: `${firstName} ${lastName}`,
            text: msg?.text,
            seenAt: msg?.seenAt,
            createdAt: msg?.createdAt,
            status: msg?.status,
          };
        });

        setMessages(chatMassages);
      }
    } catch (err) {
      const errorMSg =
        (err as any)?.response?.data?.message || "Failed to load chat messages";
      toast.error(errorMSg);
      const status = (err as any)?.response?.status;
      
        navigate("/connections");
      
    }
  };

  const fetchLastSeen = async () => {
    try {
      const res = await axios.get(BASE_URL + `/user/${targetUserId}/status`, {
        withCredentials: true,
      });

      setLastSeen(res?.data?.lastSeen);
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

  const emitUserTypingEvent = () => {
    if (typingTimeOutRef.current === null) {
      socketRef.current?.emit("UserTyping", {
        typing: true,
        targetUserId,
      });
    }

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }

    typingTimeOutRef.current = setTimeout(() => {
      socketRef.current?.emit("UserTyping", {
        typing: false,
        targetUserId,
      });
      typingTimeOutRef.current = null;
    }, 1500);
  };

  const handleChatInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessages(e.target.value);
    emitUserTypingEvent();
  };

  useEffect(() => {
    if (!targetUserId) return;
    fetchTargetUserDetails();
    fetchAllChat();
    fetchLastSeen();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;
    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.on("online-users", (users) => {
      if (users.includes(targetUserId)) {
        setIsOnline(true);
        setMessages((prev) => {
          const updateMsgStatus = prev.map((msg) => {
            if (msg.userId === userId && msg.status !== "seen") {
              return { ...msg, status: "delivered" };
            }
            return msg;
          });
          return updateMsgStatus;
        });
      } else {
        setIsOnline(false);

        fetchLastSeen();
      }
    });
    socket.on("userjoined", (id) => {
      if (id === targetUserId) {
        setMessages((prev) => {
          const updateMsgStatus = prev.map((msg) => {
            if (msg.userId === userId) {
              return { ...msg, status: "seen" };
            }
            return msg;
          });
          return updateMsgStatus;
        });
      }
    });

    socket.on("connect", () => {
      socket.emit("joinChat", {
        targetUserId,
      });
    });

    socket.on("chatMessage", (msg) => {
      const normalizedMsg: chatMessage = {
        userId: msg?.userId,

        text: msg?.text,
        seenAt: msg?.seenAt ?? null,
        createdAt: msg?.createdAt ?? null,
        status: msg?.status ?? "sent",
      };

      setMessages((prev) => [...prev, normalizedMsg]);
    });

    socket.on("typing", (typing) => {
      setTypingStatus(typing);
    });

    return () => {
      socket.off("chatMessage");
      socket.off("online-users");
      socket.off("userjoined");
      socket.off("typing");
      socket.disconnect();
      socket.removeAllListeners();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    scrollToBottom();

    return () => {
      if (typingTimeOutRef.current) {
        clearTimeout(typingTimeOutRef.current);
      }
    };
  }, [messages, typingStatus]);

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
                : lastSeen
                  ? `Last seen: ${dayjs(lastSeen).fromNow()}`
                  : "Last seen: unknown"}
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
                  {dayjs(item?.createdAt).format("h:mm A")}
                </time>
                <div className="chat-bubble text-wrap max-w-100 wrap-break-word">{item?.text}</div>
              </div>

              <div className="chat-footer opacity-50">{item?.status}</div>
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
                {currentChatingUser?.firstName} {currentChatingUser?.lastName}
                <time className="text-xs opacity-50">
                  {dayjs(item?.createdAt).format("h:mm A")}
                </time>
              </div>
              <div className="chat-bubble text-wrap max-w-100 wrap-break-word">{item?.text}</div>
            </div>
          );
        })}

        {typingStatus && (
          <div className="chat chat-start">
            <div className="chat-bubble ">
              <span className="loading loading-dots loading-xs"></span>
            </div>
          </div>
        )}
      </div>
      <div className="p-5 border-t border-gray-500/50 ">
        <div className="relative">
          <input
            type="text"
            placeholder="Type a message…"
            className="input input-accent w-full pr-10"
            value={newmessages}
            onChange={(e) => handleChatInputChange(e)}
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
