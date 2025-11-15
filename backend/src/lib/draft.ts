import { managers, shuffleManagers, updateIsStarted } from './managers.js'
import undraftedPlayers from './parsedPlayers.js';
import type { Manager } from '../types.js';

const draftOrder: Manager[] = [];
const totalDrafts = undraftedPlayers.length;
let draftNumber = 0;
let roundNumber = 0;

export function startDraft() {
  updateIsStarted(true);
  const shuffledManagers = shuffleManagers();
  let nextIndex = 0;
  let isAscending = true;
  const totalManagers = shuffledManagers.length;
  for (let i = 0; i < totalDrafts; i++) {
    draftOrder.push(shuffledManagers[nextIndex]);
    if (isAscending) {
      nextIndex++;
      if (nextIndex === totalManagers) {
        nextIndex--;
        isAscending = false;
      }
    } else {
      nextIndex--;
      if (nextIndex < 0) {
        nextIndex++;
        isAscending = true;
      }
    }
  }
  // socketThingHere
}

export function draftPlayer(playerName: string) {
  const playerToDraft = undraftedPlayers.find((player) => {
    return player.name === playerName;
  })
  if (!playerToDraft) {
    console.log(`Failed to draft player ${playerName} because they were drafted already`);
    return;
  }
  playerToDraft.isDrafted = true;
  undraftedPlayers.filter((player) => {
    return player.name !== playerName
  })
  draftOrder.shift()?.players.push(playerToDraft);
  draftNumber++;
  if (managers.length % draftNumber === 0) {
    roundNumber++; 
  }
  // socket thing here.
}