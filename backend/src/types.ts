export type Player = {
  name: string,
  isCaptain: boolean,
  abilities: string[],
  battingStat: number,
  pitchingStat: number,
  fieldingStat: number,
  speedStat: number,
  chemistry: string[],
  isDrafted: boolean,
}

export type Manager = {
  name: string,
  players: Player[]
}
