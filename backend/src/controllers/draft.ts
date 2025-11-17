import type { Request, Response } from 'express';
import { draftPlayer, startDraft } from '../lib/draft.js';

export function draft(req: Request, res: Response) {
  try {
    const { playerName, managerName } = req.body;
    draftPlayer(playerName, managerName);
    res.status(200).send();
  } catch (err) {
    console.log(`Error drafting player: ${err}`);
    res.status(500).send();
  }
}

export function start(_req: Request, res: Response) {
  try {
    startDraft();
    res.status(200).send();
  } catch (err) {
    console.log(`Error starting draft: ${err}`);
    res.status(500).send();
  }
}
