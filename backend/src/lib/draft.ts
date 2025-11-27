import * as fs from 'node:fs';
import path from 'node:path';
import { managers, shuffleManagers, updateIsStarted } from './managers.js';
import undraftedPlayers from './parsedPlayers.js';
import type { Manager } from '../types.js';
import { emit } from './socket.js';
const __dirname = import.meta.dirname;

const draftOrder: Manager[] = [];
let draftNumber = 0;
let roundNumber = 0;
const draftedOrder: string[] = [];

export function startDraft() {
  const totalDrafts = undraftedPlayers.length;
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
  emit('draftStarted', {
    shuffledManagers,
    newRoundNumber: roundNumber,
    newDraftNumber: draftNumber,
    nextDrafter: draftOrder[0],
  });
}

export function draftPlayer(playerName: string, managerName: string) {
  const playerToDraft = undraftedPlayers.find((player) => {
    return player.name === playerName;
  });
  if (!playerToDraft) {
    console.log(`Failed to draft player ${playerName} because they were drafted already`);
    return;
  }
  playerToDraft.isDrafted = true;
  undraftedPlayers.filter((player) => {
    return player.name !== playerName;
  });
  if (managerName !== draftOrder[0].name) {
    throw new Error(`Failed to draft for manager ${managerName} because it is ${draftOrder[0].name}'s turn.`);
  }
  const draftingManager = draftOrder.shift();
  draftingManager?.players.push(playerToDraft);
  draftedOrder.push(playerToDraft.name);

  draftNumber++;
  if (draftNumber % managers.length === 0) {
    roundNumber++;
  }
  emit('playerDrafted', {
    newRoundNumber: roundNumber,
    newDraftNumber: draftNumber,
    nextDrafter: draftOrder[0] ?? undefined,
    draftedPlayer: playerName,
    updatedManager: draftingManager,
  });
  if (!draftOrder.length) {
    endDraft();
  }
}

function endDraft() {
  emit('draftEnded', {
    managers,
  });
  const filePath = path.join(__dirname, '..', '..', 'output', `managers-${Date.now()}.json`);
  fs.writeFile(filePath, JSON.stringify(managers), (err) => { if (err) console.log(`error writing output file: ${err}`)});
}
