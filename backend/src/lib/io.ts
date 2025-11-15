import { Server, Socket } from 'socket.io';

let io: Server | undefined;

export function registerIo(ioObj: Server): void {
    io = ioObj;

    io.on('connection', (socket: Socket) => {
        // socket.on('controls', (msg: unknown) => {
        //     // Forward controller input to all connected clients
        //     io?.emit('inputFromController', msg);
        // });
    });
}
