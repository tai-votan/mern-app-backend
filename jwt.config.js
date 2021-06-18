import dotenv from 'dotenv';
dotenv.config();

export const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

export const JWT_CONFIG = {
  expiresIn: '1 day', // this is fixed from login expired redis 86400
  issuer: 'One',
  audience: 'cms-dashboard',
};
