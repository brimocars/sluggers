import type { Request, Response } from 'express';
import * as lib from '../lib/managers.js';

export function connectManager(req: Request, res: Response) {
  try {
    const { managerName, password } = req.body;
    // Very secure
    if (password !== 'sluggersInTub1234') {
      res.status(401).send();
    }
    lib.addManager(managerName);
    // lib.addManager('TEST1');
    // lib.addManager('TEST2');
    // lib.addManager('TEST3');
    res.status(200).send({ message: `added manager ${managerName}` });
  } catch (err) {
    console.log(`Error adding manager ${err}`);
    res.status(500).send();
  }
}

export function clearManagers(req: Request, res: Response) {
  try {
    lib.clearManagers();
    console.log('Resetting all managers')
    res.status(200).send();
  } catch (err) {
    console.log(`Error clearing managers ${err}`);
    res.status(500).send();
  }
}

