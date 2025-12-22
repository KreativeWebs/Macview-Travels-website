import { io } from 'socket.io-client';

const API_URL = (import.meta.env.VITE_API_BASE_URL || 'https://macview-travels-website-production.up.railway.app').replace('/api', '');

console.log('🔌 Initializing socket connection to:', API_URL);

const socket = io(API_URL, {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  forceNew: true,
  timeout: 5000,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Add detailed connection logging
socket.on('connect', () => {
  console.log('🔌 Socket connected successfully:', socket.id);
  console.log('🔌 Transport used:', socket.conn?.transport?.name || 'unknown');
});

socket.on('disconnect', (reason) => {
  console.log('🔌 Socket disconnected:', reason);
});

socket.on('connect_error', (error) => {
  console.error('🔌 Socket connection error:', error.message);
  console.error('🔌 Error details:', error);
});

socket.on('reconnect', (attemptNumber) => {
  console.log('🔌 Socket reconnected after', attemptNumber, 'attempts');
});

socket.on('reconnect_error', (error) => {
  console.error('🔌 Socket reconnection error:', error);
});

export default socket;
