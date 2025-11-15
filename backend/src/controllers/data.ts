import type { Request, Response, NextFunction } from 'express';
import { allPlayerData } from '../lib/parsedPlayers';

export function getAllPlayers(_req: Request, res: Response, _next: NextFunction) {
  try {
    res.status(200).send({ players: allPlayerData });
  } catch (err) {
    console.log(`Error getting all player data: ${err}`);
    res.status(500).send();
  }
}
