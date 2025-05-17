/**
 * Custom Next.js Server with Socket.IO Integration
 * 
 * This server setup:
 * 1. Creates a custom HTTP server
 * 2. Integrates Next.js request handling
 * 3. Initializes Socket.IO for real-time communication
 * 4. Manages WebSocket connections and rooms
 */
import dotenv from 'dotenv';
dotenv.config();
import { createServer } from 'node:http';
import next from 'next';
import { SocketIOService } from './lib/socket-server.js';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || 'localhost';
// console.log('hostname', process.env.HOST);
const port = 3000;

// Initialize Next.js instance with configuration
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  /**
   * HTTP Server Setup
   * 
   * Creates a custom server that:
   * 1. Handles all Next.js routes
   * 2. Provides WebSocket upgrade capability
   * 3. Manages error scenarios
   */
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url || '', true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Initialize Socket.IO using the singleton service
  SocketIOService.initialize(server);

  // Start the server
  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
