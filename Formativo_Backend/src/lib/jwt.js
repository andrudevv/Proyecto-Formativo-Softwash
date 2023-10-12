import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.jwtSecret, { expiresIn: 60 * 60 }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}


export function verifyToken(token) {
  return jwt.verify(token, config.jwtSecret);
}