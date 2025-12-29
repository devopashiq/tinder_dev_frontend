import { io } from "socket.io-client";
import { BASE_URL } from "./constans";

export const createSocketConnection = () => {
  return io(BASE_URL);
};
