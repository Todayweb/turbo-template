import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";

import { Session, User } from "@prisma/client";
import { prisma } from "@repo/db";

export type SessionOptional = { session: Session; user: User } | { session: null; user: null };
export type SessionEnsured = { session: Session; user: User };

export const generateToken = () => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  return encodeBase32LowerCaseNoPadding(bytes);
};

export const encodeToken = (token: string) =>
  encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

export const createSession = async (token: string, userId: string): Promise<Session> => {
  const sessionId = encodeToken(token);
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await prisma.session.create({
    data: session,
  });
  return session;
};

export const validateSessionToken = async (token: string): Promise<SessionOptional> => {
  const sessionId = encodeToken(token);
  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });

  if (result === null) {
    return { session: null, user: null };
  }

  const { user, ...session } = result;
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }

  return { session, user };
};

export const invalidateSession = async (sessionId?: string) => {
  if (!sessionId) return null;
  await prisma.session.delete({ where: { id: sessionId } });
};
