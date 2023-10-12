import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { config } from "../config/config.js";

export const authRequired = (req, res, next) => {
  cookieParser()(req, res, () => {
    const token = req.cookies.token;
    console.log(token);
    if (!token)
      return res.status(401).json({
        message: "no esta autorizado su ingreso",
      });

    Jwt.verify(token, config.jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "invalid token",
        });
      }
      req.user = user;
      console.log(user.role);
      next();
    });
    // const token = req.cookies.token;
  });
};
