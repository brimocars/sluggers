import { io } from 'socket.io-client';
import { reactive } from 'vue';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

export const socket = io(URL);

export const socketService = reactive({
  connected: false,
  managers: null,
  started: false,
  newRoundNumber: 0,
  newDraftNumber: 0,
  nextDrafter: null,
  draftedPlayer: '',
  updatedManager: null,
  ended: false,
  // emit: socket.emit.bind(socket),
});

socket.on('connect', () => {
  socketService.connected = true;
});

socket.on('disconnect', () => {
  socketService.connected = false;
});

socket.on('managerJoined', (managers) => {
  socketService.managers = managers;
});

socket.on('draftStarted', (shuffledManagers) => {
  socketService.started = true;
  socketService.managers = shuffledManagers
  // TODO: need the nextDrafter here. and probably the newRoudn and such.
});

socket.on('playerDrafted', (data) => {
  socketService.newRoundNumber = data.newRoundNumber;
  socketService.newDraftNumber = data.newDraftNumber;
  socketService.nextDrafter = data.nextDrafter;
  socketService.draftedPlayer = data.draftedPlayer;
  const managerIndexToUpdate = socketService.managers.indexOf((manager) => manager.name === data.updatedManager.name)
  socketService.managers[managerIndexToUpdate] = data.updatedManager; 
})

socket.on('draftEnded', (managers) => {
  socketService.managers = managers;
  socketService.ended = true;
})

socket.on('clearedManagers', (managers) => {
  socketService.managers = managers;
})