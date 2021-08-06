import jwt from 'jsonwebtoken';
import { JWT_TOKEN_SECRET, JWT_CONFIG } from '../jwt.config.js';

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_TOKEN_SECRET, JWT_CONFIG);
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_TOKEN_SECRET, JWT_CONFIG);
};

export const authToken = async (req, res, next) => {
  const token = (req.headers['authorization'] || '').split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    await verifyToken(token);
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};
