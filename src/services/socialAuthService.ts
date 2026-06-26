import { OAuth2Client } from 'google-auth-library';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import prisma from '../data/prismaClient';
import { generateToken } from './authService';

const googleClient = new OAuth2Client();

interface SocialPayload {
  providerId: string;
  email: string;
  name: string;
  lastName: string;
}

async function decodeAppleToken(idToken: string): Promise<SocialPayload> {
  const [, payload] = idToken.split('.');
  const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
  return {
    providerId: decoded.sub as string,
    email: decoded.email as string,
    name: '',
    lastName: '',
  };
}

async function decodeGoogleToken(idToken: string): Promise<SocialPayload> {
  // Verify without audience to support both iOS and Android client IDs
  const ticket = await googleClient.verifyIdToken({ idToken });
  const p = ticket.getPayload();
  if (!p?.sub) throw new Error('Token de Google inválido');
  return {
    providerId: p.sub,
    email: p.email ?? '',
    name: p.given_name ?? '',
    lastName: p.family_name ?? '',
  };
}

export async function socialLogin(
  provider: 'apple' | 'google',
  idToken: string,
  overrides: { email?: string; name?: string; lastName?: string },
) {
  const decoded = provider === 'apple'
    ? await decodeAppleToken(idToken)
    : await decodeGoogleToken(idToken);

  const email = overrides.email || decoded.email;
  const name  = overrides.name  || decoded.name  || 'Usuario';
  const lastName = overrides.lastName || decoded.lastName || '-';

  if (!email) throw new Error('No se pudo obtener el email del proveedor');

  const idField = provider === 'apple' ? 'appleId' : 'googleId';

  // 1. Find by provider ID (most reliable, survives email changes)
  let user = await (prisma.user.findUnique as any)({
    where: { [idField]: decoded.providerId },
  });

  // 2. Fall back to email lookup (first-time link)
  if (!user) {
    user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      user = await (prisma.user.update as any)({
        where: { id: user.id },
        data: { [idField]: decoded.providerId },
      });
    }
  }

  // 3. Create new user
  if (!user) {
    const randomPassword = await bcrypt.hash(randomBytes(32).toString('hex'), 10);
    user = await (prisma.user.create as any)({
      data: {
        email,
        name,
        lastName,
        password: randomPassword,
        [idField]: decoded.providerId,
      },
    });
  }

  const token = generateToken({ id: user.id, email: user.email });
  return {
    token,
    user: { id: user.id, email: user.email, name: user.name, lastName: user.lastName },
  };
}
