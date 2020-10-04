import bcrypt from 'bcrypt';

const _saltRounds = 10;

export const hash = async (
  plaintext: string,
  saltRounds: number = _saltRounds
) => bcrypt.hash(plaintext, saltRounds);

export const check = async (plaintext: string, hash: string) =>
  bcrypt.compare(plaintext, hash);
