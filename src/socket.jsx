import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL); // like http://localhost:3000

export default socket;
