import playersJson from '../data/players.json' with { type: 'json'};
import type { Player } from '../types';

let undraftedPlayers: Player[] = [];
export const allPlayerData: Player[] = [];

export function parsePlayers() {
  playersJson.forEach((player) => {
    undraftedPlayers.push({
      name: player.name,
      isCaptain: player.isCaptain,
      abilities: player.abilities,
      battingStat: player.battingStat,
      pitchingStat: player.pitchingStat,
      fieldingStat: player.fieldingStat,
      speedStat: player.speedStat,
      chemistry: player.chemistry,
      isDrafted: false,
    });
    allPlayerData.push({
      name: player.name,
      isCaptain: player.isCaptain,
      abilities: player.abilities,
      battingStat: player.battingStat,
      pitchingStat: player.pitchingStat,
      fieldingStat: player.fieldingStat,
      speedStat: player.speedStat,
      chemistry: player.chemistry,
      isDrafted: false,
    });
  });
}

export function resetUndraftedPlayers() {
  undraftedPlayers = [];
  playersJson.forEach((player) => {
    undraftedPlayers.push({
      name: player.name,
      isCaptain: player.isCaptain,
      abilities: player.abilities,
      battingStat: player.battingStat,
      pitchingStat: player.pitchingStat,
      fieldingStat: player.fieldingStat,
      speedStat: player.speedStat,
      chemistry: player.chemistry,
      isDrafted: false,
    });
  });
}

export default undraftedPlayers;
