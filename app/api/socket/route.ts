/**
 * Socket.IO Connection Handler
 * 
 * This route handles:
 * 1. Initial WebSocket connection
 * 2. Socket handshake and authentication
 * 3. Room management for users
 * 4. Connection lifecycle events
 */

import { NextResponse } from 'next/server';
import { SocketIOService } from '@/lib/socket-server';

// Handles initial Socket.IO connection and room joining
export async function GET(req: Request) {
  try {
    // Just ensure the singleton is initialized; do not attach handlers here
    SocketIOService.getIO();
    // The actual connection/room logic is handled in lib/socket-server.ts
    return NextResponse.json({ success: true, message: 'Socket.IO server is running' });
  } catch (error) {
    console.error('Socket initialization error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initialize Socket.IO server' },
      { status: 500 }
    );
  }
} 