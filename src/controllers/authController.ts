import { Request, Response } from 'express';
import { InvalidCredentialsError } from '../errors/auth';
import { EmailAlreadyInUseError } from '../errors/conflict';
import * as authService from '../services/authService';
import * as socialAuthService from '../services/socialAuthService';

export async function signUp(req: Request, res: Response) {
  try {
    const result = await authService.signUp(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof EmailAlreadyInUseError) {
      res.status(409).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      res.status(401).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function socialLogin(req: Request, res: Response) {
  try {
    const { provider, idToken, email, name, lastName } = req.body;
    if (!provider || !idToken) {
      res.status(400).json({ error: 'provider e idToken son requeridos' });
      return;
    }
    const result = await socialAuthService.socialLogin(provider, idToken, { email, name, lastName });
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message ?? 'Autenticación fallida' });
  }
}
