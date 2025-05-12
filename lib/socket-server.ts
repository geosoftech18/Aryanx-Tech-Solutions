/**
 * Socket.IO Server Singleton
 * 
 * This module:
 * 1. Maintains a single Socket.IO server instance
 * 2. Provides access to the instance across the application
 * 3. Ensures consistent socket handling
 */

import { Server as SocketIOServer } from 'socket.io';
import { Server as NetServer } from 'node:http';

export class SocketIOService {
  private static io: SocketIOServer | null = null;

  /**
   * Get the Socket.IO server instance
   * Creates new instance if none exists
   */
  public static getIO(): SocketIOServer {
    if (!SocketIOService.io) {
      throw new Error('Socket.IO has not been initialized. Please call initialize() first.');
    }
    return SocketIOService.io;
  }

  /**
   * Initialize Socket.IO with HTTP server
   * Should be called only once when server starts
   */
  public static initialize(httpServer: NetServer): SocketIOServer {
    if (SocketIOService.io) {
      console.log('Socket.IO already initialized');
      return SocketIOService.io;
    }

    SocketIOService.io = new SocketIOServer(httpServer, {
      path: '/api/socket',
      addTrailingSlash: false,
      transports: ['websocket', 'polling'],
      cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
      },
      allowEIO3: true // Allow Engine.IO version 3 clients
    });

    // Set up connection handler
    SocketIOService.io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      // socket.onAny((event, ...args) => {
      //   console.log(`[SocketIOService] Received event: ${event}`, args);
      // });

      // socket.on('ping', (data) => {
      //   console.log('Received ping:', data);
      // });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });

      // Handle room joining with acknowledgment
      socket.on('join-room', async (roomId: string, callback?: (response: any) => void) => {
        try {
          await socket.join(roomId);
          console.log(`Socket ${socket.id} joined room ${roomId}`);
          
          // Get room size
          const sockets = await SocketIOService.io?.in(roomId).allSockets();
          const roomSize = sockets ? sockets.size : 0;
          
          if (callback) {
            callback({
              success: true,
              message: `Joined room ${roomId}`,
              roomSize,
              socketId: socket.id
            });
          }
        } catch (error) {
          console.error(`Error joining room for user ${roomId}:`, error);
          if (callback) {
            callback({
              success: false,
              error: 'Failed to join room'
            });
          }
        }
      });

      socket.on('leave-room', (roomId: string) => {
        socket.leave(roomId);
        console.log(`Socket ${socket.id} left room ${roomId}`);
      });

      /**
       * Custom event: emit-to-room
       * Allows any connected client to emit an event to a room via the server
       * Payload: { room: string, event: string, data: any }
       */
      socket.on('emit-to-room', ({ room, event, data }) => {
        if (!room || !event) {
          console.error('[SocketIOService] emit-to-room missing room or event:', { room, event, data });
          return;
        }
        console.log(`[SocketIOService] Emitting event "${event}" to room "${room}" with data:`, data);
        socket.to(room).emit(event, data);
      });
    });

    return SocketIOService.io;
  }
} 