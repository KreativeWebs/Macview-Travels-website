import { io } from "socket.io-client";

const API_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  "https://macview-travels-website-production.up.railway.app"
).replace("/api", "");

const socket = io(API_URL, {
  withCredentials: true,
  transports: ["websocket", "polling"],
  forceNew: true,
  timeout: 5000,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

/* Logging (safe to keep in admin) */
socket.on("connect", () => {
  console.log("🔌 [ADMIN] Socket connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("🔌 [ADMIN] Socket disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("🔌 [ADMIN] Socket error:", error.message);
});

export default socket;
