import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import {  useEffect, useRef, useState } from "react";

import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../utils/store";
import type { Socket } from "socket.io-client";

interface chatMessage {
  userId: string;
  targetUserId: string;
  username: string;
  newmessages: string;
}

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState<chatMessage[]>([]);
  const [newmessages, setNewMessages] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const connection = useSelector((state: RootState) => state.connection);
  const targetUser = connection?.find((user) => user._id === targetUserId);
   

  const userId = user?._id;

  const socketRef = useRef<Socket | null>(null);

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



  useEffect(() => {
  
    
    if (!userId || !targetUserId) return;

   

    socketRef.current = createSocketConnection();
    socketRef.current?.emit("joinChat", {
      userId,
      targetUserId,
      username: user?.firstName,
    });

    socketRef.current?.on("chatMessage", (msg) => {
      console.log(msg);

      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current?.off("chatMessage");
      socketRef.current?.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    <div className="w-4xl m-auto border border-gray-50  flex flex-col min-h-[70vh]">
      <div className=" border-gray-500/50  border-b  border-opacity-10 flex items-center  gap-2 p-5">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full ">
            <img
              alt="Tailwind CSS chat bubble component"
              src={targetUser?.photoUrl || "/placeholder.jpg"}
            />
          </div>
        </div>

        <h1 className=" font-extrabold text-lg ">{targetUser?.firstName + " " + targetUser?.lastName || ""}</h1>
      </div>
      <div className="p-2 flex-1 overflow-y-auto ">
        {messages.map((item,index) => {
          const isMine = item?.userId === userId;
          return isMine ? (
            <div className="chat chat-end" key={index}>
              <div className="flex items-center gap-2 group">
                <time className="text-xs opacity-0  group-hover:opacity-50">
                  12:46
                </time>
                <div className="chat-bubble ">{item?.newmessages}</div>
              </div>

              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
          ) : (
             <div className="chat chat-start" key={index}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                {item?.username}
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">{item?.newmessages}</div>
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
