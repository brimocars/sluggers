import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import http from 'node:http';
import routes from './routes/index.js';
import { registerIo } from './lib/socket.js';
import { parsePlayers } from './lib/parsedPlayers.js';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(routes);

const server = http.createServer(app);
const io = new Server(server);
registerIo(io);

server.listen(process.env.port ?? 3000, () => {
  console.log('Server is running on port 3000');
  parsePlayers();
});
