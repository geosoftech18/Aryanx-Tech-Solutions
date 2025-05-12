/**
 * Socket.IO Server Configuration
 * 
 * How Socket.IO Works Under the Hood:
 * 1. Socket.IO first attempts to establish a WebSocket connection
 * 2. If WebSocket fails, it falls back to HTTP long-polling
 * 3. WebSocket Handshake Process:
 *    a. Client sends HTTP upgrade request
 *    b. Server responds with HTTP 101 (Switching Protocols)
 *    c. Connection upgrades to WebSocket protocol (ws:// or wss://)
 * 
 * Socket.IO Features Over Raw WebSocket:
 * - Automatic reconnection
 * - Packet buffering
 * - Acknowledgments
 * - Multiplexing (rooms and namespaces)
 * - Fallback to HTTP long-polling
 */

import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponse } from 'next';

/**
 * Extended type for Next.js API response that includes Socket.IO server
 * This allows us to attach the Socket.IO instance to the HTTP server
 */
export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

/**
 * Initialize or retrieve the Socket.IO server instance
 * 
 * How it works:
 * 1. Checks if Socket.IO server already exists on the HTTP server
 * 2. If not, creates new Socket.IO server and attaches it
 * 3. Socket.IO server maintains:
 *    - Connected sockets map
 *    - Rooms map (user-specific rooms)
 *    - Event handlers
 *    - Middleware stack
 * 
 * @param res - Extended Next.js API response
 * @returns Socket.IO server instance
 */

// The function initSocket doesn't actually accept a raw server instance - it accepts a Next.js API response object (NextApiResponseServerIO). This is important because in Next.js, when an API route handler (/api/socket) runs, Next.js has already created an HTTP server instance for us.

// The flow works like this:
// 1. When you create a Next.js application, Next.js automatically creates and manages an HTTP server (NetServer) for you
// 2. For every API route (e.g., /api/chat), Next.js exposes the underlying HTTP server via the res.socket.server property. This gives you direct access to the server instance within any API route handler.
  // eg:export default function handler(req, res) {
  //   // Access the HTTP server via res.socket.server
  //   const httpServer = res.socket.server;
  //   // Now you can use httpServer to attach Socket.IO or other services
  // }
  
// 3. The initSocket function checks if a Socket.IO instance already exists on this pre-existing HTTP server
// 4. If it doesn't exist, the function creates a new Socket.IO server and attaches it to the HTTP server
export const initSocket = (res: NextApiResponseServerIO) => {
  // Socket.IO server is already initialized
  if (res.socket?.server.io) {
    return res.socket.server.io;
  }

  // Create new Socket.IO server
  const io = new SocketIOServer(res.socket.server, {
    // Socket.IO Config Options
    path: '/api/socket', // WebSocket endpoint path
    // This means all Socket.IO traffic will go through /api/socket, while your regular HTTP routes remain unaffected
    transports: ['websocket', 'polling'], // Available transport methods
    // Additional options:
    // pingTimeout: 60000, // Time to wait for ping response
    // pingInterval: 25000, // How often to ping
    // upgradeTimeout: 10000, // Time for upgrade to WebSocket
    //This defines the methods Socket.IO can use to establish real-time communication
    // The array order matters - it will try each method in sequence:
    // 'websocket': First tries to establish a WebSocket connection (preferred method)
    // 'polling': Falls back to HTTP long-polling if WebSocket fails
    // WebSocket is preferred because it:
    // Maintains a persistent, full-duplex connection
    // Has lower latency
    // Uses less bandwidth
    // HTTP long-polling is the fallback because it:
    // Works in environments where WebSocket is blocked
    // Is more compatible with older browsers/networks
    // Still provides real-time-like communication, just less efficient
  });

  // Attach Socket.IO server to HTTP server
  res.socket.server.io = io;

  return io;
  // We return just the Socket.IO server instance (io) because:
  // This instance contains all the methods needed to work with Socket.IO
}; 

// The initSocket function is a factory function that:
// 1. Checks if a Socket.IO server already exists on the HTTP server
// 2. If not, creates a new Socket.IO server and attaches it to the HTTP server
// 3. Returns the Socket.IO server instance
