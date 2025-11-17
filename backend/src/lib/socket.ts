import type { Server, Socket } from 'socket.io';

let io: Server | undefined;

export function registerIo(ioObj: Server): void {
  io = ioObj;

  io.on('connection', (_socket: Socket) => {
    console.log('connection to socket');
  });
}

export function emit(event: string, ...args: unknown[]): void {
  io?.emit(event, ...args);
}
