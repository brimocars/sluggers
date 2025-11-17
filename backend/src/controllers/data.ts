import type { Request, Response } from 'express';
import { allPlayerData } from '../lib/parsedPlayers.js';

export function getAllPlayers(_req: Request, res: Response) {
  try {
    res.status(200).send({ players: allPlayerData });
  } catch (err) {
    console.log(`Error getting all player data: ${err}`);
    res.status(500).send();
  }
}
