import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../data/prismaClient';
import { InvalidCredentialsError } from '../errors/auth';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export function generateToken(payload: { id: number; email: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new InvalidCredentialsError();

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new InvalidCredentialsError();

  const token = generateToken({ id: user.id, email: user.email });
  return { token, user: { id: user.id, email: user.email, name: user.name, lastName: user.lastName } };
}
