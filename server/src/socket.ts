import { Server as SocketIOServer, Socket } from 'socket.io';
import { createGame, addPlayer, removePlayer, selectTile } from './game';

let gameState = createGame(15); // 15 pares = 30 fichas

// Implementa este archivo usando las firmas de setupSocket y haciendo que el servidor escuche en el puerto 3000.
export function setupSocket(io: SocketIOServer): void {
    io.on('connection', (socket: Socket) => {
        socket.emit('game:state', gameState);

        socket.on('player:join', (payload: string | { name?: string }) => {
            const name = typeof payload === 'string' ? payload : payload?.name;
            if (!name) {
                return;
            }

            gameState = addPlayer(gameState, socket.id, name);
            io.emit('game:state', gameState);
        });

        socket.on('tile:select', (payload: string | { tileId?: string }) => {
            const tileId = typeof payload === 'string' ? payload : payload?.tileId;
            if (!tileId) {
                return;
            }

            const result = selectTile(gameState, tileId, socket.id);
            gameState = result.newState;
            io.emit('game:state', gameState);

            if (result.event) {
                io.emit(result.event, gameState);
            }
        });

        socket.on('disconnect', () => {
            gameState = {
                ...gameState,
                players: gameState.players.map((player) =>
                    player.id === socket.id
                        ? { ...player, isConnected: false }
                        : player,
                ),
            };

            io.emit('game:state', gameState);
        });
    });
}
