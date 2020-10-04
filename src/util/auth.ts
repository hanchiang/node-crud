import bcrypt from 'bcrypt';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

const _saltRounds = 10;
const privateKey = fs.readFileSync('private.key', {
  encoding: 'utf8',
});
const publicKey = fs.readFileSync('public.key.pub', {
  encoding: 'utf8',
});

export const hashPassword = async (
  plaintext: string,
  saltRounds: number = _saltRounds
) => bcrypt.hash(plaintext, saltRounds);

export const checkPassword = async (plaintext: string, hash: string) =>
  bcrypt.compare(plaintext, hash);

export const _signToken = async (payload, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
};

export const signAccessToken = (
  payload: any = {},
  options: any = { expiresIn: '5m' }
) => {
  options = { ...options, algorithm: 'RS256' };
  payload = { ...payload, type: 'access' };
  return _signToken(payload, options);
};

export const signRefreshToken = (
  payload: any = {},
  options: any = { expiresIn: '365d' }
) => {
  options = { ...options, algorithm: 'RS256' };
  payload = { ...payload, type: 'refresh' };
  return _signToken(payload, options);
};

export const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
};
