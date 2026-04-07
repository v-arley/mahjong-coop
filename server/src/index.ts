import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { setupSocket } from './socket';

const app = express();

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: 'http://localhost:5173',
    },
});
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
}));

setupSocket(io);

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});