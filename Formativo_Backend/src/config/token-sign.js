import jwt from 'jsonwebtoken';
import { config } from './config';
const secret = config.jwtSecret;
const payload = {
  sub: 1,
  role: 'customer'
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log(token);
