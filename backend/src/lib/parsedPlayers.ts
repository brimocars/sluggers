import playersJson from '../data/players.json';
import type { Player } from '../types';

const undraftedPlayers: Player[] = [];
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
    })
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
    })
  })
}

export default undraftedPlayers;