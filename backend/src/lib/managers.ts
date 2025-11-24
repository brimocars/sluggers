import type { Manager } from '../types';
import { emit } from './socket.js';
import { resetUndraftedPlayers } from './parsedPlayers.js';

export const managers: Manager[] = [];
let isStarted = false;

export function updateIsStarted(newIsStarted: boolean) {
  isStarted = newIsStarted;
}

export function addManager(name: string) {
  // TODO: Uncomment 
  // if (isStarted) {
  //   console.log('Cannot add manager. Draft already started.');
  // }
  const existingManager = managers.some((manager) => {
    return manager.name === name;
  });
  if (!existingManager) {
    managers.push({ name, players: [] });
    emit('managerJoined', managers);
  }
}

function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let randomIndex: number;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function shuffleManagers(): Manager[] {
  const shuffled = shuffleArray(managers);
  // TODO: remove testing code
  const brianIndex = shuffled.map(manager => manager.name).indexOf('Brian');
  [shuffled[0],  shuffled[brianIndex]] = [shuffled[brianIndex], shuffled[0]];
  return shuffled
}

export function clearManagers() {
  managers.length = 0;
  isStarted = false;
  resetUndraftedPlayers()
  emit('clearedManagers', managers);  
}