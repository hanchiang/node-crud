import bcrypt from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

const _saltRounds = 10;
const privateKey = fs.readFileSync('private.pem', {
  encoding: 'utf8',
});

export const hashPassword = async (
  plaintext: string,
  saltRounds: number = _saltRounds
) => bcrypt.hash(plaintext, saltRounds);

export const checkPassword = async (plaintext: string, hash: string) =>
  bcrypt.compare(plaintext, hash);

export const signToken = async (payload, options = { expiresIn: '5m' }) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};
