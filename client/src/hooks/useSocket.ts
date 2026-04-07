import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import type { GameState } from '../types';

interface UseSocketReturn {
  socket: Socket | null;
  gameState: GameState | null;
  isConnected: boolean;
  joinGame: (name: string) => void;
  selectTile: (tileId: string) => void;
}

const SERVER_URL = 'http://localhost:3000';

export function useSocket(): UseSocketReturn {
  const [socket] = useState<Socket>(() =>
    io(SERVER_URL, {
      autoConnect: false,
    }),
  );

  const socketRef = useRef<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('game:state', (state: GameState) => {
      setGameState(state);
    });

    socket.connect();

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('game:state');
      socket.disconnect();
      socketRef.current = null;
    };
  }, [socket]);

  const joinGame = (name: string) => {
    if (!socketRef.current || !name.trim()) return;
    socketRef.current.emit('player:join', { name: name.trim() });
  };

  const selectTile = (tileId: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('tile:select', { tileId });
  };

  return {
    socket,
    gameState,
    isConnected,
    joinGame,
    selectTile,
  };
}