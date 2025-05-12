/**
 * Socket.IO Emit API Route
 * 
 * Handles:
 * - Emitting events to specific rooms
 * - Notification broadcasting
 * - Error handling
 */

import { NextResponse } from 'next/server';
import { SocketIOService } from '@/lib/socket-server';

// Remove Edge Runtime since we're using the main server's Socket.IO instance
// export const runtime = 'edge';

export async function OPTIONS() {
  // Handle CORS preflight
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  console.log('[Socket Emit API] OPTIONS request received. Returning CORS headers.');
  return new NextResponse(null, { headers });
}

export async function POST(req: Request) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  try {
    console.log('[Socket Emit API] POST request received.');
    console.log('[Socket Emit API] Request headers:', JSON.stringify(Object.fromEntries(req.headers.entries())));

    // Parse and validate body
    let body;
    try {
      body = await req.json();
      console.log('[Socket Emit API] Parsed request body:', body);
    } catch (err) {
      console.error('[Socket Emit API] Failed to parse JSON body:', err);
      return NextResponse.json(
        { error: 'Invalid JSON body' },
        { status: 400, headers }
      );
    }
    const { room, event, data } = body;

    console.log(`[Socket Emit API] room: ${room}, event: ${event}, data:`, data);

    if (!room || !event || !data) {
      console.error('[Socket Emit API] Missing required fields:', { room, event, data });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers }
      );
    }

    let io;
    try {
      // Use the SocketIOService singleton
      io = SocketIOService.getIO();
      console.log('[Socket Emit API] Successfully retrieved Socket.IO singleton instance.');
    } catch (error) {
      console.error('[Socket Emit API] Socket.IO initialization error:', error);
      return NextResponse.json(
        { error: 'Socket.IO server not initialized' },
        { status: 503, headers }
      );
    }

    // Log before emitting
    console.log(`[Socket Emit API] Attempting to emit event "${event}" to room "${room}" with data:`, data);
    // Emit the event to the specified room
    try {
      io.to(room).emit(event, data);
      // Log after emitting
      console.log(`[Socket Emit API] Successfully emitted event "${event}" to room "${room}".`);
    } catch (emitError) {
      console.error('[Socket Emit API] Error emitting event:', emitError);
      return NextResponse.json(
        { error: 'Failed to emit event', details: emitError instanceof Error ? emitError.message : 'Unknown error' },
        { status: 500, headers }
      );
    }

    return NextResponse.json({
      message: 'Event emitted successfully',
      room,
      event
    }, { status: 200, headers });
  } catch (error) {
    console.error('[Socket Emit API] Socket emit error (outer catch):', error);
    return NextResponse.json(
      { 
        error: 'Failed to emit event',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500, headers }
    );
  }
} 