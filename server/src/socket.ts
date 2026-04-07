import { Server as SocketIOServer, Socket } from 'socket.io';
import { createGame, addPlayer, removePlayer, selectTile } from './game';

let gameState = createGame(15); // 15 pares = 30 fichas

export function setupSocket(io: SocketIOServer): void {
    io.on('connection', (socket: Socket) => {
        // 'player:join'  -> addPlayer, emit 'game:state' a todos
        // 'tile:select'  -> selectTile, emit 'game:state' a todos
        // 'disconnect'   -> marcar jugador desconectado (NO eliminar)
    });
}
