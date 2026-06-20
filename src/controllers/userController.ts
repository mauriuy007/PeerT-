import { Request, Response } from 'express';
import { EmailAlreadyInUseError } from '../errors/conflict';
import { UserNotFoundError } from '../errors/notFound';
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response) {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof EmailAlreadyInUseError) {
      res.status(409).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    res.json(user);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function getAllUsers(_req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const user = await userService.updateUser(Number(req.params.id), req.body);
    res.json(user);
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    if (error instanceof UserNotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}
